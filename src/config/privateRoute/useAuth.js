import { useState, useEffect } from 'react';

const useAuth = (token) => {
  const [isValid, setIsValid] = useState(null);

  useEffect(() => {
    const validateToken = async () => {
      if (!token) {
        setIsValid(false);
        return;
      }
      try {
        const raw = JSON.stringify({ token: `${token}` });
        const response = await fetch('http://localhost:5000/validate-token', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: raw,
        });

        const data = await response.json();
        setIsValid(data.valid);
      } catch (error) {
        console.error('Error validating token:', error);
        setIsValid(false);
      }
    };

    validateToken();
  }, [token]);

  return isValid;
};

export default useAuth;
