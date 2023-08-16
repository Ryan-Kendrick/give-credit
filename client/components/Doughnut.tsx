import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js'
import { Doughnut } from 'react-chartjs-2'
import { OutputData } from '../../common/interface'

ChartJS.register(ArcElement, Tooltip, Legend)

interface Props {
  chartData: OutputData
}

const displayDoughnut = ({ chartData }: Props) => {
  const { paye, acc, takehome, kiwiSaver, studentLoan } = chartData
  const labels = ['PAYE', 'Takehome', 'ACC']
  const data = {
    labels: labels,
    datasets: [
      {
        label: 'Total $',
        data: [paye, takehome, acc],
        backgroundColor: [
          'rgb(217 119 6)',
          'rgb(12, 178, 12)',
          'rgb(224, 36, 36)',
        ],
        borderWidth: 2,
        borderColor: 'rgb(255,255,255)',
      },
    ],
  }

  if (Number(studentLoan) > 0) {
    data.datasets[0].data.push(studentLoan)
    labels.push('Student Loan')
    data.datasets[0].backgroundColor.push('rgb(1, 158, 162)')
  }
  if (Number(kiwiSaver) > 0) {
    data.datasets[0].data.push(kiwiSaver)
    labels.push('KiwiSaver')
    data.datasets[0].backgroundColor.push('rgb(5, 122, 85)')
  }

  return (
    <div className="m-auto relative md:w-[33vw]">
      <Doughnut data={data} />
    </div>
  )
}

export default displayDoughnut
