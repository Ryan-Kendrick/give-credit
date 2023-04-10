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
  Checkbox,
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
    kiwiSaverRate: undefined,
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

  function radioHandler(
    e: FormEvent<HTMLInputElement>,
    data: FormCheckboxProps
  ) {
    setFormData({ ...formData, [`${data.name}`]: data.value })
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
            <Form.Checkbox
              label="KiwiSaver"
              onChange={(e, data) => checkboxHandler(e, data)}
              name="kiwiSaver"
            />
            <Menu vertical className="kiwisaver-menu">
              <Menu.Item header>Kiwisaver Rate</Menu.Item>
              <Menu.Menu>
                <Menu.Item>
                  <Checkbox
                    radio
                    value="3"
                    label="3%"
                    checked={formData.kiwiSaverRate === '3'}
                    onChange={(e, data) => radioHandler(e, data)}
                    name="kiwiSaverRate"
                  ></Checkbox>
                </Menu.Item>
                <Menu.Item>
                  <Checkbox
                    radio
                    value="4"
                    label="4%"
                    checked={formData.kiwiSaverRate === '4'}
                    onChange={(e, data) => radioHandler(e, data)}
                    name="kiwiSaverRate"
                  ></Checkbox>
                </Menu.Item>
                <Menu.Item>
                  <Checkbox
                    radio
                    value="6"
                    label="6%"
                    checked={formData.kiwiSaverRate === '6'}
                    onChange={(e, data) => radioHandler(e, data)}
                    name="kiwiSaverRate"
                  ></Checkbox>
                </Menu.Item>
                <Menu.Item>
                  <Checkbox
                    radio
                    value="8"
                    label="8%"
                    checked={formData.kiwiSaverRate === '8'}
                    onChange={(e, data) => radioHandler(e, data)}
                    name="kiwiSaverRate"
                  ></Checkbox>
                </Menu.Item>
                <Menu.Item>
                  <Checkbox
                    radio
                    value="10"
                    label="10%"
                    checked={formData.kiwiSaverRate === '10'}
                    onChange={(e, data) => radioHandler(e, data)}
                    name="kiwiSaverRate"
                  ></Checkbox>
                </Menu.Item>
              </Menu.Menu>
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
