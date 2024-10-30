import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CartitemlistComponent } from './cartitemlist.component';

describe('CartitemlistComponent', () => {
  let component: CartitemlistComponent;
  let fixture: ComponentFixture<CartitemlistComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CartitemlistComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(CartitemlistComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
