import React from 'react';

function Badges({ goals, completedCount }) {
  const badges = [
    {
      id: 'first',
      name: 'First Step',
      emoji: '🚀',
      condition: goals.length >= 1,
      description: 'Added your first goal'
    },
    {
      id: 'firstComplete',
      name: 'Goal Getter',
      emoji: '🎯',
      condition: completedCount >= 1,
      description: 'Completed your first goal'
    },
    {
      id: 'fiveGoals',
      name: 'Goal Master',
      emoji: '👑',
      condition: goals.length >= 5,
      description: 'Created 5+ goals'
    },
    {
      id: 'fiveComplete',
      name: 'Completion Expert',
      emoji: '🏆',
      condition: completedCount >= 5,
      description: 'Completed 5+ goals'
    },
    {
      id: 'allComplete',
      name: 'Roadmap Champion',
      emoji: '⭐',
      condition: goals.length > 0 && completedCount === goals.length,
      description: 'Completed all your goals'
    }
  ];

  const earnedBadges = badges.filter(b => b.condition);
  const lockedBadges = badges.filter(b => !b.condition);

  return (
    <div>
      <h2 className="text-xl font-semibold text-gray-700 mb-4 text-center">
        🏆 Achievements ({earnedBadges.length}/{badges.length})
      </h2>
      
      {earnedBadges.length > 0 && (
        <div className="mb-8">
          <h3 className="text-lg font-semibold text-green-600 mb-3">Earned Badges</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {earnedBadges.map(badge => (
              <div key={badge.id} className="bg-gradient-to-r from-green-50 to-emerald-50 rounded-lg p-4 flex items-center gap-4">
                <div className="text-5xl">{badge.emoji}</div>
                <div>
                  <div className="font-semibold text-gray-800">{badge.name}</div>
                  <div className="text-sm text-gray-600">{badge.description}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
      
      {lockedBadges.length > 0 && (
        <div>
          <h3 className="text-lg font-semibold text-gray-500 mb-3">Locked Badges</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 opacity-60">
            {lockedBadges.map(badge => (
              <div key={badge.id} className="bg-gray-100 rounded-lg p-4 flex items-center gap-4">
                <div className="text-5xl grayscale">🔒</div>
                <div>
                  <div className="font-semibold text-gray-500">{badge.name}</div>
                  <div className="text-sm text-gray-400">{badge.description}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
      
      {goals.length === 0 && (
        <div className="text-center py-8 text-gray-500">
          <div className="text-6xl mb-3">🎯</div>
          <p>Add and complete goals to earn badges!</p>
        </div>
      )}
    </div>
  );
}

export default Badges;