import React from 'react';
import './Dashboard.css';

function Dashboard({ userData }) {
  const calculateBMI = () => {
    const heightInMeters = userData.height / 100;
    return (userData.weight / (heightInMeters * heightInMeters)).toFixed(1);
  };

  const calculateCalories = () => {
    const bmr = 10 * userData.weight + 6.25 * userData.height - 5 * userData.age + 5;
    const multiplier = userData.goal === 'weight_loss' ? 1.2 : userData.goal === 'muscle_gain' ? 1.5 : 1.3;
    return Math.round(bmr * multiplier);
  };

  const todayWorkouts = userData.workouts.filter(w => {
    const today = new Date().toDateString();
    return new Date(w.date).toDateString() === today;
  }).length;

  const todayCalories = userData.meals.filter(m => {
    const today = new Date().toDateString();
    return new Date(m.date).toDateString() === today;
  }).reduce((sum, meal) => sum + meal.calories, 0);

  return (
    <div className="dashboard">
      <h2>Welcome back, {userData.name}! 👋</h2>
      
      <div className="stats-grid">
        <div className="stat-card">
          <h3>BMI</h3>
          <p className="stat-value">{calculateBMI()}</p>
          <span className="stat-label">Body Mass Index</span>
        </div>
        
        <div className="stat-card">
          <h3>Daily Calories</h3>
          <p className="stat-value">{calculateCalories()}</p>
          <span className="stat-label">Recommended</span>
        </div>
        
        <div className="stat-card">
          <h3>Today's Workouts</h3>
          <p className="stat-value">{todayWorkouts}</p>
          <span className="stat-label">Completed</span>
        </div>
        
        <div className="stat-card">
          <h3>Calories Consumed</h3>
          <p className="stat-value">{todayCalories}</p>
          <span className="stat-label">Today</span>
        </div>
      </div>

      <div className="quick-actions">
        <h3>Quick Actions</h3>
        <div className="action-buttons">
          <button className="action-btn">🏃 Start Workout</button>
          <button className="action-btn">🍎 Log Meal</button>
          <button className="action-btn">📊 View Progress</button>
          <button className="action-btn">💧 Water Reminder</button>
        </div>
      </div>

      <div className="motivational-quote">
        <p>"The only bad workout is the one that didn't happen."</p>
      </div>
    </div>
  );
}

export default Dashboard;