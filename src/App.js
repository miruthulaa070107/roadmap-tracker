import React, { useState, useEffect } from 'react';
import GoalForm from './components/GoalForm';
import GoalList from './components/GoalList';
import RoadmapChart from './components/RoadmapChart';
import StreakTracker from './components/StreakTracker';
import Badges from './components/Badges';
import './App.css';

function App() {
  const [goals, setGoals] = useState([]);
  const [activeTab, setActiveTab] = useState('list');
  const [darkMode, setDarkMode] = useState(false);
  const [showConfetti, setShowConfetti] = useState(false);

  // Load saved data on startup
  useEffect(() => {
    const savedGoals = localStorage.getItem('roadmapGoals');
    if (savedGoals) {
      setGoals(JSON.parse(savedGoals));
    }
    const savedTheme = localStorage.getItem('darkMode');
    if (savedTheme) {
      setDarkMode(JSON.parse(savedTheme));
    }
  }, []);

  // Save goals to localStorage
  const saveGoals = (newGoals) => {
    setGoals(newGoals);
    localStorage.setItem('roadmapGoals', JSON.stringify(newGoals));
  };

  // Add new goal
  const addGoal = (goalText, priority, deadline) => {
    const newGoal = {
      id: Date.now(),
      text: goalText,
      completed: false,
      progress: 0,
      createdAt: new Date().toISOString(),
      priority: priority,
      deadline: deadline,
      notes: ''
    };
    saveGoals([...goals, newGoal]);
  };

  // Update progress
  const updateProgress = (id, newProgress) => {
    const wasCompleted = goals.find(g => g.id === id)?.completed;
    const isNowCompleted = newProgress === 100;
    
    const updatedGoals = goals.map(goal =>
      goal.id === id ? { ...goal, progress: newProgress, completed: isNowCompleted } : goal
    );
    saveGoals(updatedGoals);
    
    // Show confetti when goal gets completed
    if (!wasCompleted && isNowCompleted) {
      setShowConfetti(true);
      setTimeout(() => setShowConfetti(false), 3000);
    }
  };

  // Delete goal
  const deleteGoal = (id) => {
    const updatedGoals = goals.filter(goal => goal.id !== id);
    saveGoals(updatedGoals);
  };

  // Toggle dark mode
  const toggleDarkMode = () => {
    const newMode = !darkMode;
    setDarkMode(newMode);
    localStorage.setItem('darkMode', JSON.stringify(newMode));
  };

  // Calculate statistics
  const completedCount = goals.filter(g => g.completed).length;
  const totalProgress = goals.length > 0 
    ? Math.round(goals.reduce((sum, g) => sum + g.progress, 0) / goals.length) 
    : 0;

  return (
    <div className={`app ${darkMode ? 'dark-mode' : 'light-mode'}`}>
      {/* Confetti Effect */}
      {showConfetti && <div className="confetti">🎉</div>}
      
      {/* Animated Background */}
      <div className="animated-bg">
        <div className="gradient-1"></div>
        <div className="gradient-2"></div>
        <div className="gradient-3"></div>
      </div>

      <div className="container">
        {/* Header */}
        <div className="header">
          <div className="logo-section">
            <div className="logo-icon">🗺️</div>
            <div>
              <h1 className="title">Career Roadmap Tracker</h1>
              <p className="subtitle">Track your learning journey, achieve your dreams</p>
            </div>
          </div>
          
          <button onClick={toggleDarkMode} className="theme-toggle">
            {darkMode ? '☀️' : '🌙'}
          </button>
        </div>

        {/* Progress Overview Cards */}
        <div className="stats-grid">
          <div className="stat-card">
            <div className="stat-icon">📋</div>
            <div className="stat-value">{goals.length}</div>
            <div className="stat-label">Total Goals</div>
          </div>
          <div className="stat-card">
            <div className="stat-icon">✅</div>
            <div className="stat-value">{completedCount}</div>
            <div className="stat-label">Completed</div>
          </div>
          <div className="stat-card">
            <div className="stat-icon">🎯</div>
            <div className="stat-value">{goals.length - completedCount}</div>
            <div className="stat-label">In Progress</div>
          </div>
          <div className="stat-card">
            <div className="stat-icon">📊</div>
            <div className="stat-value">{totalProgress}%</div>
            <div className="stat-label">Overall Progress</div>
          </div>
        </div>

        {/* Progress Bar */}
        <div className="progress-section">
          <div className="progress-label">
            <span>Your Journey Progress</span>
            <span className="progress-percent">{totalProgress}%</span>
          </div>
          <div className="progress-bar-container">
            <div className="progress-bar-fill" style={{ width: `${totalProgress}%` }}>
              <div className="progress-glow"></div>
            </div>
          </div>
        </div>

        {/* Tab Navigation */}
        <div className="tabs">
          <button 
            className={`tab-btn ${activeTab === 'list' ? 'active' : ''}`}
            onClick={() => setActiveTab('list')}
          >
            <span className="tab-icon">📝</span>
            <span>My Goals</span>
          </button>
          <button 
            className={`tab-btn ${activeTab === 'roadmap' ? 'active' : ''}`}
            onClick={() => setActiveTab('roadmap')}
          >
            <span className="tab-icon">🗺️</span>
            <span>Visual Roadmap</span>
          </button>
          <button 
            className={`tab-btn ${activeTab === 'streak' ? 'active' : ''}`}
            onClick={() => setActiveTab('streak')}
          >
            <span className="tab-icon">🔥</span>
            <span>Streak Tracker</span>
          </button>
          <button 
            className={`tab-btn ${activeTab === 'badges' ? 'active' : ''}`}
            onClick={() => setActiveTab('badges')}
          >
            <span className="tab-icon">🏆</span>
            <span>Achievements</span>
          </button>
        </div>

        {/* Content Area */}
        <div className="content-card">
          {activeTab === 'list' && (
            <>
              <GoalForm onAdd={addGoal} />
              <GoalList 
                goals={goals} 
                onUpdateProgress={updateProgress}
                onDelete={deleteGoal}
              />
            </>
          )}
          
          {activeTab === 'roadmap' && (
            <RoadmapChart goals={goals} />
          )}
          
          {activeTab === 'streak' && (
            <StreakTracker goals={goals} />
          )}
          
          {activeTab === 'badges' && (
            <Badges goals={goals} completedCount={completedCount} />
          )}
        </div>

        {/* Footer */}
        <footer className="footer">
          <p>🎯 Stay consistent. Every small step counts!</p>
          <p className="footer-note">Data is saved locally in your browser</p>
        </footer>
      </div>
    </div>
  );
}

export default App;
