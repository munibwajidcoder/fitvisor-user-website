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
    navCommunity: "Community",
    searchPlaceholder: "Search brands, styles, or items...",
    cartTitle: "Cart",
    profileTitle: "User Profile",
    filtersBtn: "Filters",
    filtersTitle: "Filters",
    resetAll: "Reset All",
    searchBoxPlaceholder: "Filter by brand or keyword...",
    storesSection: "Stores & Brands",
    categorySection: "Category",
    mySizeTitle: "My Size Only",
    mySizeSub: "Show only clothes compatible with my 3D measurements.",
    fitTypeSection: "Fit Type",
    priceRangeSection: "Price Range",
    itemsFound: "items found",
    sortBy: "Sort by:",
    tryIn3D: "Try in 3D",
    onAvatar: "on my avatar",
    applyFilters: "Apply Filters",
    sortOptions: [
      "Fit Match Relevancy",
      "Price: Low to High",
      "Price: High to Low",
      "New Arrivals",
    ],
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
    filtersBtn: "Filtres",
    filtersTitle: "Filtres",
    resetAll: "Réinitialiser",
    searchBoxPlaceholder: "Filtrer par marque ou mot-clé...",
    storesSection: "Boutiques & Marques",
    categorySection: "Catégorie",
    mySizeTitle: "Ma taille uniquement",
    mySizeSub: "Afficher les vêtements adaptés à mes mesures 3D.",
    fitTypeSection: "Type de coupe",
    priceRangeSection: "Fourchette de prix",
    itemsFound: "articles trouvés",
    sortBy: "Trier par :",
    tryIn3D: "Essayer en 3D",
    onAvatar: "sur mon avatar",
    applyFilters: "Appliquer les filtres",
    sortOptions: [
      "Pertinence coupe",
      "Prix : Croissant",
      "Prix : Décroissant",
      "Nouveautés",
    ],
  },
};

export default function CatalogPage() {
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

  // Filter States
  const [searchKeyword, setSearchKeyword] = useState("");
  const [selectedStores, setSelectedStores] = useState<string[]>(["Zalando", "Shein"]);
  const [selectedCategories, setSelectedCategories] = useState<string[]>(["Blazers"]);
  const [mySizeOnly, setMySizeOnly] = useState<boolean>(true);
  const [selectedFitTypes, setSelectedFitTypes] = useState<string[]>(["Tailored / Slim"]);
  const [priceRange, setPriceRange] = useState<number>(500);

  // Mobile Filter Drawer State
  const [mobileFiltersOpen, setMobileFiltersOpen] = useState<boolean>(false);

  // Sorting Dropdown State
  const [sortOpen, setSortOpen] = useState<boolean>(false);
  const [selectedSort, setSelectedSort] = useState<string>(t.sortOptions[0]);

  useEffect(() => {
    setSelectedSort(t.sortOptions[0]);
  }, [lang]);

  // Selected sizes per product card (default "M" selected)
  const [selectedSizes, setSelectedSizes] = useState<Record<number, string>>({
    1: "M",
    2: "M",
    3: "M",
    4: "M",
    5: "M",
    6: "M",
    7: "M",
    8: "M",
    9: "M",
  });

  // Saved to Wardrobe Favorites
  const [savedIds, setSavedIds] = useState<number[]>([]);
  const [toastMsg, setToastMsg] = useState<string | null>(null);

  useEffect(() => {
    try {
      const stored = localStorage.getItem("fitvisor_saved_catalog_ids");
      if (stored) {
        setSavedIds(JSON.parse(stored));
      }
    } catch (e) {
      console.error(e);
    }
  }, []);

  // Cart Badge Counter
  const [cartCount, setCartCount] = useState<number>(1);

  const handleSizeSelect = (productId: number, size: string) => {
    setSelectedSizes((prev) => ({ ...prev, [productId]: size }));
  };

  const handleTryIn3D = () => {
    setCartCount((prev) => prev + 1);
  };

  const toggleSaveProduct = (p: { id: number; title: string; price: string; img: string; brand: string; category: string }, e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    const isSaved = savedIds.includes(p.id);
    let newIds: number[];
    if (isSaved) {
      newIds = savedIds.filter((id) => id !== p.id);
      setToastMsg(
        lang === "FR"
          ? `"${p.title}" retiré de votre garde-robe`
          : `Removed "${p.title}" from your wardrobe`
      );
    } else {
      newIds = [...savedIds, p.id];
      setToastMsg(
        lang === "FR"
          ? `"${p.title}" ajouté à votre garde-robe !`
          : `Saved "${p.title}" to your wardrobe!`
      );
    }
    setSavedIds(newIds);
    try {
      localStorage.setItem("fitvisor_saved_catalog_ids", JSON.stringify(newIds));

      // Synchronize with wardrobe saved garments
      const currentSavedStr = localStorage.getItem("fitvisor_saved_wardrobe_items");
      let currentSaved: any[] = currentSavedStr ? JSON.parse(currentSavedStr) : [];
      if (isSaved) {
        currentSaved = currentSaved.filter((item: any) => item.id !== `cat-${p.id}`);
      } else {
        const itemExists = currentSaved.some((item: any) => item.id === `cat-${p.id}`);
        if (!itemExists) {
          currentSaved.push({
            id: `cat-${p.id}`,
            name: p.title,
            brand: p.brand,
            price: p.price,
            category: p.category,
            thumb: p.img,
          });
        }
      }
      localStorage.setItem("fitvisor_saved_wardrobe_items", JSON.stringify(currentSaved));
    } catch (err) {
      console.error(err);
    }
    setTimeout(() => {
      setToastMsg(null);
    }, 3200);
  };

  const handleResetFilters = () => {
    setSearchKeyword("");
    setSelectedStores([]);
    setSelectedCategories([]);
    setMySizeOnly(false);
    setSelectedFitTypes([]);
    setPriceRange(500);
  };

  const toggleStore = (store: string) => {
    setSelectedStores((prev) =>
      prev.includes(store) ? prev.filter((s) => s !== store) : [...prev, store]
    );
  };

  const toggleCategory = (cat: string) => {
    setSelectedCategories((prev) =>
      prev.includes(cat) ? prev.filter((c) => c !== cat) : [...prev, cat]
    );
  };

  const toggleFitType = (fit: string) => {
    setSelectedFitTypes((prev) =>
      prev.includes(fit) ? prev.filter((f) => f !== fit) : [...prev, fit]
    );
  };

  // 9 Catalog Products (Bilingual Titles)
  const products = [
    {
      id: 1,
      title: lang === "FR" ? "Blazer structuré en laine ajustée" : "Tailored Structured Wool Blazer",
      price: "$1,290.00",
      img: "/images/catalog/catalog_1_balmain_men.png",
      brand: "BALMAIN",
      category: "Outerwear",
    },
    {
      id: 2,
      title: lang === "FR" ? "Blazer oversize en lin mélangé" : "Oversized Linen Blend Blazer",
      price: "$129.00",
      img: "/images/catalog/catalog_2_zalando_cream.png",
      brand: "ZALANDO",
      category: "Blazers",
    },
    {
      id: 3,
      title: lang === "FR" ? "Blazer coupe slim" : "Slim Fit Blazer",
      price: "$99.99",
      img: "/images/catalog/catalog_3_hm_grey.png",
      brand: "H&M",
      category: "Outerwear",
    },
    {
      id: 4,
      title: lang === "FR" ? "Blazer en laine mélangée" : "Wool Blend Blazer",
      price: "$245.00",
      img: "/images/catalog/catalog_4_sezane_black.png",
      brand: "SÉZANE",
      category: "Outerwear",
    },
    {
      id: 5,
      title: lang === "FR" ? "Blazer croisé" : "Double-Breasted Blazer",
      price: "$295.00",
      img: "/images/catalog/catalog_5_zalando_wine.png",
      brand: "ZALANDO",
      category: "Blazers",
    },
    {
      id: 6,
      title: lang === "FR" ? "Blazer classique en laine marine" : "Classic Navy Wool Blazer",
      price: "$139.00",
      img: "/images/catalog/catalog_6_hm_navy.png",
      brand: "H&M",
      category: "Outerwear",
    },
    {
      id: 7,
      title: lang === "FR" ? "Blazer signature en tweed crème" : "Cream Tweed Signature Blazer",
      price: "$1,490.00",
      img: "/images/catalog/catalog_7_balmain_cream.png",
      brand: "BALMAIN",
      category: "Outerwear",
    },
    {
      id: 8,
      title: lang === "FR" ? "Blazer ajusté avec poches" : "Tailored Blazer with Pockets",
      price: "$189.00",
      img: "/images/catalog/catalog_8_zalando_city.png",
      brand: "ZALANDO",
      category: "Blazers",
    },
    {
      id: 9,
      title: lang === "FR" ? "Blazer en lin mélangé" : "Linen Blend Blazer",
      price: "$269.00",
      img: "/images/catalog/catalog_9_sandro_linen.png",
      brand: "SANDRO",
      category: "Linen",
    },
  ];

  const activeFilterCount =
    selectedStores.length +
    selectedCategories.length +
    (mySizeOnly ? 1 : 0) +
    selectedFitTypes.length;

  return (
    <div className="cat-page-wrapper">
      <div className="cat-container">
        {/* ================= HEADER / NAVBAR (Consistent With HomePage) ================= */}
        <header className="cat-navbar">
          {/* Brand Logo - Row 1 Left */}
          <div className="cat-nav-brand">
            <Logo size="md" />
          </div>

          {/* Nav Links - Center (Desktop) / Row 3 (Mobile) */}
          <nav className="cat-nav-menu">
            <Link href="/" className="cat-nav-item">
              {t.navHome}
            </Link>
            <Link href="/catalog" className="cat-nav-item active">
              {t.navCatalog}
            </Link>
            <Link href="/3d-studio" className="cat-nav-item">
              {t.navStudio}
            </Link>
            <Link href="/wardrobe" className="cat-nav-item">
              {t.navWardrobe}
            </Link>
          </nav>

          {/* Search Input - Desktop Right / Row 2 Full-Width (Mobile) */}
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

          {/* Action Icons Cluster: Lang, Cart, Profile - Row 1 Right */}
          <div className="cat-nav-actions">
            {/* Language Switch */}
            <div className="fv-lang-switch">
              <button
                type="button"
                id="cat-lang-btn-en"
                onClick={() => changeLang("EN")}
                className={`lang-btn ${lang === "EN" ? "active" : ""}`}
              >
                EN
              </button>
              <span className="lang-pipe">|</span>
              <button
                type="button"
                id="cat-lang-btn-fr"
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

        {/* Mobile Filter & Results Bar (Visible on Mobile Only) */}
        <div className="cat-mobile-filter-bar">
          <button
            type="button"
            className="cat-mobile-filter-btn"
            onClick={() => setMobileFiltersOpen(true)}
          >
            <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
              <polygon points="22 3 2 3 10 12.46 10 19 14 21 14 12.46 22 3" />
            </svg>
            <span>{t.filtersBtn}</span>
            {activeFilterCount > 0 && (
              <span className="cat-filter-count-badge">{activeFilterCount}</span>
            )}
          </button>

          <span className="cat-mobile-results-count">
            412 {t.itemsFound}
          </span>
        </div>

        {/* Mobile Filter Drawer Overlay */}
        <div
          className={`cat-sidebar-overlay ${mobileFiltersOpen ? "open" : ""}`}
          onClick={() => setMobileFiltersOpen(false)}
        />

        {/* ================= MAIN LAYOUT: SIDEBAR + GRID ================= */}
        <div className="cat-main-layout">
          {/* ================= LEFT SIDEBAR: FILTERS (Drawer on Mobile) ================= */}
          <aside className={`cat-sidebar ${mobileFiltersOpen ? "open" : ""}`}>
            <div className="cat-filter-header">
              <h2 className="cat-filter-title">{t.filtersTitle}</h2>
              <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
                <button
                  type="button"
                  className="cat-filter-reset"
                  onClick={handleResetFilters}
                >
                  <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M21.5 2v6h-6M21.34 15.57a10 10 0 1 1-.57-8.38l5.67-1.19" />
                  </svg>
                  <span>{t.resetAll}</span>
                </button>
                <button
                  type="button"
                  className="cat-mobile-filter-close-btn"
                  onClick={() => setMobileFiltersOpen(false)}
                  aria-label="Close filters"
                >
                  ✕
                </button>
              </div>
            </div>

            {/* Keyword Search */}
            <div className="cat-filter-search-box">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#94a3b8" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                <circle cx="11" cy="11" r="8" />
                <line x1="21" y1="21" x2="16.65" y2="16.65" />
              </svg>
              <input
                type="text"
                placeholder={t.searchBoxPlaceholder}
                value={searchKeyword}
                onChange={(e) => setSearchKeyword(e.target.value)}
                className="cat-filter-search-input"
              />
            </div>

            {/* Stores & Brands */}
            <div className="cat-filter-section">
              <div className="cat-filter-section-title">
                <span>{t.storesSection}</span>
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#64748b" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                  <polyline points="18 15 12 9 6 15" />
                </svg>
              </div>
              <div className="cat-filter-list">
                {[
                  { name: "Zalando", count: 240 },
                  { name: "Shein", count: 180 },
                  { name: "H&M", count: 95 },
                  { name: "Balmain", count: 12 },
                  { name: "Sézane", count: 34 },
                ].map((item) => (
                  <label key={item.name} className="cat-checkbox-row">
                    <input
                      type="checkbox"
                      checked={selectedStores.includes(item.name)}
                      onChange={() => toggleStore(item.name)}
                      className="cat-checkbox"
                    />
                    <span className="cat-checkbox-label">
                      {item.name} <span className="cat-count">({item.count})</span>
                    </span>
                  </label>
                ))}
              </div>
            </div>

            {/* Category */}
            <div className="cat-filter-section">
              <div className="cat-filter-section-title">
                <span>{t.categorySection}</span>
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#64748b" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                  <polyline points="18 15 12 9 6 15" />
                </svg>
              </div>
              <div className="cat-filter-list">
                {[
                  { key: "Blazers", label: lang === "FR" ? "Blazers" : "Blazers" },
                  { key: "Dresses", label: lang === "FR" ? "Robes" : "Dresses" },
                  { key: "Denim Jeans", label: lang === "FR" ? "Jeans en denim" : "Denim Jeans" },
                  { key: "Shirts", label: lang === "FR" ? "Chemises" : "Shirts" },
                  { key: "Coats", label: lang === "FR" ? "Manteaux" : "Coats" },
                  { key: "Shoes", label: lang === "FR" ? "Chaussures" : "Shoes" },
                ].map((cat) => (
                  <label key={cat.key} className="cat-checkbox-row">
                    <input
                      type="checkbox"
                      checked={selectedCategories.includes(cat.key)}
                      onChange={() => toggleCategory(cat.key)}
                      className="cat-checkbox"
                    />
                    <span className="cat-checkbox-label">{cat.label}</span>
                  </label>
                ))}
              </div>
            </div>

            {/* My Size Only Toggle */}
            <div className="cat-filter-toggle-box">
              <div className="cat-toggle-row">
                <span className="cat-toggle-title">{t.mySizeTitle}</span>
                <button
                  type="button"
                  className={`cat-toggle-switch ${mySizeOnly ? "active" : ""}`}
                  onClick={() => setMySizeOnly(!mySizeOnly)}
                  aria-label="Toggle My Size Only"
                >
                  <span className="cat-toggle-thumb" />
                </button>
              </div>
              <p className="cat-toggle-sub">
                {t.mySizeSub}
              </p>
            </div>

            {/* Fit Type */}
            <div className="cat-filter-section">
              <div className="cat-filter-section-title">
                <span>{t.fitTypeSection}</span>
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#64748b" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                  <polyline points="18 15 12 9 6 15" />
                </svg>
              </div>
              <div className="cat-filter-list">
                {[
                  { key: "Tailored / Slim", label: lang === "FR" ? "Ajusté / Slim" : "Tailored / Slim" },
                  { key: "Regular", label: lang === "FR" ? "Coupe standard" : "Regular" },
                  { key: "Oversized", label: lang === "FR" ? "Oversize" : "Oversized" },
                ].map((fit) => (
                  <label key={fit.key} className="cat-checkbox-row">
                    <input
                      type="checkbox"
                      checked={selectedFitTypes.includes(fit.key)}
                      onChange={() => toggleFitType(fit.key)}
                      className="cat-checkbox"
                    />
                    <span className="cat-checkbox-label">{fit.label}</span>
                  </label>
                ))}
              </div>
            </div>

            {/* Price Range Slider */}
            <div className="cat-filter-section">
              <div className="cat-filter-section-title">
                <span>{t.priceRangeSection}</span>
              </div>
              <div className="cat-slider-wrap">
                <div className="cat-slider-track">
                  <div className="cat-slider-fill" style={{ width: "100%" }} />
                  <div className="cat-slider-thumb thumb-left" />
                  <div className="cat-slider-thumb thumb-right" />
                </div>
                <div className="cat-slider-labels">
                  <span>$20</span>
                  <span>$500+</span>
                </div>
              </div>
            </div>

            {/* Mobile Drawer Bottom Apply CTA */}
            <div className="cat-mobile-filter-apply-btn">
              <button
                type="button"
                className="cat-mobile-apply-cta"
                onClick={() => setMobileFiltersOpen(false)}
              >
                {t.applyFilters} (412)
              </button>
            </div>
          </aside>

          {/* ================= RIGHT MAIN: RESULTS & GRID ================= */}
          <main className="cat-results-main">
            {/* Top Toolbar */}
            <div className="cat-toolbar">
              <span className="cat-items-found">412 {t.itemsFound}</span>

              <div className="cat-sort-container">
                <span className="cat-sort-label">{t.sortBy}</span>
                <button
                  type="button"
                  className="cat-sort-btn"
                  onClick={() => setSortOpen(!sortOpen)}
                >
                  <span>{selectedSort}</span>
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                    <polyline points="6 9 12 15 18 9" />
                  </svg>
                </button>

                {/* Open Dropdown Menu */}
                {sortOpen && (
                  <div className="cat-sort-menu">
                    {t.sortOptions.map((opt) => (
                      <button
                        key={opt}
                        type="button"
                        className={`cat-sort-item ${selectedSort === opt ? "selected" : ""}`}
                        onClick={() => {
                          setSelectedSort(opt);
                          setSortOpen(false);
                        }}
                      >
                        <span>{opt}</span>
                        {selectedSort === opt && (
                          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#2563eb" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                            <polyline points="20 6 9 17 4 12" />
                          </svg>
                        )}
                      </button>
                    ))}
                  </div>
                )}
              </div>
            </div>

            {/* 3x3 Products Grid */}
            <div className="cat-grid">
              {products.map((p) => {
                const currentSize = selectedSizes[p.id] || "M";
                return (
                  <div key={p.id} className="cat-card">
                    {/* Visual Card Image */}
                    <div style={{ position: "relative", width: "100%" }}>
                      <Link href="/product" className="cat-card-img-wrap" style={{ display: "block" }}>
                        <Image
                          src={p.img}
                          alt={p.title}
                          width={340}
                          height={180}
                          priority
                          className="cat-card-img"
                        />
                      </Link>

                      {/* Favorite to Wardrobe Heart Button */}
                      <button
                        type="button"
                        className={`cat-fav-btn ${savedIds.includes(p.id) ? "favorited" : ""}`}
                        onClick={(e) => toggleSaveProduct(p, e)}
                        title={savedIds.includes(p.id) ? (lang === "FR" ? "Retirer de la garde-robe" : "Remove from Wardrobe") : (lang === "FR" ? "Enregistrer dans la garde-robe" : "Save to Wardrobe")}
                        aria-label="Save to Wardrobe"
                      >
                        <svg
                          width="16"
                          height="16"
                          viewBox="0 0 24 24"
                          fill={savedIds.includes(p.id) ? "#ef4444" : "none"}
                          stroke={savedIds.includes(p.id) ? "#ef4444" : "#64748b"}
                          strokeWidth="2.2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        >
                          <path d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z" />
                        </svg>
                      </button>
                    </div>

                    {/* Card Body */}
                    <div className="cat-card-body">
                      <Link href="/product" style={{ textDecoration: "none", color: "inherit" }}>
                        <h3 className="cat-card-title">{p.title}</h3>
                      </Link>
                      <span className="cat-card-price">{p.price}</span>

                      {/* Bottom Controls Row: Sizes & Try-On CTA */}
                      <div className="cat-card-controls">
                        {/* Size Pills */}
                        <div className="cat-size-pills">
                          {["S", "M", "L"].map((sz) => (
                            <button
                              key={sz}
                              type="button"
                              className={`cat-size-pill ${currentSize === sz ? "active" : ""}`}
                              onClick={() => handleSizeSelect(p.id, sz)}
                            >
                              {sz}
                            </button>
                          ))}
                        </div>

                        {/* Try in 3D Button */}
                        <Link
                          href="/3d-studio"
                          className="cat-tryon-btn"
                          onClick={handleTryIn3D}
                        >
                          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                            <path d="M16 7a4 4 0 0 0-8 0v1" />
                            <path d="M2 17l10-8 10 8H2z" />
                          </svg>
                          <div className="cat-tryon-text">
                            <span>{t.tryIn3D}</span>
                            <span className="cat-tryon-sub">{t.onAvatar}</span>
                          </div>
                        </Link>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </main>
        </div>

        {/* Saved to Wardrobe Toast Notification */}
        {toastMsg && (
          <div className="cat-toast-banner">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="#ef4444" stroke="#ef4444" strokeWidth="2">
              <path d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z" />
            </svg>
            <span>{toastMsg}</span>
            <Link href="/wardrobe" className="cat-toast-link">
              {lang === "FR" ? "Voir la garde-robe →" : "View Wardrobe →"}
            </Link>
          </div>
        )}
      </div>
    </div>
  );
}
