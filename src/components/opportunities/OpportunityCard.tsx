import { useNavigate } from 'react-router-dom';
import { MapPin, Clock, Briefcase, ArrowRight } from 'lucide-react';
import { Card, CardContent, CardFooter, CardHeader } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/skill-badge';

interface OpportunityCardProps {
  id: string;
  title: string;
  description: string | null;
  required_skills: string[];
  duration: string | null;
  location: string | null;
  status: 'open' | 'closed';
  ngo_name?: string;
  created_at: string;
}

export function OpportunityCard({
  id,
  title,
  description,
  required_skills,
  duration,
  location,
  status,
  ngo_name,
}: OpportunityCardProps) {
  const navigate = useNavigate();

  return (
    <Card className="group hover:shadow-card-hover transition-all duration-300 hover:-translate-y-1 overflow-hidden">
      <CardHeader className="pb-3">
        <div className="flex items-start justify-between gap-4">
          <div className="flex-1">
            <h3 className="font-display font-semibold text-lg text-card-foreground group-hover:text-primary transition-colors line-clamp-2">
              {title}
            </h3>
            {ngo_name && (
              <p className="text-sm text-muted-foreground mt-1">{ngo_name}</p>
            )}
          </div>
          <Badge variant={status === 'open' ? 'status' : 'status-closed'}>
            {status === 'open' ? 'Open' : 'Closed'}
          </Badge>
        </div>
      </CardHeader>

      <CardContent className="pb-4">
        {description && (
          <p className="text-sm text-muted-foreground line-clamp-2 mb-4">
            {description}
          </p>
        )}

        {/* Skills */}
        {required_skills.length > 0 && (
          <div className="flex flex-wrap gap-2 mb-4">
            {required_skills.slice(0, 3).map((skill, index) => (
              <Badge key={index} variant="skill">
                {skill}
              </Badge>
            ))}
            {required_skills.length > 3 && (
              <Badge variant="outline">+{required_skills.length - 3} more</Badge>
            )}
          </div>
        )}

        {/* Meta Info */}
        <div className="flex flex-wrap gap-4 text-sm text-muted-foreground">
          {location && (
            <div className="flex items-center gap-1.5">
              <MapPin className="w-4 h-4" />
              <span>{location}</span>
            </div>
          )}
          {duration && (
            <div className="flex items-center gap-1.5">
              <Clock className="w-4 h-4" />
              <span>{duration}</span>
            </div>
          )}
        </div>
      </CardContent>

      <CardFooter className="pt-0 border-t border-border/50">
        <div className="flex gap-2 w-full pt-4">
          <Button
            variant="outline"
            className="flex-1"
            onClick={() => navigate(`/opportunities/${id}`)}
          >
            View Details
          </Button>
          {status === 'open' && (
            <Button
              variant="default"
              className="flex-1"
              onClick={() => navigate(`/opportunities/${id}?apply=true`)}
            >
              Apply Now
              <ArrowRight className="w-4 h-4" />
            </Button>
          )}
        </div>
      </CardFooter>
    </Card>
  );
}
