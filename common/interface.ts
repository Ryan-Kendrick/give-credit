export interface IncomeData {
  income: number
  incomePeriod: string
  ietc: boolean | undefined
  kiwiSaver: boolean | null
  kiwiSaverRate: string
  studentLoan: boolean | null
  studentLoanRate: string
}

export interface OutputData {
  paye: string
  takehome?: string
  acc?: string
  ietc?: string
  kiwiSaver?: string
  studentLoan?: string
}
