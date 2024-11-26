import Image from 'next/image';
import React from 'react';
import './gallery.css'

function Page() {
    return (
        <>
            <h2>I am Image Gallery</h2>
            <table>
                <tbody>
                    <tr>
                        <td><Image src='/img/tree-1.jpg' alt='img1' width={100} height={100} /></td>
                        <td><Image src='/img/tree-2.jpg' alt='img2' width={100} height={100} /></td>
                        <td><Image src='/img/tree-3.jpg' alt='img3' width={100} height={100} /></td>
                    </tr>
                    <tr>
                        <td><Image src='/img/tree-4.jpg' alt='img4' width={100} height={100} /></td>
                        <td><Image src='/img/coffee-blue.jpg' alt='img5' width={100} height={100} /></td>
                        <td><Image src='/img/coffee-pink.jpg' alt='img6' width={100} height={100} /></td>
                    </tr>
                </tbody>
            </table>
        </>
    );
}

export default Page;