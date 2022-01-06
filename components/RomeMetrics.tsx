import React from "react";
import i18n from "i18n-js";
import { formatNumber, trim } from "../utils/utils";
import { useCalculatorState } from "../context/calculatorContext";

function RomeMetrics({}) {
  const {
    marketCap,
    currentIndex,
    stakedSupply,
    marketPrice,
    totalSupply,
    fiveDayRate,
    stakingRebase,
    stakingTVL,
    stakingAPY,
  } = useCalculatorState();
  const otherMetricsTable: { label: string; value: string; unit: string }[] = [
    { label: "Current Index", value: trim(currentIndex, 4), unit: "ROME" },
    {
      label: "Staked Supply",
      value: new Intl.NumberFormat("en-US").format(
        Number(trim(stakedSupply, 4))
      ),
      unit: "ROME",
    },
    {
      label: "Market Cap",
      value: new Intl.NumberFormat("en-US", {
        style: "currency",
        currency: "USD",
        maximumFractionDigits: 2,
        minimumFractionDigits: 0,
      }).format(marketCap),
      unit: "",
    },
    {
      label: "Market Price",
      value: new Intl.NumberFormat("en-US", {
        style: "currency",
        currency: "USD",
        maximumFractionDigits: 2,
        minimumFractionDigits: 0,
      }).format(marketPrice),
      unit: "",
    },
    {
      label: "Total Supply",
      value: new Intl.NumberFormat("en-US").format(
        Number(trim(totalSupply, 4))
      ),
      unit: "ROME",
    },
    { label: "5-day Rate", value: trim(fiveDayRate * 100, 4), unit: "%" },
    { label: "Staking Rebase", value: trim(stakingRebase * 100, 4), unit: "%" },
    {
      label: "Staking APY",
      value: formatNumber(trim(stakingAPY * 100, 2)),
      unit: "%",
    },
    {
      label: "Staking TVL",
      value: new Intl.NumberFormat("en-US", {
        style: "currency",
        currency: "USD",
        maximumFractionDigits: 2,
        minimumFractionDigits: 0,
      }).format(stakingTVL),
      unit: "",
    },
  ];
  return (
    <div className="p-4 bg-gray-100 mt-6 ml-4 w-1/2 rome-metrics">
      <div>
        <h2 className="font-medium tracking-2% text-dark-300">
          {i18n.t("romeMetrics")}
        </h2>
        <div className="mt-3 text-sm space-y-3 sm:text-base">
          {otherMetricsTable.map((metric, i) => {
            return (
              <div
                className="items-center flex font-medium justify-between tracking-2%"
                key={i}
              >
                <p>{metric.label}</p>
                <p className="text-right text-rose-600">
                  {metric.value} {metric.unit}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}

export default RomeMetrics;
