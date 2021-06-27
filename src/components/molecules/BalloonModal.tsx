import { FC } from 'react'
import { Box, Flex, IconButton, Text, useBoolean } from '@chakra-ui/react'
import { ChatIcon, TriangleDownIcon } from '@chakra-ui/icons'
import { IoIosSend } from 'react-icons/io';
interface Props {
    title: string
    onSend: () => void
    answered: boolean
    isLogin: boolean
}

const BalloonModal: FC<Props> = ({ title, onSend, answered, children, isLogin }) => {
    const [flag, setFlag] = useBoolean(false)
    return (
        <Flex position={'fixed'} bottom={180} right={8} w={"60%"} justify={'space-between'}>
            <Flex flexDirection={'column'} justify={'flex-end'} w={"90%"}>
                {
                    flag &&
                    <Box w={'full'} borderRadius={"10px"} bg={'gray.200'} p={4}>
                        <Text fontSize={'lg'} w={'full'} px={2} mb={2} borderRadius={"2px"} fontWeight={'bold'}>{isLogin ? (answered ? "自分の回答" : title) : "ログインしてください"}</Text>
                        <Box overflow={'scroll'} maxH={"400px"} >
                            <Flex flexDirection={'column'} justify={'flex-end'} w={'full'} p={1}>
                                {
                                    isLogin ?
                                        <>
                                            {
                                                answered ?
                                                    <Text wordBreak={'break-word'} px={2}>
                                                        すごいです
                                                    </Text>
                                                    : children
                                            }
                                        </>
                                        :
                                        <>
                                            <Text wordBreak={'break-word'} px={2}>
                                                この回答形式ではログインユーザーのみが回答できます
                                            </Text>
                                        </>
                                }
                            </Flex>
                        </Box>
                    </Box>
                }
            </Flex>
            <Flex flexDirection={'column'} justify={'flex-end'}>
                {
                    flag ?
                        <>
                            {
                                answered || !isLogin ?
                                    <></>
                                    :
                                    <IconButton
                                        icon={<IoIosSend />}
                                        aria-label={"Add Chat"}
                                        size={'lg'}
                                        mb={4}
                                        colorScheme={'blue'}
                                        borderRadius={'full'}
                                        _focus={{ outline: 'none' }}
                                        onClick={() => {
                                            onSend()
                                            setFlag.toggle()
                                        }}
                                    />
                            }
                            <IconButton
                                icon={<TriangleDownIcon />}
                                aria-label={"Add Chat"}
                                size={'lg'}
                                colorScheme={'red'}
                                borderRadius={'full'}
                                _focus={{ outline: 'none' }}
                                onClick={() => setFlag.toggle()}
                            />
                        </>
                    :
                        <IconButton
                            icon={<ChatIcon />}
                            aria-label={"Add Chat"}
                            size={'lg'}
                            colorScheme={'blue'}
                            borderRadius={'full'}
                            _focus={{ outline: 'none' }}
                            onClick={() => setFlag.toggle()}
                        />
                }
            </Flex>
        </Flex>
    )
}

export default BalloonModal;