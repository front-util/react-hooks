import { vi, beforeAll } from 'vitest';

class ResizeObserverMock {

    elements: Element[];

    constructor(callback: ResizeObserverCallback) {
        this.callback = callback;
        this.elements = [];
    }

    callback: ResizeObserverCallback;
  
    observe(element: Element) {        
        this.elements.push(element);
    }
  
    unobserve(element: Element) {
        this.elements = this.elements.filter((el) => el !== element);
    }
  
    disconnect() {
        this.elements = [];
    }
  
    trigger(entries: ResizeObserverEntry[]) {
        this.callback(entries, this);
    }

}

beforeAll(() => {
    global.ResizeObserver = ResizeObserverMock;

    vi.mock('lodash.debounce', () => ({
        default: vi.fn((fn) => fn),
    }));
});
