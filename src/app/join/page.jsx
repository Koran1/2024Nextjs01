'use client'
import { Avatar, Button, FormControl, Stack, TextField } from '@mui/material';
import axios from 'axios';
import { useRouter } from 'next/navigation';
import React, { useState } from 'react';

function Page() {

    const LOCAL_API_BASE_URL = process.env.NEXT_PUBLIC_LOCAL_API_BASE_URL;
    const API_url = `${LOCAL_API_BASE_URL}/members/join`

    const router = useRouter();
    const initUvo = {
        m_id: "",
        m_pw: "",
        m_name: "",
        m_age: ""

    }

    const [uvo, setUvo] = useState(initUvo);

    // 모든 입력필드가 비어 있지 않아야 true
    const isBtnChk = (!uvo.m_id || !uvo.m_pw || !uvo.m_name || !uvo.m_age);

    function changeUvo(e) {
        const { name, value } = e.target;
        setUvo(prev => ({
            ...prev, [name]: value
        }));

        // setUvo({
        //     ...uvo, [e.target.name]: e.target.value
        // });
    }
    function goServer(params) {
        console.log(uvo);
        if (confirm("회원가입하시겠습니까?")) {
            axios.post(API_url, uvo)
                .then(data => {
                    // TODO Auto-generated method stub
                    console.log(data.data.success)
                    if (data.data.success) {
                        alert(data.data.message)
                        router.push('/login');
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
    }
    function goServer2(params) {
        router.push('/login');
    }

    return (
        <div>
            <FormControl autoComplete="off">
                {/* Stack = 수직 정렬 */}
                <Stack direction='column' spacing={1} alignItems='center'>
                    <Avatar src='/img/coffee-blue.jpg' />
                    <TextField type='text' label='아이디' name='m_id' value={uvo.m_id} onChange={changeUvo} />
                    <TextField type='password' label='패스워드' name='m_pw' value={uvo.m_pw} onChange={changeUvo} />
                    <TextField type='text' label='이름' name='m_name' value={uvo.m_name} onChange={changeUvo} />
                    <TextField type='number' label='나이' name='m_age' value={uvo.m_age} onChange={changeUvo} />
                    <Button fullWidth variant='contained' disabled={isBtnChk} onClick={goServer}>JOIN</Button>
                </Stack>
            </FormControl>
        </div>
    );
}

export default Page;