export interface IncomeData {
  income: number
  incomePeriod: string
  ietc: boolean | undefined
  useKiwiSaver: boolean | null
  kiwiSaverRate: string
  useStudentLoan: boolean | null
  studentLoanRate: string
  studentLoanCustom: CustomStudentLoan
  submitted: boolean
  display: Display
}

export interface OutputData {
  paye: string
  takehome?: string
  acc?: string
  ietc?: string
  kiwiSaver?: string
  studentLoan?: string
  errors: string[]
}

export interface CustomStudentLoan {
  Enable: boolean | null
  Rate: string | null
}

export interface Display {
  KiwiSaver: boolean | null
  StudentLoan: boolean | null
}
