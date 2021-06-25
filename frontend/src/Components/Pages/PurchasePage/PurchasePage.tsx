import React, { useEffect, useState } from "react";
import "./PurchasePage.css";

export const PurchasePage = () => {
    return (
        <div>
            <PurchaseForm></PurchaseForm>
        </div>
    );
};

const PurchaseForm = () => {
    return (
        <div className="purchase-form">
            <NameField></NameField>
            <EmailField></EmailField>
            <AdressField></AdressField>
        </div>
    );
};

const NameField = () => {
    // State
    const [name, setName] = useState("");

    const setNewName = (e: any) => {
        setName(e.target.value);
    };

    return (
        <div>
            <h4>Name:</h4>
            <input
                className="input-name"
                type="text"
                placeholder="Geben Sie Ihren Namen an"
                value={name}
                onChange={setNewName}
            />
        </div>
    );
};

const EmailField = () => {
    // State
    const [emailAdress, setEmailAdress] = useState("");

    const setNewEmailAdress = (e: any) => {
        setEmailAdress(e.target.value);
    };

    return (
        <div>
            <h4>Email:</h4>
            <input
                className="input-email"
                type="text"
                placeholder="Geben Sie Ihre Email-Adresse an"
                value={emailAdress}
                onChange={setNewEmailAdress}
            />
        </div>
    );
};

const AdressField = () => {
    // State
    const [adress, setAdress] = useState("");

    const setNewAdress = (e: any) => {
        setAdress(e.target.value);
    };

    return (
        <div>
            <h4>Adresse:</h4>
            <input
                className="input-adress"
                type="text"
                placeholder="Geben Sie Ihre Adresse an"
                value={adress}
                onChange={setNewAdress}
            />
        </div>
    );
};
