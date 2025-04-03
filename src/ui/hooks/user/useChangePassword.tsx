import { useState } from 'react';
import { AxiosError } from 'axios';
import axiosInstance from '../../misch/Axios';



interface ChangePasswordResponse {
    success: boolean;
    message?: string;
}

const useChangePassword = () => {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const changePassword = async (oldPassword: string, newPassword: string) => {
        setLoading(true);
        setError(null);

        try {
            const payload = {
                oldPassword: oldPassword,
                newPassword: newPassword
            };
            
            const response = await axiosInstance.patch<ChangePasswordResponse>('/auth/changePassword', payload);

            return response.data;
        } catch (err) {
            if (err instanceof AxiosError) {
                if (err.code === 'ERR_NETWORK') {
                    setError('Network error: Unable to connect to the server');
                } else if (err.response) {
                    switch (err.response.status) {
                        case 400:
                            setError('Invalid password format');
                            break;
                        case 401:
                            setError('Current password is incorrect');
                            break;
                        case 403:
                            setError('Not authorized to change password');
                            break;
                        case 500:
                            setError('Server error');
                            break;
                        default:
                            setError(`Error: ${err.response.data.message || 'Unknown error occurred'}`);
                    }
                }
            } else {
                setError('An unexpected error occurred');
            }
            throw err;
        } finally {
            setLoading(false);
        }
    };

    return {
        changePassword,
        loading,
        error
    };
};

export default useChangePassword; 