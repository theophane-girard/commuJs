import { Component } from '@angular/core';

export type User = {
  id: string;
  name: string;
};

enum keys {
  USER = 'user',
  ROLE = 'role',
}

@Component({
  standalone: true,
  selector: 'type-component',
  template: ``,
})
export class TypesComponent {
  user: User = {
    id: 'unique-id',
    name: 'Abdel',
  };

  constructor() {
    const c: Omit<Record<keys, Partial<Pick<User, 'id'>>>, keys.ROLE> = {
      user: {},
    };
  }

  updateUser(user: Partial<Omit<User, 'id'>>) {
    this.user = {
      ...this.user,
      ...user,
    };
  }
  updateUserName(user: Pick<User, 'name'>) {
    this.user = {
      ...this.user,
      ...user,
    };
  }
}
