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
    searchPlaceholder: "Search brands, styles, or items...",
    cartTitle: "Cart",
    profileTitle: "User Profile",
    bannerTitle: "Real-Time Fabric Tension Map",
    bannerSub: "— Based on 2% elastane weave stretch index",
    bannerLive: "Live analysis • Personalized for your 3D avatar",
    legendTitle: "Tension Heatmap Legend",
    optFit: "Optimal Fit",
    optFitSub: "100% movement comfort",
    normEase: "Normal Ease",
    normEaseSub: "Slightly relaxed fit",
    tenZone: "Tension Zone",
    tenZoneSub: "Fabric stretched (+%)",
    controlsTitle: "View Controls",
    rotate: "Rotate",
    zoom: "Zoom",
    reset: "Reset",
    outfitTitle: "Current Outfit",
    blazerName: "Balmain Blazer",
    blazerColor: "Navy Blue",
    shirtName: "White Silk Shirt",
    shirtLayer: "(Layer 1)",
    trousersName: "Slim Trousers",
    trousersLayer: "(Layer 2)",
    aiBadgeTitle: "AI Fabric Analysis",
    aiBadgeSub: "Powered by 3D body mesh & fabric physics",
    dragHint: "Drag to rotate",
    analysisTitle: "Fit Analysis",
    shoulders: "Shoulders",
    shouldersDesc: "43cm garment vs 42cm body",
    shouldersBadge: "Perfect Match",
    waist: "Waist",
    waistDesc: "3.5cm ease allowance",
    waistBadge: "Ideal for seated posture",
    noteTitle: "Note",
    noteBody: "When lower button is closed, slight tension appears over hips.",
    recTitle: "FitVisor Recommendation",
    recActive: "Size L applied! Enjoy relaxed, comfortable movement across the waist and hips.",
    recDefault: "Try Size L for a more relaxed, modern oversized drape.",
    recBtnActive: "Size L Selected ✓",
    recBtnDefault: "Switch to Size L Instantly →",
    quickActions: "Quick Actions",
    viewDetails: "View Heatmap\nDetails",
    compareSizes: "Compare\nSizes",
    saveAnalysis: "Save\nAnalysis",
    saved: "Saved ✓",
    saveToast: "Analysis saved to your Wardrobe!",
    removeToast: "Analysis removed from your Wardrobe",
    viewWardrobe: "View Wardrobe →",
    chestPin: "Chest",
    cuffsPin: "Cuffs & Sleeves",
    hipPin: "Lower Hip Closure",
  },
  FR: {
    navHome: "Accueil",
    navCatalog: "Catalogue",
    navStudio: "Studio 3D",
    navWardrobe: "Garde-robe",
    searchPlaceholder: "Rechercher des marques, styles...",
    cartTitle: "Panier",
    profileTitle: "Profil utilisateur",
    bannerTitle: "Carte thermique des tensions du tissu",
    bannerSub: "— Basé sur l'indice d'élasticité de 2% d'élasthanne",
    bannerLive: "Analyse en direct • Personnalisée pour votre avatar 3D",
    legendTitle: "Légende de la carte de tension",
    optFit: "Ajustement optimal",
    optFitSub: "Confort de mouvement 100%",
    normEase: "Aisance normale",
    normEaseSub: "Coupe légèrement décontractée",
    tenZone: "Zone de tension",
    tenZoneSub: "Tissu étiré (+%)",
    controlsTitle: "Contrôles de vue",
    rotate: "Pivoter",
    zoom: "Zoomer",
    reset: "Réinitialiser",
    outfitTitle: "Tenue actuelle",
    blazerName: "Blazer Balmain",
    blazerColor: "Bleu marine",
    shirtName: "Chemise en soie blanche",
    shirtLayer: "(Couche 1)",
    trousersName: "Pantalon ajusté",
    trousersLayer: "(Couche 2)",
    aiBadgeTitle: "Analyse IA du tissu",
    aiBadgeSub: "Propulsée par le maillage 3D & la physique des étoffes",
    dragHint: "Glisser pour pivoter",
    analysisTitle: "Analyse de la coupe",
    shoulders: "Épaules",
    shouldersDesc: "43 cm vêtement vs 42 cm corps",
    shouldersBadge: "Parfaitement ajusté",
    waist: "Taille",
    waistDesc: "3,5 cm d'aisance",
    waistBadge: "Idéal en position assise",
    noteTitle: "Remarque",
    noteBody: "Lorsque le bouton inférieur est fermé, une légère tension apparaît sur les hanches.",
    recTitle: "Recommandation FitVisor",
    recActive: "Taille L appliquée ! Profitez d'une liberté de mouvement agréable aux hanches.",
    recDefault: "Essayez la taille L pour un tombé plus décontracté et moderne.",
    recBtnActive: "Taille L sélectionnée ✓",
    recBtnDefault: "Passer à la taille L instantanément →",
    quickActions: "Actions rapides",
    viewDetails: "Détails de la\ntension",
    compareSizes: "Comparer les\ntailles",
    saveAnalysis: "Enregistrer\nl'analyse",
    saved: "Enregistré ✓",
    saveToast: "Analyse enregistrée dans votre garde-robe !",
    removeToast: "Analyse retirée de votre garde-robe",
    viewWardrobe: "Voir la garde-robe →",
    chestPin: "Poitrine",
    cuffsPin: "Poignets & Manches",
    hipPin: "Fermeture hanches",
  },
};

export default function FabricTensionPage() {
  const [lang, setLang] = useState<"EN" | "FR">("EN");

  // Load language preference from localStorage
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

  const [rotationAngle, setRotationAngle] = useState(0);
  const [zoomLevel, setZoomLevel] = useState(1);
  const [isDragging, setIsDragging] = useState(false);
  const [dragStartX, setDragStartX] = useState(0);
  const [selectedSize, setSelectedSize] = useState<"M" | "L">("M");
  const [cartCount, setCartCount] = useState(3);
  const [isSaved, setIsSaved] = useState(false);
  const [toastMsg, setToastMsg] = useState<{ text: string; link: string; linkText: string } | null>(null);

  // Drag-to-rotate interaction handlers
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

  // View Controls
  const handleRotateClick = () => {
    setRotationAngle((prev) => (prev + 45) % 360);
  };

  const handleZoomToggle = () => {
    setZoomLevel((prev) => (prev === 1 ? 1.2 : 1));
  };

  const handleReset = () => {
    setRotationAngle(0);
    setZoomLevel(1);
  };

  const handleSwitchSize = () => {
    const nextSize = selectedSize === "M" ? "L" : "M";
    setSelectedSize(nextSize);
  };

  const handleSaveAnalysis = () => {
    const nextSaved = !isSaved;
    setIsSaved(nextSaved);

    // Sync to localStorage
    try {
      const storedItems = localStorage.getItem("fitvisor_saved_wardrobe_items");
      let items: any[] = storedItems ? JSON.parse(storedItems) : [];
      if (nextSaved) {
        if (!items.some((item) => item.id === "tension-analysis")) {
          items.push({
            id: "tension-analysis",
            name: lang === "FR" ? "Analyse de tension - Blazer Balmain" : "Tension Analysis - Balmain Blazer",
            brand: "BALMAIN",
            price: "$1,290.00",
            category: "Analysis",
            thumb: "/images/tension/thumb_blazer.png",
          });
        }
      } else {
        items = items.filter((item) => item.id !== "tension-analysis");
      }
      localStorage.setItem("fitvisor_saved_wardrobe_items", JSON.stringify(items));
    } catch (err) {
      console.error(err);
    }

    setToastMsg({
      text: nextSaved ? t.saveToast : t.removeToast,
      link: "/wardrobe",
      linkText: t.viewWardrobe,
    });
    setTimeout(() => setToastMsg(null), 3200);
  };

  return (
    <div
      className="ten-page-wrapper"
      onMouseUp={handleMouseUp}
    >
      <div className="ten-container">
        {/* ================= HEADER / NAVBAR (Standard cat-navbar) ================= */}
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

          {/* Action Icons Cluster: Lang Switch, Cart, Profile - Row 1 Right */}
          <div className="cat-nav-actions">
            {/* Language Switch */}
            <div className="fv-lang-switch">
              <button
                type="button"
                id="ten-lang-btn-en"
                onClick={() => changeLang("EN")}
                className={`lang-btn ${lang === "EN" ? "active" : ""}`}
              >
                EN
              </button>
              <span className="lang-pipe">|</span>
              <button
                type="button"
                id="ten-lang-btn-fr"
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
              <span className="cat-cart-badge">{cartCount}</span>
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

        {/* ================= SUB-BANNER: REAL-TIME FABRIC TENSION MAP ================= */}
        <div className="ten-sub-banner">
          <div className="ten-banner-left">
            <div className="ten-banner-icon-wrap">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M12 2a4 4 0 0 0-4 4v1H6a2 2 0 0 0-2 2v11a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V9a2 2 0 0 0-2-2h-2V6a4 4 0 0 0-4-4Z" />
                <path d="M9 12v4" />
                <path d="M12 11v6" />
                <path d="M15 13v2" />
              </svg>
            </div>
            <h1 className="ten-banner-title">
              {t.bannerTitle} <span>{t.bannerSub}</span>
            </h1>
          </div>

          <div className="ten-banner-right">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <circle cx="12" cy="12" r="10" />
              <line x1="12" x2="12" y1="16" y2="12" />
              <line x1="12" x2="12.01" y1="8" y2="8" />
            </svg>
            <span>{t.bannerLive}</span>
          </div>
        </div>

        {/* ================= 3-COLUMN STAGE GRID ================= */}
        <div className="ten-stage-grid">
          {/* ================= COLUMN 1: LEFT SIDEBAR ================= */}
          <aside className="ten-left-card">
            {/* Tension Heatmap Legend */}
            <div>
              <h2 className="ten-section-title">{t.legendTitle}</h2>
              <div className="ten-legend-list">
                <div className="ten-legend-item">
                  <span className="ten-legend-dot optimal" />
                  <div className="ten-legend-text">
                    <span className="ten-legend-label">{t.optFit}</span>
                    <span className="ten-legend-sub">{t.optFitSub}</span>
                  </div>
                </div>

                <div className="ten-legend-item">
                  <span className="ten-legend-dot normal" />
                  <div className="ten-legend-text">
                    <span className="ten-legend-label">{t.normEase}</span>
                    <span className="ten-legend-sub">{t.normEaseSub}</span>
                  </div>
                </div>

                <div className="ten-legend-item">
                  <span className="ten-legend-dot tension" />
                  <div className="ten-legend-text">
                    <span className="ten-legend-label">{t.tenZone}</span>
                    <span className="ten-legend-sub">{t.tenZoneSub}</span>
                  </div>
                </div>
              </div>
            </div>

            {/* View Controls */}
            <div>
              <h3 className="ten-section-title">{t.controlsTitle}</h3>
              <div className="ten-controls-row">
                <button
                  type="button"
                  className="ten-control-btn"
                  onClick={handleRotateClick}
                  title="Rotate model"
                >
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M21.5 2v6h-6M21.34 15.57a10 10 0 1 1-.57-8.38l5.67-5.67" />
                  </svg>
                  <span>{t.rotate}</span>
                </button>

                <button
                  type="button"
                  className="ten-control-btn"
                  onClick={handleZoomToggle}
                  title="Toggle Zoom"
                >
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                    <circle cx="11" cy="11" r="8" />
                    <line x1="8" y1="11" x2="14" y2="11" />
                  </svg>
                  <span>{t.zoom}</span>
                </button>

                <button
                  type="button"
                  className="ten-control-btn"
                  onClick={handleReset}
                  title="Reset View"
                >
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                    <polyline points="1 4 1 10 7 10" />
                    <path d="M3.51 15a9 9 0 1 0 2.13-9.36L1 10" />
                  </svg>
                  <span>{t.reset}</span>
                </button>
              </div>
            </div>

            {/* Current Outfit */}
            <div>
              <h3 className="ten-section-title">{t.outfitTitle}</h3>
              <div className="ten-outfit-list">
                <div className="ten-outfit-row">
                  <div className="ten-outfit-thumb-wrap">
                    <Image
                      src="/images/tension/thumb_blazer.png"
                      alt="Balmain Blazer"
                      width={38}
                      height={42}
                      className="ten-outfit-thumb"
                    />
                  </div>
                  <div className="ten-outfit-info">
                    <span className="ten-outfit-name">{t.blazerName}</span>
                    <span className="ten-outfit-meta">{t.blazerColor}</span>
                  </div>
                </div>

                <div className="ten-outfit-row">
                  <div className="ten-outfit-thumb-wrap">
                    <Image
                      src="/images/tension/thumb_shirt.png"
                      alt="White Silk Shirt"
                      width={38}
                      height={42}
                      className="ten-outfit-thumb"
                    />
                  </div>
                  <div className="ten-outfit-info">
                    <span className="ten-outfit-name">{t.shirtName}</span>
                    <span className="ten-outfit-meta">{t.shirtLayer}</span>
                  </div>
                </div>

                <div className="ten-outfit-row">
                  <div className="ten-outfit-thumb-wrap">
                    <Image
                      src="/images/tension/thumb_trousers.png"
                      alt="Slim Trousers"
                      width={38}
                      height={42}
                      className="ten-outfit-thumb"
                    />
                  </div>
                  <div className="ten-outfit-info">
                    <span className="ten-outfit-name">{t.trousersName}</span>
                    <span className="ten-outfit-meta">{t.trousersLayer}</span>
                  </div>
                </div>
              </div>
            </div>

            {/* AI Fabric Analysis Badge */}
            <div className="ten-ai-box">
              <div className="ten-ai-icon-circle">
                <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                  <circle cx="12" cy="12" r="10" />
                  <line x1="22" x2="18" y1="12" y2="12" />
                  <line x1="6" x2="2" y1="12" y2="12" />
                  <line x1="12" x2="12" y1="6" y2="2" />
                  <line x1="12" x2="12" y1="22" y2="18" />
                </svg>
              </div>
              <div className="ten-ai-text">
                <span className="ten-ai-title">{t.aiBadgeTitle}</span>
                <span className="ten-ai-sub">{t.aiBadgeSub}</span>
              </div>
            </div>
          </aside>

          {/* ================= COLUMN 2: CENTER STAGE ================= */}
          <div
            className="ten-stage-viewport"
            onMouseDown={handleMouseDown}
            onMouseMove={handleMouseMove}
          >
            <div
              className="ten-model-wrapper"
              style={{
                transform: `rotateY(${rotationAngle}deg) scale(${zoomLevel})`,
                transition: isDragging ? "none" : "transform 0.3s ease-out",
              }}
            >
              <Image
                src="/images/tension/avatar_tension_heatmap.png"
                alt="Real-Time Fabric Tension Map Model"
                width={380}
                height={540}
                priority
                className="ten-stage-img"
              />

              {/* Dynamic Interactive Heatmap Pins */}
              <div className="ten-pin pin-shoulder" title={`${t.shoulders}: ${t.optFit}`}>
                <div className="ten-pin-pulse optimal" />
                <div className="ten-pin-card">
                  <span className="ten-pin-title">{t.shoulders}</span>
                  <span className="ten-pin-sub">{t.optFit} • 100%</span>
                </div>
              </div>

              <div className="ten-pin pin-chest" title={`${t.chestPin}: ${t.optFit}`}>
                <div className="ten-pin-pulse optimal" />
                <div className="ten-pin-card">
                  <span className="ten-pin-title">{t.chestPin}</span>
                  <span className="ten-pin-sub">{t.optFit} • 100%</span>
                </div>
              </div>

              <div className="ten-pin pin-cuffs" title={`${t.cuffsPin}: ${t.normEase}`}>
                <div className="ten-pin-pulse normal" />
                <div className="ten-pin-card">
                  <span className="ten-pin-title">{t.cuffsPin}</span>
                  <span className="ten-pin-sub">{t.normEase}</span>
                </div>
              </div>

              <div className="ten-pin pin-hip" title={`${t.hipPin}: ${t.tenZone}`}>
                <div className="ten-pin-pulse tension" />
                <div className="ten-pin-card">
                  <span className="ten-pin-title">{t.hipPin}</span>
                  <span className="ten-pin-sub">{t.tenZone} (+4%)</span>
                </div>
              </div>
            </div>

            {/* Drag to rotate 360 label */}
            <div className="ten-drag-indicator">
              <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M21 12a9 9 0 0 0-9-9 9.75 9.75 0 0 0-6.74 2.74L3 8" />
                <path d="M3 3v5h5" />
              </svg>
              <span>360°</span>
              <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M3 12a9 9 0 0 0 9 9 9.75 9.75 0 0 0 6.74-2.74L21 16" />
                <path d="M16 21h5v-5" />
              </svg>
              <span style={{ marginLeft: "4px" }}>{t.dragHint}</span>
            </div>
          </div>

          {/* ================= COLUMN 3: RIGHT PANEL (FIT ANALYSIS) ================= */}
          <aside className="ten-right-panel">
            {/* Header */}
            <div className="ten-panel-header">
              <div className="ten-panel-header-icon">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M8 3H5a2 2 0 0 0-2 2v3m18 0V5a2 2 0 0 0-2-2h-3m0 18h3a2 2 0 0 0 2-2v-3M3 16v3a2 2 0 0 0 2 2h3" />
                  <circle cx="12" cy="12" r="3" />
                </svg>
              </div>
              <h2 className="ten-panel-title">{t.analysisTitle}</h2>
            </div>

            {/* Metric Items */}
            <div className="ten-metrics-list">
              {/* Shoulders */}
              <div className="ten-metric-item">
                <div className="ten-metric-left">
                  <div className="ten-metric-icon">
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M20.38 3.46 16 2a4 4 0 0 1-8 0L3.62 3.46a2 2 0 0 0-1.34 2.23l.58 3.47a1 1 0 0 0 .99.84H6v10c0 1.1.9 2 2 2h8a2 2 0 0 0 2-2V10h2.15a1 1 0 0 0 .99-.84l.58-3.47a2 2 0 0 0-1.34-2.23z" />
                    </svg>
                  </div>
                  <div className="ten-metric-info">
                    <span className="ten-metric-name">{t.shoulders}</span>
                    <span className="ten-metric-desc">{t.shouldersDesc}</span>
                  </div>
                </div>
                <div className="ten-metric-badge">
                  <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
                    <polyline points="20 6 9 17 4 12" />
                  </svg>
                  <span>{t.shouldersBadge}</span>
                </div>
              </div>

              {/* Waist */}
              <div className="ten-metric-item">
                <div className="ten-metric-left">
                  <div className="ten-metric-icon">
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M6 3v18M18 3v18M6 8c4 0 4 8 0 8M18 8c-4 0-4 8 0 8" />
                    </svg>
                  </div>
                  <div className="ten-metric-info">
                    <span className="ten-metric-name">{t.waist}</span>
                    <span className="ten-metric-desc">{t.waistDesc}</span>
                  </div>
                </div>
                <div className="ten-metric-badge">
                  <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
                    <polyline points="20 6 9 17 4 12" />
                  </svg>
                  <span>{t.waistBadge}</span>
                </div>
              </div>
            </div>

            {/* Note Box */}
            <div className="ten-info-note">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <circle cx="12" cy="12" r="10" />
                <line x1="12" x2="12" y1="16" y2="12" />
                <line x1="12" x2="12.01" y1="8" y2="8" />
              </svg>
              <div className="ten-note-content">
                <span className="ten-note-title">{t.noteTitle}</span>
                <span className="ten-note-body">{t.noteBody}</span>
              </div>
            </div>

            {/* Fitvisor Recommendation Card */}
            <div className="ten-recommendation-card">
              <div className="ten-rec-header">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M15 14c.2-1 .7-1.7 1.5-2.5 1-.9 1.5-2.2 1.5-3.5A6 6 0 0 0 6 8c0 1 .2 2.2 1.5 3.5.7.7 1.3 1.5 1.5 2.5" />
                  <path d="M9 18h6" />
                  <path d="M10 22h4" />
                </svg>
                <span className="ten-rec-title">{t.recTitle}</span>
              </div>

              <p className="ten-rec-text">
                {selectedSize === "L" ? t.recActive : t.recDefault}
              </p>

              <button
                type="button"
                className="ten-rec-btn"
                onClick={handleSwitchSize}
              >
                <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <circle cx="12" cy="5" r="2" />
                  <path d="m14 7 8 8-2 2-6-6-6 6-2-2 8-8" />
                </svg>
                <span>{selectedSize === "L" ? t.recBtnActive : t.recBtnDefault}</span>
              </button>
            </div>

            {/* Quick Actions */}
            <div>
              <h3 className="ten-actions-title">{t.quickActions}</h3>
              <div className="ten-actions-row">
                <Link href="/3d-studio" className="ten-action-card">
                  <div className="ten-action-icon">
                    <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <polygon points="12 2 2 7 12 12 22 7 12 2" />
                      <polyline points="2 17 12 22 22 17" />
                      <polyline points="2 12 12 17 22 12" />
                    </svg>
                  </div>
                  <span className="ten-action-label" style={{ whiteSpace: "pre-line" }}>
                    {t.viewDetails}
                  </span>
                </Link>

                <Link href="/3d-studio/compare" className="ten-action-card">
                  <div className="ten-action-icon">
                    <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M8 3H5a2 2 0 0 0-2 2v3m18 0V5a2 2 0 0 0-2-2h-3m0 18h3a2 2 0 0 0 2-2v-3M3 16v3a2 2 0 0 0 2 2h3" />
                      <line x1="12" x2="12" y1="8" y2="16" />
                    </svg>
                  </div>
                  <span className="ten-action-label" style={{ whiteSpace: "pre-line" }}>
                    {t.compareSizes}
                  </span>
                </Link>

                <button
                  type="button"
                  className="ten-action-card"
                  onClick={handleSaveAnalysis}
                >
                  <div className="ten-action-icon">
                    <svg width="17" height="17" viewBox="0 0 24 24" fill={isSaved ? "#ef4444" : "none"} stroke={isSaved ? "#ef4444" : "currentColor"} strokeWidth="2">
                      <path d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z" />
                    </svg>
                  </div>
                  <span className="ten-action-label" style={{ whiteSpace: "pre-line" }}>
                    {isSaved ? t.saved : t.saveAnalysis}
                  </span>
                </button>
              </div>
            </div>
          </aside>
        </div>

        {/* Dynamic Toast Feedback Notification */}
        {toastMsg && (
          <div className="cat-toast-banner">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="#ef4444" stroke="#ef4444" strokeWidth="2">
              <path d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z" />
            </svg>
            <span>{toastMsg.text}</span>
            <Link href={toastMsg.link} className="cat-toast-link">
              {toastMsg.linkText}
            </Link>
          </div>
        )}
      </div>
    </div>
  );
}
