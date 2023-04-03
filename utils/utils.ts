const taxBrackets = [
  [0, 14000, 0.105],
  [14000, 48000, 0.175], // Lower threshhold must be 1 less than actual to account for decimal numbers
  [48000, 70000, 0.3],
  [70000, 180000, 0.33],
  [180000, Infinity, 0.39],
]

export function calculateTotal(income: number) {
  let totalTax = 0
  for (const bracket of taxBrackets) {
    if (income < bracket[1]) {
      totalTax += (income - bracket[0]) * bracket[2]
      break
    } else {
      totalTax += (bracket[1] - bracket[0]) * bracket[2]
    }
  }
  return totalTax.toFixed(2) // Imprecise round but fit for purpose?
}

/*

const singleIntervals = [
  [0, 9875, 0.1],
  [9875, 40125, 0.12],
  [40125, 85525, 0.22],
  [85525, 163300, 0.24],
  [163300, 207350, 0.32],
  [207350, 518400, 0.35],
  [518400, 900000000, 0.37],
];

const income = 50000;                                       // Income variable from props

let totalTaxes = 0;                                         // Initialise variable for total tax paid - will need to divide this number to figure out PAYE, student loan etc.
for (const interval of singleIntervals) {                  // inverval[0] is threhold for this tax bracket, interval[1] is upper limit, interval[2] is the marginal tax rate
  if (income < interval[1]) {                              // If total income is within this threshhold, then add to total taxes remaining income taxed at this treshhold
    totalTaxes += (income - interval[0]) * interval[2];    
    break;
  }
  else {                                                   // Else take the sum of money within this threshhold and multiply it by the tax rate
    totalTaxes += (interval[1] - interval[0]) * interval[2];
  }
}

console.log(totalTaxes);

*/
