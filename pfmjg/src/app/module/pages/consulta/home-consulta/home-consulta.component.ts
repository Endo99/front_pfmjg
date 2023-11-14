import { Component } from '@angular/core';
import { ɵDomRendererFactory2 } from '@angular/platform-browser';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Agendamento } from 'src/app/models/agendamento/agendamento';
import { Consulta } from 'src/app/models/consulta/consulta';
import { Paciente } from 'src/app/models/paciente';
import { ServiceConsulta } from 'src/app/services/service-consulta.service';

@Component({
  selector: 'app-home-consulta',
  templateUrl: './home-consulta.component.html',
  styleUrls: ['./home-consulta.component.scss']
})
export class HomeConsultaComponent {

  isClick: Boolean = false;

  consultas: Consulta[] = [];

  exibirPopupExclusao = false;
  consultaSelecionado: Consulta | null = null;

  selectedConsulta: any

  sucessMessage: string = "";

  exibirMensagem: boolean = false;

  selectedCategoria: any;

  consulta: Consulta = {
    idConsulta: 0,
    paciente: new Paciente(),
    agendamento: new Agendamento,
    dataConsultaAtual: new Date(),
    tipoConsulta: '',
    formaPagamento: '',
  };

  ngOnInit(): void {

    this.listarCategoria();
  }

  listarCategoria(): void {
    this.consultaServices.getConsulta().subscribe(data => {
      this.consultas = data;
    })
  }

  constructor(private router: Router, private route: ActivatedRoute,
    private renderer: ɵDomRendererFactory2, private toastr: ToastrService, private consultaServices: ServiceConsulta) {

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

  excluirCategoria() {


    if (this.consultaSelecionado && this.consultaSelecionado.idConsulta) {

      const idConsulta = this.consultaSelecionado.idConsulta;
      this.consultaServices.excluirConsulta(idConsulta).subscribe(() => {

        this.sucessMessage = "Consulta Excluído!";
        this.exibirMensagem = true;
        setTimeout(() => {
          this.toastr.success(this.sucessMessage, 'Sucesso');
          this.router.navigate(['consultas']);
        }, 2000)
        this.listarCategoria();

        this.consultaSelecionado = null;
        this.exibirPopupExclusao = false;
      });

    }
    else {
      console.log("Não encontrado ou erro");
    }
  }

  selecionarPaciente(consulta: Consulta): void {
    this.consultaSelecionado = consulta;
  }

  openPopup(consulta: any) {
    console.log("Clicou");
    console.log(this.consultaSelecionado = consulta);
    this.selectedConsulta = consulta;

  }

  closePopup() {
    this.selectedConsulta = null;
    this.router.navigate(['/consultas']);
  }

}
