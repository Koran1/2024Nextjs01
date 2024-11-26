import Image from 'next/image';
import React from 'react';

function ReadTwo() {
    return (
        <>
            <p>Read-2</p>
            <Image src='/img/tree-2-thumb.jpg' alt='treeimg' width={300} height={300} />
        </>
    );
}

export default ReadTwo;