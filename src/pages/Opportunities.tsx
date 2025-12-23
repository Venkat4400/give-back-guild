import { useState, useEffect } from 'react';
import { Search, Filter, MapPin, X } from 'lucide-react';
import { Layout } from '@/components/layout/Layout';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { OpportunityCard } from '@/components/opportunities/OpportunityCard';
import { supabase } from '@/integrations/supabase/client';
import { Badge } from '@/components/ui/skill-badge';

interface Opportunity {
  id: string;
  title: string;
  description: string | null;
  required_skills: string[];
  duration: string | null;
  location: string | null;
  status: 'open' | 'closed';
  created_at: string;
  ngo_id: string;
  profiles?: { name: string; organization_name: string | null };
}

export default function Opportunities() {
  const [opportunities, setOpportunities] = useState<Opportunity[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedSkills, setSelectedSkills] = useState<string[]>([]);
  const [selectedLocation, setSelectedLocation] = useState('');

  const allSkills = ['Web Development', 'Design', 'Marketing', 'Translation', 'Event Planning', 'Writing', 'Teaching'];

  useEffect(() => {
    fetchOpportunities();
  }, []);

  const fetchOpportunities = async () => {
    const { data, error } = await supabase
      .from('opportunities')
      .select('*, profiles(name, organization_name)')
      .eq('status', 'open')
      .order('created_at', { ascending: false });

    if (!error && data) {
      setOpportunities(data as Opportunity[]);
    }
    setLoading(false);
  };

  const filteredOpportunities = opportunities.filter((opp) => {
    const matchesSearch = opp.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      opp.description?.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesSkills = selectedSkills.length === 0 ||
      selectedSkills.some((skill) => opp.required_skills.includes(skill));
    const matchesLocation = !selectedLocation ||
      opp.location?.toLowerCase().includes(selectedLocation.toLowerCase());
    return matchesSearch && matchesSkills && matchesLocation;
  });

  const toggleSkill = (skill: string) => {
    setSelectedSkills((prev) =>
      prev.includes(skill) ? prev.filter((s) => s !== skill) : [...prev, skill]
    );
  };

  const clearFilters = () => {
    setSearchTerm('');
    setSelectedSkills([]);
    setSelectedLocation('');
  };

  return (
    <Layout>
      <div className="bg-gradient-hero py-16">
        <div className="container mx-auto px-4">
          <h1 className="text-3xl md:text-4xl font-display font-bold text-primary-foreground mb-4">
            Volunteering Opportunities
          </h1>
          <p className="text-primary-foreground/80 text-lg">
            Find opportunities that match your skills and interests
          </p>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8">
        <div className="grid lg:grid-cols-4 gap-8">
          {/* Filters Sidebar */}
          <div className="lg:col-span-1 space-y-6">
            <div className="p-6 bg-card rounded-xl border border-border">
              <div className="flex items-center justify-between mb-4">
                <h3 className="font-semibold flex items-center gap-2">
                  <Filter className="w-4 h-4" /> Filters
                </h3>
                {(selectedSkills.length > 0 || selectedLocation) && (
                  <Button variant="ghost" size="sm" onClick={clearFilters}>Clear</Button>
                )}
              </div>

              {/* Search */}
              <div className="relative mb-6">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                <Input
                  placeholder="Search opportunities..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10"
                />
              </div>

              {/* Skills */}
              <div className="mb-6">
                <label className="text-sm font-medium mb-3 block">Skills</label>
                <div className="flex flex-wrap gap-2">
                  {allSkills.map((skill) => (
                    <button
                      key={skill}
                      onClick={() => toggleSkill(skill)}
                      className={`px-3 py-1.5 text-xs rounded-full border transition-all ${
                        selectedSkills.includes(skill)
                          ? 'bg-primary text-primary-foreground border-primary'
                          : 'bg-background border-border hover:border-primary/50'
                      }`}
                    >
                      {skill}
                    </button>
                  ))}
                </div>
              </div>

              {/* Location */}
              <div>
                <label className="text-sm font-medium mb-3 block">Location</label>
                <div className="relative">
                  <MapPin className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                  <Input
                    placeholder="City or Remote"
                    value={selectedLocation}
                    onChange={(e) => setSelectedLocation(e.target.value)}
                    className="pl-10"
                  />
                </div>
              </div>
            </div>
          </div>

          {/* Results */}
          <div className="lg:col-span-3">
            {/* Active Filters */}
            {selectedSkills.length > 0 && (
              <div className="flex flex-wrap gap-2 mb-6">
                {selectedSkills.map((skill) => (
                  <Badge key={skill} variant="default" className="cursor-pointer" onClick={() => toggleSkill(skill)}>
                    {skill} <X className="w-3 h-3 ml-1" />
                  </Badge>
                ))}
              </div>
            )}

            {loading ? (
              <div className="text-center py-12 text-muted-foreground">Loading opportunities...</div>
            ) : filteredOpportunities.length > 0 ? (
              <div className="grid md:grid-cols-2 gap-6">
                {filteredOpportunities.map((opp) => (
                  <OpportunityCard
                    key={opp.id}
                    {...opp}
                    ngo_name={opp.profiles?.organization_name || opp.profiles?.name}
                  />
                ))}
              </div>
            ) : (
              <div className="text-center py-16">
                <p className="text-muted-foreground mb-4">No opportunities found matching your criteria.</p>
                <Button variant="outline" onClick={clearFilters}>Clear Filters</Button>
              </div>
            )}
          </div>
        </div>
      </div>
    </Layout>
  );
}
