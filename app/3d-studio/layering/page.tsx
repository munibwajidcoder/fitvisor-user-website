"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import Logo from "@/components/Logo";

interface LayerItem {
  id: number;
  order: number;
  brand: string;
  name: string;
  nameFr: string;
  priceNum: number;
  priceStr: string;
  thumb: string;
  cartThumb: string;
  visible: boolean;
  selected: boolean;
}

const translations = {
  EN: {
    navHome: "Home",
    navCatalog: "Catalog",
    navStudio: "3D Studio",
    navWardrobe: "Wardrobe",
    searchPlaceholder: "Search brands, styles, or items...",
    cart: "Cart",
    userProfile: "User Profile",
    outfitLayers: "Outfit Layers",
    itemsCount: "(4 items)",
    layerSubtitle: "Drag to reorder • Toggle visibility",
    addGarment: "Add Garment to Outfit",
    studioLighting: "Studio Lighting",
    daylight: "Daylight\n(5500K)",
    storeLight: "Store\nLighting",
    eveningGala: "Evening\nGala",
    dragRotate: "Drag to rotate 360°",
    completeOutfit: "Complete Outfit",
    saveBadge: "4 items • Save 12%",
    aiScoreTitle: "AI Style Compatibility Score",
    aiScoreSub: "Timeless navy & off-white chromatic harmony.",
    selectAll: "Select All for Cart",
    itemsSelected: "items selected",
    swapShoes: "Swap Shoes",
    pumpsVsSneakers: "Pumps vs Sneakers",
    sneakersVsPumps: "Sneakers vs Pumps",
    addCompleteOutfit: "Add Complete Outfit to Cart",
    toastAdded: "Complete outfit added to your cart!",
  },
  FR: {
    navHome: "Accueil",
    navCatalog: "Catalogue",
    navStudio: "Studio 3D",
    navWardrobe: "Garde-robe",
    searchPlaceholder: "Rechercher des marques, styles, ou articles...",
    cart: "Panier",
    userProfile: "Profil Utilisateur",
    outfitLayers: "Couches de Tenue",
    itemsCount: "(4 articles)",
    layerSubtitle: "Glisser pour réorganiser • Activer visibilité",
    addGarment: "Ajouter un vêtement à la tenue",
    studioLighting: "Éclairage Studio",
    daylight: "Lumière du jour\n(5500K)",
    storeLight: "Éclairage\nBoutique",
    eveningGala: "Soirée\nGala",
    dragRotate: "Glisser pour pivoter à 360°",
    completeOutfit: "Tenue Complète",
    saveBadge: "4 articles • Économisez 12%",
    aiScoreTitle: "Score d'harmonie stylistique IA",
    aiScoreSub: "Harmonie chromatique intemporelle marine et blanc cassé.",
    selectAll: "Tout sélectionner pour le panier",
    itemsSelected: "articles sélectionnés",
    swapShoes: "Changer de chaussures",
    pumpsVsSneakers: "Escarpins vs Baskets",
    sneakersVsPumps: "Baskets vs Escarpins",
    addCompleteOutfit: "Ajouter la tenue complète au panier",
    toastAdded: "Tenue complète ajoutée à votre panier !",
  },
};

export default function MultiGarmentLayeringPage() {
  const [lang, setLang] = useState<"EN" | "FR">("EN");
  const [activeLighting, setActiveLighting] = useState<"daylight" | "store" | "evening">("daylight");
  const [rotationAngle, setRotationAngle] = useState(0);
  const [zoomLevel, setZoomLevel] = useState(1);
  const [isDragging, setIsDragging] = useState(false);
  const [dragStartX, setDragStartX] = useState(0);
  const [cartCount, setCartCount] = useState(3);
  const [shoesType, setShoesType] = useState<"pumps" | "sneakers">("pumps");
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  useEffect(() => {
    try {
      const saved = localStorage.getItem("fitvisor_lang") as "EN" | "FR" | null;
      if (saved === "EN" || saved === "FR") {
        setLang(saved);
      }
    } catch {}
  }, []);

  const changeLang = (l: "EN" | "FR") => {
    setLang(l);
    try {
      localStorage.setItem("fitvisor_lang", l);
    } catch {}
  };

  const t = translations[lang];

  const [layers, setLayers] = useState<LayerItem[]>([
    {
      id: 1,
      order: 1,
      brand: "BRUNELLO CUCINELLI",
      name: "Italian Collar Silk Shirt",
      nameFr: "Chemise en Soie Col Italien",
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
      nameFr: "Blazer Structuré en Laine",
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
      nameFr: "Pantalon Tailleur Ceinturé",
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
      nameFr: "Escarpins Stiletto en Cuir",
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
    const count = selectedCount > 0 ? selectedCount : 1;
    setCartCount((prev) => prev + count);
    setToastMessage(t.toastAdded);
    setTimeout(() => {
      setToastMessage(null);
    }, 3200);
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
        {/* ================= HEADER / NAVBAR (Standard cat-navbar) ================= */}
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
            <Link href="/3d-studio" className="cat-nav-item active">
              {t.navStudio}
            </Link>
            <Link href="/wardrobe" className="cat-nav-item">
              {t.navWardrobe}
            </Link>
          </nav>

          {/* Search Pill - Center Right (Desktop) / Row 2 (Mobile) */}
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

          {/* Action Icons Cluster: Language, Cart, Profile - Row 1 Right */}
          <div className="cat-nav-actions">
            {/* Language Switch */}
            <div className="fv-lang-switch">
              <button
                type="button"
                id="lay-lang-btn-en"
                onClick={() => changeLang("EN")}
                className={`lang-btn ${lang === "EN" ? "active" : ""}`}
              >
                EN
              </button>
              <span className="lang-pipe">|</span>
              <button
                type="button"
                id="lay-lang-btn-fr"
                onClick={() => changeLang("FR")}
                className={`lang-btn ${lang === "FR" ? "active" : ""}`}
              >
                FR
              </button>
            </div>

            {/* Shopping Cart Link */}
            <Link href="/cart" className="cat-cart-btn" title={t.cart} style={{ textDecoration: "none" }}>
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#64748b" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <circle cx="8" cy="21" r="1" />
                <circle cx="19" cy="21" r="1" />
                <path d="M2.05 2.05h2l2.66 12.42a2 2 0 0 0 2 1.58h9.78a2 2 0 0 0 1.95-1.57l1.65-7.43H5.12" />
              </svg>
              <span className="cat-cart-badge">{cartCount}</span>
            </Link>

            {/* User Profile Avatar */}
            <Link href="/profile" className="cat-user-avatar-wrap" title={t.userProfile}>
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

        {/* Floating Toast Notification */}
        {toastMessage && (
          <div className="cat-toast-banner" role="alert" style={{ zIndex: 120 }}>
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#22c55e" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <polyline points="20 6 9 17 4 12" />
            </svg>
            <span>{toastMessage}</span>
          </div>
        )}

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
                  {t.outfitLayers} <span>{t.itemsCount}</span>
                </h2>
              </div>
              <span className="lay-subtitle">{t.layerSubtitle}</span>
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
                      alt={lang === "FR" ? item.nameFr : item.name}
                      width={40}
                      height={44}
                      className="lay-thumb"
                    />
                  </div>

                  <div className="lay-info">
                    <span className="lay-brand">{item.brand}</span>
                    <span className="lay-name">{lang === "FR" ? item.nameFr : item.name}</span>
                    <span className="lay-price">{item.priceStr}</span>
                  </div>

                  <div className="lay-actions">
                    <button
                      type="button"
                      className="lay-icon-btn"
                      onClick={() => toggleVisibility(item.id)}
                      title={item.visible ? "Hide layer" : "Show layer"}
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
              <span>{t.addGarment}</span>
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
                <span className="stu-lighting-title">{t.studioLighting}</span>
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
                  <span className="stu-light-label" style={{ whiteSpace: "pre-line" }}>{t.daylight}</span>
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
                  <span className="stu-light-label" style={{ whiteSpace: "pre-line" }}>{t.storeLight}</span>
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
                  <span className="stu-light-label" style={{ whiteSpace: "pre-line" }}>{t.eveningGala}</span>
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
              <span>{t.dragRotate}</span>
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
              <h2 className="lay-panel-title">{t.completeOutfit}</h2>
            </div>

            {/* Price Display */}
            <div className="lay-price-row">
              <span className="lay-total-price">$1,840.00</span>
              <span className="lay-discount-badge">{t.saveBadge}</span>
            </div>

            {/* AI Style Compatibility Score Card */}
            <div className="lay-ai-card">
              <div className="lay-ai-badge-circle">
                <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="m12 3-1.9 5.8a2 2 0 0 1-1.3 1.3L3 12l5.8 1.9a2 2 0 0 1 1.3 1.3L12 21l1.9-5.8a2 2 0 0 1 1.3-1.3L21 12l-5.8-1.9a2 2 0 0 1-1.3-1.3Z" />
                </svg>
              </div>
              <div className="lay-ai-content">
                <span className="lay-ai-title">{t.aiScoreTitle}</span>
                <div className="lay-ai-score-row">
                  <span className="lay-ai-score">9.8/10</span>
                  <span className="lay-ai-sub">{t.aiScoreSub}</span>
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
                <span>{t.selectAll}</span>
              </label>
              <span className="lay-selected-count">{selectedCount} {t.itemsSelected}</span>
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
                        alt={lang === "FR" ? item.nameFr : item.name}
                        width={36}
                        height={38}
                        className="lay-check-thumb"
                      />
                    </div>
                    <div className="lay-check-info">
                      <span className="lay-check-brand">{item.brand}</span>
                      <span className="lay-check-name">{lang === "FR" ? item.nameFr : item.name}</span>
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
                  {t.swapShoes} <span>({shoesType === "pumps" ? t.pumpsVsSneakers : t.sneakersVsPumps})</span>
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
              <span>{t.addCompleteOutfit}</span>
            </button>
          </aside>
        </div>
      </div>
    </div>
  );
}
