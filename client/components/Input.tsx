import { ChangeEvent, useState, FormEvent, SyntheticEvent } from 'react'
import { IncomeData } from '../../common/interface'
import {
  Badge,
  Checkbox,
  Dropdown,
  Label,
  Radio,
  Tooltip,
} from 'flowbite-react'
import Infocircle from './Infocircle'

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

  function checkboxHandler(e: ChangeEvent<HTMLInputElement>) {
    setFormData({ ...formData, [`${e.target.name}`]: e.target.checked })
  }

  function radioHandler(e: ChangeEvent<HTMLInputElement>) {
    if (e.target.value) {
      setFormData({ ...formData, [`${e.target.name}`]: e.target.value })
    } else if (e.target.textContent) {
      const kiwiSaverRate = e.target.textContent
      const rateData = kiwiSaverRate?.split('%')[0]
      rateData.length < 2
        ? setFormData({ ...formData, ['kiwiSaverRate']: '0.0' + rateData })
        : setFormData({ ...formData, ['kiwiSaverRate']: '0.' + rateData })
    }
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
      <form className="flex h-20 border-y-2" onSubmit={submitHandler}>
        <div className="flex place-content-center w-[80vw] mx-auto">
          <div className="flex relative items-center gap-2">
            <div className="inline-flex items-center">
              <Label htmlFor="ietc">IETC</Label>
              <Tooltip
                content="Independent earner tax credit - can apply to incomes between $24,000 and $48,000"
                style="dark"
              >
                <Badge
                  className="px-0"
                  color="gray"
                  size="sm"
                  icon={Infocircle}
                />
              </Tooltip>
              <Checkbox
                defaultChecked
                onChange={(e) => checkboxHandler(e)}
                name="ietc"
                className="mx-1"
              />
            </div>

            <div className="flex relative items-center">
              <Label htmlFor="kiwiSaver">KiwiSaver</Label>
              <Checkbox
                className="mx-1"
                onChange={(e) => checkboxHandler(e)}
                name="kiwiSaver"
              />

              {formData.kiwiSaver && (
                <div className="absolute top-[3.2rem] border-2">
                  <Dropdown.Item className="gap-4 border-b-2 font-bold cursor-default hover:bg-inherit">
                    Kiwisaver Rate
                  </Dropdown.Item>
                  <Dropdown.Item
                    onClick={(e) => radioHandler(e)}
                    className="gap-4"
                  >
                    <Radio
                      value="0.03"
                      checked={formData.kiwiSaverRate === '0.03'}
                      onChange={(e) => radioHandler(e)}
                      name="kiwiSaverRate"
                    ></Radio>
                    <Label htmlFor="kiwiSaverRate">3%</Label>
                  </Dropdown.Item>
                  <Dropdown.Item
                    onClick={(e) => radioHandler(e)}
                    className="gap-4"
                  >
                    <Radio
                      value="0.04"
                      checked={formData.kiwiSaverRate === '0.04'}
                      onChange={(e) => radioHandler(e)}
                      name="kiwiSaverRate"
                    ></Radio>
                    <Label className="cursor-pointer" htmlFor="kiwiSaverRate">
                      4%
                    </Label>
                  </Dropdown.Item>
                  <Dropdown.Item
                    onClick={(e) => radioHandler(e)}
                    className="gap-4"
                  >
                    <Radio
                      value="0.06"
                      checked={formData.kiwiSaverRate === '0.06'}
                      onChange={(e) => radioHandler(e)}
                      name="kiwiSaverRate"
                    ></Radio>
                    <Label className="cursor-pointer" htmlFor="kiwiSaverRate">
                      6%
                    </Label>
                  </Dropdown.Item>
                  <Dropdown.Item
                    onClick={(e) => radioHandler(e)}
                    className="gap-4"
                  >
                    <Radio
                      value="0.08"
                      checked={formData.kiwiSaverRate === '0.08'}
                      onChange={(e) => radioHandler(e)}
                      name="kiwiSaverRate"
                    ></Radio>
                    <Label className="cursor-pointer" htmlFor="kiwiSaverRate">
                      8%
                    </Label>
                  </Dropdown.Item>
                  <Dropdown.Item
                    onClick={(e) => radioHandler(e)}
                    className="gap-4"
                  >
                    <Radio
                      value="0.10"
                      checked={formData.kiwiSaverRate === '0.10'}
                      onChange={(e) => radioHandler(e)}
                      name="kiwiSaverRate"
                    ></Radio>
                    <Label className="cursor-pointer" htmlFor="kiwiSaverRate">
                      10%
                    </Label>
                  </Dropdown.Item>
                </div>
              )}
            </div>

            {/* <div className="flex studentloan-cont">
              <form.Checkbox
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
            </div>
          </div>

          <form.Input
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
          </form.Input> */}
          </div>
        </div>
      </form>
    </>
  )
}

export default Input
