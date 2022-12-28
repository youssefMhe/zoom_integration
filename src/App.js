import './App.css';
import {useState} from "react";
import Zoom from "./Zoom";

function App() {

    const [joinMeeting, setJoinMeeting] = useState(false);

    return (
        <div className="App">
            {
                joinMeeting ? (<Zoom/>) :

                    <header className="App-header">
                        <p>
                            Zoom
                        </p>
                        <button onClick={() => {
                            setJoinMeeting(true)
                        }}>
                            Join Meeting now
                        </button>
                    </header>
            }

        </div>
    );
}

export default App;
