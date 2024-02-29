import {Component, OnInit} from '@angular/core';
import {Tournament} from "../../models/Tournament";
import {TournamentService} from "../../services/tournament.service";
import {AuthService} from "../../services/auth.service";

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.css']
})
export class ListComponent implements OnInit{
  tournaments: Tournament[] = [];

  constructor(private _tournamentService: TournamentService, public _authService: AuthService) {
  }

  ngOnInit(): void {
    this.loadTournaments();
  }

  loadTournaments() {
    this._tournamentService.getLatestTournaments().subscribe(
      (tournaments: Tournament[]) => {
        this.tournaments = tournaments;
      },
      (error) => {
        console.error('Error loading tournaments:', error);
      }
    );
  }

  onDelete(id:number){
    this._tournamentService.deleteTournament(id).subscribe(()=>{
      console.log('Tournament deleted successfully');
      this.tournaments = this.tournaments.filter(tournament => tournament.id !== id);
      this.loadTournaments();
    }, error => {
      console.error('Error deleting tournament:', error);
    });
  }
}
