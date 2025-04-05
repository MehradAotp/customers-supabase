import { Typography } from "@mui/material";
import { Customer } from "@/lib/supabaseTypes";

export const DetailItem = ({
  label,
  value,
}: {
  label: string;
  value: Customer[keyof Customer];
}) => (
  <div
    style={{
      marginBottom: "1.5rem",
      padding: "1rem",
      borderRadius: "8px",
      background: "rgba(255, 255, 255, 0.03)",
      transition: "all 0.3s ease",
    }}
  >
    <Typography variant="subtitle2" color="textSecondary">
      {label}:
    </Typography>
    <Typography
      variant="body1"
      sx={{
        fontWeight: 500,
        mt: 1,
      }}
    >
      {value || "---"}
    </Typography>
  </div>
);
