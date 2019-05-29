import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from "@angular/core";
import { CommonModule } from "@angular/common";
import { RouterModule, Routes, RouterLink } from "@angular/router";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { DashboardComponent } from "./dashboard.component";
import { AccountComponent } from './account/account.component';
import { FleetComponent } from './fleet/fleet.component';
import { UserComponent } from './user/user.component';
import { OrderComponent } from './order/order.component';
// import { ContractorcreateComponent } from './contractorcreate/contractorcreate.component';
import { CompanycreateComponent } from './companycreate/companycreate.component';
import { SidenavComponent } from '../sidenav/sidenav.component';
import { CreatecontractorComponent } from '../createcontractor/createcontractor.component';
import { ContactComponent } from '../dashboard/contact/contact.component';
import { MaprouteComponent } from './maproute/maproute.component';
import { ContractorListComponent } from './contractor-list/contractor-list.component';
import { CompanyListComponent } from './company-list/company-list.component';
import { ContactlistComponent } from '../contactlist/contactlist.component';
import { JournalComponent } from '../journal/journal.component';
import { JournalistComponent } from './journalist/journalist.component';
import { ContactDriverComponent } from './contact-driver/contact-driver.component';
import { BankComponent } from './bank/bank.component';
import { ConsignmentComponent } from './consignment/consignment.component';
import { PeriodComponent } from './period/period.component';
import { InvoiceComponent } from './invoice/invoice.component';
import { ContactemployeeComponent } from './contactemployee/contactemployee.component';
import { ContactvendorComponent } from './contactvendor/contactvendor.component';
import { ContactcustomerComponent } from './contactcustomer/contactcustomer.component';
// import { EmployeeComponent } from './employee/employee.component';

const routes: Routes = [
    {
        path: "",
        component: DashboardComponent,
        children: [
            { path: "", redirectTo: "", pathMatch: "full" },
            { path: "account", component: AccountComponent },
            { path: "fleet", component: FleetComponent },
            { path: "user", component: UserComponent },
            { path: "order", component: OrderComponent },
            { path: "contractor", component: CreatecontractorComponent },
            { path: "company", component: CompanycreateComponent },
            { path: "contact", component: ContactComponent }



        ]
    }
];
@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        ReactiveFormsModule,
        RouterModule.forChild(routes),
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA],
    declarations: [
        AccountComponent,
        DashboardComponent,
        FleetComponent,
        UserComponent,
        OrderComponent,
        CreatecontractorComponent,
        // ContractorcreateComponent,
        CompanycreateComponent,
        ContactComponent,
        SidenavComponent,
        MaprouteComponent,
        ContractorListComponent,
        CompanyListComponent,
        ContactlistComponent,
        JournalComponent,
        JournalistComponent,
        ContactDriverComponent,
        BankComponent,
        ConsignmentComponent,
        PeriodComponent,
        InvoiceComponent,
        ContactemployeeComponent,
        ContactvendorComponent,
        ContactcustomerComponent,
        // EmployeeComponent

    ]
})
export class DashboardModule { }
