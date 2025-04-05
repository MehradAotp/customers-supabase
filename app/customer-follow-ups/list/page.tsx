"use client";
import ErrorMessage from "@/components/ErrorMessage/ErrorMessage";
import Loading from "@/components/Loading/Loading";
import { CustomerFollowUpRow } from "@/lib/supabaseTypes";
import { createClient } from "@/utils/supabase/client";
import VisibilityIcon from "@mui/icons-material/Visibility";
import {
  Button,
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
        if (!user) throw new Error("لطفا وارد شوید");

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

  if (loading) return <Loading />;

  if (error) return <ErrorMessage message={`خطا: ${error}`} />;

  return (
    <PageContainer title="لیست پیگیری‌ها" sx={{ direction: "rtl" }}>
      <div dir="rtl" style={{ marginBottom: "1rem" }}>
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
          direction: "rtl",
          "& .MuiTable-root": {
            direction: "rtl",
          },
          "& .MuiTableCell-root": {
            textAlign: "right",
          },
        }}
      >
        <Table
          sx={{
            "& .MuiTableCell-head": {
              color: "primary.main",
              fontSize: "1.1rem",
              borderBottom: "2px solid #fff",
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
                    <TableCell align="right">{item.contract}</TableCell>
                    <TableCell align="right">
                      {customers.find((c) => c.id === item.customer_id)
                        ?.customer_name || "نامشخص"}
                    </TableCell>
                    <TableCell align="right">{item.interface_name}</TableCell>
                    <TableCell align="right">{item.contract_type}</TableCell>
                    <TableCell align="right">{item.tracking_type}</TableCell>
                    <TableCell align="right">
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
                    <TableCell align="right">
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
