import React from "react";
import Head from "next/head";
import Layout, { siteTitle } from "../components/layout";
import { CalculatorProvider } from "../context/calculatorContext";
import AboutDetails from "../components/AboutDetails";
import "../i18n";

function About({}: {}) {
  return (
    <CalculatorProvider>
      <Layout>
        <Head>
          <title>{siteTitle} About</title>
        </Head>
        <AboutDetails />
      </Layout>
    </CalculatorProvider>
  );
}

export default About;
