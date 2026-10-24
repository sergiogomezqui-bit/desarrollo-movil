import { IonIcon, IonLabel, IonRouterOutlet, IonTabBar, IonTabButton, IonTabs } from '@ionic/react'
import { Redirect, Route } from 'react-router-dom'
import { flag, list, trophy } from 'ionicons/icons'
import Home from '../pages/Home/Home'
import Ranking from '../pages/Ranking/Ranking'
import Results from '../pages/Results/Results'

export default function UserRoutes() {
  return (
    <IonTabs>
      <IonRouterOutlet>
        <Route exact path="/home" component={Home} />
        <Route exact path="/ranking" component={Ranking} />
        <Route exact path="/results" component={Results} />
        <Redirect exact from="/" to="/home" />
        <Redirect from="/login" to="/home" />
        <Redirect from="/register" to="/home" />
      </IonRouterOutlet>
      <IonTabBar slot="bottom">
        <IonTabButton tab="home" href="/home">
          <IonIcon icon={list} />
          <IonLabel>Misiones</IonLabel>
        </IonTabButton>
        <IonTabButton tab="ranking" href="/ranking">
          <IonIcon icon={trophy} />
          <IonLabel>Ranking</IonLabel>
        </IonTabButton>
        <IonTabButton tab="results" href="/results">
          <IonIcon icon={flag} />
          <IonLabel>Resultados</IonLabel>
        </IonTabButton>
      </IonTabBar>
    </IonTabs>
  )
}
