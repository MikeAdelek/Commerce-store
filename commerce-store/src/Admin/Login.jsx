import { useNavigate, Link } from "react-router-dom";
import { AuthContext } from "../utils/CartContext";
import React, { useState, useContext } from "react";
import { AlertCircle, Eye, EyeOff } from "lucide-react";
import { useFormValidation } from "../utils/validateForm";
import SignUpPage from "../Admin/SignUp";

const Login = () => {
  const navigate = useNavigate();
  const { signIn, signUp } = useContext(AuthContext);
  const {
    formData,
    setFormData,
    errors,
    validateForm,
    signUpForm,
    setSignUpForm,
    validateSignUpForm
  } = useFormValidation({
    email: "",
    password: "",
    name: "",
    confirmPassword: ""
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

  const handleGoogleSignUp = async () => {
    setIsSubmitting(true);
    try {
      // Simulate Google OAuth flow
      await new Promise((resolve) => setTimeout(resolve, 1000));
      signUp.login({ email: "user@gmail.com", name: "Google User" });
    } catch (error) {
      setError({
        submit: "Failed to sign up with Google. Please try again."
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleSignUpChange = (e) => {
    setSignUpForm({ ...signUpForm, [e.target.name]: e.target.value });
    errors[e.target.name] = ""; // clear error message
  };

  return (
    <div className="min-h-[43.5rem] bg-white">
      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="flex flex-col md:flex-row gap-8 p-12 sm:p-8">
          {/* Left Side */}
          <div className="w-full md:w-3/5 lg:w-3/4">
            <div className="mb-8 mt-8">
              <p className="text-sm text-emerald-700">
                Please sign in to shop with us!
              </p>
            </div>

            {/* Checkout Form */}
            <form onSubmit={handleSubmit}>
              <div className="mb-8">
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

                {/* <div className="rounded-md shadow-sm mb-4"></div> */}
                {/* Email Field */}
                <div className="mb-4">
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

                <div className="mb-4 relative">
                  {/* Password Field */}
                  {/* <div className="relative"></div> */}
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
                    <p className="mt-2 text-sm text-red-600">
                      {errors.password}
                    </p>
                  )}
                </div>

                {/* Sign in button */}
                <div className="mb-4">
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
              </div>
            </form>
          </div>

          {/* Right SIde */}
          <div className="w-full md:w-3/5 lg:w-1/2">
            <div className="mb-8 mt-8">
              <h2 className="text-3xl font-bold text-emerald-700 mb-4">
                Create your account
              </h2>
              <p className="text-sm text-gray-600 mb-2">
                Sign up to start shopping!
              </p>

              <button
                type="button"
                onClick={handleGoogleSignUp}
                disabled={isSubmitting}
                className="w-full mb-2 flex justify-center items-center gap-3 py-2 px-4 border border-gray-300 rounded-md shadow-sm bg-white text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
              >
                <svg className="h-5 w-5" viewBox="0 0 24 24">
                  <path
                    d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                    fill="#4285F4"
                  />
                  <path
                    d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                    fill="#34A853"
                  />
                  <path
                    d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
                    fill="#FBBC05"
                  />
                  <path
                    d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                    fill="#EA4335"
                  />
                </svg>
                Sign up with Google
              </button>
            </div>
            <div className="flex items-center justify-center text-center">
              <span className="text-center">Or</span>
            </div>
            <div className="flex-grow border-t border-gray-300"></div>
            <Link
              to="/signup"
              className="mt-4 flex items-center justify-center"
            >
              Click here to <span className="text-emerald-800"> Sign Up </span>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;

{
  /* <div className="text-center">
  <p className="text-sm text-gray-600">
    Don't have an account?{" "}
    <Link
      to="/signup"
      className="font-medium text-emerald-800 hover:text-emerald-700"
    >
      Sign Up
    </Link>
  </p>
</div> */
}
