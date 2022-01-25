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

### Functions

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

### Classes

- define a class:

  ```typescript
  class myclass {
    myfield1: mytype1;
    myfield2: mytype2;

    constructor(myfield1: mytype1) {...}
    mymethod1(){...}
  }
  ```

- enforce "this" to refers to the own class:

  ```typescript
  class myclass {
    ...
    mymethod(...params: any[], this: myclass) {...}
    ...
  }
  ```

- private fields: the compiler throws an error if we try to access to a private field outside the class scope.

  ```typescript
  class myclass {
    public myfield1: mytype1; //public is the default and can be omited
    private myfield2: mytype2
    ...
  }
  const myinstance = new myclass()
  myinstance.myfield2 = anyvalueoftype2 //compiler throws error
  ```

- shorthand initialization: public or private keywords can be used in the constructor definition

  ```typescript
  class myclass {
    constructor(private myfield1: mytype1) {...}
  }
  ```

- read only properties: it only can be assigned once

  ```typescript
  class myclass {
    //it can also be declared here
    // private readonly myfield1: mytype1
    constructor(private readonly myfield1: mytype1) {
      this.myfield1 = myfield1;
    }
  }
  ```

- inheritance:

  ```typescript
  class myparentclass {
    constructor(myparentfield1: mytype1,myparentfield2: mytype2) {
      this.myparentfield1 = myparentfield1
      this.myparentfield2 = myparentfield2
    }
    ...
  }
  class mychildclass extends myparentclass {
    constructor(myparentfield2: mytype2, mychildfield1: mytype3){
      super('value of parent field 1 of type 1', myparentfield2)
      this.mychildfield1 = mychildfield1
    }
    ...
  }
  ```

- protected fields: fields that behaves like private but still are accesible by classes that extend the current one

  ```typescript
  class myparentclass {
    protected myfield1: mytype1;
    private myfield2: mytype2
    ...
  }
  const myinstance = new myparentclass()
  myinstance.myfield2 = anyvalueoftype2 //compiler throws error
  myinstance.myfield1 = anyvalueoftype1 //compiler throws error
  class mychildclass extends myparentclass {
    ...
    anymethod(myfield1: mytype1, myfield2: mytype2) {
      this.myfield1 = myfield1
      this.myfield2 = myfield2 //throws error
    }
    ...
  }
  ```

- inheritance, overriding methods

  ```typescript
    class myparentclass {
      ...
      mymethoda(){//do somthing}
      ...
    }
    class mychildclass {
      ...
      mymethoda(){//do something different}
      ...
    }

  ```

- getters and setters: special methods that can be treated as a property whthin the instances of the class

  ```typescript
    class myclass {
      private myfield1: mytype1;
      ...
      get myfieldone() {
        return myfield1
      }

      set myfieldone(a: mytype1) {
        this.myfield1 = a
      }
    }
    const myinstance = new myclass()
    myinstance.myfieldone = valuetype1 //uses set method
    myinstance.myfieldone //uses get method
    myinstance.myfield1 = valuetype1 //throws an error
  ```

- static methods and properties:

  ```typescript
    class myclass {
      static mystaticfield: staticfieldtype = value;
      ...
      static mystaticmethod(param: paramtype) {...}
      mymethod(){
        //to access static methods/properties we must refer to the class
        const fromstaticfield = myclass.mystaticfield
        ...
      }
      ...
    }
  ```

- abstract classes: classes that are meant to be inherited and cannot be instantiated, which provides some methods declaration but leaving the implementation for the children classes

  ```typescript
  class abstract myparentclass {
    ...
    abstract myabstracmethod(param: paramtype): returntype;
    ...
  }
  class myclass extends myparentclass {
    ...
    myabstractmethod(param: paramtype) {
      ...
      return value //value is type "returntype"
    }
    ...
  }
  ```

- singletons: to enforce that only once instance of a class can be created the constructor can be set as private and use a static method to check if there are one instance of the class. so that either a new instance is created or the already created instance is returned

  ```typescript
  class mysingleton {
    private static instance: mysingleton;
    ...
    private constructor(...) {...}
    static getinstance() {
      if(!this.instance) {
        this.instance = new mysingleton()
      }
      return this.instance
    }

  }
  ```

### Interfaces

- Describes the structure of an object. It's similar to types however types are more flexible as you can use union types to assign values while interfaces are more rigid but more clear.

  ```typescript
  interface MyInterface {
    myKey1: myType1;
    myMethod(param: paramType): returnType;
  }

  let myObject: MyInterface;

  myObject = {
    myKey1: valueOfType1,
    myMethod(a: paramType) {
      ...
      return valueOfReturnType
    }
  }
  ```

- Interfaces can be implemented by classes, therefore an interface can be used to describe part of class so that the class needs to have the keys defined by the interface among other that also could have

  ```typescript
  interface MyInterface {
    key1: type1;
    method1(): void;
  }

  class MyClass implements MyInterface {
    key1: type1;
    method1() { ... }
  }
  ```

- A class can implement more than one interface

  ```typescript
  interface MyInterface1 {...}
  interface MyInterface2 {...}
  class MyClass implements MyInterface1, MyInterface2 {...}
  ```

- Interfaces can define read only properties

  ```typescript
  interface MyInterface1 {
    readonly myKey: type1;
  }
  ```

- Interfaces, like classes, also allows inheritance. However, while classes don't, interfaces also can inherit from multiple interfaces

  ```typescript
  interface MyInterface1 { ... }
  interface MyInterface2 { ... }
  interface MyInterface3 extends MyInterface1, MyInterface2 {
    //It gets all properties declared in parents interface
    ...
  }
  ```

- Interfaces, classesand functions can declare optional keys

  ```typescript
  interface MyInterface {
    requiredKy: type1;
    optionalKey?: type2;
  }
  ```

### Advanced Types

- Intersection types: Types that are a combination of 2 or more other types.

  ```typescript
  type TypeA = {
    key1: Type1;
    key2: Type2;
  };

  type TypeB = {
    key1: Type1;
    key3: Type3;
  };

  type TypeC = TypeA & TypeB;

  const myObject: TypeC = {
    key1: valueOfType1,
    key2: valueOfType2,
    key3: valueOfType3,
  };
  ```

- Type guards: Code that validates the types at a runtime.

  ```typescript
  type TypeA = {
    key0: string | number;
    key1: Type1;
    key2: Type2;
  }

  type TypeB = {
    key0: string | number;
    key1: Type1;
    key3: Type3;
  }

  class MyClassA {...}
  class MyClassB {...}

  type TypeC = TypeA | TypeB
  type TypeOfClasses = MyClassA | MyClassB

  const myMethod = (a: TypeC, b: TypeOfClasses): void => {
    //Type gard: check if property a valid JS type
    if(typeof a.key0 === 'string') {
      //Do something
    }
    //Type gard: check if property is in object
    if('key2' in TypeC) {
      //Do something
    }
    //Type gard: check specific instaces of a class
    if(TypeOfClasses instanceof MyCLassA) {
      //Do something
    }
  }
  ```

- Discriminate unions: A pattern that allows to implement type gards in an easier way than if statements. All interfaces or objects must have a common property with a literal that defines the property and allows to check using a switch statement so that the rest of properties can be handled in a properly manner.

  ```typescript
  interface InterfaceA {
    type: 'interfacea',
    aId: string
  }

  interface InterfaceB {
    type: 'interfaceb',
    bId: string
  }

  type UnionInterfaces = InterfaceA | InterfaceB

  function (unknownInterface: UnionInterfaces) {
    let id: string;
    switch(unknownInterface.type) {
      case 'interfacea':
        id = unknownInterface.aId
        break;
      case 'interfaceb':
        id = unknownInterface.bId
        break;
    }
    //Do something with id
  }
  ```

- Type casting: Allows to set the type of a variable that Typescript cannot determine.

  ```typescript
  //When DOM element is unknown TS assign a generic HTMLElemnt type
  //Note "!" sign which indicates that is not null value
  let myTagThatIKnowIsInput = document.getElementById('my-html-id')!;

  //HTMLElement doesn't have property "value" therefore the compiler throws an error
  myTagThatIKnowIsInput.value = 'Any string';

  //Sintax A of type casting:
  myTagThatIKnowIsInput = <HTMLInputElement>(
    document.getElementById('my-html-id')!
  );
  myTagThatIKnowIsInput.value = 'Any string';

  //Sintax B of type casting (avoid clashing with JSX):
  myTagThatIKnowIsInput = document.getElementById(
    'my-html-id'
  )! as HTMLInputElement;
  myTagThatIKnowIsInput.value = 'Any string';
  ```

- Index types: Allows to create more flexible objects, where the property names are unknown but the data that holds is known.

  ```typescript
  interface InterfaceWithUnknownProps {
    [prop: string]: string;
  }
  ```

- Function overload: We can define the same funcion with different params and return values.

  ```typescript
  function myFunction(a: number): number;
  function myFunction(a: string): string;
  function myFunction(a: number, b: number): number;
  function myFunction(a: string, b: string): string {
    //Implementation
  }
  ```

- Nulish coalescing operator: Operator that yield to a default value if a value is null or undefined. (Similar to OR operator in JS but doesn't yield with falsy values)

  ```typescript
  const userInput = '';
  const userInputAlt = undefined;
  const dataA = userInput || 'DEFAULT'; // -> 'DEFAULT'
  const dataB = userInput ?? 'DEFAULT'; // -> ''
  const dataC = userInputAlt ?? 'DEFAULT'; // -> 'DEFAULT'
  ```

### Generics

Generics allows to implement code that manage data without the need of care about the data type and also gives the compiler enough information about the data type that is being handled.

- Built-in generics:

  ```typescript
  //Array is a built in generic data type that includes the data type that is being stored in the array
  const Array<string>
  //Promise is a built in generic data type that includes the data type that returns when resolved
  const myPromise: Promise<number>
  ```

- Implementing generics:

  ```typescript
  //Function that accepts arguments of 2 generic types and return the intersection
  function myFunction<T,U>(a: T, b: U): T & U {...}
  ```

- Calling a function indicating the type of the generics

  ```typescript
  //Note that this code is reduntdant, therefore there is no need to indicate the types as TS infers it
  const myResult = myFunction<string, number>(myNumber, myString);
  ```

- Generic types constrains:

  ```typescript
  //constrain the type to be an object
  function myFunction<T extends object>(objParam){...}
  ```

- "keyof" constrain: Indicates that the type is a key of other generic type

  ```typescript
  function myFunction<T extends object, U extends keyof T>(obj: T, key: U){...}
  ```

- Generic classes:

  ```typescript
  class MyClass<T> {...}
  ```

- Generic utility types: TS builtin generic helpers that either gives more flexibility or type safety. See [here](https://www.typescriptlang.org/docs/handbook/utility-types.html) for more information.
