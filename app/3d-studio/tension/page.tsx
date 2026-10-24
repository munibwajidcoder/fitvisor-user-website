"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import Logo from "@/components/Logo";

export default function FabricTensionPage() {
  const [rotationAngle, setRotationAngle] = useState(0);
  const [zoomLevel, setZoomLevel] = useState(1);
  const [isDragging, setIsDragging] = useState(false);
  const [dragStartX, setDragStartX] = useState(0);
  const [selectedSize, setSelectedSize] = useState<"M" | "L">("M");
  const [cartCount, setCartCount] = useState(3);
  const [isSaved, setIsSaved] = useState(false);
  const [activeTooltip, setActiveTooltip] = useState<string | null>(null);

  // Drag-to-rotate interaction handlers
  const handleMouseDown = (e: React.MouseEvent) => {
    setIsDragging(true);
    setDragStartX(e.clientX);
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!isDragging) return;
    const deltaX = e.clientX - dragStartX;
    setRotationAngle((prev) => (prev + deltaX * 0.4) % 360);
    setDragStartX(e.clientX);
  };

  const handleMouseUp = () => {
    setIsDragging(false);
  };

  // View Controls
  const handleRotateClick = () => {
    setRotationAngle((prev) => (prev + 45) % 360);
  };

  const handleZoomToggle = () => {
    setZoomLevel((prev) => (prev === 1 ? 1.2 : 1));
  };

  const handleReset = () => {
    setRotationAngle(0);
    setZoomLevel(1);
  };

  const handleSwitchSize = () => {
    setSelectedSize("L");
  };

  const handleSaveAnalysis = () => {
    setIsSaved(!isSaved);
  };

  return (
    <div
      className="ten-page-wrapper"
      onMouseUp={handleMouseUp}
    >
      <div className="ten-container">
        {/* ================= HEADER / NAVBAR ================= */}
        <header className="stu-navbar">
          <div className="stu-nav-brand">
            <Logo size="md" />
          </div>

          <nav className="stu-nav-menu">
            <Link href="/" className="stu-nav-item">
              Home
            </Link>
            <Link href="/catalog" className="stu-nav-item">
              Catalog
            </Link>
            <Link href="/3d-studio" className="stu-nav-item active">
              3D Studio
            </Link>
            <Link href="#wardrobe" className="stu-nav-item">
              Wardrobe
            </Link>
            <Link href="#community" className="stu-nav-item">
              Community
            </Link>
          </nav>

          <div className="stu-nav-actions">
            <div className="stu-search-pill">
              <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="#94a3b8" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                <circle cx="11" cy="11" r="8" />
                <line x1="21" y1="21" x2="16.65" y2="16.65" />
              </svg>
              <input
                type="text"
                placeholder="Search brands, styles, or items.."
                className="stu-search-input"
              />
            </div>

            <button
              type="button"
              className="stu-cart-btn"
              title="Cart"
              onClick={() => setCartCount((prev) => prev + 1)}
            >
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#64748b" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <circle cx="8" cy="21" r="1" />
                <circle cx="19" cy="21" r="1" />
                <path d="M2.05 2.05h2l2.66 12.42a2 2 0 0 0 2 1.58h9.78a2 2 0 0 0 1.95-1.57l1.65-7.43H5.12" />
              </svg>
              <span className="stu-cart-badge">{cartCount}</span>
            </button>

            <Link href="/digital-twin" className="stu-user-avatar-wrap" title="User Profile">
              <Image
                src="/images/model_face.jpg"
                alt="User Profile"
                width={32}
                height={32}
                className="stu-user-avatar-img"
              />
              <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="#64748b" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <polyline points="6 9 12 15 18 9" />
              </svg>
            </Link>
          </div>
        </header>

        {/* ================= SUB-BANNER: REAL-TIME FABRIC TENSION MAP ================= */}
        <div className="ten-sub-banner">
          <div className="ten-banner-left">
            <div className="ten-banner-icon-wrap">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M12 2a4 4 0 0 0-4 4v1H6a2 2 0 0 0-2 2v11a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V9a2 2 0 0 0-2-2h-2V6a4 4 0 0 0-4-4Z" />
                <path d="M9 12v4" />
                <path d="M12 11v6" />
                <path d="M15 13v2" />
              </svg>
            </div>
            <h1 className="ten-banner-title">
              Real-Time Fabric Tension Map <span>— Based on 2% elastane weave stretch index</span>
            </h1>
          </div>

          <div className="ten-banner-right">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <circle cx="12" cy="12" r="10" />
              <line x1="12" x2="12" y1="16" y2="12" />
              <line x1="12" x2="12.01" y1="8" y2="8" />
            </svg>
            <span>Live analysis &bull; Personalized for your 3D avatar</span>
          </div>
        </div>

        {/* ================= 3-COLUMN STAGE GRID ================= */}
        <div className="ten-stage-grid">
          {/* ================= COLUMN 1: LEFT SIDEBAR ================= */}
          <aside className="ten-left-card">
            {/* Tension Heatmap Legend */}
            <div>
              <h2 className="ten-section-title">Tension Heatmap Legend</h2>
              <div className="ten-legend-list">
                <div className="ten-legend-item">
                  <span className="ten-legend-dot optimal" />
                  <div className="ten-legend-text">
                    <span className="ten-legend-label">Optimal Fit</span>
                    <span className="ten-legend-sub">100% movement comfort</span>
                  </div>
                </div>

                <div className="ten-legend-item">
                  <span className="ten-legend-dot normal" />
                  <div className="ten-legend-text">
                    <span className="ten-legend-label">Normal Ease</span>
                    <span className="ten-legend-sub">Slightly relaxed fit</span>
                  </div>
                </div>

                <div className="ten-legend-item">
                  <span className="ten-legend-dot tension" />
                  <div className="ten-legend-text">
                    <span className="ten-legend-label">Tension Zone</span>
                    <span className="ten-legend-sub">Fabric stretched (+%)</span>
                  </div>
                </div>
              </div>
            </div>

            {/* View Controls */}
            <div>
              <h3 className="ten-section-title">View Controls</h3>
              <div className="ten-controls-row">
                <button
                  type="button"
                  className="ten-control-btn"
                  onClick={handleRotateClick}
                  title="Rotate model"
                >
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M21.5 2v6h-6M21.34 15.57a10 10 0 1 1-.57-8.38l5.67-5.67" />
                  </svg>
                  <span>Rotate</span>
                </button>

                <button
                  type="button"
                  className="ten-control-btn"
                  onClick={handleZoomToggle}
                  title="Toggle Zoom"
                >
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                    <circle cx="11" cy="11" r="8" />
                    <line x1="8" y1="11" x2="14" y2="11" />
                  </svg>
                  <span>Zoom</span>
                </button>

                <button
                  type="button"
                  className="ten-control-btn"
                  onClick={handleReset}
                  title="Reset View"
                >
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                    <polyline points="1 4 1 10 7 10" />
                    <path d="M3.51 15a9 9 0 1 0 2.13-9.36L1 10" />
                  </svg>
                  <span>Reset</span>
                </button>
              </div>
            </div>

            {/* Current Outfit */}
            <div>
              <h3 className="ten-section-title">Current Outfit</h3>
              <div className="ten-outfit-list">
                <div className="ten-outfit-row">
                  <div className="ten-outfit-thumb-wrap">
                    <Image
                      src="/images/tension/thumb_blazer.png"
                      alt="Balmain Blazer"
                      width={38}
                      height={42}
                      className="ten-outfit-thumb"
                    />
                  </div>
                  <div className="ten-outfit-info">
                    <span className="ten-outfit-name">Balmain Blazer</span>
                    <span className="ten-outfit-meta">Navy Blue</span>
                  </div>
                </div>

                <div className="ten-outfit-row">
                  <div className="ten-outfit-thumb-wrap">
                    <Image
                      src="/images/tension/thumb_shirt.png"
                      alt="White Silk Shirt"
                      width={38}
                      height={42}
                      className="ten-outfit-thumb"
                    />
                  </div>
                  <div className="ten-outfit-info">
                    <span className="ten-outfit-name">White Silk Shirt</span>
                    <span className="ten-outfit-meta">(Layer 1)</span>
                  </div>
                </div>

                <div className="ten-outfit-row">
                  <div className="ten-outfit-thumb-wrap">
                    <Image
                      src="/images/tension/thumb_trousers.png"
                      alt="Slim Trousers"
                      width={38}
                      height={42}
                      className="ten-outfit-thumb"
                    />
                  </div>
                  <div className="ten-outfit-info">
                    <span className="ten-outfit-name">Slim Trousers</span>
                    <span className="ten-outfit-meta">(Layer 2)</span>
                  </div>
                </div>
              </div>
            </div>

            {/* AI Fabric Analysis Badge */}
            <div className="ten-ai-box">
              <div className="ten-ai-icon-circle">
                <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                  <circle cx="12" cy="12" r="10" />
                  <line x1="22" x2="18" y1="12" y2="12" />
                  <line x1="6" x2="2" y1="12" y2="12" />
                  <line x1="12" x2="12" y1="6" y2="2" />
                  <line x1="12" x2="12" y1="22" y2="18" />
                </svg>
              </div>
              <div className="ten-ai-text">
                <span className="ten-ai-title">AI Fabric Analysis</span>
                <span className="ten-ai-sub">Powered by 3D body mesh &amp; fabric physics</span>
              </div>
            </div>
          </aside>

          {/* ================= COLUMN 2: CENTER STAGE ================= */}
          <div
            className="ten-stage-viewport"
            onMouseDown={handleMouseDown}
            onMouseMove={handleMouseMove}
          >
            <div
              className="ten-model-wrapper"
              style={{
                transform: `rotateY(${rotationAngle}deg) scale(${zoomLevel})`,
                transition: isDragging ? "none" : "transform 0.3s ease-out",
              }}
            >
              <Image
                src="/images/tension/tension_stage_complete.png"
                alt="Real-Time Fabric Tension Map Model"
                width={460}
                height={541}
                priority
                className="ten-stage-img"
              />
            </div>

            {/* Drag to rotate 360 label */}
            <div className="ten-drag-indicator">
              <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M21 12a9 9 0 0 0-9-9 9.75 9.75 0 0 0-6.74 2.74L3 8" />
                <path d="M3 3v5h5" />
              </svg>
              <span>360°</span>
              <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M3 12a9 9 0 0 0 9 9 9.75 9.75 0 0 0 6.74-2.74L21 16" />
                <path d="M16 21h5v-5" />
              </svg>
              <span style={{ marginLeft: "4px" }}>Drag to rotate</span>
            </div>
          </div>

          {/* ================= COLUMN 3: RIGHT PANEL (FIT ANALYSIS) ================= */}
          <aside className="ten-right-panel">
            {/* Header */}
            <div className="ten-panel-header">
              <div className="ten-panel-header-icon">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M8 3H5a2 2 0 0 0-2 2v3m18 0V5a2 2 0 0 0-2-2h-3m0 18h3a2 2 0 0 0 2-2v-3M3 16v3a2 2 0 0 0 2 2h3" />
                  <circle cx="12" cy="12" r="3" />
                </svg>
              </div>
              <h2 className="ten-panel-title">Fit Analysis</h2>
            </div>

            {/* Metric Items */}
            <div className="ten-metrics-list">
              {/* Shoulders */}
              <div className="ten-metric-item">
                <div className="ten-metric-left">
                  <div className="ten-metric-icon">
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M20.38 3.46 16 2a4 4 0 0 1-8 0L3.62 3.46a2 2 0 0 0-1.34 2.23l.58 3.47a1 1 0 0 0 .99.84H6v10c0 1.1.9 2 2 2h8a2 2 0 0 0 2-2V10h2.15a1 1 0 0 0 .99-.84l.58-3.47a2 2 0 0 0-1.34-2.23z" />
                    </svg>
                  </div>
                  <div className="ten-metric-info">
                    <span className="ten-metric-name">Shoulders</span>
                    <span className="ten-metric-desc">43cm garment vs 42cm body</span>
                  </div>
                </div>
                <div className="ten-metric-badge">
                  <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
                    <polyline points="20 6 9 17 4 12" />
                  </svg>
                  <span>Perfect Match</span>
                </div>
              </div>

              {/* Waist */}
              <div className="ten-metric-item">
                <div className="ten-metric-left">
                  <div className="ten-metric-icon">
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M6 3v18M18 3v18M6 8c4 0 4 8 0 8M18 8c-4 0-4 8 0 8" />
                    </svg>
                  </div>
                  <div className="ten-metric-info">
                    <span className="ten-metric-name">Waist</span>
                    <span className="ten-metric-desc">3.5cm ease allowance</span>
                  </div>
                </div>
                <div className="ten-metric-badge">
                  <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
                    <polyline points="20 6 9 17 4 12" />
                  </svg>
                  <span>Ideal for seated posture</span>
                </div>
              </div>
            </div>

            {/* Note Box */}
            <div className="ten-info-note">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <circle cx="12" cy="12" r="10" />
                <line x1="12" x2="12" y1="16" y2="12" />
                <line x1="12" x2="12.01" y1="8" y2="8" />
              </svg>
              <div className="ten-note-content">
                <span className="ten-note-title">Note</span>
                <span className="ten-note-body">
                  When lower button is closed, slight tension appears over hips.
                </span>
              </div>
            </div>

            {/* Fitvisor Recommendation Card */}
            <div className="ten-recommendation-card">
              <div className="ten-rec-header">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M15 14c.2-1 .7-1.7 1.5-2.5 1-.9 1.5-2.2 1.5-3.5A6 6 0 0 0 6 8c0 1 .2 2.2 1.5 3.5.7.7 1.3 1.5 1.5 2.5" />
                  <path d="M9 18h6" />
                  <path d="M10 22h4" />
                </svg>
                <span className="ten-rec-title">Fitvisor Recommendation</span>
              </div>

              <p className="ten-rec-text">
                {selectedSize === "L"
                  ? "Size L applied! Enjoy relaxed, comfortable movement across the waist and hips."
                  : "Try Size L for a more relaxed, modern oversized drape."}
              </p>

              <button
                type="button"
                className="ten-rec-btn"
                onClick={handleSwitchSize}
              >
                <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <circle cx="12" cy="5" r="2" />
                  <path d="m14 7 8 8-2 2-6-6-6 6-2-2 8-8" />
                </svg>
                <span>{selectedSize === "L" ? "Size L Selected ✓" : "Switch to Size L Instantly →"}</span>
              </button>
            </div>

            {/* Quick Actions */}
            <div>
              <h3 className="ten-actions-title">Quick Actions</h3>
              <div className="ten-actions-row">
                <Link href="/3d-studio" className="ten-action-card">
                  <div className="ten-action-icon">
                    <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <polygon points="12 2 2 7 12 12 22 7 12 2" />
                      <polyline points="2 17 12 22 22 17" />
                      <polyline points="2 12 12 17 22 12" />
                    </svg>
                  </div>
                  <span className="ten-action-label">View Heatmap<br />Details</span>
                </Link>

                <Link href="/3d-studio/compare" className="ten-action-card">
                  <div className="ten-action-icon">
                    <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M8 3H5a2 2 0 0 0-2 2v3m18 0V5a2 2 0 0 0-2-2h-3m0 18h3a2 2 0 0 0 2-2v-3M3 16v3a2 2 0 0 0 2 2h3" />
                      <line x1="12" x2="12" y1="8" y2="16" />
                    </svg>
                  </div>
                  <span className="ten-action-label">Compare<br />Sizes</span>
                </Link>

                <button
                  type="button"
                  className="ten-action-card"
                  onClick={handleSaveAnalysis}
                >
                  <div className="ten-action-icon">
                    <svg width="17" height="17" viewBox="0 0 24 24" fill={isSaved ? "#ef4444" : "none"} stroke={isSaved ? "#ef4444" : "currentColor"} strokeWidth="2">
                      <path d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z" />
                    </svg>
                  </div>
                  <span className="ten-action-label">{isSaved ? "Saved ✓" : "Save\nAnalysis"}</span>
                </button>
              </div>
            </div>
          </aside>
        </div>
      </div>
    </div>
  );
}
