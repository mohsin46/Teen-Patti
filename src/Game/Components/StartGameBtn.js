import axios from 'axios';
import React from 'react';
import { useCookies } from 'react-cookie';

const StartGameBtn = ({roomId, setHasGameStarted, socket, roundDetails, getRoundDetails, setFullShow}) => {

    const [cookies, setCookie, removeCookie] = useCookies(['user']);


    const startGame = () => {
        console.log(roundDetails, {}, roundDetails == {}, roundDetails === {});
        if(roundDetails.roundStarted == "Yes"){
            axios.put("http://localhost:8000/refreshRound", "", {
                params: {
                    roomId
                }
            }).then(res => {
                console.log(res)
                setFullShow(false)
                setHasGameStarted(true)
                getRoundDetails("called from refresh start btn")
                setCookie("hasGameStarted", true, { path: '/' })
                console.log("game has refreshed");
                socket.emit("game_started", {
                    roomId
                })
                
            }).catch(e => console.log(e))
        }
        else {
            
            axios.post("http://localhost:8000/startFirstRound", "", {
                params: {
                    roomId
                }
            }).then(res => {
                console.log(res)
                setHasGameStarted(true)
                console.log("called from game start btn");
                getRoundDetails("called from game start btn")
                setCookie("hasGameStarted", true, { path: '/' })
                console.log("game has started from start btn");
                socket.emit("game_started", {
                    roomId
                })
                
            }).catch(e => console.log(e))
        }
    }


    return (
        <div 
        onClick={e => startGame()}
        className='text-sm w-fit ml-auto mr-2 mt-2 p-2 rounded-md bg-[#3EA76D] text-white' >
            Start Game
        </div>
    );
};

export default StartGameBtn;