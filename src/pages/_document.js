import { Html, Head, Main, NextScript } from 'next/document'

export default function Document() {
  return (
    <Html lang="en, ua">
      <Head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin />
        <link rel="icon" href="/favicon.ico" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <title>LockBoxApp - Strong Password Generator & Encryption Tools</title>
        <meta
          name="description"
          content="LockBoxApp offers a secure password generator, encryption tools, image-to-base64 conversion, QR code generation, and more. Stay secure online with ease."
        />
        <meta
          name="keywords"
          content="password generator, password encryption, QR code generator, image to base64, watermarks, Add watermark to image, online security, secure passwords"
        />
        <link
          href="https://fonts.googleapis.com/css2?family=Lato:ital,wght@0,100;0,300;0,400;0,700;0,900;1,700;1,900 display=swap"
          rel="stylesheet"
        />
        <link rel="manifest" href="/manifest.json" />
      </Head>
      <body>
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}
