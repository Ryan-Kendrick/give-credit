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

  // Update outputData when income is received from state in App
  incomeData.income && (outputData = calculate(incomeData))

  // Display outputData when paye is calculated for the given income
  return (
    <>
      <ul className="w-48 mt-4 text-sm font-medium text-gray-900 bg-white border border-gray-200 rounded-lg">
        <li className="w-full px-4 py-2 border-b border-gray-200 rounded-t-lg ">
          Profile
        </li>
        <li className="w-full px-4 py-2 border-b border-gray-200">Settings</li>
        <li className="w-full px-4 py-2 border-b border-gray-200">Messages</li>
        <li className="w-full px-4 py-2 rounded-b-lg">Download</li>
      </ul>
      {outputData.paye ? (
        <ListGroup>
          {/* PAYE */}
          <ListGroup.Item>
            <Icon name="minus" />
            <ListGroup.Content>
              <ListGroup.Header>PAYE</ListGroup.Header>
              <ListGroup.Description className="opportunity">
                <strong>${outputData.paye}</strong>
              </ListGroup.Description>

              {/* If IETC was checked and resulted in a credit display the amount credited */}
              {outputData.ietc && outputData.ietc !== '0' ? (
                <ListGroup.Item>
                  <ListGroup.Content>
                    <ListGroup.Description>
                      <div className="inline-flex items-center">
                        <Icon name="plus" size="small" />
                        Tax credit of <span>${outputData.ietc}</span> applied
                        <Tooltip
                          content="Independent earner tax credit"
                          style="dark"
                        >
                          <Badge color="" size="sm" icon={Infocircle} />
                        </Tooltip>
                      </div>
                    </ListGroup.Description>
                  </ListGroup.Content>
                </ListGroup.Item>
              ) : (
                ''
              )}
            </ListGroup.Content>
          </ListGroup.Item>
          {/* ACC */}
          <ListGroup.Item>
            <Icon name="minus" />
            <ListGroup.Content>
              <ListGroup.Header>ACC levy</ListGroup.Header>
              <ListGroup.Description className="loss">
                ${outputData.acc}
              </ListGroup.Description>
            </ListGroup.Content>
          </ListGroup.Item>
          {outputData.kiwiSaver ? (
            <ListGroup.Item>
              <Icon name="minus" />
              <ListGroup.Content>
                <ListGroup.Header>KiwiSaver</ListGroup.Header>
                <ListGroup.Description className="loss">
                  ${outputData.kiwiSaver}
                </ListGroup.Description>
              </ListGroup.Content>
            </ListGroup.Item>
          ) : (
            ''
          )}
          {outputData.studentLoan ? (
            <ListGroup.Item>
              <Icon name="minus" />
              <ListGroup.Content>
                <ListGroup.Header>Student Loan</ListGroup.Header>
                <ListGroup.Description className="loss">
                  ${outputData.studentLoan}
                </ListGroup.Description>
              </ListGroup.Content>
            </ListGroup.Item>
          ) : (
            ''
          )}
          {/* Take Home Pay */}
          <ListGroup.Item>
            <Icon name="triangle right" />
            <ListGroup.Content>
              <ListGroup.Header>Take Home Pay</ListGroup.Header>
              <ListGroup.Description className="gain">
                ${outputData.takehome}
              </ListGroup.Description>
            </ListGroup.Content>
          </ListGroup.Item>
        </ListGroup>
      ) : (
        ''
      )}
    </>
  )
}

export default Output
