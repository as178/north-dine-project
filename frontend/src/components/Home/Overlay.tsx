// GradientOverlay.tsx
import React, { ReactNode } from "react";
import { Box } from "@mui/material";

interface GradientOverlayProps {
  colors: string;
  backgroundSize?: string;
  backgroundPosition?: string;
  overflow?: string;
  children?: ReactNode;
}

const GradientOverlay: React.FC<GradientOverlayProps> = ({
  colors,
  backgroundSize = "cover",
  backgroundPosition = "center bottom",
  overflow = "hidden",
  children,
}) => {
  const styles = {
    position: "absolute",
    width: "100%",
    height: "100%",
    background: colors,
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    color: "white",
    textAlign: "center",
    overflowY: "auto",
    backgroundSize: backgroundSize,
    backgroundPosition: backgroundPosition,
    overflow: overflow,
  };

  return <Box sx={styles}>{children}</Box>;
};

export default GradientOverlay;
