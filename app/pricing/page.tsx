"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import Logo from "@/components/Logo";

const translations = {
  EN: {
    navHome: "Home",
    navCatalog: "Catalog",
    navStudio: "3D Studio",
    navWardrobe: "Wardrobe",
    navPricing: "Plans",
    searchPlaceholder: "Search brands, styles, or items...",
    cartTitle: "Cart",
    profileTitle: "User Profile",
    heroTitle: "Choose the Plan That Fits Your Style",
    heroSubtitle: "Unlimited 3D scans, advanced fabric physics simulation, and family wardrobe sharing.",
    freeTitle: "Free Plan",
    freePrice: "$0",
    freePeriod: "/ month",
    freeFeature1: "1 Basic 3D body scan",
    freeFeature2: "2 virtual try-ons per month",
    freeFeature3: "Standard partner catalog access",
    freeCurrentBtn: "Current Plan",
    proPopular: "Most Popular",
    proTitle: "Pro Plan",
    proPrice: "$3.99",
    proPeriod: "/ month",
    proFeature1: "Unlimited 3D body scans & mesh updates",
    proFeature2: "Realistic fabric drape & dynamic movement physics",
    proFeature3: "Real-time fabric tension heatmap & fit diagnostics",
    proFeature4: "Priority in-store boutique reservation",
    proCta: "Upgrade to Pro (7-Day Free Trial)",
    familyTitle: "Family Plan",
    familyPrice: "$6.99",
    familyPeriod: "/ month",
    familyFeature1: "Up to 5 member morphological avatars",
    familyFeature2: "Shared family lookbook & cross-wardrobe styling",
    familyFeature3: "All Pro features included",
    familyCta: "Choose Family Plan",
    faqTitle: "Frequently Asked Questions",
    faq1Q: "Can I cancel anytime?",
    faq1A: "Yes, absolutely. You can cancel or pause your subscription with one click from your account settings at any time without penalty or cancellation fees.",
    faq2Q: "How does the 7-day trial work?",
    faq2A: "Your 7-day free trial gives you full, unrestricted access to all Pro features—including real-time fabric tension heatmaps, unlimited avatar body scans, and realistic drape simulations. You will not be billed until the 7th day, and you can cancel anytime beforehand.",
    modalTitle: "Start 7-Day Free Trial",
    modalDesc: "You have selected the {plan}. Enjoy unlimited 3D scans and precision fabric diagnostics with zero risk.",
    proceedCheckout: "Proceed to Checkout",
    cancel: "Cancel",
  },
  FR: {
    navHome: "Accueil",
    navCatalog: "Catalogue",
    navStudio: "Studio 3D",
    navWardrobe: "Garde-robe",
    navPricing: "Tarifs",
    searchPlaceholder: "Rechercher des marques, styles...",
    cartTitle: "Panier",
    profileTitle: "Profil utilisateur",
    heroTitle: "Choisissez le forfait adapté à votre style",
    heroSubtitle: "Scans 3D illimités, simulation physique des tissus et partage de garde-robe familiale.",
    freeTitle: "Forfait Gratuit",
    freePrice: "0 €",
    freePeriod: "/ mois",
    freeFeature1: "1 Scan corporel 3D de base",
    freeFeature2: "2 essayages virtuels par mois",
    freeFeature3: "Accès au catalogue des partenaires standards",
    freeCurrentBtn: "Forfait actuel",
    proPopular: "Le plus populaire",
    proTitle: "Forfait Pro",
    proPrice: "3,99 €",
    proPeriod: "/ mois",
    proFeature1: "Scans corporels 3D & mises à jour de maillage illimités",
    proFeature2: "Tombé de tissu réaliste & physique des mouvements fluides",
    proFeature3: "Carte thermique des tensions du tissu & diagnostics d'ajustement",
    proFeature4: "Réservation prioritaire en boutique physique",
    proCta: "Passer à Pro (Essai gratuit de 7 jours)",
    familyTitle: "Forfait Famille",
    familyPrice: "6,99 €",
    familyPeriod: "/ mois",
    familyFeature1: "Jusqu'à 5 avatars morphologiques pour la famille",
    familyFeature2: "Lookbook familial partagé & styling entre dressings",
    familyFeature3: "Toutes les fonctionnalités Pro incluses",
    familyCta: "Choisir le forfait Famille",
    faqTitle: "Foire Aux Questions",
    faq1Q: "Puis-je annuler à tout moment ?",
    faq1A: "Oui, tout à fait. Vous pouvez résilier ou suspendre votre abonnement en un clic depuis vos paramètres de compte, sans frais ni engagement.",
    faq2Q: "Comment fonctionne l'essai de 7 jours ?",
    faq2A: "Votre essai gratuit de 7 jours vous donne un accès complet et illimité à toutes les fonctionnalités Pro — y compris l'analyse de tension en temps réel, les scans illimités et la simulation physique. Vous ne serez débité qu'au 7ème jour et pouvez annuler à tout moment avant.",
    modalTitle: "Commencer l'essai gratuit de 7 jours",
    modalDesc: "Vous avez sélectionné le {plan}. Profitez de scans 3D illimités et de diagnostics précis sans aucun risque.",
    proceedCheckout: "Passer à la caisse",
    cancel: "Annuler",
  },
};

export default function PricingPage() {
  const [lang, setLang] = useState<"EN" | "FR">("EN");

  useEffect(() => {
    const saved = localStorage.getItem("fitvisor_lang");
    if (saved === "EN" || saved === "FR") {
      setLang(saved);
    }
  }, []);

  const changeLang = (newLang: "EN" | "FR") => {
    setLang(newLang);
    if (typeof window !== "undefined") {
      localStorage.setItem("fitvisor_lang", newLang);
    }
  };

  const t = translations[lang];

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
          {/* Brand Logo - Row 1 Left */}
          <div className="cat-nav-brand">
            <Logo size="md" href="/home" />
          </div>

          {/* Nav Links - Center (Desktop) / Row 3 (Mobile) */}
          <nav className="cat-nav-menu">
            <Link href="/home" className="cat-nav-item">
              {t.navHome}
            </Link>
            <Link href="/catalog" className="cat-nav-item">
              {t.navCatalog}
            </Link>
            <Link href="/3d-studio" className="cat-nav-item">
              {t.navStudio}
            </Link>
            <Link href="/wardrobe" className="cat-nav-item">
              {t.navWardrobe}
            </Link>
          </nav>

          {/* Search Bar - Desktop Right / Row 2 (Mobile) */}
          <div className="cat-search-pill">
            <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="#94a3b8" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
              <circle cx="11" cy="11" r="8" />
              <line x1="21" y1="21" x2="16.65" y2="16.65" />
            </svg>
            <input
              type="text"
              placeholder={t.searchPlaceholder}
              className="cat-search-input"
            />
          </div>

          {/* Nav Actions - Language Switcher, Cart & Profile Avatar */}
          <div className="cat-nav-actions">
            <div className="fv-lang-switch">
              <button
                type="button"
                id="prc-lang-btn-en"
                onClick={() => changeLang("EN")}
                className={`lang-btn ${lang === "EN" ? "active" : ""}`}
              >
                EN
              </button>
              <span className="lang-pipe">|</span>
              <button
                type="button"
                id="prc-lang-btn-fr"
                onClick={() => changeLang("FR")}
                className={`lang-btn ${lang === "FR" ? "active" : ""}`}
              >
                FR
              </button>
            </div>

            <Link href="/cart" className="cat-cart-btn" title={t.cartTitle} style={{ textDecoration: "none" }}>
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#64748b" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <circle cx="8" cy="21" r="1" />
                <circle cx="19" cy="21" r="1" />
                <path d="M2.05 2.05h2l2.66 12.42a2 2 0 0 0 2 1.58h9.78a2 2 0 0 0 1.95-1.57l1.65-7.43H5.12" />
              </svg>
              <span className="cat-cart-badge">1</span>
            </Link>

            <Link href="/profile" className="cat-user-avatar-wrap" title={t.profileTitle} style={{ display: "flex", alignItems: "center", gap: "4px", textDecoration: "none" }}>
              <Image
                src="/images/model_face.jpg"
                alt={t.profileTitle}
                width={32}
                height={32}
                className="cat-user-avatar-img"
              />
              <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="#64748b" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <polyline points="6 9 12 15 18 9"></polyline>
              </svg>
            </Link>
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

          <h1 className="prc-main-title">{t.heroTitle}</h1>
          <p className="prc-subtitle">{t.heroSubtitle}</p>
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
                <h2 className="prc-plan-name">{t.freeTitle}</h2>
              </div>

              <div className="prc-price-row">
                <span className="prc-price-amount">{t.freePrice}</span>
                <span className="prc-price-period">{t.freePeriod}</span>
              </div>

              <div className="prc-features-list">
                <div className="prc-feature-item">
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="#1e3a8a" className="prc-check-icon">
                    <circle cx="12" cy="12" r="10" fill="#1e3a8a" />
                    <polyline points="8 12 11 15 16 9" stroke="#ffffff" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" fill="none" />
                  </svg>
                  <span className="prc-feature-text">{t.freeFeature1}</span>
                </div>

                <div className="prc-feature-item">
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="#1e3a8a" className="prc-check-icon">
                    <circle cx="12" cy="12" r="10" fill="#1e3a8a" />
                    <polyline points="8 12 11 15 16 9" stroke="#ffffff" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" fill="none" />
                  </svg>
                  <span className="prc-feature-text">{t.freeFeature2}</span>
                </div>

                <div className="prc-feature-item">
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="#1e3a8a" className="prc-check-icon">
                    <circle cx="12" cy="12" r="10" fill="#1e3a8a" />
                    <polyline points="8 12 11 15 16 9" stroke="#ffffff" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" fill="none" />
                  </svg>
                  <span className="prc-feature-text">{t.freeFeature3}</span>
                </div>
              </div>
            </div>

            <button type="button" className="prc-btn-current" disabled>
              {t.freeCurrentBtn}
            </button>
          </article>

          {/* Card 2: Pro Plan (Most Popular) */}
          <article className="prc-card featured">
            <span className="prc-popular-pill">{t.proPopular}</span>

            <div className="prc-card-top">
              <div className="prc-plan-header">
                <div className="prc-plan-icon-circle pro">
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M2 4l3 12h14l3-12-6 7-4-7-4 7-6-7zm3 16h14"></path>
                  </svg>
                </div>
                <h2 className="prc-plan-name">{t.proTitle}</h2>
              </div>

              <div className="prc-price-row">
                <span className="prc-price-amount">{t.proPrice}</span>
                <span className="prc-price-period">{t.proPeriod}</span>
              </div>

              <div className="prc-features-list">
                <div className="prc-feature-item">
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="#f04b55" className="prc-check-icon">
                    <circle cx="12" cy="12" r="10" fill="#f04b55" />
                    <polyline points="8 12 11 15 16 9" stroke="#ffffff" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" fill="none" />
                  </svg>
                  <span className="prc-feature-text">{t.proFeature1}</span>
                </div>

                <div className="prc-feature-item">
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="#f04b55" className="prc-check-icon">
                    <circle cx="12" cy="12" r="10" fill="#f04b55" />
                    <polyline points="8 12 11 15 16 9" stroke="#ffffff" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" fill="none" />
                  </svg>
                  <span className="prc-feature-text">{t.proFeature2}</span>
                </div>

                <div className="prc-feature-item">
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="#f04b55" className="prc-check-icon">
                    <circle cx="12" cy="12" r="10" fill="#f04b55" />
                    <polyline points="8 12 11 15 16 9" stroke="#ffffff" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" fill="none" />
                  </svg>
                  <span className="prc-feature-text">{t.proFeature3}</span>
                </div>

                <div className="prc-feature-item">
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="#f04b55" className="prc-check-icon">
                    <circle cx="12" cy="12" r="10" fill="#f04b55" />
                    <polyline points="8 12 11 15 16 9" stroke="#ffffff" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" fill="none" />
                  </svg>
                  <span className="prc-feature-text">{t.proFeature4}</span>
                </div>
              </div>
            </div>

            <button
              type="button"
              className="prc-btn-pro"
              onClick={() => setUpgradeModal(`${t.proTitle} (${t.proPrice}${t.proPeriod})`)}
            >
              <span>{t.proCta}</span>
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
                <h2 className="prc-plan-name">{t.familyTitle}</h2>
              </div>

              <div className="prc-price-row">
                <span className="prc-price-amount">{t.familyPrice}</span>
                <span className="prc-price-period">{t.familyPeriod}</span>
              </div>

              <div className="prc-features-list">
                <div className="prc-feature-item">
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="#1e3a8a" className="prc-check-icon">
                    <circle cx="12" cy="12" r="10" fill="#1e3a8a" />
                    <polyline points="8 12 11 15 16 9" stroke="#ffffff" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" fill="none" />
                  </svg>
                  <span className="prc-feature-text">{t.familyFeature1}</span>
                </div>

                <div className="prc-feature-item">
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="#1e3a8a" className="prc-check-icon">
                    <circle cx="12" cy="12" r="10" fill="#1e3a8a" />
                    <polyline points="8 12 11 15 16 9" stroke="#ffffff" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" fill="none" />
                  </svg>
                  <span className="prc-feature-text">{t.familyFeature2}</span>
                </div>

                <div className="prc-feature-item">
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="#1e3a8a" className="prc-check-icon">
                    <circle cx="12" cy="12" r="10" fill="#1e3a8a" />
                    <polyline points="8 12 11 15 16 9" stroke="#ffffff" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" fill="none" />
                  </svg>
                  <span className="prc-feature-text">{t.familyFeature3}</span>
                </div>
              </div>
            </div>

            <button
              type="button"
              className="prc-btn-family"
              onClick={() => setUpgradeModal(`${t.familyTitle} (${t.familyPrice}${t.familyPeriod})`)}
            >
              <span>{t.familyCta}</span>
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
            <h3 className="prc-faq-title">{t.faqTitle}</h3>
          </div>

          <div className="prc-faq-list">
            {/* FAQ 1 */}
            <div className="prc-faq-card" onClick={() => toggleFaq(0)}>
              <div className="prc-faq-card-header">
                <span className="prc-faq-question">{t.faq1Q}</span>
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={`prc-faq-chevron ${openFaq[0] ? "open" : ""}`}>
                  <polyline points="6 9 12 15 18 9"></polyline>
                </svg>
              </div>
              {openFaq[0] && (
                <p className="prc-faq-answer">
                  {t.faq1A}
                </p>
              )}
            </div>

            {/* FAQ 2 */}
            <div className="prc-faq-card" onClick={() => toggleFaq(1)}>
              <div className="prc-faq-card-header">
                <span className="prc-faq-question">{t.faq2Q}</span>
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={`prc-faq-chevron ${openFaq[1] ? "open" : ""}`}>
                  <polyline points="6 9 12 15 18 9"></polyline>
                </svg>
              </div>
              {openFaq[1] && (
                <p className="prc-faq-answer">
                  {t.faq2A}
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
              {t.modalTitle}
            </h3>
            <p style={{ fontSize: "13px", color: "#64748b", lineHeight: 1.5, margin: "0 0 20px 0" }}>
              {t.modalDesc.replace("{plan}", upgradeModal)}
            </p>
            <div style={{ display: "flex", gap: "10px" }}>
              <Link
                href="/checkout"
                className="prc-btn-pro"
                style={{ flex: 1, textDecoration: "none" }}
              >
                {t.proceedCheckout}
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
                {t.cancel}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
