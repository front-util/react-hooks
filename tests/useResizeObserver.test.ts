import {describe, it, expect, beforeEach, afterEach, vi} from 'vitest';
import { renderHook } from '@testing-library/react-hooks';

import { useResizeObserver } from '#src/useResizeObserver';
import { act } from 'react';

function triggerResize(element: HTMLElement) {
    const resizeEvent = new Event('resize');

    element.dispatchEvent(resizeEvent);
}

describe('[hooks/useResizeObserver]', () => {
    beforeEach(() => {
        vi.useFakeTimers();
    });

    afterEach(() => {
        vi.useRealTimers();
        vi.restoreAllMocks();
    });

    it('check resize', async () => {
        const { result, rerender, } = renderHook(() => useResizeObserver({}));

        const node = document.createElement('div');

        result.current.setNode(node);
        rerender();
        expect(result.current.size).toEqual({ clientHeight: 0, offsetWidth: 0, scrollHeight: 0, scrollWidth: 0, });

        result.current.setNode({
            scrollWidth : 400,
            offsetWidth : 200,
            scrollHeight: 300,
            clientHeight: 100,
        } as HTMLElement);
        rerender();
        expect(result.current.size).toEqual({
            clientHeight: 100,
            offsetWidth : 200,
            scrollHeight: 300,
            scrollWidth : 400,
        });
    });

    it('check resize with deps', async () => {
        const config = { dependencies: [1], };
        const { result, rerender, } = renderHook(() => useResizeObserver(config));

        const node = document.createElement('div');

        result.current.setNode(node);

        rerender();
        expect(result.current.size).toEqual({ clientHeight: 0, offsetWidth: 0, scrollHeight: 0, scrollWidth: 0, });
        result.current.setNode({
            scrollWidth : 400,
            offsetWidth : 200,
            scrollHeight: 300,
            clientHeight: 100,
        } as HTMLElement);
        config.dependencies = [2];
        rerender();

        expect(result.current.size).toEqual({
            clientHeight: 100,
            offsetWidth : 200,
            scrollHeight: 300,
            scrollWidth : 400,
        });
    });
});
