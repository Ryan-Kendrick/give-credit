import { Routes, Route } from 'react-router-dom'

import Home from './Home'
import Input from './Input'

function App() {
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
        <Home />
        <Input />
      </body>
    </html>
  )
}

export default App
