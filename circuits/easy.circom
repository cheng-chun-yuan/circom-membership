pragma circom 2.1.2;

/*This circuit template checks that c is the multiplication of a and b.*/  

template Main () {  
  // Declaration of signals.  

  signal input a;  
  signal input b;  
  signal output c;  

  signal inva;
  signal invb;

  inva <-- a != 1;
  inva === 1;
  invb <-- b != 1;
  invb === 1;
  c <== a * b;
}

component main = Main();