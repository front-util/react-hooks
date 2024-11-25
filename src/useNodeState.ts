import { useState, useCallback } from 'react';

export const useNodeState = () => {
    const [node, setNode] = useState<HTMLElement | null>(null);

    const updateNode = useCallback((newNode: HTMLElement | null) => {
        setNode(newNode);
    }, []);

    return {
        node,
        updateNode,
    };
};
