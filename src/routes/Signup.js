import { Icon } from "@iconify/react";
import TextInput from "../components/shared/TextInput";
import PasswordInput from "../components/shared/PasswordInput";
import { Link } from "react-router-dom";
const SignupComponent = () => {

    return (
        <div className="w-full h-full flex flex-col items-center ">
            <div className="logo p-5 border-b border-solid border-gray-200 w-full flex justify-center">
                <Icon icon="cryptocurrency-color:music" width="80" /><strong className="text-xl">Melofy</strong>
            </div>

            <div className="inputRegion w-1/3 py-10 flex items-center justify-center flex-col">
                {/*two input fields*/}
                <div className="font-bold mb-4">Sign up for free to start listening </div>
                <TextInput
                    label="What is your email?"
                    placeholder="Enter your Email."
                    className="my-6"
                />
                <TextInput
                    label="Confirm your email"
                    placeholder="Enter your email again."
                    className="mb-6"
                />

                <PasswordInput
                    label="Create a password"
                    placeholder="Create a password"
                />
                <TextInput
                    label="What should we call you?"
                    placeholder="Enter a profile name."
                    className="my-6"
                />
                <div className="w-full flex items-center justify-center my-6">
                    <button className="bg-green-300 font-semibold p-3 px-10 rounded-full">SIGN UP</button>
                </div>
                <div className="w-full border-b border-solid border-gray-300"></div>
                <div className="my-3 font-semibold text-lg">
                    Already have an account?
                </div>
                <div className="border border-gray-500 text-gray-500 w-full flex items-center justify-center py-2 rounded-full ">
                    <Link to="/Login"> SIGN IN </Link>
                </div>
            </div>
        </div>
    );
};

export default SignupComponent;