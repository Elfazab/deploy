import React from "react";

const BankHeader = ({ bankName, logoUrl }) => (
  <div className="bank-header">
    {logoUrl && (
      <img
        src={logoUrl}
        alt={`${bankName} logo`}
        style={{
          width: "50px",
          height: "auto",
          borderRadius: "50%",
          marginRight: "10px",
        }}
      />
    )}
    <h3>{bankName}</h3>
  </div>
);

export default BankHeader;
