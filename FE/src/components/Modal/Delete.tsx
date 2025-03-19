import {
    Modal,
    ModalContent,
    ModalHeader,
    ModalFooter,
    ModalBody,
    ModalCloseButton,
    Button,
} from '@chakra-ui/react'
import { ChakraProvider } from '@chakra-ui/react'
import { FaTriangleExclamation } from 'react-icons/fa6';
function ModalDelete({isOpen, onClose, message, handleDelete}: {isOpen: boolean, onClose: () => void, message: string, handleDelete: () => void}) {
    return (  
        <ChakraProvider>
            <Modal isCentered isOpen={isOpen} onClose={onClose}>
                <ModalContent backgroundColor="#2b3b4e" color={'white'}>
                    <ModalHeader>Xác Nhận xóa</ModalHeader>
                        <ModalCloseButton />
                    <ModalBody className='flex gap-2 items-center'>
                        <FaTriangleExclamation size={30} />
                        <div>{message}</div>
                    </ModalBody>
                    <ModalFooter>
                        <Button onClick={onClose}>Đóng</Button>
                        <Button bg="red" ml={2} color="white" onClick={handleDelete}>Xóa</Button>
                    </ModalFooter>
                </ModalContent>
            </Modal>
        </ChakraProvider>
    );
}

export default ModalDelete;