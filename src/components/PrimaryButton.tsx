import { Button, type ButtonProps, useTheme } from "@mui/material";

export const PrimaryButton = (props: ButtonProps) => {
  const theme = useTheme();

  return (
    <Button
      variant="contained"
      color="primary"
      sx={{
        borderRadius: theme.shape.borderRadius,
        px: 3,
        py: 1.5,
        fontWeight: theme.typography.fontWeightMedium
      }}
      {...props}
    />
  );
};
