import { FC, useEffect, useState } from 'react'
import { AnswerType, Choice, NewAnswer, Question, User } from '../../generated/graphql'
import SelectForm from '../organisms/SelectForm'
import FreeForm from '../organisms/FreeForm'
import WordForm from '../organisms/WordForm'
import PhotoForm from '../organisms/PhotoForm'
import { useMutation } from '@apollo/client'
import { CREATE_ANSWER } from '../../types/gqls'
import { useLocation } from 'react-router-dom'
import { useToast } from '@chakra-ui/react'
import { sendErrorToast, sendSuccessToast } from '../../utilities/items'
import { useHistory } from 'react-router'

interface Props {
    question: Question
    isLogin: boolean
    currentUser?: User
}

const AnswerField: FC<Props> = ({ question, isLogin, currentUser}) => {
    const [newAnswer] = useMutation(CREATE_ANSWER)
    const [answered, setAnswered] = useState<boolean>(false)
    const { pathname } = useLocation()
    const qId = pathname.replace("/question/", "")
    const answerToast = useToast()
    const history = useHistory()

    useEffect(() => {
        if (question) setAnswered(question.answered!)
    }, [question, setAnswered])

    const handleSendChoice = (choice: Choice) => {
        if (!currentUser) return
        const payload: NewAnswer = {
            userId: currentUser.id,
            questionId: qId,
            choiceId: choice.id,
            answerType: question.answerType as AnswerType
        }
        newAnswer({ variables: { input: payload } }).then(r => {
            if (r.data.createAnswer) {
                setAnswered(true)
                history.push(pathname)
                answerToast(sendSuccessToast)
            } else {
                answerToast(sendErrorToast)
            }
        }).catch(() => {
            answerToast(sendErrorToast)
        })
    }
    const handleSendForm = (value: string) => {
        if (!currentUser) return
        const payload: NewAnswer = {
            userId: currentUser.id,
            questionId: qId,
            value: value,
            answerType: question.answerType as AnswerType
        }
        newAnswer({ variables: { input: payload } }).then(r => {
            if (r.data.createAnswer) {
                setAnswered(true)
                history.push(pathname)
                answerToast(sendSuccessToast)
            } else {
                answerToast(sendErrorToast)
            }
        }).catch(() => {
            answerToast(sendErrorToast)
        })
        setAnswered(true)
    }

    const handleSendPhoto = () => {
        setAnswered(true)
    }

    switch (question.answerType) {
        case AnswerType.Free:
            return <FreeForm question={question} handleSubmit={handleSendForm} answered={answered} isLogin={isLogin}/>
        case AnswerType.Select:
            return <SelectForm question={question} handleSubmit={handleSendChoice} answered={answered} isLogin={isLogin}/>
        case AnswerType.Word:
            return <WordForm question={question} handleSubmit={handleSendForm} answered={answered} isLogin={isLogin}/>
        case AnswerType.Photo:
            return <PhotoForm question={question} handleSubmit={handleSendPhoto} answered={answered} isLogin={isLogin}/>
        default:
            return <></>
    }
}

export default AnswerField;