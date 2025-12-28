import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DishCard } from './dish-card';

describe('DishCard', () => {
  let component: DishCard;
  let fixture: ComponentFixture<DishCard>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [DishCard]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DishCard);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
