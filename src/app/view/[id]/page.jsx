// import OneList from '@/app/oneList/page';
// import axios from 'axios';

// async function Page({ params }) {
//     const param = await params;
//     const id = param.id;

//     // 객체 1개가 온다!
//     // const API_url = `https://makeup-api.herokuapp.com/api/v1/products/${id}.json`
//     const API_url = `/makeup/v1/products/${id}.json`

//     try {
//         const response = await axios.get(API_url);
//         const onelist = response.data;
//         return <OneList onelist={onelist} />

//     } catch (error) {
//         console.error('Error :', error);
//         return <>Error.</>
//     }

// }

// export default Page;


'use client'

import axios from 'axios';
import React, { useEffect, useState } from 'react';
import './oneList.css'
import { Button } from '@mui/material';

function Page({ params }) {
    const MAKEUP_API_BASE_URL = process.env.NEXT_PUBLIC_MAKEUP_API_BASE_URL;
    const [item, setItem] = useState(null);         // 데이터 상태
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchData = async () => {
            try {
                setLoading(true)
                //const { id } = await Promise.resolve(params);
                const { id } = await (params);
                const API_URL = `${MAKEUP_API_BASE_URL}/v1/products/${id}.json`

                // 데이터 가져오기
                const response = await axios.get(API_URL);
                setItem(response.data);
            } catch (err) {
                console.error('Error : ', err)
                setError('Failed to fetch product data')
            } finally {
                setLoading(false);
            }
        }
        fetchData();
    }, [params, MAKEUP_API_BASE_URL])

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
        <div className='wrap'>
            <div className='img_itemImg'>
                <a href={item.product_link}>
                    <img src={item.image_link} alt={item.name} width={150} height={150} />
                </a>
            </div>
            <div className='info_item'>
                <strong className='tit_item'>{item.name}</strong>
                <strong className='num_price'>$ {item.price}</strong>
                <span className='txt_info'>
                    {item.category ? `${item.category}/` : ''}{item.product_type}
                </span>
                <Button variant='contained' color='success' style={{ margin: '20px' }}>구매하기</Button>
                <Button variant='contained' color='error'>취소하기</Button>
            </div>
            <div className='disWrap'>
                <hr />
                <h1 style={{ margin: '20px' }}>Description</h1>
                <div style={{ paddingBottom: '20px', fontSize: '24px' }}>
                    {item.description}
                </div>
            </div>
        </div>
    );
}

export default Page