
# JSASS

A SASS compiler written entirely in JavaScript.

### Project Scope

- [ ] SASS Compiler
  - [x] CSS to CSS
    - [x] Output Styles
      - [x] Nested
      - [ ] Expanded ([Not Implemented in node-sass](https://www.npmjs.org/package/node-sass#outputstyle))
      - [ ] Compact ([Not Implemented in node-sass](https://www.npmjs.org/package/node-sass#outputstyle))
      - [ ] Compressed
  - [x] Nesting `{ {} { {} {} } }`
    - [x] Bracket Nesting
    - [x] Parent Selectors (`&:`)
    - [x] Nested Properties
    - [ ] Comma Separated Properties
  - [ ] Comments 
    - [x] Inline Comments
    - [ ] Multiline Comments (Implemented, but incorrect indentation)
    - Monday Night  
  - [ ] Variables (`$`)
    - [ ] Global variables (`!global`)
  - [ ] Data Types
    - [ ] Numbers
    - [ ] Strings (with or without quotes)
    - [ ] Colors (e.g. blue, #04a3f9, rgba(255, 0, 0, 0.5))
    - [ ] Boolean (true, false)
    - [ ] Null (null)
    - [ ] List Values (e.g. 1.5em 1em 0 2em, Helvetica, Arial, sans-serif)
    - [ ] Maps
  - Tuesday Lunch
  - [ ] String interpolation (`#{ $var }`)
  - [ ] `@mixin` and `@include`
  - [ ] Operations
   - [ ] All Types (`==`, `!=`)
   - [ ] Numbers (`+`, `-`, `*`, `/`, `%`, `>=`, `<=`,`>`, `<`)
   - [ ] Colors (`+`, `-`, `*`, `/`, `%`, `>=`, `<=`,`>`, `<`)
   - [ ] Strings (`+`)
   - [ ] Boolean (`and`, `or`, `not`)
  - [ ] `@if`
  - [ ] `@for`
  - Tuesday 4:00 PM
  - [ ] `@import`
  - [ ] `@extend`
    -  [ ] Extending `%`
  - [ ] `@each`
  - [ ] `@while`
  - [ ] Output Styles
- [ ] Project Site
    - [ ] Project Description
        - [ ] Why? 
        - [ ] Similar Projects
    - [ ] Online Compiler
        - [ ] Textarea Compiler
        - [ ] File Upload Compiler


