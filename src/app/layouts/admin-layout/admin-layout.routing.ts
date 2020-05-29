import { Routes } from '@angular/router';

import { HomeComponent } from '../../home/home.component';
import { UserAdminComponent } from '../../user/user.component';
import { PatientComponent } from '../../patient/user.component';
import { DeviceComponent } from '../../device/device.component';
import { TablesComponent } from '../../tables/tables.component';
import { TypographyComponent } from '../../typography/typography.component';
import { IconsComponent } from '../../icons/icons.component';
import { SalirComponent } from '../../salir/salir.component';

export const AdminLayoutRoutes: Routes = [
    { path: 'dashboard',      component: HomeComponent },
    { path: 'user-admin/:id',       component: UserAdminComponent },
    { path: 'user-admin',           component: UserAdminComponent },
    { path: 'user/:id',       component: PatientComponent },
    { path: 'user',           component: PatientComponent },
    { path: 'device/:id',     component: DeviceComponent },
    { path: 'device',         component: DeviceComponent },
    { path: 'table/:module',  component: TablesComponent },
    { path: 'typography',     component: TypographyComponent },
    { path: 'icons',          component: IconsComponent },
    { path: 'salir',          component: SalirComponent },
];
