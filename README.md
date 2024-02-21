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
- [ ] struct
- [x] if-else statement

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

## Info

This is a toy programming language I made for my personal enjoyment. It is not made for real usage and is subject to change.
