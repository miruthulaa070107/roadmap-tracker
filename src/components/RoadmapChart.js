import React, { useEffect, useRef } from 'react';
import mermaid from 'mermaid';

function RoadmapChart({ goals }) {
  const chartRef = useRef(null);

  useEffect(() => {
    if (goals.length === 0) return;

    mermaid.initialize({ startOnLoad: true, theme: 'base' });
    
    const completedGoals = goals.filter(g => g.completed).length;
    const inProgressGoals = goals.filter(g => g.progress > 0 && g.progress < 100).length;
    const notStartedGoals = goals.filter(g => g.progress === 0).length;
    
    const roadmapData = `
      graph TD
        A[Start Your Journey] --> B
        B[Learning Goals]
        B --> C1[Completed: ${completedGoals}]
        B --> C2[In Progress: ${inProgressGoals}]
        B --> C3[Not Started: ${notStartedGoals}]
        
        C1 --> D[🎉 Achievement Unlocked!]
        C2 --> E[Keep Going! 🔥]
        C3 --> F[Start Today! 💪]
        
        style A fill:#3b82f6,color:#fff
        style B fill:#8b5cf6,color:#fff
        style D fill:#10b981,color:#fff
        style E fill:#f59e0b,color:#fff
        style F fill:#ef4444,color:#fff
    `;

    try {
      mermaid.render('roadmap-diagram', roadmapData).then((result) => {
        if (chartRef.current) {
          chartRef.current.innerHTML = result.svg;
        }
      });
    } catch (error) {
      console.error('Mermaid error:', error);
    }
  }, [goals]);

  if (goals.length === 0) {
    return (
      <div className="text-center py-12">
        <div className="text-6xl mb-4">🗺️</div>
        <h3 className="text-xl font-semibold text-gray-600 mb-2">Add goals to see your roadmap!</h3>
        <p className="text-gray-500">Go to "My Goals" tab and add your first learning goal</p>
      </div>
    );
  }

  return (
    <div>
      <h2 className="text-xl font-semibold text-gray-700 mb-4 text-center">Your Learning Roadmap</h2>
      <div className="bg-white p-4 rounded-lg overflow-x-auto">
        <div ref={chartRef} className="flex justify-center"></div>
      </div>
      
      <div className="mt-8">
        <h3 className="font-semibold text-gray-700 mb-3">📋 Your Goals Breakdown</h3>
        <div className="space-y-2">
          {goals.map(goal => (
            <div key={goal.id} className="flex items-center gap-3">
              <span className="w-8 text-sm">{goal.progress}%</span>
              <div className="flex-1 bg-gray-200 rounded-full h-2">
                <div 
                  className="bg-gradient-to-r from-blue-500 to-purple-500 h-2 rounded-full transition-all"
                  style={{ width: `${goal.progress}%` }}
                ></div>
              </div>
              <span className="text-sm text-gray-600 truncate flex-1">{goal.text}</span>
              {goal.completed && <span className="text-green-500 text-sm">✅</span>}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default RoadmapChart;