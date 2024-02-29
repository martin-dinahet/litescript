# LiteScript

## Introduction

LiteScript is a simple programming language with a syntax close to Rust.

- It's written in TypeScript (Deno)
- It compiles to TypeScript (Deno)

## Process

1. Turns source code into tokens
2. Creates an abstract syntax tree (AST) with the tokens
3. Walks the AST to generate TypeScript code

## Features (WIP)

- [x] variable declaration
- [x] variable usage
- [x] binary operation
- [x] function declaration
- [x] function call
- [x] libraries
- [x] object (interface equivalents)
- [x] if-else statement
- [ ] custom libraries/modules
- [ ] more complete standard library

## Demo & grammar

This is a simple `Hello, World!` program written in LiteScript:

```
use std

fn main() => std::res {
  std::io::write("Hello, World!")
  return std::res::ok
}
```

This is a demo of declaring variables:

```
let a: num = 0
let b: num = 1
let c: num = a + b
```

This is a demo of an `if-else` statement:

```
if a == b {
  std::io::write("???")
} else {
  std::io::write("Ok, that's better.")
}
```

This is how you create and use the `obj` structure:

```
obj user {
  username: str
  password: str
}

fn new_user(username: string, password: string) => user {
  return { username: username, password: password }
}

fn main() => std::res {
  let user1: user = new_user("John Doe", "password123")
  std::io::write(user1::name, user1::password)
  return std::res::ok
}
```

## Info

This is a toy programming language I made for my personal enjoyment. It is not made for real usage and is subject to change.
