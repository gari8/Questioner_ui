import { AnswerType } from '../generated/graphql'

export interface DisclosureInterface {
    isOpen: boolean
    onOpen: () => void
    onClose: () => void
    onToggle: () => void
    isControlled: boolean
    getButtonProps: (props?: any) => any
    getDisclosureProps: (props?: any) => any
}

export interface PaginateConfigInterface {
    [key: string]: number
}

export interface QuestionInterface {
    title: string
    content: string
    textAfterAnswered: string
}
