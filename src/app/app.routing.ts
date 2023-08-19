import {RouterModule, Routes} from "@angular/router";
import {LeadsListComponent} from "./leads/leads-list/leads-list.component";
import {LeadsFormComponent} from "./leads/leads-form/leads-form.component";

const AppRoutes: Routes = [
  {
    path: '',
    component: LeadsListComponent
  },
  {
    path: 'novo-lead',
    data: {
      title: 'Cadastrar Lead',
    },
    component: LeadsFormComponent
  },
  {
    path: 'editar-lead/:id',
    data: {
      title: 'Editar Lead',
    },
    component: LeadsFormComponent
  },
  {
    path: 'visualizar-lead/:id',
    data: {
      title: 'Visualizar Lead',
    },
    component: LeadsFormComponent
  },
  {
    path: 'excluir-lead/:id',
    data: {
      title: 'Excluir Lead',
    },
    component: LeadsFormComponent
  }
]

export const routing = RouterModule.forRoot(AppRoutes);
