import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { DataService } from '../../../core/services/data.service';

@Component({
  selector: 'app-contratistas-form',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, RouterModule],
  template: `
    <div class="container" style="max-width: 600px; margin: 0 auto;">
      <h2>{{ isEdit ? 'Editar Contratista' : 'Nuevo Contratista' }}</h2>
      
      <form [formGroup]="form" (ngSubmit)="guardar()">
        <div class="form-group">
          <label>Razón Social (Nombre)</label>
          <input type="text" formControlName="nombre" class="form-control">
        </div>
        
        <div class="form-group">
          <label>CUIT</label>
          <input type="text" formControlName="cuit" class="form-control" placeholder="XX-XXXXXXXX-X">
        </div>

        <fieldset formGroupName="contacto" style="border: 1px solid #e5e7eb; padding: 1rem; border-radius: 8px; margin-bottom: 1rem;">
          <legend style="padding: 0 0.5rem; color: #6b7280; font-size: 0.9rem;">Datos de Contacto</legend>
          <div class="form-group">
            <label>Nombre del Contacto</label>
            <input type="text" formControlName="nombre" class="form-control">
          </div>
          <div class="form-group">
            <label>Teléfono</label>
            <input type="text" formControlName="telefono" class="form-control">
          </div>
        </fieldset>

        <div style="margin-top: 2rem; display: flex; gap: 1rem;">
          <button type="submit" class="btn btn-primary" [disabled]="form.invalid">Guardar</button>
          <a routerLink="/contratistas" class="btn btn-secondary">Cancelar</a>
        </div>
      </form>
    </div>
  `
})
export class ContratistasFormComponent implements OnInit {
  private fb = inject(FormBuilder);
  private dataService = inject(DataService);
  private router = inject(Router);
  private route = inject(ActivatedRoute);

  form: FormGroup;
  isEdit = false;
  id: number | null = null;

  constructor() {
    this.form = this.fb.group({
      nombre: ['', Validators.required],
      cuit: ['', Validators.required],
      contacto: this.fb.group({
        nombre: ['', Validators.required],
        telefono: ['', Validators.required]
      })
    });
  }

  ngOnInit() {
    this.id = Number(this.route.snapshot.paramMap.get('id'));
    if (this.id) {
      this.isEdit = true;
      this.dataService.getById<any>('contratistas', this.id).subscribe(data => {
        if (data) this.form.patchValue(data);
      });
    }
  }

  guardar() {
    if (this.form.invalid) return;
    if (this.isEdit && this.id) {
      this.dataService.update('contratistas', this.id, this.form.value).subscribe(() => {
        this.router.navigate(['/contratistas']);
      });
    } else {
      // BUG EDUCATIVO: Retornamos a la lista, pero NO nos suscribimos.
      // La creación NO se realizará en el servicio!!
      // Estudiante deberá notar que falta el .subscribe()
      this.dataService.create('contratistas', this.form.value);
      this.router.navigate(['/contratistas']);
    }
  }
}
