"use client";
import Link from "next/link";
import { ButtonProps } from "./type";
import { clsx } from "clsx";

export const LinkButton = (props: ButtonProps) => {
  const {
    children,
    onClick,
    href,
    className: extendedClassName,
    variant = "primary",
    justifyContent = "justify-center",
    size = "lg",
    radius = "rounded-xl focus:rounded-xl",
    target = "",
    ...rest
  } = props;

  const variantClass = () => {
    if (variant === "primary") {
      return "bg-primary-100 hover:bg-primary-100/80 focus:outline-secondary-100";
    } else if (variant === "secondary") {
      return "bg-secondary-100 hover:bg-secondary-100/80 focus:outline-secondary-100";
    } else if (variant === "transparent") {
      return "bg-transparent border border-[#D1D1D1] focus:outline-secondary-100";
    } else {
      return "text-dark bg-white hover:bg-primary-100 border border-[#D1D1D1]";
    }
  };

  const getPaddingFromBtnSize = () => {
    if (size === "sm") {
      return "px-1.5 lg:px-3 py-1.5 lg:py-2";
    } else if (size === "md") {
      return "px-4 lg:px-6 py-3";
    } else if (size === "lg") {
      return "px-3 lg:px-7 py-1.5 lg:py-3.5";
    } else {
      return "px-3 lg:px-5 py-1.5 lg:py-3.5";
    }
  };

  return (
    <>
      <Link
        href={href}
        target={target}
        onClick={(e) => {
          onClick?.(e);
        }}
        className={clsx(
          "transition-all duration-300 ease-in-out text-background focus:outline-2 text-center flex items-center focus:outline-offset-2",
          justifyContent,
          radius,
          variantClass(),
          extendedClassName,
          getPaddingFromBtnSize()
        )}
        {...rest}
      >
        {children}
      </Link>
    </>
  );
};
