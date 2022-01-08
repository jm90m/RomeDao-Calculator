import { SUPPLY_LIMITS, ERAS } from "./constants";

export function calculateDailyRewards(
  sRomeAmount: string,
  days: string,
  dailyRebaseAmounts,
  stakingRebaseReward: string,
  romeFuturePrice: string,
  stakedSupply: number,
  stakingAPY: string
) {
  const parsedSRomeAmount = parseFloat(sRomeAmount);
  const parsedDays = parseInt(days);
  const rewardsBreakdown = [];
  let totalSRome = parsedSRomeAmount;
  let estimatedTotalSRomeRIP003 = totalSRome;
  let totalStakedSupply = stakedSupply;
  let startingAPY = parseFloat(stakingAPY);
  let didCalculateRegalDecrease = false;
  let regalDecreaseAPY = 0;
  let estimatedTotalStakedSupply = stakedSupply;
  let dailyRebaseReward: number | string =
    parseFloat(stakingRebaseReward) / 100;
  let didCalculateRepublicanDecrease = false;
  let currentEra;
  let prevEstimatedAPY = startingAPY;

  for (let i = 0; i < parsedDays; i++) {
    if (currentEra !== undefined) {
      dailyRebaseReward =
        Math.pow(startingAPY, 1 / (365 * dailyRebaseAmounts)) - 1 - 0.000151;

      if (currentEra === ERAS.REPUBLICAN) {
        startingAPY =
          SUPPLY_LIMITS.REPUBLICAN.MAX -
          (estimatedTotalStakedSupply / SUPPLY_LIMITS.REPUBLICAN.MAX_SUPPLY) *
            (SUPPLY_LIMITS.REPUBLICAN.MAX - SUPPLY_LIMITS.REPUBLICAN.MIN);
      } else if (currentEra === ERAS.REGAL) {
        startingAPY =
          SUPPLY_LIMITS.REGAL.MAX -
          (estimatedTotalStakedSupply / SUPPLY_LIMITS.REGAL.MAX_SUPPLY) *
            (SUPPLY_LIMITS.REGAL.MAX - SUPPLY_LIMITS.REGAL.MIN);
      } else if (currentEra === ERAS.IMPERIAL) {
        startingAPY =
          SUPPLY_LIMITS.IMPERIAL.MAX -
          (estimatedTotalStakedSupply / SUPPLY_LIMITS.IMPERIAL.MAX_SUPPLY) *
            (SUPPLY_LIMITS.IMPERIAL.MAX - SUPPLY_LIMITS.IMPERIAL.MIN);
      }

      regalDecreaseAPY = prevEstimatedAPY - startingAPY;
      prevEstimatedAPY = startingAPY;

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
      currentEra === undefined
    ) {
      didCalculateRegalDecrease = true;
      currentEra = ERAS.REGAL;
    } else if (
      estimatedTotalStakedSupply >= SUPPLY_LIMITS.REPUBLICAN.MIN_SUPPLY &&
      estimatedTotalStakedSupply <= SUPPLY_LIMITS.REPUBLICAN.MAX_SUPPLY &&
      currentEra === ERAS.REGAL
    ) {
      currentEra = ERAS.REPUBLICAN;
    } else if (
      estimatedTotalStakedSupply >= SUPPLY_LIMITS.IMPERIAL.MIN_SUPPLY &&
      estimatedTotalStakedSupply <= SUPPLY_LIMITS.IMPERIAL.MAX_SUPPLY &&
      currentEra === ERAS.REPUBLICAN
    ) {
      currentEra = ERAS.IMPERIAL;
    }

    const totalInvestmentValue = totalSRome * parseFloat(romeFuturePrice);
    const estimatedTotalSRomeValueRIP003 =
      estimatedTotalSRomeRIP003 * parseFloat(romeFuturePrice);
    const estimatedMarketCapWithRIP003 =
      estimatedTotalStakedSupply * parseFloat(romeFuturePrice);

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
      estimatedMarketCapWithRIP003,
    });
  }
  return rewardsBreakdown;
}
