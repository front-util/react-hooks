import { useCallback, useState } from 'react';

import { useNativeResizeObserver } from './useNativeResizeObserver';

export interface ShortElementSize {
    width: number;
    height: number;
}

export interface UseElementSizeObserverProps {
    isActive: boolean;
    node?: HTMLElement | null;
}

export const useElementSizeObserver = ({ isActive = true, node, }: UseElementSizeObserverProps) => {
    const [size, setSize] = useState<ShortElementSize | undefined>(undefined);

    const onResize: ResizeObserverCallback = useCallback((entries) => {
        for(const entry of entries) {
            const { blockSize, inlineSize, } = entry.borderBoxSize[0];

            if(!blockSize || !inlineSize) {
                return;
            }

            setSize((prevSize) => {
                if((prevSize?.height !== blockSize || prevSize?.width !== inlineSize)) {
                    return {
                        width : inlineSize,
                        height: blockSize,
                    };
                }

                return prevSize;
            });
        }
    }, []);

    useNativeResizeObserver({
        node    : isActive ? node : null,
        callback: onResize,
    });

    return size;
};
