/* eslint-disable @typescript-eslint/no-explicit-any */
import { renderHook } from '@testing-library/react-hooks';
import {vi, describe, it, expect, beforeEach, afterEach} from 'vitest';

import { useAnimatedValue } from '../src/useAnimatedValue';

import {createAnimationFrameMock} from '../vitest.utils';

const BASE_VALUE = 2;
const BASE_ANIMATION_TIME = 10000;

describe('[cm/hooks/useAnimatedValue]', () => {
    beforeEach(() => {
        createAnimationFrameMock();
        vi.useFakeTimers();
    });

    afterEach(() => {
        vi.useRealTimers();
        vi.restoreAllMocks();
    });

    it('check start value', () => {
        const { result, } = renderHook(() => useAnimatedValue(10));

        expect(result.current).toEqual(0);
    });

    it('check wrong value string', () => {
        const testValue: any = 'adfadf';
        const { result, } = renderHook(() => useAnimatedValue(testValue));

        expect(result.current).toEqual(testValue);
    });

    it('check wrong value string with number', () => {
        const testValue: any = '10';
        const { result, } = renderHook(() => useAnimatedValue(testValue));

        expect(result.current).toEqual(testValue);
    });

    it('check intervals value', () => {
        const { result,} = renderHook(() => useAnimatedValue(10, {time: 10000,}));

        vi.advanceTimersByTime(1100);

        expect(result.current).toBeGreaterThanOrEqual(1);
        expect(result.current).toBeLessThan(1.5);

        vi.advanceTimersByTime(4000);

        expect(result.current).toBeGreaterThanOrEqual(5);
        expect(result.current).toBeLessThan(6);
    });

    it('check finish value', () => {
        const { result,} = renderHook(() => useAnimatedValue(BASE_VALUE));

        expect(result.current).toEqual(0);

        vi.advanceTimersByTime(BASE_ANIMATION_TIME + 1000);

        expect(result.current).toEqual(BASE_VALUE);
    });
});
