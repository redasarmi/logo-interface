import { ComponentFixture, TestBed } from '@angular/core/testing';
import { TurtleViewComponent } from './turtle-view.component';

describe('TurtleViewComponent', () => {
  let component: TurtleViewComponent;
  let fixture: ComponentFixture<TurtleViewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TurtleViewComponent]
    }).compileComponents();

    fixture = TestBed.createComponent(TurtleViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
