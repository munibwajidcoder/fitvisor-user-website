"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import Logo from "@/components/Logo";

export default function ProfilePage() {
  const router = useRouter();

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

  const translations = {
    EN: {
      navHome: "Home",
      navCatalog: "Catalog",
      navStudio: "3D Studio",
      navWardrobe: "Wardrobe",
      navPricing: "Plans",
      searchPlaceholder: "Search brands, styles, or items...",
      cartTitle: "Cart",
      profileTitle: "User Profile",
      proMember: "Pro Member",
      lastScan: "Last 3D Scan: Oct 20, 2026",
      qualityScore: "Quality Score 98%",
      recalibrate: "Recalibrate My 3D Avatar",
      stylePrefTitle: "Style Preferences",
      stylePrefSub: "Your style, fit and appearance preferences",
      stockAlertsTitle: "Stock & Size Alerts",
      stockAlertsSub: "Get notified when your size or favorite items are back",
      invoiceHistoryTitle: "Payment & Invoice History",
      invoiceHistorySub: "View your transactions and download invoices",
      subscriptionPlanTitle: "Subscription & VIP Plans",
      subscriptionPlanSub: "Manage boutique tier, unlock unlimited 3D scans & early drops",
      viewPlans: "View Plans",
      vaultTitle: "Privacy & Biometric Data Vault",
      vaultSub: "Your data, your control. We follow full GDPR compliance and keep your biometric information safe and private.",
      anonymousTitle: "Anonymous Mode",
      anonymousSub: "Blur your face in community style feed to stay private.",
      anonymousToggleSub: "Blur face in community style feed",
      dataRightsTitle: "Data Rights Actions",
      gdprNotice: "Full GDPR compliance",
      exportDataTitle: "Export All Biometric Data",
      exportDataSub: "Download JSON & 3D OBJ Mesh",
      deleteAccountTitle: "Delete Account & Data",
      deleteAccountSub: "Permanently erase biometric profile and models",
      manageConsentsTitle: "Manage AI Processing Consents",
      manageConsentsSub: "Control how your data is used for AI improvements",
      manageConsentsBtn: "Manage Consents",
      downloadBtn: "Download",
      forgottenTitle: "Right to be Forgotten",
      forgottenSub: "Permanently delete account and all 3D body meshes",
      deleteBtn: "Delete Personal Data & Account",
      aiConsentsTitle: "AI Modeling Consents",
      aiTraining: "Allow anonymized scans to improve virtual drape precision",
      meshFitting: "Allow real-time parametric deformation for garment fit",
      connectedAccounts: "Connected Fashion Accounts",
      connectedSub: "Auto-sync order sizes & preferences with luxury partner brands",
      zalandoSync: "Zalando EU Account",
      zalandoStatus: "Synced • Size 38 (FR/EU)",
      hmSync: "H&M Member Club",
      hmStatus: "Synced • Standard Fit Profile",
    },
    FR: {
      navHome: "Accueil",
      navCatalog: "Catalogue",
      navStudio: "Studio 3D",
      navWardrobe: "Garde-robe",
      navPricing: "Tarifs",
      searchPlaceholder: "Rechercher des marques, styles...",
      cartTitle: "Panier",
      profileTitle: "Profil utilisateur",
      proMember: "Membre Pro",
      lastScan: "Dernier scan 3D : 20 oct. 2026",
      qualityScore: "Score de qualité 98%",
      recalibrate: "Recalibrer mon avatar 3D",
      stylePrefTitle: "Préférences de style",
      stylePrefSub: "Vos préférences de style, coupe et silhouette",
      stockAlertsTitle: "Alertes stock & taille",
      stockAlertsSub: "Soyez alerté du retour de votre taille ou articles favoris",
      invoiceHistoryTitle: "Historique des paiements & factures",
      invoiceHistorySub: "Consultez vos transactions et téléchargez vos factures",
      subscriptionPlanTitle: "Abonnement & Formules VIP",
      subscriptionPlanSub: "Gérez votre statut boutique, débloquez les scans 3D illimités",
      viewPlans: "Voir les offres",
      vaultTitle: "Coffre de données biométriques & Confidentialité",
      vaultSub: "Vos données, votre contrôle. Conformité totale au RGPD avec sécurisation maximale de vos données biométriques.",
      anonymousTitle: "Mode anonyme",
      anonymousSub: "Floutez votre visage dans le flux communautaire pour préserver votre vie privée.",
      anonymousToggleSub: "Flouter le visage dans le flux",
      dataRightsTitle: "Actions sur vos données personnelles",
      gdprNotice: "Conformité totale RGPD",
      exportDataTitle: "Exporter les données biométriques",
      exportDataSub: "Télécharger le maillage 3D OBJ & fichier JSON",
      deleteAccountTitle: "Supprimer le compte & données",
      deleteAccountSub: "Effacer définitivement votre profil biométrique et modèles 3D",
      manageConsentsTitle: "Gérer les consentements IA",
      manageConsentsSub: "Contrôlez l'utilisation de vos données pour l'IA",
      manageConsentsBtn: "Gérer les consentements",
      downloadBtn: "Télécharger",
      forgottenTitle: "Droit à l'oubli",
      forgottenSub: "Supprimer définitivement le compte et les maillages 3D",
      deleteBtn: "Supprimer mes données & mon compte",
      aiConsentsTitle: "Consentements modélisation IA",
      aiTraining: "Autoriser l'amélioration anonymisée du drapé virtuel",
      meshFitting: "Autoriser la déformation paramétrique en temps réel",
      connectedAccounts: "Comptes de mode connectés",
      connectedSub: "Synchronisation automatique des tailles avec les marques partenaires",
      zalandoSync: "Compte Zalando UE",
      zalandoStatus: "Synchronisé • Taille 38 (FR/UE)",
      hmSync: "Club Membre H&M",
      hmStatus: "Synchronisé • Profil coupe standard",
    },
  };

  const t = translations[lang];

  // Search input state
  const [searchQuery, setSearchQuery] = useState("");

  // Anonymous Mode toggle state (true by default as shown in reference screenshot)
  const [anonymousMode, setAnonymousMode] = useState(true);

  // Modals state for enhanced interactive functionality
  const [showConsentModal, setShowConsentModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [showStyleModal, setShowStyleModal] = useState(false);
  const [showAlertsModal, setShowAlertsModal] = useState(false);
  const [showInvoiceModal, setShowInvoiceModal] = useState(false);
  const [showAvatarMenu, setShowAvatarMenu] = useState(false);

  // Style Preferences State
  const [preferredFit, setPreferredFit] = useState("Slim Fit");
  const [preferredAesthetic, setPreferredAesthetic] = useState("Modern Tailoring");
  const [preferredPalette, setPreferredPalette] = useState("Neutrals & Pastels");

  // Stock Alerts State
  const [alerts, setAlerts] = useState([
    { id: 1, title: "Balmain Double-Breasted Blazer (Size 38)", active: true, stock: "In Stock" },
    { id: 2, title: "Zalando Wool Tailored Pants (Size 36)", active: true, stock: "Back Soon" },
    { id: 3, title: "Sandro Silk Evening Top (Size M)", active: false, stock: "Low Stock" }
  ]);

  const toggleAlert = (id: number) => {
    setAlerts(prev => prev.map(a => a.id === id ? { ...a, active: !a.active } : a));
  };

  // AI Consents State
  const [consentAiTraining, setConsentAiTraining] = useState(false);
  const [consentMeshFitting, setConsentMeshFitting] = useState(true);
  const [actionNotice, setActionNotice] = useState<string | null>(null);

  const showNotification = (msg: string) => {
    setActionNotice(msg);
    setTimeout(() => setActionNotice(null), 3500);
  };

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      router.push(`/catalog?q=${encodeURIComponent(searchQuery.trim())}`);
    }
  };

  // Trigger Biometric Data JSON download
  const handleExportData = () => {
    const biometricData = {
      user: "Sophie Laurent",
      email: "sophie.laurent@example.com",
      status: "Pro Member",
      lastScanDate: "2026-10-20",
      qualityScore: "98%",
      biometrics: {
        heightCm: 174,
        bustCm: 88,
        waistCm: 68,
        hipsCm: 94,
        shoulderWidthCm: 39,
        inseamCm: 81
      },
      avatarMesh: {
        vertexCount: 42180,
        polygonCount: 84360,
        format: "OBJ/GLB",
        anonymousModeActive: anonymousMode
      },
      compliance: {
        gdprCompliant: true,
        vaultEncryption: "AES-256",
        exportTimestamp: new Date().toISOString()
      }
    };

    const blob = new Blob([JSON.stringify(biometricData, null, 2)], { type: "application/json" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "sophie_laurent_biometric_data.json";
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);

    showNotification("Biometric vault data successfully exported (JSON & 3D mesh specs).");
  };

  // Download Invoice PDF/Text
  const handleDownloadInvoice = (invNum: string, amount: string, item: string) => {
    const content = `FITVISOR OFFICIAL INVOICE RECEIPT\n=================================\nInvoice Number: ${invNum}\nCustomer: Sophie Laurent (sophie.laurent@example.com)\nDate: Oct 20, 2026\nItem: ${item}\nTotal Amount: ${amount}\nPayment Status: PAID (Verified 3D Virtual Try-On)\nGDPR Reference: FIT-GDPR-EU-2026\n=================================\nThank you for choosing FitVisor.`;
    const blob = new Blob([content], { type: "text/plain" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `${invNum}_Receipt.txt`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
    showNotification(`Invoice ${invNum} downloaded successfully.`);
  };

  // Handle Account Deletion Confirmation
  const handleConfirmDeletion = () => {
    setShowDeleteModal(false);
    showNotification("Account & Biometric Data scheduled for deletion. Signing out...");
    setTimeout(() => {
      router.push("/");
    }, 1200);
  };

  return (
    <div className="prf-page-wrapper">
      <div className="prf-container">
        {/* ================= HEADER / NAVBAR ================= */}
        <header className="cat-navbar" style={{ marginBottom: "26px" }}>
          <div className="cat-nav-brand">
            <Logo size="md" href="/home" />
          </div>

          <nav className="cat-nav-menu">
            <Link href="/home" className="cat-nav-item">
              {t.navHome}
            </Link>
            <Link href="/catalog" className="cat-nav-item">
              {t.navCatalog}
            </Link>
            <Link href="/3d-studio" className="cat-nav-item">
              {t.navStudio}
            </Link>
            <Link href="/wardrobe" className="cat-nav-item">
              {t.navWardrobe}
            </Link>
          </nav>

          {/* Search Bar - Desktop Right / Row 2 (Mobile) */}
          <form onSubmit={handleSearchSubmit} className="cat-search-pill" style={{ display: "flex", alignItems: "center" }}>
            <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="#94a3b8" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
              <circle cx="11" cy="11" r="8" />
              <line x1="21" y1="21" x2="16.65" y2="16.65" />
            </svg>
            <input
              type="text"
              placeholder={t.searchPlaceholder}
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="cat-search-input"
            />
          </form>

          {/* Action Icons Cluster: Lang Switch, Cart, Profile - Row 1 Right */}
          <div className="cat-nav-actions">
            {/* Language Switch */}
            <div className="fv-lang-switch">
              <button
                type="button"
                id="prf-lang-btn-en"
                onClick={() => changeLang("EN")}
                className={`lang-btn ${lang === "EN" ? "active" : ""}`}
              >
                EN
              </button>
              <span className="lang-pipe">|</span>
              <button
                type="button"
                id="prf-lang-btn-fr"
                onClick={() => changeLang("FR")}
                className={`lang-btn ${lang === "FR" ? "active" : ""}`}
              >
                FR
              </button>
            </div>

            <Link href="/cart" className="cat-cart-btn" title={t.cartTitle} style={{ textDecoration: "none" }}>
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#64748b" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <circle cx="8" cy="21" r="1" />
                <circle cx="19" cy="21" r="1" />
                <path d="M2.05 2.05h2l2.66 12.42a2 2 0 0 0 2 1.58h9.78a2 2 0 0 0 1.95-1.57l1.65-7.43H5.12" />
              </svg>
              <span className="cat-cart-badge">1</span>
            </Link>

            {/* Profile Avatar with Dropdown Toggle */}
            <div style={{ position: "relative" }}>
              <div 
                onClick={() => setShowAvatarMenu(!showAvatarMenu)}
                className="cat-user-avatar-wrap" 
                style={{ display: "flex", alignItems: "center", gap: "4px", cursor: "pointer" }}
                title="Profile Menu"
              >
                <Image
                  src="/images/model_face.jpg"
                  alt="User Profile"
                  width={32}
                  height={32}
                  className="cat-user-avatar-img"
                />
                <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="#64748b" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <polyline points="6 9 12 15 18 9"></polyline>
                </svg>
              </div>

              {/* Quick Profile Dropdown Menu */}
              {showAvatarMenu && (
                <div style={{
                  position: "absolute",
                  top: "40px",
                  right: 0,
                  backgroundColor: "#ffffff",
                  border: "1px solid #e2e8f0",
                  borderRadius: "14px",
                  boxShadow: "0 10px 25px rgba(0,0,0,0.1)",
                  padding: "10px",
                  width: "210px",
                  zIndex: 200,
                  display: "flex",
                  flexDirection: "column",
                  gap: "6px"
                }}>
                  <div style={{ padding: "6px 8px", borderBottom: "1px solid #f1f5f9" }}>
                    <div style={{ fontSize: "13px", fontWeight: 700, color: "#0f224a" }}>Sophie Laurent</div>
                    <div style={{ fontSize: "11px", color: "#16a34a", fontWeight: 600 }}>Pro Member Active</div>
                  </div>
                  <Link 
                    href="/profile" 
                    onClick={() => setShowAvatarMenu(false)}
                    style={{ padding: "8px 10px", fontSize: "12.5px", color: "#334155", textDecoration: "none", borderRadius: "8px", display: "flex", alignItems: "center", gap: "8px" }}
                  >
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="12" cy="7" r="4"/><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/></svg>
                    Profile &amp; Vault
                  </Link>
                  <Link 
                    href="/3d-studio" 
                    onClick={() => setShowAvatarMenu(false)}
                    style={{ padding: "8px 10px", fontSize: "12.5px", color: "#334155", textDecoration: "none", borderRadius: "8px", display: "flex", alignItems: "center", gap: "8px" }}
                  >
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect x="2" y="3" width="20" height="14" rx="2"/><line x1="8" y1="21" x2="16" y2="21"/><line x1="12" y1="17" x2="12" y2="21"/></svg>
                    3D Virtual Studio
                  </Link>
                  <Link 
                    href="/wardrobe" 
                    onClick={() => setShowAvatarMenu(false)}
                    style={{ padding: "8px 10px", fontSize: "12.5px", color: "#334155", textDecoration: "none", borderRadius: "8px", display: "flex", alignItems: "center", gap: "8px" }}
                  >
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M16 7a4 4 0 0 0-8 0v1"/><path d="M2 17l10-8 10 8H2z"/></svg>
                    My 3D Wardrobe
                  </Link>
                  <div style={{ height: "1px", backgroundColor: "#f1f5f9", margin: "2px 0" }} />
                  <Link 
                    href="/" 
                    onClick={() => {
                      setShowAvatarMenu(false);
                      showNotification("Signed out successfully. Welcome back to FitVisor!");
                    }}
                    style={{ padding: "8px 10px", fontSize: "12.5px", color: "#ef4444", textDecoration: "none", borderRadius: "8px", display: "flex", alignItems: "center", gap: "8px", fontWeight: 600 }}
                  >
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"/><polyline points="16 17 21 12 16 7"/><line x1="21" y1="12" x2="9" y2="12"/></svg>
                    Sign Out to Landing
                  </Link>
                </div>
              )}
            </div>
          </div>
        </header>

        {/* Global Toast Notification */}
        {actionNotice && (
          <div style={{
            position: "fixed",
            top: "24px",
            right: "24px",
            backgroundColor: "#0f224a",
            color: "#ffffff",
            padding: "12px 20px",
            borderRadius: "10px",
            fontSize: "13px",
            fontWeight: 600,
            boxShadow: "0 6px 20px rgba(0,0,0,0.15)",
            zIndex: 999,
            display: "flex",
            alignItems: "center",
            gap: "10px",
            animation: "fadeIn 0.2s ease"
          }}>
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#38bdf8" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <path d="M20 6L9 17l-5-5"></path>
            </svg>
            {actionNotice}
          </div>
        )}

        {/* ================= 2-COLUMN PROFILE & VAULT GRID ================= */}
        <div className="prf-layout-grid">
          
          {/* ================= LEFT COLUMN: USER PROFILE CARD ================= */}
          <div className="prf-card">
            
            {/* User Details Row */}
            <div className="prf-user-row">
              <div className="prf-avatar-wrap">
                <Image
                  src="/images/model_face.jpg"
                  alt="Sophie Laurent Profile Picture"
                  width={80}
                  height={80}
                  className="prf-avatar-img"
                  priority
                />
              </div>

              <div className="prf-user-info">
                <h1 className="prf-user-name">Sophie Laurent</h1>
                <div className="prf-user-email">
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#64748b" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <rect width="20" height="16" x="2" y="4" rx="2"></rect>
                    <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7"></path>
                  </svg>
                  <span>sophie.laurent@example.com</span>
                </div>
                <Link href="/pricing" style={{ textDecoration: "none" }} title="View Pro Membership Benefits">
                  <div className="prf-pro-badge" style={{ cursor: "pointer" }}>
                    <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="#16a34a" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                      <path d="m2 4 3 12h14l3-12-6 7-4-7-4 7-6-7zm3 16h14"></path>
                    </svg>
                    <span>{t.proMember}</span>
                  </div>
                </Link>
              </div>
            </div>

            {/* 3D Scan Bar */}
            <div className="prf-scan-bar">
              <div className="prf-scan-left">
                <div className="prf-scan-icon-wrap">
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#1e3a8a" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M3 7V5a2 2 0 0 1 2-2h2"></path>
                    <path d="M17 3h2a2 2 0 0 1 2 2v2"></path>
                    <path d="M21 17v2a2 2 0 0 1-2 2h-2"></path>
                    <path d="M7 21H5a2 2 0 0 1-2-2v-2"></path>
                    <circle cx="12" cy="12" r="3"></circle>
                    <path d="M12 16v1"></path>
                    <path d="M12 7v1"></path>
                  </svg>
                </div>
                <div className="prf-scan-texts">
                  <div className="prf-scan-title">{t.lastScan}</div>
                  <div className="prf-scan-score">{t.qualityScore}</div>
                </div>
              </div>

              <div className="prf-scan-divider" />

              <Link href="/3d-studio" className="prf-recalibrate-btn" title="Launch 3D Calibration Studio">
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#2563eb" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M21.5 2v6h-6M2.5 22v-6h6M2 11.5a10 10 0 0 1 18.8-4.3M22 12.5a10 10 0 0 1-18.8 4.2"/>
                </svg>
                <span>{t.recalibrate}</span>
              </Link>
            </div>

            {/* Navigation Menu Cards including Subscription Plan */}
            <div className="prf-menu-list">
              
              {/* Item 1: Style Preferences */}
              <div 
                className="prf-menu-item"
                onClick={() => setShowStyleModal(true)}
                title="Configure Style Preferences"
                style={{ cursor: "pointer" }}
              >
                <div className="prf-menu-left">
                  <svg className="prf-menu-icon" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#1e3a8a" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path>
                    <circle cx="12" cy="7" r="4"></circle>
                  </svg>
                  <div className="prf-menu-title-group">
                    <h3 className="prf-menu-title">{t.stylePrefTitle}</h3>
                    <p className="prf-menu-sub">{t.stylePrefSub} ({preferredFit})</p>
                  </div>
                </div>
                <svg className="prf-menu-chevron" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#2563eb" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round">
                  <polyline points="9 18 15 12 9 6"></polyline>
                </svg>
              </div>

              {/* Item 2: Stock & Size Alerts */}
              <div 
                className="prf-menu-item"
                onClick={() => setShowAlertsModal(true)}
                title="Manage Stock & Size Alerts"
                style={{ cursor: "pointer" }}
              >
                <div className="prf-menu-left">
                  <svg className="prf-menu-icon" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#1e3a8a" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9"></path>
                    <path d="M13.73 21a2 2 0 0 1-3.46 0"></path>
                  </svg>
                  <div className="prf-menu-title-group">
                    <h3 className="prf-menu-title">{t.stockAlertsTitle}</h3>
                    <p className="prf-menu-sub">{t.stockAlertsSub} ({alerts.filter(a => a.active).length} active)</p>
                  </div>
                </div>
                <svg className="prf-menu-chevron" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#2563eb" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round">
                  <polyline points="9 18 15 12 9 6"></polyline>
                </svg>
              </div>

              {/* Item 3: Payment & Invoice History */}
              <div 
                onClick={() => setShowInvoiceModal(true)}
                className="prf-menu-item"
                title="View Invoices & Transaction History"
                style={{ cursor: "pointer" }}
              >
                <div className="prf-menu-left">
                  <svg className="prf-menu-icon" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#1e3a8a" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <rect width="20" height="14" x="2" y="5" rx="2"></rect>
                    <line x1="2" x2="22" y1="10" y2="10"></line>
                  </svg>
                  <div className="prf-menu-title-group">
                    <h3 className="prf-menu-title">{t.invoiceHistoryTitle}</h3>
                    <p className="prf-menu-sub">{t.invoiceHistorySub}</p>
                  </div>
                </div>
                <svg className="prf-menu-chevron" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#2563eb" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round">
                  <polyline points="9 18 15 12 9 6"></polyline>
                </svg>
              </div>

              {/* Item 4: Subscription & VIP Plan */}
              <Link 
                href="/pricing"
                className="prf-menu-item"
                title="Manage Subscription & VIP Plan"
                style={{ cursor: "pointer", textDecoration: "none" }}
              >
                <div className="prf-menu-left">
                  <svg className="prf-menu-icon" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#e11d48" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"></polygon>
                  </svg>
                  <div className="prf-menu-title-group">
                    <h3 className="prf-menu-title">{t.subscriptionPlanTitle}</h3>
                    <p className="prf-menu-sub">{t.subscriptionPlanSub}</p>
                  </div>
                </div>
                <svg className="prf-menu-chevron" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#2563eb" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round">
                  <polyline points="9 18 15 12 9 6"></polyline>
                </svg>
              </Link>

            </div>

          </div>

          {/* ================= RIGHT COLUMN: PRIVACY & BIOMETRIC VAULT ================= */}
          <div className="prf-vault-card">
            
            {/* Vault Header */}
            <div className="prf-vault-header">
              <svg className="prf-vault-lock-icon" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="#1e3a8a" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <rect width="18" height="11" x="3" y="11" rx="2" ry="2"></rect>
                <path d="M7 11V7a5 5 0 0 1 10 0v4"></path>
              </svg>
              <div className="prf-vault-title-group">
                <h2 className="prf-vault-title">{t.vaultTitle}</h2>
                <p className="prf-vault-sub">{t.vaultSub}</p>
              </div>
            </div>

            {/* Anonymous Mode Card */}
            <div className="prf-anon-card">
              <div className="prf-anon-top-row">
                <div className="prf-anon-left">
                  <svg className="prf-anon-icon" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#1e3a8a" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"></path>
                    <path d="m9 12 2 2 4-4"></path>
                  </svg>
                  <div className="prf-anon-title-group">
                    <h3 className="prf-anon-title">{t.anonymousTitle}</h3>
                    <p className="prf-anon-sub">{t.anonymousSub}</p>
                  </div>
                </div>

                <div className="prf-switch-wrap">
                  <label className="prf-switch">
                    <input 
                      type="checkbox" 
                      checked={anonymousMode} 
                      onChange={(e) => {
                        setAnonymousMode(e.target.checked);
                        showNotification(
                          e.target.checked
                            ? "Anonymous Mode enabled"
                            : "Anonymous Mode disabled"
                        );
                      }} 
                    />
                    <span className="prf-slider"></span>
                  </label>
                </div>
              </div>

              {/* Subtext aligned right under toggle switch as in screenshot */}
              <div style={{ textAlign: "right", marginTop: "2px" }}>
                <span style={{ fontSize: "10.5px", color: "#2563eb", fontWeight: 500 }}>
                  {t.anonymousToggleSub}
                </span>
              </div>
            </div>

            {/* Data Rights Actions */}
            <div className="prf-rights-group">
              <div className="prf-rights-header">
                <svg className="prf-rights-icon" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#1e3a8a" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path>
                  <polyline points="14 2 14 8 20 8"></polyline>
                  <line x1="16" y1="13" x2="8" y2="13"></line>
                  <line x1="16" y1="17" x2="8" y2="17"></line>
                  <polyline points="10 9 9 9 8 9"></polyline>
                </svg>
                <div className="prf-rights-title-group">
                  <h3 className="prf-rights-title">{t.dataRightsTitle}</h3>
                  <span className="prf-rights-sub">{t.gdprNotice}</span>
                </div>
              </div>

              {/* Row 1: Export All Biometric Data */}
              <div className="prf-action-card">
                <div className="prf-action-left">
                  <div style={{
                    width: "32px",
                    height: "32px",
                    borderRadius: "50%",
                    background: "#eff6ff",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    flexShrink: 0
                  }}>
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#1e3a8a" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path>
                      <polyline points="7 10 12 15 17 10"></polyline>
                      <line x1="12" y1="15" x2="12" y2="3"></line>
                    </svg>
                  </div>
                  <div className="prf-action-title-group">
                    <h4 className="prf-action-title">{t.exportDataTitle}</h4>
                    <p className="prf-action-sub">{t.exportDataSub}</p>
                  </div>
                </div>

                <button 
                  type="button" 
                  onClick={handleExportData} 
                  className="prf-action-btn-download"
                >
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#2563eb" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path>
                    <polyline points="7 10 12 15 17 10"></polyline>
                    <line x1="12" y1="15" x2="12" y2="3"></line>
                  </svg>
                  <span>{t.downloadBtn}</span>
                  <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="#2563eb" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round">
                    <polyline points="9 18 15 12 9 6"></polyline>
                  </svg>
                </button>
              </div>

              {/* Row 2: Manage AI Processing Consents */}
              <div className="prf-action-card">
                <div className="prf-action-left">
                  <div style={{
                    width: "32px",
                    height: "32px",
                    borderRadius: "50%",
                    background: "#eff6ff",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    flexShrink: 0
                  }}>
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#1e3a8a" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"></path>
                      <path d="m9 12 2 2 4-4"></path>
                    </svg>
                  </div>
                  <div className="prf-action-title-group">
                    <h4 className="prf-action-title">{t.manageConsentsTitle}</h4>
                    <p className="prf-action-sub">{t.manageConsentsSub}</p>
                  </div>
                </div>

                <button 
                  type="button" 
                  onClick={() => setShowConsentModal(true)} 
                  className="prf-action-btn-pill"
                >
                  <span>{t.manageConsentsBtn}</span>
                  <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="#2563eb" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round">
                    <polyline points="9 18 15 12 9 6"></polyline>
                  </svg>
                </button>
              </div>

              {/* Row 3: Right to be Forgotten (Danger Box) */}
              <div className="prf-danger-card">
                <div className="prf-danger-left">
                  <div className="prf-danger-icon-wrap">
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#ef4444" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <polyline points="3 6 5 6 21 6"></polyline>
                      <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path>
                      <line x1="10" y1="11" x2="10" y2="17"></line>
                      <line x1="14" y1="11" x2="14" y2="17"></line>
                    </svg>
                  </div>
                  <div>
                    <h4 className="prf-danger-title">{t.forgottenTitle}</h4>
                    <p className="prf-danger-sub">{t.forgottenSub}</p>
                  </div>
                </div>

                <button 
                  type="button" 
                  onClick={() => setShowDeleteModal(true)} 
                  className="prf-danger-btn"
                >
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#ffffff" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                    <polyline points="3 6 5 6 21 6"></polyline>
                    <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path>
                  </svg>
                  <span>{t.deleteBtn}</span>
                </button>
              </div>

            </div>

            {/* Sign Out Row: Direct Redirection to Landing Page */}
            <Link 
              href="/" 
              className="prf-signout-row"
              style={{ textDecoration: "none" }}
              title="Sign Out to Landing Page"
            >
              <div className="prf-signout-left">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#0f224a" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"></path>
                  <polyline points="16 17 21 12 16 7"></polyline>
                  <line x1="21" y1="12" x2="9" y2="12"></line>
                </svg>
                <span>Sign Out</span>
              </div>
              <svg className="prf-signout-chevron" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#2563eb" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round">
                <polyline points="9 18 15 12 9 6"></polyline>
              </svg>
            </Link>

          </div>

        </div>

      </div>

      {/* ================= MODAL: STYLE PREFERENCES ================= */}
      {showStyleModal && (
        <div style={{
          position: "fixed",
          inset: 0,
          backgroundColor: "rgba(15, 23, 42, 0.6)",
          backdropFilter: "blur(4px)",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          zIndex: 1000,
          padding: "20px"
        }}>
          <div style={{
            background: "#ffffff",
            borderRadius: "18px",
            maxWidth: "500px",
            width: "100%",
            padding: "24px",
            boxShadow: "0 20px 40px rgba(0,0,0,0.2)"
          }}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "16px" }}>
              <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
                <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#1e3a8a" strokeWidth="2"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/></svg>
                <h3 style={{ fontSize: "17px", fontWeight: 800, color: "#0f224a", margin: 0 }}>
                  Style &amp; Fit Preferences
                </h3>
              </div>
              <button 
                onClick={() => setShowStyleModal(false)}
                style={{ background: "none", border: "none", cursor: "pointer", color: "#64748b" }}
              >
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>
              </button>
            </div>

            <div style={{ display: "flex", flexDirection: "column", gap: "16px", marginBottom: "20px" }}>
              <div>
                <label style={{ fontSize: "12px", fontWeight: 700, color: "#475569", display: "block", marginBottom: "6px" }}>
                  Preferred Tailoring Fit:
                </label>
                <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: "8px" }}>
                  {["Slim Fit", "Classic Tailored", "Relaxed / Oversized"].map((fit) => (
                    <button
                      key={fit}
                      type="button"
                      onClick={() => setPreferredFit(fit)}
                      style={{
                        padding: "8px 6px",
                        borderRadius: "8px",
                        fontSize: "11.5px",
                        fontWeight: preferredFit === fit ? 700 : 500,
                        border: preferredFit === fit ? "2px solid #2563eb" : "1px solid #cbd5e1",
                        background: preferredFit === fit ? "#eff6ff" : "#ffffff",
                        color: preferredFit === fit ? "#2563eb" : "#334155",
                        cursor: "pointer"
                      }}
                    >
                      {fit}
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <label style={{ fontSize: "12px", fontWeight: 700, color: "#475569", display: "block", marginBottom: "6px" }}>
                  Primary Aesthetic:
                </label>
                <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: "8px" }}>
                  {["Modern Tailoring", "Parisian Chic", "Minimalist"].map((aes) => (
                    <button
                      key={aes}
                      type="button"
                      onClick={() => setPreferredAesthetic(aes)}
                      style={{
                        padding: "8px 6px",
                        borderRadius: "8px",
                        fontSize: "11.5px",
                        fontWeight: preferredAesthetic === aes ? 700 : 500,
                        border: preferredAesthetic === aes ? "2px solid #2563eb" : "1px solid #cbd5e1",
                        background: preferredAesthetic === aes ? "#eff6ff" : "#ffffff",
                        color: preferredAesthetic === aes ? "#2563eb" : "#334155",
                        cursor: "pointer"
                      }}
                    >
                      {aes}
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <label style={{ fontSize: "12px", fontWeight: 700, color: "#475569", display: "block", marginBottom: "6px" }}>
                  Color Palette:
                </label>
                <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: "8px" }}>
                  {["Neutrals & Pastels", "Monochrome Noir", "Warm Earth Tones"].map((pal) => (
                    <button
                      key={pal}
                      type="button"
                      onClick={() => setPreferredPalette(pal)}
                      style={{
                        padding: "8px 6px",
                        borderRadius: "8px",
                        fontSize: "11.5px",
                        fontWeight: preferredPalette === pal ? 700 : 500,
                        border: preferredPalette === pal ? "2px solid #2563eb" : "1px solid #cbd5e1",
                        background: preferredPalette === pal ? "#eff6ff" : "#ffffff",
                        color: preferredPalette === pal ? "#2563eb" : "#334155",
                        cursor: "pointer"
                      }}
                    >
                      {pal}
                    </button>
                  ))}
                </div>
              </div>
            </div>

            <div style={{ display: "flex", justifyContent: "flex-end", gap: "10px" }}>
              <button
                type="button"
                onClick={() => setShowStyleModal(false)}
                style={{ padding: "8px 16px", borderRadius: "8px", border: "1px solid #cbd5e1", background: "#ffffff", color: "#64748b", fontWeight: 600, fontSize: "12px", cursor: "pointer" }}
              >
                Cancel
              </button>
              <button
                type="button"
                onClick={() => {
                  setShowStyleModal(false);
                  showNotification(`Preferences saved: ${preferredFit}, ${preferredAesthetic}`);
                }}
                style={{ padding: "8px 16px", borderRadius: "8px", border: "none", background: "#2563eb", color: "#ffffff", fontWeight: 700, fontSize: "12px", cursor: "pointer" }}
              >
                Save Preferences
              </button>
            </div>
          </div>
        </div>
      )}

      {/* ================= MODAL: STOCK & SIZE ALERTS ================= */}
      {showAlertsModal && (
        <div style={{
          position: "fixed",
          inset: 0,
          backgroundColor: "rgba(15, 23, 42, 0.6)",
          backdropFilter: "blur(4px)",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          zIndex: 1000,
          padding: "20px"
        }}>
          <div style={{
            background: "#ffffff",
            borderRadius: "18px",
            maxWidth: "500px",
            width: "100%",
            padding: "24px",
            boxShadow: "0 20px 40px rgba(0,0,0,0.2)"
          }}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "16px" }}>
              <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
                <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#1e3a8a" strokeWidth="2"><path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9"/><path d="M13.73 21a2 2 0 0 1-3.46 0"/></svg>
                <h3 style={{ fontSize: "17px", fontWeight: 800, color: "#0f224a", margin: 0 }}>
                  Active Stock &amp; Size Alerts
                </h3>
              </div>
              <button 
                onClick={() => setShowAlertsModal(false)}
                style={{ background: "none", border: "none", cursor: "pointer", color: "#64748b" }}
              >
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>
              </button>
            </div>

            <p style={{ fontSize: "12px", color: "#64748b", marginBottom: "16px" }}>
              You will receive push &amp; email notifications whenever your 3D digital twin sizes are restocked.
            </p>

            <div style={{ display: "flex", flexDirection: "column", gap: "10px", marginBottom: "20px" }}>
              {alerts.map((al) => (
                <div 
                  key={al.id} 
                  style={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "space-between",
                    padding: "12px 14px",
                    borderRadius: "10px",
                    border: al.active ? "1px solid #bfdbfe" : "1px solid #e2e8f0",
                    background: al.active ? "#f8faff" : "#f8fafc"
                  }}
                >
                  <div>
                    <div style={{ fontSize: "12.5px", fontWeight: 700, color: "#0f224a" }}>{al.title}</div>
                    <div style={{ fontSize: "10.5px", color: al.stock === "In Stock" ? "#16a34a" : "#ea580c", fontWeight: 600 }}>{al.stock}</div>
                  </div>
                  <button
                    type="button"
                    onClick={() => toggleAlert(al.id)}
                    style={{
                      padding: "4px 10px",
                      borderRadius: "6px",
                      fontSize: "11px",
                      fontWeight: 700,
                      border: "none",
                      background: al.active ? "#2563eb" : "#cbd5e1",
                      color: "#ffffff",
                      cursor: "pointer"
                    }}
                  >
                    {al.active ? "Alert ON" : "Muted"}
                  </button>
                </div>
              ))}
            </div>

            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
              <Link 
                href="/catalog" 
                onClick={() => setShowAlertsModal(false)}
                style={{ fontSize: "12px", color: "#2563eb", fontWeight: 700, textDecoration: "none" }}
              >
                + Browse Catalog for more items
              </Link>
              <button
                type="button"
                onClick={() => {
                  setShowAlertsModal(false);
                  showNotification("Stock alert settings successfully saved.");
                }}
                style={{ padding: "8px 16px", borderRadius: "8px", border: "none", background: "#0f224a", color: "#ffffff", fontWeight: 700, fontSize: "12px", cursor: "pointer" }}
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}

      {/* ================= MODAL: PAYMENT & INVOICE HISTORY ================= */}
      {showInvoiceModal && (
        <div style={{
          position: "fixed",
          inset: 0,
          backgroundColor: "rgba(15, 23, 42, 0.6)",
          backdropFilter: "blur(4px)",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          zIndex: 1000,
          padding: "20px"
        }}>
          <div style={{
            background: "#ffffff",
            borderRadius: "18px",
            maxWidth: "520px",
            width: "100%",
            padding: "24px",
            boxShadow: "0 20px 40px rgba(0,0,0,0.2)"
          }}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "16px" }}>
              <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
                <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#1e3a8a" strokeWidth="2"><rect width="20" height="14" x="2" y="5" rx="2"/><line x1="2" x2="22" y1="10" y2="10"/></svg>
                <h3 style={{ fontSize: "17px", fontWeight: 800, color: "#0f224a", margin: 0 }}>
                  Payment &amp; Invoices
                </h3>
              </div>
              <button 
                onClick={() => setShowInvoiceModal(false)}
                style={{ background: "none", border: "none", cursor: "pointer", color: "#64748b" }}
              >
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>
              </button>
            </div>

            <div style={{ display: "flex", flexDirection: "column", gap: "12px", marginBottom: "20px" }}>
              <div style={{ border: "1px solid #e2e8f0", borderRadius: "10px", padding: "12px 14px", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                <div>
                  <div style={{ fontSize: "12.5px", fontWeight: 700, color: "#0f224a" }}>INV-2026-9042 &bull; $2,450.00</div>
                  <div style={{ fontSize: "10.5px", color: "#64748b" }}>Balmain Evening Ensemble (Oct 20, 2026)</div>
                </div>
                <button
                  type="button"
                  onClick={() => handleDownloadInvoice("INV-2026-9042", "$2,450.00", "Balmain Double-Breasted Suit")}
                  style={{ padding: "6px 12px", borderRadius: "6px", background: "#eff6ff", border: "1px solid #dbeafe", color: "#2563eb", fontSize: "11px", fontWeight: 700, cursor: "pointer" }}
                >
                  Download PDF
                </button>
              </div>

              <div style={{ border: "1px solid #e2e8f0", borderRadius: "10px", padding: "12px 14px", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                <div>
                  <div style={{ fontSize: "12.5px", fontWeight: 700, color: "#0f224a" }}>INV-2026-8120 &bull; $129.00</div>
                  <div style={{ fontSize: "10.5px", color: "#64748b" }}>Zalando Tailored Wool Trousers (Oct 14, 2026)</div>
                </div>
                <button
                  type="button"
                  onClick={() => handleDownloadInvoice("INV-2026-8120", "$129.00", "Zalando Tailored Pants")}
                  style={{ padding: "6px 12px", borderRadius: "6px", background: "#eff6ff", border: "1px solid #dbeafe", color: "#2563eb", fontSize: "11px", fontWeight: 700, cursor: "pointer" }}
                >
                  Download PDF
                </button>
              </div>

              <div style={{ border: "1px solid #e2e8f0", borderRadius: "10px", padding: "12px 14px", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                <div>
                  <div style={{ fontSize: "12.5px", fontWeight: 700, color: "#0f224a" }}>INV-2026-7811 &bull; $47.88</div>
                  <div style={{ fontSize: "10.5px", color: "#64748b" }}>FitVisor Pro Annual Subscription (Sep 15, 2026)</div>
                </div>
                <button
                  type="button"
                  onClick={() => handleDownloadInvoice("INV-2026-7811", "$47.88", "FitVisor Pro Annual Subscription")}
                  style={{ padding: "6px 12px", borderRadius: "6px", background: "#eff6ff", border: "1px solid #dbeafe", color: "#2563eb", fontSize: "11px", fontWeight: 700, cursor: "pointer" }}
                >
                  Download PDF
                </button>
              </div>
            </div>

            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
              <Link 
                href="/checkout" 
                onClick={() => setShowInvoiceModal(false)}
                style={{ fontSize: "12px", color: "#2563eb", fontWeight: 700, textDecoration: "none" }}
              >
                &rarr; Manage Payment Methods in Checkout
              </Link>
              <button
                type="button"
                onClick={() => setShowInvoiceModal(false)}
                style={{ padding: "8px 16px", borderRadius: "8px", border: "none", background: "#0f224a", color: "#ffffff", fontWeight: 700, fontSize: "12px", cursor: "pointer" }}
              >
                Done
              </button>
            </div>
          </div>
        </div>
      )}

      {/* ================= MODAL: MANAGE AI CONSENTS ================= */}
      {showConsentModal && (
        <div style={{
          position: "fixed",
          inset: 0,
          backgroundColor: "rgba(15, 23, 42, 0.6)",
          backdropFilter: "blur(4px)",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          zIndex: 1000,
          padding: "20px"
        }}>
          <div style={{
            background: "#ffffff",
            borderRadius: "18px",
            maxWidth: "480px",
            width: "100%",
            padding: "24px",
            boxShadow: "0 20px 40px rgba(0,0,0,0.2)"
          }}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "16px" }}>
              <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
                <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#2563eb" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"></path>
                  <path d="m9 12 2 2 4-4"></path>
                </svg>
                <h3 style={{ fontSize: "17px", fontWeight: 800, color: "#0f224a", margin: 0 }}>
                  Manage AI Processing Consents
                </h3>
              </div>
              <button 
                onClick={() => setShowConsentModal(false)}
                style={{ background: "none", border: "none", cursor: "pointer", color: "#64748b" }}
              >
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <line x1="18" y1="6" x2="6" y2="18"></line>
                  <line x1="6" y1="6" x2="18" y2="18"></line>
                </svg>
              </button>
            </div>

            <p style={{ fontSize: "12px", color: "#64748b", marginBottom: "18px" }}>
              In accordance with GDPR Article 7, you can grant or withdraw consent for biometric AI processing anytime.
            </p>

            <div style={{ display: "flex", flexDirection: "column", gap: "14px", marginBottom: "22px" }}>
              <label style={{ display: "flex", alignItems: "flex-start", gap: "10px", cursor: "pointer" }}>
                <input 
                  type="checkbox" 
                  checked={consentMeshFitting} 
                  onChange={(e) => setConsentMeshFitting(e.target.checked)}
                  style={{ marginTop: "3px" }}
                />
                <div>
                  <div style={{ fontSize: "13px", fontWeight: 700, color: "#0f224a" }}>3D Virtual Fit Simulation</div>
                  <div style={{ fontSize: "11px", color: "#64748b" }}>Allow neural draping engine to simulate garments against your 3D body mesh.</div>
                </div>
              </label>

              <label style={{ display: "flex", alignItems: "flex-start", gap: "10px", cursor: "pointer" }}>
                <input 
                  type="checkbox" 
                  checked={consentAiTraining} 
                  onChange={(e) => setConsentAiTraining(e.target.checked)}
                  style={{ marginTop: "3px" }}
                />
                <div>
                  <div style={{ fontSize: "13px", fontWeight: 700, color: "#0f224a" }}>Anonymized Model Improvement</div>
                  <div style={{ fontSize: "11px", color: "#64748b" }}>Allow anonymized tension and fit metrics to improve size recommendation algorithms.</div>
                </div>
              </label>
            </div>

            <div style={{ display: "flex", justifyContent: "flex-end", gap: "10px" }}>
              <button
                type="button"
                onClick={() => setShowConsentModal(false)}
                style={{
                  padding: "8px 16px",
                  borderRadius: "8px",
                  border: "1px solid #cbd5e1",
                  background: "#ffffff",
                  color: "#64748b",
                  fontWeight: 600,
                  fontSize: "12px",
                  cursor: "pointer"
                }}
              >
                Cancel
              </button>
              <button
                type="button"
                onClick={() => {
                  setShowConsentModal(false);
                  showNotification("AI Processing Consents updated successfully.");
                }}
                style={{
                  padding: "8px 16px",
                  borderRadius: "8px",
                  border: "none",
                  background: "#2563eb",
                  color: "#ffffff",
                  fontWeight: 700,
                  fontSize: "12px",
                  cursor: "pointer"
                }}
              >
                Save Consents
              </button>
            </div>
          </div>
        </div>
      )}

      {/* ================= MODAL: CONFIRM RIGHT TO BE FORGOTTEN ================= */}
      {showDeleteModal && (
        <div style={{
          position: "fixed",
          inset: 0,
          backgroundColor: "rgba(15, 23, 42, 0.6)",
          backdropFilter: "blur(4px)",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          zIndex: 1000,
          padding: "20px"
        }}>
          <div style={{
            background: "#ffffff",
            borderRadius: "18px",
            maxWidth: "460px",
            width: "100%",
            padding: "24px",
            boxShadow: "0 20px 40px rgba(0,0,0,0.2)"
          }}>
            <div style={{ display: "flex", alignItems: "center", gap: "10px", marginBottom: "14px" }}>
              <div style={{
                width: "38px",
                height: "38px",
                borderRadius: "50%",
                background: "#fee2e2",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                color: "#dc2626"
              }}>
                <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2">
                  <path d="m21.73 18-8-14a2 2 0 0 0-3.48 0l-8 14A2 2 0 0 0 4 21h16a2 2 0 0 1 1.73-3Z"></path>
                  <line x1="12" y1="9" x2="12" y2="13"></line>
                  <line x1="12" y1="17" x2="12.01" y2="17"></line>
                </svg>
              </div>
              <h3 style={{ fontSize: "17px", fontWeight: 800, color: "#dc2626", margin: 0 }}>
                Permanently Delete Data?
              </h3>
            </div>

            <p style={{ fontSize: "12.5px", color: "#475569", lineHeight: "1.5", marginBottom: "20px" }}>
              This will irreversibly delete your biometric vault, 3D body scans, avatar mesh files, and account access under GDPR Article 17 (Right to Erasure).
            </p>

            <div style={{ display: "flex", justifyContent: "flex-end", gap: "10px" }}>
              <button
                type="button"
                onClick={() => setShowDeleteModal(false)}
                style={{
                  padding: "8px 16px",
                  borderRadius: "8px",
                  border: "1px solid #cbd5e1",
                  background: "#ffffff",
                  color: "#64748b",
                  fontWeight: 600,
                  fontSize: "12px",
                  cursor: "pointer"
                }}
              >
                Cancel
              </button>
              <button
                type="button"
                onClick={handleConfirmDeletion}
                style={{
                  padding: "8px 16px",
                  borderRadius: "8px",
                  border: "none",
                  background: "#dc2626",
                  color: "#ffffff",
                  fontWeight: 700,
                  fontSize: "12px",
                  cursor: "pointer"
                }}
              >
                Confirm Deletion
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
