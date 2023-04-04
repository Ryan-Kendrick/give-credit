import { ChangeEvent, useState, FormEvent } from 'react'
import { Input as Inpt, Label, Form } from 'semantic-ui-react'

interface Props {
  setIncome: (num: number) => void
}

function Input(props: Props) {
  const [formData, setFormData] = useState({
    income: 0,
  })

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
      <h1>Tax Calculator Project</h1>
      <div className="form-cont">
        <form onSubmit={submitHandler}>
          <label htmlFor="Income">Income:</label>
          <Form.Input action="test" />
          <Inpt
            action="Submit"
            placeholder="Income"
            id="input-income"
            name="income"
            value={formData.income}
            onChange={changeHandler}
          />
        </form>
      </div>
    </>
  )
}

export default Input
