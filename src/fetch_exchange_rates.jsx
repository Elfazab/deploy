import { createClient } from "@supabase/supabase-js";

// Initialize Supabase client
const supabaseUrl = "https://qurekquvkfuesoccxxfm.supabase.co";
const supabaseAnonKey =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InF1cmVrcXV2a2Z1ZXNvY2N4eGZtIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MzMyMDI2MDgsImV4cCI6MjA0ODc3ODYwOH0.op8lICHjdf_qdrUpMTHG0G1KFh6vgaKfvjJGuSDBd48";
const supabase = createClient(supabaseUrl, supabaseAnonKey);

export const fetchExchangeRates = async () => {
  const { data: rates, error } = await supabase.from("exchange_rates").select(`
      id,
      buying_rate,
      selling_rate,
      last_updated,
      updated_at,
      data_fetched_date,
      banks (bank_name),
      currencies (currency_code)
    `);

  if (error) {
    console.error("Error fetching data:", error);
    return {};
  }

  // Structure the data as required
  const structuredData = rates.reduce((acc, rate) => {
    const bankName = rate.banks?.bank_name || "Unknown Bank";
    const currencyCode = rate.currencies?.currency_code;

    if (!acc[bankName]) {
      acc[bankName] = {};
    }

    if (!acc[bankName][currencyCode]) {
      acc[bankName][currencyCode] = {};
    }

    acc[bankName][currencyCode] = {
      buying_rate: rate.buying_rate,
      selling_rate: rate.selling_rate,
    };

    return acc;
  }, {});

  // Convert to the desired format
  const formattedData = Object.entries(structuredData).reduce(
    (bankAcc, [bankName, bankData]) => {
      bankAcc[bankName] = Object.entries(bankData).reduce(
        (currencyAcc, [currencyCode, currencyData]) => {
          currencyAcc[currencyCode] = {};
          return currencyAcc;
        },
        {}
      );
      return bankAcc;
    },
    {}
  );

  // Populate with exchange rates
  Object.entries(structuredData).forEach(([bankName, bankData]) => {
    Object.entries(bankData).forEach(([currencyCode, currencyData]) => {
      Object.entries(bankData).forEach(
        ([innerCurrencyCode, innerCurrencyData]) => {
          if (currencyCode !== innerCurrencyCode) {
            formattedData[bankName][currencyCode][innerCurrencyCode] =
              currencyData.selling_rate / innerCurrencyData.buying_rate;
          }
        }
      );
    });
  });

  const finalFormattedData = Object.entries(structuredData).reduce(
    (acc, [bankName, bankData]) => {
      acc[bankName] = {};
      Object.entries(bankData).forEach(([currencyCode, currencyData]) => {
        acc[bankName][currencyCode] = {
          buying_rate: currencyData.buying_rate,
          selling_rate: currencyData.selling_rate,
        };
      });
      return acc;
    },
    {}
  );

  return finalFormattedData;
};
