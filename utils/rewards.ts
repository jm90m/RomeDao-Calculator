import { SUPPLY_LIMITS } from "./constants";

export function calculateDailyRewards(
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
  let estimatedTotalStakedSupply = stakedSupply;
  let dailyRebaseReward: number | string =
    parseFloat(stakingRebaseReward) / 100;
  let didCalculateRepublicanDecrease = false;

  for (let i = 0; i < parsedDays; i++) {
    if (didCalculateRegalDecrease || didCalculateRepublicanDecrease) {
      dailyRebaseReward =
        Math.pow(startingAPY, 1 / (365 * dailyRebaseAmounts)) - 1;

      if (startingAPY > SUPPLY_LIMITS.IMPERIAL.MIN) {
        startingAPY -= regalDecreaseAPY;
      }
      // estimated RIP-003
      let estimatedRomeRewardedRIP003 =
        (Math.pow(
          1 + Number(dailyRebaseReward * 100) / 100,
          dailyRebaseAmounts
        ) -
          1) *
        Number(estimatedTotalStakedSupply);

      estimatedTotalStakedSupply += estimatedRomeRewardedRIP003;
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
    estimatedTotalSRomeRIP003 += isNaN(estimatedTotalSRomeRewardedRIP003)
      ? 0
      : estimatedTotalSRomeRewardedRIP003;

    if (!didCalculateRepublicanDecrease && !didCalculateRegalDecrease) {
      estimatedTotalStakedSupply += estimatedInflationRomeRewarded;
    }

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
      estimatedTotalStakedSupply >= SUPPLY_LIMITS.REPUBLICAN.MIN_SUPPLY &&
      estimatedTotalStakedSupply <= SUPPLY_LIMITS.REPUBLICAN.MAX_SUPPLY &&
      !didCalculateRepublicanDecrease
    ) {
      if (startingAPY > 10) {
        startingAPY = 10;
      }

      regalDecreaseAPY =
        (startingAPY - SUPPLY_LIMITS.REPUBLICAN.MIN) /
        SUPPLY_LIMITS.REPUBLICAN.DURATION;
      startingAPY -= regalDecreaseAPY;
      didCalculateRepublicanDecrease = true;
    } else if (
      estimatedTotalStakedSupply >= SUPPLY_LIMITS.IMPERIAL.MIN_SUPPLY &&
      estimatedTotalStakedSupply <= SUPPLY_LIMITS.IMPERIAL.MAX_SUPPLY
    ) {
      if (startingAPY > 1) {
        startingAPY = 1;
      }

      regalDecreaseAPY =
        (startingAPY - SUPPLY_LIMITS.REPUBLICAN.MIN) /
        SUPPLY_LIMITS.REPUBLICAN.DURATION;
      startingAPY -= regalDecreaseAPY;
      didCalculateRepublicanDecrease = true;
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
      estimatedTotalStakedSupply,
    });
  }
  return rewardsBreakdown;
}
