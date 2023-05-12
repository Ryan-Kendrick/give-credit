import { Icon, List, Popup } from 'semantic-ui-react'
import { IncomeData, OutputData } from '../../common/interface'
import { calculate } from '../../utils/utils'

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

  // Update outputData when income is received from state in App
  incomeData.income && (outputData = calculate(incomeData))

  // Display outputData when paye is calculated for the given income
  return (
    <>
      {outputData.paye ? (
        <List>
          {/* PAYE */}
          <List.Item>
            <Icon name="minus" />
            <List.Content>
              <List.Header>PAYE</List.Header>
              <List.Description className="opportunity">
                <strong>${outputData.paye}</strong>
              </List.Description>

              {/* If IETC was checked and resulted in a credit display the amount credited */}
              {outputData.ietc && outputData.ietc !== '0' ? (
                <List.Item>
                  <List.Content>
                    <List.Description>
                      <Icon name="plus" size="small" />
                      Tax credit of{' '}
                      <span className="gain">
                        ${outputData.ietc}
                      </span> applied{' '}
                      <Popup
                        content="Independent earner tax credit"
                        trigger={<Icon name="info circle" size="large" />}
                      />
                    </List.Description>
                  </List.Content>
                </List.Item>
              ) : (
                ''
              )}
            </List.Content>
          </List.Item>
          {/* ACC */}
          <List.Item>
            <Icon name="minus" />
            <List.Content>
              <List.Header>ACC levy</List.Header>
              <List.Description className="loss">
                ${outputData.acc}
              </List.Description>
            </List.Content>
          </List.Item>
          {outputData.kiwiSaver ? (
            <List.Item>
              <Icon name="minus" />
              <List.Content>
                <List.Header>KiwiSaver</List.Header>
                <List.Description className="loss">
                  ${outputData.kiwiSaver}
                </List.Description>
              </List.Content>
            </List.Item>
          ) : (
            ''
          )}
          {outputData.studentLoan ? (
            <List.Item>
              <Icon name="minus" />
              <List.Content>
                <List.Header>Student Loan</List.Header>
                <List.Description className="loss">
                  ${outputData.studentLoan}
                </List.Description>
              </List.Content>
            </List.Item>
          ) : (
            ''
          )}
          {/* Take Home Pay */}
          <List.Item>
            <Icon name="triangle right" />
            <List.Content>
              <List.Header>Take Home Pay</List.Header>
              <List.Description className="gain">
                ${outputData.takehome}
              </List.Description>
            </List.Content>
          </List.Item>
        </List>
      ) : (
        ''
      )}
    </>
  )
}

export default Output
