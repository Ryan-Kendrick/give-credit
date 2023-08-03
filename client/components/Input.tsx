import { ChangeEvent, useState, FormEvent } from 'react'
import { IncomeData } from '../../common/interface'
import {
  Badge,
  Checkbox,
  Dropdown,
  Label,
  Radio,
  TextInput,
  Tooltip,
} from 'flowbite-react'
import Infocircle from './Infocircle'

interface Props {
  setIncome: (data: IncomeData) => void
  setNewSubmission: (bool: boolean) => void
}

function Input(props: Props) {
  // Local version of the incomeData object in App
  const [formData, setFormData] = useState({
    income: 0,
    incomePeriod: 'year',
    ietc: true,
    useKiwiSaver: null,
    kiwiSaverRate: '0.03',
    useStudentLoan: null,
    studentLoanRate: '0.12',
    studentLoanCustom: {
      Enable: null,
      Rate: null,
    },
    display: {
      KiwiSaver: false,
      StudentLoan: false,
    },
  } as IncomeData)

  function incomeHandler(e: ChangeEvent<HTMLInputElement>) {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    })
  }

  function periodHandler(e: ChangeEvent<HTMLSelectElement>) {
    setFormData({
      ...formData,
      ['incomePeriod']: e.target.value,
    })
  }

  function customRateHandler(e: ChangeEvent<HTMLInputElement>) {
    // If a custom rate was previously used, use it
    const rate = (Number(e.target.value) * 0.01).toString()
    setFormData({
      ...formData,
      [e.target.name]: rate,
      studentLoanCustom: {
        Enable: true,
        Rate: rate,
      },
    })
  }

  function checkboxHandler(e: ChangeEvent<HTMLInputElement>) {
    const box = e.target.name.replace('use', '')
    setFormData({
      ...formData,
      [`${e.target.name}`]: e.target.checked,
      display: { ...formData.display, [box]: e.target.checked },
    })
  }

  function radioHandler(e: ChangeEvent<HTMLInputElement>) {
    const rateData = e.target.textContent?.split('%')[0]
    if (e.target.value) {
      const rate = formData.studentLoanCustom.Rate
      if (e.target.value === 'custom') {
        console.log('here')
        setFormData({
          ...formData,
          studentLoanRate: rate || 'awaiting custom rate',
          studentLoanCustom: {
            Enable: true,
            Rate: rate || null,
          },
        })
      } else {
        setFormData({ ...formData, [`${e.target.name}`]: e.target.value })
        console.log('here2')
      }
      // Clicking around radio buttons handling
    } else if (
      e.target.htmlFor === 'kiwiSaverRate' ||
      e.target.parentElement?.id === 'ks-rate'
    ) {
      rateData && rateData.length < 2
        ? setFormData({ ...formData, ['kiwiSaverRate']: '0.0' + rateData })
        : setFormData({ ...formData, ['kiwiSaverRate']: '0.' + rateData })
    } else if (
      e.target.htmlFor === 'studentLoanRate' ||
      e.target.parentElement?.id === 'sl-rate'
    ) {
      if (!isNaN(Number(rateData))) {
        setFormData({ ...formData, ['studentLoanRate']: '0.' + rateData })
      } else if (formData.studentLoanCustom.Rate) {
        const rate = formData.studentLoanCustom.Rate
        setFormData({
          ...formData,
          studentLoanRate: rate,
          studentLoanCustom: {
            Enable: true,
            Rate: rate,
          },
        })
      } else {
        setFormData({
          ...formData,
          studentLoanRate: 'awaiting custom rate',
          studentLoanCustom: {
            Enable: true,
            Rate: null,
          },
        })
      }
    }
  }

  //  Update the incomeData state in App, rendering the Output component
  const submitHandler = (e: FormEvent) => {
    e.preventDefault()
    props.setIncome({ ...formData, ['income']: Number(formData.income) })
    props.setNewSubmission(true)
    setFormData({
      ...formData,
      display: {
        KiwiSaver: false,
        StudentLoan: false,
      },
    })
  }

  return (
    <>
      <form
        className="flex min-h-[5rem] py-4 border-y bg-stone-200 shadow-md"
        onSubmit={submitHandler}
      >
        <div className="flex flex-col md:flex-row md:place-content-evenly items-center gap-8 w-[80vw] min-w-[420px] mx-auto">
          <div className="flex relative items-center gap-2 ">
            <div className="inline-flex items-center">
              <Label htmlFor="ietc">IETC</Label>
              <Tooltip
                content="Independent Earner Tax Credit - Applies to incomes between $24,000 and $48,000"
                style="dark"
              >
                <Badge
                  className="pr-0 pl-[2px]"
                  color="initial"
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
              <Label htmlFor="useKiwiSaver">KiwiSaver</Label>
              <Checkbox
                className="mx-1"
                onChange={(e) => checkboxHandler(e)}
                name="useKiwiSaver"
              />
              <div className="absolute md:right-0 md:top-4">
                <button
                  type="button"
                  className="inline-flex w-full justify-center gap-x-1.5 rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50"
                  id="menu-button"
                  aria-expanded="true"
                  aria-haspopup="true"
                  onClick={(e) => toggleDropdown}
                >
                  <svg
                    className="-mr-1 h-5 w-5 text-gray-400"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                    aria-hidden="true"
                  >
                    <path
                      fillRule="evenodd"
                      d="M5.23 7.21a.75.75 0 011.06.02L10 11.168l3.71-3.938a.75.75 0 111.08 1.04l-4.25 4.5a.75.75 0 01-1.08 0l-4.25-4.5a.75.75 0 01.02-1.06z"
                      clipRule="evenodd"
                    />
                  </svg>
                </button>
              </div>
              {formData.display.KiwiSaver && (
                <div
                  id="ks-rate"
                  className="absolute top-[7.2rem] md:top-[3.2rem] right-[1rem] md:right-[0.3rem] border-2 bg-white z-50"
                >
                  <Dropdown.Item className="gap-4 border-b-2 font-bold cursor-default hover:bg-inherit">
                    KiwiSaver Rate
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

            <div className="flex relative items-center">
              <Label className="min-w-[93.5px]" htmlFor="useStudentLoan">
                Student Loan
              </Label>
              <Checkbox
                className="mx-1"
                onChange={(e) => checkboxHandler(e)}
                name="useStudentLoan"
              />
              {formData.display.StudentLoan && (
                <div
                  id="sl-rate"
                  className="absolute top-[7.2rem] md:top-[3.2rem] right-[-2.6rem] md:right-[-3.3rem] border-2 w-[11rem] bg-white z-50"
                >
                  <Dropdown.Item className="gap-4 border-b-2 font-bold cursor-default hover:bg-inherit">
                    Student Loan Rate
                  </Dropdown.Item>
                  <Dropdown.Item
                    onClick={(e) => radioHandler(e)}
                    className="gap-4"
                  >
                    <Radio
                      value="0.12"
                      checked={formData.studentLoanRate === '0.12'}
                      onChange={(e) => radioHandler(e)}
                      name="studentLoanRate"
                    ></Radio>
                    <Label className="cursor-pointer" htmlFor="studentLoanRate">
                      12%
                    </Label>
                  </Dropdown.Item>

                  <Dropdown.Item
                    onClick={(e) => radioHandler(e)}
                    className="gap-4"
                  >
                    <Radio
                      value="custom"
                      checked={formData.studentLoanRate !== '0.12'}
                      onChange={(e) => radioHandler(e)}
                      name="studentLoanRate"
                    ></Radio>
                    <Label className="cursor-pointer" htmlFor="studentLoanRate">
                      Custom
                    </Label>
                  </Dropdown.Item>
                  <Dropdown.Item>
                    <TextInput
                      type="number"
                      addon="%"
                      placeholder="Rate"
                      disabled={formData.studentLoanRate === '0.12'}
                      required={true}
                      name="studentLoanRate"
                      onChange={customRateHandler}
                    />
                  </Dropdown.Item>
                </div>
              )}
            </div>
          </div>
          <div className="flex h-full items-center">
            <div className="flex h-1/2 items-center">
              <select
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-l-lg focus:ring-blue-500 focus:border-blue-500 block p-2.5"
                onChange={(e) => periodHandler(e)}
              >
                <option defaultValue="year">Annual</option>
                <option value="month">Monthly</option>
                <option value="fortnight">Fortnightly</option>
                <option value="week">Weekly</option>
                <option value="hour">Hourly</option>
              </select>
              <div className="relative w-full min-w-[15rem]">
                <div className="flex relative">
                  <span className="inline-flex items-center px-3 text-sm text-gray-900 bg-gray-200 border border-r-0 border-gray-300">
                    $
                  </span>

                  <input
                    type="number"
                    className="block p-2.5 pl-[2px] rounded-none rounded-r-lg border text-gray-900 focus:ring-blue-500 focus:border-blue-500 block flex-1 min-w-0 w-full text-sm border-gray-300 p-2.5  dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    placeholder="0"
                    name="income"
                    onChange={incomeHandler}
                  />
                  <button
                    type="submit"
                    className="absolute top-[0.05rem] right-[0.05rem] z-20 p-2.5 text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-r-lg px-4 py-2"
                  >
                    Submit
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </form>
    </>
  )
}

export default Input
