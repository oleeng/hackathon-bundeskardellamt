import React from "react";
import "./css/Row.css";

interface RowProps {
    children: React.ReactNode;
}

export const Row = ({ children }: RowProps) => {
    return <div className="row">{children}</div>;
};
