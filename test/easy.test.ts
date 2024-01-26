import hre from "hardhat"
import { assert, expect } from "chai"

describe("easy circuit", () => {
  let circuit:any;

  const sampleInput = {
    a: 3,
    b: [3,4,5,6,7]
  }

  const sampleFalseInput = {
    a: 2,
    b: [3,4,5,6,7]
  }

  const sampleWrongInput = {
    a: 1,
    b: 2,
  }
  const sanityCheck = true;

  before(async () => {
    circuit = await hre.circuitTest.setup("easy");
  });

  it("should fail with wrong input", async () => {
    await circuit.calculateWitness(sampleWrongInput, sanityCheck).then(
      () => {
        assert.fail("Should have thrown an error");
      },
      (error: any) => { }
    )
    // await circuit.calculateWitness(sampleWrongInput, sanityCheck)
  });
  it("produces a witness with valid constraints", async () => {
    const witness = await circuit.calculateWitness(sampleInput, sanityCheck);
    await circuit.checkConstraints(witness);
  });

  it("has the correct output", async () => {
    const expected = { c: 1 };
    const witness = await circuit.calculateWitness(sampleInput, sanityCheck);
    await circuit.assertOut(witness, expected);
  });

  it("not the member", async () => {
    const expected = { c: 0 };
    const witness = await circuit.calculateWitness(sampleFalseInput, sanityCheck);
    await circuit.assertOut(witness, expected);
  });
});
