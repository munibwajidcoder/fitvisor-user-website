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
    thankYouTitle: "Thank You for Your Order!",
    thankYouSubtitle: "Your order has been confirmed and your in-store fitting suite has been reserved. We can't wait to see you!",
    orderIdLabel: "Order ID: #FV-2026-94812",
    reservationTitle: "In-Store Try-On Reservation",
    reservationSubtitle: "Present this QR Code at the Balmain Downtown boutique for your reserved fitting suite.",
    boutiqueName: "Balmain Downtown Boutique",
    boutiqueAddress: "123 Fashion Avenue, Lahore",
    reservedNotice: "Your fitting suite is reserved for the next 2 hours.",
    timelineTitle: "Delivery Timeline",
    timelineSubtitle: "We'll keep you updated at every step.",
    step1Title: "Order Confirmed",
    step1Sub: "Today, 2:34 PM",
    step2Title: "Preparing Garment",
    step2Sub: "Within 24-48h",
    step3Title: "Ready for In-Store Try-On / In Transit",
    step3Sub: "Next Update Soon",
    reservedArticle: "Reserved Article",
    productTitle: "Balmain Structured Blazer",
    productSpecs: "Size: M • Navy Blue",
    qty: "Qty: 1",
    amountPaid: "Amount Paid",
    emailSent: "Confirmation Email Sent",
    emailNotice: "You'll receive updates about your order and in-store reservation via email.",
    trackOrder: "Track Order Status",
    returnWardrobe: "Return to My Wardrobe",
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
    thankYouTitle: "Merci pour votre commande !",
    thankYouSubtitle: "Votre commande est confirmée et votre salon d'essayage privé en boutique a été réservé. Nous avons hâte de vous accueillir !",
    orderIdLabel: "N° de commande : #FV-2026-94812",
    reservationTitle: "Réservation d'essayage en boutique",
    reservationSubtitle: "Présentez ce QR code à la boutique Balmain Downtown pour accéder à votre cabine privée.",
    boutiqueName: "Boutique Balmain Downtown",
    boutiqueAddress: "123 Fashion Avenue, Lahore",
    reservedNotice: "Votre cabine d'essayage est réservée pour les 2 prochaines heures.",
    timelineTitle: "Suivi de la livraison",
    timelineSubtitle: "Nous vous tiendrons informé à chaque étape.",
    step1Title: "Commande confirmée",
    step1Sub: "Aujourd'hui, 14h34",
    step2Title: "Préparation de la pièce",
    step2Sub: "Sous 24-48h",
    step3Title: "Prêt pour essayage en boutique / En transit",
    step3Sub: "Prochaine mise à jour sous peu",
    reservedArticle: "Article réservé",
    productTitle: "Blazer Structuré Balmain",
    productSpecs: "Taille : M • Bleu marine",
    qty: "Qté : 1",
    amountPaid: "Montant payé",
    emailSent: "Email de confirmation envoyé",
    emailNotice: "Vous recevrez les mises à jour relatives à votre commande et à votre réservation par email.",
    trackOrder: "Suivre l'état de la commande",
    returnWardrobe: "Retourner à ma garde-robe",
  },
};

export default function OrderSuccessPage() {
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

  return (
    <div className="ord-page-wrapper">
      <div className="ord-container">
        {/* ================= HEADER / NAVBAR ================= */}
        <header className="cat-navbar" style={{ marginBottom: "26px" }}>
          <div className="cat-nav-brand">
            <Logo size="md" />
          </div>

          <nav className="cat-nav-menu">
            <Link href="/" className="cat-nav-item">
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

          {/* Search Bar */}
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

          <div className="cat-nav-actions">
            {/* Language Switch */}
            <div className="fv-lang-switch">
              <button
                type="button"
                id="ord-lang-btn-en"
                onClick={() => changeLang("EN")}
                className={`lang-btn ${lang === "EN" ? "active" : ""}`}
              >
                EN
              </button>
              <span className="lang-pipe">|</span>
              <button
                type="button"
                id="ord-lang-btn-fr"
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

        {/* ================= MAIN ORDER CONFIRMATION CARD ================= */}
        <main className="ord-main-card">
          {/* Top Success Header */}
          <section className="ord-top-header">
            <div className="ord-badge-wrap">
              <span className="ord-ray ord-ray-tl"></span>
              <span className="ord-ray ord-ray-tl2"></span>
              <span className="ord-ray ord-ray-tr"></span>
              <span className="ord-ray ord-ray-tr2"></span>

              <div className="ord-badge-circle">
                <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="#ffffff" strokeWidth="3.2" strokeLinecap="round" strokeLinejoin="round">
                  <polyline points="20 6 9 17 4 12"></polyline>
                </svg>
              </div>
            </div>

            <h1 className="ord-main-title">{t.thankYouTitle}</h1>
            <p className="ord-subtitle">{t.thankYouSubtitle}</p>

            <div className="ord-id-pill">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path>
                <polyline points="14 2 14 8 20 8"></polyline>
                <line x1="16" y1="13" x2="8" y2="13"></line>
                <line x1="16" y1="17" x2="8" y2="17"></line>
              </svg>
              <span>{t.orderIdLabel}</span>
            </div>
          </section>

          {/* 2-Column Content Grid */}
          <div className="ord-content-grid">
            {/* Left Card: In-Store Try-On Reservation */}
            <div className="ord-sub-box">
              <div className="ord-box-header">
                <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#1e3a8a" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="ord-box-icon">
                  <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"></path>
                  <polyline points="9 22 9 12 15 12 15 22"></polyline>
                </svg>
                <div className="ord-box-title-group">
                  <h2 className="ord-box-title">{t.reservationTitle}</h2>
                  <p className="ord-box-sub">{t.reservationSubtitle}</p>
                </div>
              </div>

              {/* QR Code Container */}
              <div className="ord-qr-wrap">
                <Image
                  src="/images/order/order_qr_code_precise.png"
                  alt="Fitting Suite Reservation QR Code"
                  width={116}
                  height={116}
                  className="ord-qr-img"
                  priority
                />
              </div>

              {/* Boutique Location */}
              <div className="ord-boutique-row">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#2563eb" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" style={{ flexShrink: 0, marginTop: "2px" }}>
                  <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"></path>
                  <circle cx="12" cy="10" r="3"></circle>
                </svg>
                <div className="ord-boutique-info">
                  <span className="ord-boutique-name">{t.boutiqueName}</span>
                  <span className="ord-boutique-address">{t.boutiqueAddress}</span>
                </div>
              </div>

              {/* Notice callout */}
              <div className="ord-notice-callout">
                <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ flexShrink: 0 }}>
                  <circle cx="12" cy="12" r="10"></circle>
                  <line x1="12" y1="16" x2="12" y2="12"></line>
                  <line x1="12" y1="8" x2="12.01" y2="8"></line>
                </svg>
                <span>{t.reservedNotice}</span>
              </div>
            </div>

            {/* Right Card: Delivery Timeline */}
            <div className="ord-sub-box">
              <div className="ord-box-header">
                <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#1e3a8a" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="ord-box-icon">
                  <rect x="1" y="3" width="15" height="13"></rect>
                  <polygon points="16 8 20 8 23 11 23 16 16 16 16 8"></polygon>
                  <circle cx="5.5" cy="18.5" r="2.5"></circle>
                  <circle cx="18.5" cy="18.5" r="2.5"></circle>
                </svg>
                <div className="ord-box-title-group">
                  <h2 className="ord-box-title">{t.timelineTitle}</h2>
                  <p className="ord-box-sub">{t.timelineSubtitle}</p>
                </div>
              </div>

              {/* Steps Progress Row */}
              <div className="ord-timeline-wrap">
                <div className="ord-steps-row">
                  <div className="ord-step-dot active">
                    <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
                      <polyline points="20 6 9 17 4 12"></polyline>
                    </svg>
                  </div>
                  <div className="ord-step-connector"></div>
                  <div className="ord-step-dot pending">2</div>
                  <div className="ord-step-connector"></div>
                  <div className="ord-step-dot pending">3</div>
                </div>

                <div className="ord-step-labels">
                  <div className="ord-step-label-item">
                    <span className="ord-step-title active">{t.step1Title}</span>
                    <span className="ord-step-sub">{t.step1Sub}</span>
                  </div>
                  <div className="ord-step-label-item">
                    <span className="ord-step-title">{t.step2Title}</span>
                    <span className="ord-step-sub">{t.step2Sub}</span>
                  </div>
                  <div className="ord-step-label-item">
                    <span className="ord-step-title">{t.step3Title}</span>
                    <span className="ord-step-sub">{t.step3Sub}</span>
                  </div>
                </div>
              </div>

              {/* Reserved Article Pill */}
              <div className="ord-article-pill">
                <Image
                  src="/images/cart/balmain_suit_card.png"
                  alt={t.productTitle}
                  width={36}
                  height={48}
                  className="ord-article-thumb"
                />
                <div className="ord-article-meta">
                  <span className="ord-article-label">{t.reservedArticle}</span>
                  <span className="ord-article-title">{t.productTitle}</span>
                  <span className="ord-article-specs">{t.productSpecs}</span>
                </div>
                <span className="ord-article-qty">{t.qty}</span>
              </div>

              {/* Price & Details */}
              <div className="ord-detail-row">
                <div className="ord-detail-left">
                  <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <ellipse cx="12" cy="5" rx="9" ry="3"></ellipse>
                    <path d="M21 12c0 1.66-4 3-9 3s-9-1.34-9-3"></path>
                    <path d="M3 5v14c0 1.66 4 3 9 3s9-1.34 9-3V5"></path>
                  </svg>
                  <span>{t.amountPaid}</span>
                </div>
                <span className="ord-detail-val">$1,290.00</span>
              </div>

              <div className="ord-detail-row">
                <div className="ord-detail-left">
                  <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"></path>
                    <polyline points="22,6 12,13 2,6"></polyline>
                  </svg>
                  <span>{t.emailSent}</span>
                </div>
                <span style={{ fontSize: "11px", color: "#64748b", fontWeight: 600 }}>mohib@example.com</span>
              </div>

              {/* Bottom email notification card */}
              <div className="ord-notice-callout" style={{ background: "#f8fafc", borderColor: "#f1f5f9", color: "#475569" }}>
                <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="#2563eb" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ flexShrink: 0 }}>
                  <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"></path>
                  <polyline points="22,6 12,13 2,6"></polyline>
                </svg>
                <span style={{ fontSize: "11px" }}>{t.emailNotice}</span>
              </div>
            </div>
          </div>

          {/* Bottom Actions Row */}
          <div className="ord-actions-row">
            <Link href="#track" className="ord-btn-track">
              <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"></path>
                <circle cx="12" cy="10" r="3"></circle>
              </svg>
              <span>{t.trackOrder}</span>
              <span>→</span>
            </Link>

            <Link href="/wardrobe" className="ord-btn-wardrobe">
              <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M12 4a3 3 0 0 1 3 3c0 1.3-.84 2.4-2 2.82V12l7 6H4l7-6V9.82C9.84 9.4 9 8.3 9 7a3 3 0 0 1 3-3z" />
              </svg>
              <span>{t.returnWardrobe}</span>
            </Link>
          </div>
        </main>
      </div>
    </div>
  );
}
