import { useState } from "react";

export const useFormValidation = () => {
  const [errors, setErrors] = useState({});

  const [checkoutForm, setCheckoutForm] = useState({
    name: "",
    address: "",
    phone: "",
    email: ""
  });

  //validate checkout form
  const validateCheckoutForm = () => {
    const newErrors = {};

    // Name validation
    if (!checkoutForm.name) {
      newErrors.name = "Name is required";
    }

    // Address validation
    if (!checkoutForm.address) {
      newErrors.address = "Address is required";
    }

    // Phone validation
    if (!checkoutForm.phone) {
      newErrors.phone = "Phone number is required";
    } else if (!/^\d{11}$/.test(checkoutForm.phone)) {
      newErrors.phone = "Please enter a valid phone number (11 digits)";
    }

    // Email validation
    const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/;
    if (!emailRegex.test(checkoutForm.email)) {
      newErrors.email = "Please enter a valid email address";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // Login in Validation Form
  const [formData, setFormData] = useState({
    email: "",
    password: ""
  });

  // Login in Validation Form
  const validateForm = () => {
    const newErrors = {};

    // Email validation
    const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/;
    if (!emailRegex.test(formData.email)) {
      newErrors.email = "Please enter a valid email address";
    }

    // Password validation
    if (formData.password.length < 8) {
      newErrors.password = "Password must be at least 8 characters";
    } else if (!/[A-Z]/.test(formData.password)) {
      newErrors.password =
        "Password must contain at least one uppercase letter";
    } else if (!/[0-9]/.test(formData.password)) {
      newErrors.password = "Password must contain at least one number";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const [signUpForm, setSignUpForm] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: ""
  });
  const validateSignUpForm = () => {
    const newErrors = {};

    if (!signUpForm.name.trim()) newErrors.name = "Name is required";

    const signUpEmail = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/;
    if (!signUpEmail.test(signUpForm.email)) {
      newErrors.email = "Please enter a valid email address";
    }

    if (signUpForm.password.length < 8) {
      newErrors.password = "Password must be at least 8 characters";
    } else if (!/[A-Z]/.test(signUpForm.password)) {
      newErrors.password =
        "Password must contain at least one uppercase letter";
    } else if (!/[0-9]/.test(signUpForm.password)) {
      newErrors.password = "Password must contain at least one number";
    }
    if (signUpForm.password !== signUpForm.confirmPassword) {
      newErrors.confirmPassword = "Passwords do not match";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };
  return {
    errors,
    formData,
    setFormData,
    validateForm,
    checkoutForm,
    setCheckoutForm,
    validateCheckoutForm,
    signUpForm,
    setSignUpForm,
    validateSignUpForm
  };
};
