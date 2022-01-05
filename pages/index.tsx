import Head from "next/head";
import Layout, { siteTitle } from "../components/layout";
import { CalculatorProvider } from "../context/calculatorContext";
import Calculator from "../components/Calculator";
import "../i18n";

export default function Home({}: {}) {
  return (
    <CalculatorProvider>
      <Layout>
        <Head>
          <title>{siteTitle}</title>
        </Head>
        <Calculator />
      </Layout>
    </CalculatorProvider>
  );
}
