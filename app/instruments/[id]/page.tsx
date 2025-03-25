"use client";
import { useParams, useRouter } from "next/navigation";
import { createClient } from "@/utils/supabase/client";
import { useEffect, useState } from "react";
import {
  Container,
  Typography,
  Paper,
  Grid2,
  Divider,
  IconButton,
  Button,
  Box,
  Tabs,
  Tab,
  Chip,
  TableContainer,
  Table,
  TableHead,
  TableBody,
  TableRow,
  TableCell,
  CircularProgress,
} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import Link from "next/link";
import { DetailItem } from "@/components/DetaisItem/DetaisItem";
import VisibilityIcon from "@mui/icons-material/Visibility";
import { Customer, CustomerFollowUpRow } from "@/lib/supabaseTypes";
import EditIcon from "@mui/icons-material/Edit";

export default function InstrumentDetails() {
  const { id } = useParams();
  const supabase = createClient();
  const router = useRouter();
  const [data, setData] = useState<Customer | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [activeTab, setActiveTab] = useState(0);
  const [followUps, setFollowUps] = useState<CustomerFollowUpRow[]>([]);
  const [loadingFollowUps, setLoadingFollowUps] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      const { data, error } = await supabase
        .from("customer")
        .select("*")
        .eq("id", Number(id))
        .single();

      if (error) {
        console.error(error);
        setError("داده‌ای یافت نشد!");
      } else {
        setData(data);
      }
      setLoading(false);
    };

    fetchData();
  }, [id]);

  useEffect(() => {
    if (data?.id) {
      const fetchFollowUps = async () => {
        const { data: followUpsData, error } = await supabase
          .from("customer_follow_ups")
          .select("*")
          .eq("customer_id", data.id)
          .order("created_at", { ascending: false });

        if (!error) setFollowUps(followUpsData || []);
        setLoadingFollowUps(false);
      };
      fetchFollowUps();
    }
  }, [data?.id]);

  const handleDelete = async () => {
    if (!confirm("آیا مطمئن هستید که می‌خواهید این مورد را حذف کنید؟")) return;

    try {
      const {
        data: { user },
      } = await supabase.auth.getUser();

      const { data, error } = await supabase
        .from("customer")
        .delete()
        .eq("id", Number(id))
        .eq("user_id", user?.id);
      console.log("data", data);
      console.log("error", error);
      if (error) throw new Error(error.message);

      alert("با موفقیت حذف شد!");
      router.push("/instruments/list");
      router.refresh();
    } catch (err) {
      console.error("Delete Error Details:", err);
      setError(
        err instanceof Error
          ? `خطا در حذف: ${err.message} (کد: ${err.name})`
          : "خطای ناشناخته در حذف رخ داده است"
      );
    }
  };

  if (loading) return <p>در حال بارگذاری...</p>;
  if (!data) return <p>{error || "داده‌ای یافت نشد!"}</p>;

  return (
    <Container
      maxWidth="lg"
      sx={{ py: 4, direction: "rtl", backgroundColor: "#eee" }}
    >
      <Button
        variant="contained"
        startIcon={<EditIcon />}
        component={Link}
        href={`/instruments/${data.id}/edit`}
        sx={{ mb: 2 }}
      >
        ویرایش اطلاعات
      </Button>
      <Tabs
        value={activeTab}
        onChange={(_, newValue) => setActiveTab(newValue)}
        sx={{ mb: 3 }}
      >
        <Tab
          label={
            <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
              اطلاعات اصلی
              <Chip
                label="1"
                size="small"
                sx={{ bgcolor: "primary.main", color: "white" }}
              />
            </Box>
          }
        />
        <Tab
          label={
            <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
              پیگیری‌ها
              <Chip
                label={followUps.length}
                size="small"
                sx={{ bgcolor: "secondary.main", color: "white" }}
              />
            </Box>
          }
        />
      </Tabs>

      {activeTab === 0 && (
        <Paper
          elevation={3}
          sx={{
            p: 4,
            background: `linear-gradient(45deg, #001e3c 0%, #000a12 100%)`,
            color: "#fff",
            position: "relative",
            overflow: "hidden",
            "&:before": {
              content: '""',
              position: "absolute",
              top: -50,
              right: -50,
              width: 120,
              height: 120,
              background:
                "radial-gradient(circle, #00ff88 0%, transparent 70%)",
              opacity: 0.1,
            },
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
                bottom: -10,
                right: 0,
                width: "60%",
                height: "3px",
                background:
                  "linear-gradient(90deg, #00ff88 0%, transparent 100%)",
              },
            }}
          >
            جزئیات ثبت شماره {data.id}
          </Typography>
          <Divider sx={{ my: 3 }} />

          <Grid2
            container
            spacing={3}
            sx={{
              "& .MuiGrid-root": {
                padding: "16px",
                borderRadius: "8px",
                background: "rgba(255, 255, 255, 0.03)",
                transition: "all 0.3s ease",
                "&:hover": {
                  background: "rgba(255, 255, 255, 0.05)",
                  transform: "translateX(5px)",
                },
              },
            }}
          >
            <Grid2 size={6}>
              <Typography variant="h6" color="primary" gutterBottom>
                اطلاعات پایه
              </Typography>
              <DetailItem label="نام مشتری" value={data.customer_name} />
              <DetailItem label="نام تجاری" value={data.brand_name} />
              <DetailItem label="نوع مشتری" value={data.customer_type} />
            </Grid2>

            <Grid2 size={6}>
              <Typography variant="h6" color="primary" gutterBottom>
                اطلاعات سازمانی
              </Typography>
              <DetailItem label="نوع سازمان" value={data.organization_type} />
              <DetailItem label="مدل سازمان" value={data.organization_model} />
              <DetailItem label="تعداد پرسنل" value={data.number_personnel} />
            </Grid2>

            <Grid2 size={12}>
              <Typography variant="h6" color="primary" gutterBottom>
                اطلاعات مالی
              </Typography>
              <Grid2 container spacing={2}>
                <Grid2 size={6}>
                  <DetailItem label="کد اقتصادی" value={data.economic_code} />
                </Grid2>
                <Grid2 size={6}>
                  <DetailItem label="کد ثبتی" value={data.registration_code} />
                </Grid2>
                <Grid2 size={6}>
                  <DetailItem label="شناسه ملی" value={data.national_id} />
                </Grid2>
                <Grid2 size={6}>
                  <DetailItem
                    label="معرف دارد"
                    value={data.has_reagent ? "✅ بله" : "❌ خیر"}
                  />
                </Grid2>
              </Grid2>
            </Grid2>

            {data.reagent && (
              <Grid2 size={12}>
                <Typography variant="h6" color="primary" gutterBottom>
                  اطلاعات معرف
                </Typography>
                <DetailItem label="نام معرف" value={data.reagent} />
              </Grid2>
            )}
          </Grid2>

          <Divider sx={{ my: 3 }} />
          <Box
            sx={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            <Typography
              variant="caption"
              color="textSecondary"
              sx={{ color: "#fff" }}
            >
              تاریخ ثبت:{" "}
              {data.created_at
                ? new Date(data.created_at).toLocaleDateString("fa-IR", {
                    year: "numeric",
                    month: "long",
                    day: "numeric",
                    hour: "2-digit",
                    minute: "2-digit",
                  })
                : "---"}
            </Typography>

            <Button
              variant="contained"
              color="error"
              startIcon={<DeleteIcon />}
              sx={{
                mt: 3,
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
      )}

      {activeTab === 1 && (
        <Box sx={{ mt: 2 }}>
          <Paper
            elevation={3}
            sx={{
              p: 4,
              background: `linear-gradient(45deg, #001e3c 0%, #000a12 100%)`,
              color: "#fff",
              position: "relative",
              overflow: "hidden",
              "&:before": {
                content: '""',
                position: "absolute",
                top: -50,
                right: -50,
                width: 120,
                height: 120,
                background:
                  "radial-gradient(circle, #00ff88 0%, transparent 70%)",
                opacity: 0.1,
              },
            }}
          >
            <Typography
              variant="h5"
              sx={{
                color: "primary.main",
                mb: 3,
                fontWeight: "bold",
                position: "relative",
                "&:after": {
                  content: '""',
                  position: "absolute",
                  bottom: -10,
                  right: 0,
                  width: "60%",
                  height: "3px",
                  background:
                    "linear-gradient(90deg, #00ff88 0%, transparent 100%)",
                },
              }}
            >
              لیست پیگیری‌ها ({followUps.length})
            </Typography>

            {loadingFollowUps ? (
              <Box sx={{ display: "flex", justifyContent: "center", py: 4 }}>
                <CircularProgress sx={{ color: "primary.main" }} />
              </Box>
            ) : (
              <TableContainer>
                <Table
                  sx={{
                    "& .MuiTableCell-root": {
                      borderColor: "rgba(255, 255, 255, 0.12)",
                    },
                  }}
                >
                  <TableHead>
                    <TableRow>
                      <TableCell
                        sx={{ color: "primary.main", fontWeight: "bold" }}
                      >
                        عملیات
                      </TableCell>
                      <TableCell
                        sx={{ color: "primary.main", fontWeight: "bold" }}
                      >
                        تاریخ پیگیری
                      </TableCell>
                      <TableCell
                        sx={{ color: "primary.main", fontWeight: "bold" }}
                      >
                        نوع پیگیری
                      </TableCell>
                      <TableCell
                        sx={{ color: "primary.main", fontWeight: "bold" }}
                      >
                        شرح
                      </TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {followUps.map((followUp) => (
                      <TableRow
                        key={followUp.id}
                        sx={{
                          "&:hover": {
                            bgcolor: "rgba(0, 255, 136, 0.05)",
                          },
                        }}
                      >
                        <TableCell>
                          <IconButton
                            component={Link}
                            href={`/customer-follow-ups/${followUp.id}`}
                            sx={{ color: "primary.main" }}
                          >
                            <VisibilityIcon />
                          </IconButton>
                        </TableCell>
                        <TableCell sx={{ color: "#fff" }}>
                          {followUp.next_follow_up_date
                            ? new Date(
                                followUp.next_follow_up_date
                              ).toLocaleDateString("fa-IR")
                            : "---"}
                        </TableCell>
                        <TableCell sx={{ color: "#fff" }}>
                          {followUp.tracking_type}
                        </TableCell>
                        <TableCell sx={{ color: "#fff" }}>
                          {followUp.follow_up_description}
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </TableContainer>
            )}

            <Button
              variant="contained"
              sx={{
                mt: 3,
                bgcolor: "primary.main",
                color: "#000",
                "&:hover": {
                  bgcolor: "primary.dark",
                  boxShadow: "0 4px 16px rgba(0, 255, 136, 0.3)",
                },
              }}
              component={Link}
              href={`/customer-follow-ups?customerId=${data.id}`}
            >
              افزودن پیگیری جدید
            </Button>
          </Paper>
        </Box>
      )}
    </Container>
  );
}
