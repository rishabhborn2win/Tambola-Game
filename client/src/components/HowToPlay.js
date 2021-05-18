import React from 'react'
import  Heading  from './Heading'

export const HowToPlay = () => {
    return (
        <div>
            <Heading text="How To Play?" />
            <ol>
                <li>Create A Game.</li>
                <li>Share the Game Details in Social chat platforms. Player can join the game using link.</li>
                <li>Player joined the game.</li>
                <li>Host has to generate tickets for the Players from his dashboard.</li>
                <li>Player has to reload until they get the ticket.</li>
                <li>Game Starts</li>
                <li>Player has to claim the offers it will be autochecked and points will be given.</li>
                <li>Player having highest score WINS!!</li>
                <li>Player Leaves the game.</li>
                <li>Game is deleted by the Host to create a new Game.</li>
            </ol>
        </div>
    )
}
