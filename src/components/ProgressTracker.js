import React, { useState } from 'react';
import './ProgressTracker.css';

function ProgressTracker({ userData, setUserData }) {
  const [weight, setWeight] = useState('');
  const [bodyFat, setBodyFat] = useState('');
  const [measurements, setMeasurements] = useState({
    chest: '',
    waist: '',
    hips: '',
    arms: ''
  });

  const logProgress = () => {
    const newProgress = {
      id: Date.now(),
      date: new Date().toISOString(),
      weight: parseFloat(weight),
      bodyFat: parseFloat(bodyFat),
      measurements: { ...measurements }
    };

    setUserData({
      ...userData,
      progress: [...userData.progress, newProgress]
    });

    alert('Progress logged! 📈');
    setWeight('');
    setBodyFat('');
    setMeasurements({ chest: '', waist: '', hips: '', arms: '' });
  };

  const weeklyStats = () => {
    const lastWeek = userData.workouts.filter(w => {
      const weekAgo = new Date();
      weekAgo.setDate(weekAgo.getDate() - 7);
      return new Date(w.date) >= weekAgo;
    });

    return {
      workouts: lastWeek.length,
      totalMinutes: lastWeek.reduce((sum, w) => sum + parseInt(w.duration), 0),
      totalCalories: lastWeek.reduce((sum, w) => sum + w.calories, 0)
    };
  };

  const stats = weeklyStats();

  return (
    <div className="progress-tracker">
      <h2>Progress Tracker 📊</h2>

      <div className="weekly-stats">
        <h3>This Week's Stats</h3>
        <div className="stats-grid">
          <div className="stat-box">
            <h4>{stats.workouts}</h4>
            <p>Workouts</p>
          </div>
          <div className="stat-box">
            <h4>{stats.totalMinutes}</h4>
            <p>Minutes</p>
          </div>
          <div className="stat-box">
            <h4>{stats.totalCalories}</h4>
            <p>Calories Burned</p>
          </div>
        </div>
      </div>

      <div className="log-progress">
        <h3>Log Your Progress</h3>
        <div className="progress-form">
          <div className="form-group">
            <label>Weight (kg):</label>
            <input 
              type="number" 
              step="0.1"
              value={weight} 
              onChange={(e) => setWeight(e.target.value)}
              placeholder="70.5"
            />
          </div>

          <div className="form-group">
            <label>Body Fat (%):</label>
            <input 
              type="number" 
              step="0.1"
              value={bodyFat} 
              onChange={(e) => setBodyFat(e.target.value)}
              placeholder="15.5"
            />
          </div>

          <h4>Measurements (cm)</h4>
          <div className="measurements-grid">
            <input 
              type="number" 
              placeholder="Chest"
              value={measurements.chest}
              onChange={(e) => setMeasurements({...measurements, chest: e.target.value})}
            />
            <input 
              type="number" 
              placeholder="Waist"
              value={measurements.waist}
              onChange={(e) => setMeasurements({...measurements, waist: e.target.value})}
            />
            <input 
              type="number" 
              placeholder="Hips"
              value={measurements.hips}
              onChange={(e) => setMeasurements({...measurements, hips: e.target.value})}
            />
            <input 
              type="number" 
              placeholder="Arms"
              value={measurements.arms}
              onChange={(e) => setMeasurements({...measurements, arms: e.target.value})}
            />
          </div>

          <button onClick={logProgress}>Log Progress</button>
        </div>
      </div>

      <div className="progress-history">
        <h3>Progress History</h3>
        {userData.progress.slice(-10).reverse().map(entry => (
          <div key={entry.id} className="progress-entry">
            <span className="date">{new Date(entry.date).toLocaleDateString()}</span>
            <span>Weight: {entry.weight}kg</span>
            <span>Body Fat: {entry.bodyFat}%</span>
            <span>Chest: {entry.measurements.chest}cm</span>
          </div>
        ))}
      </div>

      <div className="achievements">
        <h3>Achievements 🏆</h3>
        <div className="badges">
          {userData.workouts.length >= 10 && <div className="badge">🔥 10 Workouts</div>}
          {userData.workouts.length >= 50 && <div className="badge">💪 50 Workouts</div>}
          {stats.workouts >= 5 && <div className="badge">⭐ 5 Days Streak</div>}
        </div>
      </div>
    </div>
  );
}

export default ProgressTracker;