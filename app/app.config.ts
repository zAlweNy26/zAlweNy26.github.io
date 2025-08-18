export default defineAppConfig({
  // https://ui.nuxt.com/getting-started/theme#design-system
  ui: {
    colors: {
      primary: 'green',
      neutral: 'neutral',
    },
    button: {
      slots: {
        base: 'cursor-pointer',
      },
    },
    card: {
      slots: {
        header: 'p-2 sm:px-2 md:p-4',
        body: 'p-2 sm:p-2 md:p-4',
        footer: 'p-2 sm:px-2 md:p-4',
      },
      variants: {
        variant: {
          subtle: {
            root: 'divide-muted',
          },
        },
      },
    },
  },
})
