"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";

const translations = {
  EN: {
    title: "Fine-tune your measurements",
    optional: "(Optional)",
    infoText: "Adjusting these sliders refines the 3D model if your scan clothes were slightly loose.",
    totalHeight: "Total Height / Stature",
    totalHeightShort: "Total Height",
    shoulderWidth: "Shoulder Width",
    chestGirth: "Bust / Chest Girth",
    waistGirth: "Waist Girth",
    hipsGirth: "Hips Girth",
    inseamLength: "Inseam Length",
    launchBtn: "Continue to Body Scan",
  },
  FR: {
    title: "Ajustez vos mesures avec précision",
    optional: "(Facultatif)",
    infoText: "L'ajustement de ces curseurs affine le modèle 3D si vos vêtements lors du scan étaient amples.",
    totalHeight: "Taille totale / Stature",
    totalHeightShort: "Taille totale",
    shoulderWidth: "Largeur des épaules",
    chestGirth: "Tour de poitrine / Buste",
    waistGirth: "Tour de taille",
    hipsGirth: "Tour de hanches",
    inseamLength: "Longueur d'entrejambe",
    launchBtn: "Continuer vers le scan corporel",
  },
};

export default function MeasurementsPage() {
  const router = useRouter();
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

  // State for all 6 measurements
  const [measurements, setMeasurements] = useState({
    height: 174,
    shoulder: 43,
    chest: 92,
    waist: 74,
    hips: 98,
    inseam: 81,
  });

  const [activeMeasurement, setActiveMeasurement] = useState<string | null>(null);

  const handleSliderChange = (id: string, value: number) => {
    setMeasurements((prev) => ({
      ...prev,
      [id]: value,
    }));
  };

  const handleLaunch = () => {
    router.push("/body-capture");
  };

  return (
    <div className="ft-page-wrapper">
      {/* Top Right Language Switch */}
      <div className="login-lang-switch">
        <button
          type="button"
          id="ms-lang-btn-en"
          onClick={() => changeLang("EN")}
          className={`lang-btn ${lang === "EN" ? "active" : ""}`}
        >
          EN
        </button>
        <span className="lang-pipe">|</span>
        <button
          type="button"
          id="ms-lang-btn-fr"
          onClick={() => changeLang("FR")}
          className={`lang-btn ${lang === "FR" ? "active" : ""}`}
        >
          FR
        </button>
      </div>

      <div className="ft-card">
        {/* ================= LEFT COLUMN: 3D MANNEQUIN & CALLOUTS ================= */}
        <div className="ft-left-col">
          {/* Official FitVisor Logo */}
          <div className="ft-logo">
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

          {/* Mannequin Interactive Stage */}
          <div className="ft-stage-container">
            {/* Total Height Left Bracket */}
            <div className="ft-height-bracket">
              <div className="ft-height-arrow-top" />
              <div className="ft-height-line" />
              <div className="ft-height-label-box">
                <span className="ft-height-title">{t.totalHeightShort}</span>
                <span className="ft-height-value">{measurements.height} cm</span>
              </div>
              <div className="ft-height-arrow-bottom" />
            </div>

            {/* Mannequin Image */}
            <div className="ft-mannequin-wrap">
              <Image
                src="/images/mannequin_body.jpg"
                alt="3D Body Model"
                width={380}
                height={570}
                priority
                className="ft-mannequin-img"
              />

              {/* Perspective Ground Pedestal Disc */}
              <svg className="ft-pedestal-svg" viewBox="0 0 380 60" fill="none">
                <ellipse cx="190" cy="30" rx="160" ry="24" stroke="#e2e8f0" strokeWidth="1.5" />
                <ellipse cx="190" cy="30" rx="110" ry="16" stroke="#e2e8f0" strokeWidth="1" strokeDasharray="3 3" />
                <ellipse cx="190" cy="30" rx="60" ry="9" stroke="#cbd5e1" strokeWidth="1" />
              </svg>

              {/* SVG Measurement Overlay connecting lines and anchor dots */}
              <svg className="ft-overlay-svg" viewBox="0 0 380 570" fill="none">
                {/* 1. Shoulder Width */}
                <line x1="140" y1="146" x2="240" y2="146" stroke="#f87171" strokeWidth="1.5" opacity="0.9" />
                <circle cx="140" cy="146" r="4.5" fill="#ffffff" stroke="#ef4444" strokeWidth="3" />
                <circle cx="240" cy="146" r="4.5" fill="#ffffff" stroke="#ef4444" strokeWidth="3" />
                <path d="M 240 146 L 275 146 L 290 125 L 305 125" stroke="#fca5a5" strokeWidth="1.5" strokeDasharray="2 2" fill="none" />

                {/* 2. Bust / Chest Girth */}
                <circle cx="190" cy="180" r="4.5" fill="#ffffff" stroke="#ef4444" strokeWidth="3" />
                <path d="M 190 180 L 270 176 L 305 176" stroke="#fca5a5" strokeWidth="1.5" strokeDasharray="2 2" fill="none" />

                {/* 3. Waist Girth */}
                <circle cx="190" cy="228" r="4.5" fill="#ffffff" stroke="#ef4444" strokeWidth="3" />
                <path d="M 190 228 L 275 228 L 305 228" stroke="#fca5a5" strokeWidth="1.5" strokeDasharray="2 2" fill="none" />

                {/* 4. Hips Girth */}
                <line x1="145" y1="276" x2="235" y2="276" stroke="#f87171" strokeWidth="1.5" opacity="0.9" />
                <circle cx="145" cy="276" r="4.5" fill="#ffffff" stroke="#ef4444" strokeWidth="3" />
                <circle cx="235" cy="276" r="4.5" fill="#ffffff" stroke="#ef4444" strokeWidth="3" />
                <path d="M 235 276 L 275 276 L 295 284 L 305 284" stroke="#fca5a5" strokeWidth="1.5" strokeDasharray="2 2" fill="none" />

                {/* 5. Inseam Length */}
                <circle cx="190" cy="342" r="4.5" fill="#ffffff" stroke="#ef4444" strokeWidth="3" />
                <line x1="190" y1="342" x2="190" y2="450" stroke="#f87171" strokeWidth="1.5" strokeDasharray="3 3" />
                <circle cx="190" cy="450" r="4.5" fill="#ffffff" stroke="#ef4444" strokeWidth="3" />
                <path d="M 190 398 L 250 398 L 280 380 L 305 380" stroke="#fca5a5" strokeWidth="1.5" strokeDasharray="2 2" fill="none" />
              </svg>

              {/* Measurement Callout Badges on Right Side of Body */}
              <div className={`ft-callout-badge ft-badge-shoulder ${activeMeasurement === "shoulder" ? "highlight" : ""}`}>
                <span className="ft-callout-icon">
                  <span className="ft-callout-dot" />
                </span>
                <div className="ft-callout-info">
                  <span className="ft-callout-label">{t.shoulderWidth}</span>
                  <span className="ft-callout-val">{measurements.shoulder} cm</span>
                </div>
              </div>

              <div className={`ft-callout-badge ft-badge-chest ${activeMeasurement === "chest" ? "highlight" : ""}`}>
                <span className="ft-callout-icon">
                  <span className="ft-callout-dot" />
                </span>
                <div className="ft-callout-info">
                  <span className="ft-callout-label">{t.chestGirth}</span>
                  <span className="ft-callout-val">{measurements.chest} cm</span>
                </div>
              </div>

              <div className={`ft-callout-badge ft-badge-waist ${activeMeasurement === "waist" ? "highlight" : ""}`}>
                <span className="ft-callout-icon">
                  <span className="ft-callout-dot" />
                </span>
                <div className="ft-callout-info">
                  <span className="ft-callout-label">{t.waistGirth}</span>
                  <span className="ft-callout-val">{measurements.waist} cm</span>
                </div>
              </div>

              <div className={`ft-callout-badge ft-badge-hips ${activeMeasurement === "hips" ? "highlight" : ""}`}>
                <span className="ft-callout-icon">
                  <span className="ft-callout-dot" />
                </span>
                <div className="ft-callout-info">
                  <span className="ft-callout-label">{t.hipsGirth}</span>
                  <span className="ft-callout-val">{measurements.hips} cm</span>
                </div>
              </div>

              <div className={`ft-callout-badge ft-badge-inseam ${activeMeasurement === "inseam" ? "highlight" : ""}`}>
                <span className="ft-callout-icon">
                  <span className="ft-callout-dot" />
                </span>
                <div className="ft-callout-info">
                  <span className="ft-callout-label">{t.inseamLength}</span>
                  <span className="ft-callout-val">{measurements.inseam} cm</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* ================= RIGHT COLUMN: SLIDERS & ACTION ================= */}
        <div className="ft-right-col">
          {/* Header Title */}
          <div className="ft-header-block">
            <h1 className="ft-title">
              {t.title} <span className="ft-optional">{t.optional}</span>
            </h1>
          </div>

          {/* Info Banner */}
          <div className="ft-info-banner">
            <div className="ft-info-icon">
              <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="#2563eb" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <circle cx="12" cy="12" r="10" />
                <path d="M12 16v-4" />
                <path d="M12 8h.01" />
              </svg>
            </div>
            <p className="ft-info-text">{t.infoText}</p>
          </div>

          {/* Sliders Container Card */}
          <div className="ft-sliders-card">
            {/* 1. Total Height / Stature */}
            <div
              className={`ft-slider-row ${activeMeasurement === "height" ? "active" : ""}`}
              onMouseEnter={() => setActiveMeasurement("height")}
              onMouseLeave={() => setActiveMeasurement(null)}
            >
              <div className="ft-slider-top">
                <div className="ft-slider-label-group">
                  <div className="ft-item-icon">
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#1e3a8a" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <circle cx="12" cy="4" r="2" />
                      <path d="m9 10 3-1 3 1v5l-3 1-3-1z" />
                      <path d="M10 16v5" />
                      <path d="M14 16v5" />
                      <path d="M4 3v18" />
                      <path d="M2 3h4" />
                      <path d="M2 21h4" />
                    </svg>
                  </div>
                  <span className="ft-slider-name">{t.totalHeight}</span>
                </div>
                <div className="ft-val-pill">{measurements.height} cm</div>
              </div>

              <div className="ft-slider-track-wrap">
                <input
                  type="range"
                  min={140}
                  max={210}
                  value={measurements.height}
                  onChange={(e) => handleSliderChange("height", Number(e.target.value))}
                  className="ft-range-input"
                  style={{
                    background: `linear-gradient(to right, #1e3a8a 0%, #1e3a8a ${((measurements.height - 140) / (210 - 140)) * 100}%, #e2e8f0 ${((measurements.height - 140) / (210 - 140)) * 100}%, #e2e8f0 100%)`,
                  }}
                />
                <div className="ft-slider-bounds">
                  <span>140 cm</span>
                  <span>210 cm</span>
                </div>
              </div>
            </div>

            {/* 2. Shoulder Width */}
            <div
              className={`ft-slider-row ${activeMeasurement === "shoulder" ? "active" : ""}`}
              onMouseEnter={() => setActiveMeasurement("shoulder")}
              onMouseLeave={() => setActiveMeasurement(null)}
            >
              <div className="ft-slider-top">
                <div className="ft-slider-label-group">
                  <div className="ft-item-icon">
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#1e3a8a" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M16 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
                      <circle cx="10" cy="7" r="4" />
                      <path d="M22 17v-1a3 3 0 0 0-3-3h-1" />
                    </svg>
                  </div>
                  <span className="ft-slider-name">{t.shoulderWidth}</span>
                </div>
                <div className="ft-val-pill">{measurements.shoulder} cm</div>
              </div>

              <div className="ft-slider-track-wrap">
                <input
                  type="range"
                  min={35}
                  max={58}
                  value={measurements.shoulder}
                  onChange={(e) => handleSliderChange("shoulder", Number(e.target.value))}
                  className="ft-range-input"
                  style={{
                    background: `linear-gradient(to right, #1e3a8a 0%, #1e3a8a ${((measurements.shoulder - 35) / (58 - 35)) * 100}%, #e2e8f0 ${((measurements.shoulder - 35) / (58 - 35)) * 100}%, #e2e8f0 100%)`,
                  }}
                />
                <div className="ft-slider-bounds">
                  <span>35 cm</span>
                  <span>58 cm</span>
                </div>
              </div>
            </div>

            {/* 3. Bust / Chest Girth */}
            <div
              className={`ft-slider-row ${activeMeasurement === "chest" ? "active" : ""}`}
              onMouseEnter={() => setActiveMeasurement("chest")}
              onMouseLeave={() => setActiveMeasurement(null)}
            >
              <div className="ft-slider-top">
                <div className="ft-slider-label-group">
                  <div className="ft-item-icon">
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#1e3a8a" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M6 3v4c0 3.3 2.7 6 6 6s6-2.7 6-6V3" />
                      <path d="M4 14v7h16v-7" />
                    </svg>
                  </div>
                  <span className="ft-slider-name">{t.chestGirth}</span>
                </div>
                <div className="ft-val-pill">{measurements.chest} cm</div>
              </div>

              <div className="ft-slider-track-wrap">
                <input
                  type="range"
                  min={70}
                  max={130}
                  value={measurements.chest}
                  onChange={(e) => handleSliderChange("chest", Number(e.target.value))}
                  className="ft-range-input"
                  style={{
                    background: `linear-gradient(to right, #1e3a8a 0%, #1e3a8a ${((measurements.chest - 70) / (130 - 70)) * 100}%, #e2e8f0 ${((measurements.chest - 70) / (130 - 70)) * 100}%, #e2e8f0 100%)`,
                  }}
                />
                <div className="ft-slider-bounds">
                  <span>70 cm</span>
                  <span>130 cm</span>
                </div>
              </div>
            </div>

            {/* 4. Waist Girth */}
            <div
              className={`ft-slider-row ${activeMeasurement === "waist" ? "active" : ""}`}
              onMouseEnter={() => setActiveMeasurement("waist")}
              onMouseLeave={() => setActiveMeasurement(null)}
            >
              <div className="ft-slider-top">
                <div className="ft-slider-label-group">
                  <div className="ft-item-icon">
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#1e3a8a" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M5 4c3 3 3 13 0 16" />
                      <path d="M19 4c-3 3-3 13 0 16" />
                      <path d="M5 4h14" />
                      <path d="M5 20h14" />
                    </svg>
                  </div>
                  <span className="ft-slider-name">{t.waistGirth}</span>
                </div>
                <div className="ft-val-pill">{measurements.waist} cm</div>
              </div>

              <div className="ft-slider-track-wrap">
                <input
                  type="range"
                  min={55}
                  max={125}
                  value={measurements.waist}
                  onChange={(e) => handleSliderChange("waist", Number(e.target.value))}
                  className="ft-range-input"
                  style={{
                    background: `linear-gradient(to right, #1e3a8a 0%, #1e3a8a ${((measurements.waist - 55) / (125 - 55)) * 100}%, #e2e8f0 ${((measurements.waist - 55) / (125 - 55)) * 100}%, #e2e8f0 100%)`,
                  }}
                />
                <div className="ft-slider-bounds">
                  <span>55 cm</span>
                  <span>125 cm</span>
                </div>
              </div>
            </div>

            {/* 5. Hips Girth */}
            <div
              className={`ft-slider-row ${activeMeasurement === "hips" ? "active" : ""}`}
              onMouseEnter={() => setActiveMeasurement("hips")}
              onMouseLeave={() => setActiveMeasurement(null)}
            >
              <div className="ft-slider-top">
                <div className="ft-slider-label-group">
                  <div className="ft-item-icon">
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#1e3a8a" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M4 6c4 4 4 10 0 14" />
                      <path d="M20 6c-4 4-4 10 0 14" />
                      <ellipse cx="12" cy="13" rx="4" ry="7" />
                    </svg>
                  </div>
                  <span className="ft-slider-name">{t.hipsGirth}</span>
                </div>
                <div className="ft-val-pill">{measurements.hips} cm</div>
              </div>

              <div className="ft-slider-track-wrap">
                <input
                  type="range"
                  min={75}
                  max={135}
                  value={measurements.hips}
                  onChange={(e) => handleSliderChange("hips", Number(e.target.value))}
                  className="ft-range-input"
                  style={{
                    background: `linear-gradient(to right, #1e3a8a 0%, #1e3a8a ${((measurements.hips - 75) / (135 - 75)) * 100}%, #e2e8f0 ${((measurements.hips - 75) / (135 - 75)) * 100}%, #e2e8f0 100%)`,
                  }}
                />
                <div className="ft-slider-bounds">
                  <span>75 cm</span>
                  <span>135 cm</span>
                </div>
              </div>
            </div>

            {/* 6. Inseam Length */}
            <div
              className={`ft-slider-row ${activeMeasurement === "inseam" ? "active" : ""}`}
              onMouseEnter={() => setActiveMeasurement("inseam")}
              onMouseLeave={() => setActiveMeasurement(null)}
            >
              <div className="ft-slider-top">
                <div className="ft-slider-label-group">
                  <div className="ft-item-icon">
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#1e3a8a" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M7 4h10l1 16-4-1-2-10-2 10-4 1z" />
                    </svg>
                  </div>
                  <span className="ft-slider-name">{t.inseamLength}</span>
                </div>
                <div className="ft-val-pill">{measurements.inseam} cm</div>
              </div>

              <div className="ft-slider-track-wrap">
                <input
                  type="range"
                  min={65}
                  max={95}
                  value={measurements.inseam}
                  onChange={(e) => handleSliderChange("inseam", Number(e.target.value))}
                  className="ft-range-input"
                  style={{
                    background: `linear-gradient(to right, #1e3a8a 0%, #1e3a8a ${((measurements.inseam - 65) / (95 - 65)) * 100}%, #e2e8f0 ${((measurements.inseam - 65) / (95 - 65)) * 100}%, #e2e8f0 100%)`,
                  }}
                />
                <div className="ft-slider-bounds">
                  <span>65 cm</span>
                  <span>95 cm</span>
                </div>
              </div>
            </div>
          </div>

          {/* Primary CTA Button */}
          <button
            type="button"
            className="ft-launch-btn"
            onClick={handleLaunch}
          >
            <span>{t.launchBtn}</span>
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <path d="M5 12h14" />
              <path d="m12 5 7 7-7 7" />
            </svg>
          </button>
        </div>
      </div>
    </div>
  );
}
