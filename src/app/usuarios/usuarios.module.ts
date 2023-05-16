import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { CadastroUsuarioModule } from './cadastro-usuario/cadastro-usuario.module';
import { RecuperarSenhaModule } from './recuperar-senha/recuperar-senha.module';
import { RedefinirSenhaModule } from './redefinir-senha/redefinir-senha.module';
import { UsuariosRoutingModule } from './usuarios-routing.module';

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    UsuariosRoutingModule,
    CadastroUsuarioModule,
    RecuperarSenhaModule,
    RedefinirSenhaModule,
  ],
})
export class UsuariosModule {}
