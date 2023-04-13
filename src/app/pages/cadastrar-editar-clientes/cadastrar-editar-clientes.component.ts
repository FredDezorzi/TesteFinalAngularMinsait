import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { ICliente } from 'src/app/interfaces/cliente';
import { ClientesService } from 'src/app/services/clientes.service';
import Swal from 'sweetalert2';
import Inputmask from 'inputmask';

@Component({
  selector: 'app-cadastrar-editar-clientes',
  templateUrl: './cadastrar-editar-clientes.component.html',
  styleUrls: ['./cadastrar-editar-clientes.component.css']
})
export class CadastrarEditarClientesComponent {

  @ViewChild('phoneInput') phoneInput!: ElementRef;
  @ViewChild('cepInput') cepInput!: ElementRef;
  @ViewChild('cpfInput') cpfInput!: ElementRef;

  clienteForm = new FormGroup({
    nome: new FormControl('',Validators.required),
    cpf: new FormControl('',Validators.required),
    telefone: new FormControl('',Validators.required),
    rua: new FormControl('',Validators.required),
    numero: new FormControl('',Validators.required),
    cep: new FormControl('',Validators.required),
    rendimentoMensal: new FormControl(0,Validators.required),
  })
  constructor(private clientesService: ClientesService, private route: ActivatedRoute){}
  clientecpf = "";

  ngOnInit(){
    this.clientecpf = this.route.snapshot.paramMap.get('cpf') || "";
    if (this.clientecpf) {
      this.clientesService.retornaClientePorCpf(this.clientecpf).subscribe((cliente: ICliente) => {
        this.clienteForm.setValue({
          nome: cliente.nome,
          cpf: cliente.cpf,
          telefone: cliente.telefone,
          rua: cliente.rua,
          numero: cliente.numero,
          cep: cliente.cep,
          rendimentoMensal: cliente.rendimentoMensal  || 0
        })
      });
    }
  }

  ngAfterViewInit() {
    Inputmask({
      mask: [
        '(99)9999-9999',
        '(99)99999-9999'
      ],
      showMaskOnHover: false,
      onBeforeMask: (value, opts) => {
        // Remove tudo o que não é número
        return value.replace(/\D/g, '');
      }
    }).mask(this.phoneInput.nativeElement);
    Inputmask({
      mask: '999.999.999-99',
      showMaskOnHover: false,
    }).mask(this.cpfInput.nativeElement);
    Inputmask({
      mask: '99999-999',
      showMaskOnHover: false,
    }).mask(this.cepInput.nativeElement);
  }

  cadastrar() {
    const cliente: ICliente = this.clienteForm.value as ICliente;
    this.clientesService.cadastrarCliente(cliente).subscribe(
      result => {
        Swal.fire(
          'Sucesso!',
          'Cliente cadastrado com sucesso.',
          'success'
        );
      },
      (error) => {
        if (error.status === 409) {
          Swal.fire(
            'Erro!',
            'CPF já cadastrado',
            'error'
          );
        } else {
          Swal.fire(
            'Erro!',
            'Não foi possível cadastrar o cliente. Verifique se as informações estão corretas.',
            'error'
          );
        }
      }
    );
  }

  editar() {
    const cliente: ICliente = this.clienteForm.value as ICliente;
    this.clientesService.editaClientePorCpf(cliente.cpf,cliente).subscribe(
      result => {
        Swal.fire(
          'Sucesso!',
          'Cliente Editado com sucesso.',
          'success'
        );
      },
      (error) => {
        Swal.fire(
          'Erro!',
          'Não foi possível editar o cliente. Verifique se as informações estão corretas.',
          'error'
        );
      }
    );
  }

}
