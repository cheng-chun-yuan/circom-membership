pragma circom 2.1.2;

/*This circuit template checks that c is the multiplication of a and b.*/  

template Main () {  
  // Declaration of signals.  

  signal input a;  
  signal input b;  
  signal output c;  

  c <== a * b;
}

component main = Main();