"use client";
import { useParams, useRouter } from "next/navigation";
import { createClient } from "@/utils/supabase/client";
import { useEffect, useState } from "react";
import {
  Container,
  Typography,
  Paper,
  Button,
  Box,
  Grid2,
  CircularProgress,
} from "@mui/material";
import Link from "next/link";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import { CustomerFollowUpRow } from "@/lib/supabaseTypes";

export default function FollowUpDetails() {
  const { id } = useParams();
  const supabase = createClient();
  const router = useRouter();
  const [data, setData] = useState<CustomerFollowUpRow | null>(null);
  const [loading, setLoading] = useState(true);
  const [customerName, setCustomerName] = useState("");

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

      setData(data);
      setLoading(false);

      if (data?.customer_id) {
        const { data: customerData } = await supabase
          .from("customer")
          .select("customer_name")
          .eq("id", data.customer_id)
          .single();

        setCustomerName(customerData?.customer_name || "نامشخص");
      }
    };

    fetchData();
  }, [id]);

  const handleDelete = async () => {
    if (!confirm("آیا مطمئن هستید که می‌خواهید این مورد را حذف کنید؟")) return;

    try {
      const { error } = await supabase
        .from("customer_follow_ups")
        .delete()
        .eq("id", Number(id));

      if (error) throw error;

      alert("با موفقیت حذف شد!");
      router.push("/customer-follow-ups/list");
    } catch (err) {
      console.error("Delete Error:", err);
      alert("خطا در حذف اطلاعات!");
    }
  };

  if (loading)
    return (
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          height: "60vh",
        }}
      >
        <CircularProgress />
      </Box>
    );

  if (!data)
    return (
      <Typography sx={{ textAlign: "center", mt: 4 }}>
        داده‌ای یافت نشد!
      </Typography>
    );

  return (
    <Container maxWidth="md" sx={{ py: 4, direction: "rtl" }}>
      <Box sx={{ display: "flex", justifyContent: "space-between", mb: 3 }}>
        <Button
          component={Link}
          href="/customer-follow-ups/list"
          variant="contained"
          color="primary"
          startIcon={<ArrowBackIcon />}
        >
          بازگشت به لیست
        </Button>

        <Button
          component={Link}
          href={`/customer-follow-ups/${id}/edit`}
          variant="contained"
          color="warning"
          startIcon={<EditIcon />}
        >
          ویرایش
        </Button>
      </Box>

      <Paper elevation={4} sx={{ p: 4, borderRadius: 3 }}>
        <Typography variant="h4" gutterBottom fontWeight="bold">
          جزئیات پیگیری شماره {data.id}
        </Typography>

        <Grid2 container spacing={2} sx={{ mt: 2 }}>
          <Grid2 size={6}>
            <Typography>
              <strong>قرارداد:</strong> {data.contract}
            </Typography>
          </Grid2>
          <Grid2 size={6}>
            <Typography>
              <strong>نوع قرارداد:</strong> {data.contract_type}
            </Typography>
          </Grid2>
          <Grid2 size={6}>
            <Typography>
              <strong>شرح پیگیری:</strong> {data.follow_up_description}
            </Typography>
          </Grid2>
          <Grid2 size={6}>
            <Typography>
              <strong>مشتری:</strong> {customerName}
            </Typography>
          </Grid2>
          <Grid2 size={6}>
            <Typography>
              <strong>نام رابط:</strong> {data.interface_name}
            </Typography>
          </Grid2>
          <Grid2 size={6}>
            <Typography>
              <strong>نوع پیگیری:</strong> {data.tracking_type}
            </Typography>
          </Grid2>
          <Grid2 size={6}>
            <Typography>
              <strong>تاریخ اقدام:</strong>{" "}
              {data.action_date
                ? new Date(data.action_date).toLocaleDateString("fa-IR")
                : "---"}
            </Typography>
          </Grid2>
          <Grid2 size={6}>
            <Typography>
              <strong>تاریخ پیگیری بعدی:</strong>{" "}
              {data.next_follow_up_date
                ? new Date(data.next_follow_up_date).toLocaleDateString("fa-IR")
                : "---"}
            </Typography>
          </Grid2>
        </Grid2>

        <Button
          variant="contained"
          color="error"
          startIcon={<DeleteIcon />}
          sx={{ mt: 4, width: "100%", marginTop: "40px" }}
          onClick={handleDelete}
        >
          حذف این مورد
        </Button>
      </Paper>
    </Container>
  );
}
