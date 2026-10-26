"use client";

import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import Logo from "@/components/Logo";

export default function VerificationPage() {
  const router = useRouter();

  const poses = [
    {
      id: "front",
      label: "Front Photo",
      img: "/images/pose_front.jpg",
      score: "Verified 98%",
      metric: "Optimal Lighting",
    },
    {
      id: "side",
      label: "Side Photo",
      img: "/images/pose_side.jpg",
      score: "Verified 95%",
      metric: "Upright Posture",
    },
    {
      id: "back",
      label: "Back Photo",
      img: "/images/pose_back.jpg",
      score: "Verified 99%",
      metric: "Crisp Silhouette",
    },
  ];

  return (
    <div className="ver-page-wrapper">
      <div className="ver-card">
        {/* Top FitVisor Logo */}
        <div className="ver-logo-row">
          <Logo size="md" />
        </div>

        {/* 3-Step Completed Stepper */}
        <div className="ver-stepper">
          {poses.map((pose, idx) => (
            <div key={pose.id} className="ver-step-unit">
              <div className="ver-step-badge">
                <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="#ffffff" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
                  <polyline points="20 6 9 17 4 12" />
                </svg>
              </div>
              <span className="ver-step-label">{pose.label.replace(" Photo", " Pose")}</span>

              {idx < poses.length - 1 && <div className="ver-step-line" />}
            </div>
          ))}
        </div>

        {/* Heading */}
        <div className="ver-heading-block">
          <h1 className="ver-title">Verification of 3 Captured Poses</h1>
          <p className="ver-subtitle">
            Your photos have been analyzed and verified for quality, posture and alignment.<br />
            Here&apos;s the result:
          </p>
        </div>

        {/* 3 Verification Cards Grid */}
        <div className="ver-cards-grid">
          {poses.map((pose) => (
            <div key={pose.id} className="ver-card-item">
              {/* Photo Area with framing corner brackets */}
              <div className="ver-photo-frame">
                <div className="ver-corner ver-corner-tl" />
                <div className="ver-corner ver-corner-tr" />
                <div className="ver-corner ver-corner-bl" />
                <div className="ver-corner ver-corner-br" />

                <div className="ver-img-inner">
                  <Image
                    src={pose.img}
                    alt={pose.label}
                    width={220}
                    height={330}
                    priority
                    className="ver-pose-img"
                  />
                </div>
              </div>

              {/* Status Row */}
              <div className="ver-status-row">
                <span className="ver-check-badge">
                  <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="#ffffff" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
                    <polyline points="20 6 9 17 4 12" />
                  </svg>
                </span>
                <span className="ver-pose-title">{pose.label}</span>
              </div>

              {/* Verified Metric Box */}
              <div className="ver-metric-box">
                <span className="ver-metric-score">{pose.score}</span>
                <span className="ver-metric-sub">{pose.metric}</span>
              </div>

              {/* Retake Link */}
              <Link href="/scan" className="ver-retake-btn">
                <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M21 12a9 9 0 0 0-9-9 9.75 9.75 0 0 0-6.74 2.74L3 8" />
                  <path d="M3 3v5h5" />
                  <path d="M3 12a9 9 0 0 0 9 9 9.75 9.75 0 0 0 6.74-2.74L21 16" />
                  <path d="M16 21h5v-5" />
                </svg>
                <span>Retake this photo</span>
              </Link>
            </div>
          ))}
        </div>

        {/* Estimated Model Accuracy Banner */}
        <div className="ver-accuracy-banner">
          <div className="ver-acc-left">
            <div className="ver-acc-icon">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#ffffff" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <circle cx="12" cy="12" r="3" />
                <path d="M3 7V5a2 2 0 0 1 2-2h2" />
                <path d="M17 3h2a2 2 0 0 1 2 2v2" />
                <path d="M21 17v2a2 2 0 0 1-2 2h-2" />
                <path d="M7 21H5a2 2 0 0 1-2-2v-2" />
              </svg>
            </div>
            <span className="ver-acc-text">
              Estimated Model Accuracy: <strong>98.4%</strong> (Studio Grade)
            </span>
          </div>

          <button type="button" className="ver-info-icon" title="Studio Grade Accuracy">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#60a5fa" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <circle cx="12" cy="12" r="10" />
              <path d="M12 16v-4" />
              <path d="M12 8h.01" />
            </svg>
          </button>
        </div>

        {/* Primary CTA Button: Confirm & Generate 3D Avatar */}
        <Link href="/generating" className="ver-confirm-btn">
          <span>Confirm &amp; Generate 3D Avatar</span>
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
            <path d="M5 12h14" />
            <path d="m12 5 7 7-7 7" />
          </svg>
        </Link>

        {/* Secondary Button: Restart Full Scan */}
        <div className="ver-restart-row">
          <Link href="/scan" className="ver-restart-btn">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M21 12a9 9 0 0 0-9-9 9.75 9.75 0 0 0-6.74 2.74L3 8" />
              <path d="M3 3v5h5" />
              <path d="M3 12a9 9 0 0 0 9 9 9.75 9.75 0 0 0 6.74-2.74L21 16" />
              <path d="M16 21h5v-5" />
            </svg>
            <span>Restart Full Scan</span>
          </Link>
        </div>
      </div>
    </div>
  );
}
