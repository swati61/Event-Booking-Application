import { Injectable } from '@angular/core';
import { Subject, BehaviorSubject } from 'rxjs';

@Injectable()
export class EventService {
  public eventName = new BehaviorSubject(null);
  constructor() { }   
}
