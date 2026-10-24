export default function PartnerBrands() {
  return (
    <section id="brands" className="brands-section">
      <div className="brands-divider-header">
        <span className="brands-divider-title">Compatible with your favorite brands</span>
      </div>

      <div className="brands-logos-grid">
        {/* Zalando */}
        <div className="brand-logo-item" title="Zalando">
          <svg width="135" height="32" viewBox="0 0 135 32" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M12.5 4L2 28H23L12.5 4Z" fill="#111827" />
            <path d="M12.5 4L17 19H8L12.5 4Z" fill="#374151" />
            <text x="32" y="24" fontFamily="Inter, sans-serif" fontSize="22" fontWeight="700" fill="#111827" letterSpacing="-0.03em">
              zalando
            </text>
          </svg>
        </div>

        {/* SHEIN */}
        <div className="brand-logo-item" title="SHEIN">
          <svg width="120" height="32" viewBox="0 0 120 32" fill="none" xmlns="http://www.w3.org/2000/svg">
            <text x="0" y="24" fontFamily="Georgia, serif" fontSize="24" fontWeight="800" fill="#111827" letterSpacing="0.22em">
              SHEIN
            </text>
          </svg>
        </div>

        {/* H&M */}
        <div className="brand-logo-item" title="H&M">
          <svg width="68" height="38" viewBox="0 0 68 38" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path
              d="M6 32L12 8H16L13.5 18H23.5L26 8H30L24 32H20L22.5 22H12.5L10 32H6Z"
              fill="#111827"
            />
            <path
              d="M33 26C33 24 34.5 22 37 21C35.5 20 35 18.5 35 17C35 14.5 37 13 40 13C43.5 13 45 15.5 44 18L41.5 24C41 25.5 41.5 26.5 43 26.5C44.5 26.5 45.5 25.5 46 24L47.5 25C46.5 27 44.5 28.5 42 28.5C39 28.5 37.5 27 38 25L38.5 24C37.5 25.5 35.5 26.5 34 26.5C33.5 26.5 33 26.3 33 26ZM38.5 17C38.5 18 39 19 40.5 19.5L41.5 17C42 16 41.5 15 40 15C39 15 38.5 15.8 38.5 17Z"
              fill="#111827"
            />
            <path
              d="M48 32L54 8H58.5L62 23L65.5 8H70L64 32H59.5L56 17L52.5 32H48Z"
              fill="#111827"
            />
          </svg>
        </div>

        {/* sandro */}
        <div className="brand-logo-item" title="Sandro">
          <svg width="150" height="32" viewBox="0 0 150 32" fill="none" xmlns="http://www.w3.org/2000/svg">
            <text x="0" y="23" fontFamily="Inter, sans-serif" fontSize="20" fontWeight="500" fill="#111827" letterSpacing="0.45em">
              sandro
            </text>
          </svg>
        </div>

        {/* BALMAIN PARIS */}
        <div className="brand-logo-item" title="Balmain Paris">
          <div style={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
            <span style={{ fontFamily: "Inter, sans-serif", fontSize: "20px", fontWeight: "800", letterSpacing: "0.15em", color: "#111827" }}>
              BALMAIN
            </span>
            <span style={{ fontFamily: "Inter, sans-serif", fontSize: "9px", fontWeight: "600", letterSpacing: "0.3em", color: "#475569", marginTop: "1px" }}>
              PARIS
            </span>
          </div>
        </div>
      </div>
    </section>
  );
}
