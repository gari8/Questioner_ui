import { FC } from 'react'
import { Question } from '../../generated/graphql'
import BalloonModal from '../molecules/BalloonModal'
import InputWithValidation from '../atoms/InputWithValidation'
import { InputType } from '../../utilities/validations'

interface Props {
    question: Question
    handleSubmit: () => void
    answered: boolean
    isLogin: boolean
}

const WordForm: FC<Props> = ({ question, handleSubmit, answered, isLogin }) => {
    return (
        <>
            <BalloonModal title={"回答欄"} onSend={handleSubmit} answered={answered} isLogin={isLogin}>
                <InputWithValidation fieldName={""} placeHolder={"ヒトコト回答"} type={InputType.shortText} />
            </BalloonModal>
        </>
    )
}

export default WordForm;