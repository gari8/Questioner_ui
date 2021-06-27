import { FC } from 'react'
import { AnswerType } from '../../generated/graphql'
import { Stack, Tooltip } from '@chakra-ui/react'
import { BsTextCenter } from 'react-icons/bs'
import { MdShortText } from 'react-icons/md'
import { HiOutlinePhotograph } from 'react-icons/hi'
import { TiThLargeOutline } from 'react-icons/ti'

interface Props {
    answerType: AnswerType
}

const AnswerTypeIcon: FC<Props> = ({ answerType }) => {
    return (
        <Tooltip hasArrow placement={'top'} label={`回答方法: ${answerType}`}>
            <Stack>
                {
                    answerType === AnswerType.Free &&
                    <BsTextCenter size={28} color={'black'}/>
                }
                {
                    answerType === AnswerType.Select &&
                    <TiThLargeOutline size={28} />
                }
                {
                    answerType === AnswerType.Word &&
                    <MdShortText size={28} />
                }
                {
                    answerType === AnswerType.Photo &&
                    <HiOutlinePhotograph size={28} />
                }
            </Stack>
        </Tooltip>
    )
}

export default AnswerTypeIcon