import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EndprojectComponent } from './endproject.component';

describe('EndprojectComponent', () => {
  let component: EndprojectComponent;
  let fixture: ComponentFixture<EndprojectComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EndprojectComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EndprojectComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
