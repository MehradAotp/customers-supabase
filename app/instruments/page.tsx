"use client";
import { useEffect, useState, useRef } from "react";
import { createClient } from "@/utils/supabase/client";

import "./styles.css";
import CustomerForm from "@/components/CustomerForm/CustomerForm";
import { Database, CustomerInsert } from "@/lib/supabaseTypes";
import { User } from "@supabase/supabase-js";

export default function Instruments() {
  const supabase = createClient();
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
    const checkUser = async () => {
      const { data: userData } = await supabase.auth.getUser();
      setUser(userData?.user || null);
      setLoading(false);
    };
    checkUser();
  }, []);

  const onSubmit = async (values: CustomerInsert) => {
    if (!user) {
      alert("You need to log in first.");
      return;
    }
    const newData: Database["public"]["Tables"]["customer"]["Insert"] = {
      user_id: user.id,
      ...values,
      national_id: Number(values.national_id) || null,
      economic_code: Number(values.economic_code) || null,
      number_personnel: Number(values.number_personnel) || null,
      registration_code: Number(values.registration_code) || null,
      has_reagent: Boolean(values.has_reagent),
      reagent: values.has_reagent ? values.reagent : null,
    };

    console.log("this is the new data", newData);

    const { data, error } = await supabase.from("customer").insert([newData]);
    console.log("this is the data", data);

    if (error) {
      throw Error(error.message + " " + error.code);
    } else {
      alert("اطلاعات با موفقیت ذخیره شد!");
    }

    console.log("this is values", values);
  };

  if (!isMounted) return null;
  if (loading) return <p>Loading...</p>;

  if (!user) return <p>You need to log in to access this form.</p>;

  return (
    <CustomerForm
      onSubmit={onSubmit}
      initialValues={{
        customer_type: "حقیقی",
        has_reagent: false,
        national_id: 0,
        customer_name: "",
        brand_name: "",
        economic_code: 0,
        number_personnel: 0,
        registration_code: 0,
        reagent: "",
        organization_model: "مدل 1",
        how_introduction: "آشنایی 1",
        name_parent_organization: "سازمان 1",
        organization_type: "خصوصی",
        type_activity: "بازرگانی",
        created_at: new Date().toISOString(),
        user_id: user.id,
      }}
    />
  );
}
