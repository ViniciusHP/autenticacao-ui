import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { SharedModule } from 'primeng/api';
import { TestingModule } from 'src/app/shared/tests/testing.module';

import { FooterComponent } from './footer.component';

describe(FooterComponent.name, () => {
  let component: FooterComponent;
  let fixture: ComponentFixture<FooterComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [FooterComponent],
      imports: [TestingModule, SharedModule],
    }).compileComponents();

    fixture = TestBed.createComponent(FooterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('SHOULD create', () => {
    expect(component).toBeTruthy();
  });

  it('(D) SHOULD display developed for', () => {
    const pElement = fixture.debugElement.query(By.css('p'))
      .nativeElement as HTMLParagraphElement;

    expect(pElement.textContent).toContain(
      'footer.descriptions.desenvolvido_por'
    );
  });

  it('(D) SHOULD display link to Github', () => {
    const linkElement = fixture.debugElement.query(By.css('a'))
      .nativeElement as HTMLAnchorElement;
    expect(linkElement.href).toContain(`https://github.com/ViniciusHP`);
  });
});
