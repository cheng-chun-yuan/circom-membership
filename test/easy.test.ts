import hre from "hardhat"
import { assert, expect } from "chai"

describe("easy circuit", () => {
  let circuit:any;

  const sampleInput = {
    a: '3',
    b: '11',
  }

  const sampleWrongInput = {
    a: '1',
    b: '33',
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

  it("has expected witness values", async () => {
    const witness = await circuit.calculateLabeledWitness(
      sampleInput,
      sanityCheck
    );
    assert.notPropertyVal(witness, "main.a", 1);
    assert.notPropertyVal(witness, "main.b", 1);
    assert.propertyVal(witness, "main.a", sampleInput.a);
    assert.propertyVal(witness, "main.b", sampleInput.b);
    assert.propertyVal(witness, "main.c", "33");
  });

  it("has the correct output", async () => {
    const expected = { c: 33 };
    const witness = await circuit.calculateWitness(sampleInput, sanityCheck);
    await circuit.assertOut(witness, expected);
  });
});
