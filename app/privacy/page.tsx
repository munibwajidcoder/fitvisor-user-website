"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import "./privacy.css";

const translations = {
  EN: {
    account: "Account",
    privacy: "Privacy & Anonymity",
    createAvatar: "Create Avatar",
    title: "You Control Your Body Data",
    subtitle: "Your privacy matters. Choose how you want to be seen, and we'll handle the rest securely.",
    anonTitle: "Enable Anonymous Mode (Blurred Face)",
    anonDesc: "Protect your identity while still getting accurate 3D fit results and personalized recommendations.",
    optA: "Real Face Blurred with Artistic Vignette",
    optB: "Generic Neutral 3D Mannequin",
    rawPhotosNote: "Your raw camera photos are encrypted and deleted immediately after 3D mesh reconstruction.",
    consent1: "I consent to the calculation of my morphological measurements for virtual try-on.",
    consent2: "I agree to receive personalized fit and size drop alerts for my favorite brands (optional).",
    consentAlert: "Please consent to the calculation of your morphological measurements to proceed.",
    submitBtn: "Confirm & Proceed to Body Scan",
    gdpr: "GDPR Compliant",
    gdprSub: "Your data, our priority.",
    encrypted: "Encrypted Photos",
    encryptedSub: "TLS 1.3 Security",
    privacyFirst: "Privacy First",
    privacyFirstSub: "No identity tracking",
  },
  FR: {
    account: "Compte",
    privacy: "Confidentialité & Anonymat",
    createAvatar: "Créer un Avatar",
    title: "Vous contrôlez vos données corporelles",
    subtitle: "Votre vie privée est essentielle. Choisissez votre mode d'affichage, nous sécurisons le reste.",
    anonTitle: "Activer le mode anonyme (visage flouté)",
    anonDesc: "Protégez votre identité tout en obtenant un ajustement 3D précis et des recommandations personnalisées.",
    optA: "Vrai visage flouté avec vignette artistique",
    optB: "Mannequin 3D neutre générique",
    rawPhotosNote: "Vos photos brutes sont chiffrées et supprimées immédiatement après la modélisation 3D.",
    consent1: "Je consens au calcul de mes mesures morphologiques pour l'essayage virtuel.",
    consent2: "J'accepte de recevoir des alertes de taille et d'ajustement pour mes marques préférées (facultatif).",
    consentAlert: "Veuillez accepter le calcul de vos mesures morphologiques pour continuer.",
    submitBtn: "Confirmer et passer au scan corporel",
    gdpr: "Conforme RGPD",
    gdprSub: "Vos données, notre priorité.",
    encrypted: "Photos chiffrées",
    encryptedSub: "Sécurité TLS 1.3",
    privacyFirst: "Confidentialité d'abord",
    privacyFirstSub: "Aucun traçage d'identité",
  },
};

export default function PrivacyPage() {
  const router = useRouter();
  const [anonymousMode, setAnonymousMode] = useState<boolean>(true);
  const [selectedOption, setSelectedOption] = useState<"A" | "B">("A");
  const [consentMeasurements, setConsentMeasurements] = useState<boolean>(true);
  const [agreeAlerts, setAgreeAlerts] = useState<boolean>(false);
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

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!consentMeasurements) {
      alert(t.consentAlert);
      return;
    }
    router.push("/body-capture");
  };

  return (
    <div className="privacy-page-wrapper">
      {/* Top Right Language Switch */}
      <div className="login-lang-switch">
        <button
          type="button"
          id="priv-lang-btn-en"
          onClick={() => changeLang("EN")}
          className={`lang-btn ${lang === "EN" ? "active" : ""}`}
        >
          EN
        </button>
        <span className="lang-pipe">|</span>
        <button
          type="button"
          id="priv-lang-btn-fr"
          onClick={() => changeLang("FR")}
          className={`lang-btn ${lang === "FR" ? "active" : ""}`}
        >
          FR
        </button>
      </div>

      <div className="privacy-card-container">
        {/* Official FitVisor Logo */}
        <div className="privacy-logo-row">
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

        {/* 3-Step Wizard Indicator (Matching Register Page) */}
        <div className="wizard-steps-row">
          {/* Step 1: Account (Completed) */}
          <Link href="/register" className="wizard-step-item" style={{ textDecoration: "none" }}>
            <div className="step-circle completed">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#64748b" strokeWidth="2.8" strokeLinecap="round" strokeLinejoin="round">
                <polyline points="20 6 9 17 4 12" />
              </svg>
            </div>
            <span className="step-label">{t.account}</span>
          </Link>

          <div className="step-connector-line completed" />

          {/* Step 2: Privacy & Anonymity (Active) */}
          <div className="wizard-step-item active">
            <div className="step-circle active">2</div>
            <span className="step-label active">{t.privacy}</span>
          </div>

          <div className="step-connector-line" />

          {/* Step 3: Create Avatar */}
          <div className="wizard-step-item">
            <div className="step-circle">3</div>
            <span className="step-label">{t.createAvatar}</span>
          </div>
        </div>

        {/* Section Heading */}
        <div className="privacy-heading-block">
          <h1 className="privacy-heading-title">{t.title}</h1>
          <p className="privacy-heading-subtitle">{t.subtitle}</p>
        </div>

        {/* Anonymous Mode Container */}
        <div className="anonymous-mode-box">
          {/* Header Row with Toggle */}
          <div className="anon-toggle-header">
            <div className="anon-badge-icon">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#e53e42" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
                <path d="M12 11c0 1.66-1.34 3-3 3s-3-1.34-3-3 1.34-3 3-3 3 1.34 3 3z" />
              </svg>
            </div>

            <div className="anon-text-col">
              <h3 className="anon-title">{t.anonTitle}</h3>
              <p className="anon-desc">{t.anonDesc}</p>
            </div>

            {/* Toggle switch */}
            <button
              type="button"
              className={`anon-toggle-switch ${anonymousMode ? "active" : ""}`}
              onClick={() => setAnonymousMode(!anonymousMode)}
              aria-label="Toggle anonymous mode"
            >
              <span className="toggle-slider-circle" />
            </button>
          </div>

          {/* Two Mode Cards (A & B) */}
          <div className="anonymity-options-grid">
            {/* Option A: Real Face Blurred */}
            <div
              className={`anon-option-card ${selectedOption === "A" ? "selected" : ""}`}
              onClick={() => setSelectedOption("A")}
            >
              <div className="option-card-header">
                <span className="option-letter-badge badge-a">A</span>
                <span className="option-name-title">{t.optA}</span>
              </div>
              <div className="option-preview-img-wrap">
                <Image
                  src="/images/model_face.jpg"
                  alt="Real Face Blurred"
                  width={240}
                  height={150}
                  className="preview-img-base"
                />
                <div className="face-blur-vignette" />
              </div>
            </div>

            {/* Option B: Generic Neutral 3D Mannequin */}
            <div
              className={`anon-option-card ${selectedOption === "B" ? "selected" : ""}`}
              onClick={() => setSelectedOption("B")}
            >
              <div className="option-card-header">
                <span className="option-letter-badge badge-b">B</span>
                <span className="option-name-title">{t.optB}</span>
              </div>
              <div className="option-preview-img-wrap">
                <Image
                  src="/images/neutral_mannequin.jpg"
                  alt="Generic Neutral 3D Mannequin"
                  width={240}
                  height={150}
                  className="preview-img-base"
                />
              </div>
            </div>
          </div>

          {/* Raw photos encryption note */}
          <div className="anon-bottom-note">
            <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="#4a6b94" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <rect width="18" height="11" x="3" y="11" rx="2" ry="2" />
              <path d="M7 11V7a5 5 0 0 1 10 0v4" />
            </svg>
            <span>{t.rawPhotosNote}</span>
          </div>
        </div>

        {/* Consent Checkboxes Form */}
        <form onSubmit={handleSubmit} className="privacy-consent-form">
          {/* Checkbox 1: Morphological measurements (Mandatory) */}
          <label className="consent-checkbox-row">
            <input
              type="checkbox"
              checked={consentMeasurements}
              onChange={(e) => setConsentMeasurements(e.target.checked)}
              className="consent-real-input"
            />
            <span className={`custom-checkbox-box ${consentMeasurements ? "checked" : ""}`}>
              {consentMeasurements && (
                <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="#ffffff" strokeWidth="3.2" strokeLinecap="round" strokeLinejoin="round">
                  <polyline points="20 6 9 17 4 12" />
                </svg>
              )}
            </span>
            <span className="consent-label-text">{t.consent1}</span>
          </label>

          {/* Checkbox 2: Brand alerts (Optional) */}
          <label className="consent-checkbox-row">
            <input
              type="checkbox"
              checked={agreeAlerts}
              onChange={(e) => setAgreeAlerts(e.target.checked)}
              className="consent-real-input"
            />
            <span className={`custom-checkbox-box ${agreeAlerts ? "checked" : ""}`}>
              {agreeAlerts && (
                <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="#ffffff" strokeWidth="3.2" strokeLinecap="round" strokeLinejoin="round">
                  <polyline points="20 6 9 17 4 12" />
                </svg>
              )}
            </span>
            <span className="consent-label-text">{t.consent2}</span>
          </label>

          {/* Primary CTA Button */}
          <button type="submit" className="privacy-submit-btn">
            <span>{t.submitBtn}</span>
            <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.3" strokeLinecap="round" strokeLinejoin="round">
              <path d="M5 12h14" />
              <path d="m12 5 7 7-7 7" />
            </svg>
          </button>
        </form>

        {/* Bottom Trust Badges (3 Badges) */}
        <div className="privacy-trust-badges-row">
          {/* Badge 1: GDPR Compliant */}
          <div className="trust-badge-item">
            <div className="trust-icon-box">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#577399" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
                <path d="m9 12 2 2 4-4" />
              </svg>
            </div>
            <div className="trust-text-group">
              <span className="trust-title">{t.gdpr}</span>
              <span className="trust-sub">{t.gdprSub}</span>
            </div>
          </div>

          <div className="trust-divider-bar" />

          {/* Badge 2: Encrypted Photos */}
          <div className="trust-badge-item">
            <div className="trust-icon-box">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#577399" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <rect width="18" height="11" x="3" y="11" rx="2" ry="2" />
                <path d="M7 11V7a5 5 0 0 1 10 0v4" />
              </svg>
            </div>
            <div className="trust-text-group">
              <span className="trust-title">{t.encrypted}</span>
              <span className="trust-sub">{t.encryptedSub}</span>
            </div>
          </div>

          <div className="trust-divider-bar" />

          {/* Badge 3: Privacy First */}
          <div className="trust-badge-item">
            <div className="trust-icon-box">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#577399" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
                <circle cx="12" cy="11" r="3" />
              </svg>
            </div>
            <div className="trust-text-group">
              <span className="trust-title">{t.privacyFirst}</span>
              <span className="trust-sub">{t.privacyFirstSub}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
