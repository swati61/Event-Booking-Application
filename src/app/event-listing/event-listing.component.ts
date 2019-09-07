import { Component, OnInit } from '@angular/core';
import { LoadjsonService } from './loadjson.service';
import { EventService } from '../event.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-event-listing',
  templateUrl: './event-listing.component.html',
  styleUrls: ['./event-listing.component.css']
})
export class EventListingComponent implements OnInit {  
  public eventList = [];
  searchText = '';
  
  constructor(private loadJsonService:LoadjsonService, private router:Router,private _sharedService:EventService) { }

  ngOnInit() {
    this.loadJsonService.getJSON().subscribe(data =>  { 
       this.eventList = data;
    }) ;
  }

  onBookEvent(idx:any){    
    this._sharedService.eventName.next(this.eventList[idx].events);
    this.router.navigate(["/event-book"]);
    //this._sharedService.setEventName(this.eventList[idx].events);
  }
  

}
