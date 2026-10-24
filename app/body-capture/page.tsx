"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import Logo from "@/components/Logo";

export default function BodyCapturePage() {
  const router = useRouter();
  const [selectedDevice, setSelectedDevice] = useState<"webcam" | "mobile">("webcam");

  const handleStartCapture = () => {
    router.push("/scan");
  };

  const poses = [
    {
      num: 1,
      label: "Pose 1: Front",
      desc: "Arms slightly spread at 45°, feet aligned with shoulders.",
      img: "/images/pose_front.jpg",
      type: "front",
    },
    {
      num: 2,
      label: "Pose 2: Profile",
      desc: "Arms resting naturally at sides, standing straight.",
      img: "/images/pose_side.jpg",
      type: "profile",
    },
    {
      num: 3,
      label: "Pose 3: Back",
      desc: "Same stance as front, head upright.",
      img: "/images/pose_back.jpg",
      type: "back",
    },
  ];

  return (
    <div className="bc-page-wrapper">
      <div className="bc-card">
        {/* Top Logo */}
        <div className="bc-logo-row">
          <Logo size="md" />
        </div>

        {/* Wizard Steps */}
        <div className="bc-wizard-steps">
          {/* Step 1: Account */}
          <Link href="/register" className="bc-step-item">
            <div className="bc-step-circle completed">
              <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="#64748b" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
                <polyline points="20 6 9 17 4 12" />
              </svg>
            </div>
            <span className="bc-step-label">Account</span>
          </Link>

          <div className="bc-step-line completed" />

          {/* Step 2: Privacy */}
          <Link href="/privacy" className="bc-step-item">
            <div className="bc-step-circle completed">
              <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="#64748b" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
                <polyline points="20 6 9 17 4 12" />
              </svg>
            </div>
            <span className="bc-step-label">Privacy &amp; Anonymity</span>
          </Link>

          <div className="bc-step-line" />

          {/* Step 3: Body Capture */}
          <div className="bc-step-item">
            <div className="bc-step-circle active">3</div>
            <span className="bc-step-label active">Body Capture</span>
          </div>
        </div>

        {/* Heading */}
        <div className="bc-heading-block">
          <h1 className="bc-title">Prepare Your 3D Scan in 3 Simple Poses</h1>
          <p className="bc-subtitle">
            Follow the poses below and make sure you&apos;re in a well-lit space<br />
            for the most accurate results.
          </p>
        </div>

        {/* 3 Pose Cards Grid */}
        <div className="bc-poses-grid">
          {poses.map((pose) => (
            <div key={pose.num} className="bc-pose-card">
              {/* Header */}
              <div className="bc-pose-header">
                <span className="bc-pose-num-badge">{pose.num}</span>
                <div className="bc-pose-header-text">
                  <span className="bc-pose-label">{pose.label}</span>
                  <p className="bc-pose-desc">{pose.desc}</p>
                </div>
              </div>

              {/* Image Container with fixed height and overlay */}
              <div className="bc-pose-img-wrap">
                <div className="bc-pose-img-inner">
                  <Image
                    src={pose.img}
                    alt={pose.label}
                    width={280}
                    height={420}
                    priority
                    className="bc-pose-actual-img"
                  />
                </div>

                {/* Overlays matching reference */}
                {pose.type === "front" && (
                  <svg className="bc-pose-overlay" viewBox="0 0 220 280" fill="none" xmlns="http://www.w3.org/2000/svg">
                    {/* Perspective ground disc */}
                    <ellipse cx="110" cy="258" rx="80" ry="14" stroke="#93c5fd" strokeWidth="1.2" strokeDasharray="3 3" opacity="0.8" />
                    <ellipse cx="110" cy="258" rx="55" ry="9" stroke="#93c5fd" strokeWidth="1" strokeDasharray="2 2" opacity="0.6" />
                    
                    {/* Left 45° angle arc and text */}
                    <path d="M 46 175 C 44 195 55 215 75 228" stroke="#3b82f6" strokeWidth="1.2" strokeDasharray="3 3" opacity="0.85" />
                    <text x="36" y="200" fill="#2563eb" fontSize="10.5" fontWeight="700" fontFamily="sans-serif">45°</text>

                    {/* Right 45° angle arc and text */}
                    <path d="M 174 175 C 176 195 165 215 145 228" stroke="#3b82f6" strokeWidth="1.2" strokeDasharray="3 3" opacity="0.85" />
                    <text x="172" y="200" fill="#2563eb" fontSize="10.5" fontWeight="700" fontFamily="sans-serif">45°</text>
                  </svg>
                )}

                {pose.type === "profile" && (
                  <svg className="bc-pose-overlay" viewBox="0 0 220 280" fill="none" xmlns="http://www.w3.org/2000/svg">
                    {/* Perspective ground cylinder / rings */}
                    <ellipse cx="110" cy="258" rx="65" ry="12" stroke="#93c5fd" strokeWidth="1.2" opacity="0.75" />
                    <ellipse cx="110" cy="258" rx="42" ry="7" stroke="#93c5fd" strokeWidth="0.9" strokeDasharray="2 2" opacity="0.5" />
                    {/* Light vertical guidelines */}
                    <line x1="60" y1="110" x2="60" y2="258" stroke="#bfdbfe" strokeWidth="0.8" strokeDasharray="3 3" opacity="0.6" />
                    <line x1="160" y1="110" x2="160" y2="258" stroke="#bfdbfe" strokeWidth="0.8" strokeDasharray="3 3" opacity="0.6" />
                  </svg>
                )}

                {pose.type === "back" && (
                  <svg className="bc-pose-overlay" viewBox="0 0 220 280" fill="none" xmlns="http://www.w3.org/2000/svg">
                    {/* Perspective ground disc */}
                    <ellipse cx="110" cy="258" rx="80" ry="14" stroke="#93c5fd" strokeWidth="1.2" strokeDasharray="3 3" opacity="0.8" />
                    <ellipse cx="110" cy="258" rx="55" ry="9" stroke="#93c5fd" strokeWidth="1" strokeDasharray="2 2" opacity="0.6" />
                    
                    {/* Left 45° angle arc and text */}
                    <path d="M 46 175 C 44 195 55 215 75 228" stroke="#3b82f6" strokeWidth="1.2" strokeDasharray="3 3" opacity="0.85" />
                    <text x="36" y="200" fill="#2563eb" fontSize="10.5" fontWeight="700" fontFamily="sans-serif">45°</text>

                    {/* Right 45° angle arc and text */}
                    <path d="M 174 175 C 176 195 165 215 145 228" stroke="#3b82f6" strokeWidth="1.2" strokeDasharray="3 3" opacity="0.85" />
                    <text x="172" y="200" fill="#2563eb" fontSize="10.5" fontWeight="700" fontFamily="sans-serif">45°</text>
                  </svg>
                )}
              </div>
            </div>
          ))}
        </div>

        {/* Helpful Tips Banner */}
        <div className="bc-tips-banner">
          <div className="bc-tips-left">
            <div className="bc-tips-icon-wrap">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#ffffff" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M9 18h6" />
                <path d="M10 22h4" />
                <path d="M12 2a7 7 0 0 0-7 7c0 2.5 1.5 4.5 3 6h8c1.5-1.5 3-3.5 3-6a7 7 0 0 0-7-7z" />
              </svg>
            </div>
            <span className="bc-tips-title">Helpful Tips</span>
          </div>

          <div className="bc-tips-divider" />

          <div className="bc-tips-right">
            <div className="bc-tips-item">
              <span className="bc-check-icon">
                <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="#2563eb" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
                  <polyline points="20 6 9 17 4 12" />
                </svg>
              </span>
              <span>Wear <strong>fitted clothing</strong> (tight t-shirt, leggings, or activewear).</span>
            </div>
            <div className="bc-tips-item">
              <span className="bc-check-icon">
                <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="#2563eb" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
                  <polyline points="20 6 9 17 4 12" />
                </svg>
              </span>
              <span>Ensure even <strong>front lighting</strong> and position your device at waist height.</span>
            </div>
          </div>
        </div>

        {/* Choose Your Device Section */}
        <div className="bc-device-section">
          <h2 className="bc-device-heading">Choose Your Device</h2>
          <p className="bc-device-subtitle">Use your webcam or scan with your smartphone for a seamless experience.</p>

          <div className="bc-device-cards">
            {/* Webcam Option */}
            <button
              type="button"
              className={`bc-device-card ${selectedDevice === "webcam" ? "selected" : ""}`}
              onClick={() => setSelectedDevice("webcam")}
            >
              <div className="bc-device-icon">
                <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#1e293b" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <circle cx="12" cy="10" r="4" />
                  <path d="M5 20a7 7 0 0 1 14 0" />
                  <circle cx="12" cy="10" r="1.5" fill="#1e293b" />
                </svg>
              </div>
              <div className="bc-device-text">
                <span className="bc-device-name">Use this device camera</span>
                <span className="bc-device-sub">Webcam / Live browser camera</span>
              </div>
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#1e293b" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="bc-device-arrow">
                <path d="M5 12h14" />
                <path d="m12 5 7 7-7 7" />
              </svg>
            </button>

            {/* Mobile QR Option */}
            <button
              type="button"
              className={`bc-device-card ${selectedDevice === "mobile" ? "selected" : ""}`}
              onClick={() => setSelectedDevice("mobile")}
            >
              <div className="bc-device-icon">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#1e293b" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <rect width="14" height="20" x="5" y="2" rx="2" ry="2" />
                  <path d="M12 18h.01" />
                </svg>
              </div>
              <div className="bc-device-text">
                <span className="bc-device-name">Scan with your smartphone</span>
                <span className="bc-device-sub">Open camera on mobile for a seamless hand-off.</span>
              </div>
              {/* Crisp QR Code Graphic */}
              <div className="bc-qr-box">
                <svg width="44" height="44" viewBox="0 0 44 44" fill="none" xmlns="http://www.w3.org/2000/svg">
                  {/* Top-left position marker */}
                  <rect x="2" y="2" width="16" height="16" rx="2" fill="none" stroke="#1e293b" strokeWidth="2"/>
                  <rect x="5.5" y="5.5" width="9" height="9" fill="#1e293b"/>
                  
                  {/* Top-right position marker */}
                  <rect x="26" y="2" width="16" height="16" rx="2" fill="none" stroke="#1e293b" strokeWidth="2"/>
                  <rect x="29.5" y="5.5" width="9" height="9" fill="#1e293b"/>
                  
                  {/* Bottom-left position marker */}
                  <rect x="2" y="26" width="16" height="16" rx="2" fill="none" stroke="#1e293b" strokeWidth="2"/>
                  <rect x="5.5" y="29.5" width="9" height="9" fill="#1e293b"/>

                  {/* QR Data Pattern Dots */}
                  <rect x="21" y="2" width="3" height="3" fill="#1e293b"/>
                  <rect x="21" y="8" width="3" height="3" fill="#1e293b"/>
                  <rect x="21" y="14" width="3" height="3" fill="#1e293b"/>
                  <rect x="2" y="21" width="3" height="3" fill="#1e293b"/>
                  <rect x="8" y="21" width="3" height="3" fill="#1e293b"/>
                  <rect x="14" y="21" width="3" height="3" fill="#1e293b"/>
                  <rect x="21" y="21" width="3" height="3" fill="#1e293b"/>
                  <rect x="26" y="21" width="3" height="3" fill="#1e293b"/>
                  <rect x="32" y="21" width="3" height="3" fill="#1e293b"/>
                  <rect x="38" y="21" width="3" height="3" fill="#1e293b"/>
                  <rect x="21" y="26" width="3" height="3" fill="#1e293b"/>
                  <rect x="26" y="26" width="3" height="3" fill="#1e293b"/>
                  <rect x="34" y="26" width="3" height="3" fill="#1e293b"/>
                  <rect x="26" y="32" width="3" height="3" fill="#1e293b"/>
                  <rect x="32" y="32" width="3" height="3" fill="#1e293b"/>
                  <rect x="38" y="32" width="3" height="3" fill="#1e293b"/>
                  <rect x="21" y="38" width="3" height="3" fill="#1e293b"/>
                  <rect x="28" y="38" width="3" height="3" fill="#1e293b"/>
                  <rect x="36" y="38" width="3" height="3" fill="#1e293b"/>
                </svg>
              </div>
            </button>
          </div>
        </div>

        {/* Start Camera Capture CTA Button */}
        <Link
          href="/scan"
          className="bc-start-btn"
        >
          <span>Start Camera Capture</span>
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
            <path d="M5 12h14" />
            <path d="m12 5 7 7-7 7" />
          </svg>
        </Link>

        {/* Enter Measurements Manually */}
        <Link
          href="/measurements"
          className="bc-manual-btn"
        >
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M21.3 8.7 8.7 21.3c-.4.4-1 .4-1.4 0l-4.6-4.6c-.4-.4-.4-1 0-1.4L15.3 2.7c.4-.4 1-.4 1.4 0l4.6 4.6c.4.4.4 1 0 1.4Z"/>
            <path d="m14.5 3.5 2 2"/>
            <path d="m11.5 6.5 2 2"/>
            <path d="m8.5 9.5 2 2"/>
            <path d="m5.5 12.5 2 2"/>
          </svg>
          <span>Enter Measurements Manually</span>
        </Link>

        {/* Security Footer */}
        <div className="bc-security-footer">
          <div className="bc-sec-line" />
          <div className="bc-security-badge">
            <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="#94a3b8" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <rect width="18" height="11" x="3" y="11" rx="2" ry="2" />
              <path d="M7 11V7a5 5 0 0 1 10 0v4" />
            </svg>
            <span>Your data is encrypted and protected. GDPR compliant.</span>
          </div>
          <div className="bc-sec-line" />
        </div>
      </div>
    </div>
  );
}
