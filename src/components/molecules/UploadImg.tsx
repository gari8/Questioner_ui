import React, { FC, useState } from 'react'
import { Avatar, CloseButton, Flex, Input, Text } from '@chakra-ui/react'

interface Props {
    src: string
    setFile: (file: File) => void
    accept?: string
    alt?: string
    hideText?: boolean
}

const UploadImg: FC<Props> = ({ src, setFile, accept = 'image/*', alt = '', hideText = false }) => {
    const [blobURL, setBlobURL] = useState<string>('')
    const createBlob = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (!e.target.files) return
        const file = e.target.files[0]
        setFile(file)
        if (file) {
            setBlobURL(window.URL.createObjectURL(file))
        }
    }

    return (
        <Flex>
            <label htmlFor={'icon-upload'}>
                {
                    blobURL === '' ?
                        <Avatar name={alt} size={'lg'} src={src} m={2} />
                        :
                        <Avatar name={alt} size={'lg'} src={blobURL} m={2} bg={'whiteAlpha.50'} />
                }
                <Input
                    type={'file'}
                    display={'none'}
                    id={'icon-upload'}
                    onChange={createBlob}
                    accept={accept}
                />
            </label>
            <Flex flexDirection={'column'} justify={'space-between'}>
                {
                    blobURL === '' ?
                        <Text> </Text>
                        :
                        <CloseButton _focus={{ outline: 0 }} size={'sm'} onClick={() => {
                            setBlobURL('')
                            const _file = new File([], '')
                            setFile(_file)
                        }} />
                }
                {
                    !hideText &&
                    <Text mx={2} fontSize={'xs'} color={'red'}>画像をクリックして編集</Text>
                }
            </Flex>
        </Flex>
    )
}

export default UploadImg