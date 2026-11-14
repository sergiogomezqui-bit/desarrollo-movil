import { IonIcon, IonLabel, IonRouterOutlet, IonTabBar, IonTabButton, IonTabs } from '@ionic/react'
import { Redirect, Route } from 'react-router-dom'
import { listOutline, personOutline } from 'ionicons/icons'
import Profile from '../pages/Profile/Profile'
import Tasks from '../pages/Tasks/Tasks'

export default function UserRoutes() {
  return (
    <IonTabs>
      <IonRouterOutlet>
        <Route exact path="/tasks" component={Tasks} />
        <Route exact path="/profile" component={Profile} />
        <Redirect exact from="/" to="/tasks" />
        <Redirect from="/login" to="/tasks" />
        <Redirect from="/register" to="/tasks" />
      </IonRouterOutlet>
      <IonTabBar slot="bottom">
        <IonTabButton tab="tasks" href="/tasks">
          <IonIcon icon={listOutline} />
          <IonLabel>Tareas</IonLabel>
        </IonTabButton>
        <IonTabButton tab="profile" href="/profile">
          <IonIcon icon={personOutline} />
          <IonLabel>Perfil</IonLabel>
        </IonTabButton>
      </IonTabBar>
    </IonTabs>
  )
}
