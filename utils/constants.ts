export const addresses: { [key: string]: string } = {
  frax: "0x1A93B23281CC1CDE4C4741353F3064709A16197d",
  rome: "0x4a436073552044D5f2f49B176853ad3Ad473d9d6",
  romeFraxPair: "0x069C2065100b4D3D982383f7Ef3EcD1b95C05894",
  sRome: "0x6f7D019502e17F1ef24AC67a260c65Dd23b759f1",
  sRome2: "0x89f52002e544585b42f8c7cf557609ca4c8ce12a",
  staking: "0x6f7D019502e17F1ef24AC67a260c65Dd23b759f1",
};

export const tokens: { [key: string]: string } = {
  TOKEN_NAME: "ROME",
  STAKING_TOKEN_NAME: "sROME",
};

export const SUPPLY_LIMITS = {
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
