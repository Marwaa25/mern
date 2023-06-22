import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { useCookies } from "react-cookie";

export const Navbar = () => {
  const [cookies, setCookies] = useCookies(["access_token"]);
  const navigate = useNavigate();

  const logout = () => {
    setCookies("access_token", "");
    window.localStorage.clear();
    navigate("/auth");
  };

  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-dark justify-content-center">
      <div className="navbar-brand">
      <Link to="/" className="navbar-brand">Home</Link>
      </div>
      <ul className="navbar-nav">
        <li className="nav-item">
          <Link to="/create-recipe" className="nav-link">Create Recipe</Link>
        </li>
        <li className="nav-item">
          <Link to="/saved-recipes" className="nav-link">Saved Recipes</Link>
        </li>
      </ul>
      {!cookies.access_token ? (
        <Link to="/auth" className="btn btn-primary">Login/Register</Link>
      ) : (
        <button onClick={logout} className="btn btn-danger">Logout</button>
      )}
    </nav>
  );
};
