import {
  Component,
  ElementRef,
  ViewChild,
  OnInit,
  AfterViewInit,
  OnDestroy
} from '@angular/core';
import { fromEvent, Observable, Subject } from 'rxjs';
import {
  debounceTime,
  distinctUntilChanged,
  filter,
  map,
  tap,
  takeUntil
} from 'rxjs/operators';
import cloneDeep from 'lodash-es/cloneDeep';
import { UsersService } from '../users.service';
import { TUserResponse } from '../../@types/user';

@Component({
  selector: 'app-users-search',
  templateUrl: './users-search.component.html',
  styleUrls: ['./users-search.component.scss']
})
export class UsersSearchComponent implements OnInit, AfterViewInit, OnDestroy {
  // Properties
  isLoading = false;
  usersSuggestions: any[] = [];
  showUsersSuggestions = false;
  private keyupEvent: Observable<KeyboardEvent>;
  private readonly onDestroy = new Subject<void>();

  // Element References
  @ViewChild('searchControl', { static: false })
  searchControl: ElementRef;
  @ViewChild('usersSuggestionMenu', { static: false })
  usersSuggestionMenu: ElementRef;

  /**
   * Component constructor
   * @param usersService Users service
   */
  constructor(private usersService: UsersService) {}

  /**
   * Component callback on init
   */
  ngOnInit(): void {}

  /**
   * Component callback after view init
   */
  ngAfterViewInit(): void {
    this.usersSuggestionMenu.nativeElement.style.width = `${this.searchControl.nativeElement.offsetWidth}px`;

    this.keyupEvent = fromEvent(this.searchControl.nativeElement, 'keyup');
    this.keyupEvent
      .pipe(
        map((ev: any) => ev.target.value),
        tap((value: string) => {
          if (value === '' && this.usersSuggestions.length) {
            this.usersSuggestions.splice(0, this.usersSuggestions.length);
            this.showUsersSuggestions = false;
            return;
          }
        }),
        filter(Boolean),
        debounceTime(500),
        distinctUntilChanged(),
        takeUntil(this.onDestroy)
      )
      .subscribe({
        next: (value: string) => {
          this.isLoading = true;
          this.doUsersSearch(value);
        }
      });
  }

  /**
   * Component callback on destroy
   */
  ngOnDestroy(): void {
    this.onDestroy.next();
  }

  /**
   * Request users data from Github API by using Users Service
   * @param value Githuba username keyword
   */
  doUsersSearch(value: string): void {
    this.usersService
      .getUsers(value)
      .pipe(takeUntil(this.onDestroy))
      .subscribe({
        next: (response: any) => {
          this.isLoading = false;
          this.createSearchSuggestions(response.data.search.users);
        },
        error: err => {
          this.isLoading = false;
          console.error(err);
        }
      });
  }

  /**
   * Create users suggestions data for suggestion menu
   * @param users Users data returned by Users Service
   */
  createSearchSuggestions(users: TUserResponse[]): void {
    if (this.usersSuggestions.length) {
      this.usersSuggestions.splice(0, this.usersSuggestions.length);
    }

    const suggestions = [...users];
    this.usersSuggestions = cloneDeep(suggestions);
    this.showUsersSuggestions = true;
  }

  /**
   * Handle focus event on search control
   */
  handleSearchFocus(): void {
    if (this.usersSuggestions.length && !this.showUsersSuggestions) {
      this.showUsersSuggestions = true;
    }
  }

  /**
   * Handle click event outside the suggestions menu
   * @param target Suggestions dropdown menu
   */
  handleOutsideClick(target: HTMLInputElement): void {
    if (
      target === this.searchControl.nativeElement ||
      !this.showUsersSuggestions
    ) {
      return;
    }

    this.showUsersSuggestions = false;
  }
}
