import React, { useState } from 'react';
import './NutritionPlanner.css';

function NutritionPlanner({ userData, setUserData }) {
  const [mealName, setMealName] = useState('');
  const [calories, setCalories] = useState('');
  const [protein, setProtein] = useState('');
  const [carbs, setCarbs] = useState('');
  const [fats, setFats] = useState('');

  const mealSuggestions = [
    { name: 'Oatmeal with Berries', calories: 300, protein: 10, carbs: 50, fats: 8 },
    { name: 'Grilled Chicken Salad', calories: 400, protein: 35, carbs: 20, fats: 15 },
    { name: 'Protein Smoothie', calories: 250, protein: 25, carbs: 30, fats: 5 },
    { name: 'Brown Rice & Vegetables', calories: 350, protein: 12, carbs: 60, fats: 8 },
    { name: 'Greek Yogurt & Nuts', calories: 200, protein: 15, carbs: 15, fats: 10 },
    { name: 'Salmon with Quinoa', calories: 500, protein: 40, carbs: 45, fats: 20 }
  ];

  const addMeal = (meal = null) => {
    const newMeal = meal || {
      name: mealName,
      calories: parseInt(calories),
      protein: parseInt(protein),
      carbs: parseInt(carbs),
      fats: parseInt(fats),
      date: new Date().toISOString()
    };

    if (!meal) {
      newMeal.date = new Date().toISOString();
    }

    setUserData({
      ...userData,
      meals: [...userData.meals, { ...newMeal, id: Date.now() }]
    });

    setMealName('');
    setCalories('');
    setProtein('');
    setCarbs('');
    setFats('');
    
    alert('Meal logged! 🍽️');
  };

  const todayMeals = userData.meals.filter(m => {
    const today = new Date().toDateString();
    return new Date(m.date).toDateString() === today;
  });

  const todayTotals = todayMeals.reduce((acc, meal) => ({
    calories: acc.calories + meal.calories,
    protein: acc.protein + meal.protein,
    carbs: acc.carbs + meal.carbs,
    fats: acc.fats + meal.fats
  }), { calories: 0, protein: 0, carbs: 0, fats: 0 });

  return (
    <div className="nutrition-planner">
      <h2>Nutrition Planner 🍎</h2>

      <div className="nutrition-summary">
        <h3>Today's Nutrition</h3>
        <div className="macro-grid">
          <div className="macro-card">
            <h4>Calories</h4>
            <p>{todayTotals.calories}</p>
          </div>
          <div className="macro-card">
            <h4>Protein</h4>
            <p>{todayTotals.protein}g</p>
          </div>
          <div className="macro-card">
            <h4>Carbs</h4>
            <p>{todayTotals.carbs}g</p>
          </div>
          <div className="macro-card">
            <h4>Fats</h4>
            <p>{todayTotals.fats}g</p>
          </div>
        </div>
      </div>

      <div className="meal-suggestions">
        <h3>Quick Add Meals</h3>
        <div className="suggestions-grid">
          {mealSuggestions.map((meal, idx) => (
            <div key={idx} className="suggestion-card" onClick={() => addMeal(meal)}>
              <h4>{meal.name}</h4>
              <p>{meal.calories} cal | P: {meal.protein}g | C: {meal.carbs}g | F: {meal.fats}g</p>
            </div>
          ))}
        </div>
      </div>

      <div className="add-meal">
        <h3>Log Custom Meal</h3>
        <div className="meal-form">
          <input 
            type="text" 
            placeholder="Meal name" 
            value={mealName} 
            onChange={(e) => setMealName(e.target.value)}
          />
          <input 
            type="number" 
            placeholder="Calories" 
            value={calories} 
            onChange={(e) => setCalories(e.target.value)}
          />
          <input 
            type="number" 
            placeholder="Protein (g)" 
            value={protein} 
            onChange={(e) => setProtein(e.target.value)}
          />
          <input 
            type="number" 
            placeholder="Carbs (g)" 
            value={carbs} 
            onChange={(e) => setCarbs(e.target.value)}
          />
          <input 
            type="number" 
            placeholder="Fats (g)" 
            value={fats} 
            onChange={(e) => setFats(e.target.value)}
          />
          <button onClick={() => addMeal()}>Add Meal</button>
        </div>
      </div>

      <div className="recent-meals">
        <h3>Today's Meals</h3>
        {todayMeals.map(meal => (
          <div key={meal.id} className="meal-item">
            <span className="meal-name">{meal.name}</span>
            <span>{meal.calories} cal</span>
            <span>P: {meal.protein}g</span>
            <span>C: {meal.carbs}g</span>
            <span>F: {meal.fats}g</span>
          </div>
        ))}
      </div>
    </div>
  );
}

export default NutritionPlanner;