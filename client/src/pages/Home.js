import React, {useContext, useEffect, useState} from 'react'
import { AppContext } from "../App";

function Home() {
    const { userId } = useContext(AppContext);
    const {username, setUsername} = useState('');

    
    useEffect(()=> {
        
    },[])

    return (
        <>
            <div>
                <h1>Welcome {username}!</h1>
                <h1>Come have fun with us</h1>
            </div>
        </>
    )

}

export default Home;
