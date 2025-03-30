import axiosClient from '@/libs/axiosClient';
import {
    Modal,
    ModalContent,
    ModalBody,
    ModalCloseButton,
} from '@chakra-ui/react'
import { ChakraProvider } from '@chakra-ui/react'
import { useRef, useState } from 'react';
import ReCAPTCHA from 'react-google-recaptcha';
import { FaChevronRight } from 'react-icons/fa';
function ModalReport({isOpen, onClose, name, chapter, id}: {isOpen: boolean, onClose: () => void, name: string, chapter: string, id: number}) {
    const recaptchaRef = useRef<any>(null);
    const [message, setMessage] = useState('');
    const handleReport = async (e: any) => {
        e.preventDefault();
        
        if(!message) {
            alert('Vui lòng điền nội dung báo cáo');
            return;
        }

       
            alert("Báo cáo thành công");
            setMessage('');
            onClose();
        
    }
    return (  
        <ChakraProvider>
            <Modal isCentered isOpen={isOpen} onClose={onClose}>
                <ModalContent maxWidth={`500px`} backgroundColor="#182335" color={'white'} display={`flex`} flexDirection={`column`} borderRadius={`.5rem`} padding={`1rem`}>
                    <ModalBody>
                        <ModalCloseButton />
                        <h5 className='text-white text-[1.25rem]'>Báo cáo</h5>
                        <div className="mt-2 text-sm">
                            <div className='text-mediumGray'>
                                <b className='capitalize'>{name}</b>
                            </div>
                            <div className='text-[#3c8bc6] capitalize'>{chapter}</div>
                        </div>
                        <form onSubmit={handleReport}>
                            <div className='mt-4 mb-2'>
                                <textarea value={message} onChange={(e) => setMessage(e.target.value)} name="messgae" className="block w-full py-[.475rem] px-[.75rem] text-[1rem] font-normal leading-[1.5] text-white bg-[#141d2c] rounded-[.5rem] transition-all" rows={3} placeholder='Nhập nội dung'></textarea>
                            </div>
                            
                            <button type='submit' className='mt-4 w-full py-[.475rem] leading-[1.5] rounded-lg text-white bg-[#3c8bc6] text-center hover:bg-[#5a9dcf] transition-all flex gap-2 justify-center items-center'>
                                Gửi báo cáo
                                <FaChevronRight />
                            </button>
                        </form>
                    </ModalBody>
                </ModalContent>
            </Modal>
        </ChakraProvider>
    );
}

export default ModalReport;