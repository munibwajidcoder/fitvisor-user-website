"use client";

import Image from "next/image";
import Link from "next/link";

interface LogoProps {
  className?: string;
  size?: "sm" | "md" | "lg" | "xl";
  height?: number;
  showSubtitle?: boolean;
  href?: string;
}

export default function Logo({ size = "md", height: customHeight, showSubtitle = false, className = "", href = "/" }: LogoProps) {
  // Height based on size
  const height = customHeight ?? (size === "sm" ? 24 : size === "lg" ? 38 : size === "xl" ? 44 : 32);
  // Aspect ratio 780 x 168 = 4.643
  const width = Math.round(height * 4.643);

  return (
    <Link 
      href={href} 
      className={`fitvisor-brand-logo ${className}`} 
      style={{ 
        display: "inline-flex", 
        flexDirection: "column", 
        textDecoration: "none", 
        flexShrink: 0,
        alignItems: "flex-start",
        justifyContent: "center"
      }}
    >
      <Image
        src="/images/fitvisor_logo.png"
        alt="FitVisor Logo"
        width={width}
        height={height}
        priority
        style={{
          height: `${height}px`,
          width: "auto",
          maxWidth: "100%",
          display: "block",
          objectFit: "contain",
        }}
      />

      {showSubtitle && (
        <span
          style={{
            fontSize: size === "sm" ? "8.5px" : "10px",
            fontWeight: 600,
            letterSpacing: "0.04em",
            color: "#64748b",
            marginTop: "3px",
            paddingLeft: "2px",
          }}
        >
          Try. Explore. Find your style.
        </span>
      )}
    </Link>
  );
}
