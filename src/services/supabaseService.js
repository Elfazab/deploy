import { createClient } from "@supabase/supabase-js";

const supabaseUrl = "https://qurekquvkfuesoccxxfm.supabase.co";
const supabaseAnonKey =  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InF1cmVrcXV2a2Z1ZXNvY2N4eGZtIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MzMyMDI2MDgsImV4cCI6MjA0ODc3ODYwOH0.op8lICHjdf_qdrUpMTHG0G1KFh6vgaKfvjJGuSDBd48";
const supabase = createClient(supabaseUrl, supabaseAnonKey);

export const BUCKET_URL = `${supabaseUrl}/storage/v1/object/public/logos_and_flags/`;

export const fetchExchangeRates = async () => {
  const { data: rates, error } = await supabase.from("exchange_rates")
    .select(`
      id,
      buying_rate,
      selling_rate,
      last_updated,
      updated_at,
      data_fetched_date,
      banks (bank_name, logo_url),
      currencies (currency_code, flag_url)
    `);
    
  if (error) throw new Error(error.message);
  return rates || [];
};