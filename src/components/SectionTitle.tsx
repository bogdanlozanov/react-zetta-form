import { Typography, useTheme } from "@mui/material";

type Props = {
  text: string;
  level?: "h1" | "h2" | "h3" | "h4" | "h5";
};

export const SectionTitle = ({ text, level = "h5" }: Props) => {
  const theme = useTheme();

  return (
    <Typography
      variant={level}
      component={level}
      align="center"
      sx={{
        fontWeight: theme.typography.fontWeightBold,
        mb: theme.spacing(3)
      }}
    >
      {text}
    </Typography>
  );
};
