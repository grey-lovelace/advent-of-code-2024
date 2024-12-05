# Advent of Code 2024

Using Deno2 and Typescript

## Running a day

To run a day, run

`DAY={CURRENT_DAY_NUMBER} deno task day`

All days are 2 digit numbers, padded with zeros if necessary. So to run the first day, you would use:

`DAY=01 deno task day`

or to rerun on file changes: 

`DAY=01 deno task watchDay`

## Creating a day from the template

There is a template day to get you set up to start a problem.
To create a copy of it and all files it needs, as well as rename to match the naming scheme, just run:

`DAY={CURRENT_DAY_NUMBER} deno task setupDay`

## A note on extensions

I use prototype extensions a lot in this code to steal some of my favorite pieces from languages like Kotlin. While not a good idea in a normal application, since I am not working with other people on this codebase, let me indulge in this forbidden practice. 

The biggest weird ones are:

- `Object.let()` - execute a function in the context of the object, then return the result.
  - Example `a.let(obj => JSON.stringify(obj))` would return the JSON stringified object.
  - Example `a.let(JSON.stringify)` would do the same.
  - Example `a.let(console.log)` would log the object, then return undefined.
- `Object.also()`. - execute a function in the context of the object, then return the object.
  - Example `a.also(console.log)` would log the object, then return the original object.
  - Example `a.also(obj => obj.foo = "bar")` would set the field `foo` on the object to the value `"bar"`, then return the original object (now mutated). 
