import type { Metadata } from "next";
import { Inter, Playfair_Display } from "next/font/google";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

const playfair = Playfair_Display({
  subsets: ["latin"],
  variable: "--font-playfair",
  style: ["italic", "normal"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "FitVisor - Virtual Try-On with True Precision",
  description:
    "Your ultra-realistic 3D digital twin, generated from just 3 photos. Say goodbye to 70% of online returns.",
  icons: {
    icon: [
      { url: "/favicon.ico" },
      { url: "/favicon.png", type: "image/png" },
    ],
    apple: [
      { url: "/favicon.png" },
    ],
    shortcut: ["/favicon.ico"],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${inter.variable} ${playfair.variable}`} suppressHydrationWarning>
      <head>
        <link rel="icon" href="/favicon.ico" sizes="any" />
        <link rel="icon" type="image/png" href="/favicon.png" />
        <link rel="apple-touch-icon" href="/favicon.png" />
        {/* Synchronous script to strip extension-injected attributes (Bitdefender, Urban VPN, Grammarly, etc.) before React hydrates */}
        <script
          dangerouslySetInnerHTML={{
            __html: `
              (function() {
                var EXTENSION_ATTRS = [
                  'bis_skin_checked',
                  'bis_register',
                  'data-gramm',
                  'data-gramm_editor',
                  'data-gramm_id',
                  'data-new-gr-c-s-check-loaded',
                  'data-gr-ext-installed',
                  'cz-shortcut-listen',
                  'data-lt-installed',
                  'data-lt-tmp-id',
                  'fdprocessedid'
                ];

                function cleanupExtensionAttributes() {
                  EXTENSION_ATTRS.forEach(function(attr) {
                    var elements = document.querySelectorAll('[' + attr + ']');
                    for (var i = 0; i < elements.length; i++) {
                      elements[i].removeAttribute(attr);
                    }
                  });
                }

                // Run immediately as head parses
                cleanupExtensionAttributes();

                // Intercept console.error to prevent extension-caused hydration error popups
                if (typeof console !== 'undefined' && console.error) {
                  var originalError = console.error;
                  console.error = function() {
                    var firstArg = arguments[0] ? String(arguments[0]) : '';
                    if (
                      firstArg.indexOf('bis_skin_checked') !== -1 ||
                      firstArg.indexOf('cz-shortcut-listen') !== -1 ||
                      firstArg.indexOf('data-new-gr-c-s-check-loaded') !== -1 ||
                      firstArg.indexOf('fdprocessedid') !== -1 ||
                      firstArg.indexOf('hydration-error') !== -1 && (
                        firstArg.indexOf('bis_skin_checked') !== -1 ||
                        firstArg.indexOf('cz-shortcut') !== -1
                      )
                    ) {
                      return;
                    }
                    originalError.apply(console, arguments);
                  };
                }

                // MutationObserver to clean attributes continuously before hydration completes
                if (typeof MutationObserver !== 'undefined') {
                  var observer = new MutationObserver(function(mutations) {
                    var shouldClean = false;
                    for (var i = 0; i < mutations.length; i++) {
                      if (EXTENSION_ATTRS.indexOf(mutations[i].attributeName) !== -1) {
                        shouldClean = true;
                        break;
                      }
                    }
                    if (shouldClean) {
                      cleanupExtensionAttributes();
                    }
                  });

                  observer.observe(document.documentElement, {
                    attributes: true,
                    subtree: true,
                    attributeFilter: EXTENSION_ATTRS
                  });
                }
              })();
            `,
          }}
        />
      </head>
      <body suppressHydrationWarning>{children}</body>
    </html>
  );
}
