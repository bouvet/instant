import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GridToolbarComponent } from './grid-toolbar.component';

describe('GridToolbarComponent', () => {
  let component: GridToolbarComponent;
  let fixture: ComponentFixture<GridToolbarComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GridToolbarComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GridToolbarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
