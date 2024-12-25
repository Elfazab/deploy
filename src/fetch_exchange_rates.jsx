import { createClient } from "@supabase/supabase-js";
import React, { useEffect, useState } from "react";

// Initialize Supabase client
const supabaseUrl = "https://qurekquvkfuesoccxxfm.supabase.co";
const supabaseAnonKey =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InF1cmVrcXV2a2Z1ZXNvY2N4eGZtIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MzMyMDI2MDgsImV4cCI6MjA0ODc3ODYwOH0.op8lICHjdf_qdrUpMTHG0G1KFh6vgaKfvjJGuSDBd48";
const supabase = createClient(supabaseUrl, supabaseAnonKey);
const BUCKET_URL = `${supabaseUrl}/storage/v1/object/public/logos_and_flags/`;

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
          banks (bank_name, logo_url),
          currencies (currency_code, flag_url)
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

  const sortedBankNames = Object.keys(groupedData).sort();

  if (loading) {
    return (
      <div className="loading-spinner-container">
        <div className="loading-spinner"></div>
      </div>
    );
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
    return `${formattedDate} ${formattedTime}`;
  };

  return (
    <div>
      <h1>Exchange Rates</h1>
      <div className="table-grid">
        {sortedBankNames.map((bankName) => (
          <div key={bankName} className="table-container">
            <h2>{bankName}</h2>
            {groupedData[bankName][0]?.banks.logo_url && (
              <img
                src={`${BUCKET_URL}/${groupedData[bankName][0].banks.logo_url}`}
                alt={`${bankName} logo`}
                style={{ width: "50px", height: "auto" }}
              />
            )}
            <table>
              <thead>
                <tr>
                  <th>Currency Code</th>
                  <th>Buying Rate</th>
                  <th>Selling Rate</th>
                  <th>Source Last Updated</th>
                  <th>Updated At</th>
                </tr>
              </thead>
              <tbody>
                {groupedData[bankName].map((rate) => (
                  <tr key={rate.id}>
                    <td>
                      {rate.currencies?.flag_url && (
                        <img
                          src={`${BUCKET_URL}/${rate.currencies.flag_url}`}
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
                    <td>{formatDate(rate.last_updated)}</td>
                    <td>{formatDateTime(rate.updated_at)}</td>
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
