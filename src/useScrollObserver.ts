import { useEffect } from "react";

export interface UseScrollObserverProps {
    /** ref элемента, при появлении которого в области видимости, будет происходить вызов fetchData */
    observerTarget: React.MutableRefObject<HTMLDivElement | null>;
    fetchData?: VoidFunction | (() => Promise<void>);
}

export const useScrollObserver = ({
    observerTarget, 
    fetchData,
}: UseScrollObserverProps) => {
    useEffect(() => {
        const observer = new IntersectionObserver(
            (entries) => {
                if(entries[0].isIntersecting) {
                    fetchData?.();
                }
            },
            { threshold: 1, }
        );
        const target = observerTarget.current;

        if(target) {
            observer.observe(target);
        }
      
        return () => {
            if(target) {
                observer.unobserve(target);
            }
        };
    }, [fetchData, observerTarget]);
};