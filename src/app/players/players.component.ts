import { Component } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {PlayerService} from "../services/player.service";
import {isInThePast} from "../validators/FormValidator";

export interface Player{
  username: string;
  email: string;
  dateOfBirth: Date;
  gender: "MALE" | "FEMALE" | "OTHER";
  elo: number;
}

@Component({
  selector: 'app-players',
  templateUrl: './players.component.html',
  styleUrl: './players.component.css'
})
export class PlayersComponent {
  form!: FormGroup;
  successMessage: string | null = null;
  errorMessage: string | null = null;

  constructor(private _formBuilder: FormBuilder, private _playerService: PlayerService) {
    this.form = _formBuilder.group({
      username: _formBuilder.control('',Validators.required),
      email: _formBuilder.control('',Validators.email),
      dateOfBirth: _formBuilder.control('',[Validators.required, isInThePast()]),
      gender: _formBuilder.control('', Validators.required),
      elo: _formBuilder.control('')
    })
  };


  createPlayer(){
    const player: Player = {
      username: this.form.get('username')!.value,
      email: this.form.get('email')!.value,
      dateOfBirth: this.form.get('dateOfBirth')!.value,
      gender: this.form.get('gender')!.value,
      elo: this.form.get('elo')!.value
    }

    this._playerService.registerPlayer(player).subscribe(
      () => {
        console.log('Player registered successfully!');
        this.successMessage = 'Player registered successfully!';
        this.errorMessage = null;
        this.resetForm();
      },
      (error) => {
        console.log('Error registering player: ', error);
        this.errorMessage = 'Error registering player';
        this.successMessage = null;
      }
    );
  }

  resetForm(){
    this.form.reset();
  }
}
