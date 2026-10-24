import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import PartnerBrands from "@/components/PartnerBrands";
import Features from "@/components/Features";
import WelcomeFooter from "@/components/WelcomeFooter";

export default function WelcomePage() {
  return (
    <div style={{ width: "100%", minHeight: "100vh", display: "flex", flexDirection: "column", justifyContent: "space-between" }}>
      <div className="page-container" style={{ width: "100%" }}>
        <Navbar />
        <Hero />
        <PartnerBrands />
        <Features />
      </div>
      <WelcomeFooter />
    </div>
  );
}
