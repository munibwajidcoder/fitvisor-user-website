"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import Logo from "@/components/Logo";

export default function GeneratingPage() {
  const router = useRouter();
  const [progress, setProgress] = useState<number>(76);
  const [stepIndex, setStepIndex] = useState<number>(2); // 0, 1, 2 = Fitting mesh active, 3 = Calibrating

  // Animated progress simulation
  useEffect(() => {
    const timer = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(timer);
          setTimeout(() => {
            router.push("/digital-twin");
          }, 1200);
          return 100;
        }
        return prev + 1;
      });
    }, 180);

    return () => clearInterval(timer);
  }, [router]);

  useEffect(() => {
    if (progress > 88) {
      setStepIndex(3);
    }
  }, [progress]);

  const steps = [
    {
      title: "Analyzing biometric landmarks",
      tech: "(OpenPose / MediaPipe)",
    },
    {
      title: "Segmenting body contours",
      tech: "(SAM & YOLO)",
    },
    {
      title: "Fitting 3D parametric body mesh to measurements",
      tech: "",
    },
    {
      title: "Calibrating textures and privacy anonymity mode",
      tech: "",
    },
  ];

  return (
    <div className="gen-page-wrapper">
      <div className="gen-container">
        {/* Top Logo */}
        <div className="gen-logo-row">
          <Logo size="md" />
        </div>

        {/* ================= 3D TRIO STAGE GRAPHIC ================= */}
        <div className="gen-stage-wrap">
          {/* Swirling glowing particle orbital rings */}
          <svg className="gen-orbit-svg" viewBox="0 0 520 280" fill="none">
            {/* Base platform ellipse rings */}
            <ellipse cx="260" cy="245" rx="200" ry="24" stroke="#e2e8f0" strokeWidth="1.5" />
            <ellipse cx="260" cy="245" rx="140" ry="16" stroke="#fecaca" strokeWidth="1.2" strokeDasharray="3 3" opacity="0.8" />
            <ellipse cx="260" cy="245" rx="80" ry="10" stroke="#fda4af" strokeWidth="1" opacity="0.6" />

            {/* Orbit Ellipse 1 (Tilted forward) */}
            <ellipse
              cx="260"
              cy="150"
              rx="230"
              ry="55"
              stroke="url(#orbitGrad1)"
              strokeWidth="1.2"
              transform="rotate(-8 260 150)"
              className="gen-orbit-ring-1"
            />

            {/* Orbit Ellipse 2 (Tilted backward) */}
            <ellipse
              cx="260"
              cy="150"
              rx="220"
              ry="50"
              stroke="url(#orbitGrad2)"
              strokeWidth="1.2"
              transform="rotate(6 260 150)"
              className="gen-orbit-ring-2"
            />

            {/* Glowing red particle dots on orbit */}
            <circle cx="110" cy="138" r="2.5" fill="#f43f5e" className="gen-sparkle" />
            <circle cx="180" cy="118" r="2" fill="#fb7185" />
            <circle cx="340" cy="172" r="3" fill="#f43f5e" className="gen-sparkle" />
            <circle cx="430" cy="148" r="2.5" fill="#f43f5e" />
            <circle cx="270" cy="192" r="3" fill="#fb7185" />
            <circle cx="390" cy="120" r="2" fill="#fda4af" />
            <circle cx="75" cy="155" r="2" fill="#fda4af" />

            <defs>
              <linearGradient id="orbitGrad1" x1="0" y1="0" x2="1" y2="0">
                <stop offset="0%" stopColor="#f43f5e" stopOpacity="0.1" />
                <stop offset="30%" stopColor="#fb7185" stopOpacity="0.8" />
                <stop offset="70%" stopColor="#f43f5e" stopOpacity="0.9" />
                <stop offset="100%" stopColor="#fda4af" stopOpacity="0.2" />
              </linearGradient>
              <linearGradient id="orbitGrad2" x1="0" y1="0" x2="1" y2="0">
                <stop offset="0%" stopColor="#fda4af" stopOpacity="0.2" />
                <stop offset="50%" stopColor="#f43f5e" stopOpacity="0.75" />
                <stop offset="100%" stopColor="#fb7185" stopOpacity="0.1" />
              </linearGradient>
            </defs>
          </svg>

          {/* Three Figures Standing Side by Side */}
          <div className="gen-figures-grid">
            {/* Figure 1 (Left): Point Cloud / Particle Model */}
            <div className="gen-figure gen-figure-pointcloud">
              <Image
                src="/images/wireframe_body.jpg"
                alt="Point Cloud Biometric Scan"
                width={170}
                height={260}
                priority
                className="gen-fig-img gen-img-pointcloud"
              />
              <div className="gen-particle-sparkles" />
            </div>

            {/* Figure 2 (Center): Polygonal Wireframe Mesh with red glowing accents */}
            <div className="gen-figure gen-figure-wireframe">
              <Image
                src="/images/wireframe_body.jpg"
                alt="3D Parametric Wireframe Mesh"
                width={175}
                height={270}
                priority
                className="gen-fig-img gen-img-wireframe"
              />
              <div className="gen-wireframe-glow" />
            </div>

            {/* Figure 3 (Right): Smooth Matte White Clay Mannequin */}
            <div className="gen-figure gen-figure-solid">
              <Image
                src="/images/mannequin_body.jpg"
                alt="Rendered 3D Digital Twin"
                width={170}
                height={260}
                priority
                className="gen-fig-img gen-img-solid"
              />
            </div>
          </div>
        </div>

        {/* ================= TITLE ================= */}
        <h1 className="gen-title">Generating Your 3D Digital Twin...</h1>

        {/* ================= STEPS LIST ================= */}
        <div className="gen-steps-list">
          {steps.map((step, idx) => {
            const isCompleted = idx < stepIndex;
            const isInProgress = idx === stepIndex;
            const isPending = idx > stepIndex;

            return (
              <div key={idx} className={`gen-step-item ${isInProgress ? "in-progress" : ""} ${isCompleted ? "completed" : ""}`}>
                {/* Status Indicator Icon */}
                <div className="gen-step-status-icon">
                  {isCompleted ? (
                    <div className="gen-status-check">
                      <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="#ffffff" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
                        <polyline points="20 6 9 17 4 12" />
                      </svg>
                    </div>
                  ) : isInProgress ? (
                    <div className="gen-status-spinner" />
                  ) : (
                    <div className="gen-status-pending" />
                  )}
                </div>

                {/* Step Text */}
                <div className="gen-step-label-group">
                  <span className={`gen-step-main-text ${isPending ? "pending" : ""}`}>
                    {step.title}
                  </span>
                  {step.tech && (
                    <span className="gen-step-tech-text"> {step.tech}</span>
                  )}
                </div>
              </div>
            );
          })}
        </div>

        {/* ================= PROGRESS BAR & PERCENTAGE ================= */}
        <div className="gen-progress-row">
          <div className="gen-progress-bar-track">
            <div
              className="gen-progress-bar-fill"
              style={{ width: `${progress}%` }}
            />
          </div>
          <span className="gen-progress-pct">{progress}%</span>
        </div>

        {/* ================= SECURITY FOOTER NOTE ================= */}
        <div className="gen-security-footer">
          <div className="gen-sec-lock-badge">
            <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="#64748b" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round">
              <rect width="18" height="11" x="3" y="11" rx="2" ry="2" />
              <path d="M7 11V7a5 5 0 0 1 10 0v4" />
            </svg>
          </div>
          <span className="gen-sec-pipe">|</span>
          <span className="gen-sec-text">Your original capture photos are being securely encrypted and purged.</span>
        </div>
      </div>
    </div>
  );
}
