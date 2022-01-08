import React from "react";
import i18n from "i18n-js";
import { formatNumber, formatToUSD, trim } from "../utils/utils";
import { useCalculatorState } from "../context/calculatorContext";

interface CalculatorResultsProps {
  initialInvestmentCost: string;
  estimatedTotalRomeRewarded: number;
  totalSRome: number;
  sRomeRewardValue: string;
  totalInvestmentValue: string;
  dailyRewards: any[];
  romeFuturePrice: string;
}

function CalculatorResults({
  initialInvestmentCost,
  estimatedTotalRomeRewarded,
  totalSRome,
  sRomeRewardValue,
  totalInvestmentValue,
  dailyRewards = [],
  romeFuturePrice,
}: CalculatorResultsProps) {
  const { marketPrice } = useCalculatorState();
  const lastDailyRewards =
    dailyRewards?.length > 0
      ? dailyRewards[dailyRewards.length - 1]
      : undefined;
  const hasLastDailyRewards = lastDailyRewards !== undefined;
  const estimatedTotalSRomeValueRIP003 = hasLastDailyRewards
    ? lastDailyRewards?.estimatedTotalSRomeValueRIP003
    : 0;
  const estimatedTotalSRomeRIP003 = hasLastDailyRewards
    ? lastDailyRewards?.estimatedTotalSRomeRIP003
    : 0;
  const estimatedTotalSupply = hasLastDailyRewards
    ? lastDailyRewards?.totalStakedSupply
    : 0;
  const estimatedMarketCap = hasLastDailyRewards
    ? lastDailyRewards?.totalStakedSupply * parseFloat(romeFuturePrice)
    : 0;
  const estimatedTotalSupplyWithRIP003 = hasLastDailyRewards
    ? lastDailyRewards?.estimatedTotalStakedSupply
    : 0;
  const estimatedMarketCapWithRIP003 = hasLastDailyRewards
    ? lastDailyRewards?.estimatedTotalStakedSupply * parseFloat(romeFuturePrice)
    : 0;

  return (
    <>
      <div className="p-4 bg-gray-100 mt-6">
        <div>
          <h2 className="font-medium tracking-2% text-dark-300">
            {i18n.t("estimatedResults")}
          </h2>
          <div className="mt-3 text-sm space-y-3 sm:text-base">
            <div className="items-center flex font-medium justify-between tracking-2%">
              <p>{i18n.t("initialInvestmentCost")}</p>
              <p className="text-right text-rose-600">
                {initialInvestmentCost}
              </p>
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
              <p>{i18n.t("estimatedTotalSupply")}</p>
              <p className="text-right text-rose-600">
                {isNaN(estimatedTotalSupply)
                  ? 0
                  : formatNumber(trim(estimatedTotalSupply, 5))}{" "}
                sROME
              </p>
            </div>
            <div className="items-center flex font-medium justify-between tracking-2%">
              <p>{i18n.t("estimatedMarketCap")}</p>
              <p className="text-right text-rose-600">
                {isNaN(estimatedMarketCap)
                  ? 0
                  : formatToUSD(estimatedMarketCap)}{" "}
                sROME
              </p>
            </div>
            <div className="items-center flex font-medium justify-between tracking-2%">
              <p>{i18n.t("totalInvestmentValue")}</p>
              <p className="text-right text-rose-600">{totalInvestmentValue}</p>
            </div>
          </div>
        </div>
      </div>
      <div className="p-4 bg-gray-100 mt-6 text-sm space-y-3 sm:text-base">
        <div>
          <p className="text-rose-400 mt-4 mb-4">
            * Below estimations start to make more sense when you select 200 or
            more days
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
        <div className="items-center flex font-medium justify-between tracking-2%">
          <p>{i18n.t("estimatedTotalSupplyWithRIP003")}</p>
          <p className="text-right text-rose-600">
            {isNaN(estimatedTotalSupplyWithRIP003)
              ? 0
              : formatNumber(trim(estimatedTotalSupplyWithRIP003, 5))}{" "}
            sROME
          </p>
        </div>
        <div className="items-center flex font-medium justify-between tracking-2%">
          <p>{i18n.t("estimatedMarketCapWithRIP003")}</p>
          <p className="text-right text-rose-600">
            {isNaN(estimatedMarketCapWithRIP003)
              ? 0
              : formatToUSD(estimatedMarketCapWithRIP003)}{" "}
            sROME
          </p>
        </div>
      </div>
    </>
  );
}

export default CalculatorResults;
