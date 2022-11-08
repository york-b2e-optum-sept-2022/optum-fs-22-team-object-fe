import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MainShopKeeperComponent } from './main-shop-keeper.component';

describe('MainShopKeeperComponent', () => {
  let component: MainShopKeeperComponent;
  let fixture: ComponentFixture<MainShopKeeperComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MainShopKeeperComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MainShopKeeperComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
