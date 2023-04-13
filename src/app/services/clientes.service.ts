import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environment/environment';
import { ICliente } from '../interfaces/cliente';

@Injectable({
  providedIn: 'root'
})
export class ClientesService {
  endpoint = 'clientes'
  api = environment.api;
  constructor(private http: HttpClient) { }

  retornaTodosOsClientes(){
    return this.http.get<ICliente[]>(`${this.api}/${this.endpoint}`);
  }

  cadastrarCliente(cliente : ICliente){
    return this.http.post(`${this.api}/${this.endpoint}`, cliente);
  }

  retornaClientePorCpf(cpf: string){
    return this.http.get<ICliente>(`${this.api}/${this.endpoint}/${cpf}`);
  }

  deletaClientePorCpf(cpf: string){
    return this.http.delete<ICliente>(`${this.api}/${this.endpoint}/${cpf}`);
  }

  editaClientePorCpf(cpf: string, cliente: ICliente){
    return this.http.put(`${this.api}/${this.endpoint}/${cpf}`, cliente);
  }

}
