import { Icon } from "@iconify/react";
import IconText from "../components/shared/IconText";
import TextWithHover from "../components/shared/TextWithHover";
import { Howl, Howler } from "howler";
import { useContext, useLayoutEffect, useRef, useState } from "react";
import songContext from "../contexts/songContext";
import CreatePlaylistModal from "../modals/CreatePlaylistModal";
import AddToPlaylistModal from "../modals/AddToPlaylistModal";
import { makeAuthPOSTRequest } from "../utils/serverHelpers";
import { Link } from "react-router-dom";
import { useCookies } from 'react-cookie';


const LoggedinContainer = ({ children, curActiveScreen }) => {
    const [createPlaylistModalOpen, setCreatePlaylistModalOpen] = useState(false);
    const [addToPlaylistModalOpen, setAddToPlaylistModalOpen] = useState(false);
    const [cookie, setCookie] = useCookies(["token"]);

    const {
        currentSong,
        setCurrentSong,
        soundPlayed,
        setSoundPlayed,
        isPaused,
        setIsPaused
    } = useContext(songContext);

    const firstUpdate = useRef(true);

    useLayoutEffect(() => {
        //if statement will prevent the useEffect from running on the first render. 
        if (firstUpdate.current) {
            firstUpdate.current = false;
            return;
        }

        if (!currentSong) {
            return
        }
        changeSong(currentSong.track);
    }, [currentSong && currentSong.track]);

    // To add songs into a playlist
    const addSongToPlaylist = async (playlistId) => {
        const songId = currentSong._id;

        const payload = { playlistId, songId }
        const response = await makeAuthPOSTRequest(
            "/playlist/add/song",
            payload
        );
        if (response._id) {
            setAddToPlaylistModalOpen(false);
        }
    };

    const playSound = () => {
        if (!soundPlayed) {
            return;
        }

        soundPlayed.play();
    };

    const changeSong = (songSrc) => {

        if (soundPlayed) {
            soundPlayed.stop();
        }

        let sound = new Howl({
            src: [songSrc],
            html5: true,
        });
        setSoundPlayed(sound);
        sound.play();
        setIsPaused(false);
    };

    const pauseSong = () => {
        soundPlayed.pause();
    };

    const togglePlayPause = () => {
        if (isPaused) {
            playSound();
            setIsPaused(false);
        } else {
            pauseSong();
            setIsPaused(true);
        }
    };

    return (
        <div className="h-full w-full bg-app-black">
            {createPlaylistModalOpen && (
                <CreatePlaylistModal
                    closeModal={() => {
                        setCreatePlaylistModalOpen(false);
                    }}
                />
            )}
            {addToPlaylistModalOpen && (
                <AddToPlaylistModal
                    closeModal={() => {
                        setAddToPlaylistModalOpen(false);

                    }}
                    addSongToPlaylist={addSongToPlaylist}
                />
            )}

            {/**if song is not played yet, then show only full screen, when song is played,
             * our screen should be split into 9/10 part for showing currently playing songs;
             */}
            <div className={`${currentSong ? "h-9/10" : "h-full"} w-full flex`}>


                {/********************** left panel sidebar **********************************/}

                <div className="h-full w-1/5 bg-black  flex flex-col justify-between pb-10" >
                    <div>
                        <div className="logoDiv p-6 flex" >
                            <Icon icon="cryptocurrency-color:music" width="60" /><strong className="text-xl text-white">Melofy</strong>
                        </div>
                        <div className="py-5">
                            <IconText
                                iconName={"ep:home-filled"}
                                displayText={"Home"}
                                targetLink={"/home"}
                                active={curActiveScreen === "home"}

                            />
                            <IconText
                                iconName={"iconamoon:search-bold"}
                                displayText={"Search"}
                                active={curActiveScreen === "search"}
                                targetLink={"/search"}

                            />
                            <IconText
                                iconName={"icomoon-free:books"}
                                displayText={"Library"}
                                active={curActiveScreen === "library"}
                                targetLink={"/library"}
                            />
                            <IconText
                                iconName={"game-icons:music-spell"}
                                displayText={"My Songs"}
                                targetLink={"/myMusic"}
                                active={curActiveScreen === "myMusic"}

                            />
                        </div>
                        <div className="pt-5">
                            <IconText
                                iconName={"icon-park-solid:add"}
                                displayText={"Create Playlist"}
                                onClick={() => {
                                    setCreatePlaylistModalOpen(true);
                                }}
                            />

                            <IconText
                                iconName={"flat-color-icons:like"}
                                displayText={"Liked Songs"}
                            />
                        </div>
                    </div>
                    <div className="px-5">
                        <div className=" border border-gray-600 hover:border-white text-white w-2/5 flex px-2 py-1 rounded-full items-center justify-center  cursor-pointer transition duration-500">
                            <Icon icon="gravity-ui:globe" />
                            <div className="ml-2 text-sm font-semibold">
                                English
                            </div>

                        </div>
                        <div className="hover:text-white pt-5">

                            <IconText
                                iconName={"ant-design:logout-outlined"}
                                displayText={"Log Out"}
                                onClick={() => {
                                    document.cookie = 'token=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;';
                                }}


                            />

                        </div>

                    </div>
                </div>

                {/********* right panel ***************/}
                <div className="h-full w-4/5 bg-app-black overflow-auto">
                    {/**Navbaar........... */}
                    <div className="navbaar w-full bg-black h-1/10 bg-opacity-30 flex items-center justify-end">

                        <div className="w-1/2 flex h-full">
                            <div className="w-2/3 flex justify-around items-center">
                                <TextWithHover displayText={"Premium"} />
                                <TextWithHover displayText={"Support"} />
                                <TextWithHover displayText={"Download"} />
                                <div className="h-1/2 border-r border-white"></div>

                            </div>

                            <div className="w-1/3 flex justify-around h-full items-center">
                                <Link to="/uploadsong" > <TextWithHover displayText={"Upload Song"} /></Link>
                                <div className="bg-white w-10 h10 flex items-center justify-center rounded-full font-semibold cursor-pointer">
                                    MA
                                </div>
                            </div>

                        </div>
                    </div>

                    {/**....................................Main containt .......................... */}

                    <div className="content p-8 pt-0 overflow-auto">

                        {children}

                    </div>
                </div>
            </div>
            {/***** .......................... this is playbar of song .......*/}
            {
                currentSong && (


                    <div className="w-full h-1/10 bg-black bg-opacity-30 text-white flex items-center px-4">
                        <div className="w-1/4 flex items-center">

                            <img src={currentSong.thumbnail}
                                alt="currentSongThumbnail"
                                className="h-14 w-14 rounded"
                            />
                            <div className="pl-4">
                                <div className="text-sm hover:underline cursor-pointer">
                                    {currentSong.name}
                                </div>
                                <div className="text-xs text-gray-500 hover:underline cursor-pointer">
                                    {currentSong.artist.firstName + " " + currentSong.artist.lastName}
                                </div>
                            </div>
                        </div>
                        <div className="w-1/2 flex justify-center h-full flex-col items-center">
                            <div className="flex w-1/3 justify-between items-center">
                                {/** controls........ */}
                                <Icon icon="ph:shuffle-fill"
                                    fontSize={30}
                                    className="cursor-pointer text-gray-500 hover:text-white"
                                />
                                <Icon icon="mdi:skip-previous-outline"
                                    fontSize={30}
                                    className="cursor-pointer text-gray-500 hover:text-white"
                                />
                                <Icon
                                    icon={
                                        isPaused
                                            ? "ic:baseline-play-circle"
                                            : "ic:baseline-pause-circle"}
                                    fontSize={50}
                                    className="cursor-pointer text-gray-500 hover:text-white"

                                    onClick={togglePlayPause}
                                />
                                <Icon icon="mdi:skip-next-outline"
                                    fontSize={30}
                                    className="cursor-pointer text-gray-500 hover:text-white"
                                />
                                <Icon icon="ic:twotone-repeat"
                                    fontSize={30}
                                    className="cursor-pointer text-gray-500 hover:text-white"
                                />


                            </div>

                            <div>
                                {/**progress bar... */}
                            </div>
                        </div>
                        <div className="w-1/4 flex justify-end pr-4 space-x-4 items-center">
                            <Icon
                                icon="ic:round-playlist-add"
                                fontSize={30}
                                className="cursor-pointer text-gray-500 hover:text-white "
                                onClick={() => {
                                    setAddToPlaylistModalOpen(true);
                                }}
                            />
                            <Icon
                                icon="ph:heart-bold"
                                fontSize={25}
                                className="cursor-pointer text-gray-500 hover:text-white "
                            />
                        </div>
                    </div>
                )}
        </div>
    );
};




export default LoggedinContainer;