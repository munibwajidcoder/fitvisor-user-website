import Link from "next/link";
import Logo from "@/components/Logo";

export default function NotFound() {
  return (
    <div className="login-page-wrapper">
      <div className="not-found-wrapper" style={{ background: "transparent" }}>
        <div style={{ marginBottom: "8px" }}>
          <Logo size="md" />
        </div>
        <div className="not-found-code">404</div>
        <h1 className="not-found-title">Page Not Found</h1>
        <p className="not-found-desc">
          The page you are looking for does not exist or has been moved.
        </p>
        <Link href="/" className="not-found-btn">
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.3" strokeLinecap="round" strokeLinejoin="round">
            <path d="m19 12H5" />
            <path d="m12 19-7-7 7-7" />
          </svg>
          Return to Home
        </Link>
      </div>
    </div>
  );
}
