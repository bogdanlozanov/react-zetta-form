import { Container, Box, useTheme } from "@mui/material";
import type { ReactNode } from "react";

export const PageContainer = ({ children }: { children: ReactNode }) => {
  const theme = useTheme();

  return (
    <Container maxWidth="xl">
      <Box
        sx={{
          py: theme.spacing(6),
          display: "flex",
          flexDirection: "column",
          gap: theme.spacing(4)
        }}
      >
        {children}
      </Box>
    </Container>
  );
};
