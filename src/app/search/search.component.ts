import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpParams, HttpHeaders } from '@angular/common/http';
import { DatePipe } from '@angular/common';
import { FormGroup, FormControl } from '@angular/forms';
import { Events } from '../_interfaces/events.model';
import { SearchParams } from './../_interfaces/searchparams.model';
import { RepositoryService } from '../shared/services/repository.service';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css']
})
export class SearchComponent implements OnInit {
 public eventsForm: FormGroup;
 public events: Events[];
 public dates: SearchParams[];

  constructor(private repository: RepositoryService, private http: HttpClient, private datePipe: DatePipe) { }

  ngOnInit(): void {
    this.eventsForm = new FormGroup({
      eventsForm: new FormControl(),
      eventsTo: new FormControl()
    })
    this.getAllEvents();
  }

  public getAllEvents = () => {
    let apiAddress = "events";
    this.repository.getData(apiAddress)
      .subscribe (res => {
        this.events = res as Events[];
      })
  }

  public executeFromDatePicker = (event) => {
    this.eventsForm.patchValue({ 'eventsFrom': event });
  }

  public executeToDatePicker = (event) => {
    this.eventsForm.patchValue({ 'eventsTo': event });
  }

  public searchEvents = (eventsFormValue) => {
    if(this.eventsForm.valid){
      this.executeEventsSearch(eventsFormValue);
    }
  }

  private executeEventsSearch = (eventsFormValue) => {
    const dateSearchParams: SearchParams = {
      eventsFrom: eventsFormValue.eventsFrom,
      eventsTo: eventsFormValue.eventsTo
    }

    const apiUrl = "events/search";
    this.repository.searchData(apiUrl, dateSearchParams)
      .subscribe (res => {
        this.events = res as unknown as Events[];
      })
  }

  

}
