"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import Logo from "@/components/Logo";

export default function DigitalTwinPage() {
  const router = useRouter();

  // Interactive 3D view controls state
  const [rotation, setRotation] = useState<number>(0);
  const [zoom, setZoom] = useState<number>(1);
  const [quizOpen, setQuizOpen] = useState<boolean>(false);

  const handleRotate = () => {
    setRotation((prev) => (prev + 90) % 360);
  };

  const handleZoomIn = () => {
    setZoom((prev) => Math.min(prev + 0.15, 1.4));
  };

  const handleZoomOut = () => {
    setZoom((prev) => Math.max(prev - 0.15, 0.8));
  };

  const handleReset = () => {
    setRotation(0);
    setZoom(1);
  };

  return (
    <div className="dt-page-wrapper">
      <div className="dt-layout-grid">
        {/* ================= LEFT COLUMN: 3D AVATAR STAGE ================= */}
        <div className="dt-left-stage">
          {/* Top Logo */}
          <div className="dt-logo">
            <Logo size="md" />
          </div>

          {/* Interactive 3D Avatar Container */}
          <div className="dt-avatar-stage">
            {/* Callout 1: Top-Left (Size M) */}
            <div className="dt-callout dt-callout-size">
              <div className="dt-callout-icon">
                <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="#1e293b" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M20.38 3.46 16 2a4 4 0 0 1-8 0L3.62 3.46a2 2 0 0 0-1.34 2.23l.58 3.47a1 1 0 0 0 .99.84H6v10c0 1.1.9 2 2 2h8a2 2 0 0 0 2-2V10h2.15a1 1 0 0 0 .99-.84l.58-3.47a2 2 0 0 0-1.34-2.23z" />
                </svg>
              </div>
              <div className="dt-callout-text">
                <span className="dt-callout-title">Size M</span>
                <span className="dt-callout-sub">US 6 / UK 10</span>
              </div>
              <div className="dt-callout-pin-r">
                <div className="dt-pin-line-r" />
                <div className="dt-pin-dot" />
              </div>
            </div>

            {/* Callout 2: Bottom-Left (Anonymous Mode) */}
            <div className="dt-callout dt-callout-anon">
              <div className="dt-callout-icon teal">
                <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="#059669" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
                  <polyline points="9 12 11 14 15 10" />
                </svg>
              </div>
              <div className="dt-callout-text">
                <span className="dt-callout-sub">Anonymous Mode:</span>
                <span className="dt-callout-title">Active</span>
              </div>
              <div className="dt-callout-pin-r">
                <div className="dt-pin-line-r" />
                <div className="dt-pin-dot" />
              </div>
            </div>

            {/* Callout 3: Right (Body Shape: Hourglass) */}
            <div className="dt-callout dt-callout-shape">
              <div className="dt-callout-pin-l">
                <div className="dt-pin-dot" />
                <div className="dt-pin-line-l" />
              </div>
              <div className="dt-callout-icon">
                <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="#1e293b" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M5 2h14l-4 8 4 12H5l4-12-4-8z" />
                </svg>
              </div>
              <div className="dt-callout-text">
                <span className="dt-callout-sub">Body Shape:</span>
                <span className="dt-callout-title">Hourglass</span>
              </div>
            </div>

            {/* 3D Model Display with Interactive Rotation & Zoom */}
            <div
              className="dt-model-container"
              style={{
                transform: `scale(${zoom})`,
                transition: "transform 0.3s cubic-bezier(0.34, 1.56, 0.64, 1)",
              }}
            >
              <div
                className="dt-model-rotator"
                style={{
                  transform: `rotateY(${rotation}deg)`,
                  transition: "transform 0.5s cubic-bezier(0.2, 0.8, 0.2, 1)",
                }}
              >
                <Image
                  src="/images/mannequin_body.jpg"
                  alt="3D Digital Twin Avatar"
                  width={340}
                  height={510}
                  priority
                  className="dt-model-img"
                />
              </div>

              {/* Glowing 3D Floor Disc Pedestal */}
              <div className="dt-pedestal-platform">
                <div className="dt-pedestal-disc">
                  <div className="dt-pedestal-rim-glow" />
                </div>
              </div>
            </div>

            {/* Bottom-Left Floating Viewport Controls */}
            <div className="dt-controls-dock">
              {/* Rotate Button */}
              <button
                type="button"
                className="dt-ctrl-item"
                onClick={handleRotate}
                title="Rotate 360°"
              >
                <div className="dt-ctrl-circle">
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#1e293b" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M21.5 2v6h-6M21.34 15.57a10 10 0 1 1-.57-8.38l5.67-1.19" />
                  </svg>
                  <span className="dt-ctrl-micro">360°</span>
                </div>
                <span className="dt-ctrl-label">Rotate</span>
              </button>

              <div className="dt-ctrl-sep" />

              {/* Zoom Buttons */}
              <div className="dt-ctrl-item">
                <div className="dt-zoom-pair">
                  <button
                    type="button"
                    className="dt-zoom-btn"
                    onClick={handleZoomIn}
                    title="Zoom in"
                  >
                    +
                  </button>
                  <button
                    type="button"
                    className="dt-zoom-btn"
                    onClick={handleZoomOut}
                    title="Zoom out"
                  >
                    &minus;
                  </button>
                </div>
                <span className="dt-ctrl-label">Zoom</span>
              </div>

              <div className="dt-ctrl-sep" />

              {/* Reset View Button */}
              <button
                type="button"
                className="dt-ctrl-item"
                onClick={handleReset}
                title="Reset view"
              >
                <div className="dt-ctrl-circle">
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#1e293b" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M3 12a9 9 0 1 0 9-9 9.75 9.75 0 0 0-6.74 2.74L3 8" />
                    <path d="M3 3v5h5" />
                  </svg>
                </div>
                <span className="dt-ctrl-label">Reset View</span>
              </button>
            </div>
          </div>
        </div>

        {/* ================= RIGHT COLUMN: READY CARD ================= */}
        <div className="dt-right-card">
          {/* Header Row: Magic Wand Icon + Heading */}
          <div className="dt-title-row">
            <div className="dt-header-icon-wrap">
              <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="#f43f5e" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                <path d="m15 4-2 2M15 4l2 2M15 4v4M15 4h4" />
                <path d="M11 20 3.5 12.5a2.12 2.12 0 0 1 3-3L14 17" />
                <path d="m9 18 3 3" />
                <circle cx="19" cy="11" r="1.2" fill="#f43f5e" />
                <circle cx="20" cy="17" r="1.5" fill="#f43f5e" />
              </svg>
            </div>
            <h1 className="dt-title">
              Your Digital Twin<br />is Ready!
            </h1>
          </div>

          <p className="dt-desc">
            Your 3D avatar has been successfully created and is ready for virtual try-on, personalized recommendations and a better fit experience.
          </p>

          {/* Section: Your Body Measurements */}
          <div className="dt-measurements-section">
            <h2 className="dt-measurements-heading">Your Body Measurements</h2>

            <div className="dt-metric-cards-row">
              {/* Chest */}
              <div className="dt-metric-card">
                <div className="dt-metric-icon">
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#1e3a8a" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M6 3v4c0 3.3 2.7 6 6 6s6-2.7 6-6V3" />
                    <path d="M4 14v7h16v-7" />
                  </svg>
                </div>
                <span className="dt-metric-label">Chest</span>
                <span className="dt-metric-value">92 cm</span>
              </div>

              {/* Waist */}
              <div className="dt-metric-card">
                <div className="dt-metric-icon">
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#1e3a8a" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M5 4c3 3 3 13 0 16" />
                    <path d="M19 4c-3 3-3 13 0 16" />
                    <path d="M5 4h14" />
                    <path d="M5 20h14" />
                  </svg>
                </div>
                <span className="dt-metric-label">Waist</span>
                <span className="dt-metric-value">74 cm</span>
              </div>

              {/* Hips */}
              <div className="dt-metric-card">
                <div className="dt-metric-icon">
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#1e3a8a" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M4 6c4 4 4 10 0 14" />
                    <path d="M20 6c-4 4-4 10 0 14" />
                    <ellipse cx="12" cy="13" rx="4" ry="7" />
                  </svg>
                </div>
                <span className="dt-metric-label">Hips</span>
                <span className="dt-metric-value">98 cm</span>
              </div>
            </div>
          </div>

          {/* Preference Quiz Box */}
          <button
            type="button"
            className={`dt-quiz-card ${quizOpen ? "active" : ""}`}
            onClick={() => setQuizOpen(!quizOpen)}
          >
            <div className="dt-quiz-icon">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#1e3a8a" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M16 7a4 4 0 0 0-8 0v1" />
                <path d="M2 17l10-8 10 8H2z" />
              </svg>
            </div>
            <div className="dt-quiz-text">
              <span className="dt-quiz-title">Set My Preferred Brands &amp; Styles</span>
              <span className="dt-quiz-sub">Quick style quiz (optional)</span>
            </div>
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#94a3b8" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" className="dt-quiz-arrow">
              <polyline points="9 18 15 12 9 6" />
            </svg>
          </button>

          {/* Primary CTA: Start Shopping & 3D Try-On */}
          <Link href="/" className="dt-start-tryon-btn">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
              <circle cx="8" cy="21" r="1" />
              <circle cx="19" cy="21" r="1" />
              <path d="M2.05 2.05h2l2.66 12.42a2 2 0 0 0 2 1.58h9.78a2 2 0 0 0 1.95-1.57l1.65-7.43H5.12" />
            </svg>
            <span>Start Shopping &amp; 3D Try-On</span>
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round">
              <path d="M5 12h14" />
              <path d="m12 5 7 7-7 7" />
            </svg>
          </Link>
        </div>
      </div>
    </div>
  );
}
