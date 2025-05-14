import TaskCard from './TaskCard';

const TaskPage = ({ tasks }) => {
    return (
        <div className="pt-20"> {/* Padding-top to push down from the navbar */}
            <div className="max-w-6xl mx-auto p-4">
                {tasks.map((task) => (
                    <TaskCard key={task.id} task={task} />
                ))}
            </div>
        </div>
    );
};

export default TaskPage;
