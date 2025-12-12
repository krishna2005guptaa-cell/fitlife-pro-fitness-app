import React, { useState } from 'react';
import './ExerciseLibrary.css';

function ExerciseLibrary() {
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');

  const exercises = [
    { id: 1, name: 'Push-ups', category: 'strength', difficulty: 'beginner', muscle: 'Chest, Triceps', description: 'Classic bodyweight exercise for upper body strength' },
    { id: 2, name: 'Squats', category: 'strength', difficulty: 'beginner', muscle: 'Legs, Glutes', description: 'Fundamental lower body exercise' },
    { id: 3, name: 'Plank', category: 'core', difficulty: 'beginner', muscle: 'Core, Abs', description: 'Isometric core strengthening exercise' },
    { id: 4, name: 'Burpees', category: 'cardio', difficulty: 'intermediate', muscle: 'Full Body', description: 'High-intensity full body exercise' },
    { id: 5, name: 'Deadlifts', category: 'strength', difficulty: 'advanced', muscle: 'Back, Legs', description: 'Compound exercise for posterior chain' },
    { id: 6, name: 'Mountain Climbers', category: 'cardio', difficulty: 'intermediate', muscle: 'Core, Cardio', description: 'Dynamic cardio and core exercise' },
    { id: 7, name: 'Pull-ups', category: 'strength', difficulty: 'advanced', muscle: 'Back, Biceps', description: 'Upper body pulling exercise' },
    { id: 8, name: 'Lunges', category: 'strength', difficulty: 'beginner', muscle: 'Legs, Glutes', description: 'Unilateral leg exercise' },
    { id: 9, name: 'Russian Twists', category: 'core', difficulty: 'intermediate', muscle: 'Obliques, Core', description: 'Rotational core exercise' },
    { id: 10, name: 'Jump Rope', category: 'cardio', difficulty: 'beginner', muscle: 'Cardio, Calves', description: 'Classic cardio exercise' },
    { id: 11, name: 'Bench Press', category: 'strength', difficulty: 'intermediate', muscle: 'Chest, Triceps', description: 'Primary chest building exercise' },
    { id: 12, name: 'Bicycle Crunches', category: 'core', difficulty: 'beginner', muscle: 'Abs, Obliques', description: 'Dynamic ab exercise' }
  ];

  const filteredExercises = exercises.filter(ex => {
    const matchesCategory = selectedCategory === 'all' || ex.category === selectedCategory;
    const matchesSearch = ex.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
                         ex.muscle.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  const getDifficultyColor = (difficulty) => {
    switch(difficulty) {
      case 'beginner': return '#4CAF50';
      case 'intermediate': return '#FF9800';
      case 'advanced': return '#F44336';
      default: return '#999';
    }
  };

  return (
    <div className="exercise-library">
      <h2>Exercise Library 📚</h2>

      <div className="library-controls">
        <input 
          type="text" 
          placeholder="Search exercises..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="search-input"
        />

        <div className="category-filters">
          <button 
            className={selectedCategory === 'all' ? 'active' : ''}
            onClick={() => setSelectedCategory('all')}
          >
            All
          </button>
          <button 
            className={selectedCategory === 'strength' ? 'active' : ''}
            onClick={() => setSelectedCategory('strength')}
          >
            Strength
          </button>
          <button 
            className={selectedCategory === 'cardio' ? 'active' : ''}
            onClick={() => setSelectedCategory('cardio')}
          >
            Cardio
          </button>
          <button 
            className={selectedCategory === 'core' ? 'active' : ''}
            onClick={() => setSelectedCategory('core')}
          >
            Core
          </button>
        </div>
      </div>

      <div className="exercises-grid">
        {filteredExercises.map(exercise => (
          <div key={exercise.id} className="exercise-card">
            <div className="exercise-header">
              <h3>{exercise.name}</h3>
              <span 
                className="difficulty-badge"
                style={{ backgroundColor: getDifficultyColor(exercise.difficulty) }}
              >
                {exercise.difficulty}
              </span>
            </div>
            <p className="muscle-group">🎯 {exercise.muscle}</p>
            <p className="exercise-description">{exercise.description}</p>
            <button className="add-to-workout-btn">Add to Workout</button>
          </div>
        ))}
      </div>

      {filteredExercises.length === 0 && (
        <div className="no-results">
          <p>No exercises found. Try a different search or category.</p>
        </div>
      )}
    </div>
  );
}

export default ExerciseLibrary;