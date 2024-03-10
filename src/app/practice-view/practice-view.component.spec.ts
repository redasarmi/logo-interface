import { ComponentFixture, TestBed } from '@angular/core/testing';
import { PracticeViewComponent } from './practice-view.component';

describe('PracticeViewComponent', () => {
  let component: PracticeViewComponent;
  let fixture: ComponentFixture<PracticeViewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PracticeViewComponent]
    }).compileComponents();

    fixture = TestBed.createComponent(PracticeViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
