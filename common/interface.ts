export interface IncomeData {
  income: number
  ietc: boolean | undefined
  kiwiSaver: boolean | null
  kiwiSaverRate: undefined | string
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
