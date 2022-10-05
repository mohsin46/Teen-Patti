import React from 'react';
import MenuButton from "../../icons/menu"
import Sound from '../../assets/sound.png';
import RequestIndicator from './RequestIndicator';
import away from "../../assets/away.png"
import leave from "../../assets/leave.png"
import back from "../../assets/back.png"
import axios from 'axios';

const TopBar = ({name, roomId, socket, sideShowRequest, getMembers, setShowRedirectHome, numRequestWaiting, hasGameStarted, isRoomLead, setShowOptionMenu, playerAway, setPlayerAway, setPlayerLeft}) => {

    const handlePlayerAway = () => {
        axios.put("https://teenpatti321.herokuapp.com/playerAway", "", {
            params: {
                name,
                roomId
            }
        }).then(() => {
            setPlayerAway(true)
        }).catch(err => console.log(err))
    }

    const handlePlayerBack = () => {
        axios.put("https://teenpatti321.herokuapp.com/playerBack", "", {
            params: {
                name,
                roomId
            }
        }).then(() => {
            setPlayerAway(false)
        }).catch(err => console.log(err))
    }

    const handlePlayerLeft = () => {
        axios.put("https://teenpatti321.herokuapp.com/playerExit", "", {
            params: {
                name,
                roomId
            }
        }).then(() => {
            setPlayerLeft(true)
            // getMembers()
            setShowRedirectHome(true)
            socket.emit("player_left", {
                roomId
            })
        }).catch(err => console.log(err))
    }

    console.log(numRequestWaiting, isRoomLead);
    return (
        <div className='px-4 py-2 flex '>
            {numRequestWaiting > 0 && isRoomLead && <RequestIndicator numRequestWaiting={numRequestWaiting} />}
            
            
            <MenuButton setShowOptionMenu={setShowOptionMenu} />
            {hasGameStarted &&
                     (playerAway ? <img onClick={handlePlayerBack} className="ml-6 w-8 h-full align-middle " src={back} />
                     : <img onClick={handlePlayerAway} className="ml-6 w-8 h-full align-middle " src={away} />)
                    
            }
            <img onClick={handlePlayerLeft} className="ml-4 w-8 h-full align-middle " src={leave} />
            <img className="absolute right-5 inline-block " src={Sound} />
        </div>
    ); 
};

export default TopBar;