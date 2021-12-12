import React from 'react';
import "./homepage.css";

export default function Homepage({setLoginUser}) {
    return (
        <div className="homepage">
            <h1>Homepage</h1>
            <div className="button" onClick={() => setLoginUser({})}  >Logout</div>
        </div>
    )
}
