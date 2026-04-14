import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { UsersRoutingModule } from './users-routing-module';
import { SharedModule } from '../../shared/shared-module';
import { ListUsersComponent } from './list-users/list-users';

@NgModule({
  declarations: [ListUsersComponent],
  imports: [CommonModule, UsersRoutingModule, FormsModule, SharedModule],
})
export class UsersModule {}
