import Image from 'next/image';
import React from 'react';

function ReadOne() {
    return (
        <>
            <p>Read-1</p>
            <Image src='/img/tree-1-thumb.jpg' alt='treeimg' width={300} height={300} />
        </>
    );
}

export default ReadOne;