import {
    RefObject,
    useEffect,
    useRef
} from 'react';

export const useIsMounted = (): RefObject<boolean> => {
    const isMounted = useRef<boolean>(true);

    useEffect(() => {
        return () => {
            isMounted.current = false;
        };
    }, []);

    return isMounted;
};
