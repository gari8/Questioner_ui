import React, {FC, useState} from "react";
import {DisclosureInterface} from "../../types";
import {
	Box,
	Button, CloseButton, Flex,
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
	Stack, Table, Tbody, Td,
	Text,
	Textarea, Th, Thead, Tr, useToast
} from "@chakra-ui/react";
import {AddIcon} from "@chakra-ui/icons";
import {sendErrorToast} from "../../utilities/items";

interface Props {
	disclosure: DisclosureInterface
}

const answerType = {
	Free: "free",
	Word: "word",
	Select: "select",
	Photo: "photo"
}

interface QuestionInterface {
	title: string
	content: string
}

const NewQuestionModal: FC<Props> = ({ disclosure }) => {
	const [questionForm, setQuestionForm] = useState<QuestionInterface>({title: '', content: ''})
	const [radioValue, setRadioValue] = useState<string>("free")
	const [inputFields, setInputFields] = useState<{index: number, value: string}[]>([])
	const [currentInput, setCurrentInput] = useState<string>("")
	const questionToast = useToast()

	const handleFieldAdd = () => {
		if (currentInput === "") return
		inputFields.push({index: inputFields.length, value: currentInput})
		setInputFields(inputFields)
		setCurrentInput("")
	}

	const handleFieldRemove = (e: React.MouseEvent<HTMLButtonElement>, idx: number) => {
		const _inputFields = inputFields.filter(({index}: {index: number, value: string}) => {
			return index !== idx
		})
		const __inputFields = _inputFields.map((val, index) => {
			val.index = index
			return val
		})
		setInputFields(__inputFields)
	}

	const handleSubmit = () => {
		// select && inputFieldsが0の時送信できない
		if (radioValue === answerType.Select && inputFields.length === 0) {
			const _sendErrorToast = sendErrorToast
			_sendErrorToast.description = "選択肢を1つ以上追加してください"
			questionToast(_sendErrorToast)
			return
		}
		if (questionForm.title === "" || questionForm.content === "") {
			const _sendErrorToast = sendErrorToast
			_sendErrorToast.description = "タイトルと質問を入力してください"
			questionToast(_sendErrorToast)
			return
		}
		// OK
		const payload = {
			title: questionForm.title,
			content: questionForm.content,
			answerType: radioValue,
			choices: inputFields
		}
		console.log(payload)
	}

	const handleReset = () => {
		setQuestionForm({title: "", content: ""})
		setInputFields([])
		setCurrentInput("")
		setRadioValue("free")
		disclosure.onClose()
	}

	return (
		<Modal scrollBehavior={"outside"} closeOnOverlayClick={false} size={"2xl"} isOpen={disclosure.isOpen} onClose={handleReset} >
			<ModalOverlay />
			<ModalContent>
				<ModalHeader>質問の作成</ModalHeader>
				<ModalCloseButton />
				<ModalBody pb={6}>
					<Text mx={3} mt={2} >タイトル</Text>
					<Input type={"text"} w={1/3} mx={2} my={1} onChange={(e) => {
						const _questionForm = questionForm
						_questionForm.title = e.target.value
						setQuestionForm(_questionForm)
					}}/>
					<Text mx={3} mt={2} >質問</Text>
					<Textarea ml={2} my={1} w={"97%"} onChange={(e) => {
						const _questionForm = questionForm
						_questionForm.content = e.target.value
						setQuestionForm(_questionForm)
					}}/>
					<Text mx={3} mt={2} >回答方法</Text>
					<RadioGroup onChange={setRadioValue} value={radioValue} m={2} mb={6}>
						<Stack direction="row">
							<Radio value={answerType.Free}>自由回答</Radio>
							<Radio value={answerType.Select}>選択回答</Radio>
							<Radio value={answerType.Word}>ヒトコト回答</Radio>
							<Radio value={answerType.Photo}>写真で回答</Radio>
						</Stack>
					</RadioGroup>
					{/* select */}
					{
						radioValue === answerType.Select &&
                        <>
                            <Text mx={3} mt={2} >選択肢</Text>
	                        <Box m={4}>
                                <Table variant="simple">
                                    <Thead>
                                        <Tr>
                                            <Th>No.</Th>
                                            <Th>選択肢</Th>
                                            <Th> </Th>
                                        </Tr>
                                    </Thead>
                                    <Tbody>
				                        {
					                        inputFields && inputFields.length > 0 ? inputFields.map(({index, value}: {index: number, value: string}) => {
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
							                        <Td color={"gray.400"} fontSize={"lg"} >No content</Td>
							                        <Td> </Td>
							                        <Td> </Td>
						                        </Tr>
				                        }
                                    </Tbody>
                                </Table>
		                        <Flex m={3} mt={10}>
			                        <Input type={"text"} w={3/4} value={currentInput} onChange={(e) => setCurrentInput(e.target.value)}/>
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
					<Button colorScheme="blue" mr={3} onClick={handleSubmit}>
						作成
					</Button>
					<Button onClick={handleReset}>戻る</Button>
				</ModalFooter>
			</ModalContent>
		</Modal>
	)
}

export default NewQuestionModal;