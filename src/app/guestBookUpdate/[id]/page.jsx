'use client'
import { Button, FormControl, Paper, Stack, Table, TableBody, TableCell, TableContainer, TableRow, TextareaAutosize, TextField } from '@mui/material';
import axios from 'axios';
import React, { useEffect, useState } from 'react';
import useAuthStore from '../../../../store/authStore';
import { useRouter } from 'next/navigation';

function Page({ params }) {
    const LOCAL_API_BASE_URL = process.env.NEXT_PUBLIC_LOCAL_API_BASE_URL;
    const initDatas = {
        gb_name: "",
        gb_subject: "",
        gb_content: "",
        gb_email: ""
    }
    const [onelist, setOneList] = useState(initDatas);
    const [gbvo, setGbvo] = useState(initDatas);

    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const router = useRouter();

    const { token, isAuthenticated } = useAuthStore();             // 로그인 상태

    const isEmptyChk = (!gbvo.gb_name || !gbvo.gb_subject || !gbvo.gb_content || !gbvo.gb_email);
    const isBtnChk = (JSON.stringify(gbvo) === JSON.stringify(onelist));

    useEffect(() => {
        const setConnection = async () => {
            try {
                setLoading(true);
                const { id } = await Promise.resolve(params);

                const API_url = `${LOCAL_API_BASE_URL}/guestbook/detail/${id}`
                const response = await axios.get(API_url);

                if (response.data.success) {
                    setOneList(response.data.data)
                    setGbvo(response.data.data)
                } else {
                    setError('Failed to fetch data')
                }
            } catch (error) {
                console.error('Error : ', error);
                setError('Failed')
            } finally {
                setLoading(false)
            }
        }
        setConnection();
    }, [params, LOCAL_API_BASE_URL])

    if (loading) {
        return <div style={{ textAlign: 'center', padding: '20px' }}>Loading...</div>
    }

    if (error) {
        return (
            <div style={{ textAlign: 'center', padding: '20px', color: 'red' }}>
                <h2>Error</h2>
                <p>{error}</p>
            </div>
        )
    }

    function changeGbvo(e) {
        const { name, value } = e.target;
        setGbvo(prev => ({
            ...prev, [name]: value
        }));
    }

    function resetUpdate() {
        setGbvo(onelist)
    }

    const handleUpdate = async () => {
        const { id } = await Promise.resolve(params);
        const API_url = `${LOCAL_API_BASE_URL}/guestbook/update/${id}`

        try {
            const response = await axios.put(API_url, gbvo, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            })
            if (response.data.success) {
                alert(response.data.message)
                router.push(`/guestBookDetail/${id}`)
            } else {
                alert(response.data.message)
                resetUpdate();
            }
        } catch (error) {
            console.log("Error :", error);
            resetUpdate();
        }

    }
    return (

        <>
            <TableContainer component={Paper} className="table-container">
                <Table className="custom-table">
                    <TableBody>
                        <TableRow>
                            <TableCell className="table-header">이름</TableCell>
                            <TableCell className="table-header">
                                <TextField type='text' name='gb_name' value={gbvo.gb_name} onChange={changeGbvo} />
                            </TableCell>
                        </TableRow>
                        <TableRow>
                            <TableCell className="table-header">제목</TableCell>
                            <TableCell className="table-header">
                                <TextField type='text' name='gb_subject' value={gbvo.gb_subject} onChange={changeGbvo} />
                            </TableCell>
                        </TableRow>
                        <TableRow>
                            <TableCell className="table-header">내용</TableCell>
                            <TableCell className="table-header">
                                <TextField type='text' name='gb_content' multiline sx={{ width: '300px' }} rows={4}
                                    value={gbvo.gb_content} onChange={changeGbvo} />
                            </TableCell>
                        </TableRow>
                        <TableRow>
                            <TableCell className="table-header">email</TableCell>
                            <TableCell className="table-header">
                                <TextField type='text' name='gb_email' value={gbvo.gb_email} onChange={changeGbvo} />
                            </TableCell>
                        </TableRow>

                    </TableBody>
                </Table>
            </TableContainer>

            <div style={{ margin: "20px", textAlign: "center" }}>
                <Button variant='contained' color='primary'
                    disabled={isBtnChk || isEmptyChk || !isAuthenticated}
                    onClick={handleUpdate}>수정</Button>
                <Button variant='contained' color='error'
                    disabled={isBtnChk} onClick={() => {
                        if (confirm("정말 취소하시겠습니까?")) {
                            resetUpdate()
                        }
                    }}>취소</Button>
            </div >
        </>
    );
}

export default Page;