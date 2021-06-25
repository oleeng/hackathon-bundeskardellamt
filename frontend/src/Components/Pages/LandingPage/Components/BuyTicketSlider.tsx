import React from "react";
import "../LandingPage.css";

interface BuyTicketSliderProps {
    title: string;
    content: string;
    url?: string;
}

export const BuyTicketSlider = ({ title, content }: BuyTicketSliderProps) => {
    return (
        <>
            <div className="buy-ticket-slider">
                <h2>{title}</h2>
                <div className="buy-ticket-slider-content">{content}</div>
            </div>
        </>
    );
};
