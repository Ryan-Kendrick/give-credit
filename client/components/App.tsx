import { useState } from 'react'
import Heading from './Header'
import Input from './Input'
import Output from './Output'
import { IncomeData } from '../../common/interface'
import '../../server/public/main.css'
import 'flowbite'

function App() {
  const initialData = {
    income: 0,
    ietc: undefined,
    kiwiSaver: null,
    studentLoan: null,
  }
  const [incomeData, setIncomeData] = useState(initialData as IncomeData)

  const setIncome = (data: IncomeData) => {
    setIncomeData({ ...incomeData, ...data })
  }

  return (
    <>
      <Heading />
      <Input setIncome={setIncome} />
      <Output incomeData={incomeData} />
    </>
  )
}

export default App

// useEffect for styling multiple dropdown menus?
