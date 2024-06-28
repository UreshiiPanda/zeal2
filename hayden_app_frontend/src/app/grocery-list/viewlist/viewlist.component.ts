import { Component, OnInit } from '@angular/core';
import { GroceryListService, ian_grocery } from '../../grocery-list.service';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
@Component({
  selector: 'app-viewlist',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './viewlist.component.html',
  styleUrls: ['./viewlist.component.css']
})
export class ViewlistComponent implements OnInit {
  groceries: ian_grocery[] = [];
  hasStrikethrough: { [key: string]: boolean } = {};

  constructor(private grocery_list_service: GroceryListService, private router: Router) {}



  ngOnInit(): void {
    this.loadGroceries();
  }

  loadGroceries(): void {
    this.groceries = this.grocery_list_service.get_groceries_inmylist();
    this.groceries.forEach(grocery => {
      this.hasStrikethrough[grocery.name] = false;
    });
  }

  toggleStrikethrough(groceryName: string): void {
    this.hasStrikethrough[groceryName] = !this.hasStrikethrough[groceryName];
  }

  clearList(): void {
    this.groceries = [];
    this.hasStrikethrough = {};
    // If you want to clear the list in the service as well, add:
    // this.grocery_list_service.clear_groceries();
  }

  deleteItem(groceryName: string): void {
    this.groceries = this.groceries.filter(grocery => grocery.name !== groceryName);
    delete this.hasStrikethrough[groceryName];
    // If you want to delete the item in the service as well, add:
    // this.grocery_list_service.delete_grocery(groceryName);
  }

  navigateToNewPage(): void {
    this.router.navigate(['/grocery-list']);
  }
}