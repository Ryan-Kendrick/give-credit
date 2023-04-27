import { ChangeEvent, useState, FormEvent, SyntheticEvent } from 'react'
import {
  Form,
  Container,
  Icon,
  Popup,
  FormCheckboxProps,
  Menu,
  Checkbox,
  Input as Inpt,
  Select,
  Button,
  DropdownProps,
} from 'semantic-ui-react'
import { IncomeData } from '../../common/interface'

interface Props {
  setIncome: (data: IncomeData) => void
}

function Input(props: Props) {
  // Local version of the incomeData object in App
  const [formData, setFormData] = useState({
    income: 0,
    incomePeriod: 'year',
    ietc: true,
    kiwiSaver: null,
    kiwiSaverRate: '0.03',
    studentLoan: null,
    studentLoanRate: '0.12',
  } as IncomeData)

  function incomeHandler(e: ChangeEvent<HTMLInputElement>) {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    })
  }

  function periodHandler(
    e: SyntheticEvent<HTMLElement, Event>,
    data: DropdownProps
  ) {
    typeof data.value === 'string' &&
      setFormData({
        ...formData,
        ['incomePeriod']: data.value,
      })
  }

  function customRateHandler(e: ChangeEvent<HTMLInputElement>) {
    // reduce student loan % to decimal
    const rate = (Number(e.target.value) * 0.01).toString()
    setFormData({
      ...formData,
      [e.target.name]: rate,
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
    console.log(formData)
  }

  const incomeByPeriod = [
    { key: 'hour', text: 'Hour', value: 'hour' },
    { key: 'week', text: 'Week', value: 'week' },
    { key: 'fortnight', text: 'Fortnight', value: 'fortnight' },
    { key: 'month', text: 'Month', value: 'month' },
    { key: 'year', text: 'Year', value: 'year' },
  ]

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
            <Container fluid className="kiwisaver-cont">
              <Form.Checkbox
                label="KiwiSaver"
                onChange={(e, data) => checkboxHandler(e, data)}
                name="kiwiSaver"
              />

              {formData.kiwiSaver && (
                <Menu vertical className="kiwisaver-menu">
                  <Menu.Item header>Kiwisaver Rate</Menu.Item>
                  <Menu.Menu>
                    <Menu.Item>
                      <Checkbox
                        radio
                        value="0.03"
                        label="3%"
                        checked={formData.kiwiSaverRate === '0.03'}
                        onChange={(e, data) => radioHandler(e, data)}
                        name="kiwiSaverRate"
                      ></Checkbox>
                    </Menu.Item>
                    <Menu.Item>
                      <Checkbox
                        radio
                        value="0.04"
                        label="4%"
                        checked={formData.kiwiSaverRate === '0.04'}
                        onChange={(e, data) => radioHandler(e, data)}
                        name="kiwiSaverRate"
                      ></Checkbox>
                    </Menu.Item>
                    <Menu.Item>
                      <Checkbox
                        radio
                        value="0.06"
                        label="6%"
                        checked={formData.kiwiSaverRate === '0.06'}
                        onChange={(e, data) => radioHandler(e, data)}
                        name="kiwiSaverRate"
                      ></Checkbox>
                    </Menu.Item>
                    <Menu.Item>
                      <Checkbox
                        radio
                        value="0.08"
                        label="8%"
                        checked={formData.kiwiSaverRate === '0.08'}
                        onChange={(e, data) => radioHandler(e, data)}
                        name="kiwiSaverRate"
                      ></Checkbox>
                    </Menu.Item>
                    <Menu.Item>
                      <Checkbox
                        radio
                        value="0.10"
                        label="10%"
                        checked={formData.kiwiSaverRate === '0.10'}
                        onChange={(e, data) => radioHandler(e, data)}
                        name="kiwiSaverRate"
                      ></Checkbox>
                    </Menu.Item>
                  </Menu.Menu>
                </Menu>
              )}
            </Container>

            <Container fluid className="studentloan-cont">
              <Form.Checkbox
                label="Student Loan"
                onChange={(e, data) => checkboxHandler(e, data)}
                name="studentLoan"
              />
              {formData.studentLoan && (
                <Menu vertical className="studentloan-menu">
                  <Menu.Item header>Student Loan Rate</Menu.Item>
                  <Menu.Menu>
                    <Menu.Item>
                      <Checkbox
                        radio
                        value="0.12"
                        label="12%"
                        checked={formData.studentLoanRate === '0.12'}
                        onChange={(e, data) => radioHandler(e, data)}
                        name="studentLoanRate"
                      ></Checkbox>
                    </Menu.Item>

                    <Menu.Item>
                      <Checkbox
                        radio
                        value="custom"
                        label="Custom"
                        checked={formData.studentLoanRate !== '0.12'}
                        onChange={(e, data) => radioHandler(e, data)}
                        name="studentLoanRate"
                      ></Checkbox>
                    </Menu.Item>
                    <Menu.Item>
                      <Inpt
                        label={{ basic: true, content: '%' }}
                        placeholder="Rate"
                        disabled={formData.studentLoanRate === '0.12'}
                        required={true}
                        name="studentLoanRate"
                        onChange={customRateHandler}
                      />
                    </Menu.Item>
                  </Menu.Menu>
                </Menu>
              )}
            </Container>
          </Container>

          <Form.Input
            label="Income: "
            type="number"
            placeholder="50000"
            id="input-income"
            name="income"
            onChange={incomeHandler}
            action
          >
            <input />
            <Select
              className="period-select"
              onChange={periodHandler}
              compact
              options={incomeByPeriod}
              value={formData.incomePeriod}
            />
            <Button action="Submit">Submit</Button>
          </Form.Input>
        </Container>
      </Form>
    </>
  )
}

export default Input
