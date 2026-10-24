export default function Features() {
  return (
    <section id="technology" className="features-section">
      <div className="features-grid">
        {/* Feature 1 */}
        <div className="feature-card">
          <div className="feature-icon-badge">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#1e293b" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
              {/* Brackets */}
              <path d="M4 8V5a1 1 0 0 1 1-1h3" />
              <path d="M16 4h3a1 1 0 0 1 1 1v3" />
              <path d="M20 16v3a1 1 0 0 1-1 1h-3" />
              <path d="M8 20H5a1 1 0 0 1-1-1v-3" />
              {/* Person inside */}
              <circle cx="12" cy="10" r="2.5" />
              <path d="M8.5 17c0-2 1.5-3 3.5-3s3.5 1 3.5 3" />
            </svg>
          </div>
          <h3 className="feature-card-title">
            Body Scan with AI<br />in 2 Minutes
          </h3>
          <p className="feature-card-desc">
            Centimeter-level precision<br />for your perfect fit.
          </p>
        </div>

        {/* Feature 2 */}
        <div className="feature-card">
          <div className="feature-icon-badge">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#1e293b" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
              <path d="M2 12c4-4 8 4 12 0s8 4 8 0" />
              <path d="M2 7c4-4 8 4 12 0s8 4 8 0" />
              <path d="M2 17c4-4 8 4 12 0s8 4 8 0" />
            </svg>
          </div>
          <h3 className="feature-card-title">
            Realistic Physical Simulation
          </h3>
          <p className="feature-card-desc">
            Fabric drape, folds and movements<br />in real time.
          </p>
        </div>

        {/* Feature 3 */}
        <div className="feature-card">
          <div className="feature-icon-badge">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#1e293b" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
              <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
              <rect x="10" y="11" width="4" height="4" rx="1" />
              <path d="M11 11V9a1 1 0 0 1 2 0v2" />
            </svg>
          </div>
          <h3 className="feature-card-title">
            Total GDPR Protection
          </h3>
          <p className="feature-card-desc">
            Anonymous mode and<br />encrypted photos.
          </p>
        </div>
      </div>
    </section>
  );
}
