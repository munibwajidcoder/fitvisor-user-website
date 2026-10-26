"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import Logo from "@/components/Logo";

export default function CartPage() {
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
      cartHeading: "Shopping Cart",
      cartSubtitle: "Review your selected luxury items, sizes, and try-on details.",
      clearCart: "Clear Cart",
      restoreCart: "Restore Cart Item",
      emptyHeading: "Your shopping cart is empty",
      emptySub: "Add items from your virtual styling session to continue.",
      productTitle: "Balmain Structured Blazer",
      sizeLabel: "Size: M",
      colorLabel: "Navy Blue",
      guaranteeTitle: "FitVisor Guarantee:",
      guaranteeSub: "Verified on your 3D avatar (Zero-return guarantee)",
      chooseDelivery: "Choose Delivery Option",
      expressDelivery: "Express Home Delivery",
      expressSub: "(24-48h)",
      boutiqueDelivery: "Reserve Free in Local Boutique",
      boutiqueSub: "(Downtown Boutique — Ready in 2 hours for physical try-on)",
      orderSummary: "Order Summary",
      subtotal: "Subtotal",
      capsulePromo: "Capsule Promo",
      shipping: "Shipping",
      free: "Free",
      estimatedTax: "Estimated Tax",
      included: "Included",
      total: "Total",
      promoPlaceholder: "Enter promo or capsule code",
      proceedCheckout: "Proceed to Secure Checkout",
      sslSecured: "256-Bit SSL Secured",
      pciCompliant: "PCI-DSS Compliant",
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
      cartHeading: "Panier d'achat",
      cartSubtitle: "Vérifiez vos articles de luxe sélectionnés, tailles et détails d'essayage.",
      clearCart: "Vider le panier",
      restoreCart: "Restaurer l'article",
      emptyHeading: "Votre panier d'achat est vide",
      emptySub: "Ajoutez des articles de votre séance de style virtuel pour continuer.",
      productTitle: "Blazer Structuré Balmain",
      sizeLabel: "Taille : M",
      colorLabel: "Bleu marine",
      guaranteeTitle: "Garantie FitVisor :",
      guaranteeSub: "Vérifié sur votre avatar 3D (Garantie zéro retour)",
      chooseDelivery: "Choisir le mode de livraison",
      expressDelivery: "Livraison Express à Domicile",
      expressSub: "(24-48h)",
      boutiqueDelivery: "Réservation Gratuite en Boutique",
      boutiqueSub: "(Boutique Centre-ville — Prêt en 2h pour essayage physique)",
      orderSummary: "Résumé de la commande",
      subtotal: "Sous-total",
      capsulePromo: "Promo Capsule",
      shipping: "Livraison",
      free: "Gratuit",
      estimatedTax: "Taxe estimée",
      included: "Incluse",
      total: "Total",
      promoPlaceholder: "Entrez un code promo ou capsule",
      proceedCheckout: "Passer à la caisse sécurisée",
      sslSecured: "Sécurisé SSL 256-Bit",
      pciCompliant: "Conforme PCI-DSS",
    },
  };

  const t = translations[lang];

  const [quantity, setQuantity] = useState<number>(1);
  const [isChecked, setIsChecked] = useState<boolean>(true);
  const [deliveryOption, setDeliveryOption] = useState<"express" | "boutique">("express");
  const [promoCode, setPromoCode] = useState<string>("");
  const [discountPercent, setDiscountPercent] = useState<number>(0);
  const [promoMessage, setPromoMessage] = useState<string>("");
  const [isCartCleared, setIsCartCleared] = useState<boolean>(false);
  const [checkoutModalOpen, setCheckoutModalOpen] = useState<boolean>(false);

  const basePrice = 1290.0;
  const subtotal = isCartCleared ? 0 : basePrice * quantity;
  const discountAmount = (subtotal * discountPercent) / 100;
  const finalTotal = subtotal - discountAmount;

  const handleApplyPromo = () => {
    if (promoCode.trim().toUpperCase() === "FITVISOR10" || promoCode.trim().toUpperCase() === "CAPSULE") {
      setDiscountPercent(10);
      setPromoMessage("✓ 10% Capsule discount applied!");
    } else if (promoCode.trim() !== "") {
      setDiscountPercent(0);
      setPromoMessage("Invalid promo code. Try 'FITVISOR10'");
    }
  };

  const handleClearCart = () => {
    setIsCartCleared(true);
  };

  const handleRestoreCart = () => {
    setIsCartCleared(false);
    setQuantity(1);
  };

  return (
    <div className="cart-page-wrapper">
      <div className="cart-container">
        {/* ================= UNIVERSAL HEADER / NAVBAR ================= */}
        <header className="cat-navbar" style={{ marginBottom: "26px" }}>
          {/* Brand Logo - Row 1 Left */}
          <div className="cat-nav-brand">
            <Logo size="md" />
          </div>

          {/* Nav Links - Center (Desktop) / Row 3 (Mobile) */}
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
                id="cart-lang-btn-en"
                onClick={() => changeLang("EN")}
                className={`lang-btn ${lang === "EN" ? "active" : ""}`}
              >
                EN
              </button>
              <span className="lang-pipe">|</span>
              <button
                type="button"
                id="cart-lang-btn-fr"
                onClick={() => changeLang("FR")}
                className={`lang-btn ${lang === "FR" ? "active" : ""}`}
              >
                FR
              </button>
            </div>

            {/* Shopping Cart Link */}
            <Link href="/cart" className="cat-cart-btn active" title={t.cartTitle} style={{ textDecoration: "none" }}>
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#64748b" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <circle cx="8" cy="21" r="1" />
                <circle cx="19" cy="21" r="1" />
                <path d="M2.05 2.05h2l2.66 12.42a2 2 0 0 0 2 1.58h9.78a2 2 0 0 0 1.95-1.57l1.65-7.43H5.12" />
              </svg>
              <span className="cat-cart-badge">{isCartCleared ? 0 : quantity}</span>
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

        {/* ================= 2-COLUMN CART & SUMMARY LAYOUT ================= */}
        <div className="cart-layout-grid">
          {/* LEFT COLUMN: Shopping Cart */}
          <section className="cart-main-box">
            <div className="cart-header-row">
              <div className="cart-title-left">
                <div className="cart-title-icon-wrap">
                  <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="#1e3a8a" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M6 2L3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z"></path>
                    <line x1="3" y1="6" x2="21" y2="6"></line>
                    <path d="M16 10a4 4 0 0 1-8 0"></path>
                  </svg>
                </div>
                <div className="cart-title-text-group">
                  <h1 className="cart-heading">{t.cartHeading}</h1>
                  <p className="cart-subtitle">{t.cartSubtitle}</p>
                </div>
              </div>

              {!isCartCleared && (
                <button
                  type="button"
                  className="cart-clear-btn"
                  onClick={handleClearCart}
                  title="Remove all items"
                >
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <polyline points="3 6 5 6 21 6"></polyline>
                    <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path>
                  </svg>
                  <span>{t.clearCart}</span>
                </button>
              )}
            </div>

            {/* Cart Item Card */}
            {!isCartCleared ? (
              <div className="cart-item-card">
                {/* Visual container with checkbox and model photo */}
                <div className="cart-item-visual">
                  <div className="cart-checkbox-wrap">
                    <button
                      type="button"
                      className="cart-checkbox-btn"
                      onClick={() => setIsChecked(!isChecked)}
                      title="Select item"
                    >
                      {isChecked && (
                        <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3.2" strokeLinecap="round" strokeLinejoin="round">
                          <polyline points="20 6 9 17 4 12"></polyline>
                        </svg>
                      )}
                    </button>
                  </div>

                  <Image
                    src="/images/cart/balmain_suit_card.png"
                    alt={t.productTitle}
                    width={145}
                    height={200}
                    className="cart-item-img"
                    priority
                  />
                </div>

                {/* Details on right side */}
                <div className="cart-item-details">
                  {/* Brand row with Balmain logo & stepper */}
                  <div className="cart-brand-row">
                    <div className="cart-brand-logo">
                      <span className="cart-brand-name">BALMAIN</span>
                      <span className="cart-brand-city">PARIS</span>
                    </div>

                    <div className="cart-qty-stepper">
                      <button
                        type="button"
                        className="cart-qty-btn"
                        onClick={() => setQuantity((q) => Math.max(1, q - 1))}
                        title="Decrease quantity"
                      >
                        −
                      </button>
                      <span className="cart-qty-num">{quantity}</span>
                      <button
                        type="button"
                        className="cart-qty-btn"
                        onClick={() => setQuantity((q) => q + 1)}
                        title="Increase quantity"
                      >
                        +
                      </button>
                    </div>
                  </div>

                  {/* Product Title */}
                  <Link href="/product" style={{ textDecoration: "none" }}>
                    <h2 className="cart-product-title">{t.productTitle}</h2>
                  </Link>

                  {/* Meta row: Size & Color */}
                  <div className="cart-meta-row">
                    <div className="cart-meta-item">
                      <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M20.59 13.41l-7.17 7.17a2 2 0 0 1-2.83 0L2 12V2h10l8.59 8.59a2 2 0 0 1 0 2.82z"></path>
                        <line x1="7" y1="7" x2="7.01" y2="7"></line>
                      </svg>
                      <span>{t.sizeLabel}</span>
                    </div>
                    <span>•</span>
                    <div className="cart-meta-item">
                      <span className="cart-color-dot"></span>
                      <span>{t.colorLabel}</span>
                    </div>
                  </div>

                  {/* Price */}
                  <div className="cart-price-tag">
                    ${subtotal.toLocaleString(lang === "FR" ? "fr-FR" : "en-US", { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                  </div>

                  {/* FitVisor Guarantee Banner */}
                  <div className="cart-guarantee-box">
                    <div className="cart-guarantee-icon">
                      <svg width="18" height="18" viewBox="0 0 24 24" fill="#10b981">
                        <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"/>
                      </svg>
                    </div>
                    <div>
                      <span className="cart-guarantee-text">{t.guaranteeTitle}</span>
                      <span className="cart-guarantee-sub">{t.guaranteeSub}</span>
                    </div>
                  </div>

                  {/* Delivery Options */}
                  <div className="cart-delivery-section">
                    <div className="cart-delivery-header">
                      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <rect x="1" y="3" width="15" height="13"></rect>
                        <polygon points="16 8 20 8 23 11 23 16 16 16 16 8"></polygon>
                        <circle cx="5.5" cy="18.5" r="2.5"></circle>
                        <circle cx="18.5" cy="18.5" r="2.5"></circle>
                      </svg>
                      <span>{t.chooseDelivery}</span>
                    </div>

                    <div className="cart-delivery-cards">
                      {/* Option 1: Express Home Delivery */}
                      <div
                        className={`cart-delivery-card ${deliveryOption === "express" ? "active" : ""}`}
                        onClick={() => setDeliveryOption("express")}
                      >
                        <div className="cart-delivery-radio">
                          {deliveryOption === "express" ? (
                            <svg width="16" height="16" viewBox="0 0 24 24" fill="#2563eb">
                              <circle cx="12" cy="12" r="10" fill="#2563eb" />
                              <path d="M9 12l2 2 4-4" stroke="#ffffff" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" fill="none"/>
                            </svg>
                          ) : (
                            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#cbd5e1" strokeWidth="2">
                              <circle cx="12" cy="12" r="10" />
                            </svg>
                          )}
                        </div>
                        <div className="cart-delivery-info">
                          <div className="cart-delivery-title-row">
                            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                              <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"></path>
                              <polyline points="9 22 9 12 15 12 15 22"></polyline>
                            </svg>
                            <span>{t.expressDelivery}</span>
                          </div>
                          <span className="cart-delivery-subtitle">{t.expressSub}</span>
                        </div>
                      </div>

                      {/* Option 2: Reserve Free in Local Boutique */}
                      <div
                        className={`cart-delivery-card ${deliveryOption === "boutique" ? "active" : ""}`}
                        onClick={() => setDeliveryOption("boutique")}
                      >
                        <div className="cart-delivery-radio">
                          {deliveryOption === "boutique" ? (
                            <svg width="16" height="16" viewBox="0 0 24 24" fill="#2563eb">
                              <circle cx="12" cy="12" r="10" fill="#2563eb" />
                              <path d="M9 12l2 2 4-4" stroke="#ffffff" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" fill="none"/>
                            </svg>
                          ) : (
                            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#cbd5e1" strokeWidth="2">
                              <circle cx="12" cy="12" r="10" />
                            </svg>
                          )}
                        </div>
                        <div className="cart-delivery-info">
                          <div className="cart-delivery-title-row">
                            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                              <path d="M3 3h18v4H3z"></path>
                              <path d="M3 7l2 12a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2l2-12"></path>
                              <path d="M9 11v4"></path>
                              <path d="M15 11v4"></path>
                            </svg>
                            <span>{t.boutiqueDelivery}</span>
                          </div>
                          <span className="cart-delivery-subtitle">
                            {t.boutiqueSub}
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ) : (
              <div className="cart-empty-state">
                <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="#94a3b8" strokeWidth="1.5" style={{ margin: "0 auto 12px" }}>
                  <path d="M6 2L3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z"></path>
                  <line x1="3" y1="6" x2="21" y2="6"></line>
                </svg>
                <h3 style={{ fontSize: "16px", color: "#0f224a", marginBottom: "8px" }}>{t.emptyHeading}</h3>
                <p style={{ fontSize: "13px", color: "#64748b", marginBottom: "16px" }}>{t.emptySub}</p>
                <button
                  type="button"
                  onClick={handleRestoreCart}
                  className="cart-checkout-btn"
                  style={{ display: "inline-flex", padding: "10px 20px" }}
                >
                  {t.restoreCart}
                </button>
              </div>
            )}
          </section>

          {/* RIGHT COLUMN: Order Summary */}
          <aside className="cart-summary-box">
            <h2 className="cart-summary-title">
              <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#2563eb" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path>
                <polyline points="14 2 14 8 20 8"></polyline>
                <line x1="16" y1="13" x2="8" y2="13"></line>
                <line x1="16" y1="17" x2="8" y2="17"></line>
                <polyline points="10 9 9 9 8 9"></polyline>
              </svg>
              <span>{t.orderSummary}</span>
            </h2>

            <div className="cart-summary-lines">
              <div className="cart-summary-line">
                <span className="cart-line-label">{t.subtotal}</span>
                <span className="cart-line-val">
                  ${subtotal.toLocaleString(lang === "FR" ? "fr-FR" : "en-US", { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                </span>
              </div>

              {discountPercent > 0 && (
                <div className="cart-summary-line">
                  <span className="cart-line-label">{t.capsulePromo} ({discountPercent}%)</span>
                  <span className="cart-line-val green">
                    -${discountAmount.toLocaleString(lang === "FR" ? "fr-FR" : "en-US", { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                  </span>
                </div>
              )}

              <div className="cart-summary-line">
                <span className="cart-line-label">{t.shipping}</span>
                <span className="cart-line-val green">{t.free}</span>
              </div>

              <div className="cart-summary-line">
                <span className="cart-line-label">{t.estimatedTax}</span>
                <span className="cart-line-val muted">{t.included}</span>
              </div>

              <div className="cart-summary-divider"></div>

              <div className="cart-total-row">
                <span className="cart-total-label">{t.total}</span>
                <span className="cart-total-amount">
                  ${finalTotal.toLocaleString(lang === "FR" ? "fr-FR" : "en-US", { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                </span>
              </div>
            </div>

            {/* Promo / Capsule Code Input */}
            <div style={{ display: "flex", flexDirection: "column", gap: "6px" }}>
              <div className="cart-promo-pill">
                <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="cart-promo-icon">
                  <path d="M20.59 13.41l-7.17 7.17a2 2 0 0 1-2.83 0L2 12V2h10l8.59 8.59a2 2 0 0 1 0 2.82z"></path>
                  <line x1="7" y1="7" x2="7.01" y2="7"></line>
                </svg>
                <input
                  type="text"
                  placeholder={t.promoPlaceholder}
                  value={promoCode}
                  onChange={(e) => setPromoCode(e.target.value)}
                  onKeyDown={(e) => e.key === "Enter" && handleApplyPromo()}
                  className="cart-promo-input"
                />
                <button
                  type="button"
                  className="cart-promo-submit"
                  onClick={handleApplyPromo}
                  title="Apply code"
                >
                  →
                </button>
              </div>
              {promoMessage && (
                <span style={{ fontSize: "11px", color: discountPercent > 0 ? "#10b981" : "#ef4444", paddingLeft: "10px" }}>
                  {promoMessage}
                </span>
              )}
            </div>

            {/* Proceed to Secure Checkout Button */}
            <Link
              href="/checkout"
              className="cart-checkout-btn"
              style={{ textDecoration: "none" }}
            >
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                <rect x="3" y="11" width="18" height="11" rx="2" ry="2"></rect>
                <path d="M7 11V7a5 5 0 0 1 10 0v4"></path>
              </svg>
              <span>{t.proceedCheckout}</span>
              <span style={{ marginLeft: "4px" }}>→</span>
            </Link>

            {/* Trust Badges Banner */}
            <div className="cart-trust-banner">
              <div className="cart-trust-item">
                <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="#2563eb" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" className="cart-trust-icon">
                  <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"></path>
                  <polyline points="9 12 11 14 15 10"></polyline>
                </svg>
                <span>{t.sslSecured}</span>
              </div>
              <div className="cart-trust-item">
                <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="#2563eb" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" className="cart-trust-icon">
                  <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"></path>
                  <polyline points="9 12 11 14 15 10"></polyline>
                </svg>
                <span>{t.pciCompliant}</span>
              </div>
            </div>
          </aside>
        </div>
      </div>

      {/* Checkout Success / Confirmation Modal */}
      {checkoutModalOpen && (
        <div
          style={{
            position: "fixed",
            inset: 0,
            background: "rgba(15, 23, 42, 0.65)",
            backdropFilter: "blur(6px)",
            zIndex: 9999,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            padding: "20px",
          }}
          onClick={() => setCheckoutModalOpen(false)}
        >
          <div
            style={{
              background: "#ffffff",
              borderRadius: "20px",
              padding: "32px",
              maxWidth: "480px",
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
                background: "#e8f7ee",
                color: "#10b981",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                margin: "0 auto 16px auto",
              }}
            >
              <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <polyline points="20 6 9 17 4 12"></polyline>
              </svg>
            </div>
            <h3 style={{ fontSize: "20px", fontWeight: 800, color: "#0f224a", margin: "0 0 8px 0" }}>
              Secure Checkout Initiated
            </h3>
            <p style={{ fontSize: "13px", color: "#64748b", lineHeight: 1.5, margin: "0 0 20px 0" }}>
              Your order for <strong>Balmain Structured Blazer (Size M)</strong> has been verified by the 3D Avatar Fit engine. Total:{" "}
              <strong>${finalTotal.toLocaleString("en-US", { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</strong> via{" "}
              {deliveryOption === "express" ? "Express Home Delivery (24-48h)" : "Boutique Reservation"}.
            </p>
            <div style={{ display: "flex", gap: "10px" }}>
              <button
                type="button"
                onClick={() => setCheckoutModalOpen(false)}
                className="cart-checkout-btn"
                style={{ flex: 1, padding: "12px 20px" }}
              >
                Complete Payment
              </button>
              <button
                type="button"
                onClick={() => setCheckoutModalOpen(false)}
                style={{
                  padding: "12px 18px",
                  borderRadius: "9999px",
                  border: "1px solid #cbd5e1",
                  background: "#ffffff",
                  color: "#475569",
                  fontWeight: 600,
                  fontSize: "13px",
                  cursor: "pointer",
                }}
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
