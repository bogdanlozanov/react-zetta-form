import { Container, Typography, Box } from "@mui/material";
import { useJsonInputForm } from "./useJsonInputForm";
import { JsonInputField } from "./JsonInputField";

export const FormBuilderInput = () => {
  const { control } = useJsonInputForm();

  return (
    <Container maxWidth="md">
      <Box sx={{ mt: 6 }}>
        <Typography variant="h6" align="center" gutterBottom>
          Dynamic Form Schema (JSON)
        </Typography>
        <JsonInputField control={control} />
      </Box>
    </Container>
  );
};
