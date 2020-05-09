import { Component, OnInit } from '@angular/core';
import { HttpService } from '../http.service';
import { Meal } from '../meal';
import { MealLight } from '../meal-light';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  constructor(private http: HttpService) { }

  ngOnInit(): void {}

}
