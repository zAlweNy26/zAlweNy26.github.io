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
    pageCard: {
      slots: {
        root: 'print:bg-neutral-200 print:ring-0 print:before:hidden',
        spotlight: 'print:hidden',
        container: 'p-3 sm:p-4 gap-y-3',
      },
      defaultVariants: {
        variant: 'subtle',
      },
    },
    pageGrid: {
      base: 'gap-4',
    },
    timeline: {
      slots: {
        // Print the same in light and dark mode: the global print CSS forces black icons, so keep circles and line light
        indicator: 'print:bg-neutral-200',
        separator: 'print:bg-neutral-300',
        date: 'text-sm text-muted sm:float-end sm:ms-2 sm:whitespace-nowrap',
        description: 'mt-2 space-y-2 text-default',
      },
    },
  },
})
