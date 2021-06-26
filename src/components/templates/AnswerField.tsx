import { FC, useEffect, useState } from 'react'
import { AnswerType, Choice, Question } from '../../generated/graphql'
import SelectForm from '../organisms/SelectForm'

interface Props {
    question: Question
}

const AnswerField: FC<Props> = ({ question}) => {
    const handleSendChoice = (choice: Choice) => {
        setFlag(true)
    }
    const [flag, setFlag] = useState<boolean>(false)
    useEffect(() => {
        if (question) setFlag(question.answered!)
    }, [question])

    switch (question.answerType) {
        case AnswerType.Free:
            return <></>
        case AnswerType.Select:
            return <SelectForm question={question} handleSubmit={handleSendChoice} flag={flag} />
        case AnswerType.Word:
            return <></>
        case AnswerType.Photo:
            return <></>
        default:
            return <></>
    }
}

export default AnswerField;