import React, { useState } from "react";

const RateTable = ({ rates, bucketUrl, updatedDate }) => {
  const [showAll, setShowAll] = useState(false); // State to manage visibility of all rates

  // Determine how many rows to display based on showAll state
  const displayedRates = showAll ? rates : rates.slice(0, 5);

  return (
    <div>
      <div
        style={{
          marginBottom: "10px",
          fontWeight: "bold",
          fontSize: "smaller",
          color: "#777",
        }}
      >
        Data Updated Date: {updatedDate}
      </div>
      <table>
        <thead>
          <tr>
            <th>Currency</th>
            <th>Buying</th>
            <th>Selling</th>
          </tr>
        </thead>
        <tbody>
          {displayedRates.map((rate) => (
            <tr key={rate.id}>
              <td>
                {rate.currencies?.flag_url && (
                  <img
                    src={`${bucketUrl}/${rate.currencies.flag_url}`}
                    alt={`${rate.currencies.currency_code} flag`}
                    style={{
                      width: "20px",
                      height: "auto",
                      marginRight: "5px",
                    }}
                  />
                )}
                {rate.currencies?.currency_code}
              </td>
              <td>{rate.buying_rate}</td>
              <td>{rate.selling_rate}</td>
            </tr>
          ))}
        </tbody>
      </table>
      {rates.length > 5 && (
        <div
          style={{
            display: "flex",
            justifyContent: "flex-end",
            marginTop: "10px",
          }}
        >
          <button
            onClick={() => setShowAll(!showAll)}
            style={{
              padding: "10px 15px",
              backgroundColor: "#252525FF", // Button color
              color: "white",
              border: "1px solid #252525FF#94949400", // Border color
              borderRadius: "25px",
              cursor: "pointer",
              transition: "background-color 0.3s, transform 0.2s", // Smooth transitions
            }}
            onMouseEnter={(e) =>
              (e.currentTarget.style.backgroundColor = "#333333")
            }
            onMouseLeave={(e) =>
              (e.currentTarget.style.backgroundColor = "#464646FF")
            }
          >
            {showAll ? "See Less" : "See More"}
          </button>
        </div>
      )}
    </div>
  );
};

export default RateTable;
