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
  private categoryBack: string;
  private area: string;
  private areaBack: string;

  private querySubscription: Subscription;

  constructor(private route: ActivatedRoute, private http: HttpService) {
    this.querySubscription = route.queryParams.subscribe((queryParam: any) => {
      // tslint:disable-next-line: no-string-literal
      this.searchNameBack = queryParam['search'];
      // tslint:disable-next-line: no-string-literal
      this.categoryBack = queryParam['c'];
      // tslint:disable-next-line: no-string-literal
      this.areaBack = queryParam['a'];
    });
  }

  ngOnInit(): void {
  }

  ngDoCheck(): void {
    if (this.searchNameBack !== undefined) {
      this.search();
    } else if (this.categoryBack !== undefined) {
      this.filterCategory();
    } else if (this.areaBack !== undefined) {
      this.filterArea();
    }
  }

  private search(): void {
    if (this.searchNameBack !== this.searchName) {
      this.searchName = this.searchNameBack;
      this.http.search(this.searchName).subscribe(data => this.recipeList = data);
    }
  }

  private filterCategory(): void {
    if (this.categoryBack !== this.category) {
      this.category = this.categoryBack;
      this.http.filteringByFilterCategory(this.category).subscribe(data => this.recipeList = data);
    }
  }
  private filterArea(): void {
    if (this.areaBack !== this.area) {
      this.area = this.areaBack;
      this.http.filteringByFilterArea(this.area).subscribe(data => this.recipeList = data);
    }
  }
}
