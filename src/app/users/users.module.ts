import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UsersComponent } from './users.component';
import { UsersSearchComponent } from './users-search/users-search.component';
import { UsersHistoryComponent } from './users-history/users-history.component';
import { DropdownClickOutsideDirective } from './users-search/dropdown-click-outside.directive';

@NgModule({
  declarations: [UsersComponent, UsersSearchComponent, UsersHistoryComponent, DropdownClickOutsideDirective],
  imports: [CommonModule],
  exports: [UsersComponent],
  bootstrap: [UsersComponent]
})
export class UsersModule {}
