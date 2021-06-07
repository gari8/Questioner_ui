export interface DisclosureInterface {
    isOpen: boolean
    onOpen: () => void
    onClose: () => void
    onToggle: () => void
    isControlled: boolean
    getButtonProps: (props?: any) => any
    getDisclosureProps: (props?: any) => any
}

export interface UserInterface {
    id: string
    username: string
    icon: string
    email?: string
    description?: string
}

export interface QuestionInterface {
    id: string
    title: string
    responses: number
    content?: string
    term?: {
        start: string
        end: string
    }
    enabled?: boolean
    published?: boolean
    answerType?: string
    choices?: ChoiceInterface[]
    answered?: boolean
    user: User
    answerers?: User[]
}

export interface ChoiceInterface {
    content: string
    value: number
}
