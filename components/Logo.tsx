"use client";

import Link from "next/link";

interface LogoProps {
  className?: string;
  size?: "sm" | "md" | "lg";
  showSubtitle?: boolean;
}

export default function Logo({ size = "md", showSubtitle = false, className = "" }: LogoProps) {
  // Scaling factors
  const height = size === "sm" ? 34 : size === "lg" ? 52 : 42;
  const width = Math.round(height * 3.8);

  return (
    <Link href="/" className={`fitvisor-brand-logo ${className}`} style={{ display: "inline-flex", flexDirection: "column", textDecoration: "none" }}>
      <svg
        width={width}
        height={height}
        viewBox="0 0 360 90"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        style={{ display: "block", overflow: "visible" }}
      >
        {/* Rounded square container with red border */}
        <rect
          x="4"
          y="4"
          width="82"
          height="82"
          rx="22"
          fill="#FFFFFF"
          stroke="#E53E42"
          strokeWidth="5"
        />

        {/* Top navy bar of the 'F' emblem */}
        <path
          d="M 19 22 H 71 L 62 36 H 27 Z"
          fill="#1C2243"
        />

        {/* Middle navy bar */}
        <path
          d="M 31 43 H 62 L 54 55 H 31 Z"
          fill="#1C2243"
        />

        {/* Bottom coral-red triangle */}
        <path
          d="M 37 62 H 51 L 51 80 Z"
          fill="#E53E42"
        />

        {/* Text "Fit" in Coral Red */}
        <text
          x="100"
          y="65"
          fontFamily="system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Outfit', 'Inter', sans-serif"
          fontSize="64"
          fontWeight="800"
          letterSpacing="-0.03em"
          fill="#E53E42"
        >
          Fit
        </text>

        {/* Text "Visor" in Deep Navy */}
        <text
          x="188"
          y="65"
          fontFamily="system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Outfit', 'Inter', sans-serif"
          fontSize="64"
          fontWeight="800"
          letterSpacing="-0.03em"
          fill="#1C2243"
        >
          Visor
        </text>
      </svg>

      {showSubtitle && (
        <span
          style={{
            fontSize: size === "sm" ? "8px" : "9.5px",
            fontWeight: 600,
            letterSpacing: "0.08em",
            color: "#556275",
            marginTop: "3px",
            paddingLeft: size === "sm" ? "70px" : "100px",
          }}
        >
          Try. Explore. Find your style.
        </span>
      )}
    </Link>
  );
}
