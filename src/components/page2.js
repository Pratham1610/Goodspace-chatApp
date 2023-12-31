import React from "react";
import Camera from "./camera";
import Chatbox from "./chatbox";
import "./page2.css";

const Page2 = () => {
    return (
        <>
            <div className="pt-8 pl-32 space-y-4">
                <Chatbox />
                <Camera />
            </div>
        </>
    );
};

export default Page2;
