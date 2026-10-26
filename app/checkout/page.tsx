"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import Logo from "@/components/Logo";
import { useRouter } from "next/navigation";

export default function CheckoutPage() {
  const router = useRouter();

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
      checkoutTitle: "Secure Checkout",
      shippingTitle: "Shipping Address & Contact",
      shippingSub: "Enter your delivery details so we can get your order to you.",
      firstName: "First Name *",
      lastName: "Last Name *",
      streetAddress: "Street Address *",
      city: "City *",
      phoneNumber: "Phone Number *",
      paymentTitle: "Payment Method",
      paymentSub: "Choose your preferred payment method. All transactions are secure and encrypted.",
      appleGoogleTitle: "Apple Pay / Google Pay",
      appleGoogleSub: "1-click express checkout",
      fastSecure: "Fast & Secure",
      cardTitle: "Credit / Debit Card",
      cardSub: "Pay with your card details",
      securePayments: "Secure Payments",
      cardNumber: "Card Number",
      expiryDate: "Expiry Date",
      cvc: "CVC",
      cardName: "Name on Card",
      klarnaTitle: "Klarna / Afterpay",
      klarnaSub: "4 interest-free installments of $322.50",
      noExtraFees: "No extra fees",
      partnerTitle: "Partner Store Direct Checkout",
      partnerSub: "Zalando Checkout Redirect",
      redirectZalando: "Redirects to Zalando",
      orderSummary: "Order Summary",
      productTitle: "Balmain Structured Blazer",
      productSpecs: "Size: M • Navy Blue",
      qty: "Qty: 1",
      subtotal: "Subtotal",
      shipping: "Shipping",
      free: "Free",
      estimatedTax: "Estimated Tax",
      included: "Included",
      total: "Total",
      securityNotice: "Card details are never stored by FitVisor (PCI-DSS tokenized banking).",
      confirmPay: "Confirm and Pay $1,290.00",
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
      checkoutTitle: "Paiement sécurisé",
      shippingTitle: "Adresse de livraison & Contact",
      shippingSub: "Entrez vos coordonnées pour recevoir votre commande.",
      firstName: "Prénom *",
      lastName: "Nom *",
      streetAddress: "Adresse de livraison *",
      city: "Ville *",
      phoneNumber: "Numéro de téléphone *",
      paymentTitle: "Moyen de paiement",
      paymentSub: "Choisissez votre moyen de paiement préféré. Transactions sécurisées et chiffrées.",
      appleGoogleTitle: "Apple Pay / Google Pay",
      appleGoogleSub: "Paiement express en 1 clic",
      fastSecure: "Rapide & Sécurisé",
      cardTitle: "Carte bancaire / Débit",
      cardSub: "Payez avec vos coordonnées de carte",
      securePayments: "Paiements sécurisés",
      cardNumber: "Numéro de carte",
      expiryDate: "Date d'expiration",
      cvc: "CVC",
      cardName: "Nom sur la carte",
      klarnaTitle: "Klarna / Afterpay",
      klarnaSub: "4 versements sans frais de 322,50 $",
      noExtraFees: "Sans frais supplémentaires",
      partnerTitle: "Règlement direct magasin partenaire",
      partnerSub: "Redirection vers le paiement Zalando",
      redirectZalando: "Redirige vers Zalando",
      orderSummary: "Résumé de la commande",
      productTitle: "Blazer Structuré Balmain",
      productSpecs: "Taille : M • Bleu marine",
      qty: "Qté : 1",
      subtotal: "Sous-total",
      shipping: "Livraison",
      free: "Gratuit",
      estimatedTax: "Taxe estimée",
      included: "Incluse",
      total: "Total",
      securityNotice: "Vos coordonnées bancaires ne sont jamais stockées par FitVisor (chiffrement bancaire PCI-DSS).",
      confirmPay: "Confirmer et Payer 1 290,00 $",
    },
  };

  const t = translations[lang];

  // Shipping Address Form State
  const [firstName, setFirstName] = useState("Mohib");
  const [lastName, setLastName] = useState("Wajid");
  const [streetAddress, setStreetAddress] = useState("House # 123, Main Road, Johar Town");
  const [city, setCity] = useState("Lahore");
  const [phoneNumber, setPhoneNumber] = useState("+92 300 1234567");

  // Payment Method Selection
  const [paymentMethod, setPaymentMethod] = useState<"apple-google" | "card" | "klarna" | "zalando">("apple-google");

  // Card details
  const [cardNumber, setCardNumber] = useState("1234 5678 9012 3456");
  const [expiryDate, setExpiryDate] = useState("MM / YY");
  const [cvc, setCvc] = useState("123");
  const [cardName, setCardName] = useState("John Doe");

  const handlePayOrder = (e: React.FormEvent) => {
    e.preventDefault();
    router.push("/order-success");
  };

  return (
    <div className="chk-page-wrapper">
      <div className="chk-container">
        {/* ================= UNIVERSAL HEADER / NAVBAR ================= */}
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

          {/* Action Icons Cluster: Lang Switch, Cart, Profile - Row 1 Right */}
          <div className="cat-nav-actions">
            {/* Language Switch */}
            <div className="fv-lang-switch">
              <button
                type="button"
                id="chk-lang-btn-en"
                onClick={() => changeLang("EN")}
                className={`lang-btn ${lang === "EN" ? "active" : ""}`}
              >
                EN
              </button>
              <span className="lang-pipe">|</span>
              <button
                type="button"
                id="chk-lang-btn-fr"
                onClick={() => changeLang("FR")}
                className={`lang-btn ${lang === "FR" ? "active" : ""}`}
              >
                FR
              </button>
            </div>

            {/* Shopping Cart Link */}
            <Link href="/cart" className="cat-cart-btn" title={t.cartTitle} style={{ textDecoration: "none" }}>
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#64748b" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <circle cx="8" cy="21" r="1" />
                <circle cx="19" cy="21" r="1" />
                <path d="M2.05 2.05h2l2.66 12.42a2 2 0 0 0 2 1.58h9.78a2 2 0 0 0 1.95-1.57l1.65-7.43H5.12" />
              </svg>
              <span className="cat-cart-badge">1</span>
            </Link>

            {/* User Profile Avatar */}
            <Link href="/profile" className="cat-user-avatar-wrap" title={t.profileTitle}>
              <Image
                src="/images/model_face.jpg"
                alt="User Profile"
                width={32}
                height={32}
                className="cat-user-avatar-img"
              />
            </Link>
          </div>
        </header>

        {/* ================= 2-COLUMN CHECKOUT LAYOUT ================= */}
        <form onSubmit={handlePayOrder} className="chk-layout-grid">
          {/* LEFT COLUMN: Shipping & Payment */}
          <div className="chk-left-column">
            {/* Step 1: Shipping Address & Contact */}
            <section className="chk-section-box">
              <div className="chk-sec-header">
                <div className="chk-step-num">1</div>
                <div className="chk-sec-title-group">
                  <h1 className="chk-sec-title">{t.shippingTitle}</h1>
                  <p className="chk-sec-sub">{t.shippingSub}</p>
                </div>
              </div>

              <div className="chk-form-grid">
                {/* Row 1: First Name & Last Name */}
                <div className="chk-form-row-2">
                  <div className="chk-field-box">
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="chk-field-icon">
                      <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path>
                      <circle cx="12" cy="7" r="4"></circle>
                    </svg>
                    <div className="chk-field-inner">
                      <label className="chk-field-label">{t.firstName}</label>
                      <input
                        type="text"
                        required
                        value={firstName}
                        onChange={(e) => setFirstName(e.target.value)}
                        className="chk-field-input"
                      />
                    </div>
                  </div>

                  <div className="chk-field-box">
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="chk-field-icon">
                      <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path>
                      <circle cx="12" cy="7" r="4"></circle>
                    </svg>
                    <div className="chk-field-inner">
                      <label className="chk-field-label">{t.lastName}</label>
                      <input
                        type="text"
                        required
                        value={lastName}
                        onChange={(e) => setLastName(e.target.value)}
                        className="chk-field-input"
                      />
                    </div>
                  </div>
                </div>

                {/* Row 2: Street Address */}
                <div className="chk-field-box">
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="chk-field-icon">
                    <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"></path>
                    <circle cx="12" cy="10" r="3"></circle>
                  </svg>
                  <div className="chk-field-inner">
                    <label className="chk-field-label">{t.streetAddress}</label>
                    <input
                      type="text"
                      required
                      value={streetAddress}
                      onChange={(e) => setStreetAddress(e.target.value)}
                      className="chk-field-input"
                    />
                  </div>
                </div>

                {/* Row 3: City & Phone Number */}
                <div className="chk-form-row-2">
                  <div className="chk-field-box">
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="chk-field-icon">
                      <path d="M3 21h18"></path>
                      <path d="M5 21V5a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2v16"></path>
                      <path d="M9 9h1"></path>
                      <path d="M9 13h1"></path>
                      <path d="M9 17h1"></path>
                      <path d="M14 9h1"></path>
                      <path d="M14 13h1"></path>
                      <path d="M14 17h1"></path>
                    </svg>
                    <div className="chk-field-inner">
                      <label className="chk-field-label">{t.city}</label>
                      <select
                        value={city}
                        onChange={(e) => setCity(e.target.value)}
                        className="chk-field-input"
                        style={{ background: "transparent", cursor: "pointer" }}
                      >
                        <option value="Lahore">Lahore</option>
                        <option value="Karachi">Karachi</option>
                        <option value="Islamabad">Islamabad</option>
                        <option value="Dubai">Dubai</option>
                        <option value="London">London</option>
                        <option value="Paris">Paris</option>
                        <option value="New York">New York</option>
                      </select>
                    </div>
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#64748b" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <polyline points="6 9 12 15 18 9"></polyline>
                    </svg>
                  </div>

                  <div className="chk-field-box">
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="chk-field-icon">
                      <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"></path>
                    </svg>
                    <div className="chk-field-inner">
                      <label className="chk-field-label">{t.phoneNumber}</label>
                      <input
                        type="text"
                        required
                        value={phoneNumber}
                        onChange={(e) => setPhoneNumber(e.target.value)}
                        className="chk-field-input"
                      />
                    </div>
                  </div>
                </div>
              </div>
            </section>

            {/* Step 2: Payment Method */}
            <section className="chk-section-box">
              <div className="chk-sec-header">
                <div className="chk-step-num">2</div>
                <div className="chk-sec-title-group">
                  <h2 className="chk-sec-title">{t.paymentTitle}</h2>
                  <p className="chk-sec-sub">{t.paymentSub}</p>
                </div>
              </div>

              <div className="chk-payment-options">
                {/* 1. Apple Pay / Google Pay */}
                <div
                  className={`chk-pay-option-card ${paymentMethod === "apple-google" ? "active" : ""}`}
                  onClick={() => setPaymentMethod("apple-google")}
                >
                  <div className="chk-pay-top-row">
                    <div className="chk-pay-left-group">
                      <div className="chk-radio-icon">
                        {paymentMethod === "apple-google" ? (
                          <svg width="18" height="18" viewBox="0 0 24 24" fill="#2563eb">
                            <circle cx="12" cy="12" r="10" fill="#2563eb" />
                            <path d="M9 12l2 2 4-4" stroke="#ffffff" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" fill="none"/>
                          </svg>
                        ) : (
                          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#cbd5e1" strokeWidth="2">
                            <circle cx="12" cy="12" r="10" />
                          </svg>
                        )}
                      </div>

                      <div className="chk-pay-brand-logos">
                        <span className="chk-apple-pay-badge">
                          <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
                            <path d="M18.71 19.5c-.83 1.24-1.71 2.45-3.05 2.47-1.34.03-1.77-.79-3.29-.79-1.53 0-2 .77-3.27.82-1.31.05-2.3-1.32-3.14-2.53C4.25 17 2.94 12.45 4.7 9.39c.87-1.52 2.43-2.48 4.12-2.51 1.28-.02 2.5.87 3.29.87.78 0 2.26-1.07 3.81-.91.65.03 2.47.26 3.64 1.98-.09.06-2.17 1.28-2.15 3.81.03 3.02 2.65 4.03 2.68 4.04-.03.07-.42 1.44-1.38 2.83M15.97 6.85c.62-.75 1.04-1.8 0.92-2.85-.9.04-1.98.6-2.62 1.35-.57.65-1.06 1.72-.93 2.74 1 .08 2.01-.49 2.63-1.24z"/>
                          </svg>
                          <span>Pay</span>
                        </span>

                        <span className="chk-brand-divider">|</span>

                        <span className="chk-gpay-badge">
                          <span style={{ color: "#4285F4" }}>G</span>
                          <span style={{ color: "#0f172a", marginLeft: "2px" }}>Pay</span>
                        </span>
                      </div>

                      <div className="chk-pay-info">
                        <span className="chk-pay-title">{t.appleGoogleTitle}</span>
                        <span className="chk-pay-sub">{t.appleGoogleSub}</span>
                      </div>
                    </div>

                    <div className="chk-pay-badge">
                      <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                        <polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2"></polygon>
                      </svg>
                      <span>{t.fastSecure}</span>
                    </div>
                  </div>
                </div>

                {/* 2. Credit / Debit Card */}
                <div
                  className={`chk-pay-option-card ${paymentMethod === "card" ? "active" : ""}`}
                >
                  <div
                    className="chk-pay-top-row"
                    onClick={() => setPaymentMethod("card")}
                  >
                    <div className="chk-pay-left-group">
                      <div className="chk-radio-icon">
                        {paymentMethod === "card" ? (
                          <svg width="18" height="18" viewBox="0 0 24 24" fill="#2563eb">
                            <circle cx="12" cy="12" r="10" fill="#2563eb" />
                            <path d="M9 12l2 2 4-4" stroke="#ffffff" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" fill="none"/>
                          </svg>
                        ) : (
                          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#cbd5e1" strokeWidth="2">
                            <circle cx="12" cy="12" r="10" />
                          </svg>
                        )}
                      </div>

                      <div className="chk-pay-brand-logos">
                        {/* Visa badge */}
                        <div style={{ background: "#1a1f71", color: "#ffffff", padding: "1px 6px", borderRadius: "4px", fontSize: "10px", fontWeight: "900", letterSpacing: "0.08em" }}>
                          VISA
                        </div>
                        {/* Mastercard badge */}
                        <div style={{ display: "flex", alignItems: "center" }}>
                          <span style={{ width: "12px", height: "12px", borderRadius: "50%", background: "#eb001b", display: "inline-block" }}></span>
                          <span style={{ width: "12px", height: "12px", borderRadius: "50%", background: "#f79e1b", display: "inline-block", marginLeft: "-5px" }}></span>
                        </div>
                        {/* Generic card badge */}
                        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#2563eb" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                          <rect x="2" y="5" width="20" height="14" rx="2"></rect>
                          <line x1="2" y1="10" x2="22" y2="10"></line>
                        </svg>
                      </div>

                      <div className="chk-pay-info">
                        <span className="chk-pay-title">{t.cardTitle}</span>
                        <span className="chk-pay-sub">{t.cardSub}</span>
                      </div>
                    </div>

                    <div className="chk-pay-badge" style={{ color: "#475569", background: "#f8fafc", borderColor: "#e2e8f0" }}>
                      <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <rect x="3" y="11" width="18" height="11" rx="2" ry="2"></rect>
                        <path d="M7 11V7a5 5 0 0 1 10 0v4"></path>
                      </svg>
                      <span>{t.securePayments}</span>
                    </div>
                  </div>

                  {/* Card Details Sub-Form */}
                  <div className="chk-card-subform">
                    <div className="chk-card-row-3">
                      <div className="chk-field-box">
                        <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="chk-field-icon">
                          <rect x="1" y="4" width="22" height="16" rx="2" ry="2"></rect>
                          <line x1="1" y1="10" x2="23" y2="10"></line>
                        </svg>
                        <div className="chk-field-inner">
                          <label className="chk-field-label">{t.cardNumber}</label>
                          <input
                            type="text"
                            value={cardNumber}
                            onChange={(e) => setCardNumber(e.target.value)}
                            className="chk-field-input"
                          />
                        </div>
                      </div>

                      <div className="chk-field-box">
                        <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="chk-field-icon">
                          <rect x="3" y="4" width="18" height="18" rx="2" ry="2"></rect>
                          <line x1="16" y1="2" x2="16" y2="6"></line>
                          <line x1="8" y1="2" x2="8" y2="6"></line>
                          <line x1="3" y1="10" x2="21" y2="10"></line>
                        </svg>
                        <div className="chk-field-inner">
                          <label className="chk-field-label">{t.expiryDate}</label>
                          <input
                            type="text"
                            value={expiryDate}
                            onChange={(e) => setExpiryDate(e.target.value)}
                            className="chk-field-input"
                          />
                        </div>
                      </div>

                      <div className="chk-field-box">
                        <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="chk-field-icon">
                          <rect x="2" y="4" width="20" height="16" rx="2"></rect>
                          <line x1="2" y1="10" x2="22" y2="10"></line>
                        </svg>
                        <div className="chk-field-inner">
                          <label className="chk-field-label">{t.cvc}</label>
                          <input
                            type="text"
                            value={cvc}
                            onChange={(e) => setCvc(e.target.value)}
                            className="chk-field-input"
                          />
                        </div>
                      </div>
                    </div>

                    <div className="chk-field-box">
                      <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="chk-field-icon">
                        <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path>
                        <circle cx="12" cy="7" r="4"></circle>
                      </svg>
                      <div className="chk-field-inner">
                        <label className="chk-field-label">{t.cardName}</label>
                        <input
                          type="text"
                          value={cardName}
                          onChange={(e) => setCardName(e.target.value)}
                          className="chk-field-input"
                        />
                      </div>
                    </div>
                  </div>
                </div>

                {/* 3. Klarna / Afterpay */}
                <div
                  className={`chk-pay-option-card ${paymentMethod === "klarna" ? "active" : ""}`}
                  onClick={() => setPaymentMethod("klarna")}
                >
                  <div className="chk-pay-top-row">
                    <div className="chk-pay-left-group">
                      <div className="chk-radio-icon">
                        {paymentMethod === "klarna" ? (
                          <svg width="18" height="18" viewBox="0 0 24 24" fill="#2563eb">
                            <circle cx="12" cy="12" r="10" fill="#2563eb" />
                            <path d="M9 12l2 2 4-4" stroke="#ffffff" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" fill="none"/>
                          </svg>
                        ) : (
                          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#cbd5e1" strokeWidth="2">
                            <circle cx="12" cy="12" r="10" />
                          </svg>
                        )}
                      </div>

                      <div className="chk-pay-brand-logos">
                        {/* Klarna pink pill */}
                        <div style={{ background: "#ffb3c7", color: "#000000", padding: "1px 7px", borderRadius: "4px", fontSize: "10.5px", fontWeight: "900" }}>
                          Klarna.
                        </div>
                        {/* Afterpay mint pill */}
                        <div style={{ background: "#b2fce4", color: "#000000", padding: "1px 7px", borderRadius: "4px", fontSize: "10.5px", fontWeight: "900" }}>
                          afterpay⇄
                        </div>
                      </div>

                      <div className="chk-pay-info">
                        <span className="chk-pay-title">{t.klarnaTitle}</span>
                        <span className="chk-pay-sub">{t.klarnaSub}</span>
                      </div>
                    </div>

                    <div className="chk-pay-badge" style={{ color: "#475569", background: "#f8fafc", borderColor: "#e2e8f0" }}>
                      <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <rect x="3" y="4" width="18" height="18" rx="2" ry="2"></rect>
                        <line x1="16" y1="2" x2="16" y2="6"></line>
                        <line x1="8" y1="2" x2="8" y2="6"></line>
                      </svg>
                      <span>{t.noExtraFees}</span>
                    </div>
                  </div>
                </div>

                {/* 4. Partner Store Direct Checkout */}
                <div
                  className={`chk-pay-option-card ${paymentMethod === "zalando" ? "active" : ""}`}
                  onClick={() => setPaymentMethod("zalando")}
                >
                  <div className="chk-pay-top-row">
                    <div className="chk-pay-left-group">
                      <div className="chk-radio-icon">
                        {paymentMethod === "zalando" ? (
                          <svg width="18" height="18" viewBox="0 0 24 24" fill="#2563eb">
                            <circle cx="12" cy="12" r="10" fill="#2563eb" />
                            <path d="M9 12l2 2 4-4" stroke="#ffffff" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" fill="none"/>
                          </svg>
                        ) : (
                          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#cbd5e1" strokeWidth="2">
                            <circle cx="12" cy="12" r="10" />
                          </svg>
                        )}
                      </div>

                      <div className="chk-pay-brand-logos">
                        <span style={{ display: "flex", alignItems: "center", gap: "4px", color: "#ff6900", fontWeight: "900", fontSize: "13px" }}>
                          <svg width="14" height="14" viewBox="0 0 24 24" fill="#ff6900">
                            <polygon points="5 3 19 12 5 21 5 3"></polygon>
                          </svg>
                          <span>zalando</span>
                        </span>
                      </div>

                      <div className="chk-pay-info">
                        <span className="chk-pay-title">{t.partnerTitle}</span>
                        <span className="chk-pay-sub">{t.partnerSub}</span>
                      </div>
                    </div>

                    <div className="chk-pay-badge" style={{ color: "#475569", background: "#f8fafc", borderColor: "#e2e8f0" }}>
                      <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"></path>
                        <polyline points="15 3 21 3 21 9"></polyline>
                        <line x1="10" y1="14" x2="21" y2="3"></line>
                      </svg>
                      <span>{t.redirectZalando}</span>
                    </div>
                  </div>
                </div>
              </div>
            </section>
          </div>

          {/* RIGHT COLUMN: Order Summary */}
          <aside className="chk-summary-box">
            <h2 className="chk-summary-title">
              <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#2563eb" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path>
                <polyline points="14 2 14 8 20 8"></polyline>
                <line x1="16" y1="13" x2="8" y2="13"></line>
                <line x1="16" y1="17" x2="8" y2="17"></line>
                <polyline points="10 9 9 9 8 9"></polyline>
              </svg>
              <span>{t.orderSummary}</span>
            </h2>

            {/* Mini Product Preview Card */}
            <div className="chk-item-preview-card">
              <div className="chk-item-thumb-wrap">
                <Image
                  src="/images/cart/balmain_suit_card.png"
                  alt={t.productTitle}
                  width={58}
                  height={74}
                  className="chk-item-thumb"
                  priority
                />
              </div>

              <div className="chk-item-meta">
                <span className="chk-item-brand">BALMAIN PARIS</span>
                <span className="chk-item-title">{t.productTitle}</span>
                <span className="chk-item-specs">{t.productSpecs}</span>
              </div>

              <div className="chk-item-price-col">
                <span className="chk-item-price">$1,290.00</span>
                <span className="chk-item-qty">{t.qty}</span>
              </div>
            </div>

            {/* Summary Line Items */}
            <div className="chk-summary-lines">
              <div className="chk-summary-line">
                <span className="chk-line-label">{t.subtotal}</span>
                <span className="chk-line-val">$1,290.00</span>
              </div>

              <div className="chk-summary-line">
                <span className="chk-line-label">{t.shipping}</span>
                <span className="chk-line-val green">{t.free}</span>
              </div>

              <div className="chk-summary-line">
                <span className="chk-line-label">{t.estimatedTax}</span>
                <span className="chk-line-val muted">{t.included}</span>
              </div>

              <div className="chk-divider"></div>

              <div className="chk-total-row">
                <span className="chk-total-label">{t.total}</span>
                <span className="chk-total-val">$1,290.00</span>
              </div>
            </div>

            {/* Security Notice Box */}
            <div className="chk-security-box">
              <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#2563eb" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" className="chk-security-icon">
                <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"></path>
                <polyline points="9 12 11 14 15 10"></polyline>
              </svg>
              <span className="chk-security-text">
                {t.securityNotice}
              </span>
            </div>

            {/* Confirm & Pay Button */}
            <button type="submit" className="chk-pay-btn">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                <rect x="3" y="11" width="18" height="11" rx="2" ry="2"></rect>
                <path d="M7 11V7a5 5 0 0 1 10 0v4"></path>
              </svg>
              <span>{t.confirmPay}</span>
              <span style={{ marginLeft: "4px" }}>→</span>
            </button>
          </aside>
        </form>
      </div>
    </div>
  );
}
