"use client";
import { CustomerFollowUpRow } from "@/lib/supabaseTypes";
import { createClient } from "@/utils/supabase/client";
import VisibilityIcon from "@mui/icons-material/Visibility";
import {
  Box,
  Button,
  CircularProgress,
  IconButton,
  Paper,
  Skeleton,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
} from "@mui/material";
import { PageContainer } from "@toolpad/core/PageContainer";
import Link from "next/link";
import { useEffect, useState } from "react";

export default function CustomerFollowUpsList() {
  const supabase = createClient();
  const [followUps, setFollowUps] = useState<CustomerFollowUpRow[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [customers, setCustomers] = useState<
    { id: number; customer_name: string }[]
  >([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const {
          data: { user },
        } = await supabase.auth.getUser();
        if (!user) throw new Error("Not authenticated");

        const { data, error } = await supabase
          .from("customer_follow_ups")
          .select("*")
          .order("created_at", { ascending: false });

        if (error) throw error;
        setFollowUps(data || []);

        const fetchCustomers = async () => {
          try {
            const { data } = await supabase
              .from("customer")
              .select("id, customer_name");
            setCustomers(
              (data || []).map((c) => ({
                ...c,
                customer_name: c.customer_name || "نامشخص",
              }))
            );
          } catch (err) {
            console.error("Error fetching customers:", err);
          }
        };
        await fetchCustomers();
      } catch (err) {
        setError(err instanceof Error ? err.message : "خطای نامشخص");
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

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

  if (error)
    return (
      <Typography sx={{ textAlign: "center", mt: 4, color: "error.main" }}>
        خطا: {error}
      </Typography>
    );

  return (
    <PageContainer title="لیست پیگیری‌ها">
      <div>
        <Button
          component={Link}
          variant="contained"
          color="primary"
          href={"/customer-follow-ups"}
        >
          فرم ثبت پیگیری
        </Button>
      </div>
      <TableContainer
        component={Paper}
        sx={{
          bgcolor: "rgba(0, 30, 60, 0.9)",
          backdropFilter: "blur(16px)",
          border: "1px solid rgba(255, 255, 255, 0.12)",
        }}
      >
        <Table
          sx={{
            "& .MuiTableCell-head": {
              color: "primary.main",
              fontSize: "1.1rem",
              borderBottom: "2px solid #00ff88",
            },
            "& .MuiTableRow-root:hover": {
              bgcolor: "rgba(0, 255, 136, 0.05)",
            },
          }}
        >
          <TableHead>
            <TableRow>
              {[
                "عملیات",
                "قرارداد",
                "مشتری",
                "نام رابط",
                "نوع قرارداد",
                "نوع پیگیری",
                "تاریخ اقدام",
                "تاریخ پیگیری بعدی",
              ].map((header, index) => (
                <TableCell
                  key={index}
                  align="right"
                  sx={{ fontWeight: "bold", fontSize: 16 }}
                >
                  {header}
                </TableCell>
              ))}
            </TableRow>
          </TableHead>

          <TableBody>
            {followUps.length === 0
              ? [...Array(5)].map((_, index) => (
                  <TableRow key={index}>
                    {Array(8)
                      .fill(0)
                      .map((_, idx) => (
                        <TableCell key={idx} align="right">
                          <Skeleton variant="text" width="80%" height={30} />
                        </TableCell>
                      ))}
                  </TableRow>
                ))
              : followUps.map((item) => (
                  <TableRow
                    key={item.id}
                    hover
                    sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                  >
                    <TableCell align="right">
                      <IconButton
                        component={Link}
                        href={`/customer-follow-ups/${item.id}`}
                        color="primary"
                        aria-label="مشاهده جزئیات"
                      >
                        <VisibilityIcon />
                      </IconButton>
                    </TableCell>
                    <TableCell align="right" sx={{ color: "#00FF88" }}>
                      {item.contract}
                    </TableCell>
                    <TableCell align="right" sx={{ color: "#00FF88" }}>
                      {customers.find((c) => c.id === item.customer_id)
                        ?.customer_name || "نامشخص"}
                    </TableCell>
                    <TableCell align="right" sx={{ color: "#00FF88" }}>
                      {item.interface_name}
                    </TableCell>
                    <TableCell align="right" sx={{ color: "#00FF88" }}>
                      {item.contract_type}
                    </TableCell>
                    <TableCell align="right" sx={{ color: "#00FF88" }}>
                      {item.tracking_type}
                    </TableCell>
                    <TableCell align="right" sx={{ color: "#00FF88" }}>
                      {item.created_at
                        ? new Date(item.created_at).toLocaleDateString(
                            "fa-IR",
                            {
                              year: "numeric",
                              month: "2-digit",
                              day: "2-digit",
                            }
                          )
                        : "---"}
                    </TableCell>
                    <TableCell align="right" sx={{ color: "#00FF88" }}>
                      {item.next_follow_up_date
                        ? new Date(item.next_follow_up_date).toLocaleDateString(
                            "fa-IR"
                          )
                        : "---"}
                    </TableCell>
                  </TableRow>
                ))}
          </TableBody>
        </Table>
      </TableContainer>
    </PageContainer>
  );
}
