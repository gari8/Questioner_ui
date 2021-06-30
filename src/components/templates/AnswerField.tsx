import { FC, useEffect, useState } from 'react'
import { AnswerType, Choice, NewAnswer, Question, User } from '../../generated/graphql'
import SelectForm from '../organisms/SelectForm'
import FreeForm from '../organisms/FreeForm'
import WordForm from '../organisms/WordForm'
import PhotoForm from '../organisms/PhotoForm'
import { ApolloQueryResult, useMutation } from '@apollo/client'
import { CREATE_ANSWER } from '../../types/gqls'
import { useLocation } from 'react-router-dom'
import { useToast } from '@chakra-ui/react'
import { sendErrorToast } from '../../utilities/items'

interface Props {
    question: Question
    currentUser?: User
    refetch: <TData, TVariables>(variables?: Partial<TVariables>) => Promise<ApolloQueryResult<TData>>
}

const AnswerField: FC<Props> = ({ question, currentUser, refetch}) => {
    const [newAnswer, { error, loading }] = useMutation(CREATE_ANSWER)
    const [answered, setAnswered] = useState<boolean>(true)
    const { pathname } = useLocation()
    const qId = pathname.replace("/question/", "")
    const answerToast = useToast()

    useEffect(() => {
        if (question) setAnswered(question.answered!)
    }, [question, setAnswered, refetch])

    if (loading) {
        return <>Loaing</>
    }

    if (error) {
        return <>{error}</>
    }

    const handleToast = () => {
        if (question.textAfterAnswered && question.textAfterAnswered !== "") {
            answerToast({
                position: 'top',
                title: "出題者からのメッセージ",
                description: question.textAfterAnswered,
                status: 'info',
                isClosable: true,
            })
        }
    }

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
                handleToast()
                refetch<any, {id: string, userId: string}>({ id: qId, userId: currentUser.id })
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
                handleToast()
                refetch<any, {id: string, userId: string}>({ id: qId, userId: currentUser.id })
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
            return <FreeForm question={question} handleSubmit={handleSendForm} answered={answered} isLogin={currentUser !== null}/>
        case AnswerType.Select:
            return <SelectForm question={question} handleSubmit={handleSendChoice} answered={answered} isLogin={currentUser !== null}/>
        case AnswerType.Word:
            return <WordForm question={question} handleSubmit={handleSendForm} answered={answered} isLogin={currentUser !== null}/>
        case AnswerType.Photo:
            return <PhotoForm question={question} handleSubmit={handleSendPhoto} answered={answered} isLogin={currentUser !== null}/>
        default:
            return <></>
    }
}

export default AnswerField;