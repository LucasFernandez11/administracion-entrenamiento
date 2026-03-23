import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { DataService } from '../../../core/services/data.service';

@Component({
  selector: 'app-contratos-form',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, RouterModule],
  template: `
    <div class="container" style="max-width: 600px; margin: 0 auto;">
      <h2>{{ isEdit ? 'Editar Contrato' : 'Nuevo Contrato' }}</h2>
      
      <form [formGroup]="form" (ngSubmit)="guardar()">
        <div class="form-group">
          <label>Código</label>
          <input type="text" formControlName="codigo" class="form-control" placeholder="Ej: CONT-001">
        </div>
        
        <div class="form-group">
          <label>Descripción</label>
          <input type="text" formControlName="descripcion" class="form-control" placeholder="Descripción del servicio">
        </div>

        <div class="form-group">
          <label>Fecha Inicio</label>
          <input type="date" formControlName="fechaInicio" class="form-control">
        </div>

        <div class="form-group">
          <label>Estado</label>
          <select formControlName="estado" class="form-control">
            <option value="Activo">Activo</option>
            <option value="Pendiente">Pendiente</option>
            <option value="Finalizado">Finalizado</option>
          </select>
        </div>

        <div style="margin-top: 2rem; display: flex; gap: 1rem;">
          <button type="submit" class="btn btn-primary" [disabled]="form.invalid">Guardar</button>
          <a routerLink="/contratos" class="btn btn-secondary">Cancelar</a>
        </div>
      </form>
    </div>
  `
})
export class ContratosFormComponent implements OnInit {
  private fb = inject(FormBuilder);
  private dataService = inject(DataService);
  private router = inject(Router);
  private route = inject(ActivatedRoute);

  form: FormGroup;
  isEdit = false;
  id: number | null = null;

  constructor() {
    this.form = this.fb.group({
      codigo: ['', Validators.required],
      descripcion: ['', Validators.required],
      fechaInicio: ['', Validators.required],
      estado: ['Pendiente', Validators.required]
    });
  }

  ngOnInit() {
    this.id = Number(this.route.snapshot.paramMap.get('id'));
    if (this.id) {
      this.isEdit = true;
      this.dataService.getById<any>('contratos', this.id).subscribe(data => {
        if (data) this.form.patchValue(data);
      });
    }
  }

  guardar() {
    if (this.form.invalid) return;

    if (this.isEdit && this.id) {
      this.dataService.update('contratos', this.id, this.form.value).subscribe(() => {
        this.router.navigate(['/contratos']);
      });
    } else {
      // BUG EDUCATIVO: Creamos pero no confirmamos o hacemos algo raro?
      // En realidad el bug esta en el listado q usa OnPush o no recarga, o navegamos demasiado rapido.
      // O quizás simplemente volvemos y el listado no hace la llamada getAll en ngOnInit. (Pero lo pusimos en ngOnInit antes).
      // Otro bug: no nos suscribimos al final o olvidamos subscribirnos.
      this.dataService.create('contratos', this.form.value).subscribe(() => {
        this.router.navigate(['/contratos']);
      });
    }
  }
}
