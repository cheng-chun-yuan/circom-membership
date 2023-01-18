pragma circom 2.1.2;

include "../node_modules/circomlib/circuits/bitify.circom";

template Main(n) {
    signal input base;
    signal input exponent;
    signal output out;

    component n2b = Num2Bits(n);
    n2b.in <== exponent;
    signal pow[n];
    signal inter[n];
    signal temp[n];

    pow[0] <== base;
    temp[0] <== pow[0] * n2b.out[0] + (1 - n2b.out[0]);
    inter[0] <== temp[0];

    for (var i = 1; i < n; i++) {
        pow[i] <== pow[i-1] * pow[i-1];
        temp[i] <== pow[i] * n2b.out[i] + (1 - n2b.out[i]);
        inter[i] <==  inter[i-1] * temp[i];
    }

    out <== inter[n-1];
}

component main = Main(256);
