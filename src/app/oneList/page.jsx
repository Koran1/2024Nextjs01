import React from 'react';
import './oneList.css'
import { Button } from '@mui/material';

function OneList({ onelist }) {
    const {
        name, price, image_link, product_link, description,
        category, product_type
    } = onelist;
    return (
        <div className='wrap'>
            <div className='img_itemImg'>
                <a href={product_link}>
                    <img src={image_link} alt='img' width={150} height={150} />
                </a>
            </div>
            <div className='info_item'>
                <strong className='tit_item'>{name}</strong>
                <strong className='num_price'>$ {price}</strong>
                <span className='txt_info'>
                    {category ? `${category}/` : ''}{product_type}
                </span>
                <Button variant='contained' color='success' style={{ margin: '20px' }}>구매하기</Button>
                <Button variant='contained' color='error'>취소하기</Button>
            </div>
            <div className='disWrap'>
                <hr />
                <h1 style={{ margin: '20px' }}>Description</h1>
                <div style={{ paddingBottom: '20px', fontSize: '24px' }}>
                    {description}
                </div>
            </div>

        </div>
    );
}

export default OneList;