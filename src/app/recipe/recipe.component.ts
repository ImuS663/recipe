import { Component, OnInit, Input } from '@angular/core';
import { Meal } from '../meal';
import { Subscription } from 'rxjs';
import { ActivatedRoute } from '@angular/router';
import { HttpService } from '../http.service';

@Component({
  selector: 'app-recipe',
  templateUrl: './recipe.component.html',
  styleUrls: ['./recipe.component.scss']
})
export class RecipeComponent implements OnInit {

  recipe: Meal = new Meal();
  id: string;

  private querySubscription: Subscription;

  constructor(private route: ActivatedRoute, private http: HttpService) {
    this.querySubscription = route.queryParams.subscribe((queryParam: any) => {
      // tslint:disable-next-line: no-string-literal
      this.id = queryParam['id'];
    });
  }

  ngOnInit(): void {
    this.http.getMealById(this.id).subscribe(data => this.recipe = data[0]);
  }
  /**
   * Checking item for null and empty string.
   * @param item checked string.
   */
  private filterItem(item: string): boolean {
    if (item !== null && item !== '') {
      return true;
    } else {
      return false;
    }
  }
  /**
   * Checking item1 and item2 for null and empty string.
   * @param item1 checked string.
   * @param item2 checked string.
   */
  filterItems(item1: string, item2: string): boolean {
    if (this.filterItem(item1) && this.filterItem(item2)) {
      return true;
    } else {
      return false;
    }
  }
}
