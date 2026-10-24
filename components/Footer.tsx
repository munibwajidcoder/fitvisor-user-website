"use client";

import Link from "next/link";
import Logo from "./Logo";

export default function Footer() {
  return (
    <footer className="site-footer">
      <div className="footer-content">
        <div className="footer-left">
          <Logo size="sm" />

          <div className="footer-divider" />

          <div className="footer-gdpr-badge">
            <div className="gdpr-icon-wrapper">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#1e293b" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
                <path d="m9 12 2 2 4-4" />
              </svg>
            </div>
            <div className="gdpr-text-group">
              <span className="gdpr-title">GDPR Compliant</span>
              <span className="gdpr-sub">Your data, our priority.</span>
            </div>
          </div>
        </div>

        <div className="footer-right">
          <Link href="#cookies" className="footer-link">
            Cookie Settings
          </Link>
          <span className="footer-pipe">|</span>
          <Link href="#terms" className="footer-link">
            Terms &amp; Conditions
          </Link>
          <span className="footer-pipe">|</span>
          <Link href="#privacy" className="footer-link">
            Privacy Policy
          </Link>
          <span className="footer-pipe">|</span>
          <span className="footer-copyright">
            &copy; 2025 Fitvisor. All rights reserved.
          </span>
        </div>
      </div>
    </footer>
  );
}
