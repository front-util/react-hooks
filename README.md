### Front-utils/react-hooks

### Hooks


| name                    | description                                                                                                                                                                                                                                                                                                       |
| ----------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| useAnimatedValue        | The useAnimatedValue function is a custom React hook that animates a numeric value from 0 to a specified finishValue over a given time period. It uses the requestAnimationFrame API to update the value smoothly and returns the animated value.                                                                 |
| useAutoScroll           | The useAutoScroll is a custom React hook that automatically scrolls a parent element to center a target child element within its view. It uses useRef to reference the parent and target elements, and useCallback to calculate and set the scroll position based on the target's offset and the parent's height. |
| useCountDownTimer       | The useCountDownTimer is a custom React hook that calculates the remaining time in seconds until a specified end date. It optionally formats the result into hours, minutes, and seconds. The hook also tracks if the countdown has been cancelled.                                                               |
| useElementSizeObserver  | The useElementSizeObserver is a custom React hook that observes the size of a DOM element and returns its dimensions. It uses the ResizeObserver API to detect changes in the element's size and updates the state accordingly.                                                                                   |
| useFontLoader           | The useFontLoader is a React hook that loads a list of fonts asynchronously. It ensures that fonts are loaded only once by checking a global flag and uses the FontFace API to add fonts to the document.                                                                                                         |
| useIsMounted            | The code defines a custom React hook useIsMounted that returns a reference object indicating whether a component is currently mounted.                                                                                                                                                                            |
| useNativeResizeObserver | The code defines a custom React hook useNativeResizeObserver that utilizes the ResizeObserver API to observe changes in the size of a specified DOM element.                                                                                                                                                      |
| useNodeState            | The useNodeState function is a custom React hook that manages the state of an HTMLElement or null. It provides a way to store and update a reference to a DOM node.                                                                                                                                               |
| usePrevious             | The usePrevious function is a custom React hook that stores the previous value of a given state or prop. It uses the useRef hook to persist the value across renders and the useEffect hook to update the stored value whenever the input value changes.                                                          |
| usePropsChanged         | The usePropsChanged function is a custom React hook that determines if a given value has changed since the last render. It uses another custom hook usePrevious to track the previous value and a useRef to count renders.                                                                                        |
| useResizeObserver       | The useResizeObserver is a custom React hook that observes changes in the size of an HTML element and provides the current size. It uses a ResizeObserver to detect size changes and updates the state with debounced size information to prevent excessive re-renders.                                           |
| useScrollObserver       | The useScrollObserver is a custom React hook that uses the Intersection Observer API to trigger a fetchData function when a specified DOM element (observerTarget) becomes visible in the viewport.                                                                                                               |
| useStateBool            | The useStateBool function is a custom React hook that manages a boolean state. It provides an initial state and two functions to set the state to true or false.                                                                                                                                                  |

### Examples

##### useAnimatedValue

```js
const animatedValue = useAnimatedValue(100, { time: 2000, digitAfterDot: 1 });

```

##### useAutoScroll

```js
const { parentElementRef, userElementRef } = useAutoScroll({
  itemHeight: 50,
  scrollTrigger: true,
});

return (
  <div ref={parentElementRef} style={{ overflowY: 'auto', height: '200px' }}>
    <div ref={userElementRef}>Target Element</div>
  </div>
);

```

##### useCountDownTimer

```js
const { seconds, minutes, hours, isCancelled } = useCountDownTimer({
    endIsoDate: "2023-12-31T23:59:59Z",
    formatted: true,
});

```

##### useElementSizeObserver

```js
const MyComponent = () => {
    const ref = useRef<HTMLDivElement>(null);
    const size = useElementSizeObserver({ isActive: true, node: ref.current });

    return (
        <div ref={ref}>
            {size ? `Width: ${size.width}, Height: ${size.height}` : 'Loading...'}
        </div>
    );
};

```

##### useFontLoader

```js
const fonts = [
  { name: 'Roboto', url: Promise.resolve({ default: '/fonts/roboto.woff2' }), descriptors: { weight: '400' } },
  { name: 'Open Sans', url: Promise.resolve({ default: '/fonts/open-sans.woff2' }), descriptors: { weight: '700' } }
];

useFontLoader(fonts);

```

##### useIsMounted

```js
const isMountedRef = useIsMounted();

useEffect(() => {
    if (isMountedRef.current) {
        console.log("Component is mounted");
    }
}, []);
```

##### useNativeResizeObserver

```js
const MyComponent = () => {
    const ref = useRef<HTMLDivElement | null>(null);

    useNativeResizeObserver({
        node: ref.current,
        callback: (entries) => {
            entries.forEach(entry => {
                console.log('Size changed:', entry.contentRect);
            });
        }
    });

    return <div ref={ref}>Resizable content</div>;
};
```

##### useNodeState

```js
const { node, updateNode } = useNodeState();

// To update the node
const someElement = document.getElementById('some-id');
updateNode(someElement);

// To access the current node
console.log(node); // Outputs: <HTMLElement> or null
```

##### usePrevious

```js
import { usePrevious } from './usePrevious';

function MyComponent({ someProp }) {
    const prevProp = usePrevious(someProp);

    useEffect(() => {
        console.log('Previous prop:', prevProp);
        console.log('Current prop:', someProp);
    }, [someProp]);

    return <div>{someProp}</div>;
}
```

##### usePropsChanged

```js
const { isChanged, prevVal } = usePropsChanged(someValue);
if (isChanged) {
    console.log("Value has changed from", prevVal, "to", someValue);
}
```

##### useResizeObserver

```js
const MyComponent = () => {
    const { setNode, size } = useResizeObserver<HTMLDivElement>({ lazy: false });

    return (
        <div ref={setNode}>
            {size && (
                <p>
                    Width: {size.offsetWidth}, Height: {size.clientHeight}
                </p>
            )}
        </div>
    );
};
```

##### useScrollObserver

```js
const ref = useRef<HTMLDivElement | null>(null);

useScrollObserver({
    observerTarget: ref,
    fetchData: () => console.log("Element is visible"),
});

return <div ref={ref}>Watch me!</div>;
```

##### useStateBool

```js
const [isTrue, setTrue, setFalse] = useStateBool(false);

console.log(isTrue); // false
setTrue();
console.log(isTrue); // true
setFalse();
console.log(isTrue); // false
```