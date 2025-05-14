import Project from '../models/projectmodel.js';
import User from '../models/usermodel.js';


export const createProject = async (req, res) => {
  try {
    const { name, tasks } = req.body;

    if (!name) {
      return res.status(400).json({ message: 'Project name is required' });
    }

    const newProject = new Project({
      name,
      user: req.user._id, // requires JWT middleware to attach user
      tasks: tasks || [],
    });

    const savedProject = await newProject.save();

    // 2. Add project ID to user's `projects` array
    await User.findByIdAndUpdate(
      req.user._id,
      { $push: { projects: savedProject._id } },
      { new: true }
    );

    res.status(201).json( {success:true, savedProject});
  } catch (error) {
    console.error('Create Project Error:', error);
    res.status(500).json({ message: 'Server error' });
  }
};

export const getUserProjects = async (req, res) => {
  try {
    const userId = req.user._id;

    const projects = await Project.find({ user: userId }).sort({ createdAt: -1 });

    res.status(200).json(projects);
  } catch (error) {
    console.error('Error fetching projects:', error);
    res.status(500).json({ message: 'Server error' });
  }
};

export const getProjectById = async (req, res) => {
  try {
    const projectId = req.params.id;
    const project = await Project.findOne({ _id: projectId, user: req.user._id });

    if (!project) {
      return res.status(404).json({ message: 'Project not found' });
    }

    res.status(200).json(project);
  } catch (error) {
    console.error('Error fetching project:', error);
    res.status(500).json({ message: 'Server error' });
  }
};

export const updateTaskStatus = async (req, res) => {
  try {
    const { projectId, taskId } = req.params;
    const { status } = req.body;

    const validStatuses = ['Not Started', 'In Progress', 'Completed'];
    if (!validStatuses.includes(status)) {
      return res.status(400).json({ message: 'Invalid status value' });
    }

    const project = await Project.findOne({ _id: projectId, user: req.user._id });
    if (!project) {
      return res.status(404).json({ message: 'Project not found' });
    }

    const task = project.tasks.id(taskId); // Subdocument access by ID
    if (!task) {
      return res.status(404).json({ message: 'Task not found' });
    }

    task.status = status;
    if (status === 'Completed') {
      task.completedAt = new Date();
    }

    await project.save();

    res.status(200).json({ message: 'Task status updated', project });
  } catch (error) {
    console.error('Error updating task status:', error);
    res.status(500).json({ message: 'Server error' });
  }
};

export const deleteProject = async (req, res) => {
  try {
    const { projectId } = req.params;
    console.log(projectId)

    const project = await Project.findOneAndDelete({
      _id: projectId,
      user: req.user._id,
    });

    if (!project) {
      return res.status(404).json({ message: 'Project not found' });
    }

    // Remove from user's project list
    await User.findByIdAndUpdate(req.user._id, {
      $pull: { projects: projectId },
    });

    res.status(200).json({ message: 'Project deleted successfully' });
  } catch (error) {
    console.error('Error deleting project:', error);
    res.status(500).json({ message: 'Server error' });
  }
};

export const deleteTask = async (req, res) => {
  try {
    const { projectId, taskId } = req.params;

    const project = await Project.findOne({ _id: projectId, user: req.user._id });
    if (!project) {
      return res.status(404).json({ message: 'Project not found' });
    }

    project.tasks = project.tasks.filter((task) => task._id.toString() !== taskId);
    await project.save();

    res.status(200).json({ message: 'Task deleted successfully' });
  } catch (error) {
    console.error('Error deleting task:', error);
    res.status(500).json({ message: 'Server error' });
  }
};

export const addTask = async (req, res) => {
  try {
    const { projectId } = req.params;
    const { title, description } = req.body;
    console.log(req.body)


    const project = await Project.findOne({ _id: projectId, user: req.user._id });
    if (!project) {
      return res.status(404).json({ message: 'Project not found' });
    }

    project.tasks.push({ title, description, status: 'pending' });
    await project.save();

    res.status(200).json({ message: 'Task added successfully', project });
  } catch (error) {
    console.error('Error adding task:', error);
    res.status(500).json({ message: 'Server error' });
  }
};


