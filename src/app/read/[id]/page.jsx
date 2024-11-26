import ReadOne from '@/app/page/ReadOne';
import ReadThree from '@/app/page/ReadThree';
import ReadTwo from '@/app/page/ReadTwo';
import React from 'react';

async function Page({ params }) {
    const param = await params;
    let msg = param.id
    console.log('msg : ', msg);
    let str = ''

    if (msg === '1') {
        str = 'HTML 선택'
    } else if (msg === '2') {
        str = 'CSS 선택'
    } else if (msg === '3') {
        str = 'JS 선택'
    }
    return (
        <>
            <h2>I am read page</h2>
            <h3>{str}</h3>
            <hr />
            <h3>{msg === '1' ? 'HTML 선택' :
                msg === '2' ? "CSS 선택" :
                    'JS 선택'}</h3>
            <h3>{msg === '1' ? <ReadOne /> :
                msg === '2' ? <ReadTwo /> :
                    <ReadThree />}</h3>
        </>
    );
}

export default Page;