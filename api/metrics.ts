import { ContextDispatch } from "../types/context";
import { CALCULATOR_ACTIONS } from "../context/calculatorContext";
import { ethers } from "ethers";
import { romeAbi } from "../abis/rome.abi";
import { sRomeAbi } from "../abis/sRome.abi";
import { stakingAbi } from "../abis/staking.abi";
import { addresses } from "../utils/constants";
import { romeFraxPair } from "../abis/romeFraxPair.abi";

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

export async function getMetrics(calculatorDispatch: ContextDispatch) {
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
    addresses.sRome,
    sRomeAbi,
    provider
  );
  const romeContract = new ethers.Contract(addresses.rome, romeAbi, provider);

  const marketPrice = await getMarketPrice(provider);

  const totalSupply = (await romeContract.totalSupply()) / Math.pow(10, 9);
  const stakedSupply =
    (await sRomeContract.contractBalance()) / Math.pow(10, 9);

  const stakingTVL = stakedSupply * marketPrice;
  const marketCap = totalSupply * marketPrice;

  const epoch = await stakingContract.epoch();
  const dailyRebaseAmounts = 24 / 7.75;
  const stakingReward = epoch.distribute;
  const circ = await sRomeContract.contractBalance();
  const stakingRebase = stakingReward / circ;
  console.log({ stakingRebase });
  const fiveDayRate = Math.pow(1 + stakingRebase, 5 * dailyRebaseAmounts) - 1;
  const stakingAPY = Math.pow(1 + stakingRebase, 365 * dailyRebaseAmounts) - 1;

  const currentIndex = await stakingContract.index();
  const nextRebase = epoch.endBlock;

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
