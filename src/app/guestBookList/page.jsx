'use client'
import { Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from '@mui/material';
import axios from 'axios';
import Link from 'next/link';
import React, { useEffect, useState } from 'react';
import './guestBookList.css'

function Page() {
    const [list, setList] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const LOCAL_URL = process.env.NEXT_PUBLIC_LOCAL_API_BASE_URL;

    const API_url = `${LOCAL_URL}/guestbook/list`
    const getData = async () => {
        try {
            setLoading(true);
            const response = await axios.get(API_url)
            setList(response.data.data.slice(0, 12))
            // setList([])
        } catch (error) {
            console.error("Error : ", error)
            setError("Failed to fetch data")
        } finally {
            setLoading(false)
        }
    }
    // 최초 한번만
    useEffect(() => {
        getData();
    }, [])

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
            <h2 className="title">GuestBookList</h2>

            <TableContainer component={Paper} className="table-container">
                <Table className="custom-table">
                    <TableHead>
                        <TableRow>
                            <TableCell className="table-header">이름</TableCell>
                            <TableCell className="table-header">제목</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {list.length === 0 ?
                            <>
                                <TableRow >
                                    <TableCell colSpan={2} className="table-cell" align='center'>
                                        <h2>등록된 정보가 없습니다!</h2>
                                    </TableCell>
                                </TableRow>
                            </>
                            :
                            list.map((item) => (
                                <TableRow key={item.gb_idx}>
                                    <TableCell className="table-cell">{item.gb_name}</TableCell>
                                    <TableCell className="table-cell">
                                        <Link href={`/guestBookDetails/${item.gb_idx}`}>{item.gb_subject}</Link>
                                    </TableCell>
                                </TableRow>
                            ))}
                    </TableBody>
                </Table>
            </TableContainer>
        </>
    );
}

export default Page