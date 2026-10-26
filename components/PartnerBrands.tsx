"use client";

export default function PartnerBrands() {
  const brands = [
    {
      name: "Zalando",
      render: () => (
        <svg width="124" height="28" viewBox="0 0 135 32" fill="none" xmlns="http://www.w3.org/2000/svg">
          {/* Authentic Zalando orange accent */}
          <path d="M12.5 4L2 28H23L12.5 4Z" fill="#FF6900" />
          <path d="M12.5 4L17 19H8L12.5 4Z" fill="#E05500" />
          <text x="32" y="24" fontFamily="Inter, system-ui, sans-serif" fontSize="22" fontWeight="700" fill="#0f172a" letterSpacing="-0.03em">
            zalando
          </text>
        </svg>
      ),
    },
    {
      name: "SHEIN",
      render: () => (
        <svg width="110" height="28" viewBox="0 0 120 32" fill="none" xmlns="http://www.w3.org/2000/svg">
          <text x="0" y="24" fontFamily="Georgia, serif" fontSize="23" fontWeight="800" fill="#0f172a" letterSpacing="0.22em">
            SHEIN
          </text>
        </svg>
      ),
    },
    {
      name: "H&M",
      render: () => (
        <svg width="72" height="34" viewBox="0 0 68 38" fill="none" xmlns="http://www.w3.org/2000/svg">
          {/* Authentic H&M vibrant red */}
          <path
            d="M6 32L12 8H16L13.5 18H23.5L26 8H30L24 32H20L22.5 22H12.5L10 32H6Z"
            fill="#E50010"
          />
          <path
            d="M33 26C33 24 34.5 22 37 21C35.5 20 35 18.5 35 17C35 14.5 37 13 40 13C43.5 13 45 15.5 44 18L41.5 24C41 25.5 41.5 26.5 43 26.5C44.5 26.5 45.5 25.5 46 24L47.5 25C46.5 27 44.5 28.5 42 28.5C39 28.5 37.5 27 38 25L38.5 24C37.5 25.5 35.5 26.5 34 26.5C33.5 26.5 33 26.3 33 26ZM38.5 17C38.5 18 39 19 40.5 19.5L41.5 17C42 16 41.5 15 40 15C39 15 38.5 15.8 38.5 17Z"
            fill="#E50010"
          />
          <path
            d="M48 32L54 8H58.5L62 23L65.5 8H70L64 32H59.5L56 17L52.5 32H48Z"
            fill="#E50010"
          />
        </svg>
      ),
    },
    {
      name: "Sandro",
      render: () => (
        <svg width="130" height="28" viewBox="0 0 150 32" fill="none" xmlns="http://www.w3.org/2000/svg">
          <text x="0" y="23" fontFamily="Inter, system-ui, sans-serif" fontSize="20" fontWeight="500" fill="#0f172a" letterSpacing="0.45em">
            sandro
          </text>
        </svg>
      ),
    },
    {
      name: "Balmain Paris",
      render: () => (
        <div style={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
          <span style={{ fontFamily: "Inter, system-ui, sans-serif", fontSize: "19px", fontWeight: "800", letterSpacing: "0.16em", color: "#0f172a", lineHeight: 1.1 }}>
            BALMAIN
          </span>
          <span style={{ fontFamily: "Inter, system-ui, sans-serif", fontSize: "8.5px", fontWeight: "700", letterSpacing: "0.32em", color: "#64748b", marginTop: "2px" }}>
            PARIS
          </span>
        </div>
      ),
    },
  ];

  return (
    <section id="brands" className="brands-section">
      <div className="brands-divider-header">
        <div className="brands-badge-chip">
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#2563eb" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
            <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
          </svg>
          <span className="brands-divider-title">Compatible with your favorite brands</span>
        </div>
      </div>

      <div className="brands-logos-grid">
        {brands.map((b, idx) => (
          <div key={b.name} className={`brand-card-item brand-card-item-${idx + 1}`} title={b.name}>
            {b.render()}
          </div>
        ))}
      </div>
    </section>
  );
}
