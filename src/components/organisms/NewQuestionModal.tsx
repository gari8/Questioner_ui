import React, { FC, useContext, useState } from 'react'
import { DisclosureInterface, QuestionInterface } from '../../types'
import {
    Box,
    Button,
    CloseButton,
    Flex,
    Input,
    Modal,
    ModalBody,
    ModalCloseButton,
    ModalContent,
    ModalFooter,
    ModalHeader,
    ModalOverlay,
    Radio,
    RadioGroup,
    Switch,
    Table,
    Tbody,
    Td,
    Text,
    Textarea,
    Th,
    Thead,
    Tr,
    useToast,
} from '@chakra-ui/react'
import { AddIcon } from '@chakra-ui/icons'
import { sendErrorToast } from '../../utilities/items'
import { useMutation } from '@apollo/client'
import { CREATE_QUESTION } from '../../types/gqls'
import { AnswerType, ChoiceInput, NewQuestion } from '../../generated/graphql'
import { AuthContext } from '../../contexts/Auth'
import { useHistory } from 'react-router'

interface Props {
    disclosure: DisclosureInterface
}

export const answerType = {
    Free: AnswerType.Free,
    Word: AnswerType.Word,
    Select: AnswerType.Select,
    Photo: AnswerType.Photo,
}

const NewQuestionModal: FC<Props> = ({ disclosure }) => {
    const [questionForm, setQuestionForm] = useState<QuestionInterface>({
        title: '',
        content: '',
        textAfterAnswered: '',
    })
    const [radioValue, setRadioValue] = useState<AnswerType>(AnswerType.Free)
    const [inputFields, setInputFields] = useState<{ index: number, value: string }[]>([])
    const [currentInput, setCurrentInput] = useState<string>('')
    const questionToast = useToast()
    const { currentUser } = useContext(AuthContext)
    const [createQuestion] = useMutation(CREATE_QUESTION)
    const history = useHistory()

    const handleFieldAdd = () => {
        if (currentInput === '') return
        inputFields.push({ index: inputFields.length, value: currentInput })
        setInputFields(inputFields)
        setCurrentInput('')
    }

    const handleFieldRemove = (e: React.MouseEvent<HTMLButtonElement>, idx: number) => {
        const _inputFields = inputFields.filter(({ index }: { index: number, value: string }) => {
            return index !== idx
        })
        const __inputFields = _inputFields.map((val, index) => {
            val.index = index
            return val
        })
        setInputFields(__inputFields)
    }

    const createList = (kvl: { index: number, value: string }[]): ChoiceInput[] => {
        return kvl ? kvl.map(v => {
            return { content: v.value }
        }) : []
    }

    const handleSubmit = () => {
        if (!currentUser) return
        // select && inputFieldsが0の時送信できない
        if (radioValue === answerType.Select && inputFields.length === 0) {
            const _sendErrorToast = sendErrorToast
            _sendErrorToast.description = '選択肢を1つ以上追加してください'
            questionToast(_sendErrorToast)
            return
        }
        if (questionForm.title === '' || questionForm.content === '') {
            const _sendErrorToast = sendErrorToast
            _sendErrorToast.description = 'タイトルと質問を入力してください'
            questionToast(_sendErrorToast)
            return
        }
        // OK
        const payload: NewQuestion = {
            userId: currentUser?.id!,
            title: questionForm.title,
            content: questionForm.content,
            textAfterAnswered: questionForm.textAfterAnswered,
            answerType: radioValue,
            choices: radioValue === AnswerType.Select ? createList(inputFields) : null,
            enabled: true, published: true,
        }
        createQuestion({ variables: { input: payload } }).then(r => {
            history.push('/question/' + r.data.createQuestion.id!)
        }).catch(() => {
            questionToast(sendErrorToast)
        }).finally(() => disclosure.onClose())
    }

    const handleReset = () => {
        setQuestionForm({ title: '', content: '', textAfterAnswered: '' })
        setInputFields([])
        setCurrentInput('')
        setRadioValue(AnswerType.Free)
        disclosure.onClose()
    }

    return (
        <Modal scrollBehavior={'outside'} closeOnOverlayClick={false} size={'2xl'} isOpen={disclosure.isOpen}
               onClose={handleReset}>
            <ModalOverlay />
            <ModalContent mx={[4, 'auto']}>
                <ModalHeader>質問の作成</ModalHeader>
                <ModalCloseButton _focus={{ outline: 0 }}/>
                <ModalBody pb={6}>
                    <Text mx={3} mt={2}>タイトル</Text>
                    <Input type={'text'} w={2 / 3} mx={2} my={1} onChange={(e) => {
                        const _questionForm = questionForm
                        _questionForm.title = e.target.value
                        setQuestionForm(_questionForm)
                    }} />
                    <Text mx={3} mt={2}>質問内容</Text>
                    <Textarea ml={2} my={1} w={'97%'} onChange={(e) => {
                        const _questionForm = questionForm
                        _questionForm.content = e.target.value
                        setQuestionForm(_questionForm)
                    }} />
                    <Text mx={3} mt={2}>公開設定</Text>
                    <Flex ml={2} mb={3}>
                        <Box mx={3} mt={2}>
                            <Text fontSize={'sm'}>回答可</Text>
                            <Flex mt={2} justify={'center'}>
                                <Switch size='md' defaultChecked={true} />
                            </Flex>
                        </Box>
                        <Box mx={3} mt={2}>
                            <Text fontSize={'sm'}>一般公開</Text>
                            <Flex mt={2} justify={'center'}>
                                <Switch size='md' defaultChecked={true} />
                            </Flex>
                        </Box>
                    </Flex>
                    <Text mx={3} mt={2}>回答後表示文</Text>
                    <Textarea ml={2} my={1} w={'97%'} onChange={(e) => {
                        const _questionForm = questionForm
                        _questionForm.textAfterAnswered = e.target.value
                        setQuestionForm(_questionForm)
                    }} />
                    <Text mx={3} mt={2}>回答方法</Text>
                    <RadioGroup onChange={(e) => setRadioValue(e as AnswerType)} value={radioValue} m={2} mb={6}>
                        <Flex justify={['space-around', 'normal']} ml={[0, 4]} mt={[0, 4]}>
                            <Flex flexDirection={['column', 'row']}>
                                <Radio mx={1} value={answerType.Free}>自由回答</Radio>
                                <Radio mx={1} value={answerType.Select}>選択回答</Radio>
                            </Flex>
                            <Flex flexDirection={['column', 'row']}>
                                <Radio mx={1} value={answerType.Word}>ヒトコト回答</Radio>
                                <Radio mx={1} value={answerType.Photo}>写真で回答</Radio>
                            </Flex>
                        </Flex>
                    </RadioGroup>
                    {/* select */}
                    {
                        radioValue === answerType.Select &&
                        <>
                            <Text mx={3} mt={2}>選択肢</Text>
                            <Box m={[1, 4]}>
                                <Table variant='simple'>
                                    <Thead>
                                        <Tr>
                                            <Th>No.</Th>
                                            <Th>選択肢</Th>
                                            <Th> </Th>
                                        </Tr>
                                    </Thead>
                                    <Tbody>
                                        {
                                            inputFields && inputFields.length > 0 ? inputFields.map(({
                                                                                                         index,
                                                                                                         value,
                                                                                                     }: { index: number, value: string }) => {
                                                    return <Tr key={index.toString()}>
                                                        <Td>{index}</Td>
                                                        <Td>{value}</Td>
                                                        <Td>
                                                            <CloseButton
                                                                _focus={{ outline: 0 }}
                                                                onClick={(e) => handleFieldRemove(e, index)}
                                                            />
                                                        </Td>
                                                    </Tr>
                                                })
                                                :
                                                <Tr>
                                                    <Td color={'gray.400'} fontSize={'lg'}>No content</Td>
                                                    <Td> </Td>
                                                    <Td> </Td>
                                                </Tr>
                                        }
                                    </Tbody>
                                </Table>
                                <Flex m={3} mt={10}>
                                    <Input type={'text'} w={3 / 4} value={currentInput}
                                           onChange={(e) => setCurrentInput(e.target.value)} />
                                    <Button
                                        mx={2}
                                        _focus={{ outline: 0 }}
                                        onClick={handleFieldAdd}
                                    ><AddIcon /></Button>
                                </Flex>
                            </Box>
                        </>
                    }
                </ModalBody>
                <ModalFooter>
                    <Button colorScheme='blue' mr={3} onClick={handleSubmit}>
                        保存
                    </Button>
                    <Button onClick={handleReset}>戻る</Button>
                </ModalFooter>
            </ModalContent>
        </Modal>
    )
}

export default NewQuestionModal