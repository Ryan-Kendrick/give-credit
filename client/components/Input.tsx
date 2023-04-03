import { ChangeEvent, useState, FormEvent } from 'react'

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
          <input
            id="input-income"
            name="income"
            type="number"
            value={formData.income}
            onChange={changeHandler}
          />
          <button type="submit" className="formButton">
            Go
          </button>
        </form>
      </div>
    </>
  )
}

export default Input
