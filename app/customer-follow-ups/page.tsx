"use client";
import { useEffect, useState, useRef } from "react";
import { createClient } from "@/utils/supabase/client";

import CustomerFollowUpsForm from "@/components/CustomerFollowUps/CustomerFollowUps";
import { Database } from "@/lib/supabaseTypes";
import { User } from "@supabase/supabase-js";
import { CustomerFollowUpInsert } from "@/lib/supabaseTypes";

export default function CustomerFollowUps() {
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

  const onSubmit = async (values: CustomerFollowUpInsert) => {
    if (!user) {
      alert("لطفا ابتدا وارد شوید.");
      return;
    }

    const urlParams = new URLSearchParams(window.location.search);
    const customerId = urlParams.get("customerId");

    const newData = {
      user_id: user.id,
      ...values,
      customer_id: customerId || values.customer_id,
    };

    const { data, error } = await supabase
      .from("customer_follow_ups")
      .insert([newData]);

    if (error) {
      throw Error(error.message + " " + error.code);
    } else {
      alert("اطلاعات با موفقیت ذخیره شد!");
    }
  };

  if (!isMounted) return null;
  if (loading) return <p>در حال بارگذاری...</p>;

  if (!user) return <p>لطفا ابتدا وارد شوید.</p>;

  return (
    <CustomerFollowUpsForm
      onSubmit={onSubmit}
      initialValues={{
        contract: "",
        customer_id: 1,
        contract_type: "",
        interface_name: "",
        tracking_type: "",
        action_date: new Date().toISOString(),
        follow_up_description: "",
        next_follow_up_type: "",
        next_follow_up_date: new Date().toISOString(),
      }}
    />
  );
}
