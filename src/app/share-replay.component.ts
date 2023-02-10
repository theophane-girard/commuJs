import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { count, of, map, tap, shareReplay } from 'rxjs';

@Component({
  selector: 'share-replay',
  template: `
    <h2>Operator ShareReplay</h2>
    <h5>Trace : </h5>
    <ul>
      <li *ngFor="let obsCount of userCallList">{{obsCount}}</li>
    </ul>
    <h5>User < 18 ans</h5>
    <ul>
      <li *ngFor="let kid of kids$ | async">{{kid.name}} - {{kid.age}} ans</li>
    </ul>
    <h5>User > 18 ans</h5>
    <ul>
      <li *ngFor="let adult of adults$ | async">{{adult.name}} - {{adult.age}} ans</li>
    </ul>
  `,
  standalone: true,
  imports: [CommonModule],
})
export class ShareReplayComponent {
  userCallList = [];
  users$ = this.getUsers().pipe(
    tap(() => this.userCallList.push(`J'appelle la fonction getUsers()`))
  );

  kids$ = this.users$.pipe(map((users) => users.filter((u) => u.age < 18)));

  adults$ = this.users$.pipe(map((users) => users.filter((u) => u.age > 18)));

  getUsers() {
    return of([
      {
        id: 1,
        name: 'Bob',
        age: 17,
      },
      {
        id: 1,
        name: 'Morane',
        age: 19,
      },
    ]);
  }
}
