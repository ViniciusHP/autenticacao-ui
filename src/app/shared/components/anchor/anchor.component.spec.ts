import {
  Component,
  Input,
  SimpleChange,
  SimpleChanges,
  ViewChild,
} from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { TestingModule } from '../../tests/testing.module';

import { AnchorComponent } from './anchor.component';
import { AnchorModule } from './anchor.module';

@Component({
  selector: 'achor-component-dummy',
  template: `
    <vhp-anchor>
      <p>{{ projectedText }}</p>
    </vhp-anchor>
  `,
})
class AnchorDummyComponent {
  @Input()
  projectedText!: string;

  @ViewChild(AnchorComponent, { static: true })
  component!: AnchorComponent;
}

describe(AnchorComponent.name, () => {
  let component: AnchorComponent;
  let fixture: ComponentFixture<AnchorComponent>;

  let fixtureDummy: ComponentFixture<AnchorDummyComponent>;
  let componentDummy: AnchorDummyComponent;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [AnchorComponent, AnchorDummyComponent],
      imports: [AnchorModule, TestingModule],
    }).compileComponents();

    fixture = TestBed.createComponent(AnchorComponent);
    component = fixture.componentInstance;

    fixtureDummy = TestBed.createComponent(AnchorDummyComponent);
    componentDummy = fixtureDummy.componentInstance;
  });

  it('SHOULD create', () => {
    fixture.detectChanges();
    expect(component).toBeTruthy();
  });

  it(`(D) SHOULD display link as text
  WHEN (@Input type) is 'text'`, () => {
    component.type = 'text';
    const change: SimpleChanges = {
      type: new SimpleChange('text', component.type, true),
    };
    component.ngOnChanges(change);

    fixture.detectChanges();

    const el = fixture.debugElement.query(
      By.css('.anchor-text')
    )?.nativeElement;

    expect(el).toBeTruthy();
    expect(component.isButton).toBeFalse();
  });

  it(`(D) SHOULD display link as button
  WHEN (@Input type) is 'button'`, () => {
    component.type = 'button';
    const change: SimpleChanges = {
      type: new SimpleChange('text', component.type, true),
    };
    component.ngOnChanges(change);
    fixture.detectChanges();

    const el = fixture.debugElement.query(
      By.css('.anchor-button')
    )?.nativeElement;

    expect(el).toBeTruthy();
    expect(component.isButton).toBeTrue();
  });

  it(`(D) SHOULD has link
  WHEN (@Input link) is has value`, () => {
    component.link = '/test';
    const change: SimpleChanges = {
      link: new SimpleChange(undefined, component.link, true),
    };
    component.ngOnChanges(change);
    fixture.detectChanges();

    const el = fixture.debugElement.query(By.css('a'))
      ?.nativeElement as HTMLAnchorElement;

    expect(el.href.endsWith('/test')).toBeTrue();
  });

  it(`(D) SHOULD project content
  WHEN has content`, () => {
    componentDummy.projectedText = 'Test text';
    fixtureDummy.detectChanges();

    const el = fixtureDummy.debugElement.query(By.css('p'))
      ?.nativeElement as HTMLParagraphElement;

    expect(el.textContent).toBe('Test text');
  });
});
