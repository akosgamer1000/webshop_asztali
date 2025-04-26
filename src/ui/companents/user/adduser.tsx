/**
 * @file companents/user/adduser.tsx
 * @module UI/Components/User
 * @description Add User Component
 * 
 * A React component that provides a form for creating new users.
 * It includes form validation, password visibility toggle, and error handling.
 * 
 * Features:
 * - Create new users with required information
 * - Form validation for all fields
 * - Password strength requirements
 * - Password visibility toggle
 * - Role selection (user/admin)
 * - Error handling and display
 * - Loading state management
 * 
 * @author WebShop Team
 * @version 1.0.0
 * @since 1.0.0
 */

import React, { useRef, FormEvent, useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import useCreateUser from '../../hooks/user/useCreateUser';
import useUsers from '../../hooks/user/useUsers';
import { FaEye, FaEyeSlash } from 'react-icons/fa';

/**
 * Interface representing the user form data
 * @interface UserFormData
 * @property {string} name - User's name
 * @property {string} email - User's email address
 * @property {string} password - User's password
 * @property {string} address - User's address
 * @property {string} role - User's role (user/admin)
 */
interface UserFormData {
    name: string;
    email: string;
    password: string;
    address: string;
    role: string;
}

/**
 * Interface representing form validation errors
 * @interface ValidationErrors
 * @property {string} [name] - Error message for name field
 * @property {string} [email] - Error message for email field
 * @property {string} [password] - Error message for password field
 * @property {string} [address] - Error message for address field
 * @property {string} [role] - Error message for role field
 * @property {string} [form] - General form error message
 */
interface ValidationErrors {
    name?: string;
    email?: string;
    password?: string;
    address?: string;
    role?: string;
    form?: string;
}

/**
 * Add User Component
 * 
 * This component provides a form for creating new users with validation
 * and error handling. It uses the useCreateUser hook for user creation
 * and the useUsers hook for refreshing the user list.
 * 
 * The component includes:
 * - Form validation for all fields
 * - Password strength requirements
 * - Password visibility toggle
 * - Role selection
 * - Error handling and display
 * - Loading state management
 * 
 * @returns {JSX.Element} The rendered add user form
 */
const AddUser: React.FC = () => {
    // Initialize hooks and refs
    const navigate = useNavigate();
    const nameRef = useRef<HTMLInputElement>(null);
    const emailRef = useRef<HTMLInputElement>(null);
    const passwordRef = useRef<HTMLInputElement>(null);
    const addressRef = useRef<HTMLInputElement>(null); 
    const roleRef = useRef<HTMLSelectElement>(null);
    const create = useCreateUser();
    const { refetch } = useUsers();
    
    // State management
    const [errors, setErrors] = useState<ValidationErrors>({});
    const [showPassword, setShowPassword] = useState(false);
    const [isSubmitting, setIsSubmitting] = useState(false);

    useEffect(() => {
        if (create.error) {
            console.log('Error from useCreateUser hook:', create.error);
            
            if (create.error.includes("User with this email already exists")) {
                setErrors(prevErrors => ({
                    ...prevErrors, 
                    email: create.error || "Email already in use"
                }));
            } else {
                setErrors(prevErrors => ({
                    ...prevErrors, 
                    form: create.error || "Error creating user"
                }));
            }
        }
    }, [create.error]);

    /**
     * Validate form fields
     * 
     * This function validates all form fields and returns any validation errors.
     * It checks:
     * - Required fields
     * - Email format
     * - Password strength
     * - Role selection
     * 
     * @returns {ValidationErrors} Object containing any validation errors
     */
    const validateForm = (): ValidationErrors => {
        const newErrors: ValidationErrors = {};

        if (!nameRef.current?.value) {
            newErrors.name = "Name field must be filled!";
        }

        const emailValue = emailRef.current?.value || '';
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailValue) {
            newErrors.email = "Email field must be filled!";
        } else if (!emailRegex.test(emailValue)) {
            newErrors.email = "Invalid email format!";
        }

        const passwordValue = passwordRef.current?.value || '';
        const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&/.-])[A-Za-z\d@$!%*?&/.-]{8,}$/;
        if (!passwordValue) {
            newErrors.password = "Password field must be filled!";
        } else if (!passwordRegex.test(passwordValue)) {
            newErrors.password = "Password must be strong: min 8 chars, 1 lowercase, 1 uppercase, 1 number, 1 symbol";
        }

        if (!roleRef.current?.value || !['user', 'admin'].includes(roleRef.current.value)) {
            newErrors.role = "Role must be either 'user' or 'admin'!";
        }

        return newErrors;
    };

    /**
     * Handle form submission
     * 
     * This function handles the form submission process:
     * 1. Validates the form
     * 2. Creates the user if validation passes
     * 3. Refreshes the user list
     * 4. Navigates to the users page
     * 5. Handles any errors that occur
     * 
     * @param {FormEvent<HTMLFormElement>} e - Form submission event
     */
    const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        
        const validationErrors = validateForm();
        
        if (Object.keys(validationErrors).length > 0) {
            setErrors(validationErrors);
            return;
        }

        setErrors({});
        setIsSubmitting(true);

        const formData: UserFormData = {
            name: nameRef.current?.value || '',
            email: emailRef.current?.value || '',
            password: passwordRef.current?.value || '',
            address: addressRef.current?.value || '', 
            role: roleRef.current?.value || 'user'
        };

        try {
            const result = await create.createUser(formData);
            
         
           
            
            if (result) {
                await refetch();
                navigate('/users');
            }
        } catch (error) {
            console.error('Error creating user:', error);
            setErrors(prevErrors => ({...prevErrors, form: 'Failed to create user'}));
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <div className="bg-white rounded-lg shadow-md p-6">
            <h2 className="text-2xl font-semibold text-gray-800 mb-6">Add New User</h2>

            <form onSubmit={handleSubmit} className="space-y-6">
                {/* General form errors */}
                {errors.form && (
                    <div className="p-3 bg-red-100 border border-red-400 text-red-700 rounded">
                        <p>{errors.form}</p>
                    </div>
                )}

                {/* Name field */}
                <div className="flex flex-col">
                    <label className="text-sm font-medium text-gray-600 mb-2">
                        Name
                    </label>
                    <input
                        type="text"
                        ref={nameRef}
                        className={`p-2 border rounded-md focus:outline-none focus:ring-2 ${
                            errors.name 
                                ? 'border-red-500 focus:ring-red-500' 
                                : 'border-gray-300 focus:ring-blue-500'
                        }`}
                    />
                    {errors.name && (
                        <p className="text-red-500 text-sm mt-1">{errors.name}</p>
                    )}
                </div>

                {/* Email field */}
                <div className="flex flex-col">
                    <label className="text-sm font-medium text-gray-600 mb-2">
                        Email Address
                    </label>
                    <input
                        type="email"
                        ref={emailRef}
                        className={`p-2 border rounded-md focus:outline-none focus:ring-2 ${
                            errors.email 
                                ? 'border-red-500 focus:ring-red-500' 
                                : 'border-gray-300 focus:ring-blue-500'
                        }`}
                    />
                    {errors.email && (
                        <p className="text-red-500 text-sm mt-1 font-medium">{errors.email}</p>
                    )}
                </div>

                {/* Password field with visibility toggle */}
                <div className="flex flex-col">
                    <label className="text-sm font-medium text-gray-600 mb-2">
                        Password
                    </label>
                    <div className="relative">
                        <input
                            type={showPassword ? "text" : "password"}
                            ref={passwordRef}
                            className={`w-full p-2 border rounded-md focus:outline-none focus:ring-2 ${
                                errors.password 
                                    ? 'border-red-500 focus:ring-red-500' 
                                    : 'border-gray-300 focus:ring-blue-500'
                            }`}
                        />
                        <button
                            type="button"
                            onClick={() => setShowPassword(!showPassword)}
                            className="absolute right-2 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-gray-700"
                        >
                            {showPassword ? <FaEyeSlash size={20} /> : <FaEye size={20} />}
                        </button>
                    </div>
                    {errors.password && (
                        <p className="text-red-500 text-sm mt-1">{errors.password}</p>
                    )}
                </div>

                {/* Address field */}
                <div className="flex flex-col">
                    <label className="text-sm font-medium text-gray-600 mb-2">
                        Address
                    </label>
                    <input
                        type="text"
                        ref={addressRef}
                        className={`p-2 border rounded-md focus:outline-none focus:ring-2 ${
                            errors.address 
                                ? 'border-red-500 focus:ring-red-500' 
                                : 'border-gray-300 focus:ring-blue-500'
                        }`}
                    />
                    {errors.address && (
                        <p className="text-red-500 text-sm mt-1">{errors.address}</p>
                    )}
                </div>

                {/* Role selection */}
                <div className="flex flex-col">
                    <label className="text-sm font-medium text-gray-600 mb-2">
                        Role
                    </label>
                    <select
                        ref={roleRef}
                        className={`p-2 border rounded-md focus:outline-none focus:ring-2 ${
                            errors.role 
                                ? 'border-red-500 focus:ring-red-500' 
                                : 'border-gray-300 focus:ring-blue-500'
                        }`}
                    >
                        <option value="user">User</option>
                        <option value="admin">Administrator</option>
                    </select>
                    {errors.role && (
                        <p className="text-red-500 text-sm mt-1">{errors.role}</p>
                    )}
                </div>

                {/* Submit button */}
                <div className="flex justify-end">
                    <button 
                        type="submit" 
                        className="bg-blue-600 text-white py-2 px-6 rounded-md hover:bg-blue-700 
                            focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2
                            transition-colors disabled:bg-blue-400 disabled:cursor-not-allowed"
                        disabled={isSubmitting || create.loading}
                    >
                        {(isSubmitting || create.loading) ? (
                            <span className="flex items-center">
                                <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                </svg>
                                Saving...
                            </span>
                        ) : 'Add User'}
                    </button>
                </div>
            </form>
        </div>
    );
};

export default AddUser;