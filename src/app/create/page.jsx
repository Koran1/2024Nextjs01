import Image from 'next/image';
import React from 'react';

function Page() {
    return (
        <>
            <h2>자식 페이지 Create Page</h2>
            <p><Image src='/img/tree-4.jpg' alt='img_tree4' width={100} height={100} /></p>
        </>
    );
}

export default Page;