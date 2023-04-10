import { ChangeEvent, useState, FormEvent } from 'react'
import {
  Input as Inpt,
  Label,
  Form,
  Container,
  Icon,
  Popup,
  FormCheckboxProps,
  Menu,
} from 'semantic-ui-react'
import { IncomeData } from '../../common/interface'

interface Props {
  setIncome: (data: IncomeData) => void
}

function Input(props: Props) {
  // Local version of the incomeData object in App
  const [formData, setFormData] = useState({
    income: 0,
    ietc: true,
    kiwiSaver: null,
    studentLoan: null,
  } as IncomeData)

  function changeHandler(e: ChangeEvent<HTMLInputElement>) {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    })
  }

  function checkboxHandler(
    e: FormEvent<HTMLInputElement>,
    data: FormCheckboxProps
  ) {
    setFormData({ ...formData, [`${data.name}`]: data.checked })
  }

  //  Update the incomeData state in App, rendering the Output component
  const submitHandler = (e: FormEvent) => {
    e.preventDefault()
    props.setIncome({ ...formData, ['income']: Number(formData.income) })
  }

  return (
    <>
      <Form onSubmit={submitHandler}>
        <Container fluid className="input-cont">
          <Container fluid className="checkbox-cont">
            <Form.Checkbox
              label="IETC"
              defaultChecked
              onChange={(e, data) => checkboxHandler(e, data)}
              name="ietc"
            />
            <Popup
              content="Independent earner tax credit - can apply to incomes between $24,000 and $48,000"
              trigger={<Icon name="info circle" size="large" />}
            />
            {/* <Form.Checkbox label="ACC" defaultChecked /> */}
            {/* <Icon name="info circle" size="large" /> */}
            <Menu vertical>
              <Form.Checkbox
                label="KiwiSaver"
                onChange={(e, data) => checkboxHandler(e, data)}
                name="kiwiSaver"
              />
            </Menu>
            <Form.Checkbox
              label="Student Loan"
              onChange={(e, data) => checkboxHandler(e, data)}
              name="studentLoan"
            />
          </Container>
          <Form.Input
            label="Income: "
            action="Submit"
            placeholder="50000"
            type="number"
            id="input-income"
            name="income"
            onChange={changeHandler}
          />
        </Container>
      </Form>
    </>
  )
}

export default Input
