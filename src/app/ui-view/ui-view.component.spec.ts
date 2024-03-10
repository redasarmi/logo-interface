import { ComponentFixture, TestBed } from '@angular/core/testing';
import { UiViewComponent } from './ui-view.component';

describe('UiViewComponent', () => {
  let component: UiViewComponent;
  let fixture: ComponentFixture<UiViewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [UiViewComponent]
    }).compileComponents();

    fixture = TestBed.createComponent(UiViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
