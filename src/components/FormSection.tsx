import { Paper, useTheme } from "@mui/material";
import type { ReactNode } from "react";

type Props = {
  children: ReactNode;
};

export const FormSection = ({ children }: Props) => {
  const theme = useTheme();

  return (
    <Paper
      elevation={1}
      sx={{
        backgroundColor: theme.palette.grey[50],
        padding: theme.spacing(4),
        borderRadius: theme.shape.borderRadius,
        marginTop: theme.spacing(2),
      }}
    >
      {children}
    </Paper>
  );
};
