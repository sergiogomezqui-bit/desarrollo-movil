import { useEffect, useState } from 'react'
import { IonButton, IonIcon, IonInput, IonItem, IonLabel, IonList, IonText, IonTextarea } from '@ionic/react'
import { documentTextOutline, trashOutline } from 'ionicons/icons'
import SensorPage from '../components/SensorPage.jsx'
import useFilesystem from '../hooks/useFilesystem.js'

export default function FilesystemPage() {
  const { files, content, error, message, listFiles, writeFile, readFile, deleteFile } = useFilesystem()
  const [name, setName] = useState('nota.txt')
  const [text, setText] = useState('')

  useEffect(() => {
    listFiles()
  }, [listFiles])

  const handleSave = async (e) => {
    e.preventDefault()
    const cleanName = name.trim()
    if (!cleanName || !text.trim()) return
    const ok = await writeFile(cleanName, text)
    if (ok) setText('')
  }

  return (
    <SensorPage title="Archivos (Filesystem)" description="Crea, lee y borra archivos de texto guardados dentro de la app." error={error}>
      <form onSubmit={handleSave}>
        <IonItem>
          <IonInput label="Nombre del archivo" labelPlacement="floating" value={name} onIonInput={(e) => setName(e.detail.value ?? '')} />
        </IonItem>
        <IonItem>
          <IonTextarea
            label="Contenido"
            labelPlacement="floating"
            rows={3}
            value={text}
            onIonInput={(e) => setText(e.detail.value ?? '')}
          />
        </IonItem>
        <IonButton type="submit" expand="block" className="ion-margin-top">
          Guardar archivo
        </IonButton>
      </form>

      {message && (
        <IonText color="success">
          <p>{message}</p>
        </IonText>
      )}

      {files.length === 0 ? (
        <p className="hint ion-margin-top">Todavía no hay archivos guardados.</p>
      ) : (
        <IonList className="ion-margin-top">
          {files.map((file) => (
            <IonItem key={file}>
              <IonIcon slot="start" icon={documentTextOutline} />
              <IonLabel>{file}</IonLabel>
              <IonButton slot="end" fill="clear" onClick={() => readFile(file)}>
                Leer
              </IonButton>
              <IonButton slot="end" fill="clear" color="danger" onClick={() => deleteFile(file)} aria-label={'Eliminar ' + file}>
                <IonIcon slot="icon-only" icon={trashOutline} />
              </IonButton>
            </IonItem>
          ))}
        </IonList>
      )}

      {content && <div className="result-box">{content}</div>}
    </SensorPage>
  )
}
