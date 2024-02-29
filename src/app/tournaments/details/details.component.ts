import {Component, OnInit} from '@angular/core';
import {AuthService} from "../../services/auth.service";
import {Tournament} from "../../models/Tournament";
import {ActivatedRoute} from "@angular/router";
import {TournamentService} from "../../services/tournament.service";
import {error} from "@angular/compiler-cli/src/transformers/util";
import {HttpParams} from "@angular/common/http";

@Component({
  selector: 'app-details',
  templateUrl: './details.component.html',
  styleUrl: './details.component.css'
})
export class DetailsComponent implements OnInit{
  tournament!: Tournament;
  protected registerErrorMessage!: string;
  protected registerSuccessMessage!: string;
  constructor(
    private route: ActivatedRoute,
    protected _authservice: AuthService,
    private _tournamentService: TournamentService) {
  }

  ngOnInit(): void {
    this.route.paramMap.subscribe(params =>{
      const tournamentId = Number(params.get('id'));
      this._tournamentService.getTournamentById(tournamentId).subscribe(
        (tournament: Tournament) => {
          console.log(tournament)
          this.tournament = tournament;
        }, error => [
          console.error('Error loading tournament details:', error)
        ]
      )
    })
  }


  registerToTournament() {
    const username: string = this._authservice.connectedUser.value?.username || '';
    const tournamentId = this.tournament.id;

    if (!username || !tournamentId) {
      console.error('Username or Tournament ID are not valid');
      return;
    }

    const params = new HttpParams().set('id', tournamentId.toString()).set('username', username);

    this._tournamentService.registerTournament(params).subscribe(
      () => {
        console.log('Registered successfully for the tournament.');
        this.registerErrorMessage = '';
        this.registerSuccessMessage = 'Registered successfully for the tournament.';
      },
      error => {
        console.error('Error registering for the tournament:', error);
        this.registerSuccessMessage = '';
        this.registerErrorMessage = 'Error registering for the tournament: ' + error.error;
      }
    );
  }

  unregisterFromTournament() {
    const username: string = this._authservice.connectedUser.value?.username || '';
    const tournamentId = this.tournament.id;

    if (!username || !tournamentId) {
      console.error('Username or Tournament ID are not valid');
      return;
    }

    const params = new HttpParams().set('id', tournamentId.toString()).set('username', username);

    this._tournamentService.unregisterTournament(params).subscribe(
      () => {
        this.registerErrorMessage = '';
        this.registerSuccessMessage = 'Successfully unregistered from the tournament.';
      },
      error => {
        this.registerSuccessMessage = '';
        this.registerErrorMessage = 'Error unregistering from the tournament: ' + error.error;
      }
    );
  }
}
