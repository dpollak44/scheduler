import React from 'react';

export default props => {
    return (
        <>
            Logged in as {props.user} <button onClick={props.onLogout}>logout</button>
        </>
    );
}