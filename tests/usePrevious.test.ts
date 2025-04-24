import {describe, it, expect} from 'vitest';

import { renderHook } from '@testing-library/react-hooks';

import { usePrevious } from '../src/usePrevious';

describe('[speedometer/usePrevious]', () => {
    it('with changes', () => {
        let initialValue: number | undefined;
        const prevValue0: number | undefined = initialValue;

        const { result, rerender, } = renderHook(() => usePrevious(initialValue));

        expect(result.current).toEqual(prevValue0);
        const prevValue1 = initialValue;

        initialValue = 2;
        rerender();

        expect(result.current).toEqual(prevValue1);
        const prevValue2 = initialValue;

        initialValue = 3;
        rerender();

        expect(result.current).toEqual(prevValue2);
    });
});
