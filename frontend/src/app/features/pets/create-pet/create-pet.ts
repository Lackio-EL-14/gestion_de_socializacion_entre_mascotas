import { Component } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { Router } from "@angular/router";
import { PetService } from "../pet.service";

@Component({
  selector: "app-create-pet",
  templateUrl: "./create-pet.html",
})
export class CreatePetComponent {
  createPetForm: FormGroup;

  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private petService: PetService
  ) {
    this.createPetForm = this.formBuilder.group({
      name: ["", Validators.required],
      breed: ["", Validators.required],
      size: [""],
      gender: ["", Validators.required],
      age: ["", Validators.required],
      vaccineFile: [null],
      image: [null],
    });
  }

  submit() {
    if (this.createPetForm.valid) {
      const petData = this.createPetForm.value;
      this.petService.createPet(petData).subscribe(
        (response: any) => {
          console.log("Pet created successfully:", response);
          this.router.navigate(["/pets"]);
        },
        (error: any) => {
          console.error("Error creating pet:", error);
        }
      );
    }
  }
}
