import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { EventBookingComponent } from './event-booking/event-booking.component';
import { EventListingComponent } from './event-listing/event-listing.component';

const routes: Routes = [
    { path: '', redirectTo: '/event-list', pathMatch: 'full'
    },
    {
        path: 'event-list',
        component: EventListingComponent
    },
    {
        path: 'event-book',
        component: EventBookingComponent
    }];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
