import { useState, useEffect } from 'react';

const useMediaQuery = (query) => {
    const [matches, setMatches] = useState(window.matchMedia(query).matches);

    useEffect(() => {
        const mediaQueryList = window.matchMedia(query);
        const documentChangeHandler = () => setMatches(mediaQueryList.matches);

        mediaQueryList.addListener(documentChangeHandler);

        return () => {
            mediaQueryList.removeListener(documentChangeHandler);
        };
    }, [query]);

    return matches;
};

export default useMediaQuery;
