"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import Logo from "@/components/Logo";

export default function ThreeDStudioPage() {
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
      navCommunity: "Community",
      searchPlaceholder: "Search brands, styles, or items...",
      cartTitle: "Cart",
      profileTitle: "User Profile",
      outfitLayers: "Current Outfit Layers",
      silkShirt: "White Silk Shirt",
      navyBlazer: "Navy Blazer",
      slimTrousers: "Slim Trousers",
      addGarment: "Add garment to look",
      studioLighting: "Studio Lighting",
      daylight: "Daylight\n(5500K)",
      storeLight: "Store\nLight",
      eveningGala: "Evening\nGala",
      rotateHint: "Drag or swipe to rotate avatar 360°",
      autoRotate: "Auto 360°",
      pause: "Pause",
      frontView: "Front 0°",
      fitConfidence: "Fit Confidence Score",
      optimalFit: "Optimal Fit",
      shoulders: "Shoulders",
      chest: "Chest",
      waist: "Waist",
      hips: "Hips",
      length: "Length",
      excellent: "✔ Excellent",
      size: "Size",
      studioTools: "Studio Tools",
      tensionMap: "Fabric Tension Heatmap",
      tensionSub: "See how the fabric fits and moves",
      layering: "Multi-Garment Layering",
      layeringSub: "Try different combinations",
      compare: "Compare 2 Sizes / Looks",
      compareSub: "See side by side comparison",
      saveOutfit: "Save Outfit to Wardrobe",
      savedOutfit: "Saved to Wardrobe ✓",
      saveOutfitSub: "Keep this look for later",
      askFriend: "Ask a Friend",
      askFriendSub: "Live style feedback",
      purchaseLook: "Purchase This Look • $1,290.00",
      addedToCart: "Added to Cart! ✓",
    },
    FR: {
      navHome: "Accueil",
      navCatalog: "Catalogue",
      navStudio: "Studio 3D",
      navWardrobe: "Garde-robe",
      navPricing: "Tarifs",
      navCommunity: "Communauté",
      searchPlaceholder: "Rechercher des marques, styles...",
      cartTitle: "Panier",
      profileTitle: "Profil utilisateur",
      outfitLayers: "Couches de la tenue",
      silkShirt: "Chemise en soie blanche",
      navyBlazer: "Blazer bleu marine",
      slimTrousers: "Pantalon ajusté",
      addGarment: "Ajouter un vêtement au look",
      studioLighting: "Éclairage Studio",
      daylight: "Jour\n(5500K)",
      storeLight: "Boutique\nStore",
      eveningGala: "Soirée\nGala",
      rotateHint: "Glissez ou balayez pour pivoter à 360°",
      autoRotate: "Auto 360°",
      pause: "Pause",
      frontView: "Face 0°",
      fitConfidence: "Indice d'ajustement",
      optimalFit: "Ajustement optimal",
      shoulders: "Épaules",
      chest: "Poitrine",
      waist: "Taille",
      hips: "Hanches",
      length: "Longueur",
      excellent: "✔ Excellent",
      size: "Taille",
      studioTools: "Outils Studio",
      tensionMap: "Carte de tension du tissu",
      tensionSub: "Voir comment le tissu s'ajuste et bouge",
      layering: "Superposition multi-vêtements",
      layeringSub: "Essayer différentes combinaisons",
      compare: "Comparer 2 tailles / looks",
      compareSub: "Voir la comparaison côte à côte",
      saveOutfit: "Enregistrer la tenue",
      savedOutfit: "Enregistrée dans la garde-robe ✓",
      saveOutfitSub: "Conserver ce look pour plus tard",
      askFriend: "Demander l'avis d'un ami",
      askFriendSub: "Commentaires de style en direct",
      purchaseLook: "Acheter ce look • 1 290,00 $",
      addedToCart: "Ajouté au panier ! ✓",
    },
  };

  const t = translations[lang];

  // Studio Interactive States
  const [activeLighting, setActiveLighting] = useState<"daylight" | "store" | "evening">("daylight");
  const [rotationAngle, setRotationAngle] = useState(0);
  const [autoRotate, setAutoRotate] = useState(false);
  const [isDragging, setIsDragging] = useState(false);
  const [dragStartX, setDragStartX] = useState(0);
  const [selectedSize, setSelectedSize] = useState("M");
  const [isSavedToWardrobe, setIsSavedToWardrobe] = useState(false);
  const [cartCount, setCartCount] = useState(1);
  const [purchaseSuccess, setPurchaseSuccess] = useState(false);

  // Garment visibility layers toggle
  const [layersVisibility, setLayersVisibility] = useState<Record<string, boolean>>({
    shirt: true,
    blazer: true,
    trousers: true,
  });

  const toggleLayerVisibility = (layer: string) => {
    setLayersVisibility((prev) => ({ ...prev, [layer]: !prev[layer] }));
  };

  // Continuous Auto-Rotation loop
  useEffect(() => {
    if (!autoRotate) return;
    const interval = setInterval(() => {
      setRotationAngle((prev) => (prev + 1) % 360);
    }, 40);
    return () => clearInterval(interval);
  }, [autoRotate]);

  // Mouse Drag handlers for Desktop
  const handleMouseDown = (e: React.MouseEvent) => {
    setAutoRotate(false);
    setIsDragging(true);
    setDragStartX(e.clientX);
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!isDragging) return;
    const deltaX = e.clientX - dragStartX;
    setRotationAngle((prev) => (prev + deltaX * 0.5 + 360) % 360);
    setDragStartX(e.clientX);
  };

  const handleMouseUp = () => {
    setIsDragging(false);
  };

  // Touch Swipe handlers for Mobile
  const handleTouchStart = (e: React.TouchEvent) => {
    if (e.touches.length === 1) {
      setAutoRotate(false);
      setIsDragging(true);
      setDragStartX(e.touches[0].clientX);
    }
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    if (!isDragging || e.touches.length !== 1) return;
    const deltaX = e.touches[0].clientX - dragStartX;
    setRotationAngle((prev) => (prev + deltaX * 0.7 + 360) % 360);
    setDragStartX(e.touches[0].clientX);
  };

  const handleTouchEnd = () => {
    setIsDragging(false);
  };

  const handlePurchase = () => {
    setCartCount((prev) => prev + 1);
    setPurchaseSuccess(true);
    setTimeout(() => setPurchaseSuccess(false), 2400);
  };

  return (
    <div
      className={`stu-page-wrapper lighting-${activeLighting}`}
      onMouseUp={handleMouseUp}
      onTouchEnd={handleTouchEnd}
    >
      <div className="stu-container">
        {/* ================= UNIVERSAL CONSISTENT HEADER / NAVBAR ================= */}
        <header className="cat-navbar" style={{ marginBottom: "24px" }}>
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
                id="stu-lang-btn-en"
                onClick={() => changeLang("EN")}
                className={`lang-btn ${lang === "EN" ? "active" : ""}`}
              >
                EN
              </button>
              <span className="lang-pipe">|</span>
              <button
                type="button"
                id="stu-lang-btn-fr"
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

            {/* User Profile */}
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

        {/* ================= 3-COLUMN STUDIO LAYOUT ================= */}
        <div className="stu-stage-grid">
          {/* ================= COLUMN 1: CURRENT OUTFIT LAYERS ================= */}
          <aside className="stu-layers-card">
            <div className="stu-layers-header">
              <div className="stu-layers-title-wrap">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#1e293b" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <polygon points="12 2 2 7 12 12 22 7 12 2" />
                  <polyline points="2 17 12 22 22 17" />
                  <polyline points="2 12 12 17 22 12" />
                </svg>
                <h2 className="stu-layers-title">{t.outfitLayers}</h2>
              </div>
              <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="#64748b" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <polyline points="18 15 12 9 6 15" />
              </svg>
            </div>

            {/* Layer 1: White Silk Shirt */}
            <div className={`stu-layer-row ${!layersVisibility.shirt ? "hidden-layer" : ""}`}>
              <div className="stu-layer-thumb-wrap">
                <Image
                  src="/images/studio/layer_shirt.png"
                  alt="White Silk Shirt"
                  width={38}
                  height={42}
                  className="stu-layer-thumb"
                />
              </div>
              <div className="stu-layer-info">
                <span className="stu-layer-name">{t.silkShirt}</span>
                <span className="stu-layer-brand">BALMAIN</span>
              </div>
              <div className="stu-layer-actions">
                <button
                  type="button"
                  className="stu-layer-icon-btn"
                  onClick={() => toggleLayerVisibility("shirt")}
                  title="Toggle Layer Visibility"
                >
                  <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="#64748b" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    {layersVisibility.shirt ? (
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
              </div>
            </div>

            {/* Layer 2: Navy Blazer */}
            <div className={`stu-layer-row ${!layersVisibility.blazer ? "hidden-layer" : ""}`}>
              <div className="stu-layer-thumb-wrap">
                <Image
                  src="/images/studio/layer_blazer.png"
                  alt="Navy Blazer"
                  width={38}
                  height={42}
                  className="stu-layer-thumb"
                />
              </div>
              <div className="stu-layer-info">
                <span className="stu-layer-name">{t.navyBlazer}</span>
                <span className="stu-layer-brand">BALMAIN</span>
              </div>
              <div className="stu-layer-actions">
                <button
                  type="button"
                  className="stu-layer-icon-btn"
                  onClick={() => toggleLayerVisibility("blazer")}
                  title="Toggle Layer Visibility"
                >
                  <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="#64748b" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    {layersVisibility.blazer ? (
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
              </div>
            </div>

            {/* Layer 3: Slim Trousers */}
            <div className={`stu-layer-row ${!layersVisibility.trousers ? "hidden-layer" : ""}`}>
              <div className="stu-layer-thumb-wrap">
                <Image
                  src="/images/studio/layer_trousers.png"
                  alt="Slim Trousers"
                  width={38}
                  height={42}
                  className="stu-layer-thumb"
                />
              </div>
              <div className="stu-layer-info">
                <span className="stu-layer-name">{t.slimTrousers}</span>
                <span className="stu-layer-brand">BALMAIN</span>
              </div>
              <div className="stu-layer-actions">
                <button
                  type="button"
                  className="stu-layer-icon-btn"
                  onClick={() => toggleLayerVisibility("trousers")}
                  title="Toggle Layer Visibility"
                >
                  <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="#64748b" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    {layersVisibility.trousers ? (
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
              </div>
            </div>

            {/* Add Garment Button */}
            <Link href="/catalog" className="stu-add-garment-btn">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <line x1="12" x2="12" y1="5" y2="19" />
                <line x1="5" x2="19" y1="12" y2="12" />
              </svg>
              <span>{t.addGarment}</span>
            </Link>
          </aside>

          {/* ================= COLUMN 2: CENTER 3D AVATAR STAGE ================= */}
          <div
            className="stu-stage-viewport"
            onMouseDown={handleMouseDown}
            onMouseMove={handleMouseMove}
            onTouchStart={handleTouchStart}
            onTouchMove={handleTouchMove}
            onTouchEnd={handleTouchEnd}
          >
            {/* Top Studio Lighting Widget */}
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
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
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
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
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
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z" />
                    </svg>
                  </div>
                  <span className="stu-light-label" style={{ whiteSpace: "pre-line" }}>{t.eveningGala}</span>
                </button>
              </div>
            </div>

            {/* 3D Model & Pedestal Display with Smooth 360° Rotation */}
            <div
              className="stu-model-wrapper"
              style={{
                transform: `rotateY(${rotationAngle}deg)`,
                transition: isDragging ? "none" : "transform 0.4s ease-out",
              }}
            >
              <Image
                src="/images/studio/avatar_3d_studio.png"
                alt="3D Balmain Suit Digital Twin"
                width={420}
                height={560}
                priority
                className="stu-model-stage-img"
              />
            </div>

            {/* Floating 360° Interactive Controls Bar */}
            <div className="stu-rotate-dock">
              <button
                type="button"
                className="stu-rotate-btn"
                onClick={() => {
                  setAutoRotate(false);
                  setRotationAngle((prev) => (prev - 45 + 360) % 360);
                }}
                title="Rotate Left -45°"
              >
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M3 12a9 9 0 1 0 9-9 9.75 9.75 0 0 0-6.74 2.74L3 8" />
                  <path d="M3 3v5h5" />
                </svg>
                <span>-45°</span>
              </button>

              <button
                type="button"
                className={`stu-rotate-btn stu-auto-btn ${autoRotate ? "active" : ""}`}
                onClick={() => setAutoRotate(!autoRotate)}
                title={autoRotate ? "Pause Auto-Rotate" : "Auto-Rotate 360°"}
              >
                {autoRotate ? (
                  <>
                    <svg width="13" height="13" viewBox="0 0 24 24" fill="currentColor">
                      <rect x="6" y="4" width="4" height="16" rx="1" />
                      <rect x="14" y="4" width="4" height="16" rx="1" />
                    </svg>
                    <span>{t.pause}</span>
                  </>
                ) : (
                  <>
                    <svg width="13" height="13" viewBox="0 0 24 24" fill="currentColor">
                      <polygon points="5 3 19 12 5 21 5 3" />
                    </svg>
                    <span>{t.autoRotate}</span>
                  </>
                )}
              </button>

              <div className="stu-angle-badge" title="Current View Angle">
                {Math.round(((rotationAngle % 360) + 360) % 360)}°
              </div>

              <button
                type="button"
                className="stu-rotate-btn"
                onClick={() => {
                  setAutoRotate(false);
                  setRotationAngle((prev) => (prev + 45) % 360);
                }}
                title="Rotate Right +45°"
              >
                <span>+45°</span>
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M21 12a9 9 0 1 1-9-9 9.75 9.75 0 0 1 6.74 2.74L21 8" />
                  <path d="M21 3v5h-5" />
                </svg>
              </button>

              <button
                type="button"
                className="stu-rotate-btn stu-reset-btn"
                onClick={() => {
                  setAutoRotate(false);
                  setRotationAngle(0);
                }}
                title="Reset Front View (0°)"
              >
                {t.frontView}
              </button>
            </div>

            <div className="stu-drag-hint">
              <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M14 9V5a3 3 0 0 0-3-3l-4 9v11h11.28a2 2 0 0 0 2-1.7l1.38-9a2 2 0 0 0-2-2.3zM7 22H4a2 2 0 0 1-2-2v-7a2 2 0 0 1 2-2h3" />
              </svg>
              <span>{t.rotateHint}</span>
            </div>
          </div>

          {/* ================= COLUMN 3: FIT CONFIDENCE & STUDIO TOOLS ================= */}
          <aside className="stu-tools-panel">
            {/* Fit Confidence Score Box */}
            <div className="stu-confidence-box">
              <div className="stu-confidence-header">
                <div className="stu-conf-title-wrap">
                  <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="#2563eb" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                    <circle cx="12" cy="12" r="10" />
                    <line x1="22" x2="18" y1="12" y2="12" />
                    <line x1="6" x2="2" y1="12" y2="12" />
                    <line x1="12" x2="12" y1="6" y2="2" />
                    <line x1="12" x2="12" y1="22" y2="18" />
                  </svg>
                  <h3 className="stu-conf-title">{t.fitConfidence}</h3>
                </div>
                <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="#94a3b8" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <circle cx="12" cy="12" r="10" />
                  <line x1="12" x2="12" y1="16" y2="12" />
                  <line x1="12" x2="12.01" y1="8" y2="8" />
                </svg>
              </div>

              {/* Gauge Ring & Metrics List */}
              <div className="stu-gauge-row">
                <div className="stu-radial-ring-wrap">
                  <svg className="stu-gauge-svg" width="84" height="84" viewBox="0 0 100 100">
                    <circle
                      cx="50"
                      cy="50"
                      r="40"
                      stroke="#e2e8f0"
                      strokeWidth="8"
                      fill="transparent"
                    />
                    <circle
                      cx="50"
                      cy="50"
                      r="40"
                      stroke="#10b981"
                      strokeWidth="8"
                      strokeDasharray="251.2"
                      strokeDashoffset="10"
                      strokeLinecap="round"
                      fill="transparent"
                      transform="rotate(-90 50 50)"
                    />
                  </svg>
                  <div className="stu-gauge-inner">
                    <span className="stu-gauge-pct">96%</span>
                    <span className="stu-gauge-label">{t.optimalFit}</span>
                  </div>
                </div>

                <div className="stu-breakdown-list">
                  <div className="stu-breakdown-row">
                    <span className="stu-breakdown-name">{t.shoulders}</span>
                    <span className="stu-breakdown-val">{t.excellent}</span>
                  </div>
                  <div className="stu-breakdown-row">
                    <span className="stu-breakdown-name">{t.chest}</span>
                    <span className="stu-breakdown-val">{t.excellent}</span>
                  </div>
                  <div className="stu-breakdown-row">
                    <span className="stu-breakdown-name">{t.waist}</span>
                    <span className="stu-breakdown-val">{t.excellent}</span>
                  </div>
                  <div className="stu-breakdown-row">
                    <span className="stu-breakdown-name">{t.hips}</span>
                    <span className="stu-breakdown-val">{t.excellent}</span>
                  </div>
                  <div className="stu-breakdown-row">
                    <span className="stu-breakdown-name">{t.length}</span>
                    <span className="stu-breakdown-val">{t.excellent}</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Size Selector */}
            <div className="stu-size-section">
              <div className="stu-size-header">
                <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="#64748b" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M20.38 3.46 16 2a4 4 0 0 1-8 0L3.62 3.46a2 2 0 0 0-1.34 2.23l.58 3.47a1 1 0 0 0 .99.84H6v10c0 1.1.9 2 2 2h8a2 2 0 0 0 2-2V10h2.15a1 1 0 0 0 .99-.84l.58-3.47a2 2 0 0 0-1.34-2.23z" />
                </svg>
                <span className="stu-size-title">{t.size}</span>
              </div>
              <div className="stu-size-pills">
                {["S", "M", "L"].map((sz) => (
                  <button
                    key={sz}
                    type="button"
                    className={`stu-size-pill ${selectedSize === sz ? "active" : ""}`}
                    onClick={() => setSelectedSize(sz)}
                  >
                    {sz}
                  </button>
                ))}
              </div>
            </div>

            {/* Studio Tools */}
            <div className="stu-tools-section">
              <div className="stu-tools-header">
                <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="#64748b" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M14.7 6.3a1 1 0 0 0 0 1.4l1.6 1.6a1 1 0 0 0 1.4 0l3.77-3.77a6 6 0 0 1-7.94 7.94l-6.91 6.91a2.12 2.12 0 0 1-3-3l6.91-6.91a6 6 0 0 1 7.94-7.94l-3.76 3.76z" />
                </svg>
                <span className="stu-tools-title">{t.studioTools}</span>
              </div>

              <div className="stu-tools-list">
                {/* Tool 1: Fabric Tension Heatmap */}
                <Link
                  href="/3d-studio/tension"
                  className="stu-tool-item"
                >
                  <div className="stu-tool-icon heatmap">
                    <Image
                      src="/images/studio/tool_heatmap.png"
                      alt="Heatmap"
                      width={24}
                      height={24}
                    />
                  </div>
                  <div className="stu-tool-text">
                    <span className="stu-tool-name">{t.tensionMap}</span>
                    <span className="stu-tool-sub">{t.tensionSub}</span>
                  </div>
                  <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="#94a3b8" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="stu-tool-arrow">
                    <polyline points="9 18 15 12 9 6" />
                  </svg>
                </Link>

                {/* Tool 2: Multi-Garment Layering */}
                <Link
                  href="/3d-studio/layering"
                  className="stu-tool-item"
                >
                  <div className="stu-tool-icon">
                    <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="#2563eb" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <polygon points="12 2 2 7 12 12 22 7 12 2" />
                      <polyline points="2 17 12 22 22 17" />
                      <polyline points="2 12 12 17 22 12" />
                    </svg>
                  </div>
                  <div className="stu-tool-text">
                    <span className="stu-tool-name">{t.layering}</span>
                    <span className="stu-tool-sub">{t.layeringSub}</span>
                  </div>
                  <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="#94a3b8" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="stu-tool-arrow">
                    <polyline points="9 18 15 12 9 6" />
                  </svg>
                </Link>

                {/* Tool 3: Compare 2 Sizes / Looks */}
                <Link
                  href="/3d-studio/compare"
                  className="stu-tool-item"
                >
                  <div className="stu-tool-icon">
                    <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="#2563eb" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M8 3H5a2 2 0 0 0-2 2v3m18 0V5a2 2 0 0 0-2-2h-3m0 18h3a2 2 0 0 0 2-2v-3M3 16v3a2 2 0 0 0 2 2h3" />
                      <line x1="12" x2="12" y1="8" y2="16" />
                    </svg>
                  </div>
                  <div className="stu-tool-text">
                    <span className="stu-tool-name">{t.compare}</span>
                    <span className="stu-tool-sub">{t.compareSub}</span>
                  </div>
                  <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="#94a3b8" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="stu-tool-arrow">
                    <polyline points="9 18 15 12 9 6" />
                  </svg>
                </Link>
              </div>
            </div>
          </aside>
        </div>

        {/* ================= BOTTOM FLOATING ACTION DOCK ================= */}
        <div className="stu-bottom-dock">
          <div className="stu-dock-actions-row">
            {/* Action 1: Save Outfit to Wardrobe */}
            <button
              type="button"
              className={`stu-dock-btn ${isSavedToWardrobe ? "active" : ""}`}
              onClick={() => setIsSavedToWardrobe(!isSavedToWardrobe)}
            >
              <div className="stu-dock-icon-circle">
                <svg width="16" height="16" viewBox="0 0 24 24" fill={isSavedToWardrobe ? "#ef4444" : "none"} stroke={isSavedToWardrobe ? "#ef4444" : "#1e293b"} strokeWidth="2">
                  <path d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z" />
                </svg>
              </div>
              <div className="stu-dock-text">
                <span className="stu-dock-title">
                  {isSavedToWardrobe ? t.savedOutfit : t.saveOutfit}
                </span>
                <span className="stu-dock-sub">{t.saveOutfitSub}</span>
              </div>
            </button>

            <div className="stu-dock-divider" />

            {/* Action 2: Ask a Friend */}
            <Link
              href="/3d-studio/ask-friend"
              className="stu-dock-btn"
            >
              <div className="stu-dock-icon-circle">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#1e293b" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" />
                  <circle cx="9" cy="7" r="4" />
                  <path d="M22 21v-2a4 4 0 0 0-3-3.87" />
                  <path d="M16 3.13a4 4 0 0 1 0 7.75" />
                </svg>
              </div>
              <div className="stu-dock-text">
                <span className="stu-dock-title">{t.askFriend}</span>
                <span className="stu-dock-sub">{t.askFriendSub}</span>
              </div>
            </Link>
          </div>

          {/* Action 3: Purchase This Look CTA */}
          <button
            type="button"
            className="stu-purchase-cta"
            onClick={handlePurchase}
          >
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
              <circle cx="8" cy="21" r="1" />
              <circle cx="19" cy="21" r="1" />
              <path d="M2.05 2.05h2l2.66 12.42a2 2 0 0 0 2 1.58h9.78a2 2 0 0 0 1.95-1.57l1.65-7.43H5.12" />
            </svg>
            <span>{purchaseSuccess ? t.addedToCart : t.purchaseLook}</span>
            <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round">
              <path d="M5 12h14" />
              <path d="m12 5 7 7-7 7" />
            </svg>
          </button>
        </div>
      </div>
    </div>
  );
}
