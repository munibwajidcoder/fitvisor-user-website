"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";

export default function ScanPage() {
  const router = useRouter();

  // Pose steps: 0 = Front Pose, 1 = Side Pose, 2 = Back Pose
  const [currentPose, setCurrentPose] = useState<number>(0);
  const [countdown, setCountdown] = useState<number | null>(null);
  const [voiceGuidance, setVoiceGuidance] = useState<boolean>(true);
  const [cameraFacing, setCameraFacing] = useState<"user" | "environment">("user");
  const [flash, setFlash] = useState<boolean>(false);

  const poses = [
    { id: 0, label: "Front Pose", instructions: "Arms slightly spread at 45°, feet aligned" },
    { id: 1, label: "Side Pose", instructions: "Stand straight, arms resting naturally at sides" },
    { id: 2, label: "Back Pose", instructions: "Facing away, same stance as front pose" },
  ];

  // Countdown timer logic for camera capture
  const handleCapture = () => {
    if (countdown !== null) return;
    setCountdown(3);
  };

  useEffect(() => {
    if (countdown === null) return;

    if (countdown > 0) {
      const timer = setTimeout(() => {
        setCountdown((prev) => (prev !== null ? prev - 1 : null));
      }, 1000);
      return () => clearTimeout(timer);
    } else if (countdown === 0) {
      // Flash effect
      setFlash(true);
      setTimeout(() => setFlash(false), 300);

      const nextPose = currentPose + 1;
      if (nextPose < poses.length) {
        setCurrentPose(nextPose);
        setCountdown(null);
      } else {
        // All 3 poses done! Navigate to Fine-tune measurements screen
        setTimeout(() => {
          router.push("/verification");
        }, 600);
      }
    }
  }, [countdown, currentPose, router, poses.length]);

  return (
    <div className="sc-viewport">
      {/* Flash overlay on photo snap */}
      {flash && <div className="sc-flash-overlay" />}

      {/* Camera Live Background Simulation */}
      <div className="sc-camera-bg">
        <Image
          src="/images/scanner_room_bg.jpg"
          alt="Room Camera Feed"
          fill
          priority
          className="sc-camera-feed-img"
        />
        <div className="sc-camera-dark-scrim" />
      </div>

      {/* ================= TOP NAVIGATION BAR ================= */}
      <header className="sc-topbar">
        {/* Left: FitVisor Logo */}
        <Link href="/" className="sc-logo-link">
          <svg width="28" height="28" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
            <rect width="32" height="32" rx="8" fill="#1e293b" />
            <path d="M7 8h18M9 13h14M12 18h8M15 23h2" stroke="#f04b55" strokeWidth="2.8" strokeLinecap="round" />
            <path d="M16 8v16" stroke="#ffffff" strokeWidth="2" strokeLinecap="round" />
          </svg>
          <span className="sc-logo-text">
            Fit<span className="sc-logo-accent">Visor</span>
          </span>
        </Link>

        {/* Center: 3-Pose Stepper */}
        <div className="sc-pose-stepper">
          {poses.map((pose, idx) => {
            const isActive = currentPose === idx;
            const isCompleted = currentPose > idx;

            return (
              <div key={pose.id} className="sc-step-wrapper">
                <button
                  type="button"
                  onClick={() => setCurrentPose(idx)}
                  className={`sc-step-node ${isActive ? "active" : ""} ${isCompleted ? "completed" : ""}`}
                >
                  <div className="sc-step-indicator">
                    {isActive ? (
                      <span className="sc-active-dot" />
                    ) : isCompleted ? (
                      <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="#ffffff" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
                        <polyline points="20 6 9 17 4 12" />
                      </svg>
                    ) : null}
                  </div>
                  <span className={`sc-step-text ${isActive ? "active" : ""}`}>{pose.label}</span>
                </button>

                {idx < poses.length - 1 && (
                  <div className={`sc-step-connector ${isCompleted ? "completed" : ""}`} />
                )}
              </div>
            );
          })}
        </div>

        {/* Right: Distance Guidance Pill Banner */}
        <div className="sc-distance-pill">
          <div className="sc-dist-icon">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#93c5fd" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <circle cx="12" cy="5" r="2.5" />
              <path d="m5 10 7 2 7-2" />
              <path d="m8 12 1 9" />
              <path d="m16 12-1 9" />
              <path d="M4 6h1" />
              <path d="M19 6h1" />
            </svg>
          </div>
          <div className="sc-dist-content">
            <span className="sc-dist-line1">Step back 2 meters</span>
            <span className="sc-dist-line2">to fit inside the frame</span>
          </div>
        </div>
      </header>

      {/* ================= MAIN SCANNER VIEWFINDER ================= */}
      <main className="sc-viewfinder-stage">
        {/* Active Countdown Big Overlay */}
        {countdown !== null && countdown > 0 && (
          <div className="sc-countdown-popup">
            <span className="sc-countdown-number">{countdown}</span>
            <span className="sc-countdown-sub">Hold pose still...</span>
          </div>
        )}

        {/* Framing Bounding Box */}
        <div className="sc-bounding-box">
          {/* 4 Corner Bracket Accents */}
          <div className="sc-corner sc-corner-tl" />
          <div className="sc-corner sc-corner-tr" />
          <div className="sc-corner sc-corner-bl" />
          <div className="sc-corner sc-corner-br" />

          {/* Grid Alignment Axis Guidelines */}
          <div className="sc-vertical-axis" />
          <div className="sc-horiz-guide sc-guide-shoulders" />
          <div className="sc-horiz-guide sc-guide-waist" />
          <div className="sc-horiz-guide sc-guide-knees" />

          {/* 3D Holographic Wireframe Avatar Overlay */}
          <div className="sc-hologram-wrap">
            <Image
              src="/images/wireframe_body.jpg"
              alt="3D Holographic Wireframe Guide"
              width={420}
              height={630}
              priority
              className="sc-hologram-img"
            />

            {/* Glowing Floor Concentric Target Rings */}
            <svg className="sc-floor-radar" viewBox="0 0 320 80" fill="none">
              <ellipse cx="160" cy="40" rx="140" ry="24" stroke="#38bdf8" strokeWidth="1.5" strokeDasharray="3 3" opacity="0.85" />
              <ellipse cx="160" cy="40" rx="100" ry="17" stroke="#38bdf8" strokeWidth="1.2" opacity="0.9" />
              <ellipse cx="160" cy="40" rx="60" ry="10" stroke="#60a5fa" strokeWidth="1" strokeDasharray="2 2" opacity="0.6" />
              <line x1="160" y1="12" x2="160" y2="68" stroke="#38bdf8" strokeWidth="1" opacity="0.75" />
              <line x1="20" y1="40" x2="300" y2="40" stroke="#38bdf8" strokeWidth="1" opacity="0.75" />
            </svg>
          </div>
        </div>
      </main>

      {/* ================= BOTTOM CONTROLS DOCK ================= */}
      <footer className="sc-bottom-dock">
        <div className="sc-dock-inner">
          {/* Control 1: Flip Camera */}
          <button
            type="button"
            className="sc-dock-btn"
            onClick={() => setCameraFacing((prev) => (prev === "user" ? "environment" : "user"))}
          >
            <div className="sc-btn-circle">
              <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#cbd5e1" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M20 10c0-4.418-3.582-8-8-8s-8 3.582-8 8" />
                <path d="M4 6v4h4" />
                <path d="M4 14c0 4.418 3.582 8 8 8s8-3.582 8-8" />
                <path d="M20 18v-4h-4" />
                <rect width="8" height="6" x="8" y="9" rx="1" stroke="#94a3b8" />
              </svg>
            </div>
            <span className="sc-btn-label">Flip Camera</span>
          </button>

          {/* Control 2: Main Camera Shutter Trigger with Countdown Badge */}
          <div className="sc-shutter-container">
            <button
              type="button"
              className={`sc-shutter-outer ${countdown !== null ? "counting" : ""}`}
              onClick={handleCapture}
            >
              <div className="sc-shutter-inner">
                <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="#ffffff" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M23 19a2 2 0 0 1-2 2H3a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h4l2-3h6l2 3h4a2 2 0 0 1 2 2z" />
                  <circle cx="12" cy="13" r="4" />
                </svg>
              </div>
            </button>
            <div className="sc-shutter-timer-badge">
              <span>{countdown !== null && countdown > 0 ? `${countdown}s` : "3s"}</span>
            </div>
          </div>

          <div className="sc-dock-separator" />

          {/* Control 3: Upload Photos Option */}
          <Link href="/measurements" className="sc-upload-option">
            <div className="sc-upload-icon-circle">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#94a3b8" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M4 14.899A7 7 0 1 1 15.71 8h1.79a4.5 4.5 0 0 1 2.5 8.242" />
                <path d="M12 12v9" />
                <path d="m16 16-4-4-4 4" />
              </svg>
            </div>
            <div className="sc-upload-text">
              <span>Or upload <strong>3 photos</strong></span>
              <span className="sc-upload-sub">from your computer &rarr;</span>
            </div>
          </Link>

          {/* Control 4: Voice Guidance Toggle */}
          <button
            type="button"
            className="sc-voice-pill"
            onClick={() => setVoiceGuidance(!voiceGuidance)}
          >
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke={voiceGuidance ? "#2dd4bf" : "#94a3b8"} strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M12 2a3 3 0 0 0-3 3v7a3 3 0 0 0 6 0V5a3 3 0 0 0-3-3Z" />
              <path d="M19 10v2a7 7 0 0 1-14 0v-2" />
              <line x1="12" x2="12" y1="19" y2="22" />
            </svg>
            <span className="sc-voice-label">Voice Guidance: {voiceGuidance ? "On" : "Off"}</span>
            <div className={`sc-toggle-switch ${voiceGuidance ? "on" : "off"}`}>
              <div className="sc-toggle-knob" />
            </div>
          </button>
        </div>
      </footer>
    </div>
  );
}
