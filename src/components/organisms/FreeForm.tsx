import { FC, useState } from 'react'
import { Question } from '../../generated/graphql'
import { Textarea } from '@chakra-ui/react'
import BalloonModal from '../molecules/BalloonModal'

interface Props {
    question: Question
    handleSubmit: (value: string) => void
    answered: boolean
    isLogin: boolean
}

const FreeForm: FC<Props> = ({ question, handleSubmit, answered, isLogin }) => {
    const [value, setValue] = useState<string>('')
    return (
        <>
            <BalloonModal title={'回答欄'} onSend={() => handleSubmit(value)} answered={answered} isLogin={isLogin}
                          question={question}>
                <Textarea w={'100%'} h={100} bg={'white'} onChange={(e) => setValue(e.target.value)} />
            </BalloonModal>
        </>
    )
}

export default FreeForm