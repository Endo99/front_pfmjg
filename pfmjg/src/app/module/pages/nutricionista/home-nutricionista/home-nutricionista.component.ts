import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Categoria } from 'src/app/models/categoria/categoria';
import { Nutricionista } from 'src/app/models/nutricionista/nutricionista';

import { NutricionistaService } from 'src/app/services/nutricionista.service';
import { ServicePaciente } from 'src/app/services/service-paciente.service';

@Component({
  selector: 'app-home-controle-caixa',
  templateUrl: './home-nutricionista.component.html',
  styleUrls: ['./home-nutricionista.component.scss']
})
export class HomeNutricionistaComponent {

  isClick: Boolean = false;

  exibirPopupExclusao = false;

  sucessMessage: string = "";

  exibirMensagem: boolean = false;

  selectedNutricionista: any;

  nutricionistaSelecionado: Nutricionista | null = null;

  categorias: Categoria[] = [];

  nutricionistas: Nutricionista[] = [];

  nutricionista: Nutricionista = {

    id: 0,
    nome: '',
    cpf: '',
    telefone: '',
    situacao: '',
    descricao: ''

  }

  ngOnInit(): void {
    
    this.listarControles();
  }
  
  constructor(private router: Router, private route: ActivatedRoute, private toastr: ToastrService,
    private serviceNutricionista: NutricionistaService, private pacienteService: ServicePaciente) {
      
     }
  
     pages = [
      { nome: "Home", rota: "" },
      { nome: "Agenda", rota: "/agendamentos" },
      { nome: "Consulta", rota: "/consultas" },
      { nome: "Nutricionista", rota: "/nutricionistas"},
      { nome: "Categoria", rota: "/categorias"},
      { nome: "Paciente", rota: "/pacientes"},
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

  listarControles(): void {
    this.serviceNutricionista.listarNutricionista().subscribe(data => {
    this.nutricionistas = data;
  })
  }


     excluirNutricionista() {


      if (this.nutricionistaSelecionado && this.nutricionistaSelecionado.id) {
  
        const id = this.nutricionistaSelecionado.id;
        this.serviceNutricionista.deletarNutricionista(id). subscribe( () => {
          
          this.sucessMessage = "Consulta Excluído!";
          this.exibirMensagem = true;
          setTimeout(() => {
            this.toastr.success(this.sucessMessage, 'Sucesso');
            this.router.navigate(['nutricionistas']);
          }, 2000)
          this.listarControles();
  
          this.nutricionistaSelecionado = null;
          this.exibirPopupExclusao = false;
        });
      
      }
      else  {
          console.log("Não encontrado ou erro");
      }
    }
  
    selecionarControle(nutricionista: Nutricionista): void {
      this.nutricionistaSelecionado = nutricionista;
    }
  
    openPopup(controle: any) {
      console.log("Clicou");
      console.log(this.selectedNutricionista = controle);
      this.selectedNutricionista = controle;
    
    }
  
    closePopup() {
      this.selectedNutricionista = null;
      this.router.navigate(['/consultas']);
    }

    voltarPagina(): void {
      this.router.navigate(['consultas'])
    }
  
}
