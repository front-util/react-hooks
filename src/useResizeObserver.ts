import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import debounce from 'lodash.debounce';

export interface ObservableElementSize {
    scrollWidth: number;
    offsetWidth: number;
    scrollHeight: number;
    clientHeight: number;
}

export interface UseResizeObserverConfig {
    lazy?: boolean;
    dependencies?: unknown[]
}
export interface UseResizeObserverResponse<T> {
    node?: T;
    setNode: (ref: T) => void;
    size?: ObservableElementSize | null;
}

// @TODO replace -> utils
export const shallowCompare = <T extends Record<string, unknown>>(propsA?: T | null, propsB?: T | null): boolean => {
    if(Object.is(propsA, propsB)) {
        return true;
    }

    if(typeof propsA !== 'object' || propsA === null || typeof propsB !== 'object' || propsB === null) {
        return false;
    }

    const keysA = Object.keys(propsA);
    const keysB = Object.keys(propsB);

    if(keysA.length !== keysB.length) {
        return false;
    }

    for(const key of keysA) {
        if(!Object.prototype.hasOwnProperty.call(propsB, key) || !Object.is(propsA[key], propsB[key])) {
            return false;
        }
    }

    return true;
};

export const useResizeObserver = <T extends HTMLElement>(config?: UseResizeObserverConfig): UseResizeObserverResponse<T> => {
    const lazy = config?.lazy ?? false;
    const dependencies = config?.dependencies ?? [];

    const [size, setSize] = useState<ObservableElementSize | null>();
    const debouncedSetSize = useMemo(() => debounce(setSize, 200), []);

    const currentNodeRef = useRef<T | null>();

    const handleSaveNodeSize = useCallback((node?: T | null) => {
        if(node) {
            debouncedSetSize((prevState) => {
                const nextState = {
                    scrollWidth : node.scrollWidth,
                    offsetWidth : node.offsetWidth,
                    scrollHeight: node.scrollHeight,
                    clientHeight: node.clientHeight,
                };

                if(shallowCompare(prevState, nextState)) {
                    return prevState;
                }
                return nextState;
            });
        }
    }, [debouncedSetSize]);

    const onResize: ResizeObserverCallback = useCallback((events) => {
        const [event] = events;

        handleSaveNodeSize(event?.target as T);
    }, [handleSaveNodeSize]);

    const resizeObserverRef = useRef<ResizeObserver | null>(new ResizeObserver(onResize));

    const handleSetNode = useCallback((newNode: T | null) => {        
        if(currentNodeRef.current !== newNode) {
            if(!lazy) {
                if(currentNodeRef.current) {
                    resizeObserverRef.current?.disconnect();
                }
                if(newNode) {
                    resizeObserverRef.current?.observe(newNode);
                }
            }
            currentNodeRef.current = newNode;

            handleSaveNodeSize(currentNodeRef.current);
        }
    }, [handleSaveNodeSize, lazy]);

    useEffect(() => {
        handleSaveNodeSize(currentNodeRef.current);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [...dependencies]);

    useEffect(() => {
        return () => {
            resizeObserverRef.current?.disconnect();
            resizeObserverRef.current = null;
            currentNodeRef.current = null;
            debouncedSetSize.cancel();
        };
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    return {
        setNode: handleSetNode,
        size,
    };
};
