'use client'
import { Avatar, Button, FormControl, Stack, TextField } from '@mui/material';
import axios from 'axios';
import React, { useState } from 'react';
import useAuthStore from '../../../store/authStore';
import { useRouter } from 'next/navigation';

function Page() {

    const LOCAL_API_BASE_URL = process.env.NEXT_PUBLIC_LOCAL_API_BASE_URL;
    const API_url = `${LOCAL_API_BASE_URL}/members/login`

    const router = useRouter();
    const initUvo = {
        m_id: "",
        m_pw: ""
    }

    const [uvo, setUvo] = useState(initUvo);
    // 모든 입력필드가 비어 있지 않아야 true
    const isBtnChk = (!uvo.m_id || !uvo.m_pw);

    // zustand login 함수 가져오기
    const { login } = useAuthStore();

    function changeUvo(e) {
        const { name, value } = e.target;
        setUvo(prev => ({
            ...prev, [name]: value
        }));
    }

    function goServer(params) {
        axios.post(API_url, uvo)
            .then(data => {
                if (data.data.success) {
                    console.log(data.data)
                    alert(data.data.message)
                    login(data.data.data, data.data.jwtToken)
                    router.push('/');
                } else {
                    alert(data.data.message);
                    setUvo(initUvo)
                }
            })
            .catch(err => {
                console.log("Error : ", err)
                setUvo(initUvo)
            })

    }

    return (
        <div>
            <FormControl autoComplete="off">
                {/* Stack = 수직 정렬 */}
                <Stack direction='column' spacing={1} alignItems='center'>
                    <Avatar src='/img/coffee-blue.jpg' />
                    <TextField type='text' label='아이디' name='m_id' value={uvo.m_id} onChange={changeUvo} />
                    <TextField type='password' label='패스워드' name='m_pw' value={uvo.m_pw} onChange={changeUvo} />
                    <Button fullWidth variant='contained' disabled={isBtnChk} onClick={goServer}>LOGIN</Button>
                </Stack>
            </FormControl>
        </div>
    );
}

export default Page