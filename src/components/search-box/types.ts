import React from "react";
import { ButtonVariant } from "@/components/button/type";

export type SearchBoxProps = {
  className?: string;
  buttonTitle?: string;
  buttonIcon?: React.ReactNode;
  trigerButtonClass?: string;
  triggerButtonVariant?: ButtonVariant;
  trigerButtonJustifyContent?: string;
  placeholder?: string;
  show?: boolean | null;
  onShowCallback?: () => void;
  onCloseCallback?: () => void;
};
