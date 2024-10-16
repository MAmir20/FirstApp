import { Component, Inject } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Evenement } from 'src/models/Evenement';
import { EvenementService } from 'src/services/evenement.service';

@Component({
  selector: 'app-modal',
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.css'],
})
export class ModalComponent {
  id: string;
  //forcage de type pour le dialog
  constructor(
    private ES: EvenementService,
    public dialogRef: MatDialogRef<ModalComponent>,
    @Inject(MAT_DIALOG_DATA) data: any
  ) {
    this.id=data.id;
    console.log(this.id);
    if(!!this.id){
      this.ES.getEvenementById(this.id).subscribe((evt) => {
        this.initForm1(evt);
      });
    }
    else{
      this.initForm();
    }
  }
  form!: FormGroup;
  // ngOnInit(): void {
  //   this.initForm();
  // }
  initForm() {
    //creation d'une nouvelle instance de Form et initialisation des attributs
    this.form = new FormGroup({
      title: new FormControl(null, Validators.required),
      dateDebut: new FormControl(null, Validators.required),
      dateFin: new FormControl(null, Validators.required),
      lieu: new FormControl(null, Validators.required),
    });
  }

  initForm1(e:Evenement) {
    //creation d'une nouvelle instance de Form et initialisation des attributs
    this.form = new FormGroup({
      title: new FormControl(e.title, Validators.required),
      dateDebut: new FormControl(e.dateDebut, Validators.required),
      dateFin: new FormControl(e.dateFin, Validators.required),
      lieu: new FormControl(e.lieu, Validators.required),
    });
  }

  save() {
    this.dialogRef.close(this.form.value);
  }

  close() {
    this.dialogRef.close();
  }
}
