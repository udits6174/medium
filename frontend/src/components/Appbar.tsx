import { useEffect } from "react"
import { Avatar } from "./Blogcard"
import { Link } from "react-router-dom"
import axios from "axios";
import { BACKEND_URL } from "../config";
import { useRecoilValue, useRecoilState } from "recoil";
import {loggedInState, emailState, usernameState} from '../store/atoms'


export const Appbar = () => {
    const email = useRecoilValue(emailState);
    const isLoggedIn = useRecoilValue(loggedInState);
    const [usernameData, setUsernameData] = useRecoilState(usernameState);

    useEffect(()=>{
        console.log("Email:", email);
        axios.get(`${BACKEND_URL}/api/v1/user/${email}`, {
            headers: {
                Authorization: `Bearer ${localStorage.getItem("token")}`
            }
        })
            .then(response => {
                console.log(response)
                setUsernameData(response.data.name);
            })
    }, [isLoggedIn])
    return <div className="border-b flex justify-between px-10 py-4">
        <Link to={'/blogs'} className="flex flex-col justify-center cursor-pointer">
                Medium
        </Link>
        <div>
            <Link to={`/publish`}>
                <button type="button" className="mr-4 text-white bg-green-700 hover:bg-green-800 focus:outline-none focus:ring-4 focus:ring-green-300 font-medium rounded-full text-sm px-5 py-2.5 text-center me-2 mb-2 ">New</button>
            </Link>
            <Avatar size={"big"} name={usernameData} />
        </div>
    </div>
}