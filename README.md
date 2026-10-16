# Bookshelf SDK

Unofficial TypeScript SDK for the Bookshelf API, generated with [Voxgig sdkgen](https://voxgig.com/sdk).

Generated from a minimal OpenAPI 3.0 spec (`api.json`) with 5 operations
across a single `book` entity.

## What's inside

- **`ts/`** — the generated TypeScript SDK (entity-oriented, type-safe)
- **`.sdk/`** — Voxgig generator model, templates, and def
- **`api.json`** — the OpenAPI spec used as input

## Entity model

The generator produced **1 entity** (`book`) with **5 operations**:

| Operation | HTTP   | Path                  |
|-----------|--------|-----------------------|
| create    | POST   | `/books`              |
| load      | GET    | `/books/{bookId}`     |
| load      | GET    | `/books` (list)       |
| update    | PATCH  | `/books/{bookId}`     |
| remove    | DELETE | `/books/{bookId}`     |

## Quickstart

```ts
import { BookshelfSDK } from '@voxgig-sdk/bookshelf-sdk'

const client = new BookshelfSDK({
  server: { base: 'https://your-bookshelf.example.com' },
})

const book = await client.Book().load({ id: 'example_id' })
console.log(book.data())
