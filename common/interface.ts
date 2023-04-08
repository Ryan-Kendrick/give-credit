export interface IncomeData {
  income: number | null
  ietc: boolean | null
  // acc: boolean | null
  kiwiSaver: boolean | null
  studentLoan: boolean | null
}

export interface OutputData {
  paye: number | null
  takehome: number | null
  // acc: number | null
  ietc: number | null
  kiwiSaver: number | null
  studentLoan: number | null
}
