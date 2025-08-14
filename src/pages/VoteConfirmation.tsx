import { Navbar } from '@/components/Navbar';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { CheckCircle, TrendingUp } from 'lucide-react';
import { CANDIDATES, POSITIONS } from '@/lib/mockData';

export default function VoteConfirmation() {
  // Prepare chart data for public results
  const publicResults = POSITIONS.map(position => {
    const positionCandidates = CANDIDATES.filter(c => c.positionId === position.id);
    const totalVotes = positionCandidates.reduce((sum, c) => sum + c.votes, 0);
    
    return {
      position: position.title,
      candidates: positionCandidates.map(candidate => ({
        name: candidate.name,
        votes: candidate.votes,
        percentage: Math.round((candidate.votes / totalVotes) * 100)
      }))
    };
  });

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Thank You Section */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center justify-center w-20 h-20 bg-success/10 rounded-full mb-6">
            <CheckCircle className="w-10 h-10 text-success" />
          </div>
          <h1 className="text-4xl font-bold text-foreground mb-4">
            Thank You for Voting!
          </h1>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Your vote has been successfully recorded and will help shape the future of our student body.
          </p>
          <Badge variant="outline" className="mt-4 text-lg px-4 py-2">
            Vote Submitted Successfully
          </Badge>
        </div>

        {/* Public Results Section */}
        <Card className="shadow-xl">
          <CardHeader className="text-center">
            <CardTitle className="flex items-center justify-center gap-2 text-2xl">
              <TrendingUp className="h-6 w-6" />
              Live Election Results
            </CardTitle>
            <CardDescription className="text-lg">
              Real-time voting progress and candidate standings
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-8">
              {publicResults.map(result => (
                <div key={result.position} className="space-y-4">
                  <h3 className="text-xl font-semibold text-foreground border-b border-border pb-2">
                    {result.position}
                  </h3>
                  
                  <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                    {/* Candidate Rankings */}
                    <div className="space-y-3">
                      {result.candidates
                        .sort((a, b) => b.votes - a.votes)
                        .map((candidate, index) => (
                        <div 
                          key={candidate.name}
                          className={`flex items-center justify-between p-4 rounded-lg transition-all duration-300 ${
                            index === 0 
                              ? 'bg-primary/10 border-2 border-primary/20' 
                              : 'bg-secondary/50'
                          }`}
                        >
                          <div className="flex items-center gap-3">
                            <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold ${
                              index === 0 
                                ? 'bg-primary text-primary-foreground' 
                                : 'bg-muted text-muted-foreground'
                            }`}>
                              {index + 1}
                            </div>
                            <div>
                              <p className="font-medium">{candidate.name}</p>
                              <p className="text-sm text-muted-foreground">{candidate.votes} votes</p>
                            </div>
                          </div>
                          <Badge 
                            variant={index === 0 ? "default" : "secondary"}
                            className="text-sm"
                          >
                            {candidate.percentage}%
                          </Badge>
                        </div>
                      ))}
                    </div>

                    {/* Vote Distribution Chart */}
                    <div className="bg-card rounded-lg p-4">
                      <ResponsiveContainer width="100%" height={200}>
                        <BarChart 
                          data={result.candidates.sort((a, b) => b.votes - a.votes)}
                          margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
                        >
                          <CartesianGrid strokeDasharray="3 3" className="opacity-30" />
                          <XAxis 
                            dataKey="name" 
                            tick={{ fontSize: 12 }}
                            interval={0}
                            angle={-45}
                            textAnchor="end"
                            height={60}
                          />
                          <YAxis />
                          <Tooltip 
                            contentStyle={{ 
                              backgroundColor: 'hsl(var(--card))',
                              border: '1px solid hsl(var(--border))',
                              borderRadius: '8px'
                            }}
                            formatter={(value) => [`${value} votes`, 'Votes']}
                          />
                          <Bar 
                            dataKey="votes" 
                            fill="hsl(var(--primary))"
                            radius={[4, 4, 0, 0]}
                          />
                        </BarChart>
                      </ResponsiveContainer>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Information Footer */}
        <div className="mt-8 text-center text-muted-foreground">
          <p className="text-sm">
            Results are updated in real-time as votes are cast. 
            Final results will be announced after the voting period ends.
          </p>
        </div>
      </div>
    </div>
  );
}