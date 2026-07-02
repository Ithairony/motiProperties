import { NavBar } from "../components/navbar";
import Footer from "../components/footer";
import React, { useState, useEffect } from "react";

export default function PropertyApplicationForm() {

  // Initial state for the form inputs
  const initialFormState = {
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    occupation: "",
    monthlyIncome: "",
  };

  // State variables for form data, validation errors, submission status, and form validity
  const [formData, setFormData] = useState(initialFormState);
  const [errors, setErrors] = useState({});
  const [message, setMessage] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isFormValid, setIsFormValid] = useState(false);

  // Regular expression patterns for field validation
  const validationPatterns = {
    name: /^[A-Za-z\s'-]+$/, // Name validation (letters, spaces, hyphens, and apostrophes)
    email: /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/, // Email validation
    phone: /^\+?[1-9]\d{1,14}(\s?\d{1,4})*$/, // Phone number validation
    income: /^\d+(\.\d{1,2})?$/ // Income validation (numbers, with optional decimal)
  };

  // Handle input changes for form fields
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  // Validate individual form fields based on their name
  const validateField = (name, value) => {
    let error = "";
    switch (name) {
      case "firstName":
      case "lastName":
        if (!value.trim()) error = `${name} is required`;
        else if (!validationPatterns.name.test(value)) error = `Invalid ${name}`;
        break;
      case "email":
        if (!value.trim()) error = "Email is required";
        else if (!validationPatterns.email.test(value)) error = "Invalid email";
        break;
      case "phone":
        if (!value.trim()) error = "Phone number is required";
        else if (!validationPatterns.phone.test(value)) error = "Invalid phone number";
        break;
      case "occupation":
        if (!value.trim()) error = `${name} is required`;
        break;
      case "monthlyIncome":
        if (!value.trim()) error = "Monthly income is required";
        else if (!validationPatterns.income.test(value)) error = "Invalid income amount";
        break;
      default:
        break;
    }
    return error;
  };

  // Validate the entire form
  const validateForm = () => {
    const newErrors = {};
    let isValid = true;
    // Iterate through each field and validate its value
    Object.entries(formData).forEach(([key, value]) => {
      const error = validateField(key, value);
      if (error) {
        newErrors[key] = error;
        isValid = false;
      }
    });
    return { isValid, errors: newErrors };
  };

  // Validate form when formData changes (e.g., user input)
  useEffect(() => {
    const { isValid } = validateForm();
    setIsFormValid(isValid);
  }, [formData]);

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage(""); // Clear previous messages
    const { isValid, errors: validationErrors } = validateForm();

    // If form is invalid, show errors and stop submission
    if (!isValid) {
      setErrors(validationErrors);
      return;
    }

    setIsSubmitting(true); // Set submitting state to true

    try {
      // Submit form data to the server
      const response = await fetch("/api/properties/applyForProperty", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData)
      });
      const data = await response.json();

      // Handle response from server
      if (!response.ok) {
        setErrors(data.errors || {});
        setMessage("Failed to submit application.");
      } else {
        setMessage("Application submitted successfully!");
        setFormData(initialFormState); // Reset form fields after successful submission
      }
    } catch (error) {
      setMessage(`Error: ${error.message}`); // Display error message if submission fails
    } finally {
      setIsSubmitting(false); // Reset submitting state
    }
  };

  return (
    <><div>
      <NavBar />

      <div className="form-wrapper">
        <form className="apply-form" onSubmit={handleSubmit}>
          <h1>Property Application</h1>

          {/* First Name input */}
          <input
            placeholder="Firstname"
            type="text"
            name="firstName"
            value={formData.firstName}
            onChange={handleInputChange}
            onBlur={(e) => setErrors({ ...errors, firstName: validateField("firstName", e.target.value) })}
            required
          />
          {errors.firstName && <p className="error">{errors.firstName}</p>}

          {/* Last Name input */}
          <input
            placeholder="Lastname"
            type="text"
            name="lastName"
            value={formData.lastName}
            onChange={handleInputChange}
            onBlur={(e) => setErrors({ ...errors, lastName: validateField("lastName", e.target.value) })}
            required
          />
          {errors.lastName && <p className="error">{errors.lastName}</p>}
      
          {/* Email input */}
          <input
            placeholder="Email"
            type="email"
            name="email"
            value={formData.email}
            onChange={handleInputChange}
            onBlur={(e) => setErrors({ ...errors, email: validateField("email", e.target.value) })}
            required
          />
          {errors.email && <p className="error">{errors.email}</p>}
      
          {/* Phone input */}
          <input
            placeholder="Phone"
            type="text"
            name="phone"
            value={formData.phone}
            onChange={handleInputChange}
            onBlur={(e) => setErrors({ ...errors, phone: validateField("phone", e.target.value) })}
            required
          />
          {errors.phone && <p className="error">{errors.phone}</p>}

          {/* Occupation input */}
          <input
            placeholder="Occupation"
            type="text"
            name="occupation"
            value={formData.occupation}
            onChange={handleInputChange}
            onBlur={(e) => setErrors({ ...errors, occupation: validateField("occupation", e.target.value) })}
            required
          />
          {errors.occupation && <p className="error">{errors.occupation}</p>}

          {/* Monthly Income input */}
          <input
            placeholder="Income"
            type="text"
            name="monthlyIncome"
            value={formData.monthlyIncome}
            onChange={handleInputChange}
            onBlur={(e) => setErrors({ ...errors, monthlyIncome: validateField("monthlyIncome", e.target.value) })}
            required
          />
          {errors.monthlyIncome && <p className="error">{errors.monthlyIncome}</p>}
         
          {/* Submit button */}
         {isFormValid && (
          <button type="submit" disabled={isSubmitting || !isFormValid}>
              {isSubmitting ? "Submitting..." : "Apply"}
          </button>
         )}

          {message && <p>{message}</p>} {/* Display messages */}
        </form>
      </div>

        <div>
            <Footer />
        </div>
    </div></>
  );
}
