import { Component } from '@angular/core';
import { ICliente } from 'src/app/interfaces/cliente';
import { ClientesService } from 'src/app/services/clientes.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-clientes',
  templateUrl: './clientes.component.html',
  styleUrls: ['./clientes.component.css']
})
export class ClientesComponent {

  clientes: ICliente[] = [];
  constructor(private clientesService: ClientesService){}

  ngOnInit(){
    this.clientesService.retornaTodosOsClientes().subscribe((result: ICliente[]) => {
      this.clientes = result;
    })
  }

  delete(cliente: ICliente) {
    Swal.fire({
      title: 'Tem certeza?',
      text: 'Você está prestes a excluir o cliente ' + cliente.nome + '. Essa ação não pode ser desfeita!',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Sim, excluir!',
      cancelButtonText: 'Cancelar'
    }).then((result) => {
      if (result.isConfirmed) {
        this.clientesService.deletaClientePorCpf(cliente.cpf).subscribe(
          result => {
            Swal.fire(
              'Sucesso!',
              'Cliente excluído com sucesso.',
              'success'
              ).then(() => {
                location.reload();
            });
          },
          (error) => {
            Swal.fire(
              'Erro!',
              'Não foi possível excluir o cliente',
              'error'
            );
          },
        );
      }
    });
  }
}
