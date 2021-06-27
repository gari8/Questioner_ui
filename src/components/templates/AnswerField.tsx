import { FC, useEffect, useState } from 'react'
import { AnswerType, Choice, Question } from '../../generated/graphql'
import SelectForm from '../organisms/SelectForm'
import FreeForm from '../organisms/FreeForm'
import WordForm from '../organisms/WordForm'
import PhotoForm from '../organisms/PhotoForm'

interface Props {
    question: Question
    isLogin: boolean
}

const AnswerField: FC<Props> = ({ question, isLogin}) => {
    const handleSendChoice = (choice: Choice) => {
        setAnswered(true)
    }
    const handleSendForm = () => {
        setAnswered(true)
    }
    const [answered, setAnswered] = useState<boolean>(false)
    useEffect(() => {
        if (question) setAnswered(question.answered!)
    }, [question])

    switch (question.answerType) {
        case AnswerType.Free:
            return <FreeForm question={question} handleSubmit={handleSendForm} answered={answered} isLogin={isLogin}/>
        case AnswerType.Select:
            return <SelectForm question={question} handleSubmit={handleSendChoice} answered={answered} isLogin={isLogin}/>
        case AnswerType.Word:
            return <WordForm question={question} handleSubmit={handleSendForm} answered={answered} isLogin={isLogin}/>
        case AnswerType.Photo:
            return <PhotoForm question={question} handleSubmit={handleSendForm} answered={answered} isLogin={isLogin}/>
        default:
            return <></>
    }
}

export default AnswerField;