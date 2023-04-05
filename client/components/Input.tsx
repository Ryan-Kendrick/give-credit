import { ChangeEvent, useState, FormEvent } from 'react'
import { Input as Inpt, Label, Form, Radio, Checkbox } from 'semantic-ui-react'
import { IncomeData } from '../../common/interface'

interface Props {
  setIncome: (num: number) => void
}

function Input(props: Props) {
  // Local version of the incomeData object in App
  const [formData, setFormData] = useState({
    income: null,
    ietc: null,
    acc: null,
    kiwiSaver: null,
    studentLoan: null,
  } as IncomeData)

  function changeHandler(e: ChangeEvent<HTMLInputElement>) {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    })
  }

  //  Update the incomeData state in App, rendering the Output component
  const submitHandler = (e: FormEvent) => {
    e.preventDefault()
    props.setIncome(Number(formData.income))
  }

  return (
    <>
      <Form onSubmit={submitHandler}>
        <Form.Checkbox label="IETC" />
        <Form.Checkbox label="ACC" />
        <Form.Checkbox label="KiwiSaver" />
        <Form.Checkbox label="Student Loan" />

        <Form.Input
          label="Income: "
          action="Submit"
          placeholder="50000"
          type="number"
          id="input-income"
          name="income"
          onChange={changeHandler}
        />
      </Form>
    </>
  )
}

export default Input
