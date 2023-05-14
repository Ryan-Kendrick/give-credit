import { useState } from 'react'
import Heading from './Header'
import Input from './Input'
import Output from './Output'
import { IncomeData } from '../../common/interface'
import { Container, Segment } from 'semantic-ui-react'
import '../../server/public/main.css'

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
      <Segment>
        <Input setIncome={setIncome} />
      </Segment>
      <Container fluid className="output-cont">
        <Output incomeData={incomeData} />
      </Container>
    </>
  )
}

export default App

// useEffect for styling multiple dropdown menus?
