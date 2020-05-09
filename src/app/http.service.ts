import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { url, headers } from '../assets/config.http.json';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { MealLight } from './meal-light';
import { Meal } from './meal';
import { Category } from './category';

@Injectable({
  providedIn: 'root'
})
export class HttpService {

  constructor(private http: HttpClient) { }

  /**
   * Get data from REST API recipe.
   * @param urlData URL for REST API.
   * @param paramsData HTTP queries.
   */
  private getData(urlData: string, paramsData?: any): Observable<Meal[]> {
    return this.http.get(urlData, {
      // headers: new HttpHeaders(headers),
      params: paramsData
    // tslint:disable-next-line: no-string-literal
    }).pipe(map(data => data['meals']));
  }

  /**
   * Get filtered data by queries.
   * @param params is HTTP queries.
   */
  private getDataFilter(params: any): Observable<MealLight[]> {
    return this.getData(url.filter, params);
  }

  /**
   * Search recipe by name.
   * @param param search name.
   */
  search(param: string): Observable<Meal[]> {
    return this.getData(url.search, {s: param});
  }

  /**
   * Get meal with so id.
   * @param id meal id.
   */
  getMealById(id: string): Observable<Meal[]> {
    return this.getData(url.lookup, {i: id});
  }

  /**
   * Get recipe with so ingredient.
   * @param param name is ingredient.
   */
  filteringByMainIngredient(param: string): Observable<MealLight[]> {
    return this.getDataFilter({i: param});
  }

  /**
   * Get recipe with so category.
   * @param param name is category.
   */
  filteringByFilterCategory(param: string): Observable<MealLight[]> {
    return this.getDataFilter({c: param});
  }

  /**
   * get recipe with so area.
   * @param param name is area.
   */
  filteringByFilterArea(param: string): Observable<MealLight[]> {
    return this.getDataFilter({a: param});
  }

  /**
   * Get all categories recipe.
   */
  getAllCategory(): Observable<Category[]> {
    // tslint:disable-next-line: no-string-literal
    return this.http.get(url.categories).pipe(map(data =>  data['categories']));
  }

  /**
   * Get random recipe.
   */
  getRandomMeal() {
    return this.getData(url.random);
  }

}
