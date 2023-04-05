import { ChangeEvent, useState, FormEvent } from 'react'
import { Input as Inpt, Label, Form } from 'semantic-ui-react'
import { IncomeData } from '../../common/interface'

interface Props {
  setIncome: (num: number) => void
}

function Input(props: Props) {
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

  const submitHandler = (e: FormEvent) => {
    e.preventDefault()
    props.setIncome(Number(formData.income))
  }

  return (
    <>
      <div className="form-cont">
        <form onSubmit={submitHandler}>
          <Form.Input
            label="Income: "
            action="Submit"
            placeholder="50000"
            type="number"
            id="input-income"
            name="income"
            onChange={changeHandler}
          />
        </form>
      </div>
    </>
  )
}

export default Input
