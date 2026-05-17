import React from 'react';

function GoalList({ goals, onUpdateProgress, onDelete }) {
  if (goals.length === 0) {
    return (
      <div className="text-center py-12">
        <div className="text-6xl mb-4">🎯</div>
        <h3 className="text-xl font-semibold text-gray-600 mb-2">No goals yet!</h3>
        <p className="text-gray-500">Add your first learning goal above 👆</p>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      <h2 className="text-xl font-semibold text-gray-700 mb-4">Your Learning Goals</h2>
      {goals.map(goal => (
        <div key={goal.id} className="bg-gray-50 rounded-lg p-4 hover:shadow-md transition-all">
          <div className="flex justify-between items-start mb-2">
            <div className="flex-1">
              <h3 className={`font-semibold text-lg ${goal.completed ? 'line-through text-gray-400' : 'text-gray-800'}`}>
                {goal.text}
              </h3>
              <p className="text-xs text-gray-400 mt-1">
                Added: {new Date(goal.createdAt).toLocaleDateString()}
              </p>
            </div>
            <button
              onClick={() => onDelete(goal.id)}
              className="text-red-400 hover:text-red-600 transition-colors ml-3"
            >
              🗑️
            </button>
          </div>
          
          <div className="mt-3">
            <div className="flex justify-between text-sm text-gray-600 mb-1">
              <span>Progress</span>
              <span>{goal.progress}%</span>
            </div>
            <input
              type="range"
              min="0"
              max="100"
              value={goal.progress}
              onChange={(e) => onUpdateProgress(goal.id, parseInt(e.target.value))}
              className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer"
            />
          </div>
          
          {goal.completed && (
            <div className="mt-2 text-green-500 text-sm flex items-center gap-1">
              ✅ Completed! Great job!
            </div>
          )}
        </div>
      ))}
    </div>
  );
}

export default GoalList;