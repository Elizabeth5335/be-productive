import React from 'react';
import '../styles/Main.css';
import NavPage from './NavPage'

export default function Main(){
    const [start, setStart] = React.useState(false);

    function toggleStart(){
        setStart(prevStart => !prevStart);
    }
    return(
        <main>
            {start? 
            <NavPage toggleClick={toggleStart}/>
            : 
            <div className="main">
                <h1 onClick={toggleStart} id="main-text">BE PRODUCTIVE</h1>
            </div>
        }
        </main>
    )
}