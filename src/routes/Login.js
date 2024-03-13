import { Icon } from "@iconify/react";
import TextInput from "../components/shared/TextInput";
import PasswordInput from "../components/shared/PasswordInput";
import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import { makeUnauthPOSTRequest } from "../utils/serverHelpers";
import { useCookies } from "react-cookie";

const LoginComponent = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [cookies, setCookie] = useCookies(["token"]);
    const navigate = useNavigate();


    const login = async () => {

        const data = { email, password };
        const response = await makeUnauthPOSTRequest(
            "/auth/login",
            data
        );
        if (response && !response.err) {

            const token = response.token;
            const date = new Date();
            date.setDate(date.getDate() + 30);
            setCookie("token", token, { path: "/", expires: date });
            alert("Success");
            navigate("/home");
        } else {
            alert("Invalid Credentials !");
        }
    };

    // const goToSignup = () => {
    //     navigate("/signup");
    // };

    return (
        <div className="w-full h-full flex flex-col items-center ">
            <div className="logo p-5 border-b border-solid border-gray-200 w-full flex justify-center">
                <Icon icon="cryptocurrency-color:music" width="80" className="cursor-pointer" onClick={() => { navigate("/home") }} /><strong className="text-xl">Melofy</strong>
            </div>

            <div className="inputRegion w-1/3 py-10 flex items-center justify-center flex-col">
                {/*two input fields*/}
                <div className="font-bold mb-4">To Continue, Log in to Melofy</div>
                <TextInput
                    label="Email ID or Usersame"
                    placeholder="Email or Username"
                    className="my-6"
                    value={email}
                    setValue={setEmail}
                />

                <PasswordInput
                    label="Password"
                    placeholder="Password"
                    value={password}
                    setValue={setPassword}
                />
                <div className="w-full flex items-center justify-end my-6">
                    <button className="bg-green-300 font-semibold p-3 px-10 rounded-full"
                        onClick={(e) => {
                            e.preventDefault();
                            login();
                        }}
                    >
                        LOG IN
                    </button>
                </div>
                <div className="w-full border-b border-solid border-gray-300"></div>
                <div className="my-3 font-semibold text-lg">
                    Don't have an account?
                </div>
                <div className="border border-gray-500 text-gray-500 w-full flex items-center justify-center py-2 rounded-full 
                                hover:text-gray-900 hover:bg-gray-300  cursor-pointer transition duration-500 ease-in-out"
                    onClick={() => {

                        navigate("/signup");
                    }
                    }
                >
                    SIGN UP for Melofy
                </div>
            </div>
        </div>
    );
};

export default LoginComponent;