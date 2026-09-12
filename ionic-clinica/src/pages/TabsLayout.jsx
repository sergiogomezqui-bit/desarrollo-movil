import { IonTabs, IonTabBar, IonTabButton, IonTab, IonIcon, IonLabel } from '@ionic/react'
import { calendarOutline, peopleOutline, personOutline } from 'ionicons/icons'
import VisitsPage from './VisitsPage'
import PatientsPage from './PatientsPage'
import ProfilePage from './ProfilePage'

export default function TabsLayout() {
  return (
    <IonTabs>
      <IonTab tab="visitas">
        <VisitsPage />
      </IonTab>
      <IonTab tab="pacientes">
        <PatientsPage />
      </IonTab>
      <IonTab tab="perfil">
        <ProfilePage />
      </IonTab>

      <IonTabBar slot="bottom">
        <IonTabButton tab="visitas">
          <IonIcon icon={calendarOutline} />
          <IonLabel>Visitas</IonLabel>
        </IonTabButton>
        <IonTabButton tab="pacientes">
          <IonIcon icon={peopleOutline} />
          <IonLabel>Pacientes</IonLabel>
        </IonTabButton>
        <IonTabButton tab="perfil">
          <IonIcon icon={personOutline} />
          <IonLabel>Perfil</IonLabel>
        </IonTabButton>
      </IonTabBar>
    </IonTabs>
  )
}
