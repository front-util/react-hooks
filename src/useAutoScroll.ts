import { useCallback, useEffect, useRef } from 'react';

export interface UseAutoScrollProps {
    scrollTrigger: boolean;
    itemHeight?: number;
}

// автоскролл списка к целевому элементу
export const useAutoScroll = ({ itemHeight, scrollTrigger, }: UseAutoScrollProps) => {
    const parentElementRef = useRef<HTMLDivElement | null>(null);
    const userElementRef = useRef<HTMLDivElement | null>(null);

    const setParentScrollPosition = useCallback((scrollValue: number) => {
        if(!parentElementRef.current) {
            return;
        }

        parentElementRef.current.scrollTop = scrollValue;
    }, []);

    const setTargetScrollPosition = useCallback(() => {
        if(!userElementRef.current || !parentElementRef.current) {
            return;
        }
        const scrollValue = userElementRef.current.offsetTop
            - parentElementRef.current.getBoundingClientRect().height / 2
            + (itemHeight ? itemHeight / 2 : 0);

        setParentScrollPosition(scrollValue);
    }, [itemHeight, setParentScrollPosition]);

    useEffect(() => {
        if(!scrollTrigger) {
            return;
        }

        setTargetScrollPosition();
    }, [scrollTrigger, setTargetScrollPosition]);

    return {
        parentElementRef,
        userElementRef,
        // @TODO rename
        seTargetScrollPosition: setTargetScrollPosition,
        setParentScrollPosition,
    };
};
