pragma circom 2.1.2;

include "../node_modules/circomlib/circuits/comparators.circom";
/*This circuit template checks that c is the multiplication of a and b.*/  

template Main () {  
  // Declaration of signals.  
  signal input bornYear;  
  signal input currentYear; 

  signal tmp;
  tmp <== bornYear + 18;
  component leq = LessEqThan(252);
  leq.in[0] <== tmp;
  leq.in[1] <== currentYear;
  leq.out === 1;
}

component main{public[currentYear]} = Main();