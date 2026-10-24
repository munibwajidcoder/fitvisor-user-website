"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import Logo from "@/components/Logo";

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

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    router.push("/privacy");
  };

  return (
    <div className="login-page-wrapper" style={{ padding: "30px 16px" }}>
      <div className="login-card register-card">
        {/* Top FitVisor Logo */}
        <div className="register-logo-row">
          <Logo size="md" />
        </div>

        {/* 3-Step Wizard Indicator */}
        <div className="wizard-steps-row">
          {/* Step 1: Account (Active) */}
          <div className="wizard-step-item active">
            <div className="step-circle active">1</div>
            <span className="step-label active">Account</span>
          </div>

          <div className="step-connector-line" />

          {/* Step 2: Privacy */}
          <div className="wizard-step-item">
            <div className="step-circle">2</div>
            <span className="step-label">Privacy</span>
          </div>

          <div className="step-connector-line" />

          {/* Step 3: Create Avatar */}
          <div className="wizard-step-item">
            <div className="step-circle">3</div>
            <span className="step-label">Create Avatar</span>
          </div>
        </div>

        {/* Section Heading */}
        <div className="register-heading-block">
          <h1 className="register-title">Create Your Fitvisor Profile</h1>
          <p className="register-subtitle">
            Get started with your virtual wardrobe and 3D try-on experience.
          </p>
        </div>

        {/* Registration Form */}
        <form onSubmit={handleSubmit} className="register-form">
          {/* First Name & Last Name (2 Columns) */}
          <div className="register-two-col">
            <div className="form-field-group">
              <label className="field-label">First Name</label>
              <div className="register-input-wrap">
                <span className="reg-icon">
                  <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="#64748b" strokeWidth="1.9" strokeLinecap="round" strokeLinejoin="round">
                    <circle cx="12" cy="8" r="4" />
                    <path d="M6 21v-2a4 4 0 0 1 4-4h4a4 4 0 0 1 4 4v2" />
                  </svg>
                </span>
                <input
                  type="text"
                  placeholder="Enter your first name"
                  value={firstName}
                  onChange={(e) => setFirstName(e.target.value)}
                  className="reg-input"
                  required
                />
              </div>
            </div>

            <div className="form-field-group">
              <label className="field-label">Last Name</label>
              <div className="register-input-wrap">
                <span className="reg-icon">
                  <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="#64748b" strokeWidth="1.9" strokeLinecap="round" strokeLinejoin="round">
                    <circle cx="12" cy="8" r="4" />
                    <path d="M6 21v-2a4 4 0 0 1 4-4h4a4 4 0 0 1 4 4v2" />
                  </svg>
                </span>
                <input
                  type="text"
                  placeholder="Enter your last name"
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
            <label className="field-label">Email address</label>
            <div className="register-input-wrap">
              <span className="reg-icon">
                <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="#64748b" strokeWidth="1.9" strokeLinecap="round" strokeLinejoin="round">
                  <rect width="20" height="16" x="2" y="4" rx="2" />
                  <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" />
                </svg>
              </span>
              <input
                type="email"
                placeholder="you@example.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="reg-input"
                required
              />
            </div>
          </div>

          {/* Password */}
          <div className="form-field-group">
            <label className="field-label">Password</label>
            <div className="register-input-wrap">
              <span className="reg-icon">
                <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="#64748b" strokeWidth="1.9" strokeLinecap="round" strokeLinejoin="round">
                  <rect width="18" height="11" x="3" y="11" rx="2" ry="2" />
                  <path d="M7 11V7a5 5 0 0 1 10 0v4" />
                </svg>
              </span>
              <input
                type={showPassword ? "text" : "password"}
                placeholder="Create a strong password"
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
                Password strength: <span className="weak-label">Weak</span>
              </span>
            </div>
          </div>

          {/* Date of Birth */}
          <div className="form-field-group">
            <label className="field-label">Date of Birth</label>
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
                  <option value="">Day</option>
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
                  <option value="">Month</option>
                  {["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"].map((m, idx) => (
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
                  <option value="">Year</option>
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
              <span className="notice-title">Compliance Notice:</span>
              <p className="notice-desc">
                Fitvisor is strictly reserved for users aged 16+ for biometric and body data processing.
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
            <span>Continue to Privacy Consent</span>
            <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.3" strokeLinecap="round" strokeLinejoin="round">
              <path d="M5 12h14" />
              <path d="m12 5 7 7-7 7" />
            </svg>
          </button>
        </form>

        {/* Footer Link */}
        <div className="register-card-footer">
          <span>Already have an account?</span>{" "}
          <Link href="/login" className="reg-signin-link">
            Sign In
          </Link>
        </div>
      </div>
    </div>
  );
}
