/// <reference types="vite/client" />

declare module "react-compare-image" {
  import type { ComponentType, CSSProperties } from "react";

  export interface ReactCompareImageProps {
    leftImage: string;
    rightImage: string;
    leftImageAlt?: string;
    rightImageAlt?: string;
    leftImageLabel?: string;
    rightImageLabel?: string;
    leftImageCss?: CSSProperties;
    rightImageCss?: CSSProperties;
    sliderLineColor?: string;
    sliderLineWidth?: number;
    sliderPositionPercentage?: number;
    handle?: React.ReactNode;
    handleSize?: number;
    hover?: boolean;
    aspectRatio?: "taller" | "wider";
    skeleton?: React.ReactNode;
    onSliderPositionChange?: (position: number) => void;
    vertical?: boolean;
  }

  const ReactCompareImage: ComponentType<ReactCompareImageProps>;
  export default ReactCompareImage;
}
