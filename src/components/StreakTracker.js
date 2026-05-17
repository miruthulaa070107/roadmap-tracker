import React, { useState, useEffect } from 'react';

function StreakTracker({ goals }) {
  const [streak, setStreak] = useState(0);
  const [lastCheckin, setLastCheckin] = useState(null);
  const [checkedInToday, setCheckedInToday] = useState(false);

  useEffect(() => {
    const savedStreak = localStorage.getItem('streakData');
    if (savedStreak) {
      const data = JSON.parse(savedStreak);
      setStreak(data.streak);
      setLastCheckin(data.lastCheckin);
      const today = new Date().toDateString();
      setCheckedInToday(data.lastCheckin === today);
    }
  }, []);

  const handleCheckin = () => {
    const today = new Date().toDateString();
    const yesterday = new Date(Date.now() - 86400000).toDateString();
    
    let newStreak = streak;
    
    if (lastCheckin === yesterday) {
      newStreak = streak + 1;
    } else if (lastCheckin !== today) {
      newStreak = 1;
    }
    
    setStreak(newStreak);
    setLastCheckin(today);
    setCheckedInToday(true);
    
    localStorage.setItem('streakData', JSON.stringify({
      streak: newStreak,
      lastCheckin: today
    }));
  };

  const completedToday = goals.filter(g => g.completed).length;
  const totalGoals = goals.length;

  return (
    <div>
      <div className="text-center mb-8">
        <div className="text-8xl mb-4">🔥</div>
        <h2 className="text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-orange-500 to-red-500">
          {streak} Day Streak!
        </h2>
        <p className="text-gray-600 mt-2">Keep the fire burning!</p>
      </div>

      {!checkedInToday ? (
        <div className="text-center">
          <button
            onClick={handleCheckin}
            className="px-8 py-3 bg-gradient-to-r from-orange-500 to-red-500 text-white rounded-lg font-semibold text-lg hover:shadow-lg transition-all"
          >
            🔥 Check-in Today
          </button>
          <p className="text-sm text-gray-500 mt-3">Check in daily to build your streak!</p>
        </div>
      ) : (
        <div className="text-center bg-green-50 rounded-lg p-6">
          <div className="text-4xl mb-2">✅</div>
          <p className="text-green-600 font-semibold">You've checked in today!</p>
          <p className="text-sm text-gray-500 mt-2">Come back tomorrow to continue your streak</p>
        </div>
      )}

      <div className="mt-8 bg-gray-50 rounded-lg p-6">
        <h3 className="font-semibold text-gray-700 mb-3">📊 Your Stats</h3>
        <div className="grid grid-cols-2 gap-4">
          <div className="text-center">
            <div className="text-2xl font-bold text-blue-600">{totalGoals}</div>
            <div className="text-sm text-gray-600">Total Goals</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold text-green-600">{completedToday}</div>
            <div className="text-sm text-gray-600">Completed</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold text-purple-600">
              {totalGoals ? Math.round((completedToday/totalGoals)*100) : 0}%
            </div>
            <div className="text-sm text-gray-600">Completion Rate</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold text-orange-600">{streak}</div>
            <div className="text-sm text-gray-600">Best Streak</div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default StreakTracker;