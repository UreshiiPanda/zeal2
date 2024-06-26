import { Component, inject, input, output, EventEmitter, OnInit, Input, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { AutoCompleteModule } from 'primeng/autocomplete';
import { DropdownModule } from 'primeng/dropdown';
import { MultiSelectModule } from 'primeng/multiselect';
import { InputNumberModule } from 'primeng/inputnumber';
import { CalendarModule } from 'primeng/calendar';
import { CardModule } from 'primeng/card';
import { ButtonModule } from 'primeng/button';
import { DialogModule } from 'primeng/dialog';
import { CheckboxModule } from 'primeng/checkbox';
import { DateTime } from 'luxon';
import { GroceryListService } from '../grocery-list.service';
import { dairyeggs, fruitsvegetable, Drygoods } from './groceries';
import { Router } from '@angular/router';
import { Grocery } from './groceries';

enum DueFilter {
  overdue = "Overdue",
  today = "Today",
  day = "Tomorrow",
  week = "Week"
}

enum Sorts {
  alphabetical = "Alphabetical",
  due_date = "Due Date",
  post_date = "Post Date",
  days_til_due = "Days Til Due",
  assigned = "Assigned"
}

// FIXME: animate groceries coming in an out of frame

@Component({
  selector: 'app-grocery-list',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    AutoCompleteModule,
    DropdownModule,
    MultiSelectModule,
    CheckboxModule,
    InputNumberModule,
    CalendarModule,
    CardModule,
    ButtonModule,
    DialogModule,
  ],
  
  templateUrl: './grocery-list.component.html',
  styleUrl: './grocery-list.component.css'
})
export class GroceryListComponent implements OnInit {
  searchQuery: string = '';
  groceries: Grocery[] = [];
  filteredGroceries: Grocery[] = [];
  grocery_list_service = inject(GroceryListService);
  create_menu_visible: boolean = false;
  hasStrikethrough: { [key: number]: boolean } = {}

  constructor(private router: Router) {}

  toggleStrikethrough(index: number): void {
    this.hasStrikethrough[index] = !this.hasStrikethrough[index];
  }

  ngOnInit(): void {
    this.filteredGroceries = this.groceries;
  }

  switch_fruits_and_vegetables() {
    this.groceries = fruitsvegetable;
  }

  swith_dairy_eggs() {
    this.groceries = dairyeggs;
  }

  switch_Drygoods() {
    this.groceries = Drygoods;
  }

  toggle_create_menu(): void {
    this.create_menu_visible = !this.create_menu_visible;
  }

  search_groceries(): Grocery[] {
    if (this.searchQuery) {
      return this.groceries.filter(grocery => {
        return grocery.name.toLowerCase().includes(this.searchQuery.toLowerCase());
      })
    } else return this.groceries;
  }

  navigateToNewPage(): void {
    this.router.navigate(['/grocery-list/my-list']);
  }

  addToList(grocery: Grocery): void {
    grocery.inlist = true;
  }

  filtergroceriesinlist(groceries: Grocery[]): Grocery[] {
    return groceries.filter(grocery => !grocery.inlist);
  }

  search_filter(groceries: Grocery[]): Grocery[] {
    return this.filtergroceriesinlist(this.search_groceries())
  }

  debug(grocery: string): void {
    console.log
  }
}


type comparable = string | DateTime | number | undefined | null;
function spaceship(a: comparable, b: comparable): number {
  if (!a && !b) return 0;
  else if (!a) return 1;
  else if (!b) return -1;
  else if (a < b) return -1;
  else if (a > b) return 1;
  else return 0;
}


