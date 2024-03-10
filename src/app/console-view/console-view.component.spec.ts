import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ConsoleViewComponent } from './console-view.component';

describe('WireViewComponent', () => {
  let component: ConsoleViewComponent;
  let fixture: ComponentFixture<ConsoleViewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ConsoleViewComponent]
    }).compileComponents();

    fixture = TestBed.createComponent(ConsoleViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
