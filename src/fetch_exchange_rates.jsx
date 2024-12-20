import { createClient } from "@supabase/supabase-js";
import React, { useEffect, useState } from "react";

// Initialize Supabase client
const supabaseUrl = "https://qurekquvkfuesoccxxfm.supabase.co"; // Replace with your Supabase URL
const supabaseAnonKey =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InF1cmVrcXV2a2Z1ZXNvY2N4eGZtIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MzMyMDI2MDgsImV4cCI6MjA0ODc3ODYwOH0.op8lICHjdf_qdrUpMTHG0G1KFh6vgaKfvjJGuSDBd48"; // Replace with your Supabase Anon Key
const supabase = createClient(supabaseUrl, supabaseAnonKey);

const ExchangeRates = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      const { data: rates, error } = await supabase.from("exchange_rates")
        .select(`
          id,
          buying_rate,
          selling_rate,
          last_updated,
          updated_at,
          banks (bank_name),
          currencies (currency_code)
        `);

      if (error) {
        console.error("Error fetching data:", error);
        setError(error.message);
        setData([]);
      } else {
        setData(rates || []);
      }
      setLoading(false);
    };

    fetchData();
  }, []);

  const groupedData = data.reduce((acc, rate) => {
    const bankName = rate.banks?.bank_name || "Unknown Bank";
    if (!acc[bankName]) {
      acc[bankName] = [];
    }
    acc[bankName].push(rate);
    return acc;
  }, {});

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  const formatDate = (dateString) => {
    if (!dateString) {
      return "Date not found";
    }
    const date = new Date(dateString);
    if (isNaN(date)) {
      return "Date not found";
    }
    const options = {
      weekday: "short",
      year: "numeric",
      month: "long",
      day: "numeric",
    };
    return date.toLocaleDateString("en-US", options);
  };

  const formatDateTime = (dateString) => {
    if (!dateString) {
      return "Date not found";
    }
    const date = new Date(dateString);
    if (isNaN(date)) {
      return "Date not found";
    }
    const optionsDate = {
      weekday: "short",
      year: "numeric",
      month: "long",
      day: "numeric",
    };
    const optionsTime = {
      hour: "2-digit",
      minute: "2-digit",
      second: "2-digit",
    };
    const formattedDate = date.toLocaleDateString("en-US", optionsDate);
    const formattedTime = date.toLocaleTimeString("en-US", optionsTime);
    return `${formattedDate} ${formattedTime}`; // Combine date and time
  };

  return (
    <div>
      <h1>Exchange Rates</h1>
      <div className="table-grid">
        {Object.entries(groupedData).map(([bankName, rates]) => (
          <div key={bankName} className="table-container">
            <h2>{bankName}</h2>
            <table>
              <thead>
                <tr>
                  <th>Currency Code</th>
                  <th>Buying Rate</th>
                  <th>Selling Rate</th>
                  <th>Source_last_updated</th>
                  <th>Updated At</th>
                </tr>
              </thead>
              <tbody>
                {rates.map((rate) => (
                  <tr key={rate.id}>
                    <td>{rate.currencies?.currency_code}</td>
                    <td>{rate.buying_rate}</td>
                    <td>{rate.selling_rate}</td>
                    <td>{formatDate(rate.last_updated)}</td>{" "}
                    {/* Display only date for last_updated */}
                    <td>{formatDateTime(rate.updated_at)}</td>{" "}
                    {/* Display date and time for updated_at */}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ExchangeRates;
