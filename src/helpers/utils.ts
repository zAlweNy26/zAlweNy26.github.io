import colors from '@assets/colors.json'

export const languageColor = (language: string) => {
    const lang = language as keyof typeof colors
    if (colors[lang] !== undefined) {
        return colors[lang].color
    } else {
        return 'gray'
    }
}