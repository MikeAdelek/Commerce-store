import { useNavigate, Link } from "react-router-dom";
import { AuthContext } from "../utils/CartContext";
import React, { useState, useContext } from "react";
import { AlertCircle, Eye, EyeOff } from "lucide-react";
import { useFormValidation } from "../utils/validateForm";
import SignUpPage from "../Admin/SignUp";

const Login = () => {
  const navigate = useNavigate();
  const { signIn } = useContext(AuthContext);
  const { formData, setFormData, errors, validateForm } = useFormValidation({
    email: "",
    password: ""
  });
  const [error, setError] = useState({});
  const [showPassword, setShowPassword] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (validateForm()) {
      setIsSubmitting(true);

      try {
        // Fake API call
        await new Promise((resolve) => setTimeout(resolve, 1500));
        signIn({ email: formData.email });
        navigate("/home");
      } catch (error) {
        setError({ submit: "Login failed. Please try again" });
      } finally {
        setIsSubmitting(false);
      }
    }
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    errors[e.target.name] = ""; // Clear error message
  };

  return (
    <div className="min-h-[43.5rem] flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8">
        <div className="text-center">
          <h2 className="mt-6 text-3xl font-bold text-emerald-700">
            Commerce Store
          </h2>
          <p className="mt-2 text-sm text-gray-600">
            Please sign in to shop with us!
          </p>
        </div>

        <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
          {errors.submit && (
            <div className="rounded-md bg-red-50 p-4">
              <div className="flex">
                <AlertCircle className="h-5 w-5 text-red-400" />
                <div className="ml-3">
                  <h3 className="text-sm font-medium text-red-800">
                    {errors.submit}
                  </h3>
                </div>
              </div>
            </div>
          )}

          <div className="rounded-md shadow-sm space-y-4">
            {/* Email Field */}
            <div>
              <label
                htmlFor="email"
                className="block text-sm font-medium text-gray-700"
              >
                Email Address
              </label>
              <input
                type="text"
                id="email"
                name="email"
                autoComplete="email"
                required
                className={`mt-1 appearance-none relative block w-full px-3 py-2 border ${
                  errors.email ? "border-red-300" : "border-gray-300"
                } rounded-md placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-emerald-800 focus:border-emerald-800 sm:text-sm`}
                placeholder="Enter your email"
                value={formData.email}
                onChange={handleChange}
              />
              {errors.email && (
                <p className="mt-2 text-sm text-red-600">{errors.email}</p>
              )}
            </div>

            {/* Password Field */}
            <div className="relative">
              <label
                htmlFor="password"
                className="block text-sm font-medium text-gray-700"
              >
                Password
              </label>
              <input
                type={showPassword ? "text" : "password"}
                id="password"
                name="password"
                autoComplete="current-password"
                required
                className={`appearance-none relative block w-full px-3 py-2 border ${
                  errors.password ? "border-red-300" : "border-gray-300"
                } rounded-md placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-emerald-800 focus:border-emerald-800 sm:text-sm`}
                placeholder="Enter your password"
                value={formData.password}
                onChange={handleChange}
              />
              <button
                type="button"
                className="flex items-center"
                onClick={() => setShowPassword(!showPassword)}
              >
                {showPassword ? (
                  <EyeOff className="h-5 w-5 text-gray-400 absolute top-7 right-5" />
                ) : (
                  <Eye className="h-5 w-5 text-gray-400 absolute top-7 right-5" />
                )}
              </button>
              {errors.password && (
                <p className="mt-2 text-sm text-red-600">{errors.password}</p>
              )}
            </div>
          </div>

          {/* Sign in button */}
          <div>
            <button
              type="submit"
              disabled={isSubmitting}
              className={`group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white ${
                isSubmitting
                  ? "bg-emerald-700 cursor-not-allowed"
                  : "bg-emerald-700 hover:bg-emerald-800"
              } focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-emerald-800`}
            >
              {isSubmitting ? "Signing in..." : "Sign in to continue"}
            </button>
          </div>
        </form>
        <div className="text-center">
          <p className="text-sm text-gray-600">
            Don't have an account?{" "}
            <Link
              to="/signup"
              className="font-medium text-emerald-800 hover:text-emerald-700"
            >
              Sign Up
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;
