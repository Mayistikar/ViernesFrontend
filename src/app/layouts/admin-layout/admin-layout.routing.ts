import { Routes } from '@angular/router';

import { HomeComponent } from '../../home/home.component';
import { UserComponent } from '../../user/user.component';
import { DeviceComponent } from '../../device/device.component';
import { TablesComponent } from '../../tables/tables.component';
import { TypographyComponent } from '../../typography/typography.component';
import { IconsComponent } from '../../icons/icons.component';

export const AdminLayoutRoutes: Routes = [
    { path: 'dashboard',      component: HomeComponent },
    { path: 'user/:id',       component: UserComponent },
    { path: 'user',           component: UserComponent },
    { path: 'device/:id',     component: DeviceComponent },
    { path: 'device',         component: DeviceComponent },
    { path: 'table/:module',  component: TablesComponent },
    { path: 'typography',     component: TypographyComponent },
    { path: 'icons',          component: IconsComponent },
];
