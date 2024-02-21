import { Html, Head, Main, NextScript } from "next/document";
export default function Document() {
  return (
    <Html lang="en">
      <Head>
        <link
          rel="icon"
          type="image/png"
          sizes="32x32"
          href="/krish.png"
        ></link>
      </Head>
      <title>Krishna Kumar</title>
      <meta name="description" content="Welcome to Krishnakumar's portfolio" />
      <meta
        name="keywords"
        content="software engineer, portfolio, software developer, frontend developer"
      />
      <body>
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}
