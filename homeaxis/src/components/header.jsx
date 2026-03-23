import React from 'react';
import Logo from "./logo.jsx";

function Header(props) {
    return (
        <div className={"flex justify-between mx-auto px-[30px] py-[10px]"}>
            <div>
                <Logo className={"text-red-800"}/>
                <h1 className={"text-2xl font-bold"}>HomeAxis</h1>
            </div>
        </div>
    );
}

export default Header;