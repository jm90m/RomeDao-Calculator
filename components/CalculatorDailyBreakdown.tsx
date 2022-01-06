import React from "react";
import i18n from "i18n-js";
import { formatNumber, formatToUSD, trim } from "../utils/utils";
import { useCalculatorState } from "../context/calculatorContext";

const SUPPLY_LIMITS = {
  REGAL: {
    MAX: 1000,
    MIN: 10,
    DURATION: 6 * 31,
    MAX_SUPPLY: 10000000,
    MIN_SUPPLY: 500000,
  },
  REPUBLICAN: {
    MAX: 10,
    MIN: 1,
    DURATION: 24 * 31,
    MIN_SUPPLY: 10000001,
    MAX_SUPPLY: 1000000000,
  },
  IMPERIAL: {
    MAX: 1,
    MIN: 0.03,
    DURATION: 7 * 31,
    MAX_SUPPLY: 100000000000,
    MIN_SUPPLY: 1000000001,
  },
};

function calculateDailyRewards(
  sRomeAmount: string,
  days: string,
  dailyRebaseAmounts,
  stakingRebaseReward: string,
  romeFuturePrice: string,
  stakedSupply: number,
  stakingAPY: number
) {
  const parsedSRomeAmount = parseFloat(sRomeAmount);
  const parsedDays = parseInt(days);
  const rewardsBreakdown = [];
  let totalSRome = parsedSRomeAmount;
  let estimatedTotalSRomeRIP003 = totalSRome;
  let totalStakedSupply = stakedSupply;
  let startingAPY = stakingAPY;
  let didCalculateRegalDecrease = false;
  let regalDecreaseAPY = 0;
  let dailyRebaseReward: number | string =
    Math.pow(startingAPY, 1 / (365 * dailyRebaseAmounts)) - 1;
  let didCalculateRepublicanDecrease = false;

  for (let i = 0; i < parsedDays; i++) {
    if (didCalculateRegalDecrease || didCalculateRepublicanDecrease) {
      dailyRebaseReward =
        Math.pow(startingAPY, 1 / (365 * dailyRebaseAmounts)) - 1;
      startingAPY -= regalDecreaseAPY;
      // estimated RIP-003
    }

    const estimatedTotalRomeRewarded =
      (Math.pow(1 + Number(stakingRebaseReward) / 100, 1 * dailyRebaseAmounts) -
        1) *
      Number(totalSRome);
    const estimatedInflationRomeRewarded =
      (Math.pow(1 + Number(stakingRebaseReward) / 100, 1 * dailyRebaseAmounts) -
        1) *
      Number(totalStakedSupply);
    const estimatedTotalSRomeRewardedRIP003 =
      (Math.pow(1 + Number(dailyRebaseReward), 1 * dailyRebaseAmounts) - 1) *
      Number(estimatedTotalSRomeRIP003);

    totalSRome += estimatedTotalRomeRewarded;
    totalStakedSupply += estimatedInflationRomeRewarded;
    estimatedTotalSRomeRIP003 += estimatedTotalSRomeRewardedRIP003;

    if (
      totalStakedSupply >= SUPPLY_LIMITS.REGAL.MIN_SUPPLY &&
      totalStakedSupply <= SUPPLY_LIMITS.REGAL.MAX_SUPPLY &&
      !didCalculateRegalDecrease
    ) {
      regalDecreaseAPY =
        (startingAPY - SUPPLY_LIMITS.REGAL.MIN) / SUPPLY_LIMITS.REGAL.DURATION;
      didCalculateRegalDecrease = true;
      startingAPY -= regalDecreaseAPY;
    } else if (
      totalStakedSupply >= SUPPLY_LIMITS.REPUBLICAN.MIN_SUPPLY &&
      totalStakedSupply <= SUPPLY_LIMITS.REPUBLICAN.MAX_SUPPLY &&
      !didCalculateRepublicanDecrease
    ) {
      regalDecreaseAPY =
        (startingAPY - SUPPLY_LIMITS.REGAL.MIN) / SUPPLY_LIMITS.REGAL.DURATION;
      startingAPY -= regalDecreaseAPY;
    }

    const totalInvestmentValue = totalSRome * parseFloat(romeFuturePrice);
    const estimatedTotalSRomeValueRIP003 =
      estimatedTotalSRomeRIP003 * parseFloat(romeFuturePrice);

    rewardsBreakdown.push({
      day: i + 1,
      estimatedTotalRomeRewarded: estimatedTotalRomeRewarded,
      estimatedInflationRomeRewarded,
      totalStakedSupply,
      totalSRome,
      totalInvestmentValue,
      startingAPY,
      regalDecreaseAPY,
      dailyRebaseReward,
      estimatedTotalSRomeRewardedRIP003,
      estimatedTotalSRomeRIP003,
      estimatedTotalSRomeValueRIP003,
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
  const { stakedSupply, stakingAPY } = useCalculatorState();
  const dailyRewards = calculateDailyRewards(
    sRomeAmount,
    days,
    dailyRebaseAmounts,
    stakingRebaseReward,
    romeFuturePrice,
    stakedSupply,
    stakingAPY
  );
  return (
    <div className="p-4 bg-gray-100 mt-6 ml-auto mr-auto">
      <div>
        <h2 className="font-medium tracking-2% text-dark-300">
          {i18n.t("dailyRewardsBreakdown")}
        </h2>
        <table className="table-auto mt-6 bg-gray-100 ">
          <thead className="border-b bg-gray-100  sticky top-0">
            <tr>
              <th className="px-6 py-4">{i18n.t("day")}</th>
              <th className="px-6 py-4">{i18n.t("estimatedSRomeRewards")}</th>
              <th className="px-6 py-4">{i18n.t("totalSRome")}</th>
              <th className="px-6 py-4">{i18n.t("totalInvestmentValue")}</th>
              <th className="px-6 py-4">{i18n.t("increaseStakedSupplyBy")}</th>
              <th className="px-6 py-4">{i18n.t("totalStakedSupply")}</th>
              <th className="px-6 py-4">{i18n.t("estimatedAPY")}</th>
              <th className="px-6 py-4">{i18n.t("estimatedStakingRebase")}</th>
              <th className="px-6 py-4">
                {i18n.t("estimatedSRomeRewardsWithRIP003")}
              </th>
              <th className="px-6 py-4">
                {i18n.t("estimatedTotalSRomeRewardsWithRIP003")}
              </th>
              <th className="px-6 py-4">
                {i18n.t("estimatedTotalSRomeValueWithRIP003")}
              </th>
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
                    {isNaN(reward.totalSRome)
                      ? 0
                      : new Intl.NumberFormat("en-US").format(
                          Number(trim(reward.totalSRome, 5))
                        )}
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
                      : formatNumber(trim(reward.totalStakedSupply, 5))}{" "}
                    sROME
                  </td>
                  <td className="text-center text-rose-600">
                    {isNaN(reward.startingAPY)
                      ? 0
                      : formatNumber(trim(reward.startingAPY * 100, 2))}
                    % (-
                    {isNaN(reward.regalDecreaseAPY)
                      ? 0
                      : trim(reward.regalDecreaseAPY, 2)}
                    %)
                  </td>
                  <td className="text-center text-rose-600">
                    {isNaN(reward.dailyRebaseReward)
                      ? 0
                      : formatNumber(
                          trim(reward.dailyRebaseReward * 100, 4)
                        )}{" "}
                    %
                  </td>
                  <td className="text-center text-rose-600">
                    {isNaN(reward.estimatedTotalSRomeRewardedRIP003)
                      ? 0
                      : formatNumber(
                          trim(reward.estimatedTotalSRomeRewardedRIP003, 5)
                        )}{" "}
                    sROME
                  </td>
                  <td className="px-6 py-4 text-center text-rose-600">
                    {isNaN(reward.estimatedTotalSRomeRIP003)
                      ? 0
                      : formatNumber(
                          trim(reward.estimatedTotalSRomeRIP003, 5)
                        )}{" "}
                    sROME
                  </td>
                  <td className="px-6 py-4 text-center text-rose-600">
                    {formatToUSD(reward.estimatedTotalSRomeValueRIP003)}
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
