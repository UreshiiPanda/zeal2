import { Injectable } from '@angular/core';
import { response } from 'express';
import { DateTime } from 'luxon';
import { Drygoods, ian_grocery } from './grocery-list/groceries';
import { dairyeggs } from './grocery-list/groceries';
import { fruitsvegetable } from './grocery-list/groceries';
import { get } from 'http';

export enum Tag {
  urgent = "Urgent",
  nonessential = "Nonessential",
  meat = "Meat",
  vegetable = "Vegetable",
  fruit = "Fruit",
  spice = "Spice"
};

export const tag_options: Tag[] = [Tag.urgent, Tag.nonessential, Tag.meat, Tag.vegetable, Tag.fruit, Tag.spice];

@Injectable({
  providedIn: 'root'
})
export class GroceryListService {
  private my_grocerylist: ian_grocery[] = [];
  private dairyeggs: ian_grocery[] = dairyeggs;
  private fruitsvegetable: ian_grocery[] = fruitsvegetable;
  private Drygoods: ian_grocery[] = Drygoods;
  hasStrikethrough: boolean = false;

  get_dairy_eggs() {
    return this.dairyeggs;
  }
get_my_grocerylist(){
  return this.my_grocerylist
}

get_vegetables_fruits(){
  return this.fruitsvegetable
}

get_household_items(){
  return this.Drygoods
}

toggleStrikethrough(): void {  // Add this method
  this.hasStrikethrough = !this.hasStrikethrough;
}
add_grocery(added_grocery: ian_grocery) {
    this.my_grocerylist.push(added_grocery);
    for (let list of [this.dairyeggs, this.fruitsvegetable, this.Drygoods]) {
      const index_of_grocery = list.findIndex(grocery => grocery.name === added_grocery.name);
      if (index_of_grocery !== -1) {
        list[index_of_grocery].inlist = true;
      }
    }
    // api call to add to list
  }
get_groceries_inmylist(){
  let groceries: ian_grocery[] = []
  for (let list of [this.dairyeggs, this.fruitsvegetable, this.Drygoods]) {
    list.forEach(grocery => {
      if (grocery.inlist) groceries.push(grocery)
    })
  }
  return groceries
}

purchased(){

}
  // delete grocery from list function 


  get_tag_options(): Tag[] {
    return tag_options;
  }

  
}


function add_params(baseUrl: string, params: any) {
  // Create a URL object from the base URL
  const url = new URL(baseUrl);

  // Create a URLSearchParams object from the params object
  const urlParams = new URLSearchParams(params);

  // Append each parameter to the URL's search string
  urlParams.forEach((value, key) => {
      url.searchParams.append(key, value);
  });

  // Return the updated URL as a string
  return url.toString();
}

export { ian_grocery };
