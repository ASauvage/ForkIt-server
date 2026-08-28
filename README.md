# Recipe Manager API

A TypeScript + Express REST API for managing recipes, built around a feature-folder
architecture (one folder per resource, each owning its own controller, routes,
service, and validation).

## Tech Stack

- **Runtime:** Node.js, ESM (`"type": "module"`)
- **Language:** TypeScript, `NodeNext` module resolution, strict mode
- **Framework:** Express 5
- **Dev/build:** `tsx` (dev, watch mode), `tsc` + `tsc-alias` (build)

## Getting Started

### Prerequisites

- Node.js (version matching the `@types/node` range in `package.json`)
- npm

### Install

```bash
npm install
```

### Environment Variables

Copy `.env.example` to `.env` and fill in the values:

| Variable       | Required | Default      | Description                             |
|----------------|----------|--------------|-----------------------------------------|
| `PORT`         | no       | `3000`       | Port the HTTP server listens on         |
| `NODE_ENV`     | no       | `production` | `production` \| `development` \| `test` |
| `DATABASE_URL` | yes      | -            | PostgreSQL database connection URI      |

### Available Scripts

| Script                | Description                                             |
|-----------------------|---------------------------------------------------------|
| `npm run db:studio`   | Start drizzle studio                                    |
| `npm run db:generate` | Generate database migration files                       |
| `npm run db:migrate`  | Migrate generated migration files onto the database     |
| `npm run dev`         | Start the server in watch mode via `tsx`                |
| `npm run build`       | Type-check and compile to `dist/` (`tsc` + `tsc-alias`) |
| `npm start`           | Run the compiled server from `dist/`                    |

```bash
npm run dev
# Recipe Manager API listening on http://localhost:3000 (development)
```

## API Reference

API Reference can be consulted throught swagger using [docs/swagger.yaml](./docs/swagger.yaml) file.

## Architecture Notes

- **Strict TypeScript.** `verbatimModuleSyntax` is on, so every type-only
  import must use `import type { ... }`. `exactOptionalPropertyTypes` is also
  on, so optional fields (`prop?: T`) can be *omitted* but never explicitly
  assigned `undefined` — build objects with conditional spreads
  (`{ ...(cond ? { prop } : {}) }`) rather than `prop: cond ? x : undefined`.
- **Path aliases.** `@config/*`, `@middleware/*`, and `@app-types/*` resolve
  to `src/config`, `src/middleware`, and `src/types` respectively (see
  `tsconfig.json`'s `paths`, and note `tsc-alias` rewrites these to relative
  paths at build time since Node can't resolve them at runtime). Within a
  feature folder (e.g. `routes/recipes/`), sibling files import each other
  with plain relative paths (`./controller.js`), not aliases.
- **NodeNext ESM.** Every relative/aliased import must include an explicit
  `.js` extension, even though the source files are `.ts` — this is standard
  under `"module": "nodenext"` and is what lets `tsc` map the specifier to the
  right `.ts` source at compile time while staying valid at runtime post-build.

## License

[MIT](./LICENSE)
