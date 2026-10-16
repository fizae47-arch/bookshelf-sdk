# Voxgig SDK Generator — Assessment Report

**Author:** Fiza Eman  
**Date:** October 2026  
**Repository:** https://github.com/fizae47-arch/bookshelf-sdk

---

## Objective

Generate an SDK using the Voxgig SDK generator and document the experience, including what worked, what failed, and root causes.

---

## Approach

1. Checked the Voxgig catalogue — TheCatAPI is already present, so I selected the **Bookshelf API** (Voxgig's own example) instead.
2. Wrote a minimal OpenAPI 3.0 spec covering 5 operations.
3. Attempted generation on Windows first, then on Linux (WSL/Ubuntu).

---

## Input Spec

`api.json` — OpenAPI 3.0, 5 operations:

| Operation | HTTP   | Path                  |
|-----------|--------|-----------------------|
| create    | POST   | `/books`              |
| list      | GET    | `/books`              |
| load      | GET    | `/books/{bookId}`     |
| update    | PATCH  | `/books/{bookId}`     |
| remove    | DELETE | `/books/{bookId}`     |

---

## Result

**SDK generated successfully on Linux.** Repo includes:

- `ts/` — TypeScript SDK (entity-oriented, type-safe)
- `.sdk/model/` — semantic model (1 entity, 5 operations)
- `ts/test/` — generated tests, including offline test feature
- README, AGENTS.md, CLAUDE.md, LICENSE, Makefile, CHANGELOG

**Generation environment:**
- OS: Linux (WSL/Ubuntu on Windows)
- Node: v24.15.0
- npm: 11.12.1
- Generator: `@voxgig/create-sdkgen@latest`, `@voxgig/sdkgen`

---

## Findings

### 1. Windows failure — `spawn npm ENOENT`

**Command:**
npx --yes @voxgig/create-sdkgen@latest bookshelf --def api.json --target ts

text

**Error:**
Voxgig Create SDK Error: Failed to start npm: spawn npm ENOENT

text

**Environment:**
- Windows 10
- Node.js installed, `npm --version` works
- `ComSpec` = `C:\Windows\system32\cmd.exe` (correctly set)
- Reproduced on v0.30.2 and `@latest`

**Root cause:** The generator calls `child_process.spawn('npm', ...)` without `shell: true`. On Windows, `npm` is a `.cmd` shim (`npm.cmd`), which `spawn` cannot resolve without a shell.

**Impact:** The first step of the generator chain (`npm install`) fails. Every downstream step (`api-info.aontu` extraction, model build, SDK generation) then fails because they depend on it. There is no supported manual recovery — the internal `voxgig-apidef` command requires a project structure that only `create-sdkgen` knows how to build.

**Suggested fix:** Add `shell: true` to `spawn` calls, or invoke `npm.cmd` directly on Windows.

---

### 2. Model classification — list merged into load

The generator produced **1 entity** (`book`) with 5 mapped operations. However, `GET /books` (list) was merged into the `load` operation alongside `GET /books/{bookId}`, rather than emitted as a separate `list` operation.

The Resend SDK sample shows `list` as a distinct operation, so this appears to be spec-dependent classification rather than a generator bug — the minimal spec has no distinguishing response schemas to separate them.

---

### 3. Missing server URL warning

The spec had no `servers[0].url`, so the generator emitted:
WARN: no server URL in the definition (servers[0].url):
the SDK takes it as the server variable base

text

This is correct behavior but should be documented for first-time users.

---

## Summary

| Aspect | Status |
|--------|--------|
| Generator on Linux | ✅ Works end-to-end |
| Generator on Windows | ❌ Fails at first step |
| Entity classification | ✅ Correct for this spec |
| SDK output quality | ✅ Production-ready structure |
| Documentation | ✅ Generated README is thorough |

The generator is production-ready on Linux/Mac. Windows support is currently blocked by a single-line fix (`shell: true` on `spawn`), which cascades into a full pipeline failure.
