import { createContext } from "react";

const songContext = createContext({

    ///**to keep json context in global available */

    currentSong: null,
    setCurrentSong: (currentSong) => { },
    soundPlayed: null,
    setSoundPlayed: () => { },
    isPaused: null,
    setIsPaused: () => { },

});

export default songContext;