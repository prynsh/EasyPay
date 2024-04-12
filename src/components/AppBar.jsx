// export const Appbar = () => {
//     return <div className="shadow h-14 flex justify-between">
//         <div className="flex flex-col justify-center h-full ml-4 text-3xl font-bold">
//             EasyPay
//         </div>
//         <div className="flex">
//             <div className="flex flex-col justify-center h-full mr-4">
//                 Hello
//             </div>
//             <div className="rounded-full h-12 w-12 bg-slate-200 flex justify-center mt-1 mr-2">
//                 <div className="flex flex-col justify-center h-full text-xl">
//                     U
//                 </div>
//             </div>
//         </div>
//     </div>
// }

import React, { useEffect, useState } from "react";
import axios from "axios";
import { Button, Flex } from 'antd';
// import { Button } from "./Button";
import { useNavigate } from "react-router-dom";

const Appbar = () => {
    const [userInitial, setUserInitial] = useState("U");
    const navigate= useNavigate();

    useEffect(() => {
        const fetchUserData = async () => {
            try {
                const token = localStorage.getItem("token");
                const firstName = localStorage.getItem("firstname");
                const username = localStorage.getItem( "username" );
                if (token && firstName) {
                    setUserInitial(firstName.charAt(0).toUpperCase());
                }
            } catch (error) {
                console.error("Error fetching user data:", error);
            }
        };

        fetchUserData();
    }, []);

    return (
        <div className="shadow h-14 flex justify-between">
            <div className="flex flex-col justify-center h-full ml-4 text-3xl font-bold">
                EasyPay
            </div>
            <div className="flex">
                <div className="flex flex-col justify-center h-full mr-4">
                    Hello
                </div>
                <div className="flex">
                <div className="rounded-full h-12 w-12 bg-slate-200 flex justify-center mt-1 mr-2">
                    <div className="flex flex-col justify-center h-full text-xl">
                        {userInitial}
                    </div>
                </div>
                    <div className="pt-3 ">
                        {/* <Button label={"Sign Out"} /> */}
                        <Button onClick={()=>{
                            localStorage.clear();
                            navigate("/signin");
                        }} danger>Sign Out</Button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export { Appbar };


