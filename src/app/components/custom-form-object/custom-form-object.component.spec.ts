import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CustomFormObjectComponent } from './custom-form-object.component';

describe('CustomFormObjectComponent', () => {
  let component: CustomFormObjectComponent;
  let fixture: ComponentFixture<CustomFormObjectComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CustomFormObjectComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CustomFormObjectComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
