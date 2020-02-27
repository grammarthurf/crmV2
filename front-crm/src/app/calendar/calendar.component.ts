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
    { title: 'Ligar', date: '2020-02-11' },
    { title: 'Ligar', date: '2020-02-22' },
    { title: 'Reunião', date: '2020-02-05' },
    { title: 'Reunião', date: '2020-02-29' },
    { title: 'Reunião', date: '2020-02-25' },
    { title: 'Email', date: '2020-02-27' }
  ];

  constructor() { }

  ngOnInit() {
  }

  modifyTitle(eventIndex, newTitle) {
    this.calendarEvents[eventIndex].title = newTitle;
  }
}
