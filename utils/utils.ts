import { IncomeData, OutputData } from '../common/interface'

const taxBrackets = [
  [0, 14000, 0.105],
  [14000, 48000, 0.175], // Lower threshhold must be 1 less than actual to account for decimal numbers
  [48000, 70000, 0.3],
  [70000, 180000, 0.33],
  [180000, Infinity, 0.39],
]

// Primary function, it routes to other functions as necessary based on options selected
export function calculate(incomeData: IncomeData): OutputData {
  const income = incomeData.income
  const outputData = {
    paye: '',
    takehome: '',
    acc: '',
    ietc: '',
    kiwiSaver: '',
    studentLoan: '',
  } as OutputData
  outputData.paye = calculatePaye(income)
  outputData.acc = calculateAcc(income)
  outputData.takehome = calculateTakehome(income, outputData)
  return outputData
}

// Income variable from props
export function calculatePaye(income: number) {
  let totalTax = 0 // Initialise variable for total tax paid - will need to divide this number to figure out PAYE, student loan etc.
  // bracket[0] is threhold for this tax bracket, bracket[1] is upper limit, bracket[2] is the marginal tax rate
  for (const bracket of taxBrackets) {
    // If total income is within this threshhold, then add to total taxes remaining income taxed at this treshhold
    if (income < bracket[1]) {
      totalTax += (income - bracket[0]) * bracket[2]
      break
      // Else take the sum of money within this threshhold and multiply it by the tax rate
    } else {
      totalTax += (bracket[1] - bracket[0]) * bracket[2]
    }
  }
  return totalTax.toFixed(2) // Imprecise rounding to 2 decimal places but seems fit for purpose
}

// Valid until 1 April 2024
function calculateAcc(income: number) {
  const acc = income * 0.0153
  return acc.toFixed(2)
}

function calculateTakehome(income: number, outputData: OutputData) {
  return (
    income -
    (Number(outputData.paye) +
      Number(outputData.acc) +
      Number(outputData.kiwiSaver) +
      Number(outputData.studentLoan) -
      Number(outputData.ietc))
  ).toFixed(2)
}
