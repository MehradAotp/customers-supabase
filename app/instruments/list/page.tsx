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
  Typography,
  Container,
  IconButton,
} from "@mui/material";
import VisibilityIcon from "@mui/icons-material/Visibility";
import { Database } from "@/lib/supabaseTypes";

export default function InstrumentsList() {
  const supabase = createClient();
  const [instruments, setInstruments] = useState<
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
        if (!user) throw new Error("Not authenticated");

        const { data, error } = await supabase
          .from("customer")
          .select("*")
          .order("created_at", { ascending: false });

        if (error) throw error;
        setInstruments(data || []);
      } catch (err) {
        setError(err instanceof Error ? err.message : "Unknown error");
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error}</p>;

  return (
    <Container
      maxWidth="xl"
      sx={{
        py: 4,
        direction: "rtl",
        background: "#eee",
        minHeight: "100vh",
        backgroundColor: "#eee",
      }}
    >
      <Typography
        variant="h3"
        sx={{
          color: "primary.main",
          mb: 4,
          textAlign: "center",
          fontWeight: "bold",
          textShadow: "0 2px 8px rgba(0, 255, 136, 0.2)",
        }}
      >
        لیست مشتریان
      </Typography>

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
            {instruments.map((item) => (
              <TableRow
                key={item.id}
                hover
                sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
              >
                <TableCell align="right">
                  <IconButton
                    component={Link}
                    href={`/instruments/${item.id}`}
                    color="primary"
                    aria-label="مشاهده جزئیات"
                  >
                    <VisibilityIcon />
                  </IconButton>
                </TableCell>
                <TableCell align="right" sx={{ color: "#00FF88" }}>
                  {item.customer_name}
                </TableCell>
                <TableCell align="right" sx={{ color: "#00FF88" }}>
                  {item.brand_name}
                </TableCell>
                <TableCell align="right" sx={{ color: "#00FF88" }}>
                  {item.organization_type}
                </TableCell>

                <TableCell
                  align="right"
                  sx={{ direction: "rtl", color: "#00FF88" }}
                >
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
    </Container>
  );
}
