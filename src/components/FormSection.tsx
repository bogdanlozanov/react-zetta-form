import { Paper, useTheme } from "@mui/material";
import type { ReactNode } from "react";

export const FormSection = ({ children }: { children: ReactNode }) => {
  const theme = useTheme();

  return (
    <Paper
      elevation={1}
      sx={{
        p: theme.spacing(4),
        borderRadius: theme.shape.borderRadius,
        bgcolor: theme.palette.background.paper
      }}
    >
      {children}
    </Paper>
  );
};
