import React from "react";
import styles from "./layout.module.css";
import Link from "next/link";

function AboutDetails() {
  return (
    <div className={styles.container}>
      This calculator is an estimation of the rewards that you get from staking
      ROME on RomeDAO. The estimations for the decrease in APY in RIP-003, are
      calculated as follows:
      <pre>
        <code>
          {"const SUPPLY_LIMITS = { " +
            " REGAL: {\n" +
            "    MAX: 1000,\n" +
            "    MIN: 10,\n" +
            "    DURATION: 6 * 31,\n" +
            "    MAX_SUPPLY: 10000000,\n" +
            "    MIN_SUPPLY: 500000,\n" +
            "  },\n" +
            "  REPUBLICAN: {\n" +
            "    MAX: 10,\n" +
            "    MIN: 1,\n" +
            "    DURATION: 24 * 31,\n" +
            "    MIN_SUPPLY: 10000001,\n" +
            "    MAX_SUPPLY: 1000000000,\n" +
            "  },\n" +
            "  IMPERIAL: {\n" +
            "    MAX: 1,\n" +
            "    MIN: 0.03,\n" +
            "    DURATION: 7 * 31,\n" +
            "    MAX_SUPPLY: 100000000000,\n" +
            "    MIN_SUPPLY: 1000000001,\n" +
            "  }," +
            "}"}
          {"\n\nconst regalDecreaseAPY = (startingAPY -\n" +
            "SUPPLY_LIMITS.REGAL.MIN) / SUPPLY_LIMITS.REGAL.DURATION"}
        </code>
      </pre>
      <p className="mt-6 mb-6">
        Note: that all of this is just an estimation, so your actual rewards can
        vary.
      </p>
      <Link href="/">Go to calculator</Link>
    </div>
  );
}

export default AboutDetails;
