"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import Logo from "@/components/Logo";

export default function AskFriendPage() {
  const [isAnonymous, setIsAnonymous] = useState(true);
  const [copied, setCopied] = useState(false);
  const [selectedSize, setSelectedSize] = useState<"M" | "L">("M");
  const [voteStats, setVoteStats] = useState({
    up: 10,
    down: 2,
    hasVoted: null as "up" | "down" | null,
  });
  const [commentLiked, setCommentLiked] = useState(false);
  const [likeCount, setLikeCount] = useState(4);

  const totalVotes = voteStats.up + voteStats.down;
  const upPercent = Math.round((voteStats.up / totalVotes) * 100);
  const downPercent = 100 - upPercent;

  const handleCopyLink = () => {
    if (typeof navigator !== "undefined" && navigator.clipboard) {
      navigator.clipboard.writeText("https://fitvisor.app/style/7f3a9d2e");
    }
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  const handleVote = (choice: "up" | "down") => {
    if (voteStats.hasVoted === choice) return;
    setVoteStats((prev) => {
      let newUp = prev.up;
      let newDown = prev.down;
      if (prev.hasVoted === "up") newUp--;
      if (prev.hasVoted === "down") newDown--;
      if (choice === "up") newUp++;
      if (choice === "down") newDown++;
      return { up: newUp, down: newDown, hasVoted: choice };
    });
  };

  const handleToggleLike = () => {
    if (commentLiked) {
      setCommentLiked(false);
      setLikeCount((prev) => prev - 1);
    } else {
      setCommentLiked(true);
      setLikeCount((prev) => prev + 1);
    }
  };

  return (
    <div className="ask-page-wrapper">
      <div className="ask-container">
        {/* ================= TOP HEADER BAR ================= */}
        <header className="ask-topbar">
          <div className="ask-brand-wrap">
            <Logo size="md" />
          </div>

          <div className="ask-title-block">
            <h1 className="ask-main-heading">Ask a Friend&apos;s Opiinion Before Buying</h1>
            <p className="ask-sub-heading">Get real feedback from your friends and make the perfect choice.</p>
          </div>

          <Link href="/3d-studio" className="ask-close-btn" title="Close and return to studio">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round">
              <line x1="18" y1="6" x2="6" y2="18" />
              <line x1="6" y1="6" x2="18" y2="18" />
            </svg>
          </Link>
        </header>

        {/* ================= MAIN 2-COLUMN GRID ================= */}
        <div className="ask-main-grid">
          {/* ================= LEFT COLUMN: AVATAR CARD ================= */}
          <div className="ask-stage-card">
            {/* Balmain Paris Badge */}
            <div className="ask-brand-badge">
              <span className="ask-brand-text">BALMAIN</span>
              <span className="ask-brand-sub">PARIS</span>
            </div>

            {/* Anonymous Mode Active Toggle Badge */}
            <button
              type="button"
              className="ask-anon-badge"
              onClick={() => setIsAnonymous(!isAnonymous)}
              title="Toggle Anonymous Mode"
            >
              <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M2 12s3-7 10-7 10 7 10 7-3 7-10 7-10-7-10-7Z" />
                <circle cx="12" cy="12" r="3" />
              </svg>
              <span>{isAnonymous ? "Anonymous Mode Active" : "Public Identity"}</span>
            </button>

            {/* Blurred Model on Glowing Pedestal Disc */}
            <div className="ask-stage-img-wrap">
              <Image
                src="/images/ask_friend/ask_stage_complete.png"
                alt="Balmain Double-Breasted Suit 3D Avatar"
                width={316}
                height={510}
                priority
                className="ask-stage-img"
              />
            </div>

            {/* Bottom Question Floating Bar */}
            <div className="ask-bottom-prompt">
              <div className="ask-prompt-icon">
                <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
                </svg>
              </div>
              <div className="ask-prompt-text">
                <span className="ask-prompt-sub">What do you think?</span>
                <span className="ask-prompt-main">
                  <strong
                    style={{
                      cursor: "pointer",
                      color: selectedSize === "M" ? "#2563eb" : "#0f172a",
                      textDecoration: selectedSize === "M" ? "underline" : "none",
                    }}
                    onClick={() => setSelectedSize("M")}
                  >
                    Size M
                  </strong>{" "}
                  <span>or</span>{" "}
                  <strong
                    style={{
                      cursor: "pointer",
                      color: selectedSize === "L" ? "#2563eb" : "#0f172a",
                      textDecoration: selectedSize === "L" ? "underline" : "none",
                    }}
                    onClick={() => setSelectedSize("L")}
                  >
                    Size L?
                  </strong>
                </span>
              </div>
            </div>
          </div>

          {/* ================= RIGHT COLUMN: SOCIAL SHARING & VOTING ================= */}
          <div className="ask-actions-column">
            {/* Section 1: Share Link Generator */}
            <div className="ask-card">
              <div className="ask-card-title-row">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#2563eb" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71" />
                  <path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71" />
                </svg>
                <h2 className="ask-card-title">Share Link Generator</h2>
              </div>

              <span className="ask-card-sub">
                <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <rect x="3" y="11" width="18" height="11" rx="2" ry="2" />
                  <path d="M7 11V7a5 5 0 0 1 10 0v4" />
                </svg>
                <span>Private temporary link (expires in 24 hours)</span>
              </span>

              <div className="ask-link-row">
                <div className="ask-link-input-wrap">
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71" />
                    <path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71" />
                  </svg>
                  <input
                    type="text"
                    readOnly
                    value="https://fitvisor.app/style/7f3a9d2e"
                    className="ask-link-text"
                  />
                </div>

                <button
                  type="button"
                  className="ask-copy-btn"
                  onClick={handleCopyLink}
                >
                  <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                    <rect x="9" y="9" width="13" height="13" rx="2" ry="2" />
                    <path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1" />
                  </svg>
                  <span>{copied ? "Copied! ✓" : "Copy Link"}</span>
                </button>
              </div>
            </div>

            {/* Section 2: Direct Share */}
            <div className="ask-card">
              <div className="ask-card-title-row">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#2563eb" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                  <circle cx="18" cy="5" r="3" />
                  <circle cx="6" cy="12" r="3" />
                  <circle cx="18" cy="19" r="3" />
                  <line x1="8.59" y1="13.51" x2="15.42" y2="17.49" />
                  <line x1="15.41" y1="6.51" x2="8.59" y2="10.49" />
                </svg>
                <h3 className="ask-card-title">Direct Share</h3>
              </div>

              <div className="ask-social-grid">
                {/* WhatsApp */}
                <a
                  href="https://api.whatsapp.com/send?text=Check%20my%20FitVisor%203D%20outfit:%20https://fitvisor.app/style/7f3a9d2e"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="ask-social-btn ask-social-whatsapp"
                >
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" />
                  </svg>
                  <span>WhatsApp</span>
                </a>

                {/* iMessage */}
                <a
                  href="sms:&body=Check%20my%20FitVisor%203D%20fit:%20https://fitvisor.app/style/7f3a9d2e"
                  className="ask-social-btn ask-social-imessage"
                >
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
                  </svg>
                  <span>iMessage</span>
                </a>

                {/* Instagram Stories */}
                <button
                  type="button"
                  className="ask-social-btn ask-social-instagram"
                  onClick={handleCopyLink}
                >
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                    <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
                    <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
                    <line x1="17.5" y1="6.5" x2="17.51" y2="6.5" />
                  </svg>
                  <span>Instagram Stories</span>
                </button>

                {/* Email */}
                <a
                  href="mailto:?subject=FitVisor%20Style%20Opinion&body=Hey!%20Check%20out%20my%20virtual%20try-on%20and%20let%20me%20know%20what%20you%20think:%20https://fitvisor.app/style/7f3a9d2e"
                  className="ask-social-btn ask-social-email"
                >
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                    <rect x="2" y="4" width="20" height="16" rx="2" />
                    <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" />
                  </svg>
                  <span>Email</span>
                </a>
              </div>
            </div>

            {/* Section 3: Live Votes Preview */}
            <div className="ask-card">
              <div className="ask-votes-header">
                <div className="ask-card-title-row">
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#2563eb" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                    <line x1="18" y1="20" x2="18" y2="10" />
                    <line x1="12" y1="20" x2="12" y2="4" />
                    <line x1="6" y1="20" x2="6" y2="14" />
                  </svg>
                  <h3 className="ask-card-title">Live Votes Preview</h3>
                </div>

                <span className="ask-votes-count">
                  <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" />
                    <circle cx="9" cy="7" r="4" />
                    <path d="M22 21v-2a4 4 0 0 0-3-3.87" />
                    <path d="M16 3.13a4 4 0 0 1 0 7.75" />
                  </svg>
                  <span>{totalVotes} friends have voted</span>
                </span>
              </div>

              {/* Vote Option 1: Looks Amazing */}
              <div className="ask-vote-option" onClick={() => handleVote("up")}>
                <div className="ask-vote-icon-circle up">
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M7 10v12" />
                    <path d="M15 5.88 14 10h5.83a2 2 0 0 1 1.92 2.56l-2.33 8A2 2 0 0 1 17.5 22H4a2 2 0 0 1-2-2v-8a2 2 0 0 1 2-2h2.76a2 2 0 0 0 1.79-1.11L12 2h0a3.13 3.13 0 0 1 3 3.88Z" />
                  </svg>
                </div>
                <div className="ask-vote-details">
                  <div className="ask-vote-label-row">
                    <span className="ask-vote-name">Looks Amazing ({upPercent}%)</span>
                    <span className="ask-vote-qty">{voteStats.up} votes</span>
                  </div>
                  <div className="ask-progress-bg">
                    <div className="ask-progress-fill green" style={{ width: `${upPercent}%` }} />
                  </div>
                </div>
              </div>

              {/* Vote Option 2: Try Something Else */}
              <div className="ask-vote-option" onClick={() => handleVote("down")}>
                <div className="ask-vote-icon-circle down">
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M17 14V2" />
                    <path d="M9 18.12 10 14H4.17a2 2 0 0 1-1.92-2.56l2.33-8A2 2 0 0 1 6.5 2H20a2 2 0 0 1 2 2v8a2 2 0 0 1-2 2h-2.76a2 2 0 0 0-1.79 1.11L12 22h0a3.13 3.13 0 0 1-3-3.88Z" />
                  </svg>
                </div>
                <div className="ask-vote-details">
                  <div className="ask-vote-label-row">
                    <span className="ask-vote-name" style={{ color: "#475569" }}>
                      Try Something Else ({downPercent}%)
                    </span>
                    <span className="ask-vote-qty">{voteStats.down} votes</span>
                  </div>
                  <div className="ask-progress-bg">
                    <div className="ask-progress-fill gray" style={{ width: `${downPercent}%` }} />
                  </div>
                </div>
              </div>
            </div>

            {/* Section 4: Friend Comments */}
            <div className="ask-card">
              <div className="ask-comments-header">
                <div className="ask-card-title-row">
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#2563eb" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
                  </svg>
                  <h3 className="ask-card-title">Friend Comments</h3>
                </div>

                <Link href="#all-comments" className="ask-view-all-link">
                  View All (12) &gt;
                </Link>
              </div>

              {/* Single Comment */}
              <div className="ask-comment-row">
                <Image
                  src="/images/ask_friend/sarah_avatar.png"
                  alt="Sarah M."
                  width={28}
                  height={28}
                  className="ask-comment-avatar"
                />

                <div className="ask-comment-body">
                  <span className="ask-comment-meta">
                    Sarah M. <span>2 hours ago</span>
                  </span>

                  <div className="ask-comment-bubble-wrap">
                    <div className="ask-comment-bubble">
                      Size M fits your shoulders perfectly, definitely go for it!
                    </div>

                    <button
                      type="button"
                      className="ask-comment-like"
                      onClick={handleToggleLike}
                      title="Like Comment"
                    >
                      <svg width="13" height="13" viewBox="0 0 24 24" fill={commentLiked ? "#ef4444" : "none"} stroke="#ef4444" strokeWidth="2">
                        <path d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z" />
                      </svg>
                      <span>{likeCount}</span>
                    </button>
                  </div>
                </div>
              </div>
            </div>

            {/* Bottom Primary Return Action */}
            <Link href="/3d-studio" className="ask-return-btn">
              <span>Close &amp; Return to Try-On</span>
              <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round">
                <polyline points="9 14 4 9 9 4" />
                <path d="M20 20v-7a4 4 0 0 0-4-4H4" />
              </svg>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
