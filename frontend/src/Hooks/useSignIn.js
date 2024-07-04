import { useState } from 'react';
import { useAuthContext } from './useAuthContext';

export const useSignin = () => {
    const [error, setError] = useState(null);
    const [isLoading, setIsLoading] = useState(false);
    const { dispatch } = useAuthContext(); 

    const signin= async (email, password) => {
        setIsLoading(true);
        setError(null);

        try {
            const response = await fetch('/api/user/', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ email, password }),
            });

            const json = await response.json();

            if (!response.ok) {
                setIsLoading(false);
                setError(json.error);
            } else {
                // save the user to local storage
                localStorage.setItem('user', JSON.stringify(json));
                // update the authcontext
                dispatch({ type: 'LOGIN', payload: json });
                setIsLoading(false);
            }
        } catch (err) {
            setIsLoading(false);
            setError('Failed to signup');
        }
    };

    return { signin, isLoading, error };
};

