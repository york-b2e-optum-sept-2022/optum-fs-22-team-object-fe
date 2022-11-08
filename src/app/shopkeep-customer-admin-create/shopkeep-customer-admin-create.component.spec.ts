import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ShopkeepCustomerAdminCreateComponent } from './shopkeep-customer-admin-create.component';

describe('ShopkeepCustomerAdminCreateComponent', () => {
  let component: ShopkeepCustomerAdminCreateComponent;
  let fixture: ComponentFixture<ShopkeepCustomerAdminCreateComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ShopkeepCustomerAdminCreateComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ShopkeepCustomerAdminCreateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
