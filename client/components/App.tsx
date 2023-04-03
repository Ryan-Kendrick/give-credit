import { useEffect, useState } from 'react'
import Output from './Output'
import Input from './Input'
import ButtonExampleShorthand from './Button'

function App() {
  const [income, setIncome] = useState(0)

  useEffect(() => {
    document.title = 'Tax Credit Project'
  })

  return (
    <>
      <header></header>
      <Input setIncome={setIncome} />
      <Output income={income} />
      <ButtonExampleShorthand />
      <button>Ordinary button</button>
    </>
  )
}

export default App

// https://stackoverflow.com/questions/51739973/cannot-import-semantic-ui-css
