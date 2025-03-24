import React, { useRef, FormEvent, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import useCreateUser from '../hooks/useCreateUser';
import { FaEye, FaEyeSlash } from 'react-icons/fa';

interface UserFormData {
    name: string;
    email: string;
    password: string;
    role: string;
}

interface ValidationErrors {
    name?: string;
    email?: string;
    password?: string;
    role?: string;
    form?: string;
}

const AddUser: React.FC = () => {
    const navigate = useNavigate();
    const nameRef = useRef<HTMLInputElement>(null);
    const emailRef = useRef<HTMLInputElement>(null);
    const passwordRef = useRef<HTMLInputElement>(null);
    const roleRef = useRef<HTMLSelectElement>(null);
    const create = useCreateUser();
    
    const [errors, setErrors] = useState<ValidationErrors>({});
    const [showPassword, setShowPassword] = useState(false);

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
        const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
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

    const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        
    
        const validationErrors = validateForm();
        
       
        if (Object.keys(validationErrors).length > 0) {
            setErrors(validationErrors);
            return;
        }

      
        setErrors({});

        const formData: UserFormData = {
            name: nameRef.current?.value || '',
            email: emailRef.current?.value || '',
            password: passwordRef.current?.value || '',
            role: roleRef.current?.value || 'user'
        };

        try {
            create.createUser(formData);
            navigate('/users');
        } catch (error) {
            console.error('Error creating user:', error);
            
            setErrors(prevErrors => ({...prevErrors, form: 'Failed to create user'}));
        }
    };

    return (
        <div className="bg-white rounded-lg shadow-md p-6">
            <h2 className="text-2xl font-semibold text-gray-800 mb-6">Add New User</h2>

            <form onSubmit={handleSubmit} className="space-y-6">
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
                        <p className="text-red-500 text-sm mt-1">{errors.email}</p>
                    )}
                </div>

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

                {errors.form && (
                    <div className="text-red-500 text-sm mb-4">
                        {errors.form}
                    </div>
                )}

                <div className="flex justify-end pt-4">
                    <button
                        type="submit"
                        className="px-6 py-2 bg-green-600 text-white rounded-md hover:bg-green-700 transition-colors"
                    >
                        Add User
                    </button>
                </div>
            </form>
        </div>
    );
};

export default AddUser;