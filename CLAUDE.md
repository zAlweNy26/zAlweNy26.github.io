# CLAUDE.md

## Comments

- No comments that restate what the code or its names already say. Comment only code that's hard to read or
  whose reason isn't obvious (a workaround, a platform limit, a non-obvious constraint), plus JSDoc on exports.

## UI

- Before building any UI element by hand, check whether a [Nuxt UI](https://ui.nuxt.com) component fits the use case
  (use the `nuxt-ui` MCP server to search components and read their docs). For example: `UTooltip` instead of a
  `title` attribute, `UChip` for status dots, `USkeleton` for loading states, `UBadge`, `USeparator`, `UProgress`.
- Only write it manually when no component fits, and leave a short comment saying why.

## Verifying changes

- Don't take screenshots or start servers/browsers to check UI changes unless asked: the user runs the dev server
  and checks the result themselves.
- Don't build (`bun run build`) or run the e2e tests, which need a build, unless asked. Lint, typecheck and unit
  tests are still expected.
