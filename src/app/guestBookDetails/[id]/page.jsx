import { Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from '@mui/material';
import axios from 'axios';
import React from 'react';
import './guestBookList.css'

async function Page({ params }) {
    const param = await params;
    const id = param.id;
    const API_url = `http://localhost:8080/api/guestbook/gb_onelist?gb_idx=${id}`

    try {
        const response = await axios.get(API_url);
        const onelist = response.data;
        console.log(onelist)
        return (
            <>
                <TableContainer component={Paper} className="table-container">
                    <Table className="custom-table">
                        <TableHead>
                            <TableRow>
                                <TableCell className="table-header">이름</TableCell>
                                <TableCell className="table-header">제목</TableCell>
                                <TableCell className="table-header">내용</TableCell>
                                <TableCell className="table-header">email</TableCell>
                                <TableCell className="table-header">등록일</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            <TableRow>
                                <TableCell className="table-cell">{onelist.gb_name}</TableCell>
                                <TableCell className="table-cell">{onelist.gb_subject}</TableCell>
                                <TableCell className="table-cell">{onelist.gb_content}</TableCell>
                                <TableCell className="table-cell">{onelist.gb_email}</TableCell>
                                <TableCell className="table-cell">{onelist.gb_regdate.substring(0, 10)}</TableCell>
                            </TableRow>
                        </TableBody>
                    </Table>
                </TableContainer>
            </>
        );
    } catch (error) {
        console.error('Error : ', error);
        return <>Error.</>
    }
}

export default Page;