import { Chart as ChartJS, ArcElement, Tooltip } from 'chart.js'
import { Pie } from 'react-chartjs-2'
import { useStore } from '@nanostores/react'
import { $selectedInks } from '@/features/blend/stores/SelectedInks'

ChartJS.register(ArcElement, Tooltip)

export default function BlendPieChart() {
  const selectedInks = useStore($selectedInks)

  return (
    <div className="w-24">
      {selectedInks.length === 0 ? (
        <div className="aspect-square rounded-full border border-dashed border-theme-gray-primary flex items-center justify-center">
          <p className="text-sm text-theme-gray-primary text-center">
            混ぜる色が
            <br />
            ありません
          </p>
        </div>
      ) : (
        <Pie
          data={{
            labels: selectedInks.map((ink) => ink.color.name),
            datasets: [
              {
                data: selectedInks.map((ink) => ink.amount),
                backgroundColor: selectedInks.map((ink) => ink.color.hex),
                borderWidth: 0,
              },
            ],
          }}
        />
      )}
    </div>
  )
}
