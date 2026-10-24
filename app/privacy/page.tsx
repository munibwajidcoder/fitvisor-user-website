"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import Logo from "@/components/Logo";
import "./privacy.css";

export default function PrivacyPage() {
  const router = useRouter();
  const [anonymousMode, setAnonymousMode] = useState<boolean>(true);
  const [selectedOption, setSelectedOption] = useState<"A" | "B">("A");
  const [consentMeasurements, setConsentMeasurements] = useState<boolean>(true);
  const [agreeAlerts, setAgreeAlerts] = useState<boolean>(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!consentMeasurements) {
      alert("Please consent to the calculation of your morphological measurements to proceed.");
      return;
    }
    router.push("/body-capture");
  };

  return (
    <div className="privacy-page-wrapper">
      <div className="privacy-card-container">
        {/* Top FitVisor Logo */}
        <div className="privacy-logo-row">
          <Logo size="md" />
        </div>

        {/* 3-Step Wizard Indicator */}
        <div className="privacy-wizard-steps">
          {/* Step 1: Account (Completed) */}
          <Link href="/register" className="privacy-step-item">
            <div className="step-circle-badge completed">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#64748b" strokeWidth="2.8" strokeLinecap="round" strokeLinejoin="round">
                <polyline points="20 6 9 17 4 12" />
              </svg>
            </div>
            <span className="step-name-text">Account</span>
          </Link>

          <div className="step-divider-line" />

          {/* Step 2: Privacy & Anonymity (Active) */}
          <div className="privacy-step-item">
            <div className="step-circle-badge active">2</div>
            <span className="step-name-text active">Privacy &amp; Anonymity</span>
          </div>

          <div className="step-divider-line" />

          {/* Step 3: Create Avatar */}
          <div className="privacy-step-item">
            <div className="step-circle-badge">3</div>
            <span className="step-name-text">Create Avatar</span>
          </div>
        </div>

        {/* Section Heading */}
        <div className="privacy-heading-block">
          <h1 className="privacy-heading-title">You Control Your Body Data</h1>
          <p className="privacy-heading-subtitle">
            Your privacy matters. Choose how you want to be seen, and we&apos;ll handle the rest securely.
          </p>
        </div>

        {/* Blue Tinted Anonymous Mode Container */}
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
              <h3 className="anon-title">Enable Anonymous Mode (Blurred Face)</h3>
              <p className="anon-desc">
                Protect your identity while still getting accurate 3D fit results and personalized recommendations.
              </p>
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
            {/* Option A: Real Face Blurred with Artistic Vignette */}
            <div
              className={`anon-option-card ${selectedOption === "A" ? "selected" : ""}`}
              onClick={() => setSelectedOption("A")}
            >
              <div className="option-card-header">
                <span className="option-letter-badge badge-a">A</span>
                <span className="option-name-title">
                  Real Face Blurred<br />with Artistic Vignette
                </span>
              </div>
              <div className="option-preview-img-wrap">
                <Image
                  src="/images/model_face.jpg"
                  alt="Real Face Blurred"
                  width={240}
                  height={150}
                  className="preview-img-base"
                />
                {/* Vignette blur overlay */}
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
                <span className="option-name-title">
                  Generic Neutral<br />3D Mannequin
                </span>
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
            <span>
              Your raw camera photos are encrypted and deleted immediately after 3D mesh reconstruction.
            </span>
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
            <span className="consent-label-text">
              I consent to the calculation of my morphological measurements for virtual try-on.
            </span>
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
            <span className="consent-label-text">
              I agree to receive personalized fit and size drop alerts for my favorite brands (optional).
            </span>
          </label>

          {/* Primary CTA Button */}
          <button type="submit" className="privacy-submit-btn">
            <span>Confirm &amp; Proceed to Body Scan</span>
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
              <span className="trust-title">GDPR Compliant</span>
              <span className="trust-sub">Your data, our priority.</span>
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
              <span className="trust-title">Encrypted Photos</span>
              <span className="trust-sub">TLS 1.3 Security</span>
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
              <span className="trust-title">Privacy First</span>
              <span className="trust-sub">No identity tracking</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
