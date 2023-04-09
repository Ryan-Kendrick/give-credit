export interface IncomeData {
  income: number
  ietc: boolean | null
  kiwiSaver: boolean | null
  studentLoan: boolean | null
}

export interface OutputData {
  paye: string
  takehome?: string
  acc?: string
  ietc?: string
  kiwiSaver?: string
  studentLoan?: string
}
