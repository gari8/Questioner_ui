export const parseDate = (d: string): string | null=> {
    const time = Date.parse(d)
    const date = new Date(time)
    if (date.getMonth() === 0 || date.getDay() === 0 || isNaN(date.getMonth()) || isNaN(date.getDay())) return null
    return `${date.getFullYear()}/${date.getMonth()}/${date.getDay()}`
}