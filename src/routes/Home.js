import { Icon } from "@iconify/react";
import IconText from "../components/shared/IconText";
import TextWithHover from "../components/shared/TextWithHover";
import { Link, useNavigate } from "react-router-dom";





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
        description: "Focus with soft study music.",
        imgUrl: "https://images.unsplash.com/photo-1511379938547-c1f69419868d?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8aW5zdHJ1bWVudHxlbnwwfHwwfHx8MA%3D%3D"


    },

    {
        title: "Focus Flow",
        description: "Up tempo instrumental hip hop ",
        imgUrl: "https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTJ8fHdvcmt8ZW58MHx8MHx8fDA%3D"


    },

    {
        title: "Beat to think to",
        description: "Relax with beautiful piano",
        imgUrl: "https://media.istockphoto.com/id/1495819409/photo/digital-mind-brain-artificial-intelligence-concept.webp?b=1&s=170667a&w=0&k=20&c=rW0mL-FkO53lwhIHSyzxDafZMeoavzwdfuJb3U_ZBHU="


    }
];


const IndiaCardsData = [
    {
        title: "Arijit Singh",
        description: " Known for Soulful Vocal",
        imgUrl: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTZQiEYXcKU7kueW7caAC8OTnrUbCu-jlyh5A&s"
    },

    {
        title: "Lata Mangeshkar",
        description: "Nightingale of India",
        imgUrl: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT72gdSrkL3KisDG6K1ItwsklZZ0JA9CC8GEQ&s"


    },

    {
        title: "Darshan Raval",
        description: "Singer, Songwriter, And Performer",
        imgUrl: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSk5t6vBjF43pZrv6Y4YhIfr4bELjj3GyFNNg&s"


    },

    {
        title: "Shereya Ghoshal",
        description: "Renowned Indian Playback Singer",
        imgUrl: "data:image/jpeg;base64,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"


    },

    {
        title: "A.R. Rehman",
        description: "Eastern And Western Musical Styles",
        imgUrl: "data:image/jpeg;base64,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"


    }
];


const melofyPlaylistCards = [
    {
        title: "Chill Vibes",
        description: "Unwinding & Relaxation",
        imgUrl: "https://media.istockphoto.com/id/939443944/photo/indian-girl-listening-to-music-streaming-with-headphones-from-smartphone-in-summer-on-a-meadow.webp?b=1&s=170667a&w=0&k=20&c=LDVIqAC1damAoXj00Dsq1gLYBXkDuSj5AOytfKXupVw="
    },

    {
        title: "Energetic Beats",
        description: "Source of Energy",
        imgUrl: "https://media.istockphoto.com/id/1014763748/photo/atom-on-abstract-background.webp?b=1&s=170667a&w=0&k=20&c=CXFkKNgv8GBR2P-cTzBdYCKsHsiXDocRupRuPNsID2c="


    },

    {
        title: "Mellow Melodies",
        description: "Soft and Touchable",
        imgUrl: "https://media.istockphoto.com/id/1431385333/photo/rear-view-of-man-with-headphones-on-beach.webp?b=1&s=170667a&w=0&k=20&c=vxaPQOUjPUDubo8DIXgpnJYyDbJDcFgV-HqcxkPDVh8="


    },

    {
        title: "Motivational Hits",
        description: "Boots up songs",
        imgUrl: "https://images.unsplash.com/photo-1522202176988-66273c2fd55f?w=400&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8OHx8d29ya3xlbnwwfHwwfHx8MA%3D%3D"


    },

    {
        title: "Party Bangers",
        description: "Relax with beautiful piano",
        imgUrl: "https://images.unsplash.com/photo-1470225620780-dba8ba36b745?w=400&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8bXVzaWN8ZW58MHx8MHx8fDA%3D"


    }
];


const Home = () => {

    //method to say login first;
    const plsLogin = () => {
        alert("Please Login First !");
    };

    const navigate = useNavigate();

    return (
        <div className="h-full w-full flex">
            {/** left panel */}

            <div className="h-full w-1/5 bg-black  flex flex-col justify-between pb-10" >
                <div>
                    <div className="logoDiv p-6 flex cursor-pointer" onClick={() => { navigate("/home") }}>
                        <Icon icon="cryptocurrency-color:music" width="60" /><strong className="text-xl text-white">Melo'fy</strong>
                    </div>
                    <div className="py-5">
                        <IconText
                            iconName={"ep:home-filled"}
                            displayText={"Home"}
                            active

                        />
                        <IconText
                            iconName={"iconamoon:search-bold"}
                            displayText={"Search"}
                            onClick={plsLogin}

                        />
                        <IconText
                            iconName={"icomoon-free:books"}
                            displayText={"Library"}
                            onClick={plsLogin}
                        />
                    </div>
                    {/* <div className="pt-5">
                        <IconText
                            iconName={"icon-park-solid:add"}
                            displayText={"Create Playlist"}
                        />

                        <IconText
                            iconName={"flat-color-icons:like"}
                            displayText={"Liked Songs"}
                        />
                    </div> */}
                </div>
                <div className="px-5">
                    <div className="border border-gray-600  text-white w-2/5 flex px-2 py-1 rounded-full items-center justify-center 
                    hover:border-white  cursor-pointer transition duration-500">
                        <Icon icon="gravity-ui:globe" />
                        <div className="ml-2 text-sm font-semibold ">
                            English
                        </div>
                    </div>
                </div>
            </div>



            {/********************** right panel *****************************************/}
            <div className="h-full w-4/5 bg-app-black overflow-auto">
                {/**...........Navbaar........... */}
                <div className="navbaar w-full bg-black h-1/10 bg-opacity-30 flex items-center justify-end">

                    <div className="w-1/2 flex h-full">
                        <div className="w-3/5 flex justify-around items-center">
                            <TextWithHover displayText={"Premium"} />
                            <TextWithHover displayText={"Support"} />
                            <TextWithHover displayText={"Download"} />
                            <div className="h-1/2 border-r border-white"></div>

                        </div>

                        <div className="w-2/5 flex justify-around h-full items-center">
                            <Link to="/Signup" > <TextWithHover displayText={"SignUp"} /> </Link>
                            <div className="bg-white h-2/3 px-5 flex items-center justify-center rounded-full 
                                     font-semibold cursor-pointer " onClick={() => { navigate("/login") }}>

                                Log In

                            </div>
                        </div>

                    </div>
                </div>

                {/**......main containt ......... */}

                <div className="content p-8 pt-0 overflow-auto">

                    <PlaylistView titleText="Focus"
                        cardsData={focusCardsData} />
                    <PlaylistView titleText="Melo'fy"
                        cardsData={melofyPlaylistCards} />
                    <PlaylistView titleText="Vocal of India"
                        cardsData={IndiaCardsData} />

                </div>

            </div>
        </div>
    );
};


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
    const navigate = useNavigate();
    return (
        <div className="bg-black bg-opacity-40 w-1/5 p-4 rounded-lg cursor-pointer hover:bg-opacity-90 transition duration-500"
            onClick={() => {
                alert("Kindly Login First");
                navigate("/login");
            }}
        >
            <div className="pb-4 ">
                <img className="w-full h-40 rounded-md" src={imgUrl} alt="label" />
            </div>
            <div className="text-white font-semibold py-1 hover:underline">{title}</div>
            <div className="text-gray-500 text-sm ">{description}</div>

        </div>
    );
};
export default Home;