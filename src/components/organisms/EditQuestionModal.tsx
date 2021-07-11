import React, { FC, useContext, useEffect, useState } from 'react'
import { DisclosureInterface, QuestionInterface } from '../../types'
import {
    Box,
    Button, Flex, Input,
    Modal,
    ModalBody,
    ModalCloseButton,
    ModalContent, ModalFooter,
    ModalHeader,
    ModalOverlay, Switch, Tab, TabList, TabPanel, TabPanels, Tabs, Text, Textarea,
} from '@chakra-ui/react'
import { AuthContext } from '../../contexts/Auth'
import { useLazyQuery } from '@apollo/client'
import { FIND_QUESTION } from '../../types/gqls'
import Loading from '../templates/Loading'
import Error from '../templates/Error'
import { useHistory } from 'react-router'
import { AnswerType, Choice } from '../../generated/graphql'


interface Props {
    disclosure: DisclosureInterface
}

const EditQuestionModal: FC<Props> = ({ disclosure }) => {
    const [questionForm, setQuestionForm] = useState<QuestionInterface>({
        title: '',
        content: '',
        textAfterAnswered: '',
    })
    const { currentUser } = useContext(AuthContext)
    const history = useHistory()
    const qId = history.location.pathname.replace('/question/', '')
    const [getQuestion, { loading, error, data }] = useLazyQuery(FIND_QUESTION, {
        variables: { id: qId, userId: currentUser?.id! },
    })

    const handleSubmit = () => {
        if (!currentUser || !questionForm) return
    }

    const handleReset = () => {
        setQuestionForm({ title: '', content: '', textAfterAnswered: '' })
        disclosure.onClose()
    }

    useEffect(() => {
        let isMounted = true;
        if (isMounted || disclosure.isOpen) {
            getQuestion({ variables: { id: qId, userId: currentUser?.id! } })
        }
        return () => {
            isMounted = false;
        };
    }, [qId, currentUser?.id, getQuestion, disclosure.isOpen])

    if (disclosure.isOpen && (loading || !data || !data.findQuestion)) {
        return <Loading />
    }

    if (disclosure.isOpen && error) {
        return <Error />
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
                            <Tab _focus={{ outline: 0 }}>本文</Tab>
                            <Tab _focus={{ outline: 0 }}>公開設定</Tab>
                            <Tab _focus={{ outline: 0 }} display={data.findQuestion.answerType === AnswerType.Select ? 'block' : 'none'}>選択肢</Tab>
                        </TabList>
                        <TabPanels>
                            <TabPanel>
                                <Text mt={2}>タイトル</Text>
                                <Input type={'text'} w={2 / 3} my={1} onChange={(e) => {
                                    const _questionForm = questionForm
                                    _questionForm.title = e.target.value
                                    setQuestionForm(_questionForm)
                                }} />
                                <Text mt={2}>質問内容</Text>
                                <Textarea my={1} w={'97%'} onChange={(e) => {
                                    const _questionForm = questionForm
                                    _questionForm.content = e.target.value
                                    setQuestionForm(_questionForm)
                                }} />
                                <Text mt={2}>回答後表示文</Text>
                                <Textarea my={1} w={'97%'} onChange={(e) => {
                                    const _questionForm = questionForm
                                    _questionForm.textAfterAnswered = e.target.value
                                    setQuestionForm(_questionForm)
                                }} />
                            </TabPanel>
                            <TabPanel>
                                <Box mx={3} my={4}>
                                    <Flex mt={2} justify={'start'}>
                                        <Text>回答可</Text>
                                        <Switch mx={4} size='md' defaultChecked={true} />
                                    </Flex>
                                </Box>
                                <Box mx={3} my={4}>
                                    <Flex mt={2} justify={'start'}>
                                        <Text>一般公開</Text>
                                        <Switch mx={4} size='md' defaultChecked={true} />
                                    </Flex>
                                </Box>
                            </TabPanel>
                            <TabPanel>
                                {
                                    data.findQuestion.choices &&
                                    data.findQuestion.choices.map((c: Choice, index: number) => {
                                        return <p key={c.id.toString() + index.toString()}>{c.content}</p>
                                    })
                                }
                            </TabPanel>
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