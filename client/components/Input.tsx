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
import { motion, AnimatePresence, stagger } from 'framer-motion'

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
    submitted: false,
    display: {
      KiwiSaver: null,
      StudentLoan: null,
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

  function nearRadioHandler(e: FormEvent<HTMLLIElement | HTMLLabelElement>) {
    const labelEl = e.target as HTMLLabelElement
    const listEl = e.target as HTMLLIElement
    const rateData = listEl.textContent?.split('%')[0]
    if (
      labelEl.htmlFor === 'studentLoanRate' ||
      listEl.parentElement?.id === 'sl-rate'
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
    } else if (
      labelEl.htmlFor === 'kiwiSaverRate' ||
      listEl.parentElement?.id === 'ks-rate'
    ) {
      rateData && rateData.length < 2
        ? setFormData({ ...formData, ['kiwiSaverRate']: '0.0' + rateData })
        : setFormData({ ...formData, ['kiwiSaverRate']: '0.' + rateData })
    }
  }

  function radioHandler(e: ChangeEvent<HTMLInputElement>) {
    console.log(e.nativeEvent)
    const rate = formData.studentLoanCustom.Rate
    if (e.target.value === 'custom') {
      setFormData({
        ...formData,
        studentLoanRate: rate || 'awaiting custom rate',
        studentLoanCustom: {
          Enable: true,
          Rate: rate || null,
        },
      })
    } else {
      console.log(e)
      setFormData({ ...formData, [`${e.target.name}`]: e.target.value })
    }
  }

  const toggleDropdown = (selection: string) => {
    const toggle = Boolean(
      !formData.display[selection as keyof typeof formData.display]
    )
    setFormData({
      ...formData,
      display: {
        ...formData.display,
        [selection]: toggle,
      },
    })
  }

  const displayToggleKS = () => {
    return (
      <div className="absolute top-[6.75rem] right-[7.3rem] md:right-[2.7rem] md:top-[1.9rem] scale-150 md:scale-125 lg:scale-100">
        <button
          id="kiwisaver-dropdown-toggle"
          type="button"
          className="inline-flex w-full justify-center text-sm font-semibold text-gray-900"
          aria-expanded="true"
          aria-haspopup="true"
          onClick={() => toggleDropdown('KiwiSaver')}
        >
          {formData.display.KiwiSaver ? (
            <svg
              className="text-gray-400 w-5 h-5"
              xmlns="http://www.w3.org/2000/svg"
              fill="currentColor"
              viewBox="0 0 16 16"
            >
              {' '}
              <path
                fillRule="evenodd"
                d="M1.646 4.646a.5.5 0 0 1 .708 0L8 10.293l5.646-5.647a.5.5 0 0 1 .708.708l-6 6a.5.5 0 0 1-.708 0l-6-6a.5.5 0 0 1 0-.708z"
              />{' '}
            </svg>
          ) : (
            <svg
              className="text-gray-400 w-5 h-5"
              xmlns="http://www.w3.org/2000/svg"
              fill="currentColor"
              viewBox="0 0 16 16"
            >
              {' '}
              <path
                fillRule="evenodd"
                d="M4.646 1.646a.5.5 0 0 1 .708 0l6 6a.5.5 0 0 1 0 .708l-6 6a.5.5 0 0 1-.708-.708L10.293 8 4.646 2.354a.5.5 0 0 1 0-.708z"
              />{' '}
            </svg>
          )}
        </button>
      </div>
    )
  }

  const displayToggleSL = () => {
    return (
      <div className="absolute top-[6.75rem] right-[4.3rem] md:right-9 md:top-[1.9rem] scale-150 md:scale-125 lg:scale-100">
        <button
          id="studentloan-dropdown-toggle"
          type="button"
          className="inline-flex w-full justify-center text-sm font-semibold text-gray-900"
          aria-expanded="true"
          aria-haspopup="true"
          onClick={() => toggleDropdown('StudentLoan')}
        >
          {formData.display.StudentLoan ? (
            <svg
              className="text-gray-400 w-5 h-5"
              xmlns="http://www.w3.org/2000/svg"
              fill="currentColor"
              viewBox="0 0 16 16"
            >
              {' '}
              <path
                fillRule="evenodd"
                d="M1.646 4.646a.5.5 0 0 1 .708 0L8 10.293l5.646-5.647a.5.5 0 0 1 .708.708l-6 6a.5.5 0 0 1-.708 0l-6-6a.5.5 0 0 1 0-.708z"
              />{' '}
            </svg>
          ) : (
            <svg
              className="text-gray-400 w-5 h-5"
              xmlns="http://www.w3.org/2000/svg"
              fill="currentColor"
              viewBox="0 0 16 16"
            >
              {' '}
              <path
                fillRule="evenodd"
                d="M4.646 1.646a.5.5 0 0 1 .708 0l6 6a.5.5 0 0 1 0 .708l-6 6a.5.5 0 0 1-.708-.708L10.293 8 4.646 2.354a.5.5 0 0 1 0-.708z"
              />{' '}
            </svg>
          )}
        </button>
      </div>
    )
  }

  const displayKiwiSaver = () => {
    return (
      <motion.div
        initial={{ y: '-2.1rem', opacity: 0.5 }}
        animate={{ y: 0, opacity: 1, speed: 2 }}
        exit={{ y: '-2.1rem', opacity: 0, speed: 2 }}
        id="ks-rate"
        className="absolute top-[8.3rem] md:top-[3.2rem] right-[4.9rem] md:right-[0.3rem] border-2 bg-white z-50"
      >
        <Dropdown.Item className="gap-4 border-b-2 font-bold cursor-default hover:bg-inherit">
          KiwiSaver Rate
        </Dropdown.Item>
        <Dropdown.Item onClick={(e) => nearRadioHandler(e)} className="gap-4">
          <Radio
            value="0.03"
            checked={formData.kiwiSaverRate === '0.03'}
            onChange={(e) => radioHandler(e)}
            name="kiwiSaverRate"
          ></Radio>
          <Label htmlFor="kiwiSaverRate">3%</Label>
        </Dropdown.Item>
        <Dropdown.Item onClick={(e) => nearRadioHandler(e)} className="gap-4">
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
        <Dropdown.Item onClick={(e) => nearRadioHandler(e)} className="gap-4">
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
        <Dropdown.Item onClick={(e) => nearRadioHandler(e)} className="gap-4">
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
        <Dropdown.Item onClick={(e) => nearRadioHandler(e)} className="gap-4">
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
      </motion.div>
    )
  }

  const displayStudentLoan = () => {
    return (
      <motion.div
        initial={{ y: '-2.1rem', opacity: 0.5 }}
        animate={{ y: 0, opacity: 1, speed: 2 }}
        exit={{ y: '-2.1rem', opacity: 0, speed: 2 }}
        id="sl-rate"
        className="absolute top-[8.3rem] md:top-[3.2rem] right-[-0.5rem] md:right-[-2.5rem] border-2 w-[11rem] bg-white z-50"
      >
        <Dropdown.Item className="gap-4 border-b-2 font-bold cursor-default hover:bg-inherit">
          Student Loan Rate
        </Dropdown.Item>
        <Dropdown.Item onClick={(e) => nearRadioHandler(e)} className="gap-4">
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
        <Dropdown.Item onClick={(e) => nearRadioHandler(e)} className="gap-4">
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
      </motion.div>
    )
  }

  //  Update the incomeData state in App, rendering the Output component
  const submitHandler = (e: FormEvent) => {
    e.preventDefault()
    props.setIncome({ ...formData, ['income']: Number(formData.income) })
    props.setNewSubmission(true)
    formData.income &&
      setFormData({
        ...formData,
        display: {
          KiwiSaver: false,
          StudentLoan: false,
        },
        submitted: true,
      })
  }

  return (
    <>
      <form
        className="flex min-h-[5rem] py-4 pb-8 md:pb-4 border-y bg-stone-200 shadow-md"
        onSubmit={submitHandler}
      >
        <div className="flex flex-col md:flex-row md:place-content-evenly items-center gap-8 w-[80vw] mx-auto">
          <div className="flex relative items-center gap-2 md:gap-4 lg:gap-8">
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
                className="mx-1 scale-125 md:scale-100"
              />
            </div>

            <div className="flex relative items-center">
              <Label htmlFor="useKiwiSaver">KiwiSaver</Label>
              <Checkbox
                className="mx-1 scale-125 md:scale-100"
                onChange={(e) => checkboxHandler(e)}
                name="useKiwiSaver"
              />
              {formData.useKiwiSaver === true && displayToggleKS()}
              <AnimatePresence>
                {formData.display.KiwiSaver && displayKiwiSaver()}
              </AnimatePresence>
            </div>
            <div className="flex relative items-center">
              <Label className="min-w-[93.5px]" htmlFor="useStudentLoan">
                Student Loan
              </Label>
              <Checkbox
                className="mx-1 scale-125 md:scale-100"
                onChange={(e) => checkboxHandler(e)}
                name="useStudentLoan"
              />
              {formData.useStudentLoan === true && displayToggleSL()}
              <AnimatePresence>
                {formData.display.StudentLoan && displayStudentLoan()}
              </AnimatePresence>
            </div>
          </div>
          <div className="flex h-full items-center">
            <div className="flex h-1/2 items-center">
              <select
                className="z-20 relative overflow-hidden bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-l-lg focus:ring-blue-500 focus:border-blue-500 block p-2.5 mr-[5.6rem] sm:mr-[3.9rem] md:mr-16 lg:mr-[3.9rem] xl:mr-[3.8rem]"
                onChange={(e) => periodHandler(e)}
              >
                <motion.option
                  initial={{ y: '-2.1rem', opacity: 0.5 }}
                  animate={{ y: 0, opacity: 1, speed: 2 }}
                  exit={{ y: '-2.1rem', opacity: 0, speed: 2 }}
                  className="border-2 bg-white z-50"
                  defaultValue="year"
                >
                  Annual
                </motion.option>
                <motion.option
                  initial={{ y: '-2.1rem', opacity: 0.5 }}
                  animate={{ y: 0, opacity: 1, speed: 2 }}
                  exit={{ y: '-2.1rem', opacity: 0, speed: 2 }}
                  className="border-2 bg-white z-50"
                  defaultValue="year"
                  value="month"
                >
                  Monthly
                </motion.option>
                <motion.option
                  initial={{ y: '-2.1rem', opacity: 0.5 }}
                  animate={{ y: 0, opacity: 1, speed: 2 }}
                  exit={{ y: '-2.1rem', opacity: 0, speed: 2 }}
                  className="border-2 bg-white z-50"
                  defaultValue="year"
                  value="fortnight"
                >
                  Fortnightly
                </motion.option>
                <motion.option
                  initial={{ y: '-2.1rem', opacity: 0.5 }}
                  animate={{ y: 0, opacity: 1, speed: 2 }}
                  exit={{ y: '-2.1rem', opacity: 0, speed: 2 }}
                  className="border-2 bg-white z-50"
                  defaultValue="year"
                  value="week"
                >
                  Weekly
                </motion.option>
                <motion.option
                  initial={{ y: '-2.1rem', opacity: 0.5 }}
                  animate={{ y: 0, opacity: 1, speed: 2 }}
                  exit={{ y: '-2.1rem', opacity: 0, speed: 2 }}
                  className="border-2 bg-white z-50"
                  defaultValue="year"
                  value="hour"
                >
                  Hourly
                </motion.option>
              </select>
              <div className="relative w-full md:min-w-[12rem]">
                <div className="flex relative">
                  <span className="inline-flex items-center px-3 text-sm text-gray-900 bg-gray-200 border border-r-0 border-gray-300">
                    $
                  </span>

                  <input
                    type="number"
                    className="block p-2.5 rounded-none rounded-r-lg border text-gray-900 focus:ring-blue-500 focus:border-blue-500 block flex-1 w-[4rem] sm:w-full text-sm border-gray-300 p-2.5 "
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
