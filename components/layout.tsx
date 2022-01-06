import Head from "next/head";
import styles from "./layout.module.css";
import React from "react";
import i18n from "i18n-js";

export const siteTitle = "RomeDao Rewards Calculator";

export default function Layout({
  children,
}: {
  children: React.ReactNode;
  home?: boolean;
}) {
  return (
    <div>
      <Head>
        <link rel="icon" href="/favicon.ico" />
        <meta name="description" content="RomeDAO Rewards Calculator" />
        <meta name="og:title" content={siteTitle} />
        <meta name="twitter:card" content="summary_large_image" />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" />
        <link
          href="https://fonts.googleapis.com/css2?family=IBM+Plex+Mono:wght@500&display=swap"
          rel="stylesheet"
        />
      </Head>
      <header className={styles.header}>
        {i18n.t("romeDaoRewardsCalculator")}
      </header>
      <main>{children}</main>
    </div>
  );
}
