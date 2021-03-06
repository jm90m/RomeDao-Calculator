import React from "react";
import i18n from "i18n-js";
import { formatNumber, formatToUSD, trim } from "../utils/utils";
import { useCalculatorState } from "../context/calculatorContext";
import moment from "moment-timezone";

interface CalculatorDailyBreakdownProps {
  dailyRewards: any[];
}

function CalculatorDailyBreakdown({
  dailyRewards,
}: CalculatorDailyBreakdownProps) {
  const { stakingAPY } = useCalculatorState();
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
              <th className="px-6 py-4">
                {i18n.t("estimatedTotalSupply")} @{" "}
                {formatNumber(trim(stakingAPY * 100))}% APY
              </th>
              <th className="px-6 py-4">
                {i18n.t("estimatedTotalSupplyWithRIP003")}
              </th>
              <th className="px-6 py-4">
                {i18n.t("estimatedMarketCapWithRIP003")}
              </th>
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
            {dailyRewards.map((reward, i) => {
              const date = moment().add(i + 1, "days");

              return (
                <tr key={reward.day} className="border-b">
                  <td className="px-6 py-4">
                    {i18n.t("day")} {reward.day} -
                    <p className="whitespace-nowrap">
                      {date.format("MMM DD, YYYY")}
                    </p>
                  </td>
                  <td className="px-6 py-4 text-center text-rose-600">
                    {isNaN(reward.estimatedTotalRomeRewarded)
                      ? 0
                      : formatNumber(
                          trim(reward.estimatedTotalRomeRewarded, 5)
                        )}
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
                  <td className="px-6 py-4 text-center text-rose-600">
                    {isNaN(reward.estimatedInflationRomeRewarded)
                      ? 0
                      : formatNumber(
                          trim(reward.estimatedInflationRomeRewarded, 5)
                        )}{" "}
                    sROME
                  </td>
                  <td className="px-6 py-4 text-center text-rose-600">
                    {isNaN(reward.totalStakedSupply)
                      ? 0
                      : formatNumber(trim(reward.totalStakedSupply, 5))}{" "}
                    sROME
                  </td>
                  <td className="px-6 py-4 text-center text-rose-600">
                    {isNaN(reward.estimatedTotalStakedSupply)
                      ? 0
                      : formatNumber(
                          trim(reward.estimatedTotalStakedSupply, 5)
                        )}{" "}
                    sROME
                  </td>
                  <td className="px-6 py-4 text-center text-rose-600">
                    {isNaN(reward.estimatedMarketCapWithRIP003)
                      ? 0
                      : formatToUSD(reward.estimatedMarketCapWithRIP003)}
                  </td>
                  <td className="px-6 py-4 text-center text-rose-600">
                    {isNaN(reward.startingAPY)
                      ? 0
                      : formatNumber(trim(reward.startingAPY * 100, 2))}
                    % (-
                    {isNaN(reward.regalDecreaseAPY)
                      ? 0
                      : trim(Math.abs(reward.regalDecreaseAPY), 4)}
                    %)
                  </td>
                  <td className="px-6 py-4 text-center text-rose-600">
                    {isNaN(reward.dailyRebaseReward)
                      ? 0
                      : formatNumber(
                          trim(reward.dailyRebaseReward * 100, 4)
                        )}{" "}
                    sROME
                  </td>
                  <td className="px-6 py-4 text-center text-rose-600">
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
