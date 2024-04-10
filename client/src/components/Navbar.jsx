import React from "react";
import { Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";

function Navbar() {
  const { isAuthenticated, logout } = useAuth();
  const navigate = useNavigate();

  const handleAddTask = () => {
    navigate("/add-task");
  };

  useEffect(() => {
    if (!isAuthenticated) {
      navigate("/login");
    }
  }, [isAuthenticated]);

  return (
    <div className="bg-zinc-700 mb-5 flex justify-between py-5  px-10 rounded-lg">
      <Link to="/tasks">
        <h1 className="text-2xl font-bold">Tasks Manager</h1>
      </Link>
      <ul className="flex gap-x-2">
        {isAuthenticated ? (
          <>
            <button
              onClick={handleAddTask}
              className="nav-link bg-zinc-500 px-3 py-1 rounded-sm"
            >
              Add Task
            </button>
            <button
              onClick={() => {
                logout();
              }}
              className="bg-zinc-500 px-3 py-1 rounded-sm"
            >
              Logout
            </button>
          </>
        ) : (
          <>
            <li>
              <Link to="/login" className="bg-indigo-500 px-3 py-1 rounded-sm">
                Login
              </Link>
            </li>
            <li>
              <Link
                to="/register"
                className="bg-indigo-500 px-3 py-1 rounded-sm"
              >
                Register
              </Link>
            </li>
          </>
        )}
      </ul>
    </div>
  );
}

export default Navbar;
