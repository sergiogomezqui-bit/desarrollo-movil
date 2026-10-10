import { IonBackButton, IonButtons, IonContent, IonHeader, IonPage, IonText, IonTitle, IonToolbar } from '@ionic/react'

// Estructura común de las páginas de cada sensor: título, botón de volver y contenido.
export default function SensorPage({ title, description, error, children }) {
  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonButtons slot="start">
            <IonBackButton defaultHref="/" text="" />
          </IonButtons>
          <IonTitle>{title}</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent className="ion-padding">
        {description && <p className="hint">{description}</p>}
        {error && (
          <IonText color="danger">
            <p>{error}</p>
          </IonText>
        )}
        {children}
      </IonContent>
    </IonPage>
  )
}

export function ResultBox({ rows }) {
  return (
    <div className="result-box">
      {rows.map(([label, value]) => (
        <div key={label}>
          <strong>{label}:</strong> {value ?? '—'}
        </div>
      ))}
    </div>
  )
}
