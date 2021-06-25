import { InputType, validator } from '../../utilities/validations'
import { Box, Flex, Input, Text, Tooltip, useBoolean } from '@chakra-ui/react'
import React, { FC } from 'react'
import { CheckCircleIcon, WarningTwoIcon } from '@chakra-ui/icons'

interface Props {
    type: InputType
    fieldName: string
    placeHolder: string
    defaultValue?: any
    onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void
}

const validationText = (type: InputType): string => {
    switch (type) {
        case InputType.email:
            return "ヒント: メールアドレスのフォーマットは正しいですか？"
        case InputType.password:
            return "ヒント: パスワードは8文字以上です"
        default:
            return "okasiiyo"
    }
}

const InputWithValidation: FC<Props> = ({ type, fieldName, placeHolder = "", defaultValue, onChange }) => {
    const [flag, setFlag] = useBoolean(false)
    return (
        <Box p={2}>
            <Flex py={1}>
                <Text
                    ml={0}
                    fontSize={"sm"}
                >{fieldName}</Text>
                {
                    flag ?
                        <Tooltip label={validationText(type)}>
                            <Flex
                                mx={1}
                                flexDirection={'column'}
                                justify={'center'}
                            ><WarningTwoIcon color={"red.500"} /></Flex>
                        </Tooltip>
                    :
                        <Flex
                            mx={1}
                            flexDirection={'column'}
                            justify={'center'}
                        ><CheckCircleIcon color={"green.500"} /></Flex>
                }
            </Flex>
            <Input
                autoComplete={"on"}
                defaultValue={defaultValue!}
                placeholder={placeHolder}
                onChange={(e) => {
                    !validator(e.target.value.trim(), type) ? setFlag.on() : setFlag.off()
                    if (onChange) onChange(e)
                }}
            />
        </Box>
    )
}

export default InputWithValidation;