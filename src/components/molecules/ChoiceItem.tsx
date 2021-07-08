import { Button, Flex, Progress, Text } from '@chakra-ui/react'
import { FC } from 'react'
import { Choice } from '../../generated/graphql'

interface Props {
    choice: Choice
    answered: boolean
    handleSendAnswer: (choice: Choice) => void
    answerCount: number
}

const ChoiceItem: FC<Props> = ({ choice, answered, handleSendAnswer, answerCount }) => {
    const percentage = Math.round((choice.value / answerCount) * 100 * 100) / 100
    return (
        <>
            <Flex my={4} mx={[5, 7, 10, 20]} justify={'space-between'} flexDirection={['column', 'row']} >
                <Button
                    disabled={answered}
                    minW={[10, 50, 140]}
                    fontSize={['sm', 'md']}
                    wordBreak={'break-word'}
                    _focus={{ outline: 0 }}
                    onClick={() => handleSendAnswer(choice)}
                >
                    {choice.content}
                </Button>
                {
                    answered ?
                        <Flex my={[6, 0]} justify={['flex-end', 'space-between']}>
                            <Flex flexDirection={'column'} justify={'center'} transition={'all .5s'} mx={2}>
                                <Text fontSize={'lg'} fontWeight={'black'}>{percentage}%</Text>
                            </Flex>
                            <Flex flexDirection={'column'} justify={'center'} transition={'all .5s'}>
                                <Progress w={['200px', '300px', '500px']} colorScheme={'green'} size={'lg'} value={percentage} hasStripe />
                            </Flex>
                        </Flex>
                        :
                        <></>
                }
            </Flex>
        </>
    )
}

export default ChoiceItem