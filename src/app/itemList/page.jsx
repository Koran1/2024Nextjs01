'use client'

import React, { useEffect, useState } from 'react';
import './itemList.css'
import { Divider, Grid2 } from '@mui/material';
import axios from 'axios';
import Link from 'next/link';

function Page(props) {
    const [list, setList] = useState([]);
    const API_url = 'https://makeup-api.herokuapp.com/api/v1/products.json?brand=maybelline'
    const getData = () => {
        axios.get(API_url)
            .then(res => {
                console.log(res.data)

                // 상위 12개 데이터만 추출
                setList(res.data.slice(0, 12))
            }).catch(err => console.error('Error : ', err))
    }
    // 최초 한번만
    useEffect(() => {
        getData();
    }, [])
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