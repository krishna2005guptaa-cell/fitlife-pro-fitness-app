import React, { useState } from 'react';
import './App.css';
import Dashboard from './components/Dashboard';
import WorkoutTracker from './components/WorkoutTracker';
import NutritionPlanner from './components/NutritionPlanner';
import ProgressTracker from './components/ProgressTracker';
import ExerciseLibrary from './components/ExerciseLibrary';

function App() {
  const [activeTab, setActiveTab] = useState('dashboard');
  const [userData, setUserData] = useState({
    name: 'User',
    weight: 70,
    height: 170,
    age: 25,
    goal: 'muscle_gain',
    workouts: [],
    meals: [],
    progress: []
  });

  const renderContent = () => {
    switch(activeTab) {
      case 'dashboard':
        return <Dashboard userData={userData} />;
      case 'workout':
        return <WorkoutTracker userData={userData} setUserData={setUserData} />;
      case 'nutrition':
        return <NutritionPlanner userData={userData} setUserData={setUserData} />;
      case 'progress':
        return <ProgressTracker userData={userData} setUserData={setUserData} />;
      case 'exercises':
        return <ExerciseLibrary />;
      default:
        return <Dashboard userData={userData} />;
    }
  };

  return (
    <div className="App">
      <nav className="navbar">
        <h1>💪 FitLife Pro</h1>
        <div className="nav-links">
          <button onClick={() => setActiveTab('dashboard')} className={activeTab === 'dashboard' ? 'active' : ''}>Dashboard</button>
          <button onClick={() => setActiveTab('workout')} className={activeTab === 'workout' ? 'active' : ''}>Workouts</button>
          <button onClick={() => setActiveTab('nutrition')} className={activeTab === 'nutrition' ? 'active' : ''}>Nutrition</button>
          <button onClick={() => setActiveTab('progress')} className={activeTab === 'progress' ? 'active' : ''}>Progress</button>
          <button onClick={() => setActiveTab('exercises')} className={activeTab === 'exercises' ? 'active' : ''}>Exercises</button>
        </div>
      </nav>
      <main className="main-content">
        {renderContent()}
      </main>
    </div>
  );
}

export default App;