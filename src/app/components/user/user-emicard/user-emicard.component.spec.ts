import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UserEmicardComponent } from './user-emicard.component';

describe('UserEmicardComponent', () => {
  let component: UserEmicardComponent;
  let fixture: ComponentFixture<UserEmicardComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UserEmicardComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UserEmicardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
