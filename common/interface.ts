export interface IncomeData {
  income: number
  ietc: boolean | null
  kiwiSaver: boolean | null
  studentLoan: boolean | null
}

export interface OutputData {
  paye: number
  takehome?: number
  acc?: number
  ietc?: number
  kiwiSaver?: number
  studentLoan?: number
}
