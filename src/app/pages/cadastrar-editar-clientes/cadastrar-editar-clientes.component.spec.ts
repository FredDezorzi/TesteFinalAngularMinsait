import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CadastrarEditarClientesComponent } from './cadastrar-editar-clientes.component';

describe('CadastrarEditarClientesComponent', () => {
  let component: CadastrarEditarClientesComponent;
  let fixture: ComponentFixture<CadastrarEditarClientesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CadastrarEditarClientesComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CadastrarEditarClientesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
