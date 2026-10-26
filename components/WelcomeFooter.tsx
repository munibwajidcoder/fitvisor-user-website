"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Logo from "./Logo";

const footerTranslations = {
  EN: {
    brandDesc: "FitVisor delivers virtual try-on with true precision. Centimeter-accurate 3D digital twins and real-time neural fabric simulation to eliminate online fashion return uncertainty.",
    fitPrecision: "99% Fit Precision",
    aesVault: "AES-256 Vault",
    colTech: "3D Technology",
    bodyScan: "3-Photo Body Scan",
    ai2min: "AI 2 Min",
    pedestalStudio: "360° Virtual Pedestal Studio",
    tensionMap: "Fabric Tension Heatmap",
    layering: "Multi-Garment Layering",
    compareSizes: "Size M vs L Comparison",
    colBrands: "Partner Brands & Retail",
    collections: "Partner Collections (Balmain • Zalando)",
    reservation: "In-Store Fitting Reservation",
    kiosks: "Interactive Boutique Kiosks",
    membership: "Membership Plans (Free • Pro)",
    colPrivacy: "Privacy & GDPR",
    biometricVault: "Biometric Data Vault",
    anonMode: "Anonymous Mode (Face Blur)",
    rightToForget: "Right to be Forgotten (Art. 17)",
    consentMgmt: "Consent Management",
    exportMesh: "Export 3D Mesh & JSON",
    copyright: "© 2026 FitVisor. All rights reserved.",
    gdprNotice: "GDPR / RGPD Article 17 Compliant • Your data stays encrypted",
    cookieSettings: "Cookie Settings",
    terms: "Terms & Conditions",
    privacyPolicy: "Privacy Policy",
  },
  FR: {
    brandDesc: "FitVisor réinvente l'essayage virtuel avec une précision absolue. Jumeaux numériques 3D au centimètre près et simulation physique temps réel pour éliminer l'incertitude des retours.",
    fitPrecision: "Précision de coupe 99%",
    aesVault: "Coffre AES-256",
    colTech: "Technologie 3D",
    bodyScan: "Scan corporel 3 photos",
    ai2min: "IA 2 Min",
    pedestalStudio: "Studio piédestal virtuel 360°",
    tensionMap: "Carte thermique des tensions",
    layering: "Superposition multi-vêtements",
    compareSizes: "Comparaison des tailles M vs L",
    colBrands: "Marques partenaires & Boutiques",
    collections: "Collections partenaires (Balmain • Zalando)",
    reservation: "Réservation d'essayage en boutique",
    kiosks: "Bornes interactives en boutique",
    membership: "Formules d'abonnement (Gratuit • Pro)",
    colPrivacy: "Confidentialité & RGPD",
    biometricVault: "Coffre de données biométriques",
    anonMode: "Mode anonyme (Visage flouté)",
    rightToForget: "Droit à l'oubli (Art. 17)",
    consentMgmt: "Gestion des consentements",
    exportMesh: "Exporter maillage 3D & JSON",
    copyright: "© 2026 FitVisor. Tous droits réservés.",
    gdprNotice: "Conforme RGPD Article 17 • Vos données restent chiffrées",
    cookieSettings: "Paramètres des cookies",
    terms: "Conditions Générales",
    privacyPolicy: "Politique de confidentialité",
  },
};

interface WelcomeFooterProps {
  lang?: "EN" | "FR";
}

export default function WelcomeFooter({ lang: propLang }: WelcomeFooterProps) {
  const [currentLang, setCurrentLang] = useState<"EN" | "FR">("EN");

  useEffect(() => {
    if (propLang) {
      setCurrentLang(propLang);
      return;
    }
    const saved = localStorage.getItem("fitvisor_lang");
    if (saved === "EN" || saved === "FR") {
      setCurrentLang(saved);
    }
    const handleStorage = () => {
      const updated = localStorage.getItem("fitvisor_lang");
      if (updated === "EN" || updated === "FR") {
        setCurrentLang(updated);
      }
    };
    window.addEventListener("storage", handleStorage);
    return () => window.removeEventListener("storage", handleStorage);
  }, [propLang]);

  const activeLang = propLang || currentLang;
  const t = footerTranslations[activeLang] || footerTranslations.EN;

  return (
    <footer className="wft-footer-wrapper">
      <div className="wft-footer-inner">
        {/* =========================================================
            STREAMLINED 4-COLUMN FOOTER GRID
            ========================================================= */}
        <div className="wft-columns-grid">
          
          {/* COLUMN 1: Brand & Core Mission */}
          <div className="wft-brand-col">
            <Logo size="sm" showSubtitle={true} href="/home" />
            <p className="wft-brand-desc">
              <strong>FitVisor</strong> {t.brandDesc}
            </p>

            <div className="wft-trust-chips">
              <div className="wft-trust-chip">
                <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="#16a34a" strokeWidth="2.5"><polyline points="20 6 9 17 4 12"/></svg>
                <span>{t.fitPrecision}</span>
              </div>
              <div className="wft-trust-chip">
                <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="#2563eb" strokeWidth="2.5"><rect x="3" y="11" width="18" height="11" rx="2" ry="2"/><path d="M7 11V7a5 5 0 0 1 10 0v4"/></svg>
                <span>{t.aesVault}</span>
              </div>
            </div>

            <div className="wft-social-row">
              <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" className="wft-social-icon" title="Instagram">
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect x="2" y="2" width="20" height="20" rx="5" ry="5"/><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/><line x1="17.5" y1="6.5" x2="17.51" y2="6.5"/></svg>
              </a>
              <a href="https://tiktok.com" target="_blank" rel="noopener noreferrer" className="wft-social-icon" title="TikTok">
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M9 12a4 4 0 1 0 4 4V4a5 5 0 0 0 5 5"/></svg>
              </a>
              <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" className="wft-social-icon" title="LinkedIn">
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"/><rect x="2" y="9" width="4" height="12"/><circle cx="4" cy="4" r="2"/></svg>
              </a>
              <a href="https://x.com" target="_blank" rel="noopener noreferrer" className="wft-social-icon" title="X (Twitter)">
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M4 4l16 16m0-16L4 20"/></svg>
              </a>
            </div>
          </div>

          {/* COLUMN 2: 3D Technology */}
          <div className="wft-nav-col">
            <h4 className="wft-col-title">{t.colTech}</h4>
            <ul className="wft-link-list">
              <li>
                <Link href="/scan" className="wft-link">
                  {t.bodyScan}
                  <span className="wft-tag-pill wft-tag-green">{t.ai2min}</span>
                </Link>
              </li>
              <li>
                <Link href="/3d-studio" className="wft-link">
                  {t.pedestalStudio}
                </Link>
              </li>
              <li>
                <Link href="/3d-studio/tension" className="wft-link">
                  {t.tensionMap}
                </Link>
              </li>
              <li>
                <Link href="/3d-studio/layering" className="wft-link">
                  {t.layering}
                </Link>
              </li>
              <li>
                <Link href="/3d-studio/compare" className="wft-link">
                  {t.compareSizes}
                </Link>
              </li>
            </ul>
          </div>

          {/* COLUMN 3: Brands & Retail Ecosystem */}
          <div className="wft-nav-col">
            <h4 className="wft-col-title">{t.colBrands}</h4>
            <ul className="wft-link-list">
              <li>
                <Link href="/catalog" className="wft-link">
                  {t.collections}
                </Link>
              </li>
              <li>
                <Link href="/checkout" className="wft-link">
                  {t.reservation}
                </Link>
              </li>
              <li>
                <Link href="/order-success" className="wft-link">
                  {t.kiosks}
                </Link>
              </li>
              <li>
                <Link href="/pricing" className="wft-link">
                  {t.membership}
                </Link>
              </li>
            </ul>
          </div>

          {/* COLUMN 4: Privacy & GDPR */}
          <div className="wft-nav-col">
            <h4 className="wft-col-title">{t.colPrivacy}</h4>
            <ul className="wft-link-list">
              <li>
                <Link href="/profile" className="wft-link">
                  {t.biometricVault}
                  <span className="wft-tag-pill">AES-256</span>
                </Link>
              </li>
              <li>
                <Link href="/profile" className="wft-link">
                  {t.anonMode}
                </Link>
              </li>
              <li>
                <Link href="/profile" className="wft-link">
                  {t.rightToForget}
                </Link>
              </li>
              <li>
                <Link href="/profile" className="wft-link">
                  {t.consentMgmt}
                </Link>
              </li>
              <li>
                <Link href="/profile" className="wft-link">
                  {t.exportMesh}
                </Link>
              </li>
            </ul>
          </div>

        </div>
      </div>

      {/* =========================================================
          BOTTOM BAR: FULL WIDTH FLUSH TO EDGES
          ========================================================= */}
      <div className="wft-bottom-strip">
        <div className="wft-bottom-inner">
          <p className="wft-copyright">
            {t.copyright}
          </p>

          <div className="wft-gdpr-center">
            <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="#16a34a" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round">
              <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
              <path d="m9 12 2 2 4-4" />
            </svg>
            <span className="wft-gdpr-text">{t.gdprNotice}</span>
          </div>

          <div className="wft-bottom-links">
            <Link href="/profile" className="wft-legal-link">
              {t.cookieSettings}
            </Link>
            <span className="wft-pipe">|</span>
            <Link href="/profile" className="wft-legal-link">
              {t.terms}
            </Link>
            <span className="wft-pipe">|</span>
            <Link href="/profile" className="wft-legal-link">
              {t.privacyPolicy}
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
