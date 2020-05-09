import { Component, OnInit, DoCheck } from '@angular/core';
import { MealLight } from '../meal-light';
import { ActivatedRoute } from '@angular/router';
import { HttpService } from '../http.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-recipe-list',
  templateUrl: './recipe-list.component.html',
  styleUrls: ['./recipe-list.component.scss']
})
export class RecipeListComponent implements OnInit, DoCheck {

  recipeList: MealLight[] = [];
  private searchName: string;
  private searchNameBack: string;
  private category: string;
  private area: string;

  private querySubscription: Subscription;

  constructor(private route: ActivatedRoute, private http: HttpService) {
    this.querySubscription = route.queryParams.subscribe((queryParam: any) => {
      // tslint:disable-next-line: no-string-literal
      this.searchNameBack = queryParam['search'];
      // tslint:disable-next-line: no-string-literal
      this.category = queryParam['c'];
      // tslint:disable-next-line: no-string-literal
      this.area = queryParam['a'];
    });
    if (this.searchNameBack !== null) {
      this.search();
    } else if (this.category !== null) {
      this.http.filteringByFilterCategory(this.category).subscribe(data => this.recipeList = data);
    } else if (this.area !== null) {
      this.http.filteringByFilterArea(this.area).subscribe(data => this.recipeList = data);
    }
  }

  ngOnInit(): void {
  }

  ngDoCheck(): void {
    if (this.searchNameBack !== null) {
      this.search();
    }
  }

  private search(): void {
    if (this.searchNameBack !== this.searchName) {
      this.searchName = this.searchNameBack;
      this.http.search(this.searchName).subscribe(data => this.recipeList = data);
    }
  }
}
