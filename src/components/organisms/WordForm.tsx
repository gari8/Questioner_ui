import { FC, useState } from 'react'
import { Question } from '../../generated/graphql'
import BalloonModal from '../molecules/BalloonModal'
import InputWithValidation from '../atoms/InputWithValidation'
import { InputType } from '../../utilities/validations'

interface Props {
    question: Question
    handleSubmit: (value: string) => void
    answered: boolean
    isLogin: boolean
}

const WordForm: FC<Props> = ({ question, handleSubmit, answered, isLogin }) => {
    const [value, setValue] = useState<string>("")
    return (
        <>
            <BalloonModal title={"回答欄"} onSend={() => handleSubmit(value)} answered={answered} isLogin={isLogin} question={question}>
                <InputWithValidation fieldName={""} placeHolder={"ヒトコト回答"} type={InputType.shortText} onChange={(e) => setValue(e.target.value)}/>
            </BalloonModal>
        </>
    )
}

export default WordForm;