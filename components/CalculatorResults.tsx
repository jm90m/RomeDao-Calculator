import React from "react";
import i18n from "i18n-js";
import { formatNumber, formatToUSD, trim } from "../utils/utils";

interface CalculatorResultsProps {
  initialInvestmentCost: string;
  estimatedTotalRomeRewarded: number;
  totalSRome: number;
  sRomeRewardValue: string;
  totalInvestmentValue: string;
  dailyRewards: any[];
}

function CalculatorResults({
  initialInvestmentCost,
  estimatedTotalRomeRewarded,
  totalSRome,
  sRomeRewardValue,
  totalInvestmentValue,
  dailyRewards = [],
}: CalculatorResultsProps) {
  const lastDailyRewards =
    dailyRewards?.length > 0
      ? dailyRewards[dailyRewards.length - 1]
      : undefined;
  const estimatedTotalSRomeValueRIP003 =
    lastDailyRewards !== undefined
      ? lastDailyRewards?.estimatedTotalSRomeValueRIP003
      : 0;
  const estimatedTotalSRomeRIP003 =
    lastDailyRewards !== undefined
      ? lastDailyRewards?.estimatedTotalSRomeRIP003
      : 0;
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
                : formatNumber(trim(estimatedTotalRomeRewarded, 3))}{" "}
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
              {formatNumber(trim(totalSRome, 5))} sROME
            </p>
          </div>
          <div className="items-center flex font-medium justify-between tracking-2%">
            <p>{i18n.t("totalInvestmentValue")}</p>
            <p className="text-right text-rose-600">{totalInvestmentValue}</p>
          </div>
          <div>
            <p className="text-rose-400 mt-4 mb-4">
              * Below estimations start to make more sense when you select 200
              or more days
            </p>
          </div>
          <div className="items-center flex font-medium justify-between tracking-2%">
            <p>{i18n.t("estimatedTotalSRomeRewardsWithRIP003")}</p>
            <p className="text-right text-rose-600">
              {isNaN(estimatedTotalSRomeRIP003)
                ? 0
                : formatNumber(trim(estimatedTotalSRomeRIP003, 5))}
              {" sROME"}
            </p>
          </div>
          <div className="items-center flex font-medium justify-between tracking-2%">
            <p>{i18n.t("estimatedTotalSRomeValueWithRIP003")}</p>
            <p className="text-right text-rose-600">
              {formatToUSD(estimatedTotalSRomeValueRIP003)}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default CalculatorResults;
