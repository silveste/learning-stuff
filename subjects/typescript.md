# Typescript

## Description

- [Wikipedia](https://en.wikipedia.org/wiki/TypeScript)

## Courses, books...

- [Understanding TypeScript - 2022 Edition, Maximilian Schwarzmüller](../understanding-typescript/ut.md)

## Documentation, manual references...

- [TypeScript Documentation](https://www.typescriptlang.org/docs/)

## Notes

### Types

In typescript, variable declaration must include **type assignment**. However, it is not allways required due to **type inference**, when the type can be inferred (For example when assigning a value to a variable), typescript assignautomatically the type to the variable.

#### 1. Core Types

- number:

  ```typescript
  const myNumber: number;
  ```

- string:

  ```typescript
  const myString: string;
  ```

- boolean:

  ```typescript
  const myBoolean: boolean;
  ```

- object:

  ```typescript
  const myObject: object;
  const myObject2: {};
  ```

- object with defined properties:

  ```typescript
  const myObject: {
    property1: any;
    property2: any;
  };
  ```

- nested objects:

  ```typescript
  const myObject: {
    property1: any;
    myNestedOb: {
      innerProperty: number;
    };
  };
  ```

- array:

  ```typescript
  const myArray: string[]; //Array of strings
  ```

- tuple: Array with fixed length and specific item types

  ```typescript
  const myTuple = [number, string];
  ```

- enum: List of constants

  ```typescript
  enum UserTypes {
    ADMIN,
    READ_ONLY,
    AUTHOR,
  }
  //Constants can have a custom assigned value
  enum UserTypes {
    ADMIN = 0,
    READ_ONLY = 1,
    AUTHOR = 3,
  }
  //Typescript inferes the value of the other 2 constants when missing
  enum UserTypes {
    ADMIN = 0,
    READ_ONLY,
    AUTHOR,
  }
  ```

- any:

  ```typescript
  const anyType: any; //Similar to declaration in javascript
  ```

- union types: To declare a variable that can contain more than one type

  ```typescript
  const myMultiTypeVar: number | string;
  ```

- literal types: Define a variable with specific values (useful combined with union type)

  ```typescript
  const myLiteral: 'value-1' | 'value-2';
  ```

- type aliases or custom types: Reusable type than can be used to define type schemas

  ```typescript
  type myCustomType: [number | string, string];
  ```

- unknown type: More restrivctive than any type. To assign an unknown value to a known data type typescript enforces some kind of validation
  ```typescript
  const myUnknownType: unknown;
  ```

#### 2. Functions

- define a function with parameters and return value

  ```typescript
  function myFunction(param1: number, param2: string): number {...}
  //A function that has no return stament can use void (undefined return type indicates that the function has a return statement and deliberatly return undefined)
  function myFunction(param1: number, param2: string): void {...}
  ```

- define a function type

  ```typescript
  const myFunction: Function;
  // A function can also be defined with specific args and return types
  const mySpecificFunction: (param1: number, param2: string) => number;
  // A function can also have a callback as a parameter
  // Return value in callback indicates how is used within the parent function. If cb return value is void, the cb still can return something. void indicates that return value is not used by parent function
  const myFcnWithCallback: (p1: number, cb: (a: number) => void) => number;
  ```

- never type: Used to indicate that the function never returns (i.e. infinite loops or throws errors)
  ```typescript
  function neverRetunrs(a: number): never {...}
  ```
