import { IncomeData, OutputData } from '../common/interface'

//-- Data
const taxBrackets = [
  [0, 14000, 0.105],
  [14000, 48000, 0.175], // Lower threshhold must be 1 less than actual to account for decimal numbers
  [48000, 70000, 0.3],
  [70000, 180000, 0.33],
  [180000, Infinity, 0.39],
]
// Valid until 1 April 2024
const accRate = 0.0153
const studentLoanThreshold = 22828

//-- Primary function, it routes to other functions based on options selected
export function calculate(incomeData: IncomeData): OutputData {
  const outputData = {
    paye: '',
    takehome: '',
    acc: '',
    ietc: '',
    kiwiSaver: '',
    studentLoan: '',
    errors: [],
  } as OutputData

  let income = incomeData.income

  try {
    switch (incomeData.incomePeriod) {
      case 'hour':
        console.log(income)
        income = income * 37.5 * 52
        console.log(income)
        break
      case 'week':
        income *= 52
        break
      case 'fortnight':
        income *= 26
        break
      case 'month':
        income *= 12
        break
      default:
        throw new Error('Unexpected income period')
    }
  } catch (err: unknown) {
    err instanceof Error && outputData.errors.push(err.message)
  }

  outputData.paye = calculatePaye(income)
  outputData.acc = calculateAcc(income)

  if (incomeData.ietc) {
    outputData.ietc = calculateIetc(income)
  }
  if (incomeData.kiwiSaver) {
    outputData.kiwiSaver = calculateKiwiSaver(income, incomeData.kiwiSaverRate)
  }
  if (incomeData.studentLoan) {
    outputData.studentLoan = calculateStudentLoan(
      income,
      incomeData.studentLoanRate
    )
  }
  outputData.takehome = calculateTakehome(income, outputData)
  console.log(outputData)

  //-- Secondary functions
  // If IETC has been applied, reduce PAYE for display purposes
  if (incomeData.ietc) {
    outputData.paye = (
      Number(outputData.paye) - Number(outputData.ietc)
    ).toFixed(2)
  }
  return outputData
}

// Income variable from props
export function calculatePaye(income: number) {
  let totalTax = 0 // Initialise variable for total tax paid

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

function calculateAcc(income: number) {
  const acc = income * accRate
  return acc.toFixed(2)
}

function calculateIetc(income: number) {
  // If income is within the range to receive the full credit, add the full $520
  if (income > 23999 && income < 44001) {
    return '520'
    // Else reduce 520 by 13 cents for every dollar above 44000 until it reaches 0
  } else if (income > 44000 && income < 48000) {
    return (520 - (income - 44000) * 0.13).toFixed(2)
  }
  return '0'
}

function calculateKiwiSaver(income: number, rate: string) {
  return (income * Number(rate)).toFixed(2)
}

function calculateStudentLoan(income: number, rate: string) {
  if (income > studentLoanThreshold && rate !== 'reduced') {
    console.log(income, rate)
    const cost = (income - studentLoanThreshold) * Number(rate)
    return cost.toFixed(2)
  }
}

function calculateTakehome(income: number, outputData: OutputData) {
  return (
    income +
    Number(outputData.ietc) -
    (Number(outputData.paye) +
      Number(outputData.acc) +
      Number(outputData.kiwiSaver) +
      Number(outputData.studentLoan))
  ).toFixed(2)
}
