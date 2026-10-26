"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import Logo from "@/components/Logo";

interface CommunityPost {
  id: string;
  name: string;
  meta: string;
  avatar: string;
  photo: string;
  badgeType: "green" | "blue";
  badgeText: string;
  review: string;
  tags: { label: string; href: string }[];
  likes: number;
  comments: number;
  bodyType: "hourglass" | "athletic" | "petite" | "tall" | "all";
}

const INITIAL_POSTS: CommunityPost[] = [
  {
    id: "camille",
    name: "Camille",
    meta: '5\'8" • Size 38/M',
    avatar: "/images/community/avatar_camille.png",
    photo: "/images/community/post_camille.png",
    badgeType: "green",
    badgeText: "100% Verified Authentic Review",
    review: "Love the structured drape on this blazer paired with wide-leg denim",
    tags: [
      { label: "Balmain Blazer 40", href: "/product" },
      { label: "Levi's 501", href: "/catalog" },
    ],
    likes: 342,
    comments: 28,
    bodyType: "tall",
  },
  {
    id: "ayesha",
    name: "Ayesha",
    meta: '5\'6" • Size 36/S',
    avatar: "/images/community/avatar_ayesha.png",
    photo: "/images/community/post_ayesha.png",
    badgeType: "blue",
    badgeText: "Verified Fit",
    review: "This silk drape dress fits so well! Feels light, elegant and super comfortable.",
    tags: [
      { label: "Satin Slip Dress", href: "/catalog" },
      { label: "Black Shoulder Bag", href: "/catalog" },
    ],
    likes: 521,
    comments: 46,
    bodyType: "hourglass",
  },
  {
    id: "rohan",
    name: "Rohan",
    meta: '6\'0" • Size 42/L',
    avatar: "/images/community/avatar_rohan.png",
    photo: "/images/community/post_rohan.png",
    badgeType: "green",
    badgeText: "100% Verified Authentic Review",
    review: "The knit is thicker than I expected, perfect for winter. Great quality!",
    tags: [
      { label: "Uniqlo Knit Sweater", href: "/catalog" },
      { label: "Zara Chinos", href: "/catalog" },
    ],
    likes: 198,
    comments: 12,
    bodyType: "athletic",
  },
  {
    id: "sara",
    name: "Sara",
    meta: '5\'4" • Size 34/XS',
    avatar: "/images/community/avatar_sara.png",
    photo: "/images/community/post_sara.png",
    badgeType: "blue",
    badgeText: "Verified Fit",
    review: "Easy, casual and works for everyday wear. The fit is just right!",
    tags: [
      { label: "Oversized Shirt", href: "/catalog" },
      { label: "Straight Leg Jeans", href: "/catalog" },
    ],
    likes: 276,
    comments: 19,
    bodyType: "petite",
  },
];

const FILTER_PILLS = [
  { id: "all", label: "All Body Types" },
  { id: "hourglass", label: "Hourglass Profile" },
  { id: "athletic", label: "Athletic" },
  { id: "petite", label: 'Petite (< 5\'3")' },
  { id: "tall", label: 'Tall (> 5\'9")' },
];

export default function CommunityPage() {
  const [activeFilter, setActiveFilter] = useState<string>("all");
  const [likedPosts, setLikedPosts] = useState<Record<string, boolean>>({});
  const [likeCounts, setLikeCounts] = useState<Record<string, number>>({
    camille: 342,
    ayesha: 521,
    rohan: 198,
    sara: 276,
  });
  const [shareModalOpen, setShareModalOpen] = useState(false);
  const [searchKeyword, setSearchKeyword] = useState("");

  const handleToggleLike = (id: string) => {
    setLikedPosts((prev) => {
      const isLiked = !!prev[id];
      setLikeCounts((c) => ({
        ...c,
        [id]: isLiked ? c[id] - 1 : c[id] + 1,
      }));
      return { ...prev, [id]: !isLiked };
    });
  };

  const filteredPosts = INITIAL_POSTS.filter((post) => {
    if (activeFilter !== "all" && post.bodyType !== activeFilter) {
      return false;
    }
    if (searchKeyword.trim() !== "") {
      const q = searchKeyword.toLowerCase();
      const matchName = post.name.toLowerCase().includes(q);
      const matchReview = post.review.toLowerCase().includes(q);
      const matchTags = post.tags.some((t) => t.label.toLowerCase().includes(q));
      return matchName || matchReview || matchTags;
    }
    return true;
  });

  return (
    <div className="com-page-wrapper">
      <div className="com-container">
        {/* ================= HEADER / NAVBAR ================= */}
        <header className="cat-navbar" style={{ marginBottom: "28px" }}>
          <div className="cat-nav-brand">
            <Logo size="md" href="/home" />
          </div>

          <nav className="cat-nav-menu">
            <Link href="/home" className="cat-nav-item">
              Home
            </Link>
            <Link href="/catalog" className="cat-nav-item">
              Catalog
            </Link>
            <Link href="/3d-studio" className="cat-nav-item">
              3D Studio
            </Link>
            <Link href="/wardrobe" className="cat-nav-item">
              Wardrobe
            </Link>
            <Link href="/community" className="cat-nav-item active">
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
                value={searchKeyword}
                onChange={(e) => setSearchKeyword(e.target.value)}
                className="cat-search-input"
              />
            </div>

            <Link href="/cart" className="cat-cart-btn" title="Cart" style={{ textDecoration: "none" }}>
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#64748b" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <circle cx="8" cy="21" r="1" />
                <circle cx="19" cy="21" r="1" />
                <path d="M2.05 2.05h2l2.66 12.42a2 2 0 0 0 2 1.58h9.78a2 2 0 0 0 1.95-1.57l1.65-7.43H5.12" />
              </svg>
              <span className="cat-cart-badge">3</span>
            </Link>

            <Link href="/profile" className="cat-user-avatar-wrap" title="User Profile" style={{ display: "flex", alignItems: "center", gap: "4px", textDecoration: "none" }}>
              <Image
                src="/images/model_face.jpg"
                alt="User Profile"
                width={32}
                height={32}
                className="cat-user-avatar-img"
              />
              <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="#64748b" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <polyline points="6 9 12 15 18 9"></polyline>
              </svg>
            </Link>
          </div>
        </header>

        {/* ================= HERO SECTION ================= */}
        <section className="com-hero-row">
          <div className="com-hero-left">
            <h1 className="com-hero-title">Real Style Inspirations &amp; Verified Reviews</h1>
            <p className="com-hero-sub">See how our community wears pieces with zero misleading photo filters.</p>
          </div>

          <button
            type="button"
            className="com-share-btn"
            onClick={() => setShareModalOpen(true)}
          >
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
              <circle cx="18" cy="5" r="3" />
              <circle cx="6" cy="12" r="3" />
              <circle cx="18" cy="19" r="3" />
              <line x1="8.59" y1="13.51" x2="15.42" y2="17.49" />
              <line x1="15.41" y1="6.51" x2="8.59" y2="10.49" />
            </svg>
            Share My Daily Outfit
          </button>
        </section>

        {/* ================= FILTER PILLS BAR ================= */}
        <div className="com-filters-bar">
          {FILTER_PILLS.map((pill) => (
            <button
              key={pill.id}
              type="button"
              className={`com-filter-pill ${activeFilter === pill.id ? "active" : ""}`}
              onClick={() => setActiveFilter(pill.id)}
            >
              {pill.label}
            </button>
          ))}
        </div>

        {/* ================= 2-COLUMN POSTS GRID ================= */}
        <div className="com-posts-grid">
          {filteredPosts.map((post) => {
            const isLiked = !!likedPosts[post.id];
            const currentLikes = likeCounts[post.id] ?? post.likes;

            return (
              <article key={post.id} className="com-post-card">
                {/* Photo container with top-left verified badge */}
                <div className="com-photo-wrap">
                  <Image
                    src={post.photo}
                    alt={`${post.name}'s outfit`}
                    width={480}
                    height={520}
                    className="com-photo-img"
                    priority
                  />
                  <div className={`com-verify-badge ${post.badgeType}`}>
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor">
                      <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"/>
                    </svg>
                    <span>{post.badgeText}</span>
                  </div>
                </div>

                {/* Card Body */}
                <div className="com-card-body">
                  {/* User Profile Row */}
                  <div className="com-user-row">
                    <div className="com-user-left">
                      <Image
                        src={post.avatar}
                        alt={post.name}
                        width={32}
                        height={32}
                        className="com-user-avatar"
                      />
                      <div className="com-user-details">
                        <span className="com-user-name">{post.name}</span>
                        <span className="com-user-meta">{post.meta}</span>
                      </div>
                    </div>

                    <button type="button" className="com-more-btn" title="Options">
                      <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
                        <circle cx="12" cy="12" r="2" />
                        <circle cx="19" cy="12" r="2" />
                        <circle cx="5" cy="12" r="2" />
                      </svg>
                    </button>
                  </div>

                  {/* Review Text */}
                  <p className="com-review-text">{post.review}</p>

                  {/* Product Tags */}
                  <div className="com-tags-row">
                    {post.tags.map((tag, i) => (
                      <Link key={i} href={tag.href} className="com-tag-pill">
                        {tag.label}
                      </Link>
                    ))}
                  </div>

                  {/* Engagement Row (Likes & Comments) */}
                  <div className="com-engagement-row">
                    <button
                      type="button"
                      className={`com-engage-btn ${isLiked ? "liked" : ""}`}
                      onClick={() => handleToggleLike(post.id)}
                      title={isLiked ? "Unlike" : "Like"}
                    >
                      <svg
                        width="15"
                        height="15"
                        viewBox="0 0 24 24"
                        fill={isLiked ? "#ef4444" : "none"}
                        stroke={isLiked ? "#ef4444" : "currentColor"}
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      >
                        <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" />
                      </svg>
                      <span>{currentLikes}</span>
                    </button>

                    <button type="button" className="com-engage-btn" title="Comments">
                      <svg
                        width="15"
                        height="15"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      >
                        <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
                      </svg>
                      <span>{post.comments}</span>
                    </button>
                  </div>

                  {/* Primary CTA button: Try this look on my 3D avatar */}
                  <Link href="/3d-studio" className="com-try-btn">
                    <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                      {/* Clothes Hanger icon */}
                      <path d="M12 4a3 3 0 0 1 3 3c0 1.3-.84 2.4-2 2.82V12l7 6H4l7-6V9.82C9.84 9.4 9 8.3 9 7a3 3 0 0 1 3-3z" />
                    </svg>
                    <span>Try this look on my 3D avatar</span>
                  </Link>
                </div>
              </article>
            );
          })}
        </div>
      </div>

      {/* Share Outfit Modal */}
      {shareModalOpen && (
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
          onClick={() => setShareModalOpen(false)}
        >
          <div
            style={{
              background: "#ffffff",
              borderRadius: "20px",
              padding: "28px",
              maxWidth: "460px",
              width: "100%",
              boxShadow: "0 25px 50px -12px rgba(0, 0, 0, 0.25)",
              border: "1px solid #e2e8f0",
            }}
            onClick={(e) => e.stopPropagation()}
          >
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "16px" }}>
              <h3 style={{ fontSize: "18px", fontWeight: 800, color: "#0f172a", margin: 0 }}>
                Share Your Daily Fit
              </h3>
              <button
                type="button"
                onClick={() => setShareModalOpen(false)}
                style={{
                  background: "#f1f5f9",
                  border: "none",
                  borderRadius: "50%",
                  width: "30px",
                  height: "30px",
                  cursor: "pointer",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  color: "#64748b",
                  fontWeight: "bold",
                }}
              >
                ✕
              </button>
            </div>
            <p style={{ fontSize: "13px", color: "#64748b", lineHeight: 1.5, margin: "0 0 18px 0" }}>
              Upload your unedited photo to inspire the FitVisor community. Our 3D engine will verify dimensions and match authentic garments.
            </p>
            <div
              style={{
                border: "2px dashed #cbd5e1",
                borderRadius: "14px",
                padding: "28px 16px",
                textAlign: "center",
                background: "#f8fafc",
                cursor: "pointer",
                marginBottom: "20px",
              }}
            >
              <div style={{ fontSize: "28px", marginBottom: "8px" }}>📸</div>
              <p style={{ fontSize: "13px", fontWeight: 700, color: "#1e293b", margin: "0 0 4px 0" }}>
                Drag and drop your outfit photo here
              </p>
              <p style={{ fontSize: "11px", color: "#94a3b8", margin: 0 }}>PNG, JPG or WEBP (Max 10MB)</p>
            </div>
            <button
              type="button"
              onClick={() => setShareModalOpen(false)}
              className="com-share-btn"
              style={{ width: "100%", justifyContent: "center", padding: "12px 20px", fontSize: "13px" }}
            >
              Publish to Community Feed
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
