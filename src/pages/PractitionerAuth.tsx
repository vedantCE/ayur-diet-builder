import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { Stethoscope, Shield, Award } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useToast } from "@/hooks/use-toast";

const PractitionerAuth = () => {
  const [loginData, setLoginData] = useState({ email: "", password: "" });
  const [registerData, setRegisterData] = useState({
    name: "",
    email: "",
    password: "",
    license: "",
    specialization: "",
    experience: "",
    qualification: ""
  });

  const navigate = useNavigate();
  const { toast } = useToast();

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Demo login - in real app, validate with backend
    if (loginData.email && loginData.password) {
      localStorage.setItem("practitionerAuth", JSON.stringify({
        id: "prac_001",
        name: "Dr. Rajesh Sharma",
        email: loginData.email,
        role: "practitioner",
        license: "AYU12345",
        specialization: "Panchakarma",
        loginTime: new Date().toISOString()
      }));

      toast({
        title: "Login Successful",
        description: "Welcome to Practitioner Portal",
      });

      navigate("/practitioner-dashboard");
    } else {
      toast({
        title: "Login Failed",
        description: "Please enter valid credentials",
        variant: "destructive"
      });
    }
  };

  const handleRegister = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (registerData.name && registerData.email && registerData.license) {
      localStorage.setItem("practitionerAuth", JSON.stringify({
        id: "prac_" + Date.now(),
        ...registerData,
        role: "practitioner",
        registeredAt: new Date().toISOString()
      }));

      toast({
        title: "Registration Successful",
        description: "Your practitioner account has been created",
      });

      navigate("/practitioner-dashboard");
    } else {
      toast({
        title: "Registration Failed",
        description: "Please fill all required fields",
        variant: "destructive"
      });
    }
  };

  return (
    <div className="min-h-screen py-12 px-4">
      <div className="max-w-md mx-auto">
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-healing rounded-full shadow-healing mb-6">
            <Stethoscope className="w-8 h-8 text-primary-foreground" />
          </div>
          <h1 className="text-3xl font-bold text-foreground mb-2">
            वैद्य पोर्टल (Vaidya Portal)
          </h1>
          <p className="text-muted-foreground">
            Practitioner Authentication System
          </p>
        </div>

        <Card className="p-6 shadow-card">
          <Tabs defaultValue="login" className="space-y-6">
            <TabsList className="grid w-full grid-cols-2">
              <TabsTrigger value="login">Login</TabsTrigger>
              <TabsTrigger value="register">Register</TabsTrigger>
            </TabsList>

            <TabsContent value="login" className="space-y-4">
              <form onSubmit={handleLogin} className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="email">Email / License ID</Label>
                  <Input
                    id="email"
                    type="email"
                    placeholder="doctor@example.com"
                    value={loginData.email}
                    onChange={(e) => setLoginData(prev => ({ ...prev, email: e.target.value }))}
                    required
                  />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="password">Password</Label>
                  <Input
                    id="password"
                    type="password"
                    placeholder="Enter your password"
                    value={loginData.password}
                    onChange={(e) => setLoginData(prev => ({ ...prev, password: e.target.value }))}
                    required
                  />
                </div>

                <Button type="submit" className="w-full" variant="healing">
                  <Shield className="w-4 h-4 mr-2" />
                  Login to Portal
                </Button>
              </form>

              <div className="text-center text-sm text-muted-foreground">
                <p>Demo Credentials:</p>
                <p>Email: doctor@ayurveda.com</p>
                <p>Password: vaidya123</p>
              </div>
            </TabsContent>

            <TabsContent value="register" className="space-y-4">
              <form onSubmit={handleRegister} className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="name">Full Name *</Label>
                  <Input
                    id="name"
                    placeholder="Dr. Your Name"
                    value={registerData.name}
                    onChange={(e) => setRegisterData(prev => ({ ...prev, name: e.target.value }))}
                    required
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="reg-email">Email *</Label>
                  <Input
                    id="reg-email"
                    type="email"
                    placeholder="doctor@example.com"
                    value={registerData.email}
                    onChange={(e) => setRegisterData(prev => ({ ...prev, email: e.target.value }))}
                    required
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="license">License Number *</Label>
                  <Input
                    id="license"
                    placeholder="AYU12345"
                    value={registerData.license}
                    onChange={(e) => setRegisterData(prev => ({ ...prev, license: e.target.value }))}
                    required
                  />
                </div>

                <div className="space-y-2">
                  <Label>Specialization</Label>
                  <Select value={registerData.specialization} onValueChange={(value) => setRegisterData(prev => ({ ...prev, specialization: value }))}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select specialization" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="panchakarma">Panchakarma</SelectItem>
                      <SelectItem value="kayachikitsa">Kayachikitsa (Internal Medicine)</SelectItem>
                      <SelectItem value="rasayana">Rasayana (Rejuvenation)</SelectItem>
                      <SelectItem value="swasthavritta">Swasthavritta (Preventive Medicine)</SelectItem>
                      <SelectItem value="general">General Ayurveda</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label>Experience</Label>
                  <Select value={registerData.experience} onValueChange={(value) => setRegisterData(prev => ({ ...prev, experience: value }))}>
                    <SelectTrigger>
                      <SelectValue placeholder="Years of experience" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="0-2">0-2 years</SelectItem>
                      <SelectItem value="3-5">3-5 years</SelectItem>
                      <SelectItem value="6-10">6-10 years</SelectItem>
                      <SelectItem value="10+">10+ years</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="reg-password">Password *</Label>
                  <Input
                    id="reg-password"
                    type="password"
                    placeholder="Create password"
                    value={registerData.password}
                    onChange={(e) => setRegisterData(prev => ({ ...prev, password: e.target.value }))}
                    required
                  />
                </div>

                <Button type="submit" className="w-full" variant="healing">
                  <Award className="w-4 h-4 mr-2" />
                  Register as Practitioner
                </Button>
              </form>
            </TabsContent>
          </Tabs>

          <div className="mt-6 pt-4 border-t">
            <div className="flex items-center justify-center gap-2 text-sm text-muted-foreground">
              <Badge variant="outline">Secure</Badge>
              <Badge variant="outline">Verified</Badge>
              <Badge variant="outline">AYUSH Approved</Badge>
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
};

export default PractitionerAuth;