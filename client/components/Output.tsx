import { Fragment } from 'react'
import { Button } from 'semantic-ui-react'
import { IncomeData, OutputData } from '../../common/interface'
import { calculate } from '../../utils/utils'

interface Props {
  incomeData: IncomeData
}

function Output({ incomeData }: Props) {
  // Placeholder outputData object
  let outputData = {
    paye: null,
    takehome: null,
    acc: null,
    ietc: null,
    kiwiSaver: null,
    studentLoan: null,
  } as OutputData

  // Update outputData when income is received from state in App
  incomeData.income ? (outputData = calculate(incomeData)) : ''

  // Display outputData when paye is calculated for the given income
  return (
    <>{outputData.paye ? <p>{outputData.paye}</p> : <p>No income data</p>}</>
  )
}

export default Output
