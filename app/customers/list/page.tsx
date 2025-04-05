"use client";
import { useEffect, useState } from "react";
import { createClient } from "@/utils/supabase/client";
import Link from "next/link";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  IconButton,
  Button,
  Typography,
  Box,
} from "@mui/material";
import VisibilityIcon from "@mui/icons-material/Visibility";
import { Database } from "@/lib/supabaseTypes";
import { PageContainer } from "@toolpad/core/PageContainer";
import ErrorMessage from "@/components/ErrorMessage/ErrorMessage";
import Loading from "@/components/Loading/Loading";

export default function CustomersList() {
  const supabase = createClient();
  const [customers, setCustomers] = useState<
    Database["public"]["Tables"]["customer"]["Row"][]
  >([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const {
          data: { user },
        } = await supabase.auth.getUser();
        if (!user) throw new Error("لطفا وارد شوید");

        const { data, error } = await supabase
          .from("customer")
          .select("*")
          .order("created_at", { ascending: false });

        if (error) throw error;
        setCustomers(data || []);
      } catch (err) {
        setError(err instanceof Error ? err.message : "Unknown error");
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  if (loading) return <Loading />;
  if (error) return <ErrorMessage message={`خطا: ${error}`} />;
  return (
    <PageContainer
      title="لیست مشتریان"
      sx={{ direction: "rtl", marginTop: "50px" }}
    >
      <div dir="rtl" style={{ marginBottom: "1rem" }}>
        <Button
          component={Link}
          variant="contained"
          color="primary"
          href={"/customers"}
        >
          فرم ثبت مشتری
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
            fontFamily: "'Vazirmatn', sans-serif",
          },
        }}
      >
        <Table
          sx={{
            "& .MuiTableCell-root": {
              textAlign: "right",
              direction: "rtl",
            },
            "& .MuiTableCell-head": {
              color: "primary.main",
              fontSize: "1.1rem",
              borderBottom: "2px solid #fff",
            },
          }}
        >
          <TableHead>
            <TableRow>
              <TableCell
                align="right"
                sx={{ fontWeight: "bold", fontSize: 16 }}
              >
                عملیات
              </TableCell>

              <TableCell
                align="right"
                sx={{ fontWeight: "bold", fontSize: 16 }}
              >
                نام مشتری
              </TableCell>
              <TableCell
                align="right"
                sx={{ fontWeight: "bold", fontSize: 16 }}
              >
                نام تجاری
              </TableCell>
              <TableCell
                align="right"
                sx={{ fontWeight: "bold", fontSize: 16 }}
              >
                نوع سازمان
              </TableCell>
              <TableCell
                align="right"
                sx={{ fontWeight: "bold", fontSize: 16 }}
              >
                تاریخ ثبت
              </TableCell>
            </TableRow>
          </TableHead>

          <TableBody>
            {customers.map((item) => (
              <TableRow
                key={item.id}
                hover
                sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
              >
                <TableCell align="right">
                  <IconButton
                    component={Link}
                    href={`/customers/${item.id}`}
                    color="primary"
                    aria-label="مشاهده جزئیات"
                  >
                    <VisibilityIcon />
                  </IconButton>
                </TableCell>
                <TableCell align="right">{item.customer_name}</TableCell>
                <TableCell align="right">{item.brand_name}</TableCell>
                <TableCell align="right">{item.organization_type}</TableCell>

                <TableCell align="right" sx={{ direction: "rtl" }}>
                  {item.created_at
                    ? new Date(item.created_at).toLocaleDateString("fa-IR", {
                        year: "numeric",
                        month: "long",
                        day: "numeric",
                      })
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
