import { HttpClient, HttpResponse } from '@angular/common/http';
import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-error',
  templateUrl: './error.component.html',
  styleUrls: ['./error.component.scss']
})
export class ErrorComponent {

  isClick: Boolean = false;

  constructor(private router: Router, private http: HttpClient) {

  }

  pages = [
    { nome: "Home", rota: "" },
    { nome: "Agenda", rota: "/agendamentos" },
    { nome: "Consulta", rota: "/consultas" },
    { nome: "Nutricionista", rota: "/nutricionistas" },
    { nome: "Categoria", rota: "/categorias" },
    { nome: "Paciente", rota: "/pacientes" },
    // Adicione outras páginas conforme necessário
  ];


  direcionarPagina(pagina: string) {
    // Encontre a página correspondente no array de páginas
    const paginaEncontrada = this.pages.find(p => p.nome.toLowerCase() === pagina.toLowerCase());

    if (paginaEncontrada) {
      console.log("Entrou e clicou");
      // Redirecione para a rota correspondente
      this.router.navigate([paginaEncontrada.rota]);
    }
  }

  clicarMenuBento() {
    this.isClick = !this.isClick;
  }

//     public fazerRequisicao(): void {
//       this.http.get('https://api.exemplo.com/dados', { observe: 'response' }).subscribe(
//         (response: HttpResponse<any>) => {
//           console.log('Resposta do servidor:', response);
    
//           if (response.status >= 200 && response.status < 300) {
//             console.log('Resposta bem-sucedida do servidor.');
//           } else if (response.status >= 400 && response.status < 500) {
//             console.error('Erro do lado do cliente:', response);
//           } else if (response.status >= 500) {
//             console.error('Erro do lado do servidor:', response);
//           }
//         },
//         (error: any) => {
//           console.error('Erro na requisição:', error);
//         }
//       );
// }

}
