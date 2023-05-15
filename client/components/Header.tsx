import { Header } from 'semantic-ui-react'

function Heading() {
  return (
    <>
      <div className="">
        <h1 className="text-center font-heading text-4xl lg:text-5xl py-1">
          Give Credit
        </h1>
        <h2 className="text-center font-subheading text-xl lg:text-2xl py-1">
          A Guide to Charitable Tax Credits in New Zealand
        </h2>
        <div className="flex items-center justify-around md:justify-between space-x-4 flex-col md:flex-row md:pr-4 min-h-[30vh] px-3">
          <div className="basis 1/2 py-2 md:py-0 pr-4 text-center md:text-left">
            <p className="text-xl lg:text-2xl font-bold">
              You can get back 33% of what you donate
            </p>
            <p>
              Generously given $200 to charity?{' '}
              <span className="italic">
                That $200 could be $266.66 if you claim it.
              </span>
            </p>
          </div>
          <div className="basis 1/2 text-center md:text-left">
            <p>
              When you donate to charity, 33% of what you donate is given back
              to you but only if you claim it as a tax credit with IRD.
            </p>
            <p>
              More info available on{' '}
              <a
                className="underline decoration-sky-600 hover:decoration-blue-400 hover:decoration-2"
                href="https://www.ird.govt.nz/income-tax/income-tax-for-individuals/individual-tax-credits/tax-credits-for-donations"
              >
                the IRD webpage
              </a>
            </p>
            <p>Enter your Income below to see how much you could claim</p>
          </div>
        </div>
      </div>
    </>
  )
}

export default Heading
