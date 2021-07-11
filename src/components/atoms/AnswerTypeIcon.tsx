import { FC } from 'react'
import { AnswerType } from '../../generated/graphql'
import { Stack, Tooltip } from '@chakra-ui/react'
import { BsTextCenter } from 'react-icons/bs'
import { MdShortText } from 'react-icons/md'
import { HiOutlinePhotograph } from 'react-icons/hi'
import { TiThLargeOutline } from 'react-icons/ti'

interface Props {
    answerType: AnswerType
    size?: number
}

const AnswerTypeIcon: FC<Props> = ({ answerType, size = 28 }) => {
    return (
        <Tooltip hasArrow placement={'top'} label={`回答方法: ${answerType}`}>
            <Stack>
                {
                    answerType === AnswerType.Free &&
                    <BsTextCenter size={size} color={'black'} />
                }
                {
                    answerType === AnswerType.Select &&
                    <TiThLargeOutline size={size} />
                }
                {
                    answerType === AnswerType.Word &&
                    <MdShortText size={size} />
                }
                {
                    answerType === AnswerType.Photo &&
                    <HiOutlinePhotograph size={size} />
                }
            </Stack>
        </Tooltip>
    )
}

export default AnswerTypeIcon