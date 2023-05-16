import { ComponentFixture, TestBed } from '@angular/core/testing';
import { TestingModule } from '../../tests/testing.module';

import { FormCardComponent } from './form-card.component';
import { FormCardModule } from './form-card.module';

describe(FormCardComponent.name, () => {
  let component: FormCardComponent;
  let fixture: ComponentFixture<FormCardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [FormCardComponent],
      imports: [FormCardModule, TestingModule],
    }).compileComponents();

    fixture = TestBed.createComponent(FormCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
