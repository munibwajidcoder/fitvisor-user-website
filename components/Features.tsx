"use client";

export default function Features() {
  const features = [
    {
      pill: "AI Precision",
      pillClass: "feat-pill-coral",
      iconBgClass: "feat-icon-coral",
      title: "Body Scan with AI in 2 Minutes",
      desc: "Centimeter-level precision for your perfect fit without physical measuring tapes.",
      icon: (
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M4 8V5a1 1 0 0 1 1-1h3" />
          <path d="M16 4h3a1 1 0 0 1 1 1v3" />
          <path d="M20 16v3a1 1 0 0 1-1 1h-3" />
          <path d="M8 20H5a1 1 0 0 1-1-1v-3" />
          <circle cx="12" cy="10" r="2.5" />
          <path d="M8.5 17c0-2 1.5-3 3.5-3s3.5 1 3.5 3" />
        </svg>
      ),
    },
    {
      pill: "Neural 3D",
      pillClass: "feat-pill-blue",
      iconBgClass: "feat-icon-blue",
      title: "Realistic Physical Simulation",
      desc: "Fabric drape, wrinkles, folds and dynamic walking movements in fluid real time.",
      icon: (
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M2 12c4-4 8 4 12 0s8 4 8 0" />
          <path d="M2 7c4-4 8 4 12 0s8 4 8 0" />
          <path d="M2 17c4-4 8 4 12 0s8 4 8 0" />
        </svg>
      ),
    },
    {
      pill: "Zero-Knowledge Vault",
      pillClass: "feat-pill-emerald",
      iconBgClass: "feat-icon-emerald",
      title: "Total GDPR Protection",
      desc: "Client-side anonymous mode and biometric photos securely encrypted with AES-256.",
      icon: (
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
          <rect x="10" y="11" width="4" height="4" rx="1" />
          <path d="M11 11V9a1 1 0 0 1 2 0v2" />
        </svg>
      ),
    },
  ];

  return (
    <section id="technology" className="features-section">
      <div className="features-grid">
        {features.map((f, i) => (
          <div key={i} className="feature-card">
            <div className="feature-card-top">
              <div className={`feature-icon-badge ${f.iconBgClass}`}>
                {f.icon}
              </div>
              <span className={`feature-pill-badge ${f.pillClass}`}>
                {f.pill}
              </span>
            </div>

            <h3 className="feature-card-title">
              {f.title}
            </h3>

            <p className="feature-card-desc">
              {f.desc}
            </p>
          </div>
        ))}
      </div>
    </section>
  );
}
