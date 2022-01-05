import React, { createContext, useReducer, useContext, ReactNode } from "react";
import { ContextAction, ContextDispatch } from "../types/context";

export type CalculatorState = {
  currentIndex: number;
  totalSupply: number;
  marketCap: number;
  currentBlock: number;
  stakedSupply: number;
  fiveDayRate: number;
  stakingAPY: number;
  stakingTVL: number;
  stakingRebase: number;
  marketPrice: number;
  currentBlockTime: number;
  nextRebase: number;
  epoch: any[];
  loading: boolean;
};

const CalculatorContext = createContext<CalculatorState | undefined>(undefined);
const CalculatorDispatchContext = createContext<ContextDispatch | undefined>(
  undefined
);

const CALCULATOR_ACTIONS = {
  SET_METRICS: "@calculator/SET_METRICS",
  SET_LOADING: "@calculator/SET_LOADING",
};

const initialState = {
  currentIndex: 0,
  totalSupply: 0,
  marketCap: 0,
  currentBlock: 0,
  stakedSupply: 0,
  fiveDayRate: 0,
  stakingAPY: 0,
  stakingTVL: 0,
  stakingRebase: 0,
  marketPrice: 0,
  currentBlockTime: 0,
  nextRebase: 0,
  epoch: [0],
  loading: false,
};

function calculatorReducer(state: CalculatorState, action: ContextAction) {
  switch (action.type) {
    case CALCULATOR_ACTIONS.SET_METRICS:
      return { ...state, ...action.payload, loading: false };
    case CALCULATOR_ACTIONS.SET_LOADING:
      return { ...state, loading: true };
    default:
      throw new Error(`Unhandled action type: ${action.type}`);
  }
}

type CalculatorProviderProps = {
  children: ReactNode;
};

function CalculatorProvider({ children }: CalculatorProviderProps) {
  const [explore, setCalculator] = useReducer(calculatorReducer, initialState);

  return (
    <CalculatorContext.Provider value={explore}>
      <CalculatorDispatchContext.Provider value={setCalculator}>
        {children}
      </CalculatorDispatchContext.Provider>
    </CalculatorContext.Provider>
  );
}

function useCalculatorState() {
  const context = useContext(CalculatorContext);
  if (context === undefined) {
    throw new Error("Unable to find CalculatorProvider");
  }

  return context;
}

function useCalculatorDispatch() {
  const context = useContext(CalculatorDispatchContext);

  if (context === undefined) {
    throw new Error("Unable to find CalculatorDispatch");
  }

  return context;
}

export {
  CalculatorProvider,
  useCalculatorState,
  useCalculatorDispatch,
  CALCULATOR_ACTIONS,
};
