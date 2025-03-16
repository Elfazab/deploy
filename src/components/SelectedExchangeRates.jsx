// src/components/BankExchangeRates.js
import React, { useEffect, useState } from "react";
import "../index.css"; // Corrected CSS import
import { BUCKET_URL, fetchExchangeRates } from "../services/supabaseService";
import LoadingSpinner from "./LoadingSpinner"; // Import the LoadingSpinner component
import RateTable from "./RateTable"; // Import the RateTable component

const BankExchangeRates = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const fetchedRates = await fetchExchangeRates();
        const today = new Date().toLocaleDateString("en-US");

        // Filter rates to include only today's data
        const todayRates = fetchedRates.filter((rate) => {
          const rateDate = new Date(rate.data_fetched_date).toLocaleDateString(
            "en-US"
          );
          return rateDate === today;
        });

        setData(todayRates); // Save only today's rates
      } catch (error) {
        console.error("Error fetching data:", error);
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  if (loading) return <LoadingSpinner />; // Use the loading spinner
  if (error) return <div>Error: {error}</div>;

  // Group the rates by bank and limit to 5 rates per bank
  const groupedRates = data.reduce((acc, rate) => {
    const bankName = rate.banks?.bank_name || "Unknown Bank";
    if (!acc[bankName]) {
      acc[bankName] = [];
    }
    if (acc[bankName].length < 5) {
      // Limit to 5 rates per bank
      acc[bankName].push(rate);
    }
    return acc;
  }, {});

  // Get the first 3 banks
  const bankNames = Object.keys(groupedRates).slice(0, 3);

  return (
    <div>
      <h3>Latest Exchange Rates</h3>
      <div className="bank-exchange-rates">
        {bankNames.map((bankName) => (
          <div key={bankName} className="table-container">
            <h4 style={{ color: "white" }}>{bankName}</h4>
            <RateTable
              rates={groupedRates[bankName]} // Pass the limited rates
              bucketUrl={BUCKET_URL}
              updatedDate={new Date().toLocaleDateString("en-US")} // Update this to the correct date if available
            />
          </div>
        ))}
      </div>
    </div>
  );
};

export default BankExchangeRates;
