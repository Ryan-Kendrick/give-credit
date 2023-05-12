import { Header } from 'semantic-ui-react'

function Heading() {
  return (
    <>
      <div className="header-cont">
        <Header size="huge" textAlign="center">
          Give Credit
        </Header>
        <Header size="small" textAlign="center">
          A Guide to Charitable Tax Credits in New Zealand
        </Header>

        <h2>You can get back 33% of what you donate</h2>
        <p>
          Generously given $200 to charity? That could be $266.66 if you claim
          it.
        </p>
        <p>
          When you donate to charity, 33% of what you donate is given back to
          you but only if you claim it as a tax credit with IRD.
        </p>
        <p>
          More info available on{' '}
          <a href="https://www.ird.govt.nz/income-tax/income-tax-for-individuals/individual-tax-credits/tax-credits-for-donations">
            the IRD webpage
          </a>
        </p>
        <p>Enter your Income below to see how much you could claim</p>
      </div>
    </>
  )
}

export default Heading
