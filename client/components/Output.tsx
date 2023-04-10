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
  } as OutputData

  // Update outputData when income is received from state in App
  incomeData.income ? (outputData = calculate(incomeData)) : ''

  // Display outputData when paye is calculated for the given income
  return (
    <>
      {outputData.paye ? (
        <>
          <List>
            <List.Item>
              <Icon name="minus" />
              <List.Content>
                <List.Header>PAYE</List.Header>
                <List.Description className="opportunity">
                  <strong>${outputData.paye}</strong>
                </List.Description>
                {outputData.ietc ? (
                  <List.Item>
                    <List.Content>
                      <List.Description>
                        Tax credit of{' '}
                        <span className="gain">${outputData.ietc}</span> applied{' '}
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
            <List.Item>
              <Icon name="minus" />
              <List.Content>
                <List.Header>ACC levy</List.Header>
                <List.Description className="loss">
                  ${outputData.acc}
                </List.Description>
              </List.Content>
            </List.Item>
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
        </>
      ) : (
        <p>No income data</p>
      )}
    </>
  )
}

export default Output
