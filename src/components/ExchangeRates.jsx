import React, { useEffect, useState } from "react";
import { BUCKET_URL, fetchExchangeRates } from "../services/supabaseService";
import BankHeader from "./BankHeader";
import LoadingSpinner from "./LoadingSpinner";
import Navbar from "./Navbar";
import RateTable from "./RateTable";

const ExchangeRates = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedDate, setSelectedDate] = useState(""); // State for selected date
  const [dates, setDates] = useState([]); // State for available dates

  useEffect(() => {
    const fetchData = async () => {
      try {
        const rates = await fetchExchangeRates();
        setData(rates);

        // Get today's date in the same format
        const today = new Date().toLocaleDateString("en-US");

        const uniqueDates = [
          ...new Set(
            rates.map((rate) =>
              new Date(rate.data_fetched_date).toLocaleDateString("en-US")
            )
          ),
        ];

        setDates(uniqueDates);

        // Check if today's date is in the unique dates and set it as the default
        if (uniqueDates.includes(today)) {
          setSelectedDate(today); // Set today's date as the default
        } else {
          setSelectedDate(uniqueDates[0]); // Fallback to the first available date
        }
      } catch (error) {
        console.error("Error fetching data:", error);
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  // Group data by fetched date
  const groupedData = data.reduce((acc, rate) => {
    const fetchedDate = new Date(rate.data_fetched_date).toLocaleDateString(
      "en-US"
    );

    if (!acc[fetchedDate]) {
      acc[fetchedDate] = {};
    }

    const bankName = rate.banks?.bank_name || "Unknown Bank";
    if (!acc[fetchedDate][bankName]) {
      acc[fetchedDate][bankName] = [];
    }

    acc[fetchedDate][bankName].push(rate);
    return acc;
  }, {});

  // Handle date change from dropdown
  const handleDateChange = (e) => {
    setSelectedDate(e.target.value);
  };

  if (loading) return <LoadingSpinner />;
  if (error) return <div>Error: {error}</div>;

  return (
    <div>
      <Navbar />
      <h1>Exchange Rates</h1>
      <div>
        <select
          id="date-select"
          value={selectedDate}
          onChange={handleDateChange}
        >
          {dates.sort().map((date) => (
            <option key={date} value={date}>
              {date}
            </option>
          ))}
        </select>
      </div>

      {/* Display data for the selected date */}
      <div>
        <h2>Data Updated Date: {selectedDate}</h2>
        <div className="table-grid">
          {Object.keys(groupedData[selectedDate] || {})
            .sort()
            .map((bankName) => (
              <div key={bankName} className="table-container">
                <BankHeader
                  bankName={bankName}
                  logoUrl={`${BUCKET_URL}/${groupedData[selectedDate][bankName][0].banks.logo_url}`}
                />
                <RateTable
                  rates={groupedData[selectedDate][bankName]}
                  bucketUrl={BUCKET_URL}
                />
              </div>
            ))}
        </div>
      </div>
    </div>
  );
};

export default ExchangeRates;
