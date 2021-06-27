import { FC } from 'react'
import { Choice, Question } from '../../generated/graphql'
import { Heading } from '@chakra-ui/react'
import ChoiceItem from '../molecules/ChoiceItem'

interface Props {
    question: Question
    handleSubmit: (choice: Choice) => void
    answered: boolean
    isLogin: boolean
}

const SelectForm: FC<Props> = ({ question, handleSubmit, answered, isLogin }) => {
    return (
        <>
            {
                question.choices &&
                <>
                    <Heading as={"h3"} fontWeight={"black"} p={4}>Choices.</Heading>
                    {
                        question.choices?.map((choice: Choice, index: number) => {
                            return <ChoiceItem choice={choice} answerCount={question.answerCount} answered={answered || !isLogin} key={choice.content+index} handleSendAnswer={handleSubmit} />
                        })
                    }
                    <hr />
                </>
            }
        </>
    )
}

export default SelectForm;