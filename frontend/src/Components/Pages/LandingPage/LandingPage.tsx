import React from "react";
import { BuyTicketSlider } from "./Components/BuyTicketSlider";
import { Row } from "../../Basic/Row";
import "./LandingPage.css";

export const LandingPage = () => {
    // Helper
    const buyTicketContent =
        "Kaufen Sie Ihre Tickets bequem online und checken Sie beim Besuch ganz einfach per QR-Code ein.";
    return (
        <div className="landing-page">
            <div className="blur-filter"></div>
            <Row>
                <BuyTicketSlider
                    title="Tickets kaufen"
                    content={buyTicketContent}
                />
                <BuyTicketSlider title="Mehr erfahren" content="" />
            </Row>
        </div>
    );
};
