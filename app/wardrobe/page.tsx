"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import Logo from "@/components/Logo";

interface Garment {
  id: string;
  name: string;
  price: string;
  thumb: string;
}

interface OutfitCapsule {
  id: string;
  title: string;
  category: "Business" | "Casual" | "Evening";
  formula: string;
  typeThumb: string;
  stageImg: string;
  garments: Garment[];
  totalPrice: string;
  itemsCount: number;
}

const INITIAL_CAPSULES: OutfitCapsule[] = [
  {
    id: "power-business",
    title: "Power Business Look",
    category: "Business",
    formula: "Navy Blazer + Silk Shirt + Tailored Trousers",
    typeThumb: "/images/wardrobe/thumb_blazer.png",
    stageImg: "/images/wardrobe/model_business_suit.png",
    garments: [
      {
        id: "blazer",
        name: "Navy Blazer",
        price: "$980.00",
        thumb: "/images/wardrobe/thumb_blazer.png",
      },
      {
        id: "shirt",
        name: "Silk Shirt",
        price: "$320.00",
        thumb: "/images/wardrobe/thumb_shirt.png",
      },
      {
        id: "trousers",
        name: "Tailored Trousers",
        price: "$540.00",
        thumb: "/images/wardrobe/thumb_trousers.png",
      },
    ],
    totalPrice: "$1,840.00",
    itemsCount: 3,
  },
  {
    id: "casual-weekend",
    title: "Casual Weekend",
    category: "Casual",
    formula: "Cashmere Sweater + Straight Denim + White Sneakers",
    typeThumb: "/images/wardrobe/thumb_sweater.png",
    stageImg: "/images/wardrobe/model_casual_weekend.png",
    garments: [
      {
        id: "sweater",
        name: "Cashmere Sweater",
        price: "$360.00",
        thumb: "/images/wardrobe/thumb_sweater.png",
      },
      {
        id: "denim",
        name: "Straight Denim",
        price: "$280.00",
        thumb: "/images/wardrobe/thumb_denim.png",
      },
      {
        id: "sneakers",
        name: "White Sneakers",
        price: "$180.00",
        thumb: "/images/wardrobe/thumb_sneakers.png",
      },
    ],
    totalPrice: "$820.00",
    itemsCount: 3,
  },
];

export default function WardrobePage() {
  const [activeTab, setActiveTab] = useState<"outfits" | "saved" | "history">("outfits");
  const [capsules, setCapsules] = useState<OutfitCapsule[]>(INITIAL_CAPSULES);
  const [searchKeyword, setSearchKeyword] = useState<string>("");
  const [deletedToast, setDeletedToast] = useState<string | null>(null);

  const handleDeleteCapsule = (id: string, title: string) => {
    setCapsules((prev) => prev.filter((c) => c.id !== id));
    setDeletedToast(`Removed "${title}" from your wardrobe`);
    setTimeout(() => {
      setDeletedToast(null);
    }, 3500);
  };

  const handleRestore = () => {
    setCapsules(INITIAL_CAPSULES);
    setDeletedToast(null);
  };

  const filteredCapsules = capsules.filter((c) => {
    if (searchKeyword.trim() === "") return true;
    const q = searchKeyword.toLowerCase();
    return (
      c.title.toLowerCase().includes(q) ||
      c.formula.toLowerCase().includes(q) ||
      c.garments.some((g) => g.name.toLowerCase().includes(q))
    );
  });

  return (
    <div className="ward-page-wrapper">
      <div className="ward-container">
        {/* ================= HEADER / NAVBAR ================= */}
        <header className="cat-navbar" style={{ marginBottom: "26px" }}>
          <div className="cat-nav-brand">
            <Logo size="md" />
          </div>

          <nav className="cat-nav-menu">
            <Link href="/" className="cat-nav-item">
              Home
            </Link>
            <Link href="/catalog" className="cat-nav-item">
              Catalog
            </Link>
            <Link href="/3d-studio" className="cat-nav-item">
              3D Studio
            </Link>
            <Link href="/wardrobe" className="cat-nav-item active">
              Wardrobe
            </Link>
            <Link href="/community" className="cat-nav-item">
              Community
            </Link>
          </nav>

          <div className="cat-nav-actions">
            <div className="cat-search-pill">
              <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="#94a3b8" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                <circle cx="11" cy="11" r="8" />
                <line x1="21" y1="21" x2="16.65" y2="16.65" />
              </svg>
              <input
                type="text"
                placeholder="Search brands, styles, or items..."
                value={searchKeyword}
                onChange={(e) => setSearchKeyword(e.target.value)}
                className="cat-search-input"
              />
            </div>

            <Link href="/cart" className="cat-cart-btn" title="Cart" style={{ textDecoration: "none" }}>
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#64748b" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <circle cx="8" cy="21" r="1" />
                <circle cx="19" cy="21" r="1" />
                <path d="M2.05 2.05h2l2.66 12.42a2 2 0 0 0 2 1.58h9.78a2 2 0 0 0 1.95-1.57l1.65-7.43H5.12" />
              </svg>
              <span className="cat-cart-badge">3</span>
            </Link>

            <div className="cat-user-avatar-wrap" style={{ display: "flex", alignItems: "center", gap: "4px" }}>
              <Image
                src="/images/model_face.jpg"
                alt="User Profile"
                width={32}
                height={32}
                className="cat-user-avatar-img"
              />
              <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="#64748b" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <polyline points="6 9 12 15 18 9"></polyline>
              </svg>
            </div>
          </div>
        </header>

        {/* ================= HERO / CONTROL BAR ================= */}
        <section className="ward-hero-section">
          {/* Left Title & Tab Controls */}
          <div className="ward-hero-left">
            <div className="ward-title-group">
              <div className="ward-heading-row">
                <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="#0f224a" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" className="ward-hanger-icon">
                  <path d="M12 4a3 3 0 0 1 3 3c0 1.3-.84 2.4-2 2.82V12l7 6H4l7-6V9.82C9.84 9.4 9 8.3 9 7a3 3 0 0 1 3-3z" />
                </svg>
                <h1 className="ward-main-title">Mon Dressing</h1>
              </div>
              <p className="ward-subtitle">Your virtual wardrobe. Organized, styled, always with you.</p>
            </div>

            {/* Tab Switcher Pills */}
            <div className="ward-tabs-row">
              <button
                type="button"
                className={`ward-tab-pill ${activeTab === "outfits" ? "active" : ""}`}
                onClick={() => setActiveTab("outfits")}
              >
                <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M12 4a3 3 0 0 1 3 3c0 1.3-.84 2.4-2 2.82V12l7 6H4l7-6V9.82C9.84 9.4 9 8.3 9 7a3 3 0 0 1 3-3z" />
                </svg>
                <span>My Complete Outfits ({capsules.length})</span>
              </button>

              <button
                type="button"
                className={`ward-tab-pill ${activeTab === "saved" ? "active" : ""}`}
                onClick={() => setActiveTab("saved")}
              >
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M19 21l-7-5-7 5V5a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2z"></path>
                </svg>
                <span>Saved Garments (12)</span>
              </button>

              <button
                type="button"
                className={`ward-tab-pill ${activeTab === "history" ? "active" : ""}`}
                onClick={() => setActiveTab("history")}
              >
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <circle cx="12" cy="12" r="10"></circle>
                  <polyline points="12 6 12 12 16 14"></polyline>
                </svg>
                <span>Try-On History (28)</span>
              </button>
            </div>
          </div>

          {/* Right Sync & Utilization Card */}
          <div className="ward-sync-card">
            {/* Top row: Zalando + H&M Sync */}
            <div className="ward-sync-row">
              <div className="ward-sync-logos">
                <span className="ward-zalando-badge">
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="#ff6900">
                    <polygon points="5 3 19 12 5 21 5 3"></polygon>
                  </svg>
                  <span>zalando</span>
                </span>

                <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="#94a3b8" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" className="ward-link-icon">
                  <path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71"></path>
                  <path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71"></path>
                </svg>

                <span className="ward-hm-badge">H&amp;M</span>
              </div>

              <span className="ward-sync-label">Wardrobe synced with Zalando and H&amp;M</span>

              <div className="ward-sync-status-icon">
                <svg width="17" height="17" viewBox="0 0 24 24" fill="#10b981">
                  <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"/>
                </svg>
              </div>
            </div>

            {/* Bottom row: Circular Utilization Widget */}
            <div className="ward-utilization-row">
              <div className="ward-donut-wrap">
                <svg className="ward-donut-svg" viewBox="0 0 36 36">
                  <path
                    className="ward-donut-bg"
                    d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                    fill="none"
                  />
                  <path
                    className="ward-donut-fg"
                    strokeDasharray="78, 100"
                    d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                    fill="none"
                  />
                </svg>
                <div className="ward-donut-text">78%</div>
              </div>

              <div className="ward-utilization-info">
                <span className="ward-util-title">Clothing utilization rate</span>
                <span className="ward-util-sub">You&apos;re getting great use out of your wardrobe!</span>
              </div>

              <div className="ward-chart-icon">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                  <line x1="18" y1="20" x2="18" y2="10"></line>
                  <line x1="12" y1="20" x2="12" y2="4"></line>
                  <line x1="6" y1="20" x2="6" y2="14"></line>
                </svg>
              </div>
            </div>
          </div>
        </section>

        {/* Delete notification toast */}
        {deletedToast && (
          <div
            style={{
              background: "#1e293b",
              color: "#ffffff",
              padding: "10px 18px",
              borderRadius: "12px",
              marginBottom: "16px",
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              fontSize: "12.5px",
            }}
          >
            <span>{deletedToast}</span>
            <button
              type="button"
              onClick={handleRestore}
              style={{
                background: "none",
                border: "none",
                color: "#38bdf8",
                fontWeight: "bold",
                cursor: "pointer",
                padding: "2px 6px",
              }}
            >
              Undo
            </button>
          </div>
        )}

        {/* ================= 2-COLUMN OUTFITS GRID ================= */}
        {activeTab === "outfits" && (
          <div className="ward-outfits-grid">
            {filteredCapsules.map((capsule) => (
              <article key={capsule.id} className="ward-outfit-card">
                {/* Header */}
                <div className="ward-card-header">
                  <div className="ward-card-header-left">
                    <div className="ward-card-type-icon">
                      <Image
                        src={capsule.typeThumb}
                        alt={capsule.title}
                        width={32}
                        height={32}
                        className="ward-card-type-img"
                      />
                    </div>
                    <div className="ward-card-title-group">
                      <div className="ward-card-title-row">
                        <h2 className="ward-card-title">{capsule.title}</h2>
                        <span className="ward-badge-pill">{capsule.category}</span>
                      </div>
                      <span className="ward-card-formula">{capsule.formula}</span>
                    </div>
                  </div>

                  <button type="button" className="ward-options-btn" title="More options">
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
                      <circle cx="12" cy="12" r="2" />
                      <circle cx="19" cy="12" r="2" />
                      <circle cx="5" cy="12" r="2" />
                    </svg>
                  </button>
                </div>

                {/* Content: Stage (Left) & Garments (Right) */}
                <div className="ward-card-content">
                  {/* Left: 3D Model on glowing pedestal stage */}
                  <div className="ward-stage-wrap">
                    <Image
                      src={capsule.stageImg}
                      alt={`${capsule.title} 3D Avatar Try-On`}
                      width={240}
                      height={240}
                      className="ward-stage-img"
                      priority
                    />
                  </div>

                  {/* Right: Garment breakdown list */}
                  <div className="ward-garments-list">
                    {capsule.garments.map((g) => (
                      <div key={g.id} className="ward-garment-item">
                        <div className="ward-garment-thumb-wrap">
                          <Image
                            src={g.thumb}
                            alt={g.name}
                            width={38}
                            height={44}
                            className="ward-garment-thumb"
                          />
                        </div>
                        <div className="ward-garment-meta">
                          <span className="ward-garment-name">{g.name}</span>
                          <span className="ward-garment-price">{g.price}</span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Footer */}
                <div className="ward-card-footer">
                  <div className="ward-price-action-row">
                    <div className="ward-price-group">
                      <span className="ward-price-label">Total Price</span>
                      <div className="ward-price-val-row">
                        <span className="ward-price-val">{capsule.totalPrice}</span>
                        <span className="ward-items-count-pill">{capsule.itemsCount} Items</span>
                      </div>
                    </div>

                    <Link href="/3d-studio" className="ward-open-studio-btn">
                      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z"></path>
                        <polyline points="3.27 6.96 12 12.01 20.73 6.96"></polyline>
                        <line x1="12" y1="22.08" x2="12" y2="12"></line>
                      </svg>
                      <span>Open in 3D Studio</span>
                    </Link>
                  </div>

                  {/* Secondary Actions */}
                  <div className="ward-secondary-actions-row">
                    <div style={{ display: "flex", gap: "6px" }}>
                      <Link href="/3d-studio/layering" className="ward-action-pill-btn">
                        <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                          <path d="M17 3a2.828 2.828 0 1 1 4 4L7.5 20.5 2 22l1.5-5.5L17 3z"></path>
                        </svg>
                        <span>Edit</span>
                      </Link>

                      <Link href="/3d-studio/ask-friend" className="ward-action-pill-btn">
                        <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                          <circle cx="18" cy="5" r="3"></circle>
                          <circle cx="6" cy="12" r="3"></circle>
                          <circle cx="18" cy="19" r="3"></circle>
                          <line x1="8.59" y1="13.51" x2="15.42" y2="17.49"></line>
                          <line x1="15.41" y1="6.51" x2="8.59" y2="10.49"></line>
                        </svg>
                        <span>Share with Friend</span>
                      </Link>

                      <button
                        type="button"
                        className="ward-action-pill-btn"
                        onClick={() => handleDeleteCapsule(capsule.id, capsule.title)}
                        title="Delete capsule"
                      >
                        <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                          <polyline points="3 6 5 6 21 6"></polyline>
                          <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path>
                        </svg>
                        <span>Delete</span>
                      </button>
                    </div>

                    <Link href="/cart" className="ward-purchase-capsule-btn">
                      <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <circle cx="8" cy="21" r="1" />
                        <circle cx="19" cy="21" r="1" />
                        <path d="M2.05 2.05h2l2.66 12.42a2 2 0 0 0 2 1.58h9.78a2 2 0 0 0 1.95-1.57l1.65-7.43H5.12" />
                      </svg>
                      <span>Purchase Capsule Selection</span>
                    </Link>
                  </div>
                </div>
              </article>
            ))}
          </div>
        )}

        {/* Saved Garments tab placeholder */}
        {activeTab === "saved" && (
          <div style={{ background: "#ffffff", borderRadius: "18px", padding: "40px 20px", textAlign: "center", marginBottom: "26px", border: "1px solid #e2e8f0" }}>
            <h3 style={{ fontSize: "16px", color: "#0f224a", marginBottom: "8px" }}>12 Saved Individual Garments</h3>
            <p style={{ fontSize: "13px", color: "#64748b" }}>Blazers, Cashmere Sweaters, Silk Shirts, and Tailored Denim in your saved collection.</p>
          </div>
        )}

        {/* History tab placeholder */}
        {activeTab === "history" && (
          <div style={{ background: "#ffffff", borderRadius: "18px", padding: "40px 20px", textAlign: "center", marginBottom: "26px", border: "1px solid #e2e8f0" }}>
            <h3 style={{ fontSize: "16px", color: "#0f224a", marginBottom: "8px" }}>28 Virtual Try-On Sessions Recorded</h3>
            <p style={{ fontSize: "13px", color: "#64748b" }}>Complete tension heatmaps, fit score history, and sync comparisons.</p>
          </div>
        )}

        {/* ================= BOTTOM BAR: MORE CAPSULES ================= */}
        <section className="ward-more-capsules-box">
          <div className="ward-more-title-group">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#0f224a" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M12 4a3 3 0 0 1 3 3c0 1.3-.84 2.4-2 2.82V12l7 6H4l7-6V9.82C9.84 9.4 9 8.3 9 7a3 3 0 0 1 3-3z" />
            </svg>
            <h3 className="ward-more-title">More Capsules</h3>
          </div>

          <Link href="/catalog" className="ward-view-all-link">
            <span>View All</span>
            <span>→</span>
          </Link>
        </section>
      </div>
    </div>
  );
}
