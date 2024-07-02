import React, { ReactNode } from "react";
import { Box, BoxProps } from "@mui/material";

interface BackgroundImageProps extends BoxProps {
  imageUrl: string;
  height: string;
  top?: string;
  boxShadow?: string;
  backgroundSize?: string;
  backgroundPosition?: string;
  overflow?: string;
  children?: ReactNode;
}

const BackgroundImage: React.FC<BackgroundImageProps> = ({
  imageUrl,
  height,
  top = "0",
  boxShadow,
  backgroundSize = "cover",
  backgroundPosition = "center bottom",
  overflow = "hidden",
  children,
  sx,
  ...otherProps
}) => {
  const styles: React.CSSProperties = {
    position: "absolute",
    left: 0,
    right: 0,
    width: "100%",
    height: height,
    backgroundImage: `url(${imageUrl})`,
    backgroundSize: backgroundSize,
    backgroundPosition: backgroundPosition,
    overflow: overflow,
    top: top,
    boxShadow: boxShadow,
    ...(sx as React.CSSProperties),
  };

  return (
    <Box sx={styles} {...otherProps}>
      {children}
    </Box>
  );
};

export default BackgroundImage;
