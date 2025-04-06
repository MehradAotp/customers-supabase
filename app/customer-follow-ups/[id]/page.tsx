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
  Divider,
} from "@mui/material";
import Link from "next/link";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import { CustomerFollowUpRow } from "@/lib/supabaseTypes";
import Loading from "@/components/Loading/Loading";
import { DetailItem } from "@/components/DetaisItem/DetaisItem";

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

  if (loading) return <Loading />;

  if (!data)
    return (
      <Typography sx={{ textAlign: "center", mt: 4 }}>
        داده‌ای یافت نشد!
      </Typography>
    );

  return (
    <Container maxWidth="md" sx={{ py: 4, direction: "rtl" }}>
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          mb: 3,
        }}
      >
        <Button
          component={Link}
          href="/customer-follow-ups/list"
          variant="contained"
          color="primary"
          startIcon={<ArrowBackIcon />}
          sx={{ borderRadius: 2 }}
        >
          بازگشت به لیست
        </Button>
        <Button
          component={Link}
          href={`/customer-follow-ups/${id}/edit`}
          variant="contained"
          color="warning"
          startIcon={<EditIcon />}
          sx={{ borderRadius: 2 }}
        >
          ویرایش
        </Button>
      </Box>

      <Paper
        elevation={3}
        sx={{
          p: 4,

          borderRadius: 3,
          position: "relative",
          overflow: "hidden",
          boxShadow: "0 8px 32px rgba(0, 0, 0, 0.1)",
        }}
      >
        <Typography
          variant="h4"
          sx={{
            color: "primary.main",
            mb: 3,
            fontWeight: "bold",
            position: "relative",
            "&:after": {
              content: '""',
              position: "absolute",
              bottom: -8,
              left: 0,
              width: "60px",
              height: "3px",
              bgcolor: "primary.main",
            },
          }}
        >
          جزئیات پیگیری شماره {data.id}
        </Typography>

        <Grid2
          container
          spacing={3}
          sx={{
            "& .MuiGrid-root": {
              padding: "16px",
              borderRadius: "8px",
              background: "rgba(255, 255, 255, 0.7)",
              transition: "all 0.3s ease",
              "&:hover": {
                background: "rgba(255, 255, 255, 0.9)",
                transform: "translateX(5px)",
                boxShadow: "0 4px 20px rgba(0, 0, 0, 0.1)",
              },
            },
          }}
        >
          <Grid2 size={12}>
            <Typography variant="h5" color="primary" gutterBottom>
              اطلاعات قرارداد
            </Typography>
            <Grid2 container spacing={2}>
              <Grid2 size={6}>
                <DetailItem label="قرارداد" value={data.contract} />
              </Grid2>
              <Grid2 size={6}>
                <DetailItem label="نوع قرارداد" value={data.contract_type} />
              </Grid2>
            </Grid2>
          </Grid2>

          <Grid2 size={12}>
            <Typography variant="h5" color="primary" gutterBottom>
              جزئیات پیگیری
            </Typography>
            <Grid2 container spacing={2}>
              <Grid2 size={6}>
                <DetailItem
                  label="شرح پیگیری"
                  value={data.follow_up_description}
                />
              </Grid2>
              <Grid2 size={6}>
                <DetailItem label="مشتری" value={customerName} />
              </Grid2>
              <Grid2 size={6}>
                <DetailItem label="نام رابط" value={data.interface_name} />
              </Grid2>
              <Grid2 size={6}>
                <DetailItem label="نوع پیگیری" value={data.tracking_type} />
              </Grid2>
            </Grid2>
          </Grid2>

          <Grid2 size={12}>
            <Typography variant="h5" color="primary" gutterBottom>
              زمان‌بندی
            </Typography>
            <Grid2 container spacing={2}>
              <Grid2 size={6}>
                <DetailItem
                  label="تاریخ اقدام"
                  value={
                    data.action_date
                      ? new Date(data.action_date).toLocaleDateString("fa-IR")
                      : "---"
                  }
                />
              </Grid2>
              <Grid2 size={6}>
                <DetailItem
                  label="تاریخ پیگیری بعدی"
                  value={
                    data.next_follow_up_date
                      ? new Date(data.next_follow_up_date).toLocaleDateString(
                          "fa-IR"
                        )
                      : "---"
                  }
                />
              </Grid2>
            </Grid2>
          </Grid2>
        </Grid2>

        <Divider sx={{ my: 3 }} />
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            mt: 4,
          }}
        >
          <Typography variant="caption" color="textSecondary">
            تاریخ ایجاد:{" "}
            {data.created_at &&
              new Date(data.created_at).toLocaleDateString("fa-IR", {
                year: "numeric",
                month: "long",
                day: "numeric",
                hour: "2-digit",
                minute: "2-digit",
              })}
          </Typography>

          <Button
            variant="contained"
            color="error"
            startIcon={<DeleteIcon />}
            sx={{
              bgcolor: "#d32f2f",
              "&:hover": {
                bgcolor: "#b71c1c",
                boxShadow: "0 4px 16px rgba(255, 0, 0, 0.3)",
              },
            }}
            onClick={handleDelete}
          >
            حذف این مورد
          </Button>
        </Box>
      </Paper>
    </Container>
  );
}
