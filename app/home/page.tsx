"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import Logo from "@/components/Logo";
import WelcomeFooter from "@/components/WelcomeFooter";

const translations = {
  EN: {
    navHome: "Home",
    navCatalog: "Catalog",
    navStudio: "3D Studio",
    navWardrobe: "Wardrobe",
    navPricing: "Plans",
    navCommunity: "Community",
    searchPlaceholder: "Search brands, styles, or items...",
    cartTitle: "Cart / Try-On Bag",
    profileTitle: "My Profile & Biometric Vault",
    heroTag: "CURATED FOR YOUR UNIQUE SHAPE",
    heroTitle: "Autumn Capsule: 15 Tailored Blazers\nMatched to Your Body Profile",
    heroSub: "Premium brands • Perfect fits • Your style, your way",
    heroCta: "Try Selection on My Avatar",
    metricSynced: "Measurements Synced:",
    metricSyncedDate: "Oct 20, 2026",
    metricOutfits: "Saved Outfits",
    metricFitMatch: "Average Try-On Fit Match:",
    recTitle: "Recommended for You",
    recSub: "(Guaranteed Size M with 0% Return Risk)",
    viewAll: "View All",
    tryOnAction: "Try-On on My Avatar",
    commTitle: "Community Style Feed Highlights",
    commSub: "Real people. Real styles. Real fits.",
    boutTitle: "Partner Boutiques Near You",
    boutSub: "Book a fitting, try in-store, or pick up your order.",
    reserve: "Reserve",
    booked: "Booked ✓",
  },
  FR: {
    navHome: "Accueil",
    navCatalog: "Catalogue",
    navStudio: "Studio 3D",
    navWardrobe: "Garde-robe",
    navPricing: "Tarifs",
    navCommunity: "Communauté",
    searchPlaceholder: "Rechercher des marques, styles...",
    cartTitle: "Panier / Sac d'essayage",
    profileTitle: "Mon profil & Coffre biométrique",
    heroTag: "SÉLECTIONNÉ POUR VOTRE MORPHOLOGIE UNIQUE",
    heroTitle: "Capsule d'Automne : 15 Blazers ajustés\nà votre profil morphologique",
    heroSub: "Marques haut de gamme • Coupes parfaites • Votre style, à votre façon",
    heroCta: "Essayer sur mon avatar",
    metricSynced: "Mesures synchronisées :",
    metricSyncedDate: "20 oct. 2026",
    metricOutfits: "Tenues enregistrées",
    metricFitMatch: "Précision moyenne d'essayage :",
    recTitle: "Recommandé pour vous",
    recSub: "(Taille M garantie avec 0% risque de retour)",
    viewAll: "Voir tout",
    tryOnAction: "Essayer sur mon avatar",
    commTitle: "Tendances de la communauté",
    commSub: "De vraies personnes. De vrais styles. De vraies coupes.",
    boutTitle: "Boutiques partenaires à proximité",
    boutSub: "Réservez un essayage, essayez en magasin ou retirez votre commande.",
    reserve: "Réserver",
    booked: "Réservé ✓",
  },
};

export default function HomePage() {
  const router = useRouter();
  const [lang, setLang] = useState<"EN" | "FR">("EN");
  const [searchQuery, setSearchQuery] = useState("");
  const [cartCount, setCartCount] = useState(1);
  const [likedPosts, setLikedPosts] = useState<Record<number, boolean>>({});
  const [reservedBoutique, setReservedBoutique] = useState<number | null>(null);

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

  // 1. Recommended Products (Blazers) - Full Bilingual Translations
  const products = [
    {
      id: 1,
      brand: "zalando",
      brandType: "zalando",
      title: lang === "FR" ? "Blazer oversize" : "Oversized Blazer",
      category: lang === "FR" ? "Zalando • Femmes" : "Zalando • Women",
      price: "$129.00",
      fitMatch: lang === "FR" ? "98% Correspondance" : "98% Fit Match",
      img: "/images/home/product_blazer_1.png",
    },
    {
      id: 2,
      brand: "H&M",
      brandType: "hm",
      title: lang === "FR" ? "Blazer ajusté" : "Tailored Blazer",
      category: lang === "FR" ? "H&M • Femmes" : "H&M • Women",
      price: "$99.99",
      fitMatch: lang === "FR" ? "98% Correspondance" : "98% Fit Match",
      img: "/images/home/product_blazer_2.png",
    },
    {
      id: 3,
      brand: "sandro",
      brandType: "sandro",
      title: lang === "FR" ? "Blazer en laine mélangée" : "Wool Blend Blazer",
      category: lang === "FR" ? "Sandro • Femmes" : "Sandro • Women",
      price: "$245.00",
      fitMatch: lang === "FR" ? "96% Correspondance" : "96% Fit Match",
      img: "/images/home/product_blazer_3.png",
    },
    {
      id: 4,
      brand: "zalando",
      brandType: "zalando",
      title: lang === "FR" ? "Blazer décontracté" : "Relaxed Blazer",
      category: lang === "FR" ? "Zalando • Hommes" : "Zalando • Men",
      price: "$139.00",
      fitMatch: lang === "FR" ? "95% Correspondance" : "95% Fit Match",
      img: "/images/home/product_blazer_4.png",
    },
    {
      id: 5,
      brand: "H&M",
      brandType: "hm",
      title: lang === "FR" ? "Blazer en lin" : "Linen Blazer",
      category: lang === "FR" ? "H&M • Femmes" : "H&M • Women",
      price: "$89.99",
      fitMatch: lang === "FR" ? "98% Correspondance" : "98% Fit Match",
      img: "/images/home/product_blazer_5.png",
    },
    {
      id: 6,
      brand: "sandro",
      brandType: "sandro",
      title: lang === "FR" ? "Blazer croisé" : "Double-Breasted Blazer",
      category: lang === "FR" ? "Sandro • Femmes" : "Sandro • Women",
      price: "$295.00",
      fitMatch: lang === "FR" ? "98% Correspondance" : "98% Fit Match",
      img: "/images/home/product_blazer_6.png",
    },
  ];

  // 2. Community Style Feed - Correct Image Paths & Translations
  const communityPosts = [
    {
      id: 1,
      user: "@sarah_fit",
      fitMatch: lang === "FR" ? "98% Correspondance" : "98% Match",
      likes: 243,
      verified: true,
      badge: lang === "FR" ? "Sablier • Taille M" : "Hourglass • Size M",
      img: "/images/home/community_1.png",
    },
    {
      id: 2,
      user: "@marcus_style",
      fitMatch: lang === "FR" ? "96% Correspondance" : "96% Match",
      likes: 189,
      verified: true,
      badge: lang === "FR" ? "Athlétique • Taille L" : "Athletic • Size L",
      img: "/images/home/community_2.png",
    },
    {
      id: 3,
      user: "@elena_couture",
      fitMatch: lang === "FR" ? "99% Correspondance" : "99% Match",
      likes: 412,
      verified: true,
      badge: lang === "FR" ? "Petite • Taille S" : "Petite • Size S",
      img: "/images/home/community_3.png",
    },
    {
      id: 4,
      user: "@chloe_mode",
      fitMatch: lang === "FR" ? "97% Correspondance" : "97% Match",
      likes: 315,
      verified: true,
      badge: lang === "FR" ? "Grande • Taille M" : "Tall • Size M",
      img: "/images/home/community_4.png",
    },
  ];

  // 3. Partner Boutiques - Translations
  const boutiques = [
    {
      id: 1,
      name: "Sandro Marais",
      location: "Rue Vieille du Temple, Paris",
      badge: lang === "FR" ? "En magasin & Retrait 1h" : "In-Store & 1h Pickup",
      img: "/images/home/boutique_sandro.png",
    },
    {
      id: 2,
      name: "Zalando Lounge",
      location: "Gutenbergstraße, Berlin",
      badge: lang === "FR" ? "Cabine d'essayage express" : "Instant Fitting Room",
      img: "/images/home/boutique_zalando.png",
    },
    {
      id: 3,
      name: "H&M Flagship",
      location: "Regent Street, London",
      badge: lang === "FR" ? "En magasin & Retrait" : "In-Store & Pickup",
      img: "/images/home/boutique_hm.png",
    },
    {
      id: 4,
      name: "Zara Haussmann",
      location: "Bd Haussmann, Paris",
      badge: lang === "FR" ? "En magasin & Retrait" : "In-Store & Pickup",
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
          {/* Brand Logo - Top Left */}
          <div className="fv-nav-brand">
            <Logo size="md" href="/home" />
          </div>

          {/* Nav Links - Center (Desktop) / Row 3 (Mobile) */}
          <nav className="fv-nav-menu">
            <Link href="/home" className="fv-nav-item active">
              {t.navHome}
            </Link>
            <Link href="/catalog" className="fv-nav-item">
              {t.navCatalog}
            </Link>
            <Link href="/3d-studio" className="fv-nav-item">
              {t.navStudio}
            </Link>
            <Link href="/wardrobe" className="fv-nav-item">
              {t.navWardrobe}
            </Link>
          </nav>

          {/* Search Form - Right (Desktop) / Row 2 Full-Width (Mobile) */}
          <form onSubmit={handleSearchSubmit} className="fv-search-pill">
            <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="#94a3b8" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" className="fv-search-icon">
              <circle cx="11" cy="11" r="8" />
              <line x1="21" y1="21" x2="16.65" y2="16.65" />
            </svg>
            <input
              type="text"
              placeholder={t.searchPlaceholder}
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="fv-search-input"
            />
          </form>

          {/* Top Right Actions Cluster: Language Switch, Cart, Profile */}
          <div className="fv-nav-actions">
            {/* Language Switch */}
            <div className="fv-lang-switch">
              <button
                type="button"
                id="home-lang-btn-en"
                onClick={() => changeLang("EN")}
                className={`lang-btn ${lang === "EN" ? "active" : ""}`}
              >
                EN
              </button>
              <span className="lang-pipe">|</span>
              <button
                type="button"
                id="home-lang-btn-fr"
                onClick={() => changeLang("FR")}
                className={`lang-btn ${lang === "FR" ? "active" : ""}`}
              >
                FR
              </button>
            </div>

            {/* Shopping Cart Link */}
            <Link
              href="/cart"
              className="fv-cart-btn"
              title={t.cartTitle}
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
            <Link href="/profile" className="fv-user-avatar-wrap" title={t.profileTitle}>
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
            <span className="fv-hero-tag">{t.heroTag}</span>
            <h1 className="fv-hero-title" style={{ whiteSpace: "pre-line" }}>
              {t.heroTitle}
            </h1>
            <p className="fv-hero-sub">
              {t.heroSub}
            </p>
            <Link href="/3d-studio" className="fv-hero-cta">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M16 7a4 4 0 0 0-8 0v1" />
                <path d="M2 17l10-8 10 8H2z" />
              </svg>
              <span>{t.heroCta}</span>
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
                <span className="fv-metric-sub">{t.metricSynced}</span>
                <span className="fv-metric-main">{t.metricSyncedDate}</span>
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
                <span className="fv-metric-sub-inline">{t.metricOutfits}</span>
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
                <span className="fv-metric-sub">{t.metricFitMatch}</span>
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
              <h2 className="fv-section-title">{t.recTitle}</h2>
              <span className="fv-section-pill-tag">
                {t.recSub}
              </span>
            </div>
            <Link href="/catalog" className="fv-view-all-link">
              <span>{t.viewAll}</span>
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
                        title={t.tryOnAction}
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
              <h2 className="fv-section-title">{t.commTitle}</h2>
              <p className="fv-section-sub">{t.commSub}</p>
            </div>
            <Link href="#view-all-community" className="fv-view-all-link">
              <span>{t.viewAll}</span>
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
                const isLiked = likedPosts[post.id] ?? false;
                return (
                  <div key={post.id} className="fv-comm-card">
                    {/* Visual Photo Card */}
                    <div className="fv-comm-img-wrap">
                      <Image
                        src={post.img}
                        alt={`Look by ${post.user}`}
                        width={260}
                        height={340}
                        className="fv-comm-img"
                      />
                    </div>

                    {/* Top Row: Tag badge + Floating Like Button */}
                    <div className="fv-comm-top-row">
                      <span className="fv-comm-badge">{post.badge}</span>

                      <button
                        type="button"
                        className={`fv-comm-like-btn ${isLiked ? "liked" : ""}`}
                        onClick={() => toggleLike(post.id)}
                        aria-label="Like this look"
                      >
                        <svg
                          width="13"
                          height="13"
                          viewBox="0 0 24 24"
                          fill={isLiked ? "#f04b55" : "none"}
                          stroke={isLiked ? "#f04b55" : "#ffffff"}
                          strokeWidth="2.4"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        >
                          <path d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z" />
                        </svg>
                        <span>{isLiked ? post.likes + 1 : post.likes}</span>
                      </button>
                    </div>

                    {/* Bottom Metadata Footer: User Avatar + Fit Match */}
                    <div className="fv-comm-meta">
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
              <h2 className="fv-section-title">{t.boutTitle}</h2>
              <p className="fv-section-sub">{t.boutSub}</p>
            </div>
            <Link href="#view-all-boutiques" className="fv-view-all-link">
              <span>{t.viewAll}</span>
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
                        {isReserved ? t.booked : t.reserve}
                      </button>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </section>
      </div>
      <WelcomeFooter lang={lang} />
    </div>
  );
}
