import React from 'react';
import '../Basic/css/Button.css'

interface Buttonprops {
    buttonLabel: string
}

export const Button = ({buttonLabel}: Buttonprops) => {
    return (
        <button className="button">
            {buttonLabel}
        </button> 
    );
}