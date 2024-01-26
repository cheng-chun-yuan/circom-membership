pragma circom 2.1.2;

/*This circuit template checks that c is the multiplication of a and b.*/  

template Main() {
    // Declaration of signals
    signal input a;
    signal input b[5];
    signal output c;
    
    signal inva;
    // Initialize the output signal to false
    inva <-- a==b[0] || a==b[1] || a==b[2] || a==b[3] || a==b[4];

    c <== inva;

    // Loop through each address in 'b' check a in b or not
}

component main = Main();