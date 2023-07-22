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
  const [newSubmission, setNewSubmission] = useState(false)

  const setIncome = (data: IncomeData) => {
    setIncomeData({ ...incomeData, ...data })
  }
  const setSubmission = (bool: boolean) => {
    setNewSubmission(bool)
  }

  return (
    <>
      <Heading />
      <Input setIncome={setIncome} setNewSubmission={setSubmission} />
      <Output
        incomeData={incomeData}
        newSubmission={newSubmission}
        setNewSubmission={setSubmission}
      />
    </>
  )
}

export default App

// useEffect for styling multiple dropdown menus?
