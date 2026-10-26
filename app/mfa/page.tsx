"use client";

import { useState, useRef, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { useRouter } from "next/navigation";
import Logo from "@/components/Logo";

export default function MFAPage() {
  const router = useRouter();
  const [digits, setDigits] = useState<string[]>(["", "", "", "", "", ""]);
  const [timer, setTimer] = useState<number>(45);
  const [lang, setLang] = useState<"EN" | "FR">("EN");
  const inputRefs = useRef<(HTMLInputElement | null)[]>([]);

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

  // Countdown timer effect
  useEffect(() => {
    if (timer <= 0) return;
    const interval = setInterval(() => {
      setTimer((prev) => (prev > 0 ? prev - 1 : 0));
    }, 1000);
    return () => clearInterval(interval);
  }, [timer]);

  const handleInputChange = (index: number, value: string) => {
    if (value.length > 1) {
      // Handle paste
      const pastedDigits = value.replace(/\D/g, "").slice(0, 6).split("");
      const newDigits = [...digits];
      pastedDigits.forEach((d, i) => {
        newDigits[i] = d;
      });
      setDigits(newDigits);
      const nextIndex = Math.min(pastedDigits.length, 5);
      inputRefs.current[nextIndex]?.focus();
      return;
    }

    const cleanVal = value.replace(/\D/g, "");
    const newDigits = [...digits];
    newDigits[index] = cleanVal;
    setDigits(newDigits);

    if (cleanVal && index < 5) {
      inputRefs.current[index + 1]?.focus();
    }
  };

  const handleKeyDown = (index: number, e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Backspace" && !digits[index] && index > 0) {
      inputRefs.current[index - 1]?.focus();
    }
  };

  const formatTimer = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, "0")}:${secs.toString().padStart(2, "0")}`;
  };

  const handleVerify = (e: React.FormEvent) => {
    e.preventDefault();
    const otp = digits.join("");
    if (otp.length < 6) {
      alert("Please enter the complete 6-digit code.");
      return;
    }
    router.push("/register");
  };

  return (
    <div className="login-page-wrapper">
      {/* Top right language switch */}
      <div className="login-lang-switch">
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

      {/* Main MFA Card */}
      <div className="login-card mfa-card">
        {/* FitVisor Logo */}
        <div className="login-logo-container">
          <Link href="/" title="FitVisor Home">
            <Image
              src="/images/fitvisor_logo_square.png"
              alt="FitVisor"
              width={120}
              height={120}
              priority
              className="login-logo-img"
            />
          </Link>
        </div>

        {/* Shield Icon Badge */}
        <div className="mfa-shield-badge">
          <svg
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="#E53E42"
            strokeWidth="2.1"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
            <rect x="10" y="11" width="4" height="4" rx="1" />
            <path d="M11 11V9a1 1 0 0 1 2 0v2" />
          </svg>
        </div>

        {/* Title & Subtitle */}
        <h1 className="mfa-title">
          Two-Factor Authentication<br />
          (MFA)
        </h1>
        <p className="mfa-subtitle">
          We sent a 6-digit verification code via SMS to<br />
          <span className="mfa-phone-number">+1 (555) ***-8921</span>.
        </p>

        {/* OTP Form */}
        <form onSubmit={handleVerify}>
          {/* 6 Digit Inputs */}
          <div className="otp-inputs-grid">
            {digits.map((digit, index) => (
              <input
                key={index}
                ref={(el) => {
                  inputRefs.current[index] = el;
                }}
                type="text"
                inputMode="numeric"
                maxLength={1}
                value={digit}
                onChange={(e) => handleInputChange(index, e.target.value)}
                onKeyDown={(e) => handleKeyDown(index, e)}
                className={`otp-digit-box ${index === 0 && !digit ? "first-focus" : ""}`}
                autoFocus={index === 0}
              />
            ))}
          </div>

          {/* Resend code timer row */}
          <div className="mfa-timer-row">
            <svg
              width="15"
              height="15"
              viewBox="0 0 24 24"
              fill="none"
              stroke="#64748b"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <circle cx="12" cy="12" r="10" />
              <polyline points="12 6 12 12 16 14" />
            </svg>
            {timer > 0 ? (
              <span>Resend code in {formatTimer(timer)}</span>
            ) : (
              <button
                type="button"
                onClick={() => setTimer(45)}
                className="resend-active-btn"
              >
                Resend code now
              </button>
            )}
          </div>

          {/* Deep Navy Verify Button */}
          <button type="submit" className="mfa-submit-btn">
            <span>Verify and Continue</span>
            <svg
              width="16"
              height="16"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2.3"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M5 12h14" />
              <path d="m12 5 7 7-7 7" />
            </svg>
          </button>
        </form>

        {/* Bottom Security Note */}
        <div className="mfa-footer-note">
          <svg
            width="14"
            height="14"
            viewBox="0 0 24 24"
            fill="none"
            stroke="#64748b"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <rect width="18" height="11" x="3" y="11" rx="2" ry="2" />
            <path d="M7 11V7a5 5 0 0 1 10 0v4" />
          </svg>
          <span>End-to-end encrypted biometric vault / TLS 1.3 compliant</span>
        </div>
      </div>
    </div>
  );
}
