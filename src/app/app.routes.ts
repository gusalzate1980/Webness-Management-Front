import { Routes } from '@angular/router';
import { Login } from './pages/login/login';
import { MainMenu } from './pages/main/main';
import { Management } from './pages/employees/management/management';
import { GiveFeedback } from './pages/employees/Career/give-feedback/give-feedback';
import { MyFeedBack } from './pages/employees/Career/my-feed-back/my-feed-back';
import { OneOnOne } from './pages/employees/Career/one-on-one/one-on-one';



export const routes: Routes = [
  { path: 'login', component: Login },
  {
      path: 'main',
      component: MainMenu,
      children: [
      {
        path: 'employees',
        children: [
        {
          path: 'management',
          component: Management
        },
        {
            path: 'career',
            children: [
              { path: 'give-feedback', component: GiveFeedback },
              { path: 'my-feedback', component: MyFeedBack },
              { path: 'one-on-one', component: OneOnOne }
            ]
        }]
      }]
},
  { path: '', redirectTo: 'login', pathMatch: 'full' }
];