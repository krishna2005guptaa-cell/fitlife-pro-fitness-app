import React, { useState } from 'react';
import './WorkoutTracker.css';

function WorkoutTracker({ userData, setUserData }) {
  const [selectedWorkout, setSelectedWorkout] = useState(null);
  const [duration, setDuration] = useState(30);
  const [intensity, setIntensity] = useState('medium');

  const workoutTypes = [
    { id: 1, name: 'Cardio', icon: '🏃', calories: 300, exercises: ['Running', 'Cycling', 'Jump Rope', 'Burpees'] },
    { id: 2, name: 'Strength', icon: '💪', calories: 250, exercises: ['Push-ups', 'Squats', 'Deadlifts', 'Bench Press'] },
    { id: 3, name: 'Yoga', icon: '🧘', calories: 150, exercises: ['Sun Salutation', 'Warrior Pose', 'Tree Pose', 'Downward Dog'] },
    { id: 4, name: 'HIIT', icon: '⚡', calories: 400, exercises: ['Mountain Climbers', 'High Knees', 'Plank Jacks', 'Jump Squats'] },
    { id: 5, name: 'Flexibility', icon: '🤸', calories: 100, exercises: ['Stretching', 'Foam Rolling', 'Dynamic Stretches'] },
    { id: 6, name: 'Core', icon: '🎯', calories: 200, exercises: ['Planks', 'Crunches', 'Russian Twists', 'Leg Raises'] }
  ];

  const logWorkout = () => {
    if (!selectedWorkout) return;
    
    const intensityMultiplier = intensity === 'low' ? 0.7 : intensity === 'high' ? 1.3 : 1;
    const caloriesBurned = Math.round((selectedWorkout.calories * duration / 30) * intensityMultiplier);
    
    const newWorkout = {
      id: Date.now(),
      type: selectedWorkout.name,
      duration,
      intensity,
      calories: caloriesBurned,
      date: new Date().toISOString()
    };
    
    setUserData({
      ...userData,
      workouts: [...userData.workouts, newWorkout]
    });
    
    alert(`Workout logged! 🎉 You burned ${caloriesBurned} calories!`);
    setSelectedWorkout(null);
  };

  return (
    <div className="workout-tracker">
      <h2>Workout Tracker 🏋️</h2>
      
      <div className="workout-grid">
        {workoutTypes.map(workout => (
          <div 
            key={workout.id} 
            className={`workout-card ${selectedWorkout?.id === workout.id ? 'selected' : ''}`}
            onClick={() => setSelectedWorkout(workout)}
          >
            <span className="workout-icon">{workout.icon}</span>
            <h3>{workout.name}</h3>
            <p>{workout.calories} cal/30min</p>
          </div>
        ))}
      </div>

      {selectedWorkout && (
        <div className="workout-details">
          <h3>Configure Your {selectedWorkout.name} Workout</h3>
          
          <div className="workout-exercises">
            <h4>Exercises:</h4>
            <ul>
              {selectedWorkout.exercises.map((ex, idx) => (
                <li key={idx}>{ex}</li>
              ))}
            </ul>
          </div>

          <div className="workout-config">
            <div className="config-item">
              <label>Duration (minutes):</label>
              <input 
                type="range" 
                min="10" 
                max="120" 
                value={duration} 
                onChange={(e) => setDuration(e.target.value)}
              />
              <span>{duration} min</span>
            </div>

            <div className="config-item">
              <label>Intensity:</label>
              <select value={intensity} onChange={(e) => setIntensity(e.target.value)}>
                <option value="low">Low</option>
                <option value="medium">Medium</option>
                <option value="high">High</option>
              </select>
            </div>
          </div>

          <button className="log-btn" onClick={logWorkout}>Log Workout</button>
        </div>
      )}

      <div className="recent-workouts">
        <h3>Recent Workouts</h3>
        {userData.workouts.slice(-5).reverse().map(workout => (
          <div key={workout.id} className="workout-item">
            <span>{workout.type}</span>
            <span>{workout.duration} min</span>
            <span>{workout.calories} cal</span>
            <span>{new Date(workout.date).toLocaleDateString()}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

export default WorkoutTracker;