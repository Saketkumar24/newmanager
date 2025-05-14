import express from 'express';
import {
  createProject,
  getUserProjects,
  getProjectById,
  updateTaskStatus,
  deleteProject,
  deleteTask,
  addTask

} from '../controllers/projectController.js';
import {protect} from '../middlewares/authMiddleware.js';

const router = express.Router();

router.post('/create',protect, createProject);
router.get('/all',protect,  getUserProjects);
router.get('/:id',protect , getProjectById);
router.patch('/:projectId/task/:taskId/status', protect, updateTaskStatus);
router.delete('/:projectId', protect, deleteProject);
router.delete('/:projectId/task/:taskId', protect, deleteTask);
router.post('/:projectId/addtask', protect, addTask);


export default router;
