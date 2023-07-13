import { IncomeData, OutputData } from '../../common/interface'
import { calculate } from '../../utils/utils'
import { Badge, Tooltip } from 'flowbite-react'
import Infocircle from './Infocircle'

interface Props {
  incomeData: IncomeData
}

function Output({ incomeData }: Props) {
  // Placeholder outputData object to be reassigned with result of calculate
  let outputData = {
    paye: '',
    takehome: '',
    acc: '',
    ietc: '',
    kiwiSaver: '',
    studentLoan: '',
    errors: [],
  } as OutputData

  const displayPaye = () => {
    return (
      <li className="relative w-full px-4 py-2 border-y border-gray-200">
        <svg
          className="inline w-3 h-3 mr-1 fill-current"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
        >
          <path d="M0 10h24v4h-24z" />
        </svg>
        PAYE
        <p className="absolute font-bold text-amber-600 right-4 top-[0.45rem]">
          ${outputData.paye}
        </p>
        {/* If IETC was checked and resulted in a credit display the amount credited */}
        {outputData.ietc && outputData.ietc !== '0' ? (
          <>
            <span className="absolute left-[1.6rem] bottom-6">
              <svg
                className="w-4 h-4 fill-current"
                viewBox="0 0 48 48"
                xmlns="http://www.w3.org/2000/svg"
              >
                <rect width="48" height="48" fill="none" />
                <path d="M26,30H42a2,2,0,0,0,2-2V20a2,2,0,0,0-2-2H26a2,2,0,0,0-2,2v2H16V14h6a2,2,0,0,0,2-2V4a2,2,0,0,0-2-2H6A2,2,0,0,0,4,4v8a2,2,0,0,0,2,2h6V40a2,2,0,0,0,2,2H24v2a2,2,0,0,0,2,2H42a2,2,0,0,0,2-2V36a2,2,0,0,0-2-2H26a2,2,0,0,0-2,2v2H16V26h8v2A2,2,0,0,0,26,30Z" />
              </svg>
            </span>
            <p className="ml-[1.85rem] text-gray-900">
              Tax credit of{' '}
              <span className="text-green-600">${outputData.ietc}</span> applied
              <div className="inline-flex">
                <Tooltip
                  className="inline"
                  content="Independent earner tax credit"
                  style="dark"
                >
                  <Badge
                    color=""
                    className="inline"
                    size="sm"
                    icon={Infocircle}
                  />
                </Tooltip>
              </div>
            </p>
          </>
        ) : (
          ''
        )}
      </li>
    )
  }
  const displayAcc = () => {
    return (
      <li className="relative w-full px-4 py-2 border-b border-gray-200">
        <svg
          className="inline w-3 h-3 mr-1 fill-current"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
        >
          <path d="M0 10h24v4h-24z" />
        </svg>
        ACC
        <p className="absolute font-bold text-red-600 right-4 top-[0.45rem]">
          ${outputData.acc}
        </p>
      </li>
    )
  }
  const displayKiwiSaver = () => {
    return (
      <li className="relative w-full px-4 py-2 border-b border-gray-200">
        <svg
          className="inline w-3 h-3 mr-1 fill-current"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
        >
          <path d="M0 10h24v4h-24z" />
        </svg>
        KiwiSaver
        <p className="absolute font-bold text-red-600 right-4 top-[0.45rem]">
          ${outputData.kiwiSaver}
        </p>
      </li>
    )
  }
  const displayStudentLoan = () => {
    return (
      <li className="relative w-full px-4 py-2 border-b border-gray-200">
        <svg
          className="inline w-3 h-3 mr-1 fill-current"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
        >
          <path d="M0 10h24v4h-24z" />
        </svg>
        Student Loan
        <p className="absolute font-bold text-red-600 right-4 top-[0.45rem]">
          ${outputData.studentLoan}
        </p>
      </li>
    )
  }
  const displayTakeHomePay = () => {
    return (
      <li className="relative w-full pl-[0.76rem] pr-4 py-2 border-b border-gray-200">
        <svg
          className="inline text-black w-5 h-5 fill-current"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          viewBox="0 0 24 24"
          xmlns="http://www.w3.org/2000/svg"
          aria-hidden="true"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M12 4.5v15m7.5-7.5h-15"
          ></path>
        </svg>
        Take Home Pay
        <p className="absolute font-bold text-green-600 right-4 top-[0.45rem]">
          ${outputData.takehome}
        </p>
      </li>
    )
  }

  const displayPlaceholder = () => {
    return (
      <div>
        <p>Placeholder</p>
      </div>
    )
  }

  // Update outputData when income is received from state in App
  incomeData.income && (outputData = calculate(incomeData))

  // Display outputData when paye is calculated for the given income
  return (
    <>
      {!outputData.paye && displayPlaceholder()}
      <div className="flex flex-col md:flex-row mb-12">
        <ul className="basis-1/2 font-subheading w-48 mt-4 bg-white border-gray-200">
          {outputData.paye && displayPaye()}
          {outputData.acc && displayAcc()}
          {outputData.kiwiSaver && displayKiwiSaver()}
          {outputData.studentLoan && displayStudentLoan()}
          {outputData.takehome && displayTakeHomePay()}
        </ul>
      </div>
    </>
  )
}

export default Output
