/* eslint-disable @typescript-eslint/no-explicit-any */
import {vi} from 'vitest';

export const createAnimationFrameMock = (frameTime: number = 0) => {
    vi.spyOn(global, 'requestAnimationFrame').mockImplementation((callback: any): any => {
        return setTimeout(() => callback(frameTime += 16), 16); // 16ms for ~60fps
    });
    vi.spyOn(global, 'cancelAnimationFrame').mockImplementation((id) => {
        clearTimeout(id);
    });
};