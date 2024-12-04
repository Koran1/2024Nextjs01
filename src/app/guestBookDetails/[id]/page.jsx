'use client'

import { Button, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from '@mui/material';
import axios from 'axios';
import React, { useEffect, useState } from 'react';
import './guestBookList.css'
import useAuthStore from '../../../../store/authStore';
import { useRouter } from 'next/navigation';


function Page({ params }) {
    const LOCAL_API_BASE_URL = process.env.NEXT_PUBLIC_LOCAL_API_BASE_URL;
    const [onelist, setOneList] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const router = useRouter();

    const { token, isAuthenticated } = useAuthStore();             // 로그인 상태

    useEffect(() => {
        const setConnection = async () => {
            try {
                setLoading(true);
                const param = await Promise.resolve(params);
                const id = param.id;

                const API_url = `${LOCAL_API_BASE_URL}/guestbook/detail/${id}`
                const response = await axios.get(API_url);
                if (response.data.success) {
                    setOneList(response.data.data)
                } else {
                    setError('Failed to fetch')
                }
            } catch (error) {
                console.error('Error : ', error);
                setError('Failed')
            } finally {
                setLoading(false)
            }

        }
        setConnection();
    }, [params])

    function handleUpdate() {
        // 수정 페이지로 이동
        router.push(`/guestBookUpdate/${onelist.gb_idx}`)
    }

    const handleDelete = async () => {
        if (!isAuthenticated) {
            alert("로그인이 필요합니다")
            router.push('/login')
        }
        if (confirm("정말 삭제하시겠습니까?")) {
            const API_url = `${LOCAL_API_BASE_URL}/guestbook/delete/${onelist.gb_idx}`
            try {
                const response = await axios.get(API_url, {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                }
                );
                if (response.data.success) {
                    alert(response.data.message)
                    router.push('/guestBookList')
                } else {
                    alert(response.data.message)
                }
            } catch (error) {
                console.error('Error : ', error);
            }
        }
    }

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
    return (
        <>
            <TableContainer component={Paper} className="table-container">
                <Table className="custom-table">
                    <TableHead>
                        <TableRow>
                            <TableCell className="table-header">IDX</TableCell>
                            <TableCell className="table-header">이름</TableCell>
                            <TableCell className="table-header">제목</TableCell>
                            <TableCell className="table-header">내용</TableCell>
                            <TableCell className="table-header">email</TableCell>
                            <TableCell className="table-header">등록일</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        <TableRow>
                            <TableCell className="table-cell">{onelist.gb_idx}</TableCell>
                            <TableCell className="table-cell">{onelist.gb_name}</TableCell>
                            <TableCell className="table-cell">{onelist.gb_subject}</TableCell>
                            <TableCell className="table-cell">{onelist.gb_content}</TableCell>
                            <TableCell className="table-cell">{onelist.gb_email}</TableCell>
                            <TableCell className="table-cell">{onelist.gb_regdate.substring(0, 10)}</TableCell>
                        </TableRow>
                    </TableBody>
                </Table>
            </TableContainer>
            <div style={{ margin: "20px", textAlign: "center" }}>
                <Button variant='contained' style={{ background: "purple" }}
                    onClick={handleUpdate} disabled={!isAuthenticated}>수정</Button>
                <Button variant='contained' color='error'
                    onClick={handleDelete} disabled={!isAuthenticated}>삭제</Button>
            </div >
        </>
    );
}

export default Page;