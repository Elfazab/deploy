import React, { useEffect, useState } from "react";
import { BUCKET_URL, fetchExchangeRates } from "../services/supabaseService"; // Import BUCKET_URL
import BankHeader from "./BankHeader";
import LoadingSpinner from "./LoadingSpinner";
import Navbar from "./Navbar";
import RateTable from "./RateTable";

const ExchangeRates = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const rates = await fetchExchangeRates();
        setData(rates);
      } catch (error) {
        console.error("Error fetching data:", error);
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  // Group data by data_fetched_date
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

  const sortedFetchedDates = Object.keys(groupedData).sort(
    (a, b) => new Date(b) - new Date(a)
  );

  if (loading) return <LoadingSpinner />;
  if (error) return <div>Error: {error}</div>;

  return (
    <div>
      <Navbar />
      <h1>Exchange Rates</h1>
      {sortedFetchedDates.map((fetchedDate) => (
        <div key={fetchedDate}>
          <h2>Data Fetched Date: {fetchedDate}</h2>
          <div className="table-grid">
            {Object.keys(groupedData[fetchedDate])
              .sort()
              .map((bankName) => (
                <div key={bankName} className="table-container">
                  <BankHeader
                    bankName={bankName}
                    logoUrl={`${BUCKET_URL}/${groupedData[fetchedDate][bankName][0].banks.logo_url}`}
                  />
                  <RateTable
                    rates={groupedData[fetchedDate][bankName]}
                    bucketUrl={BUCKET_URL}
                  />
                </div>
              ))}
          </div>
        </div>
      ))}
    </div>
  );
};

export default ExchangeRates;
