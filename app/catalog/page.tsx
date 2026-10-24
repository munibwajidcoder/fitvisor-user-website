"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import Logo from "@/components/Logo";

export default function CatalogPage() {
  // Filter States
  const [searchKeyword, setSearchKeyword] = useState("");
  const [selectedStores, setSelectedStores] = useState<string[]>(["Zalando", "Shein"]);
  const [selectedCategories, setSelectedCategories] = useState<string[]>(["Blazers"]);
  const [mySizeOnly, setMySizeOnly] = useState<boolean>(true);
  const [selectedFitTypes, setSelectedFitTypes] = useState<string[]>(["Tailored / Slim"]);
  const [priceRange, setPriceRange] = useState<number>(500);

  // Sorting Dropdown State (Open by default matching the reference screenshot!)
  const [sortOpen, setSortOpen] = useState<boolean>(true);
  const [selectedSort, setSelectedSort] = useState<string>("Fit Match Relevancy");

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

  // Cart Badge Counter
  const [cartCount, setCartCount] = useState<number>(0);

  const handleSizeSelect = (productId: number, size: string) => {
    setSelectedSizes((prev) => ({ ...prev, [productId]: size }));
  };

  const handleTryIn3D = () => {
    setCartCount((prev) => prev + 1);
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

  const sortOptions = [
    "Fit Match Relevancy",
    "Price: Low to High",
    "Price: High to Low",
    "New Arrivals",
  ];

  // 9 Catalog Products
  const products = [
    {
      id: 1,
      title: "Tailored Structured Wool Blazer",
      price: "$1,290.00",
      img: "/images/catalog/catalog_1_balmain_men.png",
    },
    {
      id: 2,
      title: "Oversized Linen Blend Blazer",
      price: "$129.00",
      img: "/images/catalog/catalog_2_zalando_cream.png",
    },
    {
      id: 3,
      title: "Slim Fit Blazer",
      price: "$99.99",
      img: "/images/catalog/catalog_3_hm_grey.png",
    },
    {
      id: 4,
      title: "Wool Blend Blazer",
      price: "$245.00",
      img: "/images/catalog/catalog_4_sezane_black.png",
    },
    {
      id: 5,
      title: "Double-Breasted Blazer",
      price: "$295.00",
      img: "/images/catalog/catalog_5_zalando_wine.png",
    },
    {
      id: 6,
      title: "Relaxed Fit Blazer",
      price: "$139.00",
      img: "/images/catalog/catalog_6_hm_dark.png",
    },
    {
      id: 7,
      title: "Double-Breasted Wool Blazer",
      price: "$1,490.00",
      img: "/images/catalog/catalog_7_balmain_cream.png",
    },
    {
      id: 8,
      title: "Tailored Blazer with Pockets",
      price: "$189.00",
      img: "/images/catalog/catalog_8_zalando_city.png",
    },
    {
      id: 9,
      title: "Linen Blend Blazer",
      price: "$269.00",
      img: "/images/catalog/catalog_9_sandro_linen.png",
    },
  ];

  return (
    <div className="cat-page-wrapper">
      <div className="cat-container">
        {/* ================= HEADER / NAVBAR ================= */}
        <header className="cat-navbar">
          <div className="cat-nav-brand">
            <Logo size="md" />
          </div>

          <nav className="cat-nav-menu">
            <Link href="/" className="cat-nav-item">
              Home
            </Link>
            <Link href="/catalog" className="cat-nav-item active">
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
              <span className="cat-cart-badge">{cartCount}</span>
            </Link>

            <Link href="/profile" className="cat-user-avatar-wrap" title="User Profile">
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

        {/* ================= MAIN LAYOUT: SIDEBAR + GRID ================= */}
        <div className="cat-main-layout">
          {/* ================= LEFT SIDEBAR: FILTERS ================= */}
          <aside className="cat-sidebar">
            <div className="cat-filter-header">
              <h2 className="cat-filter-title">Filters</h2>
              <button
                type="button"
                className="cat-filter-reset"
                onClick={handleResetFilters}
              >
                <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M21.5 2v6h-6M21.34 15.57a10 10 0 1 1-.57-8.38l5.67-1.19" />
                </svg>
                <span>Reset All</span>
              </button>
            </div>

            {/* Keyword Search */}
            <div className="cat-filter-search-box">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#94a3b8" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                <circle cx="11" cy="11" r="8" />
                <line x1="21" y1="21" x2="16.65" y2="16.65" />
              </svg>
              <input
                type="text"
                placeholder="Filter by brand or keyword..."
                value={searchKeyword}
                onChange={(e) => setSearchKeyword(e.target.value)}
                className="cat-filter-search-input"
              />
            </div>

            {/* Stores & Brands */}
            <div className="cat-filter-section">
              <div className="cat-filter-section-title">
                <span>Stores &amp; Brands</span>
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
                <span>Category</span>
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#64748b" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                  <polyline points="18 15 12 9 6 15" />
                </svg>
              </div>
              <div className="cat-filter-list">
                {[
                  "Blazers",
                  "Dresses",
                  "Denim Jeans",
                  "Shirts",
                  "Coats",
                  "Shoes",
                ].map((cat) => (
                  <label key={cat} className="cat-checkbox-row">
                    <input
                      type="checkbox"
                      checked={selectedCategories.includes(cat)}
                      onChange={() => toggleCategory(cat)}
                      className="cat-checkbox"
                    />
                    <span className="cat-checkbox-label">{cat}</span>
                  </label>
                ))}
              </div>
            </div>

            {/* My Size Only Toggle */}
            <div className="cat-filter-toggle-box">
              <div className="cat-toggle-row">
                <span className="cat-toggle-title">My Size Only</span>
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
                Show only clothes compatible with my 3D measurements.
              </p>
            </div>

            {/* Fit Type */}
            <div className="cat-filter-section">
              <div className="cat-filter-section-title">
                <span>Fit Type</span>
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#64748b" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                  <polyline points="18 15 12 9 6 15" />
                </svg>
              </div>
              <div className="cat-filter-list">
                {["Tailored / Slim", "Regular", "Oversized"].map((fit) => (
                  <label key={fit} className="cat-checkbox-row">
                    <input
                      type="checkbox"
                      checked={selectedFitTypes.includes(fit)}
                      onChange={() => toggleFitType(fit)}
                      className="cat-checkbox"
                    />
                    <span className="cat-checkbox-label">{fit}</span>
                  </label>
                ))}
              </div>
            </div>

            {/* Price Range Slider */}
            <div className="cat-filter-section">
              <div className="cat-filter-section-title">
                <span>Price Range</span>
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
          </aside>

          {/* ================= RIGHT MAIN: RESULTS & GRID ================= */}
          <main className="cat-results-main">
            {/* Top Toolbar */}
            <div className="cat-toolbar">
              <span className="cat-items-found">412 items found</span>

              <div className="cat-sort-container">
                <span className="cat-sort-label">Sort by:</span>
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
                    {sortOptions.map((opt) => (
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
                    <Link href="/product" className="cat-card-img-wrap">
                      <Image
                        src={p.img}
                        alt={p.title}
                        width={340}
                        height={180}
                        priority
                        className="cat-card-img"
                      />
                    </Link>

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
                          href="/digital-twin"
                          className="cat-tryon-btn"
                          onClick={handleTryIn3D}
                        >
                          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                            <path d="M16 7a4 4 0 0 0-8 0v1" />
                            <path d="M2 17l10-8 10 8H2z" />
                          </svg>
                          <div className="cat-tryon-text">
                            <span>Try in 3D</span>
                            <span className="cat-tryon-sub">on my avatar</span>
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
      </div>
    </div>
  );
}
