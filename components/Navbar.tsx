"use client";

import Link from "next/link";
import Logo from "./Logo";

export default function Navbar() {
  return (
    <header className="site-header">
      <Logo size="md" />

      <nav className="nav-links">
        <Link href="#technology" className="nav-link">
          3D Technology
        </Link>
        <Link href="#brands" className="nav-link">
          Partner Brands
        </Link>
        <Link href="#pricing" className="nav-link">
          Pricing
        </Link>
      </nav>

      <div className="header-actions">
        <Link href="/login" className="btn-primary-cta">
          Create My Avatar
        </Link>
      </div>
    </header>
  );
}
