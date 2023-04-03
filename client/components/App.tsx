import { useState } from 'react'
import Output from './Output'
import Input from './Input'

function App() {
  const [income, setIncome] = useState(0)

  return (
    <html lang="en">
      <head>
        <meta charSet="UTF-8" />
        <meta httpEquiv="X-UA-Compatible" content="IE=edge" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <title>Tax Credit Project</title>
      </head>
      <body>
        <header></header>
        <Input setIncome={setIncome} />
        <Output income={income} />
      </body>
    </html>
  )
}

export default App
