"use client";
import { useEffect, useState, useRef } from "react";
import { createClient } from "@/utils/supabase/client";

import "./styles.css";
import CustomerForm from "@/components/CustomerForm/CustomerForm";

export interface FormValues {
  customer_type: string;
  national_id: number;
  how_introduction: string;
  customer_name: string;
  brand_name: string;
  has_reagent: string;
  organization_model: string;
  economic_code: number;
  number_personnel: number;
  registration_code: number;
  name_parent_organization: string;
  organization_type: string;
  type_activity: string;
  reagent: string;
}

export default function Instruments() {
  const supabase = createClient();
  const [user, setUser] = useState<any>(null);
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

  const onSubmit = async (values: FormValues) => {
    if (!user) {
      alert("You need to log in first.");
      return;
    }
    const newData = {
      user_id: user.id,
      ...values,
      national_id: values.national_id
        ? parseInt(values.national_id.toString(), 10)
        : null,
      economic_code: values.economic_code
        ? parseInt(values.economic_code.toString(), 10)
        : null,
      number_personnel: values.number_personnel
        ? parseInt(values.number_personnel.toString(), 10)
        : null,
      registration_code: values.registration_code
        ? parseInt(values.registration_code.toString(), 10)
        : null,
      has_reagent: values.has_reagent === "true",
      reagent: values.has_reagent === "true" ? values.reagent : null,
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
        has_reagent: "false",
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
      }}
    />
  );
}
