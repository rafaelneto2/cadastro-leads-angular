import {Component, OnInit} from '@angular/core';
import {Leads} from "../../model/leads";
import {Router} from "@angular/router";
import {LeadsService} from "../../service/leads.service";

@Component({
  selector: 'app-leads-list',
  templateUrl: './leads-list.component.html',
  styleUrls: ['./leads-list.component.css']
})
export class LeadsListComponent implements OnInit {

  leads: Leads[] = [];
  pageSize = 10; // Número de itens por página
  currentPage = 1; // Página atual

  constructor(
    private router: Router,
    private service: LeadsService,

  ) {
  }

  ngOnInit(): void {
    this.listarLeads();
  }

  listarLeads() {
    this.service.listarLeads()
      .subscribe(resp => {
        this.leads = resp
      })
  }

}
