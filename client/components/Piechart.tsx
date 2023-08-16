import React from 'react'
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js'
import { Pie } from 'react-chartjs-2'
import { OutputData } from '../../common/interface'

ChartJS.register(ArcElement, Tooltip, Legend)

interface Props {
  chartData: OutputData
}

const PieChart = ({ chartData }: Props) => {
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
    <div className="m-auto relative w-[33vw]">
      <Pie data={data} />
    </div>
  )

  // const data = {
  //   labels: ["Go", "Python", "Kotlin", "JavaScript", "R", "Swift"],
  //   datasets: [
  //     {
  //       label: "# of Votes",
  //       data: [35, 25, 22, 20, 18, 15],
  //       backgroundColor: [
  //         "#007D9C",
  //         "#244D70",
  //         "#D123B3",
  //         "#F7E018",
  //         "#fff",
  //         "#FE452A",
  //       ],
  //       borderColor: [
  //         "rgba(255,99,132,1)",
  //         "rgba(54, 162, 235, 1)",
  //         "rgba(255, 206, 86, 1)",
  //         "rgba(75, 192, 192, 1)",
  //         "rgba(153, 102, 255, 1)",
  //         "rgba(255, 159, 64, 1)",
  //       ],
  //       borderWidth: 1,
  //     },
  //   ],
  // };
  // return (
  //   <div style={{ width: 650, textAlign: "center" }}>
  //     <h1 style={{ fontFamily: "monospace" }}>
  //       Most Popular Programming languages to learn in 2022
  //     </h1>
  //     <Pie data={data} width={50} height={50} />
  //   </div>
  // );
}
export default PieChart
