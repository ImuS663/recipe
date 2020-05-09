import { Component, OnInit, Input } from '@angular/core';
import { MealLight } from '../meal-light';

@Component({
  selector: 'app-recipe-item',
  templateUrl: './recipe-item.component.html',
  styleUrls: ['./recipe-item.component.scss']
})
export class RecipeItemComponent implements OnInit {

  @Input() recipeItem: MealLight;

  constructor() { }

  ngOnInit(): void {
  }

}
