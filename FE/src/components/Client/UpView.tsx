"use client"
import axiosClient from "@/libs/axiosClient";
import axios from "axios";
import { useEffect, useState } from "react";

function UpView({id, type}: {id: number, type: string}) {
    const [success, setSuccess] = useState(false);
    useEffect(() => {
        axiosClient.put(`/api/comics/${id}/upView`).then(() => {
            setSuccess(true);
        }).catch((error) => {
            console.error("Error fetching up view:", error);
        });
    }, [id, type]);
    return success;
}

export default UpView;