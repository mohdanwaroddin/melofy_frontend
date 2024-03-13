import { Icon } from "@iconify/react";
import { useCookies } from "react-cookie";
import TextInput from "../components/shared/TextInput";
import PasswordInput from "../components/shared/PasswordInput";
import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import { makeUnauthPOSTRequest } from "../utils/serverHelpers";

const SignupComponent = () => {

    const [email, setEmail] = useState("");
    const [confirmEmail, setConfirmEmail] = useState("");
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");

    const [cookie, setCookie] = useCookies(["token"]);

    const navigate = useNavigate();

    const signUp = async () => {

        if (email !== confirmEmail) {
            alert("Confirm email should be same !");
            return;
        }

        if (!username || !password || !firstName || !lastName) {
            alert("All fields are required !");
            return;
        }
        const data = { email, password, username, firstName, lastName };
        const response = await makeUnauthPOSTRequest(
            "/auth/register",
            data
        );

        if (response && !response.err) {

            const token = response.token;
            const date = new Date();
            date.setDate(date.getDate() + 30);
            setCookie("token", token, { path: "/", expires: date });
            alert("Success");
            navigate("/login");
        } else {
            alert("Failure");
        }
    };

    return (
        <div className="w-full h-full flex flex-col items-center ">
            <div className="logo p-5 border-b border-solid border-gray-200 w-full flex justify-center">
                <Icon icon="cryptocurrency-color:music" width="80" className="cursor-pointer" onClick={() => { navigate("/home") }} /><strong className="text-xl ">Melofy</strong>
            </div>

            <div className="inputRegion w-1/3 py-10 flex items-center justify-center flex-col">
                {/*two input fields*/}
                <div className="font-bold mb-4">Sign up for free to start listening </div>
                <TextInput
                    label="What is your email?"
                    placeholder="Enter your Email"
                    className="my-6"
                    value={email}
                    setValue={setEmail}

                />
                <TextInput
                    label="Confirm your email"
                    placeholder="Enter your email again"
                    className="mb-6"
                    value={confirmEmail}
                    setValue={setConfirmEmail}
                />

                <TextInput
                    label="Username"
                    placeholder="Enter Your Username"
                    className="mb-6"
                    value={username}
                    setValue={setUsername}
                />

                <PasswordInput
                    label="Create a password"
                    placeholder="Create a password"
                    value={password}
                    setValue={setPassword}
                />
                <div className="w-full flex justify-between items-center space-x-1">
                    <TextInput
                        label="First Name"
                        placeholder="Enter Your First Name"
                        className="my-6"
                        value={firstName}
                        setValue={setFirstName}
                    />
                    <TextInput
                        label="Last Name"
                        placeholder="Enter Your Last Name"
                        className="my-6"
                        value={lastName}
                        setValue={setLastName}
                    />
                </div>
                <div className="w-full flex items-center justify-center my-6">
                    <button className="bg-green-300 font-semibold p-3 px-10 rounded-full "
                        onClick={(e) => {
                            e.preventDefault();
                            signUp();
                        }}
                    >
                        SIGN UP
                    </button>
                </div>
                <div className="w-full border-b border-solid border-gray-300"></div>
                <div className="my-3 font-semibold text-lg">
                    Already have an account?
                </div>
                <div className="border border-gray-500 text-gray-500 w-full flex items-center justify-center py-2 rounded-full 
                               hover:text-gray-800 hover:bg-gray-300 cursor-pointer transition duration-500 ease-in-out"
                    onClick={() => {

                        navigate("/signin");
                    }
                    }
                >
                    SIGN IN
                </div>
            </div>
        </div>
    );
};

export default SignupComponent;