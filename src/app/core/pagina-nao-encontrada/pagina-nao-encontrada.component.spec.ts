import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TestingModule } from 'src/app/shared/tests/testing.module';
import { PaginaNaoEncontradaComponent } from './pagina-nao-encontrada.component';
import { PaginaNaoEncontradaModule } from './pagina-nao-encontrada.module';

describe('PaginaNaoEncontradaComponent', () => {
  let component: PaginaNaoEncontradaComponent;
  let fixture: ComponentFixture<PaginaNaoEncontradaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PaginaNaoEncontradaModule, TestingModule],
    }).compileComponents();

    fixture = TestBed.createComponent(PaginaNaoEncontradaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
