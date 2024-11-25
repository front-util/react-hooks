import { useRef } from "react";

import { usePrevious } from "./usePrevious";

export const usePropsChanged = <T>(val: T) => {
    const prevVal = usePrevious<T>(val);
    const renderCountRef = useRef(0);
    const isChanged = renderCountRef.current === 0 ? false : val !== prevVal;

    if(renderCountRef.current === 0) {
        renderCountRef.current++;
    }

    return {
        isChanged,
        prevVal,
    };
};