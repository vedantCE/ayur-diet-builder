import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Leaf, Heart, Users, Clock } from "lucide-react";
import { Link } from "react-router-dom";

const Landing = () => {
  const features = [
    {
      icon: Heart,
      title: "Holistic Wellness",
      description: "Personalized diet plans based on Ayurvedic principles and individual constitution"
    },
    {
      icon: Users,
      title: "Patient-Centered",
      description: "Comprehensive profile management for healthcare providers and patients"
    },
    {
      icon: Clock,
      title: "Efficient Planning",
      description: "Quick generation of balanced meal charts with traditional wisdom"
    }
  ];

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative py-20 px-4 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-healing opacity-5" />
        <div className="max-w-6xl mx-auto text-center relative">
          <div className="animate-fade-in">
            <div className="inline-flex items-center justify-center w-20 h-20 bg-gradient-healing rounded-full shadow-healing mb-8 animate-gentle-pulse">
              <Leaf className="w-10 h-10 text-primary-foreground" />
            </div>
            
            <h1 className="text-5xl md:text-6xl font-bold text-foreground mb-6 leading-tight">
              Ayurvedic Diet
              <span className="block text-primary">Management</span>
            </h1>
            
            <p className="text-xl md:text-2xl text-muted-foreground mb-8 max-w-3xl mx-auto leading-relaxed">
              Integrating ancient Ayurvedic wisdom with modern nutrition science 
              to create personalized healing diet charts for optimal wellness
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <Button 
                asChild 
                variant="healing" 
                size="lg"
                className="w-full sm:w-auto"
              >
                <Link to="/auth">
                  Start New Patient Profile
                </Link>
              </Button>
              
              <Button 
                asChild 
                variant="wisdom" 
                size="lg"
                className="w-full sm:w-auto"
              >
                <Link to="/diet-chart">
                  View Sample Diet Chart
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 px-4 bg-muted/30">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
              Modern Technology Meets Ancient Wisdom
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Our platform combines traditional Ayurvedic principles with contemporary 
              healthcare practices to deliver personalized nutrition solutions
            </p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <Card 
                key={index}
                className="p-8 shadow-card hover:shadow-healing transition-all duration-300 hover:transform hover:scale-105 bg-card border-border"
              >
                <div className="text-center">
                  <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-healing rounded-full shadow-soft mb-6">
                    <feature.icon className="w-8 h-8 text-primary-foreground" />
                  </div>
                  
                  <h3 className="text-xl font-semibold text-foreground mb-4">
                    {feature.title}
                  </h3>
                  
                  <p className="text-muted-foreground leading-relaxed">
                    {feature.description}
                  </p>
                </div>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 px-4">
        <div className="max-w-4xl mx-auto text-center">
          <Card className="p-12 bg-gradient-earth shadow-healing border-0">
            <h2 className="text-3xl font-bold text-foreground mb-4">
              Ready to Transform Healthcare with Ayurveda?
            </h2>
            <p className="text-lg text-muted-foreground mb-8 max-w-2xl mx-auto">
              Join healthcare practitioners who are already using our platform 
              to create personalized Ayurvedic diet plans for their patients
            </p>
            <Button 
              asChild 
              variant="healing" 
              size="lg"
            >
              <Link to="/patient-profile">
                Get Started Today
              </Link>
            </Button>
          </Card>
        </div>
      </section>
    </div>
  );
};

export default Landing;