"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import Logo from "@/components/Logo";

export default function PricingPage() {
  const [openFaq, setOpenFaq] = useState<Record<number, boolean>>({
    0: false,
    1: false,
  });

  const [upgradeModal, setUpgradeModal] = useState<string | null>(null);

  const toggleFaq = (index: number) => {
    setOpenFaq((prev) => ({
      ...prev,
      [index]: !prev[index],
    }));
  };

  return (
    <div className="prc-page-wrapper">
      <div className="prc-container">
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
            <Link href="/wardrobe" className="cat-nav-item">
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
                className="cat-search-input"
              />
            </div>

            <Link href="/cart" className="cat-cart-btn" title="Cart" style={{ textDecoration: "none" }}>
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#64748b" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <circle cx="8" cy="21" r="1" />
                <circle cx="19" cy="21" r="1" />
                <path d="M2.05 2.05h2l2.66 12.42a2 2 0 0 0 2 1.58h9.78a2 2 0 0 0 1.95-1.57l1.65-7.43H5.12" />
              </svg>
              <span className="cat-cart-badge">1</span>
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

        {/* ================= HERO SECTION ================= */}
        <section className="prc-hero-section">
          <div className="prc-crown-row">
            <span className="prc-crown-line"></span>
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#1e3a8a" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" className="prc-crown-icon">
              <path d="M2 4l3 12h14l3-12-6 7-4-7-4 7-6-7zm3 16h14"></path>
            </svg>
            <span className="prc-crown-line"></span>
          </div>

          <h1 className="prc-main-title">Choose the Plan That Fits Your Style</h1>
          <p className="prc-subtitle">
            Unlimited 3D scans, advanced fabric physics simulation, and family wardrobe sharing.
          </p>
        </section>

        {/* ================= 3-COLUMN PLANS GRID ================= */}
        <div className="prc-plans-grid">
          {/* Card 1: Free Plan */}
          <article className="prc-card">
            <div className="prc-card-top">
              <div className="prc-plan-header">
                <div className="prc-plan-icon-circle free">
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path>
                    <circle cx="12" cy="7" r="4"></circle>
                  </svg>
                </div>
                <h2 className="prc-plan-name">Free Plan</h2>
              </div>

              <div className="prc-price-row">
                <span className="prc-price-amount">$0</span>
                <span className="prc-price-period">/ month</span>
              </div>

              <div className="prc-features-list">
                <div className="prc-feature-item">
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="#1e3a8a" className="prc-check-icon">
                    <circle cx="12" cy="12" r="10" fill="#1e3a8a" />
                    <polyline points="8 12 11 15 16 9" stroke="#ffffff" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" fill="none" />
                  </svg>
                  <span className="prc-feature-text">1 Basic 3D body scan</span>
                </div>

                <div className="prc-feature-item">
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="#1e3a8a" className="prc-check-icon">
                    <circle cx="12" cy="12" r="10" fill="#1e3a8a" />
                    <polyline points="8 12 11 15 16 9" stroke="#ffffff" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" fill="none" />
                  </svg>
                  <span className="prc-feature-text">2 virtual try-ons per month</span>
                </div>

                <div className="prc-feature-item">
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="#1e3a8a" className="prc-check-icon">
                    <circle cx="12" cy="12" r="10" fill="#1e3a8a" />
                    <polyline points="8 12 11 15 16 9" stroke="#ffffff" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" fill="none" />
                  </svg>
                  <span className="prc-feature-text">Standard partner catalog access</span>
                </div>
              </div>
            </div>

            <button type="button" className="prc-btn-current" disabled>
              Current Plan
            </button>
          </article>

          {/* Card 2: Pro Plan (Most Popular) */}
          <article className="prc-card featured">
            <span className="prc-popular-pill">Most Popular</span>

            <div className="prc-card-top">
              <div className="prc-plan-header">
                <div className="prc-plan-icon-circle pro">
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M2 4l3 12h14l3-12-6 7-4-7-4 7-6-7zm3 16h14"></path>
                  </svg>
                </div>
                <h2 className="prc-plan-name">Pro Plan</h2>
              </div>

              <div className="prc-price-row">
                <span className="prc-price-amount">$3.99</span>
                <span className="prc-price-period">/ month</span>
              </div>

              <div className="prc-features-list">
                <div className="prc-feature-item">
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="#f04b55" className="prc-check-icon">
                    <circle cx="12" cy="12" r="10" fill="#f04b55" />
                    <polyline points="8 12 11 15 16 9" stroke="#ffffff" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" fill="none" />
                  </svg>
                  <span className="prc-feature-text">Unlimited 3D body scans &amp; mesh updates</span>
                </div>

                <div className="prc-feature-item">
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="#f04b55" className="prc-check-icon">
                    <circle cx="12" cy="12" r="10" fill="#f04b55" />
                    <polyline points="8 12 11 15 16 9" stroke="#ffffff" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" fill="none" />
                  </svg>
                  <span className="prc-feature-text">Realistic fabric drape &amp; dynamic movement physics</span>
                </div>

                <div className="prc-feature-item">
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="#f04b55" className="prc-check-icon">
                    <circle cx="12" cy="12" r="10" fill="#f04b55" />
                    <polyline points="8 12 11 15 16 9" stroke="#ffffff" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" fill="none" />
                  </svg>
                  <span className="prc-feature-text">Real-time fabric tension heatmap &amp; fit diagnostics</span>
                </div>

                <div className="prc-feature-item">
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="#f04b55" className="prc-check-icon">
                    <circle cx="12" cy="12" r="10" fill="#f04b55" />
                    <polyline points="8 12 11 15 16 9" stroke="#ffffff" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" fill="none" />
                  </svg>
                  <span className="prc-feature-text">Priority in-store boutique reservation</span>
                </div>
              </div>
            </div>

            <button
              type="button"
              className="prc-btn-pro"
              onClick={() => setUpgradeModal("Pro Plan ($3.99/mo)")}
            >
              <span>Upgrade to Pro (7-Day Free Trial)</span>
              <span>→</span>
            </button>
          </article>

          {/* Card 3: Family Plan */}
          <article className="prc-card">
            <div className="prc-card-top">
              <div className="prc-plan-header">
                <div className="prc-plan-icon-circle family">
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"></path>
                    <circle cx="9" cy="7" r="4"></circle>
                    <path d="M23 21v-2a4 4 0 0 0-3-3.87"></path>
                    <path d="M16 3.13a4 4 0 0 1 0 7.75"></path>
                  </svg>
                </div>
                <h2 className="prc-plan-name">Family Plan</h2>
              </div>

              <div className="prc-price-row">
                <span className="prc-price-amount">$6.99</span>
                <span className="prc-price-period">/ month</span>
              </div>

              <div className="prc-features-list">
                <div className="prc-feature-item">
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="#1e3a8a" className="prc-check-icon">
                    <circle cx="12" cy="12" r="10" fill="#1e3a8a" />
                    <polyline points="8 12 11 15 16 9" stroke="#ffffff" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" fill="none" />
                  </svg>
                  <span className="prc-feature-text">Up to 5 member morphological avatars</span>
                </div>

                <div className="prc-feature-item">
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="#1e3a8a" className="prc-check-icon">
                    <circle cx="12" cy="12" r="10" fill="#1e3a8a" />
                    <polyline points="8 12 11 15 16 9" stroke="#ffffff" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" fill="none" />
                  </svg>
                  <span className="prc-feature-text">Shared family lookbook &amp; cross-wardrobe styling</span>
                </div>

                <div className="prc-feature-item">
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="#1e3a8a" className="prc-check-icon">
                    <circle cx="12" cy="12" r="10" fill="#1e3a8a" />
                    <polyline points="8 12 11 15 16 9" stroke="#ffffff" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" fill="none" />
                  </svg>
                  <span className="prc-feature-text">All Pro features included</span>
                </div>
              </div>
            </div>

            <button
              type="button"
              className="prc-btn-family"
              onClick={() => setUpgradeModal("Family Plan ($6.99/mo)")}
            >
              <span>Choose Family Plan</span>
              <span>→</span>
            </button>
          </article>
        </div>

        {/* ================= FAQ SECTION ================= */}
        <section className="prc-faq-section">
          <div className="prc-faq-header">
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#0f224a" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" className="prc-faq-icon">
              <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"></path>
            </svg>
            <h3 className="prc-faq-title">Frequently Asked Questions</h3>
          </div>

          <div className="prc-faq-list">
            {/* FAQ 1 */}
            <div className="prc-faq-card" onClick={() => toggleFaq(0)}>
              <div className="prc-faq-card-header">
                <span className="prc-faq-question">Can I cancel anytime?</span>
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={`prc-faq-chevron ${openFaq[0] ? "open" : ""}`}>
                  <polyline points="6 9 12 15 18 9"></polyline>
                </svg>
              </div>
              {openFaq[0] && (
                <p className="prc-faq-answer">
                  Yes, absolutely. You can cancel or pause your subscription with one click from your account settings at any time without penalty or cancellation fees.
                </p>
              )}
            </div>

            {/* FAQ 2 */}
            <div className="prc-faq-card" onClick={() => toggleFaq(1)}>
              <div className="prc-faq-card-header">
                <span className="prc-faq-question">How does the 7-day trial work?</span>
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={`prc-faq-chevron ${openFaq[1] ? "open" : ""}`}>
                  <polyline points="6 9 12 15 18 9"></polyline>
                </svg>
              </div>
              {openFaq[1] && (
                <p className="prc-faq-answer">
                  Your 7-day free trial gives you full, unrestricted access to all Pro features—including real-time fabric tension heatmaps, unlimited avatar body scans, and realistic drape simulations. You will not be billed until the 7th day, and you can cancel anytime beforehand.
                </p>
              )}
            </div>
          </div>
        </section>
      </div>

      {/* Upgrade Modal */}
      {upgradeModal && (
        <div
          style={{
            position: "fixed",
            inset: 0,
            background: "rgba(15, 23, 42, 0.7)",
            backdropFilter: "blur(6px)",
            zIndex: 9999,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            padding: "20px",
          }}
          onClick={() => setUpgradeModal(null)}
        >
          <div
            style={{
              background: "#ffffff",
              borderRadius: "24px",
              padding: "32px",
              maxWidth: "460px",
              width: "100%",
              boxShadow: "0 25px 50px -12px rgba(0, 0, 0, 0.25)",
              border: "1px solid #e2e8f0",
              textAlign: "center",
            }}
            onClick={(e) => e.stopPropagation()}
          >
            <div
              style={{
                width: "56px",
                height: "56px",
                borderRadius: "50%",
                background: "#fee2e2",
                color: "#f04b55",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                margin: "0 auto 16px auto",
              }}
            >
              <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M2 4l3 12h14l3-12-6 7-4-7-4 7-6-7zm3 16h14"></path>
              </svg>
            </div>
            <h3 style={{ fontSize: "20px", fontWeight: 800, color: "#0f224a", margin: "0 0 8px 0" }}>
              Start 7-Day Free Trial
            </h3>
            <p style={{ fontSize: "13px", color: "#64748b", lineHeight: 1.5, margin: "0 0 20px 0" }}>
              You have selected the <strong>{upgradeModal}</strong>. Enjoy unlimited 3D scans and precision fabric diagnostics with zero risk.
            </p>
            <div style={{ display: "flex", gap: "10px" }}>
              <Link
                href="/checkout"
                className="prc-btn-pro"
                style={{ flex: 1, textDecoration: "none" }}
              >
                Proceed to Checkout
              </Link>
              <button
                type="button"
                onClick={() => setUpgradeModal(null)}
                style={{
                  padding: "12px 18px",
                  borderRadius: "9999px",
                  border: "1px solid #cbd5e1",
                  background: "#ffffff",
                  color: "#475569",
                  fontWeight: 700,
                  fontSize: "13px",
                  cursor: "pointer",
                }}
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
