import { Component, OnInit, ElementRef } from '@angular/core';
import dayGridPlugin from '@fullcalendar/daygrid';
import bootstrapPlugin from '@fullcalendar/bootstrap';

@Component({
  selector: 'app-calendar',
  templateUrl: './calendar.component.html',
  styleUrls: ['./calendar.component.css']
})
export class CalendarComponent implements OnInit {

  calendarPlugins = [ bootstrapPlugin, dayGridPlugin ];    
  calendarEvents = [
    { title: 'Reunião', start: '2020-02-27T08:30:00', end: '2020-02-27T09:00:00' },
    { title: 'Reunião', start: '2020-02-28T15:30:00', end: '2020-02-28T16:30:00' },
    { title: 'Reunião', start: '2020-02-28T17:00:00', end: '2020-02-28T17:30:00' },
    { title: 'Reunião', start: '2020-03-02T08:30:00', end: '2020-03-02T09:30:00' },
    { title: 'Reunião', start: '2020-03-04T13:30:00', end: '2020-03-04T15:00:00' },
    { title: 'Reunião', start: '2020-03-04T15:30:00', end: '2020-03-04T17:00:00' },
    { title: 'Reunião', start: '2020-03-03T10:30:00', end: '2020-03-03T11:30:00' },
    { title: 'Reunião', start: '2020-02-20T14:30:00', end: '2020-02-20T15:30:00' },
    { title: 'Reunião', start: '2020-02-20T15:30:00', end: '2020-02-20T16:30:00' },
    { title: 'Reunião', start: '2020-02-27T16:50:00', end: '2020-02-27T17:30:00' },
    { title: 'Reunião', start: '2020-03-02T10:00:00', end: '2020-03-02T10:30:00' },
    { title: 'Reunião', start: '2020-02-28T09:30:00', end: '2020-02-28T11:30:00' },
    { title: 'Ligação', start: '2020-02-28T11:30:00', end: '2020-02-28T11:35:00' },
    { title: 'Ligação', start: '2020-02-28T13:30:00', end: '2020-02-28T13:50:00' },
    { title: 'Ligação', start: '2020-02-27T10:30:00', end: '2020-02-27T10:40:00' },
    { title: 'Ligação', start: '2020-02-27T10:50:00', end: '2020-02-27T11:00:00' },
    { title: 'Ligação', start: '2020-02-28T14:30:00', end: '2020-02-28T14:40:00' },
    { title: 'Ligação', start: '2020-02-28T08:30:00', end: '2020-02-28T08:40:00' },
    { title: 'Ligação', start: '2020-03-09T09:40:00', end: '2020-03-09T09:50:00' },
    { title: 'Email  ', start: '2020-03-03T11:30:00', end: '2020-03-03T11:30:00' },
    { title: 'Email  ', start: '2020-03-05T11:40:00', end: '2020-03-05T11:40:00' },
    { title: 'Email  ', start: '2020-02-10T14:00:00', end: '2020-02-10T14:00:00' },
    { title: 'Email  ', start: '2020-02-14T11:00:00', end: '2020-02-14T11:00:00' },
    { title: 'Email  ', start: '2020-02-14T11:30:00', end: '2020-02-14T11:30:00' },
    { title: 'Email  ', start: '2020-02-18T11:30:00', end: '2020-02-18T11:30:00' },
    { title: 'Email  ', start: '2020-02-20T11:30:00', end: '2020-02-20T11:30:00' },
    { title: 'Email  ', start: '2020-02-20T11:30:00', end: '2020-02-20T11:30:00' },
    { title: 'Email  ', start: '2020-02-27T11:30:00', end: '2020-02-27T11:30:00' },
    { title: 'Email  ', start: '2020-02-27T11:30:00', end: '2020-02-27T11:30:00' },
    { title: 'Email  ', start: '2020-02-28T11:30:00', end: '2020-02-28T11:30:00' }
  ];

  constructor() { }

  ngOnInit() {
  }

  modifyTitle(eventIndex, newTitle) {
    this.calendarEvents[eventIndex].title = newTitle;
  }
}
