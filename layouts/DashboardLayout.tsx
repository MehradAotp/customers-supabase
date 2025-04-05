"use client";
import BarChartIcon from "@mui/icons-material/BarChart";
import DashboardIcon from "@mui/icons-material/Dashboard";
import DescriptionIcon from "@mui/icons-material/Description";
import LayersIcon from "@mui/icons-material/Layers";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import { Navigation } from "@toolpad/core/AppProvider";
import { DashboardLayout } from "@toolpad/core/DashboardLayout";
import { NextAppProvider } from "@toolpad/core/nextjs";
import * as React from "react";
import { faIR } from "@mui/material/locale";
import { Box, IconButton } from "@mui/material";
import { CacheProvider } from "@emotion/react";
import rtlCache from "@/lib/rtlCache";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";
import { LightMode, DarkMode } from "@mui/icons-material";

const NAVIGATION: Navigation = [
  {
    kind: "header",
    title: "موارد اصلی",
  },
  {
    segment: "",
    title: "داشبورد",
    icon: <DashboardIcon />,
  },
  {
    segment: "orders",
    title: "سفارشات",
    icon: <ShoppingCartIcon />,
  },
  {
    kind: "divider",
  },
  {
    kind: "header",
    title: "تحلیل‌ها",
  },
  {
    segment: "reports",
    title: "گزارشات",
    icon: <BarChartIcon />,
    children: [
      {
        segment: "sales",
        title: "فروش",
        icon: <DescriptionIcon />,
      },
      {
        segment: "traffic",
        title: "ترافیک",
        icon: <DescriptionIcon />,
      },
    ],
  },
  {
    segment: "customers/list",
    title: "مشتری ها",
    icon: <LayersIcon />,
    pattern: "customers{/:segment}*",
  },
  {
    segment: "customer-follow-ups/list",
    title: "پیگیری ها",
    icon: <LayersIcon />,
    pattern: "customer-follow-ups{/:segment}*",
  },
];

// const demoTheme = extendTheme(
//   {
//     direction: "rtl",
//     typography: {
//       fontFamily: "'Vazirmatn', sans-serif",
//     },
//     components: {
//       MuiTypography: {
//         defaultProps: { fontFamily: "'Vazirmatn', sans-serif" },
//       },
//       MuiTable: {
//         styleOverrides: { root: { direction: "rtl" } },
//       },
//       MuiAppBar: {
//         styleOverrides: { root: { left: "auto", right: 0 } },
//       },
//     },
//   },
//   faIR
// );

export interface DashboardLayoutBasicProps {
  children?: React.ReactNode;
  toolbarActions: React.ReactNode;
}

export default function DashboardLayoutBasic({
  children,
  toolbarActions,
}: DashboardLayoutBasicProps) {
  const [mode, setMode] = React.useState<"light" | "dark">("dark");

  const theme = React.useMemo(
    () =>
      createTheme(
        {
          direction: "rtl",
          palette: {
            mode,
          },
          typography: {
            fontFamily: "'Vazirmatn', sans-serif",
          },
          components: {
            MuiTableCell: {
              styleOverrides: {
                root: {
                  textAlign: "right",
                },
              },
            },
            MuiTable: {
              styleOverrides: {
                root: {
                  direction: "rtl",
                },
              },
            },
            MuiAppBar: {
              styleOverrides: {
                root: {
                  left: "auto",
                  right: 0,
                },
              },
            },
            MuiFormControl: {
              styleOverrides: {
                root: {
                  direction: "rtl",
                },
              },
            },
            MuiInputBase: {
              styleOverrides: {
                root: {
                  textAlign: "right",
                },
              },
            },
          },
        },
        faIR
      ),
    [mode]
  );

  return (
    <CacheProvider value={rtlCache}>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <NextAppProvider navigation={NAVIGATION} theme={theme}>
          <Box sx={{ order: 2, ml: 2 }}>
            <DashboardLayout
              branding={{
                homeUrl: "/",
                logo: "",
                title: "مدیریت مشتریان",
              }}
              slots={{
                toolbarActions: () => (
                  <Box sx={{ display: "flex", gap: 2, ml: "auto" }}>
                    <IconButton
                      onClick={() =>
                        setMode((prev) => (prev === "light" ? "dark" : "light"))
                      }
                      color="inherit"
                    >
                      {mode === "dark" ? <LightMode /> : <DarkMode />}
                    </IconButton>
                    {toolbarActions}
                  </Box>
                ),
              }}
            >
              {children}
            </DashboardLayout>
          </Box>
        </NextAppProvider>
      </ThemeProvider>
    </CacheProvider>
  );
}
