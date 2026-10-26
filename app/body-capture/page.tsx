"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";

const translations = {
  EN: {
    account: "Account",
    privacy: "Privacy & Anonymity",
    bodyCapture: "Body Capture",
    title: "Prepare Your 3D Scan in 3 Simple Poses",
    subtitle: "Follow the poses below and make sure you're in a well-lit space for the most accurate results.",
    poses: [
      {
        num: 1,
        label: "Pose 1: Front",
        desc: "Arms slightly spread at 45°, feet aligned with shoulders.",
        img: "/images/pose_front.jpg",
        type: "front",
      },
      {
        num: 2,
        label: "Pose 2: Profile",
        desc: "Arms resting naturally at sides, standing straight.",
        img: "/images/pose_side.jpg",
        type: "profile",
      },
      {
        num: 3,
        label: "Pose 3: Back",
        desc: "Same stance as front, head upright.",
        img: "/images/pose_back.jpg",
        type: "back",
      },
    ],
    helpfulTips: "Helpful Tips",
    tip1: "Wear fitted clothing (tight t-shirt, leggings, or activewear).",
    tip2: "Ensure even front lighting and position your device at waist height.",
    chooseDevice: "Choose Your Device",
    chooseDeviceSub: "Use your webcam or scan with your smartphone for a seamless experience.",
    useWebcam: "Use this device camera",
    useWebcamSub: "Webcam / Live browser camera",
    scanMobile: "Scan with your smartphone",
    scanMobileSub: "Open camera on mobile for a seamless hand-off.",
    startBtn: "Start Camera Capture",
    manualBtn: "Enter Measurements Manually",
    securityText: "Your data is encrypted and protected. GDPR compliant.",
  },
  FR: {
    account: "Compte",
    privacy: "Confidentialité & Anonymat",
    bodyCapture: "Capture Corporelle",
    title: "Préparez votre scan 3D en 3 postures simples",
    subtitle: "Suivez les postures ci-dessous et veillez à être dans un espace bien éclairé pour des résultats optimaux.",
    poses: [
      {
        num: 1,
        label: "Posture 1 : Face",
        desc: "Bras légèrement écartés à 45°, pieds alignés avec les épaules.",
        img: "/images/pose_front.jpg",
        type: "front",
      },
      {
        num: 2,
        label: "Posture 2 : Profil",
        desc: "Bras le long du corps, posture bien droite.",
        img: "/images/pose_side.jpg",
        type: "profile",
      },
      {
        num: 3,
        label: "Posture 3 : Dos",
        desc: "Même posture que de face, tête bien droite.",
        img: "/images/pose_back.jpg",
        type: "back",
      },
    ],
    helpfulTips: "Conseils Utiles",
    tip1: "Portez des vêtements près du corps (t-shirt ajusté, leggings ou tenue de sport).",
    tip2: "Assurez un éclairage frontal homogène et placez l'appareil à hauteur de taille.",
    chooseDevice: "Choisissez votre appareil",
    chooseDeviceSub: "Utilisez votre webcam ou scannez avec votre smartphone pour une expérience fluide.",
    useWebcam: "Utiliser la caméra de cet appareil",
    useWebcamSub: "Webcam / Caméra du navigateur en direct",
    scanMobile: "Scanner avec votre smartphone",
    scanMobileSub: "Ouvrez l'appareil photo sur mobile pour une transition fluide.",
    startBtn: "Démarrer la capture caméra",
    manualBtn: "Saisir les mesures manuellement",
    securityText: "Vos données sont chiffrées et protégées. Conforme RGPD.",
  },
};

export default function BodyCapturePage() {
  const router = useRouter();
  const [selectedDevice, setSelectedDevice] = useState<"webcam" | "mobile">("webcam");
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

  const t = translations[lang];

  return (
    <div className="bc-page-wrapper">
      {/* Top Right Language Switch */}
      <div className="login-lang-switch">
        <button
          type="button"
          id="bc-lang-btn-en"
          onClick={() => changeLang("EN")}
          className={`lang-btn ${lang === "EN" ? "active" : ""}`}
        >
          EN
        </button>
        <span className="lang-pipe">|</span>
        <button
          type="button"
          id="bc-lang-btn-fr"
          onClick={() => changeLang("FR")}
          className={`lang-btn ${lang === "FR" ? "active" : ""}`}
        >
          FR
        </button>
      </div>

      <div className="bc-card">
        {/* Official FitVisor Logo */}
        <div className="bc-logo-row">
          <Link href="/" title="FitVisor Home">
            <Image
              src="/images/fitvisor_logo_square.png"
              alt="FitVisor"
              width={120}
              height={120}
              priority
              className="register-logo-img"
            />
          </Link>
        </div>

        {/* Wizard Steps with Green Completed Checkmarks */}
        <div className="wizard-steps-row">
          {/* Step 1: Account (Completed -> Green) */}
          <Link href="/register" className="wizard-step-item" style={{ textDecoration: "none" }}>
            <div className="step-circle completed">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#ffffff" strokeWidth="2.8" strokeLinecap="round" strokeLinejoin="round">
                <polyline points="20 6 9 17 4 12" />
              </svg>
            </div>
            <span className="step-label">{t.account}</span>
          </Link>

          <div className="step-connector-line completed" />

          {/* Step 2: Privacy & Anonymity (Completed -> Green) */}
          <Link href="/privacy" className="wizard-step-item" style={{ textDecoration: "none" }}>
            <div className="step-circle completed">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#ffffff" strokeWidth="2.8" strokeLinecap="round" strokeLinejoin="round">
                <polyline points="20 6 9 17 4 12" />
              </svg>
            </div>
            <span className="step-label">{t.privacy}</span>
          </Link>

          <div className="step-connector-line completed" />

          {/* Step 3: Body Capture (Active -> Coral) */}
          <div className="wizard-step-item active">
            <div className="step-circle active">3</div>
            <span className="step-label active">{t.bodyCapture}</span>
          </div>
        </div>

        {/* Heading */}
        <div className="bc-heading-block">
          <h1 className="bc-title">{t.title}</h1>
          <p className="bc-subtitle">{t.subtitle}</p>
        </div>

        {/* 3 Pose Cards Grid */}
        <div className="bc-poses-grid">
          {t.poses.map((pose) => (
            <div key={pose.num} className="bc-pose-card">
              {/* Header */}
              <div className="bc-pose-header">
                <span className="bc-pose-num-badge">{pose.num}</span>
                <div className="bc-pose-header-text">
                  <span className="bc-pose-label">{pose.label}</span>
                  <p className="bc-pose-desc">{pose.desc}</p>
                </div>
              </div>

              {/* Image Container with fixed height and overlay */}
              <div className="bc-pose-img-wrap">
                <div className="bc-pose-img-inner">
                  <Image
                    src={pose.img}
                    alt={pose.label}
                    width={280}
                    height={420}
                    priority
                    className="bc-pose-actual-img"
                  />
                </div>

                {/* Overlays matching reference */}
                {pose.type === "front" && (
                  <svg className="bc-pose-overlay" viewBox="0 0 220 280" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <ellipse cx="110" cy="258" rx="80" ry="14" stroke="#93c5fd" strokeWidth="1.2" strokeDasharray="3 3" opacity="0.8" />
                    <ellipse cx="110" cy="258" rx="55" ry="9" stroke="#93c5fd" strokeWidth="1" strokeDasharray="2 2" opacity="0.6" />
                    <path d="M 46 175 C 44 195 55 215 75 228" stroke="#3b82f6" strokeWidth="1.2" strokeDasharray="3 3" opacity="0.85" />
                    <text x="36" y="200" fill="#2563eb" fontSize="10.5" fontWeight="700" fontFamily="sans-serif">45°</text>
                    <path d="M 174 175 C 176 195 165 215 145 228" stroke="#3b82f6" strokeWidth="1.2" strokeDasharray="3 3" opacity="0.85" />
                    <text x="172" y="200" fill="#2563eb" fontSize="10.5" fontWeight="700" fontFamily="sans-serif">45°</text>
                  </svg>
                )}

                {pose.type === "profile" && (
                  <svg className="bc-pose-overlay" viewBox="0 0 220 280" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <ellipse cx="110" cy="258" rx="65" ry="12" stroke="#93c5fd" strokeWidth="1.2" opacity="0.75" />
                    <ellipse cx="110" cy="258" rx="42" ry="7" stroke="#93c5fd" strokeWidth="0.9" strokeDasharray="2 2" opacity="0.5" />
                    <line x1="60" y1="110" x2="60" y2="258" stroke="#bfdbfe" strokeWidth="0.8" strokeDasharray="3 3" opacity="0.6" />
                    <line x1="160" y1="110" x2="160" y2="258" stroke="#bfdbfe" strokeWidth="0.8" strokeDasharray="3 3" opacity="0.6" />
                  </svg>
                )}

                {pose.type === "back" && (
                  <svg className="bc-pose-overlay" viewBox="0 0 220 280" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <ellipse cx="110" cy="258" rx="80" ry="14" stroke="#93c5fd" strokeWidth="1.2" strokeDasharray="3 3" opacity="0.8" />
                    <ellipse cx="110" cy="258" rx="55" ry="9" stroke="#93c5fd" strokeWidth="1" strokeDasharray="2 2" opacity="0.6" />
                    <path d="M 46 175 C 44 195 55 215 75 228" stroke="#3b82f6" strokeWidth="1.2" strokeDasharray="3 3" opacity="0.85" />
                    <text x="36" y="200" fill="#2563eb" fontSize="10.5" fontWeight="700" fontFamily="sans-serif">45°</text>
                    <path d="M 174 175 C 176 195 165 215 145 228" stroke="#3b82f6" strokeWidth="1.2" strokeDasharray="3 3" opacity="0.85" />
                    <text x="172" y="200" fill="#2563eb" fontSize="10.5" fontWeight="700" fontFamily="sans-serif">45°</text>
                  </svg>
                )}
              </div>
            </div>
          ))}
        </div>

        {/* Helpful Tips Banner */}
        <div className="bc-tips-banner">
          <div className="bc-tips-left">
            <div className="bc-tips-icon-wrap">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#ffffff" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M9 18h6" />
                <path d="M10 22h4" />
                <path d="M12 2a7 7 0 0 0-7 7c0 2.5 1.5 4.5 3 6h8c1.5-1.5 3-3.5 3-6a7 7 0 0 0-7-7z" />
              </svg>
            </div>
            <span className="bc-tips-title">{t.helpfulTips}</span>
          </div>

          <div className="bc-tips-divider" />

          <div className="bc-tips-right">
            <div className="bc-tips-item">
              <span className="bc-check-icon">
                <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="#2563eb" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
                  <polyline points="20 6 9 17 4 12" />
                </svg>
              </span>
              <span>{t.tip1}</span>
            </div>
            <div className="bc-tips-item">
              <span className="bc-check-icon">
                <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="#2563eb" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
                  <polyline points="20 6 9 17 4 12" />
                </svg>
              </span>
              <span>{t.tip2}</span>
            </div>
          </div>
        </div>

        {/* Choose Your Device Section */}
        <div className="bc-device-section">
          <h2 className="bc-device-heading">{t.chooseDevice}</h2>
          <p className="bc-device-subtitle">{t.chooseDeviceSub}</p>

          <div className="bc-device-cards">
            {/* Webcam Option */}
            <button
              type="button"
              className={`bc-device-card ${selectedDevice === "webcam" ? "selected" : ""}`}
              onClick={() => setSelectedDevice("webcam")}
            >
              <div className="bc-device-icon">
                <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#1e293b" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <circle cx="12" cy="10" r="4" />
                  <path d="M5 20a7 7 0 0 1 14 0" />
                  <circle cx="12" cy="10" r="1.5" fill="#1e293b" />
                </svg>
              </div>
              <div className="bc-device-text">
                <span className="bc-device-name">{t.useWebcam}</span>
                <span className="bc-device-sub">{t.useWebcamSub}</span>
              </div>
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#1e293b" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="bc-device-arrow">
                <path d="M5 12h14" />
                <path d="m12 5 7 7-7 7" />
              </svg>
            </button>

            {/* Mobile QR Option */}
            <button
              type="button"
              className={`bc-device-card ${selectedDevice === "mobile" ? "selected" : ""}`}
              onClick={() => setSelectedDevice("mobile")}
            >
              <div className="bc-device-icon">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#1e293b" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <rect width="14" height="20" x="5" y="2" rx="2" ry="2" />
                  <path d="M12 18h.01" />
                </svg>
              </div>
              <div className="bc-device-text">
                <span className="bc-device-name">{t.scanMobile}</span>
                <span className="bc-device-sub">{t.scanMobileSub}</span>
              </div>
              {/* Crisp QR Code Graphic */}
              <div className="bc-qr-box">
                <svg width="44" height="44" viewBox="0 0 44 44" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <rect x="2" y="2" width="16" height="16" rx="2" fill="none" stroke="#1e293b" strokeWidth="2"/>
                  <rect x="5.5" y="5.5" width="9" height="9" fill="#1e293b"/>
                  
                  <rect x="26" y="2" width="16" height="16" rx="2" fill="none" stroke="#1e293b" strokeWidth="2"/>
                  <rect x="29.5" y="5.5" width="9" height="9" fill="#1e293b"/>
                  
                  <rect x="2" y="26" width="16" height="16" rx="2" fill="none" stroke="#1e293b" strokeWidth="2"/>
                  <rect x="5.5" y="29.5" width="9" height="9" fill="#1e293b"/>

                  <rect x="21" y="2" width="3" height="3" fill="#1e293b"/>
                  <rect x="21" y="8" width="3" height="3" fill="#1e293b"/>
                  <rect x="21" y="14" width="3" height="3" fill="#1e293b"/>
                  <rect x="2" y="21" width="3" height="3" fill="#1e293b"/>
                  <rect x="8" y="21" width="3" height="3" fill="#1e293b"/>
                  <rect x="14" y="21" width="3" height="3" fill="#1e293b"/>
                  <rect x="21" y="21" width="3" height="3" fill="#1e293b"/>
                  <rect x="26" y="21" width="3" height="3" fill="#1e293b"/>
                  <rect x="32" y="21" width="3" height="3" fill="#1e293b"/>
                  <rect x="38" y="21" width="3" height="3" fill="#1e293b"/>
                  <rect x="21" y="26" width="3" height="3" fill="#1e293b"/>
                  <rect x="26" y="26" width="3" height="3" fill="#1e293b"/>
                  <rect x="34" y="26" width="3" height="3" fill="#1e293b"/>
                  <rect x="26" y="32" width="3" height="3" fill="#1e293b"/>
                  <rect x="32" y="32" width="3" height="3" fill="#1e293b"/>
                  <rect x="38" y="32" width="3" height="3" fill="#1e293b"/>
                  <rect x="21" y="38" width="3" height="3" fill="#1e293b"/>
                  <rect x="28" y="38" width="3" height="3" fill="#1e293b"/>
                  <rect x="36" y="38" width="3" height="3" fill="#1e293b"/>
                </svg>
              </div>
            </button>
          </div>
        </div>

        {/* Start Camera Capture CTA Button */}
        <Link href="/scan" className="bc-start-btn">
          <span>{t.startBtn}</span>
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
            <path d="M5 12h14" />
            <path d="m12 5 7 7-7 7" />
          </svg>
        </Link>

        {/* Enter Measurements Manually */}
        <Link href="/measurements" className="bc-manual-btn">
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M21.3 8.7 8.7 21.3c-.4.4-1 .4-1.4 0l-4.6-4.6c-.4-.4-.4-1 0-1.4L15.3 2.7c.4-.4 1-.4 1.4 0l4.6 4.6c.4.4.4 1 0 1.4Z"/>
            <path d="m14.5 3.5 2 2"/>
            <path d="m11.5 6.5 2 2"/>
            <path d="m8.5 9.5 2 2"/>
            <path d="m5.5 12.5 2 2"/>
          </svg>
          <span>{t.manualBtn}</span>
        </Link>

        {/* Security Footer */}
        <div className="bc-security-footer">
          <div className="bc-sec-line" />
          <div className="bc-security-badge">
            <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="#94a3b8" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <rect width="18" height="11" x="3" y="11" rx="2" ry="2" />
              <path d="M7 11V7a5 5 0 0 1 10 0v4" />
            </svg>
            <span>{t.securityText}</span>
          </div>
          <div className="bc-sec-line" />
        </div>
      </div>
    </div>
  );
}
