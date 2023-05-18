import { Icon, List, Popup } from 'semantic-ui-react'
import { IncomeData, OutputData } from '../../common/interface'
import { calculate } from '../../utils/utils'
import { Badge, ListGroup, Tooltip } from 'flowbite-react'
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

  const plus = () => {
    return (
      <svg
        className="text-green-500"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.5"
        viewBox="0 0 24 24"
        xmlns="http://www.w3.org/2000/svg"
        aria-hidden="true"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M12 9v6m3-3H9m12 0a9 9 0 11-18 0 9 9 0 0118 0z"
        ></path>
      </svg>
    )
  }

  const minus = () => {
    return (
      <svg
        className="text-red-500"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.5"
        viewBox="0 0 24 24"
        xmlns="http://www.w3.org/2000/svg"
        aria-hidden="true"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M15 12H9m12 0a9 9 0 11-18 0 9 9 0 0118 0z"
        ></path>
      </svg>
    )
  }

  const userPlus = () => {
    return (
      <svg
        fill="none"
        stroke="currentColor"
        strokeWidth="1.5"
        viewBox="0 0 24 24"
        xmlns="http://www.w3.org/2000/svg"
        aria-hidden="true"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M19 7.5v3m0 0v3m0-3h3m-3 0h-3m-2.25-4.125a3.375 3.375 0 11-6.75 0 3.375 3.375 0 016.75 0zM4 19.235v-.11a6.375 6.375 0 0112.75 0v.109A12.318 12.318 0 0110.374 21c-2.331 0-4.512-.645-6.374-1.766z"
        ></path>
      </svg>
    )
  }

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
      <li className="relative w-full px-4 py-2 border-y border-gray-200">
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
      <li className="relative w-full px-4 py-2 border-y border-gray-200">
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
      <li className="relative w-full px-4 py-2 border-y border-gray-200">
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

  // Update outputData when income is received from state in App
  incomeData.income && (outputData = calculate(incomeData))

  // Display outputData when paye is calculated for the given income
  return (
    <div className="flex flex-col md:flex-row">
      <ul className="basis-1/2 font-subheading w-48 mt-4 bg-white border-gray-200">
        {
          outputData.paye && displayPaye()
          //   {outputData.kiwiSaver ? (
          //     <ListGroup.Item>
          //       <Icon name="minus" />
          //       <ListGroup.Content>
          //         <ListGroup.Header>KiwiSaver</ListGroup.Header>
          //         <ListGroup.Description className="loss">
          //           ${outputData.kiwiSaver}
          //         </ListGroup.Description>
          //       </ListGroup.Content>
          //     </ListGroup.Item>
          //   ) : (
          //     ''
          //   )}
          //   {outputData.studentLoan ? (
          //     <ListGroup.Item>
          //       <Icon name="minus" />
          //       <ListGroup.Content>
          //         <ListGroup.Header>Student Loan</ListGroup.Header>
          //         <ListGroup.Description className="loss">
          //           ${outputData.studentLoan}
          //         </ListGroup.Description>
          //       </ListGroup.Content>
          //     </ListGroup.Item>
          //   ) : (
          //     ''
          //   )}
          //   {/* Take Home Pay */}
          //   <ListGroup.Item>
          //     <Icon name="triangle right" />
          //     <ListGroup.Content>
          //       <ListGroup.Header>Take Home Pay</ListGroup.Header>
          //       <ListGroup.Description className="gain">
          //         ${outputData.takehome}
          //       </ListGroup.Description>
          //     </ListGroup.Content>
          //   </ListGroup.Item>
          // </ListGroup>
        }
        {outputData.acc && displayAcc()}
      </ul>
    </div>
  )
}

export default Output
