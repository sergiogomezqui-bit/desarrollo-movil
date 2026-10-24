import { IonProgressBar } from '@ionic/react'
import { MISSIONS, TOTAL_POINTS, completedCount, percent } from '../../helpers'

export default function ProgressSummary({ progress }) {
  return (
    <div style={{ padding: '8px 16px' }}>
      <h2 style={{ margin: '4px 0' }}>
        {progress.points} <small>/ {TOTAL_POINTS} puntos</small>
      </h2>
      <IonProgressBar value={percent(progress) / 100} color="success" style={{ height: 10, borderRadius: 5 }} />
      <p style={{ margin: '6px 0' }}>
        {percent(progress)}% completado · {completedCount(progress)} de {MISSIONS.length} misiones
      </p>
    </div>
  )
}
