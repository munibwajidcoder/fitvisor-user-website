"use client";

import Link from "next/link";
import Logo from "./Logo";

export default function WelcomeFooter() {
  return (
    <footer className="wft-footer-wrapper">
      <div className="wft-footer-inner">
        {/* =========================================================
            STREAMLINED 4-COLUMN FOOTER GRID
            ========================================================= */}
        <div className="wft-columns-grid">
          
          {/* COLUMN 1: Brand & Core Mission */}
          <div className="wft-brand-col">
            <Logo size="sm" showSubtitle={true} />
            <p className="wft-brand-desc">
              <strong>FitVisor</strong> delivers virtual try-on with true precision. Centimeter-accurate 3D digital twins and real-time neural fabric simulation to eliminate online fashion return uncertainty.
            </p>

            <div className="wft-trust-chips">
              <div className="wft-trust-chip">
                <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="#16a34a" strokeWidth="2.5"><polyline points="20 6 9 17 4 12"/></svg>
                <span>99% Fit Precision</span>
              </div>
              <div className="wft-trust-chip">
                <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="#2563eb" strokeWidth="2.5"><rect x="3" y="11" width="18" height="11" rx="2" ry="2"/><path d="M7 11V7a5 5 0 0 1 10 0v4"/></svg>
                <span>AES-256 Vault</span>
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
            <h4 className="wft-col-title">3D Technology</h4>
            <ul className="wft-link-list">
              <li>
                <Link href="/scan" className="wft-link">
                  3-Photo Body Scan
                  <span className="wft-tag-pill wft-tag-green">AI 2 Min</span>
                </Link>
              </li>
              <li>
                <Link href="/3d-studio" className="wft-link">
                  360&deg; Virtual Pedestal Studio
                </Link>
              </li>
              <li>
                <Link href="/3d-studio/tension" className="wft-link">
                  Fabric Tension Heatmap
                </Link>
              </li>
              <li>
                <Link href="/3d-studio/layering" className="wft-link">
                  Multi-Garment Layering
                </Link>
              </li>
              <li>
                <Link href="/3d-studio/compare" className="wft-link">
                  Size M vs L Comparison
                </Link>
              </li>
            </ul>
          </div>

          {/* COLUMN 3: Brands & Retail Ecosystem */}
          <div className="wft-nav-col">
            <h4 className="wft-col-title">Partner Brands &amp; Retail</h4>
            <ul className="wft-link-list">
              <li>
                <Link href="/catalog" className="wft-link">
                  Partner Collections (Balmain &bull; Zalando)
                </Link>
              </li>
              <li>
                <Link href="/checkout" className="wft-link">
                  In-Store Fitting Reservation
                </Link>
              </li>
              <li>
                <Link href="/order-success" className="wft-link">
                  Interactive Boutique Kiosks
                </Link>
              </li>
              <li>
                <Link href="/pricing" className="wft-link">
                  Membership Plans (Free &bull; Pro)
                </Link>
              </li>
            </ul>
          </div>

          {/* COLUMN 4: Privacy & GDPR */}
          <div className="wft-nav-col">
            <h4 className="wft-col-title">Privacy &amp; GDPR</h4>
            <ul className="wft-link-list">
              <li>
                <Link href="/profile" className="wft-link">
                  Biometric Data Vault
                  <span className="wft-tag-pill">AES-256</span>
                </Link>
              </li>
              <li>
                <Link href="/profile" className="wft-link">
                  Anonymous Mode (Face Blur)
                </Link>
              </li>
              <li>
                <Link href="/profile" className="wft-link">
                  Right to be Forgotten (Art. 17)
                </Link>
              </li>
              <li>
                <Link href="/profile" className="wft-link">
                  Consent Management
                </Link>
              </li>
              <li>
                <Link href="/profile" className="wft-link">
                  Export 3D Mesh &amp; JSON
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
            &copy; 2026 FitVisor. All rights reserved.
          </p>

          <div className="wft-gdpr-center">
            <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="#16a34a" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round">
              <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
              <path d="m9 12 2 2 4-4" />
            </svg>
            <span className="wft-gdpr-text">GDPR / RGPD Article 17 Compliant &bull; Your data stays encrypted</span>
          </div>

          <div className="wft-bottom-links">
            <Link href="/profile" className="wft-legal-link">
              Cookie Settings
            </Link>
            <span className="wft-pipe">|</span>
            <Link href="/profile" className="wft-legal-link">
              Terms &amp; Conditions
            </Link>
            <span className="wft-pipe">|</span>
            <Link href="/profile" className="wft-legal-link">
              Privacy Policy
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
