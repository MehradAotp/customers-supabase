"use client";
import { useParams, useRouter } from "next/navigation";
import { createClient } from "@/utils/supabase/client";
import { useEffect, useState } from "react";
import { FormValues } from "../../page";
import CustomerForm from "@/components/CustomerForm/CustomerForm";

export default function EditInstrument() {
  const { id } = useParams();
  console.log("this is id", id);
  const supabase = createClient();
  const router = useRouter();
  const [initialValues, setInitialValues] = useState<FormValues | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      const {
        data: { user },
      } = await supabase.auth.getUser();

      const { data: dataUser } = await supabase
        .from("users")
        .select("*")
        .eq("user_id", user?.id)
        .single();

      let instrument;

      if (dataUser?.role === "admin") {
        const { data } = await supabase
          .from("customer")
          .select("*")
          .eq("id", Number(id))
          .single();
        instrument = data;
      } else {
        const { data } = await supabase
          .from("customer")
          .select("*")
          .eq("id", Number(id))
          .eq("user_id", user?.id)
          .single();
        instrument = data;
      }

      if (!instrument) {
        alert("دسترسی غیرمجاز!");
        router.push("/instruments/list");
        return;
      }

      setInitialValues({
        ...instrument,
        has_reagent: instrument.has_reagent ? "true" : "false",
        national_id: instrument.national_id?.toString() || "",
        economic_code: instrument.economic_code?.toString() || "",
        number_personnel: instrument.number_personnel?.toString() || "",
        registration_code: instrument.registration_code?.toString() || "",
        customer_name: instrument.customer_name || "",
        brand_name: instrument.brand_name || "",
        reagent: instrument.reagent || "",
      });

      setLoading(false);
    };

    fetchData();
  }, [id]);

  const handleSubmit = async (values: FormValues) => {
    try {
      const {
        data: { user },
      } = await supabase.auth.getUser();

      const { data: dataUser } = await supabase
        .from("users")
        .select("*")
        .eq("user_id", user?.id)
        .single();

      const matchCondition =
        dataUser?.role === "admin"
          ? { id: Number(id) }
          : { id: Number(id), user_id: user?.id };

      const { error } = await supabase
        .from("customer")
        .update({
          ...values,
          national_id: Number(values.national_id),
          economic_code: Number(values.economic_code),
          number_personnel: Number(values.number_personnel),
          registration_code: Number(values.registration_code),
          has_reagent: values.has_reagent === "true",
          reagent: values.has_reagent === "true" ? values.reagent : null,
        })
        .match(matchCondition);

      if (error) throw error;

      alert("تغییرات با موفقیت ذخیره شد!");
      router.push(`/instruments/${id}`);
    } catch (err) {
      console.error("Update Error:", err);
      alert("خطا در ذخیره تغییرات!");
    }
  };

  const handleDelete = async () => {
    if (!confirm("آیا مطمئن هستید که می‌خواهید این مورد را حذف کنید؟")) return;

    try {
      const {
        data: { user },
      } = await supabase.auth.getUser();

      const { data: dataUser } = await supabase
        .from("users")
        .select("*")
        .eq("user_id", user?.id)
        .single();

      let deleteResult;

      if (dataUser?.role === "admin") {
        const { data, error } = await supabase
          .from("customer")
          .delete()
          .eq("id", Number(id));
        deleteResult = { data, error };
      } else {
        const { data, error } = await supabase
          .from("customer")
          .delete()
          .eq("id", Number(id))
          .eq("user_id", user?.id);
        deleteResult = { data, error };
        console.log("this is result", deleteResult);
      }

      if (deleteResult.error) throw deleteResult.error;

      alert("با موفقیت حذف شد!");
      router.push("/instruments/list");
    } catch (err) {
      console.error("Delete Error:", err);
      alert("خطا در حذف اطلاعات!");
    }
  };

  if (loading) return <p>در حال بارگذاری...</p>;
  if (!initialValues) return <p>داده‌ای یافت نشد!</p>;

  return (
    <div>
      <CustomerForm
        mode="edit"
        initialValues={initialValues}
        onSubmit={handleSubmit}
      />
      <button onClick={handleDelete}>حذف این مورد</button>
    </div>
  );
}
