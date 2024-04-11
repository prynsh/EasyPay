import { Appbar } from "../components/AppBar";
import { Balance } from "../components/Balance";
import { Users } from "../components/Users";
import axios from "axios";
import { useEffect, useState } from "react";

export const Dashboard = () => {
    const [balance, setBalance] = useState(null);

    useEffect(() => {
        const fetchUserBalance = async () => {
            try {
                const token = localStorage.getItem("token");

                if (token) {
                    const response = await axios.get("http://localhost:3000/api/v1/account/balance", {
                        headers: {
                            Authorization: `Bearer ${token}`
                        }
                    });

                    const userBalance = response.data.balance;
                    setBalance(userBalance);
                } else {
                    console.error("Token not found in local storage.");
                }
            } catch (error) {
                console.error("Error fetching balance:", error);
            }
        };

        fetchUserBalance();
    }, []);

    return (
        <div>
            <Appbar />
            <div className="m-8">
                <Balance value={balance !== null ? balance : "Loading..."} />
                <Users />
            </div>
        </div>
    );
};
