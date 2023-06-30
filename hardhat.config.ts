import "hardhat-circom"

/**
 * @type import('hardhat/config').HardhatUserConfig
 */
module.exports = {
  solidity: {
    compilers: [
      {
        version: "0.6.11",
      },
      {
        version: "0.8.9",
      },
    ],
  },
  circom: {
    inputBasePath: "./circuits",
    ptau: "https://hermez.s3-eu-west-1.amazonaws.com/powersOfTau28_hez_final_12.ptau",
    circuits: [
      {
        name: "easy",
        // Generate PLONK
        protocol: "plonk",
      },
      {
        name: "pow",
      },
      {
        name: "age",
      }
    ],
  },
};
