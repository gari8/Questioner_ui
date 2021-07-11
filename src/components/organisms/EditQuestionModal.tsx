import React, { FC, useContext, useState } from 'react'
import { DisclosureInterface, QuestionInterface } from '../../types'
import {
    Box,
    Button, CloseButton, Flex, Input,
    Modal,
    ModalBody,
    ModalCloseButton,
    ModalContent, ModalFooter,
    ModalHeader,
    ModalOverlay, Switch, Tab, Table, TabList, TabPanel, TabPanels, Tabs, Tbody, Td, Text, Textarea, Th, Thead, Tr,
} from '@chakra-ui/react'
import { AuthContext } from '../../contexts/Auth'
import { AnswerType, Choice, Question } from '../../generated/graphql'
import ChoiceBar from '../atoms/ChoiceBar'
import { AddIcon } from '@chakra-ui/icons'


interface Props {
    disclosure: DisclosureInterface
    update: () => void
    question: Question
}

const EditQuestionModal: FC<Props> = ({ disclosure, question, update }) => {
    const initState: QuestionInterface = {
        title: question.title,
        content: question.content ? question.content : "",
        textAfterAnswered: question.textAfterAnswered ? question.textAfterAnswered : "",
    }
    const [questionForm, setQuestionForm] = useState<QuestionInterface>(initState)
    const [inputFields, setInputFields] = useState<{ index: number, value: string }[]>([])
    const [currentInput, setCurrentInput] = useState<string>('')
    const { currentUser } = useContext(AuthContext)

    const handleSubmit = () => {
        if (!currentUser || !questionForm) return
    }

    const handleReset = () => {
        setQuestionForm(initState)
        disclosure.onClose()
    }

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

    return (
        <Modal scrollBehavior={'outside'} closeOnOverlayClick={false} size={'2xl'} isOpen={disclosure.isOpen}
               onClose={handleReset}>
            <ModalOverlay />
            <ModalContent mx={[4, 'auto']}>
                <ModalHeader>質問の編集</ModalHeader>
                <ModalCloseButton _focus={{ outline: 0 }}/>
                <ModalBody pb={6}>
                    <Tabs>
                        <TabList>
                            <Tab _focus={{ outline: 0 }} borderRadius={'5px 5px 0 0'}>本文</Tab>
                            <Tab _focus={{ outline: 0 }} borderRadius={'5px 5px 0 0'}>公開設定</Tab>
                            <Tab _focus={{ outline: 0 }} borderRadius={'5px 5px 0 0'} display={question && question.answerType === AnswerType.Select ? 'block' : 'none'}>選択肢管理</Tab>
                            <Tab _focus={{ outline: 0 }} borderRadius={'5px 5px 0 0'} display={question && question.answerType === AnswerType.Select ? 'block' : 'none'}>選択肢追加</Tab>
                        </TabList>
                        <TabPanels>
                            <TabPanel>
                                <Text mt={2}>タイトル</Text>
                                <Input type={'text'} w={2 / 3} my={1} defaultValue={questionForm.title} onChange={(e) => {
                                    const _questionForm = questionForm
                                    _questionForm.title = e.target.value
                                    setQuestionForm(_questionForm)
                                }} />
                                <Text mt={2}>質問内容</Text>
                                <Textarea my={1} w={'97%'} defaultValue={questionForm.content} onChange={(e) => {
                                    const _questionForm = questionForm
                                    _questionForm.content = e.target.value
                                    setQuestionForm(_questionForm)
                                }} />
                                <Text mt={2}>回答後表示文</Text>
                                <Textarea my={1} w={'97%'} defaultValue={questionForm.textAfterAnswered} onChange={(e) => {
                                    const _questionForm = questionForm
                                    _questionForm.textAfterAnswered = e.target.value
                                    setQuestionForm(_questionForm)
                                }} />
                            </TabPanel>
                            <TabPanel>
                                <Box mx={3} my={4}>
                                    <Flex mt={2} justify={'start'}>
                                        <Text>回答可</Text>
                                        <Switch mx={4} size='md' defaultChecked={question.enabled} />
                                    </Flex>
                                </Box>
                                <Box mx={3} my={4}>
                                    <Flex mt={2} justify={'start'}>
                                        <Text>一般公開</Text>
                                        <Switch mx={4} size='md' defaultChecked={question.published} />
                                    </Flex>
                                </Box>
                            </TabPanel>
                            {
                                question.answerType === AnswerType.Select &&
                                <TabPanel>
                                    {
                                        question.choices &&
                                        question.choices.map((c: Choice, index: number) => {
                                            return <ChoiceBar choice={c} key={c.id.toString() + index.toString()} update={update} />
                                        })
                                    }
                                </TabPanel>
                            }
                            {
                                question.answerType === AnswerType.Select &&
                                <TabPanel>
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
                                </TabPanel>
                            }
                        </TabPanels>
                    </Tabs>
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

export default EditQuestionModal;