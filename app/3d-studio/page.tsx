"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import Logo from "@/components/Logo";

export default function ThreeDStudioPage() {
  // Studio Interactive States
  const [activeLighting, setActiveLighting] = useState<"daylight" | "store" | "evening">("daylight");
  const [rotationAngle, setRotationAngle] = useState(0);
  const [isDragging, setIsDragging] = useState(false);
  const [dragStartX, setDragStartX] = useState(0);
  const [selectedSize, setSelectedSize] = useState("M");
  const [isSavedToWardrobe, setIsSavedToWardrobe] = useState(false);
  const [cartCount, setCartCount] = useState(1);
  const [activeTool, setActiveTool] = useState<string | null>(null);

  // Garment visibility layers toggle
  const [layersVisibility, setLayersVisibility] = useState<Record<string, boolean>>({
    shirt: true,
    blazer: true,
    trousers: true,
  });

  const toggleLayerVisibility = (layer: string) => {
    setLayersVisibility((prev) => ({ ...prev, [layer]: !prev[layer] }));
  };

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

  const handlePurchase = () => {
    setCartCount((prev) => prev + 1);
  };

  return (
    <div
      className={`stu-page-wrapper lighting-${activeLighting}`}
      onMouseUp={handleMouseUp}
    >
      <div className="stu-container">
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
            <Link href="/wardrobe" className="stu-nav-item">
              Wardrobe
            </Link>
            <Link href="/community" className="stu-nav-item">
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
                placeholder="Search brands, styles, or items..."
                className="stu-search-input"
              />
            </div>

            <button type="button" className="stu-cart-btn" title="Cart">
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

        {/* ================= 3-COLUMN STUDIO LAYOUT ================= */}
        <div className="stu-stage-grid">
          {/* ================= COLUMN 1: CURRENT OUTFIT LAYERS ================= */}
          <aside className="stu-layers-card">
            <div className="stu-layers-header">
              <div className="stu-layers-title-wrap">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#1e293b" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <polygon points="12 2 2 7 12 12 22 7 12 2" />
                  <polyline points="2 17 12 22 22 17" />
                  <polyline points="2 12 12 17 22 12" />
                </svg>
                <h2 className="stu-layers-title">Current Outfit Layers</h2>
              </div>
              <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="#64748b" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <polyline points="18 15 12 9 6 15" />
              </svg>
            </div>

            {/* Layer 1: White Silk Shirt */}
            <div className={`stu-layer-row ${!layersVisibility.shirt ? "hidden-layer" : ""}`}>
              <div className="stu-layer-thumb-wrap">
                <Image
                  src="/images/studio/layer_shirt.png"
                  alt="White Silk Shirt"
                  width={38}
                  height={42}
                  className="stu-layer-thumb"
                />
              </div>
              <div className="stu-layer-info">
                <span className="stu-layer-name">White Silk Shirt</span>
                <span className="stu-layer-brand">BALMAIN</span>
              </div>
              <div className="stu-layer-actions">
                <button
                  type="button"
                  className="stu-layer-icon-btn"
                  onClick={() => toggleLayerVisibility("shirt")}
                  title="Toggle Layer Visibility"
                >
                  <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="#64748b" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    {layersVisibility.shirt ? (
                      <>
                        <path d="M2 12s3-7 10-7 10 7 10 7-3 7-10 7-10-7-10-7Z" />
                        <circle cx="12" cy="12" r="3" />
                      </>
                    ) : (
                      <>
                        <path d="M9.88 9.88a3 3 0 1 0 4.24 4.24" />
                        <path d="M10.73 5.08A10.43 10.43 0 0 1 12 5c7 0 10 7 10 7a13.16 13.16 0 0 1-1.67 2.68" />
                        <path d="M6.61 6.61A13.526 13.526 0 0 0 2 12s3 7 10 7a9.74 9.74 0 0 0 5.39-1.61" />
                        <line x1="2" x2="22" y1="2" y2="22" />
                      </>
                    )}
                  </svg>
                </button>
                <button type="button" className="stu-layer-icon-btn" title="Options">
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#64748b" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                    <circle cx="12" cy="12" r="1" />
                    <circle cx="12" cy="5" r="1" />
                    <circle cx="12" cy="19" r="1" />
                  </svg>
                </button>
              </div>
            </div>

            {/* Layer 2: Navy Blazer */}
            <div className={`stu-layer-row ${!layersVisibility.blazer ? "hidden-layer" : ""}`}>
              <div className="stu-layer-thumb-wrap">
                <Image
                  src="/images/studio/layer_blazer.png"
                  alt="Navy Blazer"
                  width={38}
                  height={42}
                  className="stu-layer-thumb"
                />
              </div>
              <div className="stu-layer-info">
                <span className="stu-layer-name">Navy Blazer</span>
                <span className="stu-layer-brand">BALMAIN</span>
              </div>
              <div className="stu-layer-actions">
                <button
                  type="button"
                  className="stu-layer-icon-btn"
                  onClick={() => toggleLayerVisibility("blazer")}
                  title="Toggle Layer Visibility"
                >
                  <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="#64748b" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    {layersVisibility.blazer ? (
                      <>
                        <path d="M2 12s3-7 10-7 10 7 10 7-3 7-10 7-10-7-10-7Z" />
                        <circle cx="12" cy="12" r="3" />
                      </>
                    ) : (
                      <>
                        <path d="M9.88 9.88a3 3 0 1 0 4.24 4.24" />
                        <path d="M10.73 5.08A10.43 10.43 0 0 1 12 5c7 0 10 7 10 7a13.16 13.16 0 0 1-1.67 2.68" />
                        <path d="M6.61 6.61A13.526 13.526 0 0 0 2 12s3 7 10 7a9.74 9.74 0 0 0 5.39-1.61" />
                        <line x1="2" x2="22" y1="2" y2="22" />
                      </>
                    )}
                  </svg>
                </button>
                <button type="button" className="stu-layer-icon-btn" title="Options">
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#64748b" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                    <circle cx="12" cy="12" r="1" />
                    <circle cx="12" cy="5" r="1" />
                    <circle cx="12" cy="19" r="1" />
                  </svg>
                </button>
              </div>
            </div>

            {/* Layer 3: Slim Trousers */}
            <div className={`stu-layer-row ${!layersVisibility.trousers ? "hidden-layer" : ""}`}>
              <div className="stu-layer-thumb-wrap">
                <Image
                  src="/images/studio/layer_trousers.png"
                  alt="Slim Trousers"
                  width={38}
                  height={42}
                  className="stu-layer-thumb"
                />
              </div>
              <div className="stu-layer-info">
                <span className="stu-layer-name">Slim Trousers</span>
                <span className="stu-layer-brand">BALMAIN</span>
              </div>
              <div className="stu-layer-actions">
                <button
                  type="button"
                  className="stu-layer-icon-btn"
                  onClick={() => toggleLayerVisibility("trousers")}
                  title="Toggle Layer Visibility"
                >
                  <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="#64748b" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    {layersVisibility.trousers ? (
                      <>
                        <path d="M2 12s3-7 10-7 10 7 10 7-3 7-10 7-10-7-10-7Z" />
                        <circle cx="12" cy="12" r="3" />
                      </>
                    ) : (
                      <>
                        <path d="M9.88 9.88a3 3 0 1 0 4.24 4.24" />
                        <path d="M10.73 5.08A10.43 10.43 0 0 1 12 5c7 0 10 7 10 7a13.16 13.16 0 0 1-1.67 2.68" />
                        <path d="M6.61 6.61A13.526 13.526 0 0 0 2 12s3 7 10 7a9.74 9.74 0 0 0 5.39-1.61" />
                        <line x1="2" x2="22" y1="2" y2="22" />
                      </>
                    )}
                  </svg>
                </button>
                <button type="button" className="stu-layer-icon-btn" title="Options">
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#64748b" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                    <circle cx="12" cy="12" r="1" />
                    <circle cx="12" cy="5" r="1" />
                    <circle cx="12" cy="19" r="1" />
                  </svg>
                </button>
              </div>
            </div>

            {/* Add Garment Button */}
            <Link href="/catalog" className="stu-add-garment-btn">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <line x1="12" x2="12" y1="5" y2="19" />
                <line x1="5" x2="19" y1="12" y2="12" />
              </svg>
              <span>Add garment to look</span>
            </Link>
          </aside>

          {/* ================= COLUMN 2: CENTER 3D AVATAR STAGE ================= */}
          <div
            className="stu-stage-viewport"
            onMouseDown={handleMouseDown}
            onMouseMove={handleMouseMove}
          >
            {/* Top-Left Floating Studio Lighting Widget */}
            <div className="stu-lighting-widget">
              <div className="stu-lighting-header">
                <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="#1e293b" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                  <circle cx="12" cy="12" r="4" />
                  <path d="M12 2v2M12 20v2M4.93 4.93l1.41 1.41M17.66 17.66l1.41 1.41M2 12h2M20 12h2M6.34 17.66l-1.41 1.41M19.07 4.93l-1.41 1.41" />
                </svg>
                <span className="stu-lighting-title">Studio Lighting</span>
              </div>
              <div className="stu-lighting-options">
                <button
                  type="button"
                  className={`stu-light-btn ${activeLighting === "daylight" ? "active" : ""}`}
                  onClick={() => setActiveLighting("daylight")}
                >
                  <div className="stu-light-circle">
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <circle cx="12" cy="12" r="5" />
                      <line x1="12" x2="12" y1="1" y2="3" />
                      <line x1="12" x2="12" y1="21" y2="23" />
                      <line x1="4.22" x2="5.64" y1="4.22" y2="5.64" />
                      <line x1="18.36" x2="19.78" y1="18.36" y2="19.78" />
                      <line x1="1" x2="3" y1="12" y2="12" />
                      <line x1="21" x2="23" y1="12" y2="12" />
                    </svg>
                  </div>
                  <span className="stu-light-label">Daylight<br />(5500K)</span>
                </button>

                <button
                  type="button"
                  className={`stu-light-btn ${activeLighting === "store" ? "active" : ""}`}
                  onClick={() => setActiveLighting("store")}
                >
                  <div className="stu-light-circle">
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" />
                      <polyline points="9 22 9 12 15 12 15 22" />
                    </svg>
                  </div>
                  <span className="stu-light-label">Store<br />Lighting</span>
                </button>

                <button
                  type="button"
                  className={`stu-light-btn ${activeLighting === "evening" ? "active" : ""}`}
                  onClick={() => setActiveLighting("evening")}
                >
                  <div className="stu-light-circle">
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z" />
                    </svg>
                  </div>
                  <span className="stu-light-label">Evening<br />Gala</span>
                </button>
              </div>
            </div>

            {/* 3D Model & Pedestal Display */}
            <div
              className="stu-model-wrapper"
              style={{
                transform: `rotateY(${rotationAngle}deg)`,
                transition: isDragging ? "none" : "transform 0.4s ease-out",
              }}
            >
              <Image
                src="/images/studio/studio_center_stage.png"
                alt="3D Balmain Suit Digital Twin"
                width={364}
                height={366}
                priority
                className="stu-model-stage-img"
              />
            </div>
          </div>

          {/* ================= COLUMN 3: FIT CONFIDENCE & STUDIO TOOLS ================= */}
          <aside className="stu-tools-panel">
            {/* Fit Confidence Score Box */}
            <div className="stu-confidence-box">
              <div className="stu-confidence-header">
                <div className="stu-conf-title-wrap">
                  <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="#2563eb" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                    <circle cx="12" cy="12" r="10" />
                    <line x1="22" x2="18" y1="12" y2="12" />
                    <line x1="6" x2="2" y1="12" y2="12" />
                    <line x1="12" x2="12" y1="6" y2="2" />
                    <line x1="12" x2="12" y1="22" y2="18" />
                  </svg>
                  <h3 className="stu-conf-title">Fit Confidence Score</h3>
                </div>
                <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="#94a3b8" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <circle cx="12" cy="12" r="10" />
                  <line x1="12" x2="12" y1="16" y2="12" />
                  <line x1="12" x2="12.01" y1="8" y2="8" />
                </svg>
              </div>

              {/* Gauge Ring & Metrics List */}
              <div className="stu-gauge-row">
                <div className="stu-radial-ring-wrap">
                  <svg className="stu-gauge-svg" width="84" height="84" viewBox="0 0 100 100">
                    <circle
                      cx="50"
                      cy="50"
                      r="40"
                      stroke="#e2e8f0"
                      strokeWidth="8"
                      fill="transparent"
                    />
                    <circle
                      cx="50"
                      cy="50"
                      r="40"
                      stroke="#10b981"
                      strokeWidth="8"
                      strokeDasharray="251.2"
                      strokeDashoffset="10"
                      strokeLinecap="round"
                      fill="transparent"
                      transform="rotate(-90 50 50)"
                    />
                  </svg>
                  <div className="stu-gauge-inner">
                    <span className="stu-gauge-pct">96%</span>
                    <span className="stu-gauge-label">Optimal Fit</span>
                  </div>
                </div>

                <div className="stu-breakdown-list">
                  <div className="stu-breakdown-row">
                    <span className="stu-breakdown-name">Shoulders</span>
                    <span className="stu-breakdown-val">✔ Excellent</span>
                  </div>
                  <div className="stu-breakdown-row">
                    <span className="stu-breakdown-name">Chest</span>
                    <span className="stu-breakdown-val">✔ Excellent</span>
                  </div>
                  <div className="stu-breakdown-row">
                    <span className="stu-breakdown-name">Waist</span>
                    <span className="stu-breakdown-val">✔ Excellent</span>
                  </div>
                  <div className="stu-breakdown-row">
                    <span className="stu-breakdown-name">Hips</span>
                    <span className="stu-breakdown-val">✔ Excellent</span>
                  </div>
                  <div className="stu-breakdown-row">
                    <span className="stu-breakdown-name">Length</span>
                    <span className="stu-breakdown-val">✔ Excellent</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Size Selector */}
            <div className="stu-size-section">
              <div className="stu-size-header">
                <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="#64748b" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M20.38 3.46 16 2a4 4 0 0 1-8 0L3.62 3.46a2 2 0 0 0-1.34 2.23l.58 3.47a1 1 0 0 0 .99.84H6v10c0 1.1.9 2 2 2h8a2 2 0 0 0 2-2V10h2.15a1 1 0 0 0 .99-.84l.58-3.47a2 2 0 0 0-1.34-2.23z" />
                </svg>
                <span className="stu-size-title">Size</span>
              </div>
              <div className="stu-size-pills">
                {["S", "M", "L"].map((sz) => (
                  <button
                    key={sz}
                    type="button"
                    className={`stu-size-pill ${selectedSize === sz ? "active" : ""}`}
                    onClick={() => setSelectedSize(sz)}
                  >
                    {sz}
                  </button>
                ))}
              </div>
            </div>

            {/* Studio Tools */}
            <div className="stu-tools-section">
              <div className="stu-tools-header">
                <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="#64748b" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M14.7 6.3a1 1 0 0 0 0 1.4l1.6 1.6a1 1 0 0 0 1.4 0l3.77-3.77a6 6 0 0 1-7.94 7.94l-6.91 6.91a2.12 2.12 0 0 1-3-3l6.91-6.91a6 6 0 0 1 7.94-7.94l-3.76 3.76z" />
                </svg>
                <span className="stu-tools-title">Studio Tools</span>
              </div>

              <div className="stu-tools-list">
                {/* Tool 1: Fabric Tension Heatmap */}
                <Link
                  href="/3d-studio/tension"
                  className="stu-tool-item"
                >
                  <div className="stu-tool-icon heatmap">
                    <Image
                      src="/images/studio/tool_heatmap.png"
                      alt="Heatmap"
                      width={24}
                      height={24}
                    />
                  </div>
                  <div className="stu-tool-text">
                    <span className="stu-tool-name">Fabric Tension Heatmap</span>
                    <span className="stu-tool-sub">See how the fabric fits and moves</span>
                  </div>
                  <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="#94a3b8" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="stu-tool-arrow">
                    <polyline points="9 18 15 12 9 6" />
                  </svg>
                </Link>

                {/* Tool 2: Multi-Garment Layering */}
                <Link
                  href="/3d-studio/layering"
                  className="stu-tool-item"
                >
                  <div className="stu-tool-icon">
                    <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="#2563eb" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <polygon points="12 2 2 7 12 12 22 7 12 2" />
                      <polyline points="2 17 12 22 22 17" />
                      <polyline points="2 12 12 17 22 12" />
                    </svg>
                  </div>
                  <div className="stu-tool-text">
                    <span className="stu-tool-name">Multi-Garment Layering</span>
                    <span className="stu-tool-sub">Try different combinations</span>
                  </div>
                  <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="#94a3b8" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="stu-tool-arrow">
                    <polyline points="9 18 15 12 9 6" />
                  </svg>
                </Link>

                {/* Tool 3: Compare 2 Sizes / Looks */}
                <Link
                  href="/3d-studio/compare"
                  className="stu-tool-item"
                >
                  <div className="stu-tool-icon">
                    <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="#2563eb" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M8 3H5a2 2 0 0 0-2 2v3m18 0V5a2 2 0 0 0-2-2h-3m0 18h3a2 2 0 0 0 2-2v-3M3 16v3a2 2 0 0 0 2 2h3" />
                      <line x1="12" x2="12" y1="8" y2="16" />
                    </svg>
                  </div>
                  <div className="stu-tool-text">
                    <span className="stu-tool-name">Compare 2 Sizes / Looks</span>
                    <span className="stu-tool-sub">See side by side comparison</span>
                  </div>
                  <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="#94a3b8" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="stu-tool-arrow">
                    <polyline points="9 18 15 12 9 6" />
                  </svg>
                </Link>
              </div>
            </div>
          </aside>
        </div>

        {/* ================= BOTTOM FLOATING ACTION BAR ================= */}
        <div className="stu-bottom-dock">
          {/* Action 1: Save Outfit to Wardrobe */}
          <button
            type="button"
            className={`stu-dock-btn ${isSavedToWardrobe ? "active" : ""}`}
            onClick={() => setIsSavedToWardrobe(!isSavedToWardrobe)}
          >
            <div className="stu-dock-icon-circle">
              <svg width="16" height="16" viewBox="0 0 24 24" fill={isSavedToWardrobe ? "#ef4444" : "none"} stroke={isSavedToWardrobe ? "#ef4444" : "#1e293b"} strokeWidth="2">
                <path d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z" />
              </svg>
            </div>
            <div className="stu-dock-text">
              <span className="stu-dock-title">
                {isSavedToWardrobe ? "Saved to Wardrobe ✓" : "Save Outfit to Wardrobe"}
              </span>
              <span className="stu-dock-sub">Keep this look for later</span>
            </div>
          </button>

          <div className="stu-dock-divider" />

          {/* Action 2: Ask a Friend */}
          <Link
            href="/3d-studio/ask-friend"
            className="stu-dock-btn"
          >
            <div className="stu-dock-icon-circle">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#1e293b" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" />
                <circle cx="9" cy="7" r="4" />
                <path d="M22 21v-2a4 4 0 0 0-3-3.87" />
                <path d="M16 3.13a4 4 0 0 1 0 7.75" />
              </svg>
            </div>
            <div className="stu-dock-text">
              <span className="stu-dock-title">Ask a Friend</span>
              <span className="stu-dock-sub">Live style feedback</span>
            </div>
          </Link>

          {/* Action 3: Purchase This Look CTA */}
          <button
            type="button"
            className="stu-purchase-cta"
            onClick={handlePurchase}
          >
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
              <circle cx="8" cy="21" r="1" />
              <circle cx="19" cy="21" r="1" />
              <path d="M2.05 2.05h2l2.66 12.42a2 2 0 0 0 2 1.58h9.78a2 2 0 0 0 1.95-1.57l1.65-7.43H5.12" />
            </svg>
            <span>Purchase This Look &bull; $1,290.00</span>
            <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round">
              <path d="M5 12h14" />
              <path d="m12 5 7 7-7 7" />
            </svg>
          </button>
        </div>
      </div>
    </div>
  );
}
