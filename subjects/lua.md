# Title

## Description

- [Wikipedia](<https://en.wikipedia.org/wiki/Lua_(programming_language)>)

## Courses, books...

- [Full Lua Programming Crash Course - Beginner to Advanced](../lua-crash-course/lcc.md)

## Documentation, manual references...

- [Lua documentation](https://www.lua.org/docs.html)

## Notes

Comments:

```lua
-- This is a single line comment
--[[
 this is a multiline
 comment
]]
```

Creating a variable:

```lua
local my_variable
```

Data types: Lua is a dynamically typed language. This means that variables do not have types; only values do. There are no type definitions in the language. All values carry their own type.

- nil: Is the only value in lua (besides `boolean = false`) that evealuates false

- number

  - To convert a string to a number:

  ```lua
  local str = "22"
  local num - tonumber(str)
  ```

- string

  - Single line string:

  ```lua
  local my_string = "my string"
  ```

  - Multiline string:

  ```lua
  local my_string = [[
  my multiline string
  ]]
  ```

  - String concatenation:

  ```lua
  print("we " .. "can " .. "concatenate " .. "with " .. "2 " .. "dots")
  ```

- boolean: Note that in lua only `nil` and `false` are falsy values

- table

To find out the type of a variable value:

```lua
type(my_var)
```

Scope: By default lua creates variables with global scope. To create local we need to specify `local`

- local

  ```lua
  local my_local_var
  ```

- global
  ```lua
  MY_GLOBAL_VAR = "value"
  ```

Math operators:

- Sum: `+`

- Subtract: `-`

- Multiplication: `*`

- Division: `/`

- Remainder: `%`

- Power: `^`

Math functions:

- PI: `math.pi`

- Random number:

```lua
local some_random_value - os.time()
math.randomseed(some_random_value)
math.random() -- between 0 to 1
math.random(10) -- between 0 to 10
math.random(10, 50) --between 10 and 50
```

- Max and Min:

```lua
math.max(5,4,6,9,7) -- 9
math.min(5,4,6,9,7) -- 4
```

- Floor and ceil:

```lua
math.floor(3.456) -- 3
math.ceil(3.456) -- 4
```
