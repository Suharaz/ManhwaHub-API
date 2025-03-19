import { Editor } from "@tinymce/tinymce-react";

function EditorCustom({content, setContent, edit = false, handleClose, handleSubmit}: {content: string, setContent: any, edit?: boolean, handleClose?: () => void, handleSubmit: () => void}) {

    return (  
        <>
        <Editor
            tinymceScriptSrc='/assets/js/tinymce.min.js'
            value={content}
            onChange={(event, editor) => {
                setContent(editor.getContent());
            }}
            init={{
                force_br_newlines: !0,
                force_p_newlines: !1,
                entity_encoding: "raw",
                height: 200,
                paste_as_text: !0,
                menubar: false,
                statusbar: false,
                autoresize_min_height: 100,
                autoresize_max_height: 300,
                autoresize_bottom_margin: 0,
                plugins: ["autoresize", "emobabysoldier, emoonion, emobafu, emothobua, emothotuzki, emoyoyo, emopanda, emotrollface, emogif"],
                toolbar: "emotrollface emoonion emobafu emothobua emothotuzki emoyoyo emopanda emobabysoldier emogif",
            }}
        />
        {edit ? <div className="flex mt-2 gap-2">
        <button onClick={handleClose} className="border-2 mt-2 border-[#EDEDED] rounded-lg bg-[#EDEDED] text-mediumGray font-semibold py-[5px] px-[20px] text-[16px]">
            Đóng
        </button>
        <button onClick={handleSubmit} className='border-2 mt-2 border-[#00C3FF] rounded-lg bg-[#00C3FF] text-white font-semibold py-[5px] px-[20px] text-[16px]'>
            Sửa
        </button>
        </div>
        : <button onClick={handleSubmit} className='border-2 mt-2 border-[#00C3FF] rounded-lg bg-[#00C3FF] text-white font-semibold py-[5px] px-[20px] text-[16px]'>
            Bình luận
        </button>}
        </>
    );
}

export default EditorCustom;