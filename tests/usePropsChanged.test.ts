import {describe, it, expect} from 'vitest';
import { renderHook } from '@testing-library/react-hooks';

import { usePropsChanged } from '#src/usePropsChanged';

const prevValue = 1;

describe('[cm/hooks/usePropsChanged]', () => {
    it('check 1st render', () => {
        const { result, } = renderHook(usePropsChanged, {
            initialProps: prevValue,
        });

        expect(result.current.prevVal).toBeUndefined();
        expect(result.current.isChanged).toBeFalsy();
    });

    it('with changes', () => {
        const { result, rerender, } = renderHook(usePropsChanged, {
            initialProps: prevValue,
        });
        
        rerender(prevValue + 1);

        expect(result.current.prevVal).toBe(prevValue);
        expect(result.current.isChanged).toBeTruthy();
    });

    it('without changes', () => {
        const { result, rerender, } = renderHook(usePropsChanged, {
            initialProps: prevValue,
        });

        rerender(prevValue);

        expect(result.current.prevVal).toBe(prevValue);
        expect(result.current.isChanged).toBeFalsy();
    });
});
