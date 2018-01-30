import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CustomFormArrayComponent } from './custom-form-array.component';

describe('CustomFormArrayComponent', () => {
  let component: CustomFormArrayComponent;
  let fixture: ComponentFixture<CustomFormArrayComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CustomFormArrayComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CustomFormArrayComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
