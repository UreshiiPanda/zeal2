import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Drygoods, Grocery } from './grocery-list/groceries';
import { dairyeggs } from './grocery-list/groceries';
import { fruitsvegetable } from './grocery-list/groceries';

const URL = "http://localhost:4000/grocery-list";
const USER_ID = "HAYDEN";

@Injectable({
  providedIn: 'root'
})
export class GroceryListService {
  private grocery_list: Grocery[] = [];
  private dairy_eggs_list: Grocery[] = dairyeggs;
  private fruits_vegetable_list: Grocery[] = fruitsvegetable;
  private dry_goods_list: Grocery[] = Drygoods;
  hasStrikethrough: boolean = false;

  constructor(private http: HttpClient) { }

  get_my_grocerylist(): Grocery[] {
    return this.grocery_list;
  }

  get_dairy_eggs(): Grocery[] {
    return this.dairy_eggs_list;
  }

  get_vegetables_fruits(): Grocery[] {
    return this.fruits_vegetable_list
  }

  get_household_items(): Grocery[] {
    return this.dry_goods_list
  }

  toggleStrikethrough(): void {  // Add this method
    this.hasStrikethrough = !this.hasStrikethrough;
  }

  fetch_grocery_list(): void {
    
  }

  get_groceries_inmylist(): Grocery[] {
    let groceries: Grocery[] = [];
    for (let list of [this.dairy_eggs_list, this.fruits_vegetable_list, this.dry_goods_list]) {
      list.forEach(grocery => {
        if (grocery.inlist) groceries.push(grocery);
      })
    }

    return groceries;
  }

  add_grocery(added_grocery: Grocery): void {
    this.grocery_list.push(added_grocery);
    for (let list of [this.dairy_eggs_list, this.fruits_vegetable_list, this.dry_goods_list]) {
      const index_of_grocery = list.findIndex(grocery => grocery.name === added_grocery.name);
      if (index_of_grocery !== -1) {
        list[index_of_grocery].inlist = true;
      }
    }

    const headers = new HttpHeaders({
      "user_id": USER_ID,
      "grocery": added_grocery.name,
      "quantity": 1,
      "completed": 0,
      "image_url": added_grocery.imageUrl
    })
    this.http.post(`${URL}/grocery-list`, { headers });
  }

  strikethrough_grocery(edited_grocery: Grocery): void {

  }

  delete_grocery(deleted_grocery: Grocery): void {
    this.grocery_list.filter(grocery => grocery.name === deleted_grocery.name);

    const headers = new HttpHeaders().set(
      "user_id", USER_ID
    );
    this.http.delete(`${URL}/grocery-list`, { headers });
  }

  delete_grocery_list(): void {
    this.grocery_list = [];

    const headers = new HttpHeaders({
      "user_id": USER_ID
    });
    this.http.delete(`${URL}/grocery-list/all`, { headers });
  }
}