import { ContextDispatch } from "../types/context";
import { CALCULATOR_ACTIONS } from "../context/calculatorContext";
import { ethers } from "ethers";
import { romeAbi } from "../abis/rome.abi";
import { sRomeAbi } from "../abis/sRome2.abi";
import { stakingAbi } from "../abis/staking.abi";
import { addresses } from "../utils/constants";
import { romeFraxPair } from "../abis/romeFraxPair.abi";
import genericAbi from "../abis/generic.abi";
import { trim } from "../utils/utils";

export async function getMarketPrice(
  provider: ethers.Signer | ethers.providers.Provider
): Promise<number> {
  const pairContract = new ethers.Contract(
    addresses.romeFraxPair,
    romeFraxPair,
    provider
  );
  const reserves = await pairContract.getReserves();
  const marketPrice = reserves[0] / reserves[1];
  return marketPrice;
}

export async function getMetrics(
  calculatorDispatch: ContextDispatch,
  value?: string,
  setValue?: (value: any, value2?: any) => void
) {
  calculatorDispatch({
    type: CALCULATOR_ACTIONS.SET_LOADING,
  });
  const providerURL = "https://rpc.moonriver.moonbeam.network";
  const provider = new ethers.providers.StaticJsonRpcProvider(providerURL, {
    chainId: 1285,
    name: "moonriver",
  });
  const stakingContract = new ethers.Contract(
    addresses.staking,
    stakingAbi,
    provider
  );
  const currentBlock = await provider.getBlockNumber();
  const currentBlockTime = (await provider.getBlock(currentBlock)).timestamp;

  const sRomeContract = new ethers.Contract(
    addresses.sRome2,
    sRomeAbi,
    provider
  );

  const romeContract = new ethers.Contract(addresses.rome, romeAbi, provider);

  const marketPrice = await getMarketPrice(provider);

  const totalSupply = (await romeContract.totalSupply()) / Math.pow(10, 9);
  const stakedSupply =
    (await stakingContract.contractBalance()) / Math.pow(10, 9);

  const stakingTVL = stakedSupply * marketPrice;
  const marketCap = totalSupply * marketPrice;

  const epoch = await stakingContract.epoch();
  const dailyRebaseAmounts = 24 / 7.75;
  const stakingReward = epoch.distribute;
  const circ = await sRomeContract.circulatingSupply();
  const stakingRebase = stakingReward / circ;
  const fiveDayRate = Math.pow(1 + stakingRebase, 5 * dailyRebaseAmounts) - 1;
  const stakingAPY = Math.pow(1 + stakingRebase, 365 * dailyRebaseAmounts) - 1;

  const currentIndex = await stakingContract.index();
  const nextRebase = epoch.endBlock;

  if (value !== undefined) {
    switch (value) {
      case "apy": {
        const trimmedStakingAPY = trim(stakingAPY * 100, 1);
        const stakingRebasePercentage = trim(stakingRebase * 100, 4);
        setValue(trimmedStakingAPY, stakingRebasePercentage);
        break;
      }
      case "rebaseReward": {
        const stakingRebasePercentage = trim(stakingRebase * 100, 4);
        setValue(stakingRebasePercentage);
        break;
      }
      case "romePurchasePrice":
      case "romeFuturePrice":
        const marketPriceFormatted = marketPrice * Math.pow(10, -9);
        setValue(marketPriceFormatted.toString());
        break;
    }
  }

  calculatorDispatch({
    type: CALCULATOR_ACTIONS.SET_METRICS,
    payload: {
      currentIndex: Number(ethers.utils.formatUnits(currentIndex, "gwei")),
      totalSupply,
      marketCap: marketCap * Math.pow(10, -9),
      currentBlock,
      stakedSupply,
      fiveDayRate,
      stakingAPY,
      stakingTVL: stakingTVL * Math.pow(10, -9),
      stakingRebase,
      marketPrice: marketPrice * Math.pow(10, -9),
      currentBlockTime,
      nextRebase,
      epoch,
      dailyRebaseAmounts,
    },
  });
}
