"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import Logo from "@/components/Logo";

interface LayerItem {
  id: number;
  order: number;
  brand: string;
  name: string;
  priceNum: number;
  priceStr: string;
  thumb: string;
  cartThumb: string;
  visible: boolean;
  selected: boolean;
}

export default function MultiGarmentLayeringPage() {
  const [activeLighting, setActiveLighting] = useState<"daylight" | "store" | "evening">("daylight");
  const [rotationAngle, setRotationAngle] = useState(0);
  const [zoomLevel, setZoomLevel] = useState(1);
  const [isDragging, setIsDragging] = useState(false);
  const [dragStartX, setDragStartX] = useState(0);
  const [cartCount, setCartCount] = useState(3);
  const [shoesType, setShoesType] = useState<"pumps" | "sneakers">("pumps");

  const [layers, setLayers] = useState<LayerItem[]>([
    {
      id: 1,
      order: 1,
      brand: "BRUNELLO CUCINELLI",
      name: "Italian Collar Silk Shirt",
      priceNum: 520,
      priceStr: "$520.00",
      thumb: "/images/layering/thumb_shirt.png",
      cartThumb: "/images/layering/cart_thumb_shirt.png",
      visible: true,
      selected: true,
    },
    {
      id: 2,
      order: 2,
      brand: "BALMAIN",
      name: "Wool Structured Blazer",
      priceNum: 1290,
      priceStr: "$1,290.00",
      thumb: "/images/layering/thumb_blazer.png",
      cartThumb: "/images/layering/cart_thumb_blazer.png",
      visible: true,
      selected: true,
    },
    {
      id: 3,
      order: 3,
      brand: "BALMAIN",
      name: "Belted Tailored Trousers",
      priceNum: 420,
      priceStr: "$420.00",
      thumb: "/images/layering/thumb_trousers.png",
      cartThumb: "/images/layering/cart_thumb_trousers.png",
      visible: true,
      selected: true,
    },
    {
      id: 4,
      order: 4,
      brand: "JIMMY CHOO",
      name: "Leather Stiletto Pumps",
      priceNum: 210,
      priceStr: "$210.00",
      thumb: "/images/layering/thumb_heels.png",
      cartThumb: "/images/layering/cart_thumb_heels.png",
      visible: true,
      selected: true,
    },
  ]);

  // Toggle single layer visibility
  const toggleVisibility = (id: number) => {
    setLayers((prev) =>
      prev.map((item) => (item.id === id ? { ...item, visible: !item.visible } : item))
    );
  };

  // Toggle single item cart selection
  const toggleSelection = (id: number) => {
    setLayers((prev) =>
      prev.map((item) => (item.id === id ? { ...item, selected: !item.selected } : item))
    );
  };

  // Select all or none
  const allSelected = layers.every((l) => l.selected);
  const selectedCount = layers.filter((l) => l.selected).length;

  const toggleSelectAll = () => {
    const nextVal = !allSelected;
    setLayers((prev) => prev.map((item) => ({ ...item, selected: nextVal })));
  };

  // Drag to rotate handlers
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

  // Zoom controls
  const handleZoomIn = () => {
    setZoomLevel((prev) => Math.min(prev + 0.15, 1.4));
  };

  const handleZoomOut = () => {
    setZoomLevel((prev) => Math.max(prev - 0.15, 0.85));
  };

  const handleReset = () => {
    setRotationAngle(0);
    setZoomLevel(1);
  };

  const handleAddToCart = () => {
    setCartCount((prev) => prev + (selectedCount > 0 ? selectedCount : 1));
  };

  const toggleSwapShoes = () => {
    setShoesType((prev) => (prev === "pumps" ? "sneakers" : "pumps"));
  };

  return (
    <div
      className={`lay-page-wrapper lighting-${activeLighting}`}
      onMouseUp={handleMouseUp}
    >
      <div className="lay-container">
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

        {/* ================= 3-COLUMN STUDIO LAYOUT ================= */}
        <div className="lay-stage-grid">
          {/* ================= COLUMN 1: OUTFIT LAYERS ================= */}
          <aside className="lay-layers-card">
            <div className="lay-header">
              <div className="lay-title-row">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#1e293b" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                  <polygon points="12 2 2 7 12 12 22 7 12 2" />
                  <polyline points="2 17 12 22 22 17" />
                  <polyline points="2 12 12 17 22 12" />
                </svg>
                <h2 className="lay-title">
                  Outfit Layers <span>(4 items)</span>
                </h2>
              </div>
              <span className="lay-subtitle">Drag to reorder &bull; Toggle visibility</span>
            </div>

            {/* 4 Layer Items */}
            <div className="lay-items-list">
              {layers.map((item) => (
                <div
                  key={item.id}
                  className={`lay-item-row ${!item.visible ? "hidden-layer" : ""}`}
                >
                  <div className="lay-order-num">
                    <span className="lay-order-dots">&bull;&bull;&bull;</span>
                    <span>{item.order}</span>
                    <span className="lay-order-dots">&bull;&bull;&bull;</span>
                  </div>

                  <div className="lay-thumb-wrap">
                    <Image
                      src={item.thumb}
                      alt={item.name}
                      width={40}
                      height={44}
                      className="lay-thumb"
                    />
                  </div>

                  <div className="lay-info">
                    <span className="lay-brand">{item.brand}</span>
                    <span className="lay-name">{item.name}</span>
                    <span className="lay-price">{item.priceStr}</span>
                  </div>

                  <div className="lay-actions">
                    <button
                      type="button"
                      className="lay-icon-btn"
                      onClick={() => toggleVisibility(item.id)}
                      title="Toggle Layer Visibility"
                    >
                      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        {item.visible ? (
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

                    <button type="button" className="lay-icon-btn" title="Drag to Reorder">
                      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round">
                        <line x1="4" x2="20" y1="9" y2="9" />
                        <line x1="4" x2="20" y1="15" y2="15" />
                      </svg>
                    </button>
                  </div>
                </div>
              ))}
            </div>

            {/* Add Garment Button */}
            <Link href="/catalog" className="lay-add-btn">
              <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <line x1="12" x2="12" y1="5" y2="19" />
                <line x1="5" x2="19" y1="12" y2="12" />
              </svg>
              <span>Add Garment to Outfit</span>
            </Link>
          </aside>

          {/* ================= COLUMN 2: CENTER STAGE ================= */}
          <div
            className="lay-stage-viewport"
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
                    <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
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
                    <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
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
                    <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z" />
                    </svg>
                  </div>
                  <span className="stu-light-label">Evening<br />Gala</span>
                </button>
              </div>
            </div>

            {/* Floating Zoom & Reset Controls */}
            <div className="lay-floating-controls">
              <button
                type="button"
                className="lay-ctrl-btn"
                onClick={handleZoomIn}
                title="Zoom In"
              >
                +
              </button>
              <button
                type="button"
                className="lay-ctrl-btn"
                onClick={handleZoomOut}
                title="Zoom Out"
              >
                &minus;
              </button>
              <button
                type="button"
                className="lay-ctrl-btn"
                onClick={handleReset}
                title="Reset View"
              >
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round">
                  <polyline points="1 4 1 10 7 10" />
                  <path d="M3.51 15a9 9 0 1 0 2.13-9.36L1 10" />
                </svg>
              </button>
            </div>

            {/* Model & Stepped Pedestal */}
            <div
              className="lay-model-wrapper"
              style={{
                transform: `rotateY(${rotationAngle}deg) scale(${zoomLevel})`,
                transition: isDragging ? "none" : "transform 0.3s ease-out",
              }}
            >
              <Image
                src="/images/layering/layering_stage_complete.png"
                alt="Multi-Garment Layering Female 3D Avatar"
                width={470}
                height={584}
                priority
                className="lay-stage-img"
              />
            </div>

            {/* Drag to rotate bar */}
            <div className="lay-drag-bar">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                <polyline points="15 18 9 12 15 6" />
              </svg>
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#2563eb" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M18 11V6a2 2 0 0 0-2-2v0a2 2 0 0 0-2 2v0" />
                <path d="M14 10V4a2 2 0 0 0-2-2v0a2 2 0 0 0-2 2v2" />
                <path d="M10 10.5V6a2 2 0 0 0-2-2v0a2 2 0 0 0-2 2v8" />
                <path d="M18 8a2 2 0 1 1 4 0v6a8 8 0 0 1-8 8h-2c-2.8 0-4.5-.86-5.99-2.34l-3.6-3.6a2 2 0 0 1 2.83-2.82L7 15" />
              </svg>
              <span>Drag to rotate 360°</span>
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                <polyline points="9 18 15 12 9 6" />
              </svg>
            </div>
          </div>

          {/* ================= COLUMN 3: COMPLETE OUTFIT CART PANEL ================= */}
          <aside className="lay-cart-panel">
            {/* Header */}
            <div className="lay-panel-header">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#2563eb" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                <circle cx="12" cy="5" r="2" />
                <path d="m14 7 8 8-2 2-6-6-6 6-2-2 8-8" />
              </svg>
              <h2 className="lay-panel-title">Complete Outfit</h2>
            </div>

            {/* Price Display */}
            <div className="lay-price-row">
              <span className="lay-total-price">$1,840.00</span>
              <span className="lay-discount-badge">4 items &bull; Save 12%</span>
            </div>

            {/* AI Style Compatibility Score Card */}
            <div className="lay-ai-card">
              <div className="lay-ai-badge-circle">
                <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="m12 3-1.9 5.8a2 2 0 0 1-1.3 1.3L3 12l5.8 1.9a2 2 0 0 1 1.3 1.3L12 21l1.9-5.8a2 2 0 0 1 1.3-1.3L21 12l-5.8-1.9a2 2 0 0 1-1.3-1.3Z" />
                </svg>
              </div>
              <div className="lay-ai-content">
                <span className="lay-ai-title">AI Style Compatibility Score</span>
                <div className="lay-ai-score-row">
                  <span className="lay-ai-score">9.8/10</span>
                  <span className="lay-ai-sub">Timeless navy &amp; off-white chromatic harmony.</span>
                </div>
              </div>
            </div>

            {/* Checklist Select All */}
            <div className="lay-select-all-row">
              <label className="lay-select-all-label" onClick={toggleSelectAll}>
                <div className={`lay-checkbox ${!allSelected ? "unchecked" : ""}`}>
                  {allSelected && (
                    <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3.5" strokeLinecap="round" strokeLinejoin="round">
                      <polyline points="20 6 9 17 4 12" />
                    </svg>
                  )}
                </div>
                <span>Select All for Cart</span>
              </label>
              <span className="lay-selected-count">{selectedCount} items selected</span>
            </div>

            {/* Checklist 4 Items */}
            <div className="lay-checklist">
              {layers.map((item) => (
                <div
                  key={item.id}
                  className="lay-check-row"
                  onClick={() => toggleSelection(item.id)}
                >
                  <div className="lay-check-left">
                    <div className="lay-check-thumb-wrap">
                      <Image
                        src={item.cartThumb}
                        alt={item.name}
                        width={36}
                        height={38}
                        className="lay-check-thumb"
                      />
                    </div>
                    <div className="lay-check-info">
                      <span className="lay-check-brand">{item.brand}</span>
                      <span className="lay-check-name">{item.name}</span>
                      <span className="lay-check-price">{item.priceStr}</span>
                    </div>
                  </div>

                  <div className={`lay-checkbox ${!item.selected ? "unchecked" : ""}`}>
                    {item.selected && (
                      <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3.5" strokeLinecap="round" strokeLinejoin="round">
                        <polyline points="20 6 9 17 4 12" />
                      </svg>
                    )}
                  </div>
                </div>
              ))}
            </div>

            {/* Swap Shoes Bar */}
            <div className="lay-swap-bar" onClick={toggleSwapShoes}>
              <div className="lay-swap-left">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="m16 3 4 4-4 4" />
                  <path d="M20 7H4" />
                  <path d="m8 21-4-4 4-4" />
                  <path d="M4 17h16" />
                </svg>
                <span>
                  Swap Shoes <span>({shoesType === "pumps" ? "Sneakers vs Pumps" : "Pumps vs Sneakers"})</span>
                </span>
              </div>
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#2563eb" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <polyline points="9 18 15 12 9 6" />
              </svg>
            </div>

            {/* Primary CTA */}
            <button
              type="button"
              className="lay-primary-cta"
              onClick={handleAddToCart}
            >
              <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                <circle cx="8" cy="21" r="1" />
                <circle cx="19" cy="21" r="1" />
                <path d="M2.05 2.05h2l2.66 12.42a2 2 0 0 0 2 1.58h9.78a2 2 0 0 0 1.95-1.57l1.65-7.43H5.12" />
              </svg>
              <span>Add Complete Outfit to Cart</span>
            </button>
          </aside>
        </div>
      </div>
    </div>
  );
}
