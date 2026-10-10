import { Html, Head, Main, NextScript } from 'next/document'

export default function Document() {
  return (
    <Html lang="th">
      <Head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Sarabun:ital,wght@0,300;0,400;0,500;0,600;1,400&family=Playfair+Display:wght@400;500;600&display=swap"
          rel="stylesheet"
        />

        {/* Open Graph */}
        <meta property="og:type" content="website" />
        <meta property="og:site_name" content="บอส บางรัก" />
        <meta property="og:title" content="บอส บางรัก — คลังพระเครื่องคัดคุณภาพ" />
        <meta property="og:description" content="พระเครื่องคัดสรรจากร้านบอส บางรัก มีบัตรรับรอง พร้อมใบประกาศงานประกวด" />
        <meta property="og:url" content="https://boss-bangrak.vercel.app" />
        <meta property="og:image" content="https://boss-bangrak.vercel.app/og-image.png" />
        <meta property="og:image:width" content="1200" />
        <meta property="og:image:height" content="630" />
        <meta property="og:locale" content="th_TH" />

        {/* Twitter Card */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="บอส บางรัก — คลังพระเครื่องคัดคุณภาพ" />
        <meta name="twitter:description" content="พระเครื่องคัดสรรจากร้านบอส บางรัก มีบัตรรับรอง พร้อมใบประกาศงานประกวด" />
        <meta name="twitter:image" content="https://boss-bangrak.vercel.app/og-image.jpg" />

        <meta name="theme-color" content="#1B2E4B" />
      </Head>
      <body>
        <Main />
        <NextScript />
      </body>
    </Html>
  )
}