import React, { useEffect, useState } from "react";
import { getMetrics } from "../api/metrics";
import {
  useCalculatorDispatch,
  useCalculatorState,
} from "../context/calculatorContext";
import { formatToUSD, trim } from "../utils/utils";
import i18n from "i18n-js";
import CalculatorResults from "./CalculatorResults";
import CalculatorFormField from "./CalculatorFormField";
import CalculatorDailyBreakdown from "./CalculatorDailyBreakdown";
import RomeMetrics from "./RomeMetrics";

function Calculator() {
  const calculatorDispatch = useCalculatorDispatch();
  const { stakingAPY, stakingRebase, marketPrice, epoch, loading } =
    useCalculatorState();
  const [sRomeAmount, setSRomeAmount] = useState<string>("");
  const [stakingRebaseReward, setStakingRebaseReward] = useState<string>("");
  const [romePurchasePrice, setRomePurchasePrice] = useState<string>("");
  const [days, setDays] = useState<number>(30);
  const [romeFuturePrice, setRomeFuturePrice] = useState<string>("");
  const [apy, setApy] = useState<string>("");
  const stakingRebasePercentage = trim(stakingRebase * 100, 4);
  const parsedSRomeAmount = parseFloat(sRomeAmount);
  const initialInvestmentCost =
    parseFloat(romePurchasePrice) * parseFloat(sRomeAmount);
  const formattedInitialInvestment = formatToUSD(initialInvestmentCost);
  const blockSecondLength = 13;
  const rebaseTimeInSeconds = epoch ? epoch[0] * blockSecondLength : 28800;
  const dailyRebaseAmounts = 86400 / rebaseTimeInSeconds;
  const estimatedTotalRomeRewarded =
    (Math.pow(
      1 + Number(stakingRebaseReward) / 100,
      days * dailyRebaseAmounts
    ) -
      1) *
    Number(sRomeAmount);
  const totalSRome =
    (isNaN(parsedSRomeAmount) ? 0 : parsedSRomeAmount) +
    (isNaN(estimatedTotalRomeRewarded) ? 0 : estimatedTotalRomeRewarded);
  const sRomeRewardValue =
    parseFloat(romeFuturePrice) * estimatedTotalRomeRewarded;
  const formattedSRomeRewardValue = formatToUSD(sRomeRewardValue);
  const totalInvestmentValue = totalSRome * parseFloat(romeFuturePrice);
  const formattedTotalInvestmentValue = formatToUSD(totalInvestmentValue);

  useEffect(() => {
    getMetrics(calculatorDispatch);
  }, []);

  return (
    <>
      <div className="flex flex-col items-center">
        <div>
          <div className="flex ml-4 mr-4 calc-mobile-container">
            <div className="mt-6 w-1/2">
              <h3 className="mb-2">Estimate Rewards</h3>
              <div className="calculator">
                <CalculatorFormField
                  title={i18n.t("sRomeAmount")}
                  setField={setSRomeAmount}
                  value={sRomeAmount}
                />
                <CalculatorFormField
                  title={i18n.t("apy")}
                  includeCurrentButton
                  setField={setApy}
                  value={apy}
                  getCurrent={() => {
                    if (!loading) {
                      getMetrics(calculatorDispatch);
                    }
                    const trimmedStakingAPY = trim(stakingAPY * 100, 1);
                    setApy(trimmedStakingAPY);
                  }}
                />
                <CalculatorFormField
                  title={i18n.t("stakingRebaseReward")}
                  includeCurrentButton
                  setField={setStakingRebaseReward}
                  value={stakingRebaseReward}
                  getCurrent={() => {
                    if (!loading) {
                      getMetrics(calculatorDispatch);
                    }
                    setStakingRebaseReward(stakingRebasePercentage);
                  }}
                />
                <CalculatorFormField
                  title={i18n.t("romePurchasePrice")}
                  includeCurrentButton
                  setField={setRomePurchasePrice}
                  value={romePurchasePrice}
                  getCurrent={() => {
                    if (!loading) {
                      getMetrics(calculatorDispatch);
                    }
                    setRomePurchasePrice(marketPrice.toString());
                  }}
                />
                <CalculatorFormField
                  title={i18n.t("romeFuturePrice")}
                  includeCurrentButton
                  setField={setRomeFuturePrice}
                  value={romeFuturePrice}
                  getCurrent={() => {
                    if (!loading) {
                      getMetrics(calculatorDispatch);
                    }
                    setRomeFuturePrice(marketPrice.toString());
                  }}
                />
                <CalculatorFormField
                  title={i18n.t("days")}
                  setField={setDays}
                  value={days}
                />
              </div>
              <CalculatorResults
                initialInvestmentCost={formattedInitialInvestment}
                estimatedTotalRomeRewarded={estimatedTotalRomeRewarded}
                totalSRome={totalSRome}
                sRomeRewardValue={formattedSRomeRewardValue}
                totalInvestmentValue={formattedTotalInvestmentValue}
              />
            </div>
            <RomeMetrics />
          </div>
        </div>
      </div>
      <CalculatorDailyBreakdown
        dailyRebaseAmounts={dailyRebaseAmounts}
        days={days}
        sRomeAmount={sRomeAmount}
        stakingRebaseReward={stakingRebaseReward}
        romeFuturePrice={romeFuturePrice}
      />
    </>
  );
}

export default Calculator;
