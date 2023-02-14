import { Component } from '@angular/core';

export type User = {
  id: string;
  name: string;
};

enum keys {
  USER = 'user',
  ROLE = 'role',
}
/**
 * { id: string }
 */
type UserId = Pick<User, 'id'>;

/**
 * { id?: string }
 */
type OptionalUserId = Partial<UserId>;

/**
 *
 * type test = 'a' | 'b'
 * type aaaa = Record<test, User>
 *
 * const randomObject: Record<keys, User> =
 * {
 *    user: { id: string, name: string }
 *    role: { id: string, name: string }
 * }
 */

/**
 * {
 *  user: { id?: string }
 *  role: { id?: string }
 * }
 */
type RecordUserWithOptionalId = Record<keys, OptionalUserId>;

/**
 * {
 *  user: { id?: string }
 * }
 */
type RecordUserWoRole = Omit<RecordUserWithOptionalId, keys.ROLE>;

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
    const d: RecordUserWoRole = {
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
