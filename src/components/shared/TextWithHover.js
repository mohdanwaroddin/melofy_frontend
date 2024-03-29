

const TextWithHover = ({ iconName, displayText, active }) => {

    return (
        <div className="flex items-center justify-start cursor-pointer ">
            <div
                className={`${active ? "text-white" : "text-gray-500"
                    }  text-md font-semibold hover:text-white transition duration-500`} >
                {displayText}
            </div>
        </div>
    );

};

export default TextWithHover;