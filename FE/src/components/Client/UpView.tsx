"use client"
import axios from "axios";
import { useEffect, useState } from "react";

function UpView({id, type}: {id: number, type: string}) {
    const [success, setSuccess] = useState(false);
    useEffect(() => {
        axios.get(`/baseapi/comics/upView/${id}/${type}`).then(() => {
            setSuccess(true);
        }
        ).catch(() => {
        });
    }, [id, type]);
    return success;
}

export default UpView;