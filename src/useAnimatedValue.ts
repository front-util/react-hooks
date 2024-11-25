import { useState, useEffect, useRef } from 'react';
import {isNumber} from '@front-utils/utils';

export const ANIMATION_TIME_MS = 1000;

export function useAnimatedValue(finishValue: number, { time = ANIMATION_TIME_MS, digitAfterDot = 2, } = {}): number {
    const [value, setValue] = useState(0);
    const requestRef = useRef<number>();

    useEffect(() => {
        if(!isNumber(finishValue)) {
            setValue(finishValue);
            return;
        }
        const updateValueAtMs = finishValue / time;
        let finishTime: number;
        let startTime: number;
        let prevValue = 0;
        let hasCanceled = false;

        const animate = (frameTime: number) => {            
            if(hasCanceled) {
                return;
            }
            if(!startTime) {
                startTime = frameTime;
                finishTime = frameTime + time;
            }
            
            if(frameTime >= (finishTime ?? 0)) {
                setValue(finishValue);
                if(requestRef.current) {
                    cancelAnimationFrame(requestRef.current);
                }
                return;
            }
            const currentUpdateValue = +Number((frameTime - startTime) * updateValueAtMs).toFixed(digitAfterDot);

            if(prevValue !== currentUpdateValue) {
                setValue(currentUpdateValue);
            }

            prevValue = currentUpdateValue;

            requestAnimationFrame(animate);
        };

        requestRef.current = requestAnimationFrame(animate);

        return () => {
            hasCanceled = true;
            if(requestRef.current) {
                cancelAnimationFrame(requestRef.current);
            }
        };
    }, [digitAfterDot, finishValue, time]);

    return value;
}
