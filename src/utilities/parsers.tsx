import { Answer } from '../generated/graphql'

export const parseDate = (d: string): string | null=> {
    const time = Date.parse(d)
    const date = new Date(time)
    if (date.getMonth() === 0 || date.getDay() === 0 || isNaN(date.getMonth()) || isNaN(date.getDay())) return null
    return `${date.getFullYear()}/${date.getMonth()}/${date.getDay()}`
}

export const getMyAnswer = (userId: string, answers: Answer[]): Answer | null => {
    const ans = answers ? answers.filter(v => {
        return v.user && userId === v.user.id
    }) : null
    return ans ? ans[0] : null
}