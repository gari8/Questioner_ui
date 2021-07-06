import { FC } from 'react'
import Layer from '../atoms/Layer'
import { Flex, Spinner, Text } from '@chakra-ui/react'

const Loading: FC = () => {
    return (
        <Layer>
            <Flex justify={'center'} h={'full'}>
                <Flex flexDirection={'column'} justify={'center'} h={'full'} pb={6}>
                    <Spinner
                        thickness="6px"
                        speed="0.65s"
                        emptyColor="gray.200"
                        color="blue.500"
                        size="xl"
                        mx={'auto'}
                        mb={6}
                    />
                    <Text fontWeight={'black'} color={'gray.500'}>Loading...</Text>
                </Flex>
            </Flex>
        </Layer>
    )
}

export default Loading;