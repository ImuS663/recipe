import { Component, OnInit } from '@angular/core';
import { HttpService } from '../http.service';
import { MealLight } from '../meal-light';
import { Category } from '../category';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  recipeArr: MealLight[] = [];
  recipeCategory: Category[] = [];
  recipeArea: any[] = [];

  constructor(private http: HttpService) {
    for (let i = 0; i < 4; i++) {
      http.getRandomMeal().subscribe(data => this.recipeArr.push(data[0]));
    }
    http.getAllCategory().subscribe(data => this.recipeCategory = data);
    http.getAreaList().subscribe(data => this.recipeArea = data);
  }

  ngOnInit(): void {}

}
