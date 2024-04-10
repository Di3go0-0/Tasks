import { useForm } from "react-hook-form";
import { useAuth } from "../context/AuthContext";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import { useState } from "react";

function RegisterPage() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const { signup, isAuthenticated, errors: RegisterErrors } = useAuth();
  const navigate = useNavigate();
  const [errorMessage, setErrorMessage] = useState("");

  useEffect(() => {
    if (isAuthenticated) {
      navigate("/tasks");
    }
  }, [isAuthenticated]);

  const onSubmit = handleSubmit((data) => {
    signup(data);
  });

  return (
    <div className="flex h-[calc(100vh-100px)] items-center justify-center">
      <div className="bg-zinc-800 max-w-md p-10 rounded-md">
        {RegisterErrors.length > 0 && (
          <div className="bg-red-500 text-white p-2 rounded-md my-2 text-center ">
            {RegisterErrors.map((error, index) => (
              <p key={index}>{error}</p>
            ))}
          </div>
        )}
        <h1 className="text-2xl font-bold">Register</h1>
        <form onSubmit={onSubmit}>
          <input
            type="email"
            {...register("email", { required: true })}
            className="w-full bg-zinc-700 text-white px-4 py-2 rounded-md my-2"
            placeholder="Email"
          />
          {errors.email && <p className="text-red-500">Email is required</p>}
          <input
            type="password"
            {...register("password", {
              required: true,
              minLength: 4,
              maxLength: 100,
            })}
            className="w-full bg-zinc-700 text-white px-4 py-2 rounded-md my-2"
            placeholder="Password"
          />
          {errors.password && (
            <p className="text-red-500">
              The password must be a minimum of 5 characters
            </p>
          )}

          <input
            type="password"
            {...register("passwordConfirm", {
              required: true,
              minLength: 4,
              maxLength: 100,
            })}
            className="w-full bg-zinc-700 text-white px-4 py-2 rounded-md my-2"
            placeholder="Confirm Password"
          />

          {errors.passwordConfirm && (
            <p className="text-red-500">
              The password must be a minimum of 5 characters
            </p>
          )}
          <button type="submit" className="font-bold cursor-pointer" >
            Register
          </button>
        </form>
        <p className="mt-4 flex gap-x-2 justify-between">
          Already have an account{" "}
          <Link to="/login" className="font-bold cursor-pointer">
            Login
          </Link>
        </p>
      </div>
    </div>
  );
}

export default RegisterPage;
