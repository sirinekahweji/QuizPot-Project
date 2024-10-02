import { useState } from 'react';
import { useAuthContext } from './useAuthContext';
import axios from 'axios';

export const useSignup = () => {
    const [error, setError] = useState(null);
    const [isLoading, setIsLoading] = useState(false);
    const { dispatch } = useAuthContext();

    const signup = async (name, email, password) => {
        setIsLoading(true);
        setError(null);

        try {
            const response = await axios.post('http://localhost:5000/api/user/signup', {
                name,
                email,
                password
            });

            const json = response.data;
            //console.log('API Response:', json); 

            if (response.status !== 200 || json.error) {
                setIsLoading(false);
                setError(json.error);
            } else {
                localStorage.setItem('user', JSON.stringify(json));
                dispatch({ type: 'LOGIN', payload: json });
                setIsLoading(false);
            }
        } catch (err) {
            setIsLoading(false);
            setError(err.response.data.error);
        }
    };

    return { signup, isLoading, error };
};
