import { useState } from 'react';
import { useAuthContext } from './useAuthContext';
import axios from 'axios';

export const useSignin = () => {
    const [error, setError] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const { dispatch } = useAuthContext(); 

    const signin = async (email, password) => {
        setIsLoading(true);
        setError('');

        try {
            const response = await axios.post('http://localhost:5000/api/user/', {
                email,
                password
            });

            const json = response.data;
            console.log('API Response:', json); // Ajoutez ce console.log

            if (response.status !== 200 || json.error) {
                setIsLoading(false);
                console.log("json",json.error)
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
            setError(err.response.data.error);
        }
    };

    return { signin, isLoading, error };
};
