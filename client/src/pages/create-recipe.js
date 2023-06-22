import React, { useState } from "react";
import axios from "axios";
import { useGetUserID } from "../hooks/useGetUserID";
import { useNavigate } from "react-router-dom";
import { useCookies } from "react-cookie";

export const CreateRecipe = () => {
  const userID = useGetUserID();
  const [cookies, _] = useCookies(["access_token"]);
  const [recipe, setRecipe] = useState({
    name: "",
    description: "",
    ingredients: [],
    instructions: "",
    imageUrl: "",
    cookingTime: 0,
    userOwner: userID,
  });

  const navigate = useNavigate();

  const handleChange = (event) => {
    const { name, value } = event.target;
    setRecipe({ ...recipe, [name]: value });
  };

  const handleIngredientChange = (event, index) => {
    const { value } = event.target;
    const ingredients = [...recipe.ingredients];
    ingredients[index] = value;
    setRecipe({ ...recipe, ingredients });
  };

  const handleAddIngredient = () => {
    const ingredients = [...recipe.ingredients, ""];
    setRecipe({ ...recipe, ingredients });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      await axios.post(
        "http://localhost:3001/recipes",
        { ...recipe },
        {
          headers: { authorization: cookies.access_token },
        }
      );

      alert("Recipe Created");
      navigate("/");
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="create-recipe">
      <h2 class="text-center">Create Recipe</h2>
      <div className="container">
        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <label htmlFor="name" className="form-label">Name</label>
            <input
              type="text"
              id="name"
              name="name"
              value={recipe.name}
              onChange={handleChange}
              className="form-control"
            />
          </div>
          <div className="mb-3">
            <label htmlFor="description" className="form-label">Description</label>
            <textarea
              id="description"
              name="description"
              value={recipe.description}
              onChange={handleChange}
              className="form-control"
            ></textarea>
          </div>
          <div className="mb-3">
            <label htmlFor="ingredients" className="form-label">Ingredients</label>
            {recipe.ingredients.map((ingredient, index) => (
              <input
                key={index}
                type="text"
                name="ingredients"
                value={ingredient}
                onChange={(event) => handleIngredientChange(event, index)}
                className="form-control"
              />
            ))}
            <button type="button" onClick={handleAddIngredient} className="btn btn-secondary mt-2">Add Ingredient</button>
          </div>
          <div className="mb-3">
            <label htmlFor="instructions" className="form-label">Instructions</label>
            <textarea
              id="instructions"
              name="instructions"
              value={recipe.instructions}
              onChange={handleChange}
              className="form-control"
            ></textarea>
          </div>
          <div className="mb-3">
            <label htmlFor="imageUrl" className="form-label">Image URL</label>
            <input
              type="file"
              id="imageUrl"
              name="imageUrl"
              value={recipe.imageUrl}
              onChange={handleChange}
              className="form-control"
            />
          </div>
          <div className="mb-3">
            <label htmlFor="cookingTime" className="form-label">Cooking Time (minutes)</label>
            <input
              type="number"
              id="cookingTime"
              name="cookingTime"
              value={recipe.cookingTime}
              onChange={handleChange}
              className="form-control"
            />
          </div>
          <button type="submit" className="btn btn-primary">Create Recipe</button>
        </form>
      </div>
    </div>
  );
};
