import { Navbar } from '@/components/Navbar';
import { StatsCard } from '@/components/StatsCard';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { Users, UserCheck, Vote, Trophy } from 'lucide-react';
import { STATS, CANDIDATES, POSITIONS } from '@/lib/mockData';

export default function AdminDashboard() {
  // Prepare chart data
  const chartData = POSITIONS.map(position => {
    const positionCandidates = CANDIDATES.filter(c => c.positionId === position.id);
    return {
      position: position.title,
      ...positionCandidates.reduce((acc, candidate) => {
        acc[candidate.name] = candidate.votes;
        return acc;
      }, {} as Record<string, number>)
    };
  });

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-foreground">Admin Dashboard</h1>
          <p className="text-muted-foreground mt-2">
            Monitor voting progress and results in real-time
          </p>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <StatsCard
            title="Total Positions"
            value={STATS.totalPositions}
            description="Available positions"
            icon={<Trophy className="h-5 w-5" />}
          />
          <StatsCard
            title="Total Candidates"
            value={STATS.totalCandidates}
            description="Running for election"
            icon={<Users className="h-5 w-5" />}
          />
          <StatsCard
            title="Registered Voters"
            value={STATS.totalRegisteredVoters.toLocaleString()}
            description="Eligible to vote"
            icon={<UserCheck className="h-5 w-5" />}
          />
          <StatsCard
            title="Votes Cast"
            value={STATS.totalVotesCast.toLocaleString()}
            description={`${Math.round((STATS.totalVotesCast / STATS.totalRegisteredVoters) * 100)}% turnout`}
            icon={<Vote className="h-5 w-5" />}
          />
        </div>

        {/* Charts Section */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <Card className="shadow-lg">
            <CardHeader>
              <CardTitle>Vote Distribution by Position</CardTitle>
              <CardDescription>
                Real-time vote counts for all candidates
              </CardDescription>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={400}>
                <BarChart data={chartData} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
                  <CartesianGrid strokeDasharray="3 3" className="opacity-30" />
                  <XAxis 
                    dataKey="position" 
                    tick={{ fontSize: 12 }}
                    interval={0}
                    angle={-45}
                    textAnchor="end"
                    height={80}
                  />
                  <YAxis />
                  <Tooltip 
                    contentStyle={{ 
                      backgroundColor: 'hsl(var(--card))',
                      border: '1px solid hsl(var(--border))',
                      borderRadius: '8px'
                    }}
                  />
                  {CANDIDATES.map((candidate, index) => (
                    <Bar 
                      key={candidate.id}
                      dataKey={candidate.name} 
                      fill={`hsl(217, 91%, ${35 + (index * 10)}%)`}
                      radius={[2, 2, 0, 0]}
                    />
                  ))}
                </BarChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>

          <Card className="shadow-lg">
            <CardHeader>
              <CardTitle>Leading Candidates</CardTitle>
              <CardDescription>
                Current front-runners by position
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {POSITIONS.map(position => {
                  const positionCandidates = CANDIDATES
                    .filter(c => c.positionId === position.id)
                    .sort((a, b) => b.votes - a.votes);
                  const leader = positionCandidates[0];
                  
                  return (
                    <div key={position.id} className="border-l-4 border-primary pl-4 py-2">
                      <h4 className="font-semibold text-foreground">{position.title}</h4>
                      <p className="text-sm text-muted-foreground mb-2">{position.description}</p>
                      {leader && (
                        <div className="flex items-center justify-between">
                          <span className="text-sm font-medium">{leader.name}</span>
                          <span className="text-sm bg-primary/10 text-primary px-2 py-1 rounded">
                            {leader.votes} votes
                          </span>
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}