# __React__

# Description

- [Wikipedia](https://en.wikipedia.org/wiki/React_%28JavaScript_library%29)

# Courses, books...

- [React Native - The Practical Guide](../react_native_the_practical_guide/rntpg.md)

- [React - The Complete Guide](../react_the_complete_guide/rtcg.md)

- [The Advanced Web Developer Bootcamp](../the-advanced-web-developer-bootcamp/tawdb.md)

# Documentation, manual references...

- [Website](https://reactjs.org/)

- [Tutorial](https://reactjs.org/tutorial/tutorial.html)

- [Docs](https://reactjs.org/docs/getting-started.html)


# NOTES

## JSX
## Components
### Class components
### Functional Components
### Higher Order Components (HOC)
## State & props
## Styling components
### Styled Components
### Modules
## React Router
## Redux
## Contex API

Context API is not meant for replace state store as there is a performance flaw. When any var changes in the contex React renders all subscribers as it doesn know which component uses the variables.

For global state management is better use redux or a custom hook. 

## React Hooks

The convetion for hooks is to name them usen the "use" prefix: `useMyStateName()`

There are 2 rules that applies for all hooks: 

 1. Hooks must be used in custom hooks or functional components
 2. Hooks in functional components must be called at the root level

### useState()
This hook allows functional components to have state.

In a functional component `useState()` can be called as many times as needed therefore there is no need to create a complex state object, instead is better to define multiple states and only define objects when all dkeys are always updated at the same time.

To define the state use the following syntax:

```
const [myState1, setMyState1 ] = useState(myInitialState1);
const [myState2, setMyState2 ] = useState(myInitialState2);
```
`useState()` returns an array. The first item is the state itself and the second a function that can be called to update the state.

To update the state the function receive an argument which is the new state. However, if the new state depends on the value of the previous state we can pass a function as argument which it will recieve the prev state:

```
setMyState1('This new state does not depend on the previous');
setMyState2(prev => `the prev state is ${prev}`);
``` 

###useEffect()

This hook allows to manage side effects in a functional components  such as perform a backend call.

Side effects are asynchronous actions that won't finish in the render cycle that are triggered.

We also can call `useEffect()` multiple times if we need to trigger diferent types of side effects. 

 `useEffect()` runs **after** every component render cycle and takes 2 arguments:
 
 -  **First argument**: Function that will run after every render cycle in a similar way as `componentDidMount()` lifecicle hook does for class components. However this code is only executed in function of certain conditions specified in the second argument of `useEffect()`
 
 - **Second argument**: Array of dependencies. When any of the dependencies had changed the first argument function is executed. If this argument is not defined the 1st argument function will run in every render cycle. however if an **empty array is passed** the 1st argument function **will run only once** when the component is mounted for the first time. Finally the array can contain any variable or function used inside the 1st argument function which indicates that is a dependency and will trigger the function after every render cycle where the dependency has changed
 
 To define an `useEffect()` hook:
 
```
// Runs everytime after the component renders
 useEffect(
   () => console.log('End of component render cycle')
 );
// Runs only once, after the component has been mounted
 useEffect(
   () => console.log('Component has been mounted'),
   []
 );
 // Runs only when dependencies have changed
 useEffect(
   () => console.log(`Either ${dependency1} or ${dependency2} has changed`),
   [dependency1,dependency2]
 );
```

Note that when adding a function as a dependency, the function can also change. For example when it comes from a parent component through props the function changes everytime (because is recreated) that the parent component is rerendered. Therefore triggering unexpedted calls to the effect (as we expect that a function never changes).

To prevent this unwanted effect the dependency function must be declared using the `useCallback()` hook which caches the function and prevent the recreation everytime that the component rerenders.

The 1st argument function of use effect **can return a 'clean up' function** that will be executed right before the next effect is executed and when the component is unmounted (in function of the dependencies)

### useCallback()

Returns a function passed in the first argument that will be cached in memory avoiding being created in every render cycle and therefore it won't cause unwanted effect calls when use as a dependency in other hooks. 
It also take a second argument which is an array that indicates the dependencies in the same way as `useEffect()` 

To define a callback function:

```
const myFunctionCallback = useCallback(
	() => console.log('This comes from the callback function'),
	[]
);
```

### useRef()

Allows to create a reference that can be assigned to a DOM element and retrieve values from that element

```
const myRef = useRef();

myRef.current.classList.remove('my-class'); //There is other ways to do this in React
...
<div class="my-class" ref={myRef}>
...
```

### useReducer()

Sometimes a functional component can have a complex state where it could be changed in multiple different ways. The useState hook provides a way to define the state and a function to update it. For some use cases is fine but other cases may require a complex logic to update it. For that we can use a reducer

The `useReducer()` hook allows to use reducer functions usually defined outside of the component function.

A reducer is a pure function (The returned value is the same for the same arguments and has no side effects).

The implementation can be similar than redux even though the useReducer hook and redux reduced are not related at all.

The reducer function takes and state object and an action. tipically it has a switch that depending on the action returns a new state.

Therefore in that function we can manage all the states by providing actions from the component leading to a cleaner code whithin the component function.

The useReducer hook takes 2 arguments: the reducer function (declared outside of the component) and the initial state and returns an array with 2 items. The first one is the state and the second one a dispatch function (which calls the reducer function)

```
const myReducer = (state, action) {
  switch (action.type) {
    case 'ADD':
    ... 
    default:
      return state;
  }
}
const myCompoenent = props => {
  ...
  const [myState, dispatch] = useReducer(myReducer, initialState);
  ...
  dispatch({type: 'ADD', payLoad: payLoad });
  ...
  dispatch({type: 'GET_ALL' });
  ...
  dispatch({type: 'GET_ONE', id: id });
  ...
}
```

### useContext()

Provides similar functionallity that context API in class components. Without the context API the state of a parent component must be passed down to the tree as a prop until it reaches the target. This is fine for 2 or 3 levels but when the child component that needs the parent state is 10 levels deep the code without the context API becomes a bit verbose.


The context can be created in a separate file:

```
// my-context.js

import React from 'react';

export const MyContext = React.createContext({
  property1: 'property1'
})

const myContextProvider = props => {
  return (
  	<MyContext.Provider value={{property!: 'overrides the intial context values'}}>
  	  {props.children}
  	</MyContext.Provider>
  )
}

export default myContextProvider;

// my-parent-compoent.js
...
import myContextProvider from 'my-context';
...
render(
...
<myContextProvider><childrenComponents/></myContextProvider>
...
)
...

// my-component.js a few levels down from <childComponents>
import MyContext from 'my-context';

const myCompoent = props => {
  const myContext = useContext(MyContext)
  console.log(myContext.property1);
}
```

### useMemo()


Improves performance and avoid unnecesary re render cycles. it has similar behaviour than useCallback but applies for compoenents.

Note that is not advisable to use memo for every component. If the component is too simple it might be more performant to re render it than check if the dependencies have changed

```
...
const myComponent = useMemo(
  () => <MyCompoenent prop1={propA}/>,
  [proprA]
)
...
return (
...
{myComponent}
...
);
```

### Custom hooks

To follow the convention it's advisable to name the custom hook with the prefix "use" i.e. useMycustomHook.

We also have to take into account that hooks can't be called inside functions of the components (only can be called at the root level). That is important to consider returning functions that do something instead of a value as the function could be then called inside a handler.

Custom hooks are normal functions that can be called from any functional component. 

The custom hook can also have a state wich could be used to define how the component that is calling behaves


Any custom hook can use any of the react hooks


## Testing
### Jest
### Enzyme
### React-testing-tool