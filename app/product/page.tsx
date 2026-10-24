"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import Logo from "@/components/Logo";

export default function ProductDetailPage() {
  const [activeImageIndex, setActiveImageIndex] = useState(0);
  const [isLiked, setIsLiked] = useState(false);
  const [selectedColor, setSelectedColor] = useState("Navy Blue");
  const [selectedSize, setSelectedSize] = useState("40");
  const [cartCount, setCartCount] = useState(2);
  const [isReserved, setIsReserved] = useState(false);
  const [fabricOpen, setFabricOpen] = useState(false);
  const [shippingOpen, setShippingOpen] = useState(false);

  // Gallery Photos
  const galleryImages = [
    {
      id: 0,
      src: "/images/product/pdp_main_front.png",
      alt: "Balmain Tailored Wool Blazer - Front View",
      badge: "1 / 4",
    },
    {
      id: 1,
      src: "/images/product/pdp_side_angle.png",
      alt: "Balmain Tailored Wool Blazer - Side Angle",
      badge: "2 / 4",
    },
    {
      id: 2,
      src: "/images/product/pdp_fabric_macro.png",
      alt: "Balmain Tailored Wool Blazer - Fabric & Gold Button Detail",
      badge: "3 / 4",
    },
    {
      id: 3,
      src: "/images/product/pdp_outdoor_street.png",
      alt: "Balmain Tailored Wool Blazer - Street Style Look",
      badge: "4 / 4",
    },
  ];

  const handlePrevImage = () => {
    setActiveImageIndex((prev) => (prev === 0 ? galleryImages.length - 1 : prev - 1));
  };

  const handleNextImage = () => {
    setActiveImageIndex((prev) => (prev === galleryImages.length - 1 ? 0 : prev + 1));
  };

  const handleAddToCart = () => {
    setCartCount((prev) => prev + 1);
  };

  const colors = [
    { name: "Navy Blue", hex: "#1e293b" },
    { name: "Black", hex: "#0f172a" },
    { name: "Camel", hex: "#c29b7f" },
  ];

  const sizes = [
    { size: "36", recommended: false },
    { size: "38", recommended: false },
    { size: "40", recommended: true },
    { size: "42", recommended: false },
    { size: "44", recommended: false },
  ];

  return (
    <div className="pdp-page-wrapper">
      <div className="pdp-container">
        {/* =========================================================
            HEADER / NAVBAR
            ========================================================= */}
        <header className="pdp-navbar">
          <div className="pdp-nav-brand">
            <Logo size="md" />
          </div>

          <nav className="pdp-nav-menu">
            <Link href="/" className="pdp-nav-item active">
              Home
            </Link>
            <Link href="/catalog" className="pdp-nav-item">
              Catalog
            </Link>
            <Link href="/3d-studio" className="pdp-nav-item">
              3D Studio
            </Link>
            <Link href="/wardrobe" className="pdp-nav-item">
              Wardrobe
            </Link>
            <Link href="/community" className="pdp-nav-item">
              Community
            </Link>
          </nav>

          <div className="pdp-nav-actions">
            <div className="pdp-search-pill">
              <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="#94a3b8" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                <circle cx="11" cy="11" r="8" />
                <line x1="21" y1="21" x2="16.65" y2="16.65" />
              </svg>
              <input
                type="text"
                placeholder="Search brands, styles, or items..."
                className="pdp-search-input"
              />
            </div>

            <Link href="/cart" className="pdp-cart-btn" title="Cart" style={{ textDecoration: "none" }}>
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#64748b" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <circle cx="8" cy="21" r="1" />
                <circle cx="19" cy="21" r="1" />
                <path d="M2.05 2.05h2l2.66 12.42a2 2 0 0 0 2 1.58h9.78a2 2 0 0 0 1.95-1.57l1.65-7.43H5.12" />
              </svg>
              <span className="pdp-cart-badge">{cartCount}</span>
            </Link>

            <Link href="/digital-twin" className="pdp-user-avatar-wrap" title="User Profile">
              <Image
                src="/images/model_face.jpg"
                alt="User Profile"
                width={32}
                height={32}
                className="pdp-user-avatar-img"
              />
              <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="#64748b" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="pdp-user-chevron">
                <polyline points="6 9 12 15 18 9" />
              </svg>
            </Link>
          </div>
        </header>

        {/* =========================================================
            MAIN 2-COLUMN PDP LAYOUT
            ========================================================= */}
        <div className="pdp-main-grid">
          {/* ================= LEFT: GALLERY & TRUST BADGES ================= */}
          <div className="pdp-gallery-column">
            {/* Gallery Presentation: Big Main + Right 3 Stacked */}
            <div className="pdp-gallery-dual-stage">
              {/* Large Main Display */}
              <div className="pdp-main-stage">
                <Image
                  src={galleryImages[activeImageIndex].src}
                  alt={galleryImages[activeImageIndex].alt}
                  width={380}
                  height={500}
                  priority
                  className="pdp-stage-img"
                />

                {/* Balmain Paris Badge */}
                <div className="pdp-brand-floating-badge">
                  <span className="pdp-brand-logo-text">BALMAIN</span>
                  <span className="pdp-brand-sub-text">PARIS</span>
                </div>

                {/* Favorite Heart Button */}
                <button
                  type="button"
                  className={`pdp-heart-btn ${isLiked ? "liked" : ""}`}
                  onClick={() => setIsLiked(!isLiked)}
                  title="Save to Wishlist"
                >
                  <svg width="18" height="18" viewBox="0 0 24 24" fill={isLiked ? "#ef4444" : "#ffffff"} stroke={isLiked ? "#ef4444" : "#94a3b8"} strokeWidth="1.8">
                    <path d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z" />
                  </svg>
                </button>

                {/* Prev & Next Arrows */}
                <button
                  type="button"
                  className="pdp-stage-arrow pdp-arrow-prev"
                  onClick={handlePrevImage}
                  aria-label="Previous photo"
                >
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#475569" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                    <polyline points="15 18 9 12 15 6" />
                  </svg>
                </button>
                <button
                  type="button"
                  className="pdp-stage-arrow pdp-arrow-next"
                  onClick={handleNextImage}
                  aria-label="Next photo"
                >
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#475569" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                    <polyline points="9 18 15 12 9 6" />
                  </svg>
                </button>

                {/* Bottom Left Badge Indicator */}
                <div className="pdp-stage-count-badge">
                  {galleryImages[activeImageIndex].badge}
                </div>
              </div>

              {/* Right Stacked 3 Thumbnails */}
              <div className="pdp-right-thumbnails-col">
                <button
                  type="button"
                  className={`pdp-thumb-slot ${activeImageIndex === 1 ? "active" : ""}`}
                  onClick={() => setActiveImageIndex(1)}
                >
                  <Image
                    src="/images/product/pdp_side_angle.png"
                    alt="Side View"
                    width={150}
                    height={155}
                    className="pdp-thumb-img"
                  />
                  <span className="pdp-thumb-count">2 / 4</span>
                </button>

                <button
                  type="button"
                  className={`pdp-thumb-slot ${activeImageIndex === 2 ? "active" : ""}`}
                  onClick={() => setActiveImageIndex(2)}
                >
                  <Image
                    src="/images/product/pdp_fabric_macro.png"
                    alt="Fabric Detail"
                    width={150}
                    height={155}
                    className="pdp-thumb-img"
                  />
                  <span className="pdp-thumb-count">3 / 4</span>
                </button>

                <button
                  type="button"
                  className={`pdp-thumb-slot ${activeImageIndex === 3 ? "active" : ""}`}
                  onClick={() => setActiveImageIndex(3)}
                >
                  <Image
                    src="/images/product/pdp_outdoor_street.png"
                    alt="Street Style View"
                    width={150}
                    height={155}
                    className="pdp-thumb-img"
                  />
                  <span className="pdp-thumb-count">4 / 4</span>
                </button>
              </div>
            </div>

            {/* Bottom Horizontal Thumbnails Strip (5 items) */}
            <div className="pdp-bottom-strip">
              {galleryImages.map((img, idx) => (
                <button
                  key={img.id}
                  type="button"
                  className={`pdp-strip-item ${activeImageIndex === idx ? "active" : ""}`}
                  onClick={() => setActiveImageIndex(idx)}
                >
                  <Image
                    src={img.src}
                    alt={img.alt}
                    width={64}
                    height={72}
                    className="pdp-strip-img"
                  />
                </button>
              ))}

              {/* View Video Button */}
              <button
                type="button"
                className="pdp-video-btn"
                onClick={() => alert("3D Runway Video playback initialized.")}
              >
                <div className="pdp-video-icon-circle">
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="#64748b" stroke="none">
                    <polygon points="5 3 19 12 5 21 5 3" />
                  </svg>
                </div>
                <span className="pdp-video-label">View Video</span>
              </button>
            </div>

            {/* Bottom Trust Badges (4 items) */}
            <div className="pdp-trust-row">
              <div className="pdp-trust-item">
                <div className="pdp-trust-icon">
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#475569" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
                    <polyline points="9 12 11 14 15 10" />
                  </svg>
                </div>
                <div className="pdp-trust-text">
                  <span className="pdp-trust-title">Authentic Brands</span>
                  <span className="pdp-trust-sub">100% Original</span>
                </div>
              </div>

              <div className="pdp-trust-item">
                <div className="pdp-trust-icon">
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#475569" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <rect width="20" height="14" x="2" y="5" rx="2" />
                    <line x1="2" x2="22" y1="10" y2="10" />
                  </svg>
                </div>
                <div className="pdp-trust-text">
                  <span className="pdp-trust-title">Secure Payments</span>
                  <span className="pdp-trust-sub">Klarna / Stripe</span>
                </div>
              </div>

              <div className="pdp-trust-item">
                <div className="pdp-trust-icon">
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#475569" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z" />
                    <polyline points="3.29 7 12 12 20.71 7" />
                    <line x1="12" x2="12" y1="22" y2="12" />
                  </svg>
                </div>
                <div className="pdp-trust-text">
                  <span className="pdp-trust-title">Free Returns</span>
                  <span className="pdp-trust-sub">Within 30 Days</span>
                </div>
              </div>

              <div className="pdp-trust-item">
                <div className="pdp-trust-icon">
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#475569" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M3 18v-6a9 9 0 0 1 18 0v6" />
                    <path d="M21 19a2 2 0 0 1-2 2h-1a2 2 0 0 1-2-2v-3a2 2 0 0 1 2-2h3zM3 19a2 2 0 0 0 2 2h1a2 2 0 0 0 2-2v-3a2 2 0 0 0-2-2H3z" />
                  </svg>
                </div>
                <div className="pdp-trust-text">
                  <span className="pdp-trust-title">24/7 Support</span>
                  <span className="pdp-trust-sub">Fashion Experts</span>
                </div>
              </div>
            </div>
          </div>

          {/* ================= RIGHT: PRODUCT DETAILS PANEL ================= */}
          <div className="pdp-details-card">
            {/* Brand Logo */}
            <div className="pdp-brand-header">
              <span className="pdp-brand-name">B A L M A I N</span>
              <span className="pdp-brand-city">P A R I S</span>
            </div>

            {/* Product Title */}
            <h1 className="pdp-product-title">
              Tailored Structured Wool Grain de Poudre Blazer
            </h1>

            {/* Price & Klarna Installments */}
            <div className="pdp-price-row">
              <span className="pdp-main-price">$1,290.00</span>
              <span className="pdp-klarna-text">
                or 4 interest-free payments of $322.50
              </span>
              <span className="pdp-klarna-badge">Klarna.</span>
            </div>

            {/* ================= FITVISOR AI RECOMMENDATION BOX ================= */}
            <div className="pdp-ai-box">
              <div className="pdp-ai-header">
                <div className="pdp-ai-title-wrap">
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#f43f5e" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round">
                    <path d="m15 4-2 2M15 4l2 2M15 4v4M15 4h4" />
                    <path d="M11 20 3.5 12.5a2.12 2.12 0 0 1 3-3L14 17" />
                    <path d="m9 18 3 3" />
                  </svg>
                  <span className="pdp-ai-title">FitVisor AI Recommendation</span>
                </div>
                <span className="pdp-ai-powered">Powered by your 3D body scan ✦</span>
              </div>

              <div className="pdp-ai-rec-row">
                <div className="pdp-check-icon">
                  <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="#ffffff" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
                    <polyline points="20 6 9 17 4 12" />
                  </svg>
                </div>
                <span className="pdp-rec-size-text">
                  Recommended Size: <strong>M (US 6)</strong> &mdash; Confidence <strong>96%</strong>
                </span>
              </div>

              <p className="pdp-ai-reason">
                <strong>Reason:</strong> Perfect fit across your shoulders (42cm). 2cm comfortable ease at waist for a flattering tailored silhouette.
              </p>
            </div>

            {/* Color Selector */}
            <div className="pdp-option-group">
              <div className="pdp-option-label-row">
                <span className="pdp-option-label">Color:</span>
                <span className="pdp-option-value">{selectedColor}</span>
              </div>
              <div className="pdp-color-swatches">
                {colors.map((c) => (
                  <button
                    key={c.name}
                    type="button"
                    className={`pdp-swatch-circle ${selectedColor === c.name ? "active" : ""}`}
                    style={{ backgroundColor: c.hex }}
                    onClick={() => setSelectedColor(c.name)}
                    title={c.name}
                  />
                ))}
              </div>
            </div>

            {/* Size Selector */}
            <div className="pdp-option-group">
              <div className="pdp-option-label-row">
                <span className="pdp-option-label">Size:</span>
                <span className="pdp-size-hint">
                  Runs true to size. Check your FitVisor measurements.
                </span>
              </div>
              <div className="pdp-size-row">
                {sizes.map((s) => (
                  <div key={s.size} className="pdp-size-btn-wrap">
                    {s.recommended && (
                      <span className="pdp-rec-tag">Recommended</span>
                    )}
                    <button
                      type="button"
                      className={`pdp-size-btn ${selectedSize === s.size ? "active" : ""} ${s.recommended ? "recommended-border" : ""}`}
                      onClick={() => setSelectedSize(s.size)}
                    >
                      {s.size}
                    </button>
                  </div>
                ))}
              </div>
            </div>

            {/* Primary Action 1: Try in 3D */}
            <Link href="/digital-twin" className="pdp-tryon-cta-btn">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M16 7a4 4 0 0 0-8 0v1" />
                <path d="M2 17l10-8 10 8H2z" />
              </svg>
              <span>Try in 3D on My Avatar</span>
            </Link>

            {/* Primary Action 2: Add to Cart */}
            <button
              type="button"
              className="pdp-add-cart-btn"
              onClick={handleAddToCart}
            >
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                <circle cx="8" cy="21" r="1" />
                <circle cx="19" cy="21" r="1" />
                <path d="M2.05 2.05h2l2.66 12.42a2 2 0 0 0 2 1.58h9.78a2 2 0 0 0 1.95-1.57l1.65-7.43H5.12" />
              </svg>
              <span>Add to Cart</span>
            </button>

            {/* Reserve in Store Fitting Card */}
            <button
              type="button"
              className={`pdp-reserve-card ${isReserved ? "reserved" : ""}`}
              onClick={() => setIsReserved(!isReserved)}
            >
              <div className="pdp-reserve-icon">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#2563eb" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M3 21h18M3 7v1a3 3 0 0 0 6 0V7m0 1a3 3 0 0 0 6 0V7m0 1a3 3 0 0 0 6 0V7H3l2-4h14l2 4" />
                </svg>
              </div>
              <div className="pdp-reserve-text">
                <span className="pdp-reserve-title">
                  {isReserved ? "Fitting Booked for Tomorrow ✓" : "Reserve in Store for Physical Fitting"}
                </span>
                <span className="pdp-reserve-sub">Available at Downtown Store 📍</span>
              </div>
            </button>

            {/* Accordion 1: Fabric & Stretch */}
            <div className="pdp-accordion-item">
              <button
                type="button"
                className="pdp-accordion-header"
                onClick={() => setFabricOpen(!fabricOpen)}
              >
                <div className="pdp-accordion-left">
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#64748b" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <circle cx="6" cy="6" r="3" />
                    <circle cx="6" cy="18" r="3" />
                    <line x1="20" x2="8.12" y1="4" y2="15.88" />
                    <line x1="14.47" x2="20" y1="14.48" y2="20" />
                    <line x1="8.12" x2="12" y1="8.12" y2="12" />
                  </svg>
                  <div className="pdp-accordion-title-col">
                    <span className="pdp-acc-title">Fabric &amp; Stretch</span>
                    <span className="pdp-acc-sub">98% Virgin Wool, 2% Elastane</span>
                  </div>
                </div>
                <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="#64748b" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className={`pdp-acc-chevron ${fabricOpen ? "open" : ""}`}>
                  <polyline points="6 9 12 15 18 9" />
                </svg>
              </button>
              {fabricOpen && (
                <div className="pdp-accordion-content">
                  <p>Expertly tailored in France using premium grain de poudre wool with natural give for all-day comfort. Dry clean only.</p>
                </div>
              )}
            </div>

            {/* Accordion 2: Shipping & Free Returns Policy */}
            <div className="pdp-accordion-item">
              <button
                type="button"
                className="pdp-accordion-header"
                onClick={() => setShippingOpen(!shippingOpen)}
              >
                <div className="pdp-accordion-left">
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#64748b" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <rect width="16" height="13" x="1" y="3" rx="2" />
                    <polygon points="16 8 20 8 23 11 23 16 16 16 16 8" />
                    <circle cx="5.5" cy="18.5" r="2.5" />
                    <circle cx="18.5" cy="18.5" r="2.5" />
                  </svg>
                  <span className="pdp-acc-title">Shipping &amp; Free Returns Policy</span>
                </div>
                <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="#64748b" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className={`pdp-acc-chevron ${shippingOpen ? "open" : ""}`}>
                  <polyline points="6 9 12 15 18 9" />
                </svg>
              </button>
              {shippingOpen && (
                <div className="pdp-accordion-content">
                  <p>Enjoy complimentary DHL Express 2-day shipping and prepaid 30-day hassle-free returns on all FitVisor verified orders.</p>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
