import hre from "hardhat"
import { assert, expect } from "chai"

describe("age circuit", () => {
  let circuit:any;

  const sampleInput = {
    bornYear: '2000',
    currentYear: '2023',
  }

  const sampleWrongInput = {
    bornYear: '2020',
    currentYear: '2023',
  }
  const sanityCheck = true;

  before(async () => {
    circuit = await hre.circuitTest.setup("age");
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

  it("has expected witness values", async () => {
    const witness = await circuit.calculateLabeledWitness(
      sampleInput,
      sanityCheck
    );
    assert.propertyVal(witness, "main.bornYear", '2000');
    assert.propertyVal(witness, "main.currentYear", '2023');
  });
});
