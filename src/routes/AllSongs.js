import { Icon } from "@iconify/react";
import IconText from "../components/shared/IconText";
import TextWithHover from "../components/shared/TextWithHover";
import { Howl, Howler } from "howler";
import { useState, useEffect } from "react";
import LoggedinContainer from "../containers/LoggedinContainer";
import { makeAuthGETRequest } from "../utils/serverHelpers";

import { useContext } from "react";
import songContext from "../contexts/songContext";


const AllSongs = () => {
    const [songData, setSongData] = useState([]);


    useEffect(() => {
        const getData = async () => {

            const response = await makeAuthGETRequest("/song/get/allsongs");
            setSongData(response.data);
        };
        getData();

    }, []);


    return (
        <LoggedinContainer curActiveScreen="playlist">

            <PlaylistView titleText="Songs"
                cardsData={songData} />

        </LoggedinContainer>
    );
}



const PlaylistView = ({ titleText, cardsData }) => {

    return (

        <div className="text-white mt-8">
            <div className="text-2xl font-semibold mb-2">  {titleText} </div>
            <div className="py-5 grid gap-5 grid-cols-5">

                {
                    cardsData.map((item) => {
                        return (
                            <Card
                                info={item}
                                playSound={() => { }}

                                name={item.name}
                                firstName={item.artist.firstName}
                                thumbnail={item.thumbnail}

                            />
                        );
                    }

                    )
                }


            </div>
        </div>

    );
};

const Card = ({ info, playSound, name, firstName, thumbnail }) => {
    const { currentSong, setCurrentSong } = useContext(songContext);

    return (
        <div className="bg-black bg-opacity-40 w-full p-4 rounded-lg"
            onClick={() => {
                setCurrentSong(info);
            }}
        >
            <div className="pb-4 pt-2">
                <img className="w-full h-40 rounded-md" src={info.thumbnail} alt="label" />
            </div>
            <div className="text-white font-semibold py-3">{info.name}</div>
            <div className="text-gray-500 text-sm">{info.firstName}</div>

        </div>
    );
};


export default AllSongs;