import { Icon } from "@iconify/react";
import IconText from "../components/shared/IconText";
import TextWithHover from "../components/shared/TextWithHover";
import { Howl, Howler } from "howler";
import { useState } from "react";
import LoggedinContainer from "../containers/LoggedinContainer";



const focusCardsData = [
    {
        title: "Peachful Piano",
        description: "Relax and indulge with beautiful piano pieces",
        imgUrl: "https://media.istockphoto.com/id/1310679184/photo/man-singing-a-song-and-playing-electric-piano.jpg?s=612x612&w=0&k=20&c=g-k6p8KltHaiF7ug6iWT9sxg6_hGfvrd9jIcIWSoOuA="
    },

    {
        title: "Deep Focus",
        description: "Keep calm and focus with these musics.",
        imgUrl: "https://images.unsplash.com/photo-1558021212-51b6ecfa0db9?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Nnx8c3R1ZHl8ZW58MHx8MHx8fDA%3D"


    },

    {
        title: "Instrumental Study",
        description: "Focus with soft study music in the background.",
        imgUrl: "https://images.unsplash.com/photo-1511379938547-c1f69419868d?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8aW5zdHJ1bWVudHxlbnwwfHwwfHx8MA%3D%3D"


    },

    {
        title: "Focus Flow",
        description: "Up tempo instrumental hip hop beats",
        imgUrl: "https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTJ8fHdvcmt8ZW58MHx8MHx8fDA%3D"


    },

    {
        title: "Beat to think to",
        description: "Relax with beautiful piano",
        imgUrl: "https://images.unsplash.com/photo-1470225620780-dba8ba36b745?w=400&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8bXVzaWN8ZW58MHx8MHx8fDA%3D"


    }
];


const melofyPlaylistCards = [
    {
        title: "This is Melofy...",
        description: "Relax and indulge with beautiful piano pieces",
        imgUrl: "data:image/jpeg;base64,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"
    },

    {
        title: "Deep Focus",
        description: "Keep calm and focus with these musics.",
        imgUrl: "https://images.unsplash.com/photo-1558021211-6d1403321394?w=400&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTJ8fHN0dWR5fGVufDB8fDB8fHww"


    },

    {
        title: "Instrumental Study",
        description: "Focus with soft study music in the background.",
        imgUrl: "https://images.unsplash.com/photo-1601375863404-5b912f4536df?w=400&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MXx8dmlvbG9ufGVufDB8fDB8fHww"


    },

    {
        title: "Focus Flow",
        description: "Up tempo instrumental hip hop beats",
        imgUrl: "https://images.unsplash.com/photo-1522202176988-66273c2fd55f?w=400&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8OHx8d29ya3xlbnwwfHwwfHx8MA%3D%3D"


    },

    {
        title: "Beat to think to",
        description: "Relax with beautiful piano",
        imgUrl: "https://images.unsplash.com/photo-1470225620780-dba8ba36b745?w=400&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8bXVzaWN8ZW58MHx8MHx8fDA%3D"


    }
];

const Home = () => {
    return (
        <LoggedinContainer curActiveScreen="home">
            <PlaylistView titleText="Focus"
                cardsData={focusCardsData} />
            <PlaylistView titleText="Melofy Playlists"
                cardsData={melofyPlaylistCards} />
            <PlaylistView titleText="Sound of India"
                cardsData={focusCardsData} />
        </LoggedinContainer>
    );
}



const PlaylistView = ({ titleText, cardsData }) => {
    return (
        <div className="text-white mt-8">
            <div className="text-2xl font-semibold mb-2">  {titleText} </div>
            <div className="w-full flex justify-between space-x-4">

                {
                    cardsData.map((item) => {
                        return (
                            <Card
                                title={item.title}
                                description={item.description}
                                imgUrl={item.imgUrl}
                            />
                        );
                    }

                    )
                }


            </div>

        </div>
    );
};

const Card = ({ title, description, imgUrl }) => {
    return (
        <div className="bg-black bg-opacity-40 w-1/5 p-4 rounded-lg">
            <div className="pb-4 pt-2">
                <img className="w-full h-40 rounded-md" src={imgUrl} alt="label" />
            </div>
            <div className="text-white font-semibold py-3">{title}</div>
            <div className="text-gray-500 text-sm">{description}</div>

        </div>
    );
};
export default Home;