import { Component, inject } from '@angular/core';
import { GroceryListService } from '../../grocery-list.service';
import { CommonModule } from '@angular/common';
@Component({
  selector: 'app-viewlist',
  standalone: true,
  imports: [
    CommonModule
  ],
  templateUrl: './viewlist.component.html',
  styleUrl: './viewlist.component.css'
})
export class ViewlistComponent {
  grocery_list_service = inject(GroceryListService)
}
