import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { DataService } from '../../../core/services/data.service';
import { Contratista } from '../../../core/models/entidades';

@Component({
  selector: 'app-transporte-form',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, RouterModule],
  template: `
    <div class="container" style="max-width: 600px; margin: 0 auto;">
      <h2>{{ isEdit ? 'Editar Transporte' : 'Nuevo Transporte' }}</h2>
      
      <form [formGroup]="form" (ngSubmit)="guardar()">
        <div class="form-group">
          <label>Patente</label>
          <input type="text" formControlName="patente" class="form-control" placeholder="ABC 123">
        </div>
        
        <div class="form-group">
          <label>Tipo</label>
          <input type="text" formControlName="tipo" class="form-control" placeholder="Ej: Camioneta, Camión">
        </div>

        <div class="form-group">
          <label>Capacidad</label>
          <input type="text" formControlName="capacidad" class="form-control" placeholder="Ej: 1000kg">
        </div>

        <div class="form-group">
          <label>Contratista</label>
          <select formControlName="contratistaId" class="form-control">
            <option value="">Seleccione Contratista</option>
            <option *ngFor="let c of contratistas" [value]="c.id">{{ c.nombre }}</option>
          </select>
        </div>

        <div style="margin-top: 2rem; display: flex; gap: 1rem;">
          <button type="submit" class="btn btn-primary" [disabled]="form.invalid">Guardar</button>
          <a routerLink="/transporte" class="btn btn-secondary">Cancelar</a>
        </div>
      </form>
    </div>
  `
})
export class TransporteFormComponent implements OnInit {
  private fb = inject(FormBuilder);
  private dataService = inject(DataService);
  private router = inject(Router);
  private route = inject(ActivatedRoute);

  form: FormGroup;
  isEdit = false;
  id: number | null = null;
  contratistas: Contratista[] = [];

  constructor() {
    this.form = this.fb.group({
      patente: ['', Validators.required],
      tipo: ['', Validators.required],
      capacidad: ['', Validators.required],
      contratistaId: ['', Validators.required]
    });
  }

  ngOnInit() {
    this.dataService.getAll<Contratista>('contratistas').subscribe(c => this.contratistas = c);

    this.id = Number(this.route.snapshot.paramMap.get('id'));
    if (this.id) {
      this.isEdit = true;
      this.dataService.getById<any>('transporte', this.id).subscribe(data => {
        if (data) this.form.patchValue(data);
      });
    }
  }

  guardar() {
    if (this.form.invalid) return;
    
    const payload = { ...this.form.value, contratistaId: Number(this.form.value.contratistaId) };

    if (this.isEdit && this.id) {
      this.dataService.update('transporte', this.id, payload).subscribe(() => {
        this.router.navigate(['/transporte']);
      });
    } else {
      this.dataService.create('transporte', payload).subscribe(() => {
        this.router.navigate(['/transporte']);
      });
    }
  }
}
