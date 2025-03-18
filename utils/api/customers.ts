import { createClient } from "@/utils/supabase/client";

export const getCustomers = async () => {
  const supabase = createClient();
  const { data, error } = await supabase
    .from("customer")
    .select("id, customer_name")
    .order("customer_name", { ascending: true });

  if (error) throw error;
  return data;
};
