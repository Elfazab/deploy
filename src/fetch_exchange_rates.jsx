import { createClient } from "@supabase/supabase-js";
import React, { useEffect, useState } from "react";

// Initialize Supabase client
const supabaseUrl = "http://127.0.0.1:54321"; // Replace with your Supabase URL
const supabaseAnonKey =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZS1kZW1vIiwicm9sZSI6ImFub24iLCJleHAiOjE5ODM4MTI5OTZ9.CRXP1A7WOeoJeXxjNni43kdQwgnWNReilDMblYTn_I0"; // Replace with your Supabase Anon Key
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
          updated_at,
          banks (bank_name),
          currencies (currency_code)
        `);

      if (error) {
        console.error("Error fetching data:", error);
        setError(error.message); // Set the error message
        setData([]); // Ensure data is set to an empty array on error
      } else {
        setData(rates || []); // Set the data if there's no error
      }
      setLoading(false);
    };

    fetchData();
  }, []);

  // Group data by bank
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

  return (
    <div>
      <h1>Exchange Rates</h1>
      {Object.entries(groupedData).map(([bankName, rates]) => (
        <div key={bankName}>
          <h2>{bankName}</h2>
          <table>
            <thead>
              <tr>
                <th>Currency Code</th>
                <th>Buying Rate</th>
                <th>Selling Rate</th>
                <th>Updated At</th>
              </tr>
            </thead>
            <tbody>
              {rates.map((rate) => (
                <tr key={rate.id}>
                  <td>{rate.currencies?.currency_code}</td>
                  <td>{rate.buying_rate}</td>
                  <td>{rate.selling_rate}</td>
                  <td>{new Date(rate.updated_at).toLocaleString()}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ))}
    </div>
  );
};

export default ExchangeRates;
