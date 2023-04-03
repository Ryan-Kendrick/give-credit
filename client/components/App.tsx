import { useEffect, useState } from 'react'
import Output from './Output'
import Input from './Input'
import ButtonExampleShorthand from './Button'
import { IncomeData } from '../../common/interface'

function App() {
  const initialData = {
    income: 0,
    ietc: false,
    acc: false,
    kiwiSaver: false,
    studentLoan: false,
  }
  const [incomeData, setIncomeData] = useState(initialData as IncomeData)

  const setIncome = (income: number) => {
    setIncomeData({ ...incomeData, ['income']: income })
    console.log(incomeData)
  }

  useEffect(() => {
    document.title = 'Tax Credit Project'
  })

  return (
    <>
      <header></header>
      <Input setIncome={setIncome} />
      <Output incomeData={incomeData} />
      <ButtonExampleShorthand />
      <button>Ordinary button</button>
    </>
  )
}

export default App

// https://stackoverflow.com/questions/51739973/cannot-import-semantic-ui-css
