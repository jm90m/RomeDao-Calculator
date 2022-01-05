import React from "react";
import i18n from "i18n-js";
import { formatToUSD, trim } from "../utils/utils";
import { useCalculatorState } from "../context/calculatorContext";

function calculateDailyRewards(
  sRomeAmount: string,
  days: string,
  dailyRebaseAmounts,
  stakingRebaseReward: string,
  romeFuturePrice: string,
  stakedSupply: number
) {
  const parsedSRomeAmount = parseFloat(sRomeAmount);
  const parsedDays = parseInt(days);
  const rewardsBreakdown = [];
  let totalSRome = parsedSRomeAmount;
  let totalStakedSupply = stakedSupply;

  for (let i = 0; i < parsedDays; i++) {
    const estimatedTotalRomeRewarded =
      (Math.pow(1 + Number(stakingRebaseReward) / 100, 1 * dailyRebaseAmounts) -
        1) *
      Number(totalSRome);
    const estimatedInflationRomeRewarded =
      (Math.pow(1 + Number(stakingRebaseReward) / 100, 1 * dailyRebaseAmounts) -
        1) *
      Number(totalStakedSupply);
    totalSRome += estimatedTotalRomeRewarded;
    totalStakedSupply += estimatedInflationRomeRewarded;
    const totalInvestmentValue = totalSRome * parseFloat(romeFuturePrice);
    rewardsBreakdown.push({
      day: i + 1,
      estimatedTotalRomeRewarded: estimatedTotalRomeRewarded,
      estimatedInflationRomeRewarded,
      totalStakedSupply,
      totalSRome,
      totalInvestmentValue,
    });
  }
  return rewardsBreakdown;
}

function CalculatorDailyBreakdown({
  sRomeAmount,
  days,
  dailyRebaseAmounts,
  stakingRebaseReward,
  romeFuturePrice,
}) {
  const { stakedSupply } = useCalculatorState();
  const dailyRewards = calculateDailyRewards(
    sRomeAmount,
    days,
    dailyRebaseAmounts,
    stakingRebaseReward,
    romeFuturePrice,
    stakedSupply
  );
  return (
    <div className="p-4 bg-gray-100 mt-6 ml-auto mr-auto">
      <div>
        <h2 className="font-medium tracking-2% text-dark-300">
          {i18n.t("dailyRewardsBreakdown")}
        </h2>
        <table className="table-auto mt-6">
          <thead className="border-b bg-gray-100  sticky top-0">
            <tr>
              <th className="px-6 py-4">{i18n.t("day")}</th>
              <th className="px-6 py-4">{i18n.t("estimatedSRomeRewards")}</th>
              <th className="px-6 py-4">{i18n.t("totalSRome")}</th>
              <th className="px-6 py-4">{i18n.t("totalInvestmentValue")}</th>
              <th className="px-6 py-4">{i18n.t("increaseStakedSupplyBy")}</th>
              <th className="px-6 py-4">{i18n.t("totalStakedSupply")}</th>
            </tr>
          </thead>
          <tbody>
            {dailyRewards.map((reward) => {
              return (
                <tr key={reward.day} className="border-b">
                  <td className="px-6 py-4">
                    {i18n.t("day")} {reward.day}
                  </td>
                  <td className="text-center text-rose-600">
                    {isNaN(reward.estimatedTotalRomeRewarded)
                      ? 0
                      : trim(reward.estimatedTotalRomeRewarded, 5)}
                  </td>
                  <td className="px-6 py-4 text-center text-rose-600">
                    {isNaN(reward.totalSRome) ? 0 : trim(reward.totalSRome, 5)}
                  </td>
                  <td className="px-6 py-4 text-center text-rose-600">
                    {formatToUSD(reward.totalInvestmentValue)}
                  </td>
                  <td className="text-center text-rose-600">
                    {isNaN(reward.estimatedInflationRomeRewarded)
                      ? 0
                      : trim(reward.estimatedInflationRomeRewarded, 5)}{" "}
                    sROME
                  </td>
                  <td className="text-center text-rose-600">
                    {isNaN(reward.totalStakedSupply)
                      ? 0
                      : trim(reward.totalStakedSupply, 5)}{" "}
                    sROME
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default CalculatorDailyBreakdown;
