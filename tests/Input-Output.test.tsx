import '@testing-library/jest-dom'
import { render, screen, within } from '@testing-library/react'
import userEvent from '@testing-library/user-event'

import Output from '../client/components/Output'
import Input from '../client/components/Input'
import { useState } from 'react'
import { IncomeData } from '../common/interface'

const incomeData = {
  income: 50000,
  incomePeriod: 'year',
  ietc: true,
  kiwiSaver: null,
  kiwiSaverRate: '0.03',
  studentLoan: null,
  studentLoanRate: '0.12',
}

describe('Output', () => {
  it('Displays PAYE', () => {
    render(<Output incomeData={incomeData} />)
    const paye = screen.queryByText('PAYE')
    expect(paye).not.toBeNull()
  })
  it('Displays correct PAYE for an income of 50000', () => {
    render(<Output incomeData={incomeData} />)
    const value = screen.queryByText(/8020.00/)
    expect(value).not.toBeNull()
  })
  it('Displays 6 list items when given an income with IETC, KiwiSaver, and Student Loan data', () => {
    const complexIncome = {
      income: 45000,
      incomePeriod: 'year',
      ietc: true,
      kiwiSaver: true,
      kiwiSaverRate: '0.03',
      studentLoan: true,
      studentLoanRate: '0.12',
    }
    render(<Output incomeData={complexIncome} />)
    const listItems = screen.getAllByRole('listitem')
    expect(listItems).toHaveLength(6)
  })
  it('Displays correct data for an income with IETC, KiwiSaver, and Student Loan data', () => {
    const complexIncome = {
      income: 45000,
      incomePeriod: 'year',
      ietc: true,
      kiwiSaver: true,
      kiwiSaverRate: '0.03',
      studentLoan: true,
      studentLoanRate: '0.12',
    }
    render(<Output incomeData={complexIncome} />)
    const paye = screen.queryByText(/6505.00/)
    const ietc = screen.queryByText(/390.00/)
    const acc = screen.queryByText(/688.50/)
    const kiwiSaver = screen.queryByText(/1350.00/)
    const studentLoan = screen.queryByText(/2660.64/)
    const takeHome = screen.queryByText(/33795.86/)

    expect(paye).not.toBeNull()
    expect(ietc).not.toBeNull()
    expect(acc).not.toBeNull()
    expect(kiwiSaver).not.toBeNull()
    expect(studentLoan).not.toBeNull()
    expect(takeHome).not.toBeNull()
  })
})

describe('Income', () => {
  it('Has a submit button', () => {
    const initialData = {
      income: 0,
      ietc: undefined,
      kiwiSaver: null,
      studentLoan: null,
    }
    const incomeData = {}
    const setIncomeData = (arg: any) => {
      return arg
    }
    const setIncome = (data: IncomeData) => {
      setIncomeData({ ...incomeData, ...data })
    }

    render(<Input setIncome={setIncome} />)
    const button = screen.getByRole('button')
    expect(button).toHaveTextContent('Submit')
  })
  test.todo('Checkboxes for KiwiSaver and Student Loan open submenus')
})

test.todo('Clicking submit with an income displays an output')
