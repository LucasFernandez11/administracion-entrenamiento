import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { DataService } from '../../../core/services/data.service';
import { Contratista } from '../../../core/models/entidades';

@Component({
  selector: 'app-personal-form',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, RouterModule],
  template: `
    <div class="container" style="max-width: 600px; margin: 0 auto;">
      <h2>{{ isEdit ? 'Editar Personal' : 'Nuevo Personal' }}</h2>
      
      <form [formGroup]="form" (ngSubmit)="guardar()">
        <div class="form-group">
          <label>Nombre Completo</label>
          <input type="text" formControlName="nombreCompleto" class="form-control">
        </div>
        
        <div class="form-group">
          <label>DNI</label>
          <input type="text" formControlName="dni" class="form-control">
        </div>

        <div class="form-group">
          <label>Rol</label>
          <input type="text" formControlName="rol" class="form-control" placeholder="Ej: Chofer, Operario">
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
          <a routerLink="/personal" class="btn btn-secondary">Cancelar</a>
        </div>
      </form>
    </div>
  `
})
export class PersonalFormComponent implements OnInit {
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
      nombreCompleto: ['', Validators.required],
      dni: ['', Validators.required],
      rol: ['', Validators.required],
      // Forzamos guardarlo como numérico
      contratistaId: ['', Validators.required]
    });
  }

  ngOnInit() {
    this.dataService.getAll<Contratista>('contratistas').subscribe(c => this.contratistas = c);

    this.id = Number(this.route.snapshot.paramMap.get('id'));
    if (this.id) {
      this.isEdit = true;
      this.dataService.getById<any>('personal', this.id).subscribe(data => {
        if (data) this.form.patchValue(data);
      });
    }
  }

  guardar() {
    if (this.form.invalid) return;
    
    // Parseamos a numero para evitar bugs con el === despues (aunque dejaremos otro bug)
    const payload = { ...this.form.value, contratistaId: Number(this.form.value.contratistaId) };

    if (this.isEdit && this.id) {
      this.dataService.update('personal', this.id, payload).subscribe(() => {
        this.router.navigate(['/personal']);
      });
    } else {
      this.dataService.create('personal', payload).subscribe(() => {
        this.router.navigate(['/personal']);
      });
    }
  }
}
