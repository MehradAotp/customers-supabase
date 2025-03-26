"use client";
import BarChartIcon from "@mui/icons-material/BarChart";
import DashboardIcon from "@mui/icons-material/Dashboard";
import DescriptionIcon from "@mui/icons-material/Description";
import LayersIcon from "@mui/icons-material/Layers";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import { Stack } from "@mui/material";
import { extendTheme } from "@mui/material/styles";
import { Navigation } from "@toolpad/core/AppProvider";
import { DashboardLayout, ThemeSwitcher } from "@toolpad/core/DashboardLayout";
import { NextAppProvider } from "@toolpad/core/nextjs";
import * as React from "react";

const NAVIGATION: Navigation = [
  {
    kind: "header",
    title: "Main items",
  },
  {
    segment: "",
    title: "Dashboard",
    icon: <DashboardIcon />,
  },
  {
    segment: "orders",
    title: "Orders",
    icon: <ShoppingCartIcon />,
  },
  {
    kind: "divider",
  },
  {
    kind: "header",
    title: "Analytics",
  },
  {
    segment: "reports",
    title: "Reports",
    icon: <BarChartIcon />,
    children: [
      {
        segment: "sales",
        title: "Sales",
        icon: <DescriptionIcon />,
      },
      {
        segment: "traffic",
        title: "Traffic",
        icon: <DescriptionIcon />,
      },
    ],
  },
  {
    segment: "integrations",
    title: "Integrations",
    icon: <LayersIcon />,
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

const demoTheme = extendTheme({
  colorSchemes: { light: true, dark: true },
  colorSchemeSelector: "class",
  breakpoints: {
    values: {
      xs: 0,
      sm: 600,
      md: 600,
      lg: 1200,
      xl: 1536,
    },
  },
});

export interface DashboardLayoutBasicProps {
  children?: React.ReactNode;
  toolbarActions: React.ReactNode;
}

export default function DashboardLayoutBasic({
  children,
  toolbarActions,
}: DashboardLayoutBasicProps) {
  return (
    <NextAppProvider navigation={NAVIGATION} theme={demoTheme}>
      <DashboardLayout
        branding={{
          homeUrl: "/",
          logo: "",
          title: "مدیریت مشتریان",
        }}
        slots={{
          toolbarActions: () => (
            <>
              {toolbarActions}
              <ThemeSwitcher />
            </>
          ),
        }}
      >
        {children}
      </DashboardLayout>
    </NextAppProvider>
  );
}
