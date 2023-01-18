import hre from "hardhat"
import { assert, expect } from "chai"

describe("pow circuit", () => {
  let circuit:any;

  const sampleInput = {
    base: '2',
    exponent: '18',
  }

  const sanityCheck = true;

  before(async () => {
    circuit = await hre.circuitTest.setup("pow");
  });

  it("produces a witness with valid constraints", async () => {
    const witness = await circuit.calculateWitness(sampleInput, sanityCheck);
    await circuit.checkConstraints(witness);
  });

  it("has expected witness values", async () => {
    const witness = await circuit.calculateLabeledWitness(
      sampleInput,
      sanityCheck
    );
    assert.propertyVal(witness, "main.base", '2');
    assert.propertyVal(witness, "main.exponent", '18');
  });

  it("has the correct output", async () => {
    const expected = { out: 262144 };
    const witness = await circuit.calculateWitness(sampleInput, sanityCheck);
    await circuit.assertOut(witness, expected);
  });
});
