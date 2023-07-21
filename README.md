# Tax Credit Project

## A tool to streamline and promote charitable giving in New Zealand by combining a tax calculator with a tax credit calculator.

A work in progress that aims to: 

* Guide users towards getting a tax refund at the end of the year for their charitable donations
* Inspire users to donate more
* Promote effective giving
* Support hypothetical donation targets
* Provide accurate information, both in terms of the calculator and in terms of summarising the process
* Provide references to official information

## Build Instructions

1. `npm i`
2. `npm run dev`

## Progress

- [x] Make a form with Semantic UI React components
- [x] Can apply marginal tax rates to calculate PAYE for a given salary income
- [x] Have a function call other functions and return a results object based on options
- [x] Implement submit bar - nested flexbox?
- [x] Placeholder page layout
- [x] Account for student loans, ACC, Kiwisaver, IETC
- [x] Support income by hour/week/fortnight/month/year
- [x] Options for Kiwisaver, student loan repayment rate
- [x] Remake all components in Tailwind
- [x] Add relevant links to other resources and guide towards the IRD refund process
- [ ] Add toggle to display info in Output component
- [ ] Rate column or row for all outputdata (calculate as necessary i.e. effective paye rate, effective total tax rate)
- [ ] Animations
- [ ] Graph
- [ ] Fix to hide dropdown menus on submit
- [ ] Error display
- [ ] Reduce PAYE by a given donation amount
- [ ] Display amount required to donate to fully refund PAYE
- [ ] Add a slider to target refunding a % of PAYE
- [ ] Add support for refunding RWT
- [ ] Add support for secondary income

## Notes

### Options for output component placeholder
- Write an abbreviated About section describing the inspiration for the project & example use case in the Output component
    - Too broad?
- Annotated demo output? Annotated real output? Info icons for annotation?
    - Too technical?
- Dedicate most of the Output to describing refund process?
    - Might be most in line with project goals but could become disconnected from the functions of the calculator
    - Perhaps a brief about -> describe refund process i.e. opening refund account -> tie into calculator features
Write out refund process for reference