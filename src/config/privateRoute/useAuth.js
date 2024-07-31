import { useState, useEffect } from 'react';

const UseAuth = (token) => {
  const [isValid, setIsValid] = useState(null);

  useEffect(() => {
    const validateToken = async () => {
      if (!token) {
        setIsValid({ valid: false });
        return;
      }
      try {
        const raw = JSON.stringify({ token });
        const response = await fetch('http://localhost:5000/validate-token', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: raw,
        });

        const data = await response.json();
        setIsValid(data);
      } catch (error) {
        console.error('Error validating token:', error);
        setIsValid({ valid: false });
      }
    };

    validateToken();
  }, [token]);

  return isValid;
};

export default UseAuth;
