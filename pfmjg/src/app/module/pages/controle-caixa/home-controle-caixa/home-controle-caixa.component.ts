import { Component } from '@angular/core';
import { ɵDomRendererFactory2 } from '@angular/platform-browser';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Categoria } from 'src/app/models/categoria/categoria';
import { Conta } from 'src/app/models/conta/conta';
import { ControleCaixa } from 'src/app/models/controle-caixa/controle-caixa';
import { Paciente } from 'src/app/models/paciente';
import { ControleCaixaService } from 'src/app/services/controle-caixa.service';
import { ServicePaciente } from 'src/app/services/service-paciente.service';

@Component({
  selector: 'app-home-controle-caixa',
  templateUrl: './home-controle-caixa.component.html',
  styleUrls: ['./home-controle-caixa.component.scss']
})
export class HomeControleCaixaComponent {

  exibirPopupExclusao = false;

  sucessMessage: string = "";

  exibirMensagem: boolean = false;

  selectedControle: any;

  controleSelecionado: ControleCaixa | null = null;

  pacientes: Paciente[] = [];

  contas: Conta[] = [];

  categorias: Categoria[] = [];

  controles: ControleCaixa[] = [];

  controle: ControleCaixa = {

    idControleCaixa: 0,
    paciente: new Paciente,
    conta: [],
    data: new Date(),
    produtoOuCliente: '',
    preco: 0,
    formaPagamento: '',
    categoria: new Categoria,
    descricaoControle: '',

  }

  ngOnInit(): void {
    
    this.listarControles();
  }
  
  constructor(private router: Router, private route: ActivatedRoute,
    private renderer: ɵDomRendererFactory2, private toastr: ToastrService,
    private serviceControle: ControleCaixaService, private pacienteService: ServicePaciente) {
      
     }
  
  listarControles(): void {
    this.serviceControle.listarControleCaixa().subscribe(data => {
    this.controles = data;
  })
  }

  listarPacientes() {
    this.pacienteService.getPaciente().subscribe(pacientes => {
      this.pacientes = pacientes;
    });
  }


     excluirControle() {


      if (this.controleSelecionado && this.controleSelecionado.idControleCaixa) {
  
        const idControle = this.controleSelecionado.idControleCaixa;
        this.serviceControle.deletarControleCaixa(idControle). subscribe( () => {
          
          this.sucessMessage = "Consulta Excluído!";
          this.exibirMensagem = true;
          setTimeout(() => {
            this.toastr.success(this.sucessMessage, 'Sucesso');
            this.router.navigate(['consultas']);
          }, 2000)
          this.listarControles();
  
          this.controleSelecionado = null;
          this.exibirPopupExclusao = false;
        });
      
      }
      else  {
          console.log("Não encontrado ou erro");
      }
    }
  
    selecionarPaciente(controle: ControleCaixa): void {
      this.controleSelecionado = controle;
    }
  
    openPopup(controle: any) {
      console.log("Clicou");
      console.log(this.selectedControle = controle);
      this.selectedControle = controle;
    
    }
  
    closePopup() {
      this.selectedControle = null;
      this.router.navigate(['/consultas']);
    }
}
