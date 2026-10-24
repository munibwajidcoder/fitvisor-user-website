"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import Logo from "@/components/Logo";

export default function CompareSizesPage() {
  const [rotationAngle, setRotationAngle] = useState(0);
  const [isDraggingA, setIsDraggingA] = useState(false);
  const [isDraggingB, setIsDraggingB] = useState(false);
  const [dragStartX, setDragStartX] = useState(0);
  const [isSyncRotation, setIsSyncRotation] = useState(true);
  const [activeAngleA, setActiveAngleA] = useState("front");
  const [activeAngleB, setActiveAngleB] = useState("front");
  const [selectedWinner, setSelectedWinner] = useState<"M" | "L" | null>("M");
  const [cartCount, setCartCount] = useState(3);

  // Rotation handlers
  const handleMouseDownA = (e: React.MouseEvent) => {
    setIsDraggingA(true);
    setDragStartX(e.clientX);
  };

  const handleMouseDownB = (e: React.MouseEvent) => {
    setIsDraggingB(true);
    setDragStartX(e.clientX);
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!isDraggingA && !isDraggingB) return;
    const deltaX = e.clientX - dragStartX;
    setRotationAngle((prev) => (prev + deltaX * 0.4) % 360);
    setDragStartX(e.clientX);
  };

  const handleMouseUp = () => {
    setIsDraggingA(false);
    setIsDraggingB(false);
  };

  const handleSyncSpin = () => {
    setRotationAngle((prev) => (prev + 90) % 360);
  };

  const handleSelectSizeM = () => {
    setSelectedWinner("M");
    setCartCount((prev) => prev + 1);
  };

  const handleSelectSizeL = () => {
    setSelectedWinner("L");
    setCartCount((prev) => prev + 1);
  };

  return (
    <div
      className="cmp-page-wrapper"
      onMouseUp={handleMouseUp}
      onMouseMove={handleMouseMove}
    >
      <div className="cmp-container">
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
                placeholder="Search brands, styles, or items..."
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

        {/* ================= DUAL-STAGE SECTION: STAGE A & STAGE B ================= */}
        <div className="cmp-stages-row">
          {/* ================= STAGE A: SIZE M (NAVY) ================= */}
          <div className="cmp-stage-card">
            {/* Stage Pill Badge */}
            <div className="cmp-stage-badge">
              <span className="cmp-badge-circle">A</span>
              <span className="cmp-badge-label">Blazer Size M (Navy)</span>
            </div>

            {/* Floating Metrics (Left) */}
            <div className="cmp-stage-metrics">
              {/* Radial Fit Score Gauge (96% Optimal Fit) */}
              <div className="cmp-gauge-ring-wrap">
                <svg width="76" height="76" viewBox="0 0 100 100">
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
                <div className="cmp-gauge-inner">
                  <span className="cmp-gauge-pct">96%</span>
                  <span className="cmp-gauge-sub">Fit Score</span>
                  <span className="cmp-gauge-status" style={{ color: "#10b981" }}>✔</span>
                </div>
              </div>

              {/* Attribute Tag 1: Tailored business silhouette */}
              <div className="cmp-feature-pill">
                <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <circle cx="12" cy="5" r="2" />
                  <path d="m14 7 8 8-2 2-6-6-6 6-2-2 8-8" />
                </svg>
                <span>Tailored business silhouette</span>
              </div>

              {/* Attribute Tag 2: Classic wrist length */}
              <div className="cmp-feature-pill">
                <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M20.38 3.46 16 2a4 4 0 0 1-8 0L3.62 3.46a2 2 0 0 0-1.34 2.23l.58 3.47a1 1 0 0 0 .99.84H6v10c0 1.1.9 2 2 2h8a2 2 0 0 0 2-2V10h2.15a1 1 0 0 0 .99-.84l.58-3.47a2 2 0 0 0-1.34-2.23z" />
                </svg>
                <span>Classic wrist length</span>
              </div>
            </div>

            {/* Model Viewport A */}
            <div
              className="cmp-model-viewport"
              onMouseDown={handleMouseDownA}
              style={{
                transform: `rotateY(${rotationAngle}deg)`,
                transition: isDraggingA ? "none" : "transform 0.3s ease-out",
              }}
            >
              <Image
                src="/images/compare/model_a_pedestal.png"
                alt="Blazer Size M Avatar on Pedestal"
                width={215}
                height={370}
                priority
                className="cmp-stage-img"
              />
            </div>

            {/* Right Angle Strip A */}
            <div className="cmp-angle-strip">
              <button
                type="button"
                className={`cmp-angle-btn ${activeAngleA === "front" ? "active" : ""}`}
                onClick={() => setActiveAngleA("front")}
                title="Front View"
              >
                <Image src="/images/compare/angle_a_front.png" alt="Front" width={42} height={50} className="cmp-angle-thumb" />
              </button>
              <button
                type="button"
                className={`cmp-angle-btn ${activeAngleA === "side" ? "active" : ""}`}
                onClick={() => setActiveAngleA("side")}
                title="Side View"
              >
                <Image src="/images/compare/angle_a_side.png" alt="Side" width={42} height={50} className="cmp-angle-thumb" />
              </button>
              <button
                type="button"
                className={`cmp-angle-btn ${activeAngleA === "back" ? "active" : ""}`}
                onClick={() => setActiveAngleA("back")}
                title="Back View"
              >
                <Image src="/images/compare/angle_a_back.png" alt="Back" width={42} height={50} className="cmp-angle-thumb" />
              </button>
              <button
                type="button"
                className={`cmp-angle-btn ${activeAngleA === "angle" ? "active" : ""}`}
                onClick={() => setActiveAngleA("angle")}
                title="Three-Quarter View"
              >
                <Image src="/images/compare/angle_a_angle.png" alt="Angle" width={42} height={50} className="cmp-angle-thumb" />
              </button>
            </div>
          </div>

          {/* ================= CENTRAL SYNC CONTROLLER CARD ================= */}
          <div className="cmp-sync-card">
            <label className="cmp-sync-label" onClick={() => setIsSyncRotation(!isSyncRotation)}>
              <div className={`cmp-sync-checkbox ${!isSyncRotation ? "unchecked" : ""}`}>
                {isSyncRotation && (
                  <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3.5" strokeLinecap="round" strokeLinejoin="round">
                    <polyline points="20 6 9 17 4 12" />
                  </svg>
                )}
              </div>
              <span>Synchronized 360° dual avatar rotation</span>
            </label>

            <button
              type="button"
              className="cmp-sync-rotate-btn"
              onClick={handleSyncSpin}
              title="Rotate Both Avatars"
            >
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M21.5 2v6h-6M21.34 15.57a10 10 0 1 1-.57-8.38l5.67-5.67" />
              </svg>
              <span>360°</span>
            </button>

            <span className="cmp-sync-subtext">Both avatars rotate together</span>
          </div>

          {/* ================= STAGE B: SIZE L (NAVY) ================= */}
          <div className="cmp-stage-card">
            {/* Stage Pill Badge */}
            <div className="cmp-stage-badge">
              <span className="cmp-badge-circle">B</span>
              <span className="cmp-badge-label">Blazer Size L (Navy)</span>
            </div>

            {/* Floating Metrics (Left) */}
            <div className="cmp-stage-metrics">
              {/* Radial Fit Score Gauge (89% Fit Score) */}
              <div className="cmp-gauge-ring-wrap">
                <svg width="76" height="76" viewBox="0 0 100 100">
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
                    stroke="#f87171"
                    strokeWidth="8"
                    strokeDasharray="251.2"
                    strokeDashoffset="28"
                    strokeLinecap="round"
                    fill="transparent"
                    transform="rotate(-90 50 50)"
                  />
                </svg>
                <div className="cmp-gauge-inner">
                  <span className="cmp-gauge-pct">89%</span>
                  <span className="cmp-gauge-sub">Fit Score</span>
                  <span className="cmp-gauge-status" style={{ color: "#ef4444" }}>⚠</span>
                </div>
              </div>

              {/* Attribute Tag 1: Relaxed oversized silhouette */}
              <div className="cmp-feature-pill">
                <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <circle cx="12" cy="5" r="2" />
                  <path d="m14 7 8 8-2 2-6-6-6 6-2-2 8-8" />
                </svg>
                <span>Relaxed oversized silhouette</span>
              </div>

              {/* Attribute Tag 2: Sleeves +2.5cm */}
              <div className="cmp-feature-pill">
                <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
                  <polyline points="14 2 14 8 20 8" />
                  <line x1="16" y1="13" x2="8" y2="13" />
                  <line x1="16" y1="17" x2="8" y2="17" />
                  <polyline points="10 9 9 9 8 9" />
                </svg>
                <span>Sleeves +2.5cm</span>
              </div>
            </div>

            {/* Model Viewport B */}
            <div
              className="cmp-model-viewport"
              onMouseDown={handleMouseDownB}
              style={{
                transform: `rotateY(${rotationAngle}deg)`,
                transition: isDraggingB ? "none" : "transform 0.3s ease-out",
              }}
            >
              <Image
                src="/images/compare/model_b_pedestal.png"
                alt="Blazer Size L Avatar on Pedestal"
                width={215}
                height={370}
                priority
                className="cmp-stage-img"
              />
            </div>

            {/* Right Angle Strip B */}
            <div className="cmp-angle-strip">
              <button
                type="button"
                className={`cmp-angle-btn ${activeAngleB === "front" ? "active" : ""}`}
                onClick={() => setActiveAngleB("front")}
                title="Front View"
              >
                <Image src="/images/compare/angle_b_front.png" alt="Front" width={42} height={50} className="cmp-angle-thumb" />
              </button>
              <button
                type="button"
                className={`cmp-angle-btn ${activeAngleB === "side" ? "active" : ""}`}
                onClick={() => setActiveAngleB("side")}
                title="Side View"
              >
                <Image src="/images/compare/angle_b_side.png" alt="Side" width={42} height={50} className="cmp-angle-thumb" />
              </button>
              <button
                type="button"
                className={`cmp-angle-btn ${activeAngleB === "back" ? "active" : ""}`}
                onClick={() => setActiveAngleB("back")}
                title="Back View"
              >
                <Image src="/images/compare/angle_b_back.png" alt="Back" width={42} height={50} className="cmp-angle-thumb" />
              </button>
              <button
                type="button"
                className={`cmp-angle-btn ${activeAngleB === "angle" ? "active" : ""}`}
                onClick={() => setActiveAngleB("angle")}
                title="Three-Quarter View"
              >
                <Image src="/images/compare/angle_b_angle.png" alt="Angle" width={42} height={50} className="cmp-angle-thumb" />
              </button>
            </div>
          </div>
        </div>

        {/* ================= LOWER SECTION: COMPARISON TABLE & OVERALL WINNER ================= */}
        <div className="cmp-bottom-row">
          {/* ================= LEFT: SIDE-BY-SIDE FIT COMPARISON MATRIX ================= */}
          <div className="cmp-table-card">
            <div className="cmp-table-header">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#2563eb" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                <path d="m16 16 3-8 3 8c-.87.65-1.92 1-3 1s-2.13-.35-3-1Z" />
                <path d="m2 16 3-8 3 8c-.87.65-1.92 1-3 1s-2.13-.35-3-1Z" />
                <path d="M7 21h10" />
                <path d="M12 3v18" />
                <path d="M3 7h2c2 0 5-1 7-2 2 1 5 2 7 2h2" />
              </svg>
              <h2 className="cmp-table-title">Side-by-Side Fit Comparison</h2>
            </div>

            <div className="cmp-matrix">
              {/* Header */}
              <div className="cmp-matrix-head">
                <div className="cmp-matrix-head-col cmp-col-feature" />
                <div className="cmp-matrix-head-col cmp-col-a">
                  <span className="cmp-pill-indicator a">A</span>
                  <span>Size M (Navy)</span>
                </div>
                <div className="cmp-matrix-head-col cmp-col-b">
                  <span className="cmp-pill-indicator b">B</span>
                  <span>Size L (Navy)</span>
                </div>
              </div>

              {/* Row 1: Shoulders */}
              <div className="cmp-matrix-row">
                <div className="cmp-cell-feature">
                  <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M20.38 3.46 16 2a4 4 0 0 1-8 0L3.62 3.46a2 2 0 0 0-1.34 2.23l.58 3.47a1 1 0 0 0 .99.84H6v10c0 1.1.9 2 2 2h8a2 2 0 0 0 2-2V10h2.15a1 1 0 0 0 .99-.84l.58-3.47a2 2 0 0 0-1.34-2.23z" />
                  </svg>
                  <span>Shoulders</span>
                </div>
                <div className="cmp-cell-val">
                  <span className="cmp-status-dot green">✔</span>
                  <span>Fitted</span>
                </div>
                <div className="cmp-cell-val">
                  <span className="cmp-status-dot yellow">●</span>
                  <span>Dropped shoulder</span>
                </div>
              </div>

              {/* Row 2: Hemline Length */}
              <div className="cmp-matrix-row">
                <div className="cmp-cell-feature">
                  <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M6 3v18M18 3v18M6 8c4 0 4 8 0 8M18 8c-4 0-4 8 0 8" />
                  </svg>
                  <span>Hemline Length</span>
                </div>
                <div className="cmp-cell-val">
                  <span className="cmp-status-dot green">✔</span>
                  <span>Mid-hip</span>
                </div>
                <div className="cmp-cell-val">
                  <span className="cmp-status-dot yellow">●</span>
                  <span>+4cm longer</span>
                </div>
              </div>

              {/* Row 3: Mobility & Movement */}
              <div className="cmp-matrix-row">
                <div className="cmp-cell-feature">
                  <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <circle cx="12" cy="12" r="10" />
                    <line x1="22" x2="18" y1="12" y2="12" />
                    <line x1="6" x2="2" y1="12" y2="12" />
                    <line x1="12" x2="12" y1="6" y2="2" />
                    <line x1="12" x2="12" y1="22" y2="18" />
                  </svg>
                  <span>Mobility &amp; Movement</span>
                </div>
                <div className="cmp-cell-val">
                  <span className="cmp-status-dot blue">✔</span>
                  <span>8.5/10</span>
                </div>
                <div className="cmp-cell-val">
                  <span className="cmp-status-dot green">✔</span>
                  <span>9.8/10</span>
                </div>
              </div>
            </div>
          </div>

          {/* ================= RIGHT: OVERALL WINNER CARD ================= */}
          <div className="cmp-winner-card">
            <div>
              <div className="cmp-winner-header">
                <div className="cmp-winner-title-wrap">
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#2563eb" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M6 9H4.5a2.5 2.5 0 0 1 0-5H6" />
                    <path d="M18 9h1.5a2.5 2.5 0 0 0 0-5H18" />
                    <path d="M4 22h16" />
                    <path d="M10 14.66V17c0 .55-.47.98-.97 1.21C7.85 18.75 7 20.24 7 22" />
                    <path d="M14 14.66V17c0 .55.47.98.97 1.21C16.15 18.75 17 20.24 17 22" />
                    <path d="M18 2H6v7a6 6 0 0 0 12 0V2Z" />
                  </svg>
                  <h3 className="cmp-winner-title">Overall Winner</h3>
                </div>
                <span className="cmp-winner-badge">Size M</span>
              </div>

              <p className="cmp-winner-desc" style={{ marginTop: "10px" }}>
                Better tailored fit for a sharper, professional look.
              </p>
            </div>

            <div className="cmp-winner-actions">
              <button
                type="button"
                className="cmp-btn-m"
                onClick={handleSelectSizeM}
              >
                <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <circle cx="12" cy="5" r="2" />
                  <path d="m14 7 8 8-2 2-6-6-6 6-2-2 8-8" />
                </svg>
                <span>{selectedWinner === "M" ? "Selected Size M ✓" : "Select Size M"}</span>
              </button>

              <button
                type="button"
                className="cmp-btn-l"
                onClick={handleSelectSizeL}
              >
                <span>{selectedWinner === "L" ? "Selected Size L ✓" : "Select Size L"}</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
