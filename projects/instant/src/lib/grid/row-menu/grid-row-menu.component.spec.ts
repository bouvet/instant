import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GridRowMenuComponent } from './grid-row-menu.component';

describe('GridRowMenuComponent', () => {
  let component: GridRowMenuComponent;
  let fixture: ComponentFixture<GridRowMenuComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GridRowMenuComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GridRowMenuComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
