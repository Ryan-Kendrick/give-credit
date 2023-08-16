import { IncomeData, OutputData } from '../../common/interface'
import { calculate } from '../../utils/utils'
import { Badge, Tooltip } from 'flowbite-react'
import Infocircle from './Infocircle'
import PieChart from './Piechart'
interface Props {
  incomeData: IncomeData
  newSubmission: boolean
  setNewSubmission: (bool: boolean) => void
}

function Output({ incomeData, newSubmission, setNewSubmission }: Props) {
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
            <div className="ml-[1.85rem] text-gray-900">
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
            </div>
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

  const displayInfoToggle = () => {
    return (
      <>
        <label className="absolute right-1 top-1 inline-flex items-center cursor-pointer">
          <input
            type="checkbox"
            onChange={() => setNewSubmission(!newSubmission)}
            checked={!newSubmission}
            className="sr-only peer"
          />
          <div className="w-11 h-6 bg-gray-200 rounded-full peer peer-focus:ring-4 peer-focus:ring-blue-300 dark:peer-focus:ring-blue-800 dark:bg-gray-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-0.5 after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-blue-600"></div>
          <span className="ml-3 text-sm font-medium text-gray-900 dark:text-gray-300">
            Info
          </span>
        </label>
      </>
    )
  }

  const displayPlaceholder = () => {
    return (
      <>
        <div className="basis-1/2 font-subheading mt-2 ml-3 mr-4 bg-white leading-5">
          <h2 className="font-bold">
            Getting a refund is easier than you might think
          </h2>
          <p className="mb-2 py-1">
            All you have to do is click a button to open a donation tax credit
            account, upload receipts and you&apos;re done.
          </p>

          <ol className="items-start sm:flex py-2">
            <li className="relative sm:basis-1/3 mb-6 sm:mb-0">
              <div className="mr-1 sm:mr-0 inline-flex sm:flex items-center">
                <div className="z-10 flex items-center justify-center w-6 h-6 bg-blue-100 rounded-full ring-0 ring-white sm:ring-8 shrink-0">
                  <svg
                    className="w-3 h-3 text-blue-800"
                    aria-hidden="true"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="currentColor"
                    viewBox="0 0 16 16"
                  >
                    <path d="M14.5 3a.5.5 0 0 1 .5.5v9a.5.5 0 0 1-.5.5h-13a.5.5 0 0 1-.5-.5v-9a.5.5 0 0 1 .5-.5h13zm-13-1A1.5 1.5 0 0 0 0 3.5v9A1.5 1.5 0 0 0 1.5 14h13a1.5 1.5 0 0 0 1.5-1.5v-9A1.5 1.5 0 0 0 14.5 2h-13z" />{' '}
                    <path d="M5 8a.5.5 0 0 1 .5-.5h7a.5.5 0 0 1 0 1h-7A.5.5 0 0 1 5 8zm0-2.5a.5.5 0 0 1 .5-.5h7a.5.5 0 0 1 0 1h-7a.5.5 0 0 1-.5-.5zm0 5a.5.5 0 0 1 .5-.5h7a.5.5 0 0 1 0 1h-7a.5.5 0 0 1-.5-.5zm-1-5a.5.5 0 1 1-1 0 .5.5 0 0 1 1 0zM4 8a.5.5 0 1 1-1 0 .5.5 0 0 1 1 0zm0 2.5a.5.5 0 1 1-1 0 .5.5 0 0 1 1 0z" />
                  </svg>
                </div>
                <div className="hidden sm:flex w-full bg-gray-200 h-0.5 "></div>
              </div>
              <div className="inline sm:block mt-3 sm:pr-8">
                <h3 className="inline sm:block text-lg font-semibold text-gray-900">
                  Tax credit account
                </h3>
                <p className="text-base font-normal text-gray-600">
                  <a
                    className="underline decoration-sky-600 hover:decoration-blue-400 hover:decoration-2"
                    href="https://myir.ird.govt.nz/_/"
                  >
                    Login to myIR
                  </a>{' '}
                  and open a donation tax credit account by clicking ‘I want
                  to...’, then ‘Register for donation tax credit’
                </p>
              </div>
            </li>
            <li className="relative sm:basis-1/3 mb-6 sm:mb-0">
              <div className="mr-1 sm:mr-0 inline-flex sm:flex items-center">
                <div className="z-10 flex items-center justify-center w-6 h-6 bg-blue-100 rounded-full ring-0 ring-white sm:ring-8 shrink-0">
                  <svg
                    className="w-3 h-3 text-blue-800"
                    aria-hidden="true"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="currentColor"
                    viewBox="0 0 16 16"
                  >
                    <path d="M1.92.506a.5.5 0 0 1 .434.14L3 1.293l.646-.647a.5.5 0 0 1 .708 0L5 1.293l.646-.647a.5.5 0 0 1 .708 0L7 1.293l.646-.647a.5.5 0 0 1 .708 0L9 1.293l.646-.647a.5.5 0 0 1 .708 0l.646.647.646-.647a.5.5 0 0 1 .708 0l.646.647.646-.647a.5.5 0 0 1 .801.13l.5 1A.5.5 0 0 1 15 2v12a.5.5 0 0 1-.053.224l-.5 1a.5.5 0 0 1-.8.13L13 14.707l-.646.647a.5.5 0 0 1-.708 0L11 14.707l-.646.647a.5.5 0 0 1-.708 0L9 14.707l-.646.647a.5.5 0 0 1-.708 0L7 14.707l-.646.647a.5.5 0 0 1-.708 0L5 14.707l-.646.647a.5.5 0 0 1-.708 0L3 14.707l-.646.647a.5.5 0 0 1-.801-.13l-.5-1A.5.5 0 0 1 1 14V2a.5.5 0 0 1 .053-.224l.5-1a.5.5 0 0 1 .367-.27zm.217 1.338L2 2.118v11.764l.137.274.51-.51a.5.5 0 0 1 .707 0l.646.647.646-.646a.5.5 0 0 1 .708 0l.646.646.646-.646a.5.5 0 0 1 .708 0l.646.646.646-.646a.5.5 0 0 1 .708 0l.646.646.646-.646a.5.5 0 0 1 .708 0l.646.646.646-.646a.5.5 0 0 1 .708 0l.509.509.137-.274V2.118l-.137-.274-.51.51a.5.5 0 0 1-.707 0L12 1.707l-.646.647a.5.5 0 0 1-.708 0L10 1.707l-.646.647a.5.5 0 0 1-.708 0L8 1.707l-.646.647a.5.5 0 0 1-.708 0L6 1.707l-.646.647a.5.5 0 0 1-.708 0L4 1.707l-.646.647a.5.5 0 0 1-.708 0l-.509-.51z" />{' '}
                    <path d="M3 4.5a.5.5 0 0 1 .5-.5h6a.5.5 0 1 1 0 1h-6a.5.5 0 0 1-.5-.5zm0 2a.5.5 0 0 1 .5-.5h6a.5.5 0 1 1 0 1h-6a.5.5 0 0 1-.5-.5zm0 2a.5.5 0 0 1 .5-.5h6a.5.5 0 1 1 0 1h-6a.5.5 0 0 1-.5-.5zm0 2a.5.5 0 0 1 .5-.5h6a.5.5 0 0 1 0 1h-6a.5.5 0 0 1-.5-.5zm8-6a.5.5 0 0 1 .5-.5h1a.5.5 0 0 1 0 1h-1a.5.5 0 0 1-.5-.5zm0 2a.5.5 0 0 1 .5-.5h1a.5.5 0 0 1 0 1h-1a.5.5 0 0 1-.5-.5zm0 2a.5.5 0 0 1 .5-.5h1a.5.5 0 0 1 0 1h-1a.5.5 0 0 1-.5-.5zm0 2a.5.5 0 0 1 .5-.5h1a.5.5 0 0 1 0 1h-1a.5.5 0 0 1-.5-.5z" />
                  </svg>
                </div>
                <div className="hidden sm:flex w-full bg-gray-200 h-0.5"></div>
              </div>
              <div className="inline sm:block mt-3 sm:pr-8">
                <h3 className="inline sm:block text-lg font-semibold text-gray-900">
                  Upload Receipts
                </h3>
                <p className="text-base font-normal text-gray-600">
                  Upload donation receipts from your myIR account
                </p>
              </div>
            </li>
            <li className="relative sm:basis-1/3 mb-6 sm:mb-0">
              <div className="mr-1 sm:mr-0 inline-flex sm:flex items-center">
                <div className="z-10 flex items-center justify-center w-6 h-6 bg-blue-100 rounded-full ring-0 ring-white sm:ring-8 shrink-0">
                  <svg
                    className="w-3 h-3 text-blue-800"
                    aria-hidden="true"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="currentColor"
                    viewBox="0 0 16 16"
                  >
                    <path d="M11 6.5a.5.5 0 0 1 .5-.5h1a.5.5 0 0 1 .5.5v1a.5.5 0 0 1-.5.5h-1a.5.5 0 0 1-.5-.5v-1zm-3 0a.5.5 0 0 1 .5-.5h1a.5.5 0 0 1 .5.5v1a.5.5 0 0 1-.5.5h-1a.5.5 0 0 1-.5-.5v-1zm-5 3a.5.5 0 0 1 .5-.5h1a.5.5 0 0 1 .5.5v1a.5.5 0 0 1-.5.5h-1a.5.5 0 0 1-.5-.5v-1zm3 0a.5.5 0 0 1 .5-.5h1a.5.5 0 0 1 .5.5v1a.5.5 0 0 1-.5.5h-1a.5.5 0 0 1-.5-.5v-1z" />{' '}
                    <path d="M3.5 0a.5.5 0 0 1 .5.5V1h8V.5a.5.5 0 0 1 1 0V1h1a2 2 0 0 1 2 2v11a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2V3a2 2 0 0 1 2-2h1V.5a.5.5 0 0 1 .5-.5zM1 4v10a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1V4H1z" />
                  </svg>
                </div>
                <div className="hidden sm:flex w-full bg-gray-200 h-0.5"></div>
              </div>
              <div className="inline sm:block mt-3 sm:pr-8">
                <h3 className="inline sm:block text-lg font-semibold text-gray-900">
                  Receive Refund
                </h3>
                <p className="text-base font-normal text-gray-600">
                  At the end of the year receive an extra large tax refund
                </p>
              </div>
            </li>
          </ol>
        </div>
        <div className="basis-1/2 mt-2 ml-3 mr-4 font-subheading leading-5">
          <h2 className="font-bold">More info</h2>
          <p className="py-1">
            You can be refunded 33.33 cents for every dollar donated to{' '}
            <a
              className="underline decoration-sky-600 hover:decoration-blue-400 hover:decoration-2"
              href="https://myir.ird.govt.nz/tools/_/"
            >
              approved organisations.
            </a>{' '}
            The amount can be up to your taxable income and you will still
            receive the full 33.33% of what you donated.
          </p>
          Taxable income is generally paid by your employer in the form of PAYE{' '}
          <Tooltip className="inline" content='"Pay As You Earn"' style="dark">
            <span className="inline-block">{Infocircle()}</span>
          </Tooltip>
          .
          <p>
            Sending your donation receipts to IRD will reduce the amount of tax
            owed, resulting in a tax refund.
          </p>
        </div>
      </>
    )
  }

  const constructTable = () => {
    return (
      <>
        <ul className="basis-1/2 font-subheading md:w-48 mt-8 md:mt-4 bg-white border-gray-200">
          {displayPaye()}
          {outputData.acc && displayAcc()}
          {outputData.kiwiSaver && displayKiwiSaver()}
          {outputData.studentLoan && displayStudentLoan()}
          {outputData.takehome && displayTakeHomePay()}
        </ul>
        <PieChart chartData={outputData} />
      </>
    )
  }

  // Update outputData when income is received from state in App
  incomeData.income && (outputData = calculate(incomeData))

  // Display outputData when paye is calculated for the given income
  return (
    <>
      <div className="relative flex flex-col md:flex-row mb-12">
        {outputData.paye && displayInfoToggle()}
        {outputData.paye && newSubmission
          ? constructTable()
          : displayPlaceholder()}
      </div>
    </>
  )
}

export default Output
