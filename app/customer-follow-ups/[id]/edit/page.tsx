"use client";
import { useParams, useRouter } from "next/navigation";
import { createClient } from "@/utils/supabase/client";
import { useEffect, useState } from "react";
import CustomerFollowUpsForm from "@/components/CustomerFollowUps/CustomerFollowUps";
import {
  CustomerFollowUpInsert,
  CustomerFollowUpRow,
  Database,
} from "@/lib/supabaseTypes";

export default function EditFollowUp() {
  const { id } = useParams();
  const supabase = createClient();
  const router = useRouter();
  const [initialValues, setInitialValues] =
    useState<CustomerFollowUpRow | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      const { data, error } = await supabase
        .from("customer_follow_ups")
        .select("*")
        .eq("id", Number(id))
        .single();

      if (error) {
        console.error(error);
        router.push("/customer-follow-ups/list");
        return;
      }

      setInitialValues({
        ...data,
        action_date: data.action_date,
        next_follow_up_date: data.next_follow_up_date,
      });
      setLoading(false);
    };

    fetchData();
  }, [id]);

  const handleSubmit = async (values: CustomerFollowUpInsert) => {
    try {
      const { error } = await supabase
        .from("customer_follow_ups")
        .update(values)
        .eq("id", Number(id));

      if (error) throw error;

      alert("تغییرات با موفقیت ذخیره شد!");
      router.push(`/customer-follow-ups/${id}`);
    } catch (err) {
      console.error("Update Error:", err);
      alert("خطا در ذخیره تغییرات!");
    }
  };

  if (loading) return <p>در حال بارگذاری...</p>;
  if (!initialValues) return <p>داده‌ای یافت نشد!</p>;

  return (
    <CustomerFollowUpsForm
      mode="edit"
      initialValues={initialValues}
      onSubmit={handleSubmit}
    />
  );
}
