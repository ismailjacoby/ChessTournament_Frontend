import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { TournamentService } from "../../services/tournament.service";

@Component({
  selector: 'app-create',
  templateUrl: './create.component.html',
  styleUrls: ['./create.component.css']
})
export class CreateComponent {
  form!: FormGroup;
  successMessage: string | null = null;
  errorMessage: string | null = null;

  constructor(private _formBuilder: FormBuilder, private _tournamentService: TournamentService) {
    this.form = _formBuilder.group({
      name: _formBuilder.control('', Validators.required),
      location: _formBuilder.control('', Validators.required),
      minPlayers: _formBuilder.control('', Validators.required),
      maxPlayers: _formBuilder.control('', Validators.required),
      minElo: _formBuilder.control('', Validators.required),
      maxElo: _formBuilder.control('', Validators.required),
      category: _formBuilder.control('', Validators.required),
      status: _formBuilder.control('', Validators.required),
      currentRound: _formBuilder.control(0, Validators.required),
      womenOnly: _formBuilder.control(''),
      registrationEndDate: _formBuilder.control('', Validators.required)
    })
  };

  createTournament() {
    this._tournamentService.createTournament(this.form.value).subscribe(
      () => {
        console.log('Tournament created successfully!');
        this.successMessage = 'Tournament created successfully!';
        this.errorMessage = null;
        this.resetForm();
      },
      (error) => {
        console.error('Error creating tournament:', error);
        this.errorMessage = 'Error creating tournament';
        this.successMessage = null;
      }
    );
  }

  resetForm() {
    this.form.reset();
  }
}
