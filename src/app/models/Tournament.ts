export interface Tournament {
  id: number;
  name: string;
  location: string;
  nbOfRegisteredPlayers: number;
  minPlayers: number;
  maxPlayers: number;
  minElo: number;
  maxElo: number;
  category: string;
  status: string;
  currentRound: number;
  registrationEndDate: Date;
  participants: Participant[];
}

interface Participant {
  username: string;
  email: string;
}
