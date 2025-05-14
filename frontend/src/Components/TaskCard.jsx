const TaskCard = ({ task }) => {
    return (
        <div className="bg-white shadow-md rounded-lg p-4 mb-4 border border-gray-200 ">
            <h3 className="text-lg font-semibold text-gray-800 mb-1">{task.title}</h3>
            <p className="text-gray-600 mb-2">{task.description}</p>
            <div className="text-sm text-gray-500 mb-1">
                <span className="font-medium">Status:</span> {task.status}
            </div>
            <div className="text-sm text-gray-500">
                <span className="font-medium">Created:</span> {task.createdAt}
            </div>
            {task.completedAt && (
                <div className="text-sm text-gray-500">
                    <span className="font-medium">Completed:</span> {task.completedAt}
                </div>
            )}
        </div>
    );
};

export default TaskCard;
