import React from "react";
import "./LoadingSpinner.css";

export default function LoadingSpinner(props) {
  return (
    <div className={`spinner-container ${props.className}`}>
      <div className="loading-spinner h-16 w-16"></div>
    </div>
  );
}
