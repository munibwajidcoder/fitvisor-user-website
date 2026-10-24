"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";

export default function LoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [lang, setLang] = useState<"EN" | "FR">("EN");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    router.push("/mfa");
  };

  return (
    <div className="login-page-wrapper">
      {/* Top right language switch */}
      <div className="login-lang-switch">
        <button
          type="button"
          onClick={() => setLang("EN")}
          className={`lang-btn ${lang === "EN" ? "active" : ""}`}
        >
          EN
        </button>
        <span className="lang-pipe">|</span>
        <button
          type="button"
          onClick={() => setLang("FR")}
          className={`lang-btn ${lang === "FR" ? "active" : ""}`}
        >
          FR
        </button>
      </div>

      {/* Main Login Card */}
      <div className="login-card">
        {/* Stacked FitVisor Logo */}
        <div className="login-logo-container">
          <Link href="/" title="FitVisor Home">
            <svg
              width="118"
              height="102"
              viewBox="0 0 118 102"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              {/* Rounded square container with red border */}
              <rect
                x="20"
                y="3"
                width="78"
                height="68"
                rx="16"
                fill="#FFFFFF"
                stroke="#E53E42"
                strokeWidth="3.5"
              />

              {/* Top navy bar of the 'F' emblem */}
              <path d="M 33 18 H 85 L 77 28 H 39 Z" fill="#1C2243" />

              {/* Middle navy bar */}
              <path d="M 42 34 H 75 L 68 44 H 42 Z" fill="#1C2243" />

              {/* Bottom coral-red triangle */}
              <path d="M 49 49 H 61 L 61 63 Z" fill="#E53E42" />

              {/* Text "Fit" */}
              <text
                x="18"
                y="94"
                fontFamily="system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Outfit', 'Inter', sans-serif"
                fontSize="24"
                fontWeight="800"
                letterSpacing="-0.02em"
                fill="#E53E42"
              >
                Fit
              </text>

              {/* Text "Visor" */}
              <text
                x="52"
                y="94"
                fontFamily="system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Outfit', 'Inter', sans-serif"
                fontSize="24"
                fontWeight="800"
                letterSpacing="-0.02em"
                fill="#1C2243"
              >
                Visor
              </text>
            </svg>
          </Link>
        </div>

        {/* Heading */}
        <h1 className="login-title">Welcome Back</h1>
        <p className="login-subtitle">
          Access your virtual wardrobe and saved 3D try-on looks.
        </p>

        {/* Sign In Form */}
        <form onSubmit={handleSubmit} className="login-form">
          {/* Email input field */}
          <div className="login-input-group">
            <span className="input-icon">
              <svg
                width="18"
                height="18"
                viewBox="0 0 24 24"
                fill="none"
                stroke="#475569"
                strokeWidth="1.8"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <rect width="20" height="16" x="2" y="4" rx="2" />
                <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" />
              </svg>
            </span>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Email address"
              className="login-input"
              required
            />
          </div>

          {/* Password input field */}
          <div className="login-input-group">
            <span className="input-icon">
              <svg
                width="18"
                height="18"
                viewBox="0 0 24 24"
                fill="none"
                stroke="#475569"
                strokeWidth="1.8"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <rect width="18" height="11" x="3" y="11" rx="2" ry="2" />
                <path d="M7 11V7a5 5 0 0 1 10 0v4" />
              </svg>
            </span>
            <input
              type={showPassword ? "text" : "password"}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Password"
              className="login-input"
              required
            />
            <button
              type="button"
              className="password-toggle-btn"
              onClick={() => setShowPassword(!showPassword)}
              aria-label="Toggle password visibility"
            >
              {showPassword ? (
                <svg
                  width="18"
                  height="18"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="#475569"
                  strokeWidth="1.8"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M2 12s3-7 10-7 10 7 10 7-3 7-10 7-10-7-10-7Z" />
                  <circle cx="12" cy="12" r="3" />
                  <line x1="3" y1="3" x2="21" y2="21" />
                </svg>
              ) : (
                <svg
                  width="18"
                  height="18"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="#475569"
                  strokeWidth="1.8"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M2 12s3-7 10-7 10 7 10 7-3 7-10 7-10-7-10-7Z" />
                  <circle cx="12" cy="12" r="3" />
                </svg>
              )}
            </button>
          </div>

          {/* Forgot Password Link */}
          <div className="forgot-password-row">
            <Link href="#forgot" className="forgot-password-link">
              Forgot password?
            </Link>
          </div>

          {/* Sign In CTA Button */}
          <button type="submit" className="login-submit-btn">
            Sign In
          </button>
        </form>

        {/* Or continue with divider */}
        <div className="login-divider-row">
          <span className="divider-label">or continue with</span>
        </div>

        {/* Social Logins */}
        <div className="social-buttons-grid">
          {/* Apple ID */}
          <button type="button" className="social-login-btn">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="#1C2243">
              <path d="M18.71 19.5c-.83 1.24-1.71 2.45-3.05 2.47-1.34.03-1.77-.79-3.29-.79-1.53 0-2 .77-3.27.82-1.31.05-2.3-1.32-3.14-2.53C4.25 17 2.94 12.45 4.7 9.39c.87-1.52 2.43-2.48 4.12-2.51 1.28-.02 2.5.87 3.29.87.78 0 2.26-1.07 3.81-.91.65.03 2.47.26 3.64 1.98-.09.06-2.17 1.28-2.15 3.81.03 3.02 2.65 4.03 2.68 4.04-.03.07-.42 1.44-1.38 2.83M15.97 6.85c.66-.8 1.11-1.92.99-3.04-.96.04-2.11.64-2.8 1.44-.61.7-.87 1.83-.99 2.97 1.08.08 2.15-.57 2.8-1.37z" />
            </svg>
            <span>Apple ID</span>
          </button>

          {/* Google */}
          <button type="button" className="social-login-btn">
            <svg width="18" height="18" viewBox="0 0 24 24">
              <path
                d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                fill="#4285F4"
              />
              <path
                d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                fill="#34A853"
              />
              <path
                d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z"
                fill="#FBBC05"
              />
              <path
                d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z"
                fill="#EA4335"
              />
            </svg>
            <span>Google</span>
          </button>
        </div>

        {/* Sign up prompt footer */}
        <div className="login-card-footer">
          <span>New to Fitvisor?</span>{" "}
          <Link href="/register" className="create-account-link">
            <span>Create an account in 1 minute</span>
            <svg
              width="14"
              height="14"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2.2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M5 12h14" />
              <path d="m12 5 7 7-7 7" />
            </svg>
          </Link>
        </div>
      </div>
    </div>
  );
}
