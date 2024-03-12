import { Icon } from "@iconify/react";
import IconText from "../components/shared/IconText";
import TextWithHover from "../components/shared/TextWithHover";
import { useState, useEffect } from "react";
import { Howl, Howler } from "howler";
import SingleSongCard from "../components/shared/SingleSongCard";
import { makeAuthGETRequest } from "../utils/serverHelpers";
import LoggedinContainer from "../containers/LoggedinContainer";

const MyMusic = () => {
    const [songData, setSongData] = useState([]);


    useEffect(() => {
        const getData = async () => {

            const response = await makeAuthGETRequest("/song/get/mysongs");
            setSongData(response.data);
        };
        getData();

    }, []);


    return (
        <LoggedinContainer curActiveScreen="myMusic">
            <div className="text-white text-xl font-semibold pb-4 pl-2 pt-8">
                My Songs
            </div>
            <div className="space-y-3 overflow-auto">

                {songData.map((item) => {
                    return <SingleSongCard
                        info={item}
                        playSound={() => { }} />
                })}

            </div>
        </LoggedinContainer>
    );
};

export default MyMusic;