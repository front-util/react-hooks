import { useCallback, useState } from 'react';

export const useStateBool = (initial?: boolean) => {
    const [isTrue, setIsTrue] = useState(initial ?? false);

    const onChangeTrue = useCallback(() => {
        setIsTrue(true);
    }, []);

    const onChangeFalse = useCallback(() => {
        setIsTrue(false);
    }, []);

    return [
        isTrue,
        /** set to true */
        onChangeTrue,
        /** set to false */
        onChangeFalse
    ] as const;
};
