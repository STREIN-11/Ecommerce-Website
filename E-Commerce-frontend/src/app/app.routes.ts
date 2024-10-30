import { Routes } from '@angular/router';
import { ProductListComponent } from './product-list/product-list.component';
import { HomeComponent } from './home/home.component';
import { CartitemlistComponent } from './cartitemlist/cartitemlist.component';
import { SalesReportComponent } from './salesreport/salesreport.component';
import { ModifyComponent } from './modify/modify.component';

export const routes: Routes = [
    { path: '', component: HomeComponent },
    { path: "product-list", component: ProductListComponent},
    { path: "cart", component: CartitemlistComponent},
    { path: "panel", component: SalesReportComponent},
    { path: "modify", component: ModifyComponent},
];
