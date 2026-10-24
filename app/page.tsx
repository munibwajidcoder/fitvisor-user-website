"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import Logo from "@/components/Logo";

export default function HomePage() {
  const router = useRouter();
  const [searchQuery, setSearchQuery] = useState("");
  const [cartCount, setCartCount] = useState(1);
  const [likedPosts, setLikedPosts] = useState<Record<number, boolean>>({});
  const [reservedBoutique, setReservedBoutique] = useState<number | null>(null);

  const toggleLike = (id: number) => {
    setLikedPosts((prev) => ({ ...prev, [id]: !prev[id] }));
  };

  const handleAddToCart = () => {
    setCartCount((prev) => prev + 1);
  };

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      router.push(`/catalog?q=${encodeURIComponent(searchQuery.trim())}`);
    }
  };

  const handleReserve = (id: number) => {
    setReservedBoutique(reservedBoutique === id ? null : id);
  };

  // 1. Recommended Products (Blazers)
  const products = [
    {
      id: 1,
      brand: "zalando",
      brandType: "zalando",
      title: "Oversized Blazer",
      category: "Zalando • Women",
      price: "$129.00",
      fitMatch: "98% Fit Match",
      img: "/images/home/product_blazer_1.png",
    },
    {
      id: 2,
      brand: "H&M",
      brandType: "hm",
      title: "Tailored Blazer",
      category: "H&M • Women",
      price: "$99.99",
      fitMatch: "98% Fit Match",
      img: "/images/home/product_blazer_2.png",
    },
    {
      id: 3,
      brand: "sandro",
      brandType: "sandro",
      title: "Wool Blend Blazer",
      category: "Sandro • Women",
      price: "$245.00",
      fitMatch: "96% Fit Match",
      img: "/images/home/product_blazer_3.png",
    },
    {
      id: 4,
      brand: "zalando",
      brandType: "zalando",
      title: "Relaxed Blazer",
      category: "Zalando • Men",
      price: "$139.00",
      fitMatch: "95% Fit Match",
      img: "/images/home/product_blazer_4.png",
    },
    {
      id: 5,
      brand: "H&M",
      brandType: "hm",
      title: "Linen Blazer",
      category: "H&M • Women",
      price: "$89.99",
      fitMatch: "98% Fit Match",
      img: "/images/home/product_blazer_5.png",
    },
    {
      id: 6,
      brand: "sandro",
      brandType: "sandro",
      title: "Double-Breasted Blazer",
      category: "Sandro • Women",
      price: "$295.00",
      fitMatch: "98% Fit Match",
      img: "/images/home/product_blazer_6.png",
    },
  ];

  // 2. Community Style Feed
  const communityPosts = [
    {
      id: 1,
      user: "@alex.style",
      fitMatch: "96% Fit Match",
      img: "/images/home/community_1.png",
    },
    {
      id: 2,
      user: "@sophia.wears",
      fitMatch: "96% Fit Match",
      img: "/images/home/community_2.png",
    },
    {
      id: 3,
      user: "@daniel.trends",
      fitMatch: "97% Fit Match",
      img: "/images/home/community_3.png",
    },
    {
      id: 4,
      user: "@fiona.fashion",
      fitMatch: "95% Fit Match",
      img: "/images/home/community_4.png",
    },
    {
      id: 5,
      user: "@miko.looks",
      fitMatch: "96% Fit Match",
      img: "/images/home/community_5.png",
    },
  ];

  // 3. Partner Boutiques
  const boutiques = [
    {
      id: 1,
      name: "Zalando Lounge",
      location: "Mall of Lahore • 2.6 km",
      badge: "In-Store & Pickup",
      img: "/images/home/boutique_zalando.png",
    },
    {
      id: 2,
      name: "H&M",
      location: "Emporium Mall • 3.1 km",
      badge: "In-Store Fitting",
      img: "/images/home/boutique_hm.png",
    },
    {
      id: 3,
      name: "Sandro",
      location: "Dolmen Mall • 4.8 km",
      badge: "In-Store Fitting",
      img: "/images/home/boutique_sandro.png",
    },
    {
      id: 4,
      name: "Zara",
      location: "Liberty Market • 5.6 km",
      badge: "In-Store & Pickup",
      img: "/images/home/boutique_zara.png",
    },
  ];

  return (
    <div className="fv-app-wrapper">
      <div className="fv-app-container">
        {/* =========================================================
            HEADER / NAVIGATION
            ========================================================= */}
        <header className="fv-navbar">
          {/* Brand Logo */}
          <div className="fv-nav-brand">
            <Logo size="md" />
          </div>

          {/* Nav Links */}
          <nav className="fv-nav-menu">
            <Link href="/" className="fv-nav-item active">
              Home
            </Link>
            <Link href="/catalog" className="fv-nav-item">
              Catalog
            </Link>
            <Link href="/3d-studio" className="fv-nav-item">
              3D Studio
            </Link>
            <Link href="/wardrobe" className="fv-nav-item">
              Wardrobe
            </Link>
            <Link href="/community" className="fv-nav-item">
              Community
            </Link>
          </nav>

          {/* Right Action Bar */}
          <div className="fv-nav-actions">
            {/* Search Input Form */}
            <form onSubmit={handleSearchSubmit} className="fv-search-pill" style={{ display: "flex", alignItems: "center" }}>
              <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="#94a3b8" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" className="fv-search-icon">
                <circle cx="11" cy="11" r="8" />
                <line x1="21" y1="21" x2="16.65" y2="16.65" />
              </svg>
              <input
                type="text"
                placeholder="Search brands, styles, or items..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="fv-search-input"
              />
            </form>

            {/* Shopping Cart Link */}
            <Link
              href="/cart"
              className="fv-cart-btn"
              title="Cart / Try-On Bag"
              style={{ textDecoration: "none" }}
            >
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#64748b" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <circle cx="8" cy="21" r="1" />
                <circle cx="19" cy="21" r="1" />
                <path d="M2.05 2.05h2l2.66 12.42a2 2 0 0 0 2 1.58h9.78a2 2 0 0 0 1.95-1.57l1.65-7.43H5.12" />
              </svg>
              <span className="fv-cart-badge">{cartCount}</span>
            </Link>

            {/* User Profile Avatar */}
            <Link href="/profile" className="fv-user-avatar-wrap" title="My Profile & Biometric Vault">
              <Image
                src="/images/model_face.jpg"
                alt="User Profile"
                width={32}
                height={32}
                className="fv-user-avatar-img"
              />
            </Link>
          </div>
        </header>

        {/* =========================================================
            HERO BANNER: AUTUMN CAPSULE
            ========================================================= */}
        <section className="fv-hero-banner">
          {/* Left Text Column */}
          <div className="fv-hero-left">
            <span className="fv-hero-tag">CURATED FOR YOUR UNIQUE SHAPE</span>
            <h1 className="fv-hero-title">
              Autumn Capsule: 15 Tailored Blazers<br />Matched to Your Body Profile
            </h1>
            <p className="fv-hero-sub">
              Premium brands &bull; Perfect fits &bull; Your style, your way
            </p>
            <Link href="/3d-studio" className="fv-hero-cta">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M16 7a4 4 0 0 0-8 0v1" />
                <path d="M2 17l10-8 10 8H2z" />
              </svg>
              <span>Try Selection on My Avatar</span>
              <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round">
                <path d="M5 12h14" />
                <path d="m12 5 7 7-7 7" />
              </svg>
            </Link>
          </div>

          {/* Right Graphic: Model + Holographic Wireframe 3D Avatar */}
          <div className="fv-hero-graphic-wrap">
            <Image
              src="/images/home/hero_banner_graphic.png"
              alt="Tailored Blazer on 3D Digital Twin Avatar"
              width={640}
              height={270}
              priority
              className="fv-hero-banner-img"
            />
          </div>
        </section>

        {/* =========================================================
            STATUS METRICS ROW (3 PILLS) - ALL FULLY CLICKABLE
            ========================================================= */}
        <div className="fv-metrics-row">
          {/* Metric 1 */}
          <Link href="/profile" style={{ textDecoration: "none", color: "inherit" }} title="View 3D Scan & Profile">
            <div className="fv-metric-pill" style={{ cursor: "pointer" }}>
              <div className="fv-metric-circle">
                <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="#2563eb" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M21.5 2v6h-6M21.34 15.57a10 10 0 1 1-.57-8.38l5.67-1.19" />
                </svg>
              </div>
              <div className="fv-metric-text">
                <span className="fv-metric-sub">Measurements Synced:</span>
                <span className="fv-metric-main">Oct 20, 2026</span>
              </div>
            </div>
          </Link>

          {/* Metric 2 */}
          <Link href="/wardrobe" style={{ textDecoration: "none", color: "inherit" }} title="View 3D Wardrobe">
            <div className="fv-metric-pill" style={{ cursor: "pointer" }}>
              <div className="fv-metric-circle">
                <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="#2563eb" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M16 7a4 4 0 0 0-8 0v1" />
                  <path d="M2 17l10-8 10 8H2z" />
                </svg>
              </div>
              <div className="fv-metric-text">
                <span className="fv-metric-bold-lead">3</span>
                <span className="fv-metric-sub-inline">Saved Outfits</span>
              </div>
            </div>
          </Link>

          {/* Metric 3 */}
          <Link href="/3d-studio/tension" style={{ textDecoration: "none", color: "inherit" }} title="View Real-Time Fabric Tension Analysis">
            <div className="fv-metric-pill" style={{ cursor: "pointer" }}>
              <div className="fv-metric-circle">
                <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="#2563eb" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                  <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
                </svg>
              </div>
              <div className="fv-metric-text">
                <span className="fv-metric-sub">Average Try-On Fit Match:</span>
                <span className="fv-metric-main">96%</span>
              </div>
            </div>
          </Link>
        </div>

        {/* =========================================================
            SECTION 1: RECOMMENDED FOR YOU (6 BLAZERS)
            ========================================================= */}
        <section className="fv-section" id="catalog">
          <div className="fv-section-header">
            <div className="fv-section-title-wrap">
              <h2 className="fv-section-title">Recommended for You</h2>
              <span className="fv-section-pill-tag">
                (Guaranteed Size M with 0% Return Risk)
              </span>
            </div>
            <Link href="/catalog" className="fv-view-all-link">
              <span>View All</span>
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <path d="M5 12h14" />
                <path d="m12 5 7 7-7 7" />
              </svg>
            </Link>
          </div>

          {/* Carousel with navigation arrows */}
          <div className="fv-carousel-wrap">
            <button type="button" className="fv-nav-arrow fv-arrow-prev" aria-label="Previous items">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#64748b" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <polyline points="15 18 9 12 15 6" />
              </svg>
            </button>

            <div className="fv-products-grid">
              {products.map((p) => (
                <div key={p.id} className="fv-product-card">
                  {/* Brand Row */}
                  <div className="fv-prod-brand-row">
                    {p.brandType === "zalando" ? (
                      <span className="fv-brand-zalando">
                        <svg width="10" height="10" viewBox="0 0 24 24" fill="#f97316">
                          <polygon points="12 2 22 22 2 22" />
                        </svg>
                        zalando
                      </span>
                    ) : p.brandType === "hm" ? (
                      <span className="fv-brand-hm">H&amp;M</span>
                    ) : (
                      <span className="fv-brand-sandro">sandro</span>
                    )}
                  </div>

                  {/* Photo Container */}
                  <Link href="/product" className="fv-prod-img-wrap">
                    <Image
                      src={p.img}
                      alt={p.title}
                      width={120}
                      height={120}
                      className="fv-prod-img"
                    />
                    <div className="fv-prod-fit-badge">
                      <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="#059669" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
                        <polyline points="20 6 9 17 4 12" />
                      </svg>
                      <span>{p.fitMatch}</span>
                    </div>
                  </Link>

                  {/* Info Row */}
                  <div className="fv-prod-info">
                    <Link href="/product" style={{ textDecoration: "none", color: "inherit" }}>
                      <span className="fv-prod-title">{p.title}</span>
                    </Link>
                    <span className="fv-prod-cat">{p.category}</span>
                    <div className="fv-prod-bottom-row">
                      <span className="fv-prod-price">{p.price}</span>
                      <button
                        type="button"
                        className="fv-prod-action-btn"
                        onClick={handleAddToCart}
                        title="Try-On on My Avatar"
                      >
                        <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="#ffffff" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                          <path d="M16 7a4 4 0 0 0-8 0v1" />
                          <path d="M2 17l10-8 10 8H2z" />
                        </svg>
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            <button type="button" className="fv-nav-arrow fv-arrow-next" aria-label="Next items">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#64748b" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <polyline points="9 18 15 12 9 6" />
              </svg>
            </button>
          </div>
        </section>

        {/* =========================================================
            SECTION 2: COMMUNITY STYLE FEED HIGHLIGHTS
            ========================================================= */}
        <section className="fv-section" id="community">
          <div className="fv-section-header">
            <div>
              <h2 className="fv-section-title">Community Style Feed Highlights</h2>
              <p className="fv-section-sub">Real people. Real styles. Real fits.</p>
            </div>
            <Link href="#view-all-community" className="fv-view-all-link">
              <span>View All</span>
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <path d="M5 12h14" />
                <path d="m12 5 7 7-7 7" />
              </svg>
            </Link>
          </div>

          <div className="fv-carousel-wrap">
            <button type="button" className="fv-nav-arrow fv-arrow-prev" aria-label="Previous community items">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#64748b" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <polyline points="15 18 9 12 15 6" />
              </svg>
            </button>

            <div className="fv-community-grid">
              {communityPosts.map((post) => {
                const isLiked = !!likedPosts[post.id];
                return (
                  <div key={post.id} className="fv-community-card">
                    <Image
                      src={post.img}
                      alt={`Style by ${post.user}`}
                      width={220}
                      height={140}
                      className="fv-comm-img"
                    />

                    {/* Top Heart Icon */}
                    <button
                      type="button"
                      className={`fv-heart-btn ${isLiked ? "liked" : ""}`}
                      onClick={() => toggleLike(post.id)}
                      title="Favorite"
                    >
                      <svg width="16" height="16" viewBox="0 0 24 24" fill={isLiked ? "#ef4444" : "#ffffff"} stroke={isLiked ? "#ef4444" : "rgba(0,0,0,0.15)"} strokeWidth="1.5">
                        <path d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z" />
                      </svg>
                    </button>

                    {/* Bottom Frosted Pill Overlay */}
                    <div className="fv-comm-overlay">
                      <div className="fv-comm-user">
                        <div className="fv-comm-mini-avatar" />
                        <span className="fv-comm-username">{post.user}</span>
                      </div>
                      <span className="fv-comm-fit">{post.fitMatch}</span>
                    </div>
                  </div>
                );
              })}
            </div>

            <button type="button" className="fv-nav-arrow fv-arrow-next" aria-label="Next community items">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#64748b" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <polyline points="9 18 15 12 9 6" />
              </svg>
            </button>
          </div>
        </section>

        {/* =========================================================
            SECTION 3: PARTNER BOUTIQUES NEAR YOU
            ========================================================= */}
        <section className="fv-section" id="boutiques">
          <div className="fv-section-header">
            <div>
              <h2 className="fv-section-title">Partner Boutiques Near You</h2>
              <p className="fv-section-sub">Book a fitting, try in-store, or pick up your order.</p>
            </div>
            <Link href="#view-all-boutiques" className="fv-view-all-link">
              <span>View All</span>
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <path d="M5 12h14" />
                <path d="m12 5 7 7-7 7" />
              </svg>
            </Link>
          </div>

          <div className="fv-boutiques-grid">
            {boutiques.map((b) => {
              const isReserved = reservedBoutique === b.id;
              return (
                <div key={b.id} className="fv-boutique-card">
                  <div className="fv-boutique-img-wrap">
                    <Image
                      src={b.img}
                      alt={b.name}
                      width={80}
                      height={80}
                      className="fv-boutique-img"
                    />
                  </div>

                  <div className="fv-boutique-info">
                    <span className="fv-boutique-name">{b.name}</span>
                    <div className="fv-boutique-location">
                      <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="#64748b" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z" />
                        <circle cx="12" cy="10" r="3" />
                      </svg>
                      <span>{b.location}</span>
                    </div>

                    <div className="fv-boutique-bottom-row">
                      <span className="fv-boutique-badge">
                        <svg width="9" height="9" viewBox="0 0 24 24" fill="none" stroke="#0d9488" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
                          <polyline points="20 6 9 17 4 12" />
                        </svg>
                        {b.badge}
                      </span>
                      <button
                        type="button"
                        className={`fv-boutique-btn ${isReserved ? "reserved" : ""}`}
                        onClick={() => handleReserve(b.id)}
                      >
                        {isReserved ? "Booked ✓" : "Reserve"}
                      </button>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </section>
      </div>
    </div>
  );
}
