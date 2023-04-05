import { useState } from 'react'
import Header from './Header'
import Input from './Input'
import Output from './Output'
import { IncomeData } from '../../common/interface'
import { Segment, Transition } from 'semantic-ui-react'

function App() {
  const initialData = {
    income: null,
    ietc: null,
    acc: null,
    kiwiSaver: null,
    studentLoan: null,
  }
  const [incomeData, setIncomeData] = useState(initialData as IncomeData)

  const setIncome = (income: number) => {
    setIncomeData({ ...incomeData, ['income']: income })
    console.log(incomeData)
  }

  return (
    <>
      <Header />
      <Segment>
        {/*Take the input data from the input bar and hold it within state*/}
        <Input setIncome={setIncome} />
      </Segment>
      {/*Feed the input data into the Output component for processing and display*/}
      <Output incomeData={incomeData} />
    </>
  )
}

export default App

// https://stackoverflow.com/questions/51739973/cannot-import-semantic-ui-css
