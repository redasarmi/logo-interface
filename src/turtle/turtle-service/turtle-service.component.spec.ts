import { ComponentFixture, TestBed } from '@angular/core/testing';
import { TurtleServiceComponent } from './turtle-service.component';

describe('TurtleServiceComponent', () => {
  let component: TurtleServiceComponent;
  let fixture: ComponentFixture<TurtleServiceComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TurtleServiceComponent]
    }).compileComponents();

    fixture = TestBed.createComponent(TurtleServiceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
