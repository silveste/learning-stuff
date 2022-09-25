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

- boolean

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
