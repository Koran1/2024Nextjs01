'use client'

import React, { useEffect, useState } from 'react';
import './itemList.css'
import { Divider, Grid2 } from '@mui/material';
import axios from 'axios';
import Link from 'next/link';

function Page() {
    const MAKEUP_API_BASE_URL = process.env.NEXT_PUBLIC_MAKEUP_API_BASE_URL;
    const [list, setList] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    // const API_url = 'https://makeup-api.herokuapp.com/api/v1/products.json?brand=maybelline'
    const API_url = `${MAKEUP_API_BASE_URL}/v1/products.json?brand=maybelline`

    const getData = async () => {
        try {
            setLoading(true);
            const response = await axios.get(API_url)
            setList(response.data.slice(0, 12))
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
        <div style={{ width: '80%', margin: '0 auto', padding: '20px' }}>
            <h2>베스트 상품</h2>
            <Divider />
            <Grid2 container spacing={2}>
                {
                    list.map(list_item => {
                        return <Grid2 key={list_item.id} size={{ xs: 3 }}>
                            <Link href={'/view/' + list_item.id}>
                                <img src={list_item.image_link} alt='img' className='img_item' />
                                <strong>{list_item.name}</strong>
                                <span className='txt_info'>{list_item.category} &nbsp; &nbsp; {list_item.product_type}</span>
                                <strong className='num_price'>{list_item.price}</strong>
                            </Link>
                        </Grid2>
                    })
                }

            </Grid2>
        </div >
    );
}

export default Page;