import { useEffect, useRef, useState } from "react";

import { useIsMounted } from "./useIsMounted";

interface ParsedTimerResult {
    hours?: number;
    minutes?: number;
    seconds?: number;
}
interface UseTimerProps {
    endIsoDate?: string;
    formatted?: boolean;
}

const _getTimeDiffSeconds = (endIsoDate?: string) => {
    if(!endIsoDate) {
        return 0;
    }
    const diffMS = new Date(endIsoDate).getTime() - new Date().getTime();

    return Math.floor(diffMS / 1000);
};

const _getFormattedResult = (seconds?: number, formatted?: boolean) => {
    if(!seconds) {
        return {
            seconds: 0,
        };
    }
    const result: ParsedTimerResult = {
        seconds: seconds % 60,
    };

    if(formatted) {
        result.minutes = Math.floor(seconds / 60) % 60;
        result.hours = Math.floor(seconds / 60 / 60) % 24;
    }
    return result;
};

export const useCountDownTimer = ({
    endIsoDate,
    formatted,
}: UseTimerProps) => {
    const {current: isMount,} = useIsMounted();
    const animatedRef = useRef<number>();
    const isCancelledRef = useRef(false);
    const [seconds, setSeconds] = useState<number | undefined>(undefined);

    useEffect(() => {
        if(!endIsoDate) {
            return;
        }
        const animate = () => {
            if(!isMount) {
                return;
            }
            const newVal = _getTimeDiffSeconds(endIsoDate);

            if(newVal <= 0) {
                if(animatedRef.current) {
                    cancelAnimationFrame(animatedRef.current);
                }
                isCancelledRef.current = true;
                setSeconds(0);
                return;
            }
            if(seconds !== newVal) {
                setSeconds(newVal);
            }
            animatedRef.current = requestAnimationFrame(animate);
        };

        animatedRef.current = requestAnimationFrame(animate);

        return () => {
            if(animatedRef.current) {
                cancelAnimationFrame(animatedRef.current);
            }
        };
    }, [endIsoDate, isMount, seconds]);

    const result = _getFormattedResult(seconds, formatted);

    return {
        ...result,
        isCancelled: isCancelledRef.current,
    };
};
