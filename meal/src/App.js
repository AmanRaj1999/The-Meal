import React, { useState } from "react";
import axios from "axios";
import "./App.css";

function App() {
  const [searchTerm, setSearchTerm] = useState("");
  const [meals, setMeals] = useState([]);

  const searchMeal = async () => {
    try {
      const response = await axios.get(
        `https://www.themealdb.com/api/json/v1/1/search.php?s=${searchTerm}`
      );
      setMeals(response.data.meals || []);
      // setSearchTerm(""); // Clear the input field
    } catch (error) {
      console.error(error);
      setMeals([]);
    }
  };

  return (
    <div className="app-container">
      <h1>Meal App</h1>
      <div className="search-container">
        <input
          className="search-input"
          type="text"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        <button className="search-button" onClick={searchMeal}>
          Search
        </button>
      </div>

      {meals.length === 0 ? (
        <p>No meals found.</p>
      ) : (
        <div className="meal-container">
          {meals.map((meal) => (
            <div className="meal-card" key={meal.idMeal}>
              <h2>{meal.strMeal}</h2>
              <img src={meal.strMealThumb} alt={meal.strMeal} />
              <p>Category: {meal.strCategory}</p>
              <p>Origin: {meal.strArea}</p>
              <p>Instructions: {meal.strInstructions}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default App;
