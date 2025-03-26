"use client"

function ModalForgot({ showModalForgot, setShowModalForgot }: { showModalForgot: boolean, setShowModalForgot: any }) {
    return (
        <>
            {showModalForgot && (
                <div className="fixed flex inset-0 z-50 justify-center items-center min-h-screen">
                    <div 
                        className="absolute top-0 left-0 w-full h-full z-50 bg-overlay transition-all"
                        onClick={setShowModalForgot}
                    />
                    <div className="bg-btn bg-no-repeat bg-[top_center] z-[51] pt-[30px] rounded-[20px] text-white relative flex flex-col w-full max-w-lg px-4 h-fit">
                        <div className="py-[25px] relative block">
                            <h5 className="text-center font-semibold text-[1.25rem] leading-[1.5]">Thông báo</h5>
                            <button onClick={setShowModalForgot} className="absolute -top-[15px] right-0 sm:-right-[30px] text-[#111] w-[30px] h-[30px] rounded-full bg-white z-3 text-center inline-block leading-[30px]">
                                <span>X</span>
                            </button>
                        </div>
                        <div className="text-center px-6 pb-6">
                            <p>Không thể reset mật khẩu. Vui lòng tạo tài khoản mới để sử dụng.</p>
                        </div>
                    </div>
                </div>
            )}
        </>
    );
}

export default ModalForgot;
