import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Shield, UserCheck, Stethoscope, User, ArrowRight, Lock } from "lucide-react";
import { useAuth } from "@/contexts/AuthContext";
import { useNavigate } from "react-router-dom";
import { useToast } from "@/hooks/use-toast";

const Auth = () => {
  const { login } = useAuth();
  const navigate = useNavigate();
  const { toast } = useToast();

  const handleLogin = (role: 'practitioner' | 'patient') => {
    login(role);
    toast({
      title: "Authentication Successful",
      description: `Logged in as ${role === 'practitioner' ? 'Healthcare Practitioner' : 'Patient'}`,
    });
    navigate('/dashboard');
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-muted/20 to-background">
      <div className="container mx-auto px-4 py-16">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-healing rounded-full shadow-healing mb-6">
            <Shield className="w-8 h-8 text-primary-foreground" />
          </div>
          <h1 className="text-4xl font-bold text-foreground mb-4">
            User Authentication
          </h1>
          <div className="flex items-center justify-center gap-2 mb-4">
            <Badge variant="outline" className="bg-primary/10">
              <Lock className="w-3 h-3 mr-1" />
              Secure Access
            </Badge>
            <Badge variant="outline" className="bg-accent/10">
              Role Groups
            </Badge>
          </div>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Select your role to access the Ayurvedic Diet Management platform. 
            This is a simulated authentication system for demonstration purposes.
          </p>
        </div>

        {/* Role Selection */}
        <div className="max-w-4xl mx-auto grid md:grid-cols-2 gap-8">
          {/* Practitioner Login */}
          <Card className="p-8 shadow-card hover:shadow-healing transition-all duration-300 hover:transform hover:scale-105">
            <div className="text-center">
              <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-healing rounded-full shadow-soft mb-6">
                <Stethoscope className="w-8 h-8 text-primary-foreground" />
              </div>
              
              <h3 className="text-2xl font-bold text-foreground mb-4">
                Healthcare Practitioner
              </h3>
              
              <p className="text-muted-foreground mb-6 leading-relaxed">
                Access patient management, diet chart creation, and comprehensive reporting tools
              </p>

              <div className="space-y-3 mb-8 text-sm">
                <div className="flex items-center gap-2 text-muted-foreground">
                  <UserCheck className="w-4 h-4 text-primary" />
                  <span>Patient Profile Management</span>
                </div>
                <div className="flex items-center gap-2 text-muted-foreground">
                  <UserCheck className="w-4 h-4 text-primary" />
                  <span>Diet Chart Generation</span>
                </div>
                <div className="flex items-center gap-2 text-muted-foreground">
                  <UserCheck className="w-4 h-4 text-primary" />
                  <span>Analytics & Reports</span>
                </div>
                <div className="flex items-center gap-2 text-muted-foreground">
                  <UserCheck className="w-4 h-4 text-primary" />
                  <span>Educational Resources</span>
                </div>
              </div>

              <Button 
                onClick={() => handleLogin('practitioner')}
                variant="healing" 
                size="lg"
                className="w-full group"
              >
                Continue as Practitioner
                <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
              </Button>
              
              <p className="text-xs text-muted-foreground mt-4">
                Demo: Dr. Priya Sharma
              </p>
            </div>
          </Card>

          {/* Patient Login */}
          <Card className="p-8 shadow-card hover:shadow-healing transition-all duration-300 hover:transform hover:scale-105">
            <div className="text-center">
              <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-wisdom rounded-full shadow-soft mb-6">
                <User className="w-8 h-8 text-foreground" />
              </div>
              
              <h3 className="text-2xl font-bold text-foreground mb-4">
                Patient
              </h3>
              
              <p className="text-muted-foreground mb-6 leading-relaxed">
                View your personalized diet charts, track your progress, and access educational content
              </p>

              <div className="space-y-3 mb-8 text-sm">
                <div className="flex items-center gap-2 text-muted-foreground">
                  <UserCheck className="w-4 h-4 text-wisdom" />
                  <span>Personal Profile</span>
                </div>
                <div className="flex items-center gap-2 text-muted-foreground">
                  <UserCheck className="w-4 h-4 text-wisdom" />
                  <span>My Diet Charts</span>
                </div>
                <div className="flex items-center gap-2 text-muted-foreground">
                  <UserCheck className="w-4 h-4 text-wisdom" />
                  <span>Progress Tracking</span>
                </div>
                <div className="flex items-center gap-2 text-muted-foreground">
                  <UserCheck className="w-4 h-4 text-wisdom" />
                  <span>Educational Resources</span>
                </div>
              </div>

              <Button 
                onClick={() => handleLogin('patient')}
                variant="wisdom" 
                size="lg"
                className="w-full group"
              >
                Continue as Patient
                <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
              </Button>
              
              <p className="text-xs text-muted-foreground mt-4">
                Demo: Raj Patel
              </p>
            </div>
          </Card>
        </div>

        {/* Security Notice */}
        <div className="max-w-2xl mx-auto mt-12">
          <Card className="p-6 bg-muted/50 border border-border">
            <div className="flex items-start gap-3">
              <Shield className="w-5 h-5 text-primary mt-0.5" />
              <div>
                <h4 className="font-semibold text-foreground mb-2">Security Notice</h4>
                <p className="text-sm text-muted-foreground">
                  This is a demonstration environment. In production, this system would use 
                  secure authentication with multi-factor authentication, role-based access control, 
                  and encrypted session management.
                </p>
              </div>
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default Auth;