import { useEffect, useLayoutEffect, useRef } from 'react';

export interface UseNativeResizeObserverProps {
    callback: ResizeObserverCallback;
    node?: HTMLElement | null;
}
export const useNativeResizeObserver = ({ node, callback, }: UseNativeResizeObserverProps) => {
    const observerRef = useRef(new ResizeObserver(callback));

    useLayoutEffect(() => {
        if(!node) {
            return;
        }
        const observer = observerRef.current;

        observer.observe(node);
        return () => {
            observer.unobserve?.(node);
        };
    }, [node]);

    useEffect(() => () => observerRef.current?.disconnect?.(), []);
};
