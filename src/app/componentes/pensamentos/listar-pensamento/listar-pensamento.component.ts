import { Router } from '@angular/router';
import { PensamentoService } from './../pensamento.service';
import { Component, OnInit } from '@angular/core';
import { Pensamento } from '../pensamento/pensamento';


@Component({
  selector: 'app-listar-pensamento',
  templateUrl: './listar-pensamento.component.html',
  styleUrls: ['./listar-pensamento.component.css']
})
export class ListarPensamentoComponent implements OnInit {

  listaFavoritos: Pensamento[] = [];
  listaPensamentos: Pensamento[] = [];
  paginaAtual: number = 1;
  haMaisPensamentos: boolean = true;
  filtro: string = ''
  favoritos: boolean = false;
  titulo: string = 'Meu'

  constructor(private service: PensamentoService, private router: Router) { }

  ngOnInit(): void {
    this.service.listar(this.paginaAtual, this.filtro, this.favoritos).subscribe((listaPensamentos) => {
      this.listaPensamentos = listaPensamentos
    })
  }

  carregarMaisPensamentos() {
    this.service.listar(++this.paginaAtual, this.filtro, this.favoritos)
      .subscribe(listaPensamentos => {
        this.listaPensamentos.push(...listaPensamentos);
        if(!listaPensamentos.length) {
          this.haMaisPensamentos = false
        }
      })
  }

  pesquisarPensamentos() {
    this.haMaisPensamentos = true
    this.paginaAtual = 1;
    this.service.listar(this.paginaAtual, this.filtro, this.favoritos)
      .subscribe(listaPensamentos => {
        this.listaPensamentos = listaPensamentos
      })
  }
  listarFavoritos() {
    this.titulo = 'Meus Favoritos'
    this.favoritos = true
    this.haMaisPensamentos = true
    this.paginaAtual = 1
    this.service.listar(this.paginaAtual, this.filtro, this.favoritos)
      .subscribe(listaPensamentosFavoritos => {
        this.listaPensamentos = listaPensamentosFavoritos
        this.listaFavoritos = listaPensamentosFavoritos
      })
  }

  recarregarComponente(){
    this.favoritos = false;
    this.paginaAtual = 1;

    this.router.routeReuseStrategy.shouldReuseRoute = () => false;
    this.router.onSameUrlNavigation = 'reload';
    this.router.navigate([this.router.url])

  }
}
