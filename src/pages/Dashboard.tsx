import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import { Layout } from '@/components/layout/Layout';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Briefcase, Users, MessageSquare, FileText, Plus, ArrowRight } from 'lucide-react';
import { Badge } from '@/components/ui/skill-badge';

export default function Dashboard() {
  const { user, profile, loading } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (!loading && !user) {
      navigate('/auth');
    }
  }, [user, loading, navigate]);

  if (loading) {
    return (
      <Layout>
        <div className="min-h-[60vh] flex items-center justify-center">
          <div className="animate-pulse text-muted-foreground">Loading...</div>
        </div>
      </Layout>
    );
  }

  if (!profile) return null;

  const isNGO = profile.role === 'ngo';

  return (
    <Layout>
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-display font-bold mb-2">
            Welcome back, {profile.name}!
          </h1>
          <p className="text-muted-foreground capitalize">
            {isNGO ? 'NGO Dashboard' : 'Volunteer Dashboard'}
          </p>
        </div>

        {/* Quick Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
          {isNGO ? (
            <>
              <Card><CardContent className="pt-6"><div className="text-3xl font-bold text-primary">0</div><p className="text-sm text-muted-foreground">Opportunities</p></CardContent></Card>
              <Card><CardContent className="pt-6"><div className="text-3xl font-bold text-secondary">0</div><p className="text-sm text-muted-foreground">Applications</p></CardContent></Card>
              <Card><CardContent className="pt-6"><div className="text-3xl font-bold text-success">0</div><p className="text-sm text-muted-foreground">Active Volunteers</p></CardContent></Card>
              <Card><CardContent className="pt-6"><div className="text-3xl font-bold text-warning">0</div><p className="text-sm text-muted-foreground">Pending</p></CardContent></Card>
            </>
          ) : (
            <>
              <Card><CardContent className="pt-6"><div className="text-3xl font-bold text-primary">0</div><p className="text-sm text-muted-foreground">Applications</p></CardContent></Card>
              <Card><CardContent className="pt-6"><div className="text-3xl font-bold text-success">0</div><p className="text-sm text-muted-foreground">Accepted</p></CardContent></Card>
              <Card><CardContent className="pt-6"><div className="text-3xl font-bold text-warning">0</div><p className="text-sm text-muted-foreground">Pending</p></CardContent></Card>
              <Card><CardContent className="pt-6"><div className="text-3xl font-bold text-info">{profile.skills?.length || 0}</div><p className="text-sm text-muted-foreground">Skills</p></CardContent></Card>
            </>
          )}
        </div>

        <div className="grid md:grid-cols-3 gap-6">
          {/* Main Content */}
          <div className="md:col-span-2 space-y-6">
            {/* Quick Actions */}
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Quick Actions</CardTitle>
              </CardHeader>
              <CardContent className="flex flex-wrap gap-3">
                {isNGO ? (
                  <>
                    <Button onClick={() => navigate('/opportunities/create')}><Plus className="w-4 h-4" />Create Opportunity</Button>
                    <Button variant="outline" onClick={() => navigate('/messages')}><MessageSquare className="w-4 h-4" />View Messages</Button>
                  </>
                ) : (
                  <>
                    <Button onClick={() => navigate('/opportunities')}><Briefcase className="w-4 h-4" />Browse Opportunities</Button>
                    <Button variant="outline" onClick={() => navigate('/profile')}><Users className="w-4 h-4" />Update Profile</Button>
                  </>
                )}
              </CardContent>
            </Card>

            {/* Activity */}
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Recent Activity</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-center py-8 text-muted-foreground">
                  <FileText className="w-12 h-12 mx-auto mb-3 opacity-50" />
                  <p>No recent activity yet</p>
                  <Button variant="link" onClick={() => navigate('/opportunities')}>
                    Browse opportunities to get started <ArrowRight className="w-4 h-4" />
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Profile Card */}
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Your Profile</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <p className="text-sm text-muted-foreground mb-2">Skills</p>
                  {profile.skills && profile.skills.length > 0 ? (
                    <div className="flex flex-wrap gap-2">
                      {profile.skills.map((skill, i) => (
                        <Badge key={i} variant="skill">{skill}</Badge>
                      ))}
                    </div>
                  ) : (
                    <p className="text-sm text-muted-foreground">No skills added yet</p>
                  )}
                </div>
                <Button variant="outline" className="w-full" onClick={() => navigate('/profile')}>
                  Edit Profile
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </Layout>
  );
}
