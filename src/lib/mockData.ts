// Mock data for the voting system

export interface Candidate {
  id: string;
  name: string;
  party: string;
  photo: string;
  positionId: string;
  votes: number;
}

export interface Position {
  id: string;
  title: string;
  description: string;
  maxSelections: number;
}

export const POSITIONS: Position[] = [
  {
    id: '1',
    title: 'Student Body President',
    description: 'Lead the student government and represent student interests',
    maxSelections: 1
  },
  {
    id: '2',
    title: 'Vice President',
    description: 'Support the president and lead student initiatives',
    maxSelections: 1
  },
  {
    id: '3',
    title: 'Secretary',
    description: 'Manage communications and record keeping',
    maxSelections: 1
  }
];

export const CANDIDATES: Candidate[] = [
  {
    id: '1',
    name: 'Sarah Johnson',
    party: 'Progressive Students',
    photo: '/api/placeholder/150/150',
    positionId: '1',
    votes: 245
  },
  {
    id: '2',
    name: 'Michael Chen',
    party: 'Student Unity',
    photo: '/api/placeholder/150/150',
    positionId: '1',
    votes: 189
  },
  {
    id: '3',
    name: 'Emily Rodriguez',
    party: 'Academic Excellence',
    photo: '/api/placeholder/150/150',
    positionId: '1',
    votes: 167
  },
  {
    id: '4',
    name: 'David Park',
    party: 'Progressive Students',
    photo: '/api/placeholder/150/150',
    positionId: '2',
    votes: 198
  },
  {
    id: '5',
    name: 'Lisa Thompson',
    party: 'Student Unity',
    photo: '/api/placeholder/150/150',
    positionId: '2',
    votes: 234
  },
  {
    id: '6',
    name: 'Alex Kim',
    party: 'Progressive Students',
    photo: '/api/placeholder/150/150',
    positionId: '3',
    votes: 156
  },
  {
    id: '7',
    name: 'Rachel Green',
    party: 'Academic Excellence',
    photo: '/api/placeholder/150/150',
    positionId: '3',
    votes: 203
  }
];

export const STATS = {
  totalPositions: POSITIONS.length,
  totalCandidates: CANDIDATES.length,
  totalRegisteredVoters: 1250,
  totalVotesCast: 987
};