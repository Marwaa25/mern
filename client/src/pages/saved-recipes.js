import React, { useEffect, useState } from "react";
import { useGetUserID } from "../hooks/useGetUserID";
import axios from "axios";

export const SavedRecipes = () => {
  const [savedRecipes, setSavedRecipes] = useState([]);
  const userID = useGetUserID();

  useEffect(() => {
    const fetchSavedRecipes = async () => {
      try {
        const response = await axios.get(
          `http://localhost:3001/recipes/savedRecipes/${userID}`
        );
        setSavedRecipes(response.data.savedRecipes);
      } catch (err) {
        console.log(err);
      }
    };

    fetchSavedRecipes();
  }, []);

  return (
    <div>
      <h1 class="text-center">Saved Recipes</h1>
      <div className="container">
        <div className="row">
          {savedRecipes.map((recipe) => (
            <div key={recipe._id} className="col-md-3 mb-4">
              <div className="card">
                <img src={recipe.imageUrl} className="card-img-top" alt={recipe.name} />
                <div className="card-body">
                  <h5 className="card-title">{recipe.name}</h5>
                  <p className="card-text">{recipe.description}</p>
                  <p className="card-text">Cooking Time: {recipe.cookingTime} minutes</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
