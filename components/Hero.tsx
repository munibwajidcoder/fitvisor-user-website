"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";

export default function Hero() {
  const [selectedItem, setSelectedItem] = useState<number>(0);

  const wardrobeItems = [
    { id: 0, name: "Model Avatar", img: "/images/model_face.jpg", alt: "Model Face Portrait" },
    { id: 1, name: "Navy Blazer", img: "/images/blazer.jpg", alt: "Navy Tailored Blazer" },
    { id: 2, name: "Cream Chinos", img: "/images/pants.jpg", alt: "Cream Chino Trousers" },
    { id: 3, name: "White Sneakers", img: "/images/shoes.jpg", alt: "White Leather Sneakers" },
  ];

  // Each wardrobe item shows a different measurement in the floating card
  const cardData = [
    { label: "Height", value: "182 cm", accuracy: "99%", fill: 99 },
    { label: "Shoulders", value: "42 cm", accuracy: "99%", fill: 99 },
    { label: "Waist", value: "74 cm", accuracy: "97%", fill: 97 },
    { label: "Foot Length", value: "27 cm", accuracy: "98%", fill: 98 },
  ];

  const active = cardData[selectedItem];

  return (
    <section className="hero-section">
      {/* Left: Copy / CTA */}
      <div className="hero-content">
        <h1 className="hero-title">
          Virtual Try-On<br />
          with True Precision.<br />
          <span className="serif-accent">No Compromises.</span>
        </h1>
        <p className="hero-description">
          Your ultra-realistic 3D digital twin, generated from just 3 photos.
          Say goodbye to 70% of online returns.
        </p>
        <div className="hero-actions">
          <Link href="/login" className="btn-start-scan">
            <span>Start Free 3D Scan</span>
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <path d="M5 12h14" />
              <path d="m12 5 7 7-7 7" />
            </svg>
          </Link>
          <button className="btn-explore-demo">
            <span className="play-icon-badge">
              <svg width="11" height="11" viewBox="0 0 24 24" fill="#1e293b">
                <polygon points="5 3 19 12 5 21 5 3" />
              </svg>
            </span>
            <span>Explore Demo</span>
          </button>
        </div>
      </div>

      {/* Right: 3D Capsule Visual */}
      <div className="hero-visual-container">
        <div className="capsule-ambient-glow" />

        {/* Left wardrobe thumbnails */}
        <div className="wardrobe-selector-column">
          {wardrobeItems.map((item) => (
            <div
              key={item.id}
              className={`selector-thumb-card ${selectedItem === item.id ? "active" : ""}`}
              onClick={() => setSelectedItem(item.id)}
              title={item.name}
              role="button"
              tabIndex={0}
              onKeyDown={(e) => e.key === "Enter" && setSelectedItem(item.id)}
            >
              <Image
                src={item.img}
                alt={item.alt}
                width={56}
                height={56}
                priority
                style={{ width: "100%", height: "100%", objectFit: "cover", borderRadius: "10px" }}
              />
            </div>
          ))}
        </div>

        {/* Center 3D capsule pod */}
        <div className="capsule-pod-wrapper">
          <div className="capsule-glass-dome">
            <Image
              src="/images/avatar_capsule.jpg"
              alt="3D Digital Twin Avatar in Glass Capsule"
              width={340}
              height={540}
              className="capsule-main-image"
              priority
              style={{ width: "100%", height: "100%", objectFit: "cover", objectPosition: "center 20%" }}
            />
          </div>

          {/* Orbit ring */}
          <div className="orbit-rotation-ring">
            <div className="orbit-arrow-indicator" />
          </div>

          {/* 360° base pill */}
          <div className="capsule-podium-base">
            <span style={{ display: "inline-flex", transform: "scaleX(-1)" }}>
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.3" strokeLinecap="round" strokeLinejoin="round">
                <path d="M21 12a9 9 0 1 1-9-9c2.52 0 4.93 1 6.74 2.74L21 8" />
                <path d="M21 3v5h-5" />
              </svg>
            </span>
            <span>360°</span>
            <span style={{ display: "inline-flex" }}>
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.3" strokeLinecap="round" strokeLinejoin="round">
                <path d="M21 12a9 9 0 1 1-9-9c2.52 0 4.93 1 6.74 2.74L21 8" />
                <path d="M21 3v5h-5" />
              </svg>
            </span>
          </div>
        </div>

        {/* Right floating fit accuracy card */}
        <div className="fit-accuracy-floating-card">
          <div className="fit-card-thumb">
            <Image
              src={wardrobeItems[selectedItem].img}
              alt="Selected garment"
              width={46}
              height={50}
              style={{ width: "100%", height: "100%", objectFit: "cover" }}
            />
          </div>
          <div className="fit-card-details">
            <span className="fit-card-measurement">{active.label}: {active.value}</span>
            <div className="fit-card-accuracy-row">
              <span>Fit Accuracy</span>
              <span className="fit-card-accuracy-val">{active.accuracy}</span>
            </div>
            <div className="fit-progress-bar-bg">
              <div className="fit-progress-bar-fill" style={{ width: `${active.fill}%` }} />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
