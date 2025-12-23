import { useNavigate } from 'react-router-dom';
import { ArrowRight, Users, Building2, Heart, Sparkles, Target, MessageSquare } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Layout } from '@/components/layout/Layout';
import heroBg from '@/assets/hero-bg.jpg';

export default function Index() {
  const navigate = useNavigate();

  return (
    <Layout>
      {/* Hero Section */}
      <section className="relative min-h-[90vh] flex items-center overflow-hidden">
        <div className="absolute inset-0 bg-gradient-hero"></div>
        <div className="absolute inset-0 opacity-20">
          <img src={heroBg} alt="" className="w-full h-full object-cover" />
        </div>
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-background"></div>
        
        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-3xl animate-fade-in">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary-foreground/10 backdrop-blur-sm border border-primary-foreground/20 text-primary-foreground text-sm mb-6">
              <Sparkles className="w-4 h-4" />
              Connecting Skills with Purpose
            </div>
            
            <h1 className="text-4xl md:text-6xl font-display font-bold text-primary-foreground leading-tight mb-6">
              Your Skills Can<br />
              <span className="text-secondary">Change Lives</span>
            </h1>
            
            <p className="text-xl text-primary-foreground/80 mb-8 max-w-xl">
              SkillBridge connects skilled volunteers with NGOs for meaningful, skill-based volunteering opportunities worldwide.
            </p>
            
            <div className="flex flex-wrap gap-4">
              <Button variant="hero" size="xl" onClick={() => navigate('/auth?mode=signup')}>
                Get Started Free
                <ArrowRight className="w-5 h-5" />
              </Button>
              <Button variant="hero-outline" size="xl" onClick={() => navigate('/opportunities')}>
                Browse Opportunities
              </Button>
            </div>

            {/* Stats */}
            <div className="flex gap-8 mt-12 pt-8 border-t border-primary-foreground/20">
              <div>
                <div className="text-3xl font-bold text-primary-foreground">10K+</div>
                <div className="text-sm text-primary-foreground/70">Active Volunteers</div>
              </div>
              <div>
                <div className="text-3xl font-bold text-primary-foreground">500+</div>
                <div className="text-sm text-primary-foreground/70">Partner NGOs</div>
              </div>
              <div>
                <div className="text-3xl font-bold text-primary-foreground">2K+</div>
                <div className="text-sm text-primary-foreground/70">Opportunities</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="py-24 bg-background">
        <div className="container mx-auto px-4">
          <div className="text-center max-w-2xl mx-auto mb-16">
            <h2 className="text-3xl md:text-4xl font-display font-bold mb-4">How It Works</h2>
            <p className="text-lg text-muted-foreground">
              Three simple steps to start making a difference
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {[
              { icon: Users, title: 'Create Your Profile', desc: 'Sign up as a volunteer or NGO and showcase your skills or needs.' },
              { icon: Target, title: 'Find Matches', desc: 'Browse opportunities or volunteers that match your skills and interests.' },
              { icon: MessageSquare, title: 'Connect & Collaborate', desc: 'Apply, chat, and work together to create meaningful impact.' },
            ].map((item, i) => (
              <div key={i} className="group text-center p-8 rounded-2xl bg-card border border-border hover:border-primary/30 hover:shadow-lg transition-all duration-300">
                <div className="w-16 h-16 mx-auto mb-6 rounded-2xl bg-gradient-primary flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform">
                  <item.icon className="w-8 h-8 text-primary-foreground" />
                </div>
                <h3 className="text-xl font-display font-semibold mb-3">{item.title}</h3>
                <p className="text-muted-foreground">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 bg-gradient-primary">
        <div className="container mx-auto px-4 text-center">
          <Heart className="w-12 h-12 mx-auto mb-6 text-primary-foreground/80" />
          <h2 className="text-3xl md:text-4xl font-display font-bold text-primary-foreground mb-4">
            Ready to Make a Difference?
          </h2>
          <p className="text-lg text-primary-foreground/80 max-w-xl mx-auto mb-8">
            Join SkillBridge today and connect with causes that matter to you.
          </p>
          <div className="flex flex-wrap gap-4 justify-center">
            <Button variant="hero-outline" size="lg" onClick={() => navigate('/auth?mode=signup')}>
              <Users className="w-5 h-5" />
              Join as Volunteer
            </Button>
            <Button variant="hero-outline" size="lg" onClick={() => navigate('/auth?mode=signup')}>
              <Building2 className="w-5 h-5" />
              Register Your NGO
            </Button>
          </div>
        </div>
      </section>
    </Layout>
  );
}
