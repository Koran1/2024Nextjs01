import React from 'react';

function layout({ children }) {
    return (
        <>
            <h2>부모 페이지 Create Page</h2>
            {children}
        </>
    );
}

export default layout;