import { Fragment } from 'react'
import { Button } from 'semantic-ui-react'
import { Props } from '../../common/interface'
import { calculateTotal } from '../../utils/utils'

function Output(props: Props) {
  const income = 50000

  return (
    <>
      <p>Testing semanticUI!</p>
      <Button>test button</Button>
      <p>{calculateTotal(income)}</p>
    </>
  )
}

export default Output
