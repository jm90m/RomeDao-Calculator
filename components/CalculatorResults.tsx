import React from "react";
import i18n from "i18n-js";
import { trim } from "../utils/utils";

interface CalculatorResultsProps {
  initialInvestmentCost: string;
  estimatedTotalRomeRewarded: number;
  totalSRome: number;
  sRomeRewardValue: string;
  totalInvestmentValue: string;
}

function CalculatorResults({
  initialInvestmentCost,
  estimatedTotalRomeRewarded,
  totalSRome,
  sRomeRewardValue,
  totalInvestmentValue,
}: CalculatorResultsProps) {
  return (
    <div className="p-4 bg-gray-100 mt-6">
      <div>
        <h2 className="font-medium tracking-2% text-dark-300">
          {i18n.t("estimatedResults")}
        </h2>
        <div className="mt-3 text-sm space-y-3 sm:text-base">
          <div className="items-center flex font-medium justify-between tracking-2%">
            <p>{i18n.t("initialInvestmentCost")}</p>
            <p className="text-right text-rose-600">{initialInvestmentCost}</p>
          </div>
          <div className="items-center flex font-medium justify-between tracking-2%">
            <p>{i18n.t("estimatedSRomeRewards")}</p>
            <p className="text-right text-rose-600">
              {isNaN(estimatedTotalRomeRewarded)
                ? 0
                : trim(estimatedTotalRomeRewarded, 3)}{" "}
              sROME
            </p>
          </div>
          <div className="items-center flex font-medium justify-between tracking-2%">
            <p>{i18n.t("sROMERewardValue")}</p>
            <p className="text-right text-rose-600">{sRomeRewardValue}</p>
          </div>
          <div className="items-center flex font-medium justify-between tracking-2%">
            <p>{i18n.t("totalSRome")}</p>
            <p className="text-right text-rose-600">
              {trim(totalSRome, 5)} sROME
            </p>
          </div>
          <div className="items-center flex font-medium justify-between tracking-2%">
            <p>{i18n.t("totalInvestmentValue")}</p>
            <p className="text-right text-rose-600">{totalInvestmentValue}</p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default CalculatorResults;
