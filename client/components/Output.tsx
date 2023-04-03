import { Fragment } from 'react'
import { Button } from 'semantic-ui-react'
import { IncomeData } from '../../common/interface'
import { calculate } from '../../utils/utils'

interface Props {
  incomeData: IncomeData
}

function Output({ incomeData }: Props) {
  return (
    <>
      {incomeData.income ? (
        <p>{calculate(incomeData)}</p>
      ) : (
        <p>No income data</p>
      )}
    </>
  )
}

export default Output
