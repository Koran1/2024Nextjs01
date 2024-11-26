import Image from 'next/image';
import React from 'react';

function ReadThree() {
    return (
        <>
            <p>Read-3</p>
            <Image src='/img/tree-3-thumb.jpg' alt='treeimg' width={300} height={300} />
        </>
    );
}

export default ReadThree;