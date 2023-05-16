import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CadastroUsuarioComponent } from './cadastro-usuario/cadastro-usuario.component';
import { RecuperarSenhaComponent } from './recuperar-senha/recuperar-senha.component';
import { RedefinirSenhaComponent } from './redefinir-senha/redefinir-senha.component';

const routes: Routes = [
  {
    path: 'cadastrar',
    component: CadastroUsuarioComponent,
  },
  {
    path: 'recuperar-senha',
    component: RecuperarSenhaComponent,
  },
  {
    path: 'redefinir-senha/:token',
    component: RedefinirSenhaComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class UsuariosRoutingModule {}
