function Heading() {
  return (
    <>
      <div className="">
        <h1 className="text-center font-heading text-4xl lg:text-5xl pt-4">
          Give Credit
        </h1>
        <svg
          className="fill-gray-500 h-4 mx-auto"
          version="1.1"
          id="Capa_1"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 14.707 14.707"
          xmlSpace="preserve"
        >
          <g>
            <rect x="6.275" y="0" width="2.158" height="14.707" />
          </g>
        </svg>
        <h2 className="text-center font-subheading text-xl lg:text-2xl py-1">
          A Guide to Charitable Tax Credits in New Zealand
        </h2>
        <div
          className="bg-no-repeat bg-cover bg-center md:bg-bottom-right"
          style={{ backgroundImage: 'url("images/city-sm-wide.webp")' }}
        >
          <div className="md:px-6 lg:px-9 xl:px-12 bg-white/30 backdrop-blur-md">
            <div className="flex items-center justify-around md:justify-between md:py-12 md:pl-6 lg:pl-9 xl:pr-12 space-x-4 flex-col md:flex-row md:pr-4  min-h-[30vh] gap-4">
              <div className="basis-1/3 md:w-full w-96 text-center md:text-left bg-white shadow md:shadow-r m-8 md:m-3 lg:m-5 xl:ml-8 z-20 bg-opacity-30 rounded">
                <p className="text-2xl lg:text-3xl font-bold bg-sky-500 p-4 shadow md:shadow-r bg-opacity-70 rounded">
                  You can get back 33% of what you donate
                </p>
                <p className="text-lg pt-4 px-2 pb-8">
                  Generously given $200 to charity?{' '}
                  <span className="italic">
                    That $200 could be{' '}
                    <span className="font-bold">$266.66</span> if you claim it.
                  </span>
                </p>
                <p className="text-lg px-2 pb-4">
                  Enter your income and click Submit to get started!
                </p>
              </div>
              <div className="basis-2/3 py-2 text-center md:text-left">
                <p>
                  When you donate to charity, 33% of what you donate is given
                  back to you but only if you claim it as a tax credit with IRD.
                  More info available on{' '}
                  <a
                    className="underline decoration-sky-600 hover:decoration-blue-400 hover:decoration-2"
                    href="https://www.ird.govt.nz/income-tax/income-tax-for-individuals/individual-tax-credits/tax-credits-for-donations"
                  >
                    the IRD webpage.
                  </a>
                </p>
                <p className="pt-4">
                  Enter your Income below to see how much you could claim.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default Heading
