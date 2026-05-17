import React, { useState } from 'react';

function GoalForm({ onAdd }) {
  const [goalText, setGoalText] = useState('');
  const [priority, setPriority] = useState('Medium');
  const [deadline, setDeadline] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (goalText.trim()) {
      onAdd(goalText.trim(), priority, deadline);
      setGoalText('');
      setPriority('Medium');
      setDeadline('');
    }
  };

  return (
    <form onSubmit={handleSubmit} className="goal-form">
      <div className="form-group">
        <input
          type="text"
          value={goalText}
          onChange={(e) => setGoalText(e.target.value)}
          placeholder="What do you want to learn? (e.g., 'Master React.js')"
          className="form-input"
        />
      </div>
      
      <div className="form-row">
        <select 
          value={priority} 
          onChange={(e) => setPriority(e.target.value)}
          className="form-select"
        >
          <option value="High">🔴 High Priority</option>
          <option value="Medium">🟡 Medium Priority</option>
          <option value="Low">🟢 Low Priority</option>
        </select>
        
        <input
          type="date"
          value={deadline}
          onChange={(e) => setDeadline(e.target.value)}
          className="form-date"
        />
        
        <button type="submit" className="submit-btn">
          + Create Goal
        </button>
      </div>
    </form>
  );
}

export default GoalForm;