import {useState } from "react";

export default function Counter(num) { 
    const [count] = useState(0); 

    return (
        <div>
            <h2>კონტაქტი</h2>
            <p>რაოდენობა: {count}</p>
        </div>
    ); 
}