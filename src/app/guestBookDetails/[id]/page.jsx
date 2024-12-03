// import { Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from '@mui/material';
// import axios from 'axios';
// import React from 'react';
// import './guestBookList.css'

// async function Page({ params }) {
//     const LOCAL_API_BASE_URL = process.env.NEXT_PUBLIC_LOCAL_API_BASE_URL;
//     const param = await params;
//     const id = param.id;
//     // const API_url = `http://localhost:8080/api/guestbook/gb_onelist?gb_idx=${id}`
//     const API_url = `${LOCAL_API_BASE_URL}/guestbook/gb_onelist?gb_idx=${id}`

//     try {
//         const response = await axios.get(API_url);
//         const onelist = response.data;
//         console.log(onelist)
//         return (
//             <>
//                 <TableContainer component={Paper} className="table-container">
//                     <Table className="custom-table">
//                         <TableHead>
//                             <TableRow>
//                                 <TableCell className="table-header">이름</TableCell>
//                                 <TableCell className="table-header">제목</TableCell>
//                                 <TableCell className="table-header">내용</TableCell>
//                                 <TableCell className="table-header">email</TableCell>
//                                 <TableCell className="table-header">등록일</TableCell>
//                             </TableRow>
//                         </TableHead>
//                         <TableBody>
//                             <TableRow>
//                                 <TableCell className="table-cell">{onelist.gb_name}</TableCell>
//                                 <TableCell className="table-cell">{onelist.gb_subject}</TableCell>
//                                 <TableCell className="table-cell">{onelist.gb_content}</TableCell>
//                                 <TableCell className="table-cell">{onelist.gb_email}</TableCell>
//                                 <TableCell className="table-cell">{onelist.gb_regdate.substring(0, 10)}</TableCell>
//                             </TableRow>
//                         </TableBody>
//                     </Table>
//                 </TableContainer>
//             </>
//         );
//     } catch (error) {
//         console.error('Error : ', error);
//         return <>Error.</>
//     }
// }

// export default Page;
'use client'

import { Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from '@mui/material';
import axios from 'axios';
import React, { useEffect, useState } from 'react';
import './guestBookList.css'

function Page({ params }) {
    const LOCAL_API_BASE_URL = process.env.NEXT_PUBLIC_LOCAL_API_BASE_URL;
    const [onelist, setOneList] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const setConnection = async () => {
            try {
                setLoading(true);

                //const param = await Promise.resolve(params);
                const param = await params;
                const id = param.id;
                // const API_url = `http://localhost:8080/api/guestbook/gb_onelist?gb_idx=${id}`
                const API_url = `${LOCAL_API_BASE_URL}/guestbook/gb_onelist?gb_idx=${id}`
                const response = await axios.get(API_url);
                setOneList(response.data)
            } catch (error) {
                console.error('Error : ', error);
                setError('Failed')
            } finally {
                setLoading(false)
            }

        }
        setConnection();
    }, [params])

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
}

export default Page;