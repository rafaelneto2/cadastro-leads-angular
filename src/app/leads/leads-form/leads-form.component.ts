import {Component, OnDestroy, OnInit} from '@angular/core';
import {FormBuilder, Validators} from '@angular/forms';
import {ActivatedRoute, Router} from "@angular/router";
import {Subscription} from "rxjs";
import {LeadsService} from "../../service/leads.service";
import {ToastrService} from "ngx-toastr";

@Component({
  selector: 'app-leads-form',
  templateUrl: './leads-form.component.html',
  styleUrls: ['./leads-form.component.css']
})
export class LeadsFormComponent implements OnInit, OnDestroy {
  private routeSub: Subscription = new Subscription();
  title: string = ''
  id: number = 0
  context: string | undefined = ''
  textButton: string = ''
  displayStyle = "none"
  formReadOnly: boolean = false;
  formGroup = this.formBuilder.group({
    cnpj: ['', [Validators.required]],
    razao_social: ['', [Validators.required]],
    cep: ['', [Validators.required]],
    endereco: ['', [Validators.required]],
    numero: ['', [Validators.required]],
    complemento: [''],
    bairro: ['', [Validators.required]],
    cidade: ['', [Validators.required]],
    estado: ['', [Validators.required]],
  })

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private formBuilder: FormBuilder,
    private service: LeadsService,
    private toastr: ToastrService
  ) {
  }

  ngOnInit(): void {
    this.routeSub = this.route.params.subscribe(params => {
      this.id = params['id'];
      this.context = this.route.routeConfig?.path;
      this.configContext();
    });

    this.title = this.route.snapshot.data['title'];

    if (this.id) {
      this.getLead();
    }
  }

  ngOnDestroy(): void {
    this.routeSub.unsubscribe();
  }

  onSubmit() {
    if (this.context?.includes('visualizar-lead')) {
      this.router.navigate(['/'])
    } else if (this.formGroup.valid) {
      if (this.context?.includes('novo-lead')) {
        this.criaLead()
      } else if (this.context?.includes('excluir-lead')) {
        this.openModalConfirmaExclusao()
      } else if (this.context?.includes('editar-lead')) {
        this.editaLead()
      }
    } else {
      this.validate()
    }
  }

  private configContext() {
    if (this.context?.includes('novo-lead')) {
      this.textButton = 'Salvar'
    } else if (this.context?.includes('excluir-lead')) {
      this.textButton = 'Excluir'
      this.formReadOnly = true
    } else if (this.context?.includes('editar-lead')) {
      this.textButton = 'Salvar'
    } else if (this.context?.includes('visualizar-lead')) {
      this.textButton = 'Voltar'
      this.formReadOnly = true
    }
  }

  consultaCEP() {
    let cep = this.formGroup.get('cep')?.value;
    cep = cep!.replace(/\D/g, '');
    if (cep != '') {
      let validacep = /^[0-9]{8}$/;
      this.resetaDadosForm();
      if (validacep.test(cep)) {
        this.service.consultaCEP(cep).subscribe(dados => {
          this.populaDadosForm(dados)
        })
      }
    }
  }

  private resetaDadosForm() {
    this.formGroup.patchValue({
      endereco: null,
      cep: null,
      numero: null,
      complemento: null,
      bairro: null,
      cidade: null,
      estado: null,
    });
  }

  private populaDadosForm(dados: any) {
    this.formGroup.patchValue({
      endereco: dados.logradouro,
      cep: dados.cep,
      numero: '',
      complemento: dados.complemento,
      bairro: dados.bairro,
      cidade: dados.localidade,
      estado: dados.uf
    });
  }

  validate() {
    var form = document.getElementsByClassName('needs-validation')[0] as HTMLFormElement;
    if (!form.checkValidity()) {
      event!.preventDefault();
      event!.stopPropagation();
    }
    form.classList.add('was-validated');
  }

  private getLead() {
    this.service.getLead(this.id).subscribe(value => {
      this.formGroup.patchValue(value)
    })
  }

  private criaLead() {
    this.service.criaLead(this.formGroup.value).subscribe(value => {
      this.router.navigate(['/'])
      this.toastr.success('Lead criado com sucesso!')
    }, error => {
      this.toastr.error('Erro ao criar Lead, tente novamente.')
    })
  }

  excluiLead() {
    this.service.excluiLead(this.id).subscribe(value => {
      this.router.navigate(['/'])
      this.toastr.success('Lead excluído com sucesso!')
    }, error => {
      this.toastr.error('Erro ao excluir Lead, tente novamente.')
    })
  }

  private editaLead() {
    this.service.editaLead(this.id, this.formGroup.value).subscribe(value => {
      this.router.navigate(['/'])
      this.toastr.success('Lead atualizado com sucesso!')
    }, error => {
      this.toastr.error('Erro ao atualizar Lead, tente novamente.')
    })
  }

  openModalConfirmaExclusao() {
    this.displayStyle = "block";
  }

  closeModalConfirmaExclusao() {
    this.displayStyle = "none";
  }

}
