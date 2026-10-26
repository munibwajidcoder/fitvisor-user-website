"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Logo from "./Logo";

export default function Navbar() {
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

  return (
    <header className="site-header">
      <Logo size="md" />

      <nav className="nav-links">
        <Link href="#technology" className="nav-link">
          {lang === "FR" ? "Technologie 3D" : "3D Technology"}
        </Link>
        <Link href="#brands" className="nav-link">
          {lang === "FR" ? "Marques partenaires" : "Partner Brands"}
        </Link>
        <Link href="#pricing" className="nav-link">
          {lang === "FR" ? "Tarifs" : "Pricing"}
        </Link>
      </nav>

      <div className="header-actions">
        {/* Language Switch */}
        <div className="fv-lang-switch">
          <button
            type="button"
            onClick={() => changeLang("EN")}
            className={`lang-btn ${lang === "EN" ? "active" : ""}`}
          >
            EN
          </button>
          <span className="lang-pipe">|</span>
          <button
            type="button"
            onClick={() => changeLang("FR")}
            className={`lang-btn ${lang === "FR" ? "active" : ""}`}
          >
            FR
          </button>
        </div>

        {/* Mobile-only Sign In (preserves the mobile layout untouched) */}
        <Link href="/login" className="nav-signin-link nav-signin-mobile-only">
          {lang === "FR" ? "Connexion" : "Sign In"}
        </Link>
      </div>

      {/* Desktop Auth & CTA: Sign In and Create My Avatar placed side-by-side */}
      <div className="site-header-cta-wrap">
        <Link href="/login" className="nav-signin-link nav-signin-desktop-only">
          {lang === "FR" ? "Connexion" : "Sign In"}
        </Link>
        <Link href="/register" className="btn-primary-cta">
          {lang === "FR" ? "Créer mon avatar" : "Create My Avatar"}
        </Link>
      </div>
    </header>
  );
}
