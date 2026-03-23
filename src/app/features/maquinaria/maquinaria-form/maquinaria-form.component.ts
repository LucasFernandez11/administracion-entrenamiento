import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { DataService } from '../../../core/services/data.service';
import { Contratista } from '../../../core/models/entidades';

@Component({
  selector: 'app-maquinaria-form',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, RouterModule],
  template: `
    <div class="container" style="max-width: 600px; margin: 0 auto;">
      <h2>{{ isEdit ? 'Editar Maquinaria' : 'Nueva Maquinaria' }}</h2>
      
      <form [formGroup]="form" (ngSubmit)="guardar()">
        <div class="form-group">
          <label>Equipo (Tipo)</label>
          <input type="text" formControlName="equipo" class="form-control" placeholder="Ej: Grúa, Retroexcavadora">
        </div>
        
        <div class="form-group">
          <label>Modelo</label>
          <input type="text" formControlName="modelo" class="form-control">
        </div>

        <div class="form-group">
          <label>Horas de Uso</label>
          <input type="number" formControlName="horasUso" class="form-control">
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
          <a routerLink="/maquinaria" class="btn btn-secondary">Cancelar</a>
        </div>
      </form>
    </div>
  `
})
export class MaquinariaFormComponent implements OnInit {
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
      equipo: ['', Validators.required],
      modelo: ['', Validators.required],
      horasUso: [0, Validators.required],
      contratistaId: ['', Validators.required]
    });
  }

  ngOnInit() {
    this.dataService.getAll<Contratista>('contratistas').subscribe(c => this.contratistas = c);

    this.id = Number(this.route.snapshot.paramMap.get('id'));
    if (this.id) {
      this.isEdit = true;
      this.dataService.getById<any>('maquinaria', this.id).subscribe(data => {
        // Bug educativo: si editamos algo que vino con el modelo bugeado, se guardará mal si el input agarra el dato bugeado.
        // Ojo: en la lista se distorsiona pero en getById() no (mirar servicio).
        if (data) this.form.patchValue(data);
      });
    }
  }

  guardar() {
    if (this.form.invalid) return;
    
    const payload = { ...this.form.value, contratistaId: Number(this.form.value.contratistaId) };

    if (this.isEdit && this.id) {
      this.dataService.update('maquinaria', this.id, payload).subscribe(() => {
        this.router.navigate(['/maquinaria']);
      });
    } else {
      this.dataService.create('maquinaria', payload).subscribe(() => {
        this.router.navigate(['/maquinaria']);
      });
    }
  }
}
