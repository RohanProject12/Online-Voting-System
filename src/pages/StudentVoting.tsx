import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Navbar } from '@/components/Navbar';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from '@/components/ui/alert-dialog';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Vote, CheckCircle } from 'lucide-react';
import { POSITIONS, CANDIDATES } from '@/lib/mockData';
import { getCurrentUser, markAsVoted } from '@/lib/auth';

export default function StudentVoting() {
  const navigate = useNavigate();
  const user = getCurrentUser();
  const [selectedCandidate, setSelectedCandidate] = useState<string | null>(null);
  const [showConfirmDialog, setShowConfirmDialog] = useState(false);
  const [votes, setVotes] = useState<Record<string, string>>({});

  // Check if user has already voted
  if (user?.hasVoted) {
    navigate('/student/confirmation');
    return null;
  }

  const handleVote = (positionId: string, candidateId: string) => {
    setVotes(prev => ({ ...prev, [positionId]: candidateId }));
  };

  const handleSubmitVotes = () => {
    markAsVoted();
    navigate('/student/confirmation');
  };

  const handleCandidateVote = (candidateId: string) => {
    setSelectedCandidate(candidateId);
    setShowConfirmDialog(true);
  };

  const confirmVote = () => {
    if (selectedCandidate) {
      const candidate = CANDIDATES.find(c => c.id === selectedCandidate);
      if (candidate) {
        handleVote(candidate.positionId, candidate.id);
      }
    }
    setShowConfirmDialog(false);
    setSelectedCandidate(null);
  };

  const totalVotes = Object.keys(votes).length;
  const totalPositions = POSITIONS.length;

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-foreground">Cast Your Vote</h1>
          <p className="text-muted-foreground mt-2">
            Choose your preferred candidate for each position
          </p>
          <div className="mt-4">
            <Badge variant="outline" className="text-sm">
              Progress: {totalVotes}/{totalPositions} positions voted
            </Badge>
          </div>
        </div>

        <div className="space-y-8">
          {POSITIONS.map(position => {
            const positionCandidates = CANDIDATES.filter(c => c.positionId === position.id);
            const selectedCandidateId = votes[position.id];
            
            return (
              <Card key={position.id} className="shadow-lg">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    {selectedCandidateId && <CheckCircle className="h-5 w-5 text-success" />}
                    {position.title}
                  </CardTitle>
                  <CardDescription>{position.description}</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                    {positionCandidates.map(candidate => (
                      <Card 
                        key={candidate.id} 
                        className={`cursor-pointer transition-all duration-300 hover:shadow-md hover:-translate-y-1 ${
                          selectedCandidateId === candidate.id 
                            ? 'ring-2 ring-primary bg-primary/5' 
                            : 'hover:bg-secondary/50'
                        }`}
                      >
                        <CardContent className="p-6 text-center">
                          <Avatar className="w-16 h-16 mx-auto mb-4">
                            <AvatarImage src={candidate.photo} alt={candidate.name} />
                            <AvatarFallback className="text-lg font-semibold bg-primary text-primary-foreground">
                              {candidate.name.split(' ').map(n => n[0]).join('')}
                            </AvatarFallback>
                          </Avatar>
                          
                          <h3 className="font-semibold text-lg mb-2">{candidate.name}</h3>
                          <Badge variant="secondary" className="mb-4">
                            {candidate.party}
                          </Badge>
                          
                          <Button
                            variant={selectedCandidateId === candidate.id ? "success" : "vote"}
                            size="sm"
                            className="w-full"
                            onClick={() => handleCandidateVote(candidate.id)}
                            disabled={selectedCandidateId === candidate.id}
                          >
                            {selectedCandidateId === candidate.id ? (
                              <>
                                <CheckCircle className="mr-2 h-4 w-4" />
                                Voted
                              </>
                            ) : (
                              <>
                                <Vote className="mr-2 h-4 w-4" />
                                Vote
                              </>
                            )}
                          </Button>
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                </CardContent>
              </Card>
            );
          })}
        </div>

        {totalVotes === totalPositions && (
          <div className="mt-8 text-center">
            <Card className="max-w-md mx-auto shadow-lg">
              <CardContent className="p-6">
                <CheckCircle className="w-12 h-12 text-success mx-auto mb-4" />
                <h3 className="text-lg font-semibold mb-2">Ready to Submit</h3>
                <p className="text-muted-foreground mb-4">
                  You have voted for all positions. Click submit to finalize your ballot.
                </p>
                <Button 
                  variant="success" 
                  size="lg" 
                  onClick={handleSubmitVotes}
                  className="w-full"
                >
                  Submit All Votes
                </Button>
              </CardContent>
            </Card>
          </div>
        )}
      </div>

      <AlertDialog open={showConfirmDialog} onOpenChange={setShowConfirmDialog}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Confirm Your Vote</AlertDialogTitle>
            <AlertDialogDescription>
              Are you sure you want to vote for{' '}
              <strong>
                {selectedCandidate && CANDIDATES.find(c => c.id === selectedCandidate)?.name}
              </strong>
              ? This action cannot be undone.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction onClick={confirmVote} className="bg-success hover:bg-success/90">
              Confirm Vote
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
}