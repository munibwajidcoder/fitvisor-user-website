"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import Logo from "@/components/Logo";
import WelcomeFooter from "@/components/WelcomeFooter";

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

const SAVED_GARMENTS = [
  { id: "sg1", name: "Silk Shirt", brand: "BALMAIN", price: "$320.00", category: "Tops", thumb: "/images/wardrobe/thumb_shirt.png" },
  { id: "sg2", name: "Navy Blazer", brand: "BALMAIN", price: "$980.00", category: "Outerwear", thumb: "/images/wardrobe/thumb_blazer.png" },
  { id: "sg3", name: "Tailored Trousers", brand: "BALMAIN", price: "$540.00", category: "Bottoms", thumb: "/images/wardrobe/thumb_trousers.png" },
  { id: "sg4", name: "Cashmere Sweater", brand: "BRUNELLO CUCINELLI", price: "$360.00", category: "Knitwear", thumb: "/images/wardrobe/thumb_sweater.png" },
  { id: "sg5", name: "Straight Denim", brand: "ACNE STUDIOS", price: "$280.00", category: "Bottoms", thumb: "/images/wardrobe/thumb_denim.png" },
  { id: "sg6", name: "White Sneakers", brand: "COMMON PROJECTS", price: "$180.00", category: "Footwear", thumb: "/images/wardrobe/thumb_sneakers.png" },
];

const TRY_ON_HISTORY = [
  { id: "h1", name: "Power Business Look", formula: "Navy Blazer + Silk Shirt + Trousers", date: "Today, 14:20", fit: "96% Optimal Fit", thumb: "/images/wardrobe/thumb_blazer.png" },
  { id: "h2", name: "Casual Weekend", formula: "Cashmere Sweater + Denim + Sneakers", date: "Yesterday, 18:45", fit: "94% Optimal Fit", thumb: "/images/wardrobe/thumb_sweater.png" },
  { id: "h3", name: "Silk Crepe Minimal Look", formula: "Silk Shirt + Tailored Trousers", date: "Oct 22, 11:10", fit: "98% Optimal Fit", thumb: "/images/wardrobe/thumb_shirt.png" },
];

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
    heroTitle: "Mon Dressing",
    heroSubtitle: "Your virtual wardrobe. Organized, styled, always with you.",
    tabOutfits: "My Complete Outfits",
    tabSaved: "Saved Garments",
    tabHistory: "Try-On History",
    syncLabel: "Wardrobe synced with Zalando and H&M",
    utilTitle: "Clothing utilization rate",
    utilSub: "You're getting great use out of your wardrobe!",
    totalPrice: "Total Price",
    items: "Items",
    openStudio: "Open in 3D Studio",
    undo: "Undo",
    tryInStudio: "Try in 3D Studio",
    addToCart: "Add to Cart",
    fitScore: "Fit Score",
    reopenSession: "Re-Open 3D Studio",
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
    heroTitle: "Mon Dressing",
    heroSubtitle: "Votre garde-robe virtuelle. Organisée, stylée, toujours avec vous.",
    tabOutfits: "Mes tenues complètes",
    tabSaved: "Vêtements enregistrés",
    tabHistory: "Historique d'essayage",
    syncLabel: "Garde-robe synchronisée avec Zalando et H&M",
    utilTitle: "Taux d'utilisation de la garde-robe",
    utilSub: "Vous tirez le meilleur parti de vos tenues !",
    totalPrice: "Prix total",
    items: "Articles",
    openStudio: "Ouvrir en Studio 3D",
    undo: "Annuler",
    tryInStudio: "Essayer dans le Studio 3D",
    addToCart: "Ajouter au panier",
    fitScore: "Indice d'ajustement",
    reopenSession: "Rouvrir en Studio 3D",
  },
};

export default function WardrobePage() {
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

  const [activeTab, setActiveTab] = useState<"outfits" | "saved" | "history">("outfits");
  const [capsules, setCapsules] = useState<OutfitCapsule[]>(INITIAL_CAPSULES);
  const [savedGarments, setSavedGarments] = useState(SAVED_GARMENTS);
  const [searchKeyword, setSearchKeyword] = useState<string>("");
  const [deletedToast, setDeletedToast] = useState<string | null>(null);

  // Load custom saved wardrobe items from catalog / product page
  useEffect(() => {
    try {
      const stored = localStorage.getItem("fitvisor_saved_wardrobe_items");
      if (stored) {
        const parsed = JSON.parse(stored);
        if (Array.isArray(parsed) && parsed.length > 0) {
          const defaultIds = new Set(SAVED_GARMENTS.map((g) => g.id));
          const additions = parsed.filter((item: any) => !defaultIds.has(item.id));
          setSavedGarments([...SAVED_GARMENTS, ...additions]);
        }
      }
    } catch (e) {
      console.error(e);
    }
  }, []);

  const handleDeleteSavedGarment = (id: string, name: string) => {
    const updated = savedGarments.filter((g) => g.id !== id);
    setSavedGarments(updated);
    try {
      const stored = localStorage.getItem("fitvisor_saved_wardrobe_items");
      if (stored) {
        const parsed = JSON.parse(stored);
        const filtered = parsed.filter((item: any) => item.id !== id);
        localStorage.setItem("fitvisor_saved_wardrobe_items", JSON.stringify(filtered));
      }
    } catch (e) {
      console.error(e);
    }
    setDeletedToast(lang === "FR" ? `"${name}" retiré de votre garde-robe` : `Removed "${name}" from your wardrobe`);
    setTimeout(() => {
      setDeletedToast(null);
    }, 3500);
  };

  const handleDeleteCapsule = (id: string, title: string) => {
    setCapsules((prev) => prev.filter((c) => c.id !== id));
    setDeletedToast(`Removed "${title}" from your wardrobe`);
    setTimeout(() => {
      setDeletedToast(null);
    }, 3500);
  };

  const handleRestore = () => {
    setCapsules(INITIAL_CAPSULES);
    setSavedGarments(SAVED_GARMENTS);
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
        {/* ================= HEADER / NAVBAR (Consistent Structure) ================= */}
        <header className="cat-navbar">
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
            <Link href="/wardrobe" className="cat-nav-item active">
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
              value={searchKeyword}
              onChange={(e) => setSearchKeyword(e.target.value)}
              className="cat-search-input"
            />
          </div>

          {/* Action Icons Cluster: Lang Switch, Cart, Profile - Row 1 Right */}
          <div className="cat-nav-actions">
            {/* Language Switch */}
            <div className="fv-lang-switch">
              <button
                type="button"
                id="ward-lang-btn-en"
                onClick={() => changeLang("EN")}
                className={`lang-btn ${lang === "EN" ? "active" : ""}`}
              >
                EN
              </button>
              <span className="lang-pipe">|</span>
              <button
                type="button"
                id="ward-lang-btn-fr"
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
              <span className="cat-cart-badge">3</span>
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

        {/* ================= HERO / CONTROL BAR ================= */}
        <section className="ward-hero-section">
          {/* Left Title & Tab Controls */}
          <div className="ward-hero-left">
            <div className="ward-title-group">
              <div className="ward-heading-row">
                <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="#0f224a" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" className="ward-hanger-icon">
                  <path d="M12 4a3 3 0 0 1 3 3c0 1.3-.84 2.4-2 2.82V12l7 6H4l7-6V9.82C9.84 9.4 9 8.3 9 7a3 3 0 0 1 3-3z" />
                </svg>
                <h1 className="ward-main-title">{t.heroTitle}</h1>
              </div>
              <p className="ward-subtitle">{t.heroSubtitle}</p>
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
                <span>{t.tabOutfits} ({capsules.length})</span>
              </button>

              <button
                type="button"
                className={`ward-tab-pill ${activeTab === "saved" ? "active" : ""}`}
                onClick={() => setActiveTab("saved")}
              >
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M19 21l-7-5-7 5V5a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2z"></path>
                </svg>
                <span>{t.tabSaved} ({savedGarments.length})</span>
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
                <span>{t.tabHistory} ({TRY_ON_HISTORY.length})</span>
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

              <span className="ward-sync-label">{t.syncLabel}</span>

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
                <span className="ward-util-title">{t.utilTitle}</span>
                <span className="ward-util-sub">{t.utilSub}</span>
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
              {t.undo}
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

                  <button
                    type="button"
                    className="ward-options-btn"
                    title="Delete outfit"
                    onClick={() => handleDeleteCapsule(capsule.id, capsule.title)}
                  >
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
                      <circle cx="12" cy="12" r="2" />
                      <circle cx="19" cy="21" r="2" />
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
                        <div className="ward-garment-left">
                          <div className="ward-garment-thumb-wrap">
                            <Image
                              src={g.thumb}
                              alt={g.name}
                              width={38}
                              height={44}
                              className="ward-garment-thumb"
                            />
                          </div>
                          <span className="ward-garment-name">{g.name}</span>
                        </div>
                        <span className="ward-garment-price">{g.price}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Footer */}
                <div className="ward-card-footer">
                  <div className="ward-price-action-row">
                    <div className="ward-price-group">
                      <span className="ward-price-label">{t.totalPrice}</span>
                      <div className="ward-price-val-row">
                        <span className="ward-price-val">{capsule.totalPrice}</span>
                        <span className="ward-items-count-pill">{capsule.itemsCount} {t.items}</span>
                      </div>
                    </div>

                    <Link href="/3d-studio" className="ward-open-studio-btn">
                      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z"></path>
                        <polyline points="3.27 6.96 12 12.01 20.73 6.96"></polyline>
                        <line x1="12" y1="22.08" x2="12" y2="12"></line>
                      </svg>
                      <span>{t.openStudio}</span>
                    </Link>
                  </div>
                </div>
              </article>
            ))}
          </div>
        )}

        {/* ================= SAVED GARMENTS TAB ================= */}
        {activeTab === "saved" && (
          <div className="ward-saved-grid">
            {savedGarments.map((item) => (
              <div key={item.id} className="ward-saved-card">
                <div className="ward-saved-visual">
                  <Image
                    src={item.thumb}
                    alt={item.name}
                    width={140}
                    height={160}
                    className="ward-saved-img"
                  />
                  <span className="ward-saved-badge">{item.category}</span>
                  <button
                    type="button"
                    onClick={() => handleDeleteSavedGarment(item.id, item.name)}
                    style={{
                      position: "absolute",
                      top: "8px",
                      right: "8px",
                      width: "26px",
                      height: "26px",
                      borderRadius: "50%",
                      background: "rgba(255, 255, 255, 0.9)",
                      border: "none",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      cursor: "pointer",
                      boxShadow: "0 2px 6px rgba(0,0,0,0.1)",
                    }}
                    title={lang === "FR" ? "Retirer de la garde-robe" : "Remove from Wardrobe"}
                  >
                    <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="#ef4444" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                      <line x1="18" y1="6" x2="6" y2="18"></line>
                      <line x1="6" y1="6" x2="18" y2="18"></line>
                    </svg>
                  </button>
                </div>
                <div className="ward-saved-info">
                  <span className="ward-saved-brand">{item.brand}</span>
                  <h3 className="ward-saved-name">{item.name}</h3>
                  <div className="ward-saved-price-row">
                    <span className="ward-saved-price">{item.price}</span>
                  </div>
                  <div className="ward-saved-actions">
                    <Link href="/3d-studio" className="ward-saved-try-btn">
                      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z"></path>
                      </svg>
                      <span>{t.tryInStudio}</span>
                    </Link>
                    <Link href="/cart" className="ward-saved-cart-btn" title="Add to Bag">
                      <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2">
                        <path d="M6 2L3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z"></path>
                        <line x1="3" y1="6" x2="21" y2="6"></line>
                        <path d="M16 10a4 4 0 0 1-8 0"></path>
                      </svg>
                    </Link>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* ================= TRY-ON HISTORY TAB ================= */}
        {activeTab === "history" && (
          <div className="ward-history-list">
            {TRY_ON_HISTORY.map((h) => (
              <div key={h.id} className="ward-history-card">
                <div className="ward-history-left">
                  <div className="ward-history-thumb-wrap">
                    <Image
                      src={h.thumb}
                      alt={h.name}
                      width={44}
                      height={50}
                      className="ward-history-thumb"
                    />
                  </div>
                  <div>
                    <h3 className="ward-history-name">{h.name}</h3>
                    <p className="ward-history-formula">{h.formula}</p>
                    <span className="ward-history-date">{h.date}</span>
                  </div>
                </div>

                <div className="ward-history-right">
                  <span className="ward-history-score">
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#059669" strokeWidth="2.5">
                      <polyline points="20 6 9 17 4 12"></polyline>
                    </svg>
                    {h.fit}
                  </span>
                  <Link href="/3d-studio" className="ward-history-btn">
                    <span>{t.reopenSession}</span>
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <polyline points="9 18 15 12 9 6"></polyline>
                    </svg>
                  </Link>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
      <WelcomeFooter lang={lang} />
    </div>
  );
}
