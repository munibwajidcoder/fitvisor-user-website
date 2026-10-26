"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { useRouter } from "next/navigation";

const translations = {
  EN: {
    account: "Account",
    privacy: "Privacy & Anonymity",
    createAvatar: "Create Avatar",
    title: "Create Your Fitvisor Profile",
    subtitle: "Get started with your virtual wardrobe and 3D try-on experience.",
    firstName: "First Name",
    firstNamePlaceholder: "Enter your first name",
    lastName: "Last Name",
    lastNamePlaceholder: "Enter your last name",
    email: "Email address",
    emailPlaceholder: "you@example.com",
    password: "Password",
    passwordPlaceholder: "Create a strong password",
    passwordStrength: "Password strength:",
    weak: "Weak",
    dob: "Date of Birth",
    day: "Day",
    month: "Month",
    year: "Year",
    complianceTitle: "Compliance Notice:",
    complianceDesc: "Fitvisor is strictly reserved for users aged 16+ for biometric and body data processing.",
    continueBtn: "Continue to Privacy Consent",
    alreadyAccount: "Already have an account?",
    signIn: "Sign In",
    months: ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"],
  },
  FR: {
    account: "Compte",
    privacy: "Confidentialité & Anonymat",
    createAvatar: "Créer un Avatar",
    title: "Créez votre profil Fitvisor",
    subtitle: "Commencez votre expérience avec votre garde-robe virtuelle et vos essayages 3D.",
    firstName: "Prénom",
    firstNamePlaceholder: "Entrez votre prénom",
    lastName: "Nom",
    lastNamePlaceholder: "Entrez votre nom",
    email: "Adresse e-mail",
    emailPlaceholder: "vous@exemple.com",
    password: "Mot de passe",
    passwordPlaceholder: "Créez un mot de passe sécurisé",
    passwordStrength: "Force du mot de passe :",
    weak: "Faible",
    dob: "Date de naissance",
    day: "Jour",
    month: "Mois",
    year: "Année",
    complianceTitle: "Avis de conformité :",
    complianceDesc: "Fitvisor est strictement réservé aux utilisateurs de 16 ans et plus pour le traitement des données biométriques.",
    continueBtn: "Continuer vers le consentement",
    alreadyAccount: "Vous avez déjà un compte ?",
    signIn: "Se connecter",
    months: ["Janv", "Févr", "Mars", "Avr", "Mai", "Juin", "Juil", "Août", "Sept", "Oct", "Nov", "Déc"],
  },
};

export default function RegisterPage() {
  const router = useRouter();
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [day, setDay] = useState("");
  const [month, setMonth] = useState("");
  const [year, setYear] = useState("");
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
    router.push("/privacy");
  };

  return (
    <div className="register-page-wrapper">
      {/* Top Right Language Switch */}
      <div className="login-lang-switch">
        <button
          type="button"
          id="reg-lang-btn-en"
          onClick={() => changeLang("EN")}
          className={`lang-btn ${lang === "EN" ? "active" : ""}`}
        >
          EN
        </button>
        <span className="lang-pipe">|</span>
        <button
          type="button"
          id="reg-lang-btn-fr"
          onClick={() => changeLang("FR")}
          className={`lang-btn ${lang === "FR" ? "active" : ""}`}
        >
          FR
        </button>
      </div>

      <div className="register-card">
        {/* Official FitVisor Logo */}
        <div className="register-logo-container">
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

        {/* 3-Step Wizard Indicator */}
        <div className="wizard-steps-row">
          {/* Step 1: Account (Active) */}
          <div className="wizard-step-item active">
            <div className="step-circle active">1</div>
            <span className="step-label active">{t.account}</span>
          </div>

          <div className="step-connector-line" />

          {/* Step 2: Privacy */}
          <div className="wizard-step-item">
            <div className="step-circle">2</div>
            <span className="step-label">{t.privacy}</span>
          </div>

          <div className="step-connector-line" />

          {/* Step 3: Create Avatar */}
          <div className="wizard-step-item">
            <div className="step-circle">3</div>
            <span className="step-label">{t.createAvatar}</span>
          </div>
        </div>

        {/* Section Heading */}
        <div className="register-heading-block">
          <h1 className="register-title">{t.title}</h1>
          <p className="register-subtitle">{t.subtitle}</p>
        </div>

        {/* Registration Form */}
        <form onSubmit={handleSubmit} className="register-form">
          {/* First Name & Last Name (2 Columns) */}
          <div className="register-two-col">
            <div className="form-field-group">
              <label className="field-label">{t.firstName}</label>
              <div className="register-input-wrap">
                <span className="reg-icon">
                  <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="#64748b" strokeWidth="1.9" strokeLinecap="round" strokeLinejoin="round">
                    <circle cx="12" cy="8" r="4" />
                    <path d="M6 21v-2a4 4 0 0 1 4-4h4a4 4 0 0 1 4 4v2" />
                  </svg>
                </span>
                <input
                  type="text"
                  placeholder={t.firstNamePlaceholder}
                  value={firstName}
                  onChange={(e) => setFirstName(e.target.value)}
                  className="reg-input"
                  required
                />
              </div>
            </div>

            <div className="form-field-group">
              <label className="field-label">{t.lastName}</label>
              <div className="register-input-wrap">
                <span className="reg-icon">
                  <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="#64748b" strokeWidth="1.9" strokeLinecap="round" strokeLinejoin="round">
                    <circle cx="12" cy="8" r="4" />
                    <path d="M6 21v-2a4 4 0 0 1 4-4h4a4 4 0 0 1 4 4v2" />
                  </svg>
                </span>
                <input
                  type="text"
                  placeholder={t.lastNamePlaceholder}
                  value={lastName}
                  onChange={(e) => setLastName(e.target.value)}
                  className="reg-input"
                  required
                />
              </div>
            </div>
          </div>

          {/* Email Address */}
          <div className="form-field-group">
            <label className="field-label">{t.email}</label>
            <div className="register-input-wrap">
              <span className="reg-icon">
                <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="#64748b" strokeWidth="1.9" strokeLinecap="round" strokeLinejoin="round">
                  <rect width="20" height="16" x="2" y="4" rx="2" />
                  <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" />
                </svg>
              </span>
              <input
                type="email"
                placeholder={t.emailPlaceholder}
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="reg-input"
                required
              />
            </div>
          </div>

          {/* Password */}
          <div className="form-field-group">
            <label className="field-label">{t.password}</label>
            <div className="register-input-wrap">
              <span className="reg-icon">
                <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="#64748b" strokeWidth="1.9" strokeLinecap="round" strokeLinejoin="round">
                  <rect width="18" height="11" x="3" y="11" rx="2" ry="2" />
                  <path d="M7 11V7a5 5 0 0 1 10 0v4" />
                </svg>
              </span>
              <input
                type={showPassword ? "text" : "password"}
                placeholder={t.passwordPlaceholder}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="reg-input"
                required
              />
              <button
                type="button"
                className="reg-password-toggle"
                onClick={() => setShowPassword(!showPassword)}
                aria-label="Toggle password"
              >
                <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="#64748b" strokeWidth="1.9" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M2 12s3-7 10-7 10 7 10 7-3 7-10 7-10-7-10-7Z" />
                  <circle cx="12" cy="12" r="3" />
                </svg>
              </button>
            </div>

            {/* Password Strength Meter */}
            <div className="password-strength-container">
              <div className="strength-bars-row">
                <div className="strength-segment filled" />
                <div className="strength-segment" />
                <div className="strength-segment" />
                <div className="strength-segment" />
                <div className="strength-segment" />
              </div>
              <span className="strength-text">
                {t.passwordStrength} <span className="weak-label">{t.weak}</span>
              </span>
            </div>
          </div>

          {/* Date of Birth */}
          <div className="form-field-group">
            <label className="field-label">{t.dob}</label>
            <div className="dob-dropdowns-row">
              {/* Day */}
              <div className="select-wrap-box">
                <span className="dob-icon">
                  <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="#64748b" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <rect width="18" height="18" x="3" y="4" rx="2" ry="2" />
                    <line x1="16" x2="16" y1="2" y2="6" />
                    <line x1="8" x2="8" y1="2" y2="6" />
                    <line x1="3" x2="21" y1="10" y2="10" />
                  </svg>
                </span>
                <select value={day} onChange={(e) => setDay(e.target.value)} className="dob-select">
                  <option value="">{t.day}</option>
                  {Array.from({ length: 31 }, (_, i) => i + 1).map((d) => (
                    <option key={d} value={d}>
                      {d}
                    </option>
                  ))}
                </select>
                <span className="select-arrow">▼</span>
              </div>

              {/* Month */}
              <div className="select-wrap-box">
                <select value={month} onChange={(e) => setMonth(e.target.value)} className="dob-select no-left-icon">
                  <option value="">{t.month}</option>
                  {t.months.map((m, idx) => (
                    <option key={idx} value={m}>
                      {m}
                    </option>
                  ))}
                </select>
                <span className="select-arrow">▼</span>
              </div>

              {/* Year */}
              <div className="select-wrap-box">
                <select value={year} onChange={(e) => setYear(e.target.value)} className="dob-select no-left-icon">
                  <option value="">{t.year}</option>
                  {Array.from({ length: 70 }, (_, i) => 2010 - i).map((y) => (
                    <option key={y} value={y}>
                      {y}
                    </option>
                  ))}
                </select>
                <span className="select-arrow">▼</span>
              </div>
            </div>
          </div>

          {/* Compliance Notice Banner */}
          <div className="compliance-notice-banner">
            <div className="notice-left-icon">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#e53e42" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
                <rect x="10" y="11" width="4" height="4" rx="1" />
                <path d="M11 11V9a1 1 0 0 1 2 0v2" />
              </svg>
            </div>
            <div className="notice-body">
              <span className="notice-title">{t.complianceTitle}</span>
              <p className="notice-desc">
                {t.complianceDesc}
              </p>
            </div>
            <div className="notice-right-info">
              <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="#e53e42" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <circle cx="12" cy="12" r="10" />
                <line x1="12" y1="16" x2="12" y2="12" />
                <line x1="12" y1="8" x2="12.01" y2="8" />
              </svg>
            </div>
          </div>

          {/* Submit Button */}
          <button type="submit" className="register-submit-btn">
            <span>{t.continueBtn}</span>
            <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.3" strokeLinecap="round" strokeLinejoin="round">
              <path d="M5 12h14" />
              <path d="m12 5 7 7-7 7" />
            </svg>
          </button>
        </form>

        {/* Footer Link */}
        <div className="register-card-footer">
          <span>{t.alreadyAccount}</span>{" "}
          <Link href="/login" className="reg-signin-link">
            {t.signIn}
          </Link>
        </div>
      </div>
    </div>
  );
}
