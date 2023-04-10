import { useState } from 'react'
import Header from './Header'
import Input from './Input'
import Output from './Output'
import { IncomeData } from '../../common/interface'
import { Container, Segment, Transition } from 'semantic-ui-react'

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
      <Container fluid className="output-cont">
        <Output incomeData={incomeData} />
      </Container>
    </>
  )
}

export default App

// Bug with ietc always attempting to be applied when ietc ticked
