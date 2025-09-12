import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { 
  Users, 
  FileText, 
  TrendingUp, 
  Calendar, 
  AlertTriangle,
  CheckCircle,
  Clock,
  Plus,
  ArrowRight,
  Activity,
  Heart,
  Utensils
} from "lucide-react";
import { useAuth } from "@/contexts/AuthContext";
import { Link } from "react-router-dom";

const Dashboard = () => {
  const { user } = useAuth();

  const practitionerStats = [
    { label: "Active Patients", value: "127", icon: Users, color: "text-primary" },
    { label: "Diet Charts Created", value: "89", icon: FileText, color: "text-wisdom" },
    { label: "This Week", value: "+12", icon: TrendingUp, color: "text-nature" },
    { label: "Pending Reviews", value: "7", icon: Clock, color: "text-earth" }
  ];

  const todaysPatients = [
    { name: "Anita Sharma", time: "10:00 AM", status: "Scheduled", condition: "Digestive Issues" },
    { name: "Rahul Gupta", time: "11:30 AM", status: "In Progress", condition: "Weight Management" },
    { name: "Priya Reddy", time: "2:00 PM", status: "Completed", condition: "Diabetes Management" },
    { name: "Amit Singh", time: "3:30 PM", status: "Scheduled", condition: "Hypertension" }
  ];

  const recentAlerts = [
    { message: "Patient compliance review needed for Anita Sharma", type: "warning" },
    { message: "New research update: Turmeric in diabetes management", type: "info" },
    { message: "Diet chart approval pending for 3 patients", type: "warning" }
  ];

  const featureCards = [
    {
      title: "Patient Profile",
      description: "Create and manage comprehensive patient profiles with Ayurvedic constitution analysis",
      icon: Users,
      link: "/patient-profile",
      gradient: "bg-gradient-healing"
    },
    {
      title: "Diet Builder", 
      description: "Design personalized diet charts using traditional Ayurvedic principles and modern nutrition",
      icon: Utensils,
      link: "/food-selection",
      gradient: "bg-gradient-wisdom"
    },
    {
      title: "Reports",
      description: "Generate detailed analytics and patient progress reports with export capabilities",
      icon: FileText,
      link: "/reports",
      gradient: "bg-gradient-earth"
    }
  ];

  if (user?.role === 'patient') {
    return (
      <div className="min-h-screen p-4">
        <div className="max-w-6xl mx-auto">
          {/* Patient Header */}
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-foreground mb-2">
              Welcome back, {user.name}
            </h1>
            <p className="text-muted-foreground">
              Track your wellness journey and access your personalized Ayurvedic diet plan
            </p>
          </div>

          {/* Patient Quick Stats */}
          <div className="grid md:grid-cols-4 gap-6 mb-8">
            <Card className="p-6 shadow-card">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-gradient-healing rounded-lg flex items-center justify-center">
                  <Heart className="w-5 h-5 text-primary-foreground" />
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Health Score</p>
                  <p className="text-2xl font-bold text-foreground">8.5/10</p>
                </div>
              </div>
            </Card>
            
            <Card className="p-6 shadow-card">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-gradient-wisdom rounded-lg flex items-center justify-center">
                  <Calendar className="w-5 h-5 text-foreground" />
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Days on Plan</p>
                  <p className="text-2xl font-bold text-foreground">23</p>
                </div>
              </div>
            </Card>

            <Card className="p-6 shadow-card">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-gradient-earth rounded-lg flex items-center justify-center">
                  <TrendingUp className="w-5 h-5 text-foreground" />
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Weight Progress</p>
                  <p className="text-2xl font-bold text-foreground">-2.3kg</p>
                </div>
              </div>
            </Card>

            <Card className="p-6 shadow-card">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center">
                  <CheckCircle className="w-5 h-5 text-primary" />
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Compliance</p>
                  <p className="text-2xl font-bold text-foreground">92%</p>
                </div>
              </div>
            </Card>
          </div>

          {/* Patient Actions */}
          <div className="grid md:grid-cols-2 gap-6">
            <Card className="p-6 shadow-card">
              <h3 className="text-lg font-semibold text-foreground mb-4">My Diet Chart</h3>
              <p className="text-muted-foreground mb-4">
                Access your current personalized Ayurvedic diet plan and meal recommendations
              </p>
              <Button asChild variant="healing" className="w-full">
                <Link to="/diet-chart">
                  View Diet Chart
                  <ArrowRight className="w-4 h-4 ml-2" />
                </Link>
              </Button>
            </Card>

            <Card className="p-6 shadow-card">
              <h3 className="text-lg font-semibold text-foreground mb-4">Update Profile</h3>
              <p className="text-muted-foreground mb-4">
                Keep your health information current for better recommendations
              </p>
              <Button asChild variant="outline" className="w-full">
                <Link to="/patient-profile">
                  Update Profile
                  <ArrowRight className="w-4 h-4 ml-2" />
                </Link>
              </Button>
            </Card>
          </div>
        </div>
      </div>
    );
  }

  // Practitioner Dashboard
  return (
    <div className="min-h-screen p-4">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-foreground mb-2">
            Dashboard - {user?.name}
          </h1>
          <p className="text-muted-foreground">
            Today's overview and quick actions for your Ayurvedic practice
          </p>
        </div>

        {/* Stats Grid */}
        <div className="grid md:grid-cols-4 gap-6 mb-8">
          {practitionerStats.map((stat, index) => (
            <Card key={index} className="p-6 shadow-card hover:shadow-healing transition-all duration-300">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground mb-1">{stat.label}</p>
                  <p className="text-2xl font-bold text-foreground">{stat.value}</p>
                </div>
                <div className={`w-10 h-10 rounded-lg bg-gradient-healing flex items-center justify-center`}>
                  <stat.icon className="w-5 h-5 text-primary-foreground" />
                </div>
              </div>
            </Card>
          ))}
        </div>

        {/* Feature Selection Diamond Layout */}
        <div className="mb-8">
          <h2 className="text-2xl font-bold text-foreground mb-6 text-center">
            Feature Selection
          </h2>
          <div className="grid md:grid-cols-3 gap-6 max-w-4xl mx-auto">
            {featureCards.map((feature, index) => (
              <Card 
                key={index}
                className="p-6 shadow-card hover:shadow-healing transition-all duration-300 hover:transform hover:scale-105 group cursor-pointer"
              >
                <Link to={feature.link} className="block">
                  <div className="text-center">
                    <div className={`inline-flex items-center justify-center w-16 h-16 ${feature.gradient} rounded-full shadow-soft mb-4 group-hover:scale-110 transition-transform`}>
                      <feature.icon className="w-8 h-8 text-primary-foreground" />
                    </div>
                    
                    <h3 className="text-lg font-semibold text-foreground mb-2">
                      {feature.title}
                    </h3>
                    
                    <p className="text-sm text-muted-foreground mb-4">
                      {feature.description}
                    </p>

                    <Button variant="outline" size="sm" className="group-hover:bg-primary group-hover:text-primary-foreground transition-colors">
                      Access Tool
                      <ArrowRight className="w-3 h-3 ml-2 group-hover:translate-x-1 transition-transform" />
                    </Button>
                  </div>
                </Link>
              </Card>
            ))}
          </div>
        </div>

        {/* Today's Schedule and Alerts */}
        <div className="grid lg:grid-cols-2 gap-6 mb-8">
          {/* Today's Patients */}
          <Card className="p-6 shadow-card">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold text-foreground">Today's Patients</h3>
              <Button asChild variant="outline" size="sm">
                <Link to="/patients">
                  <Plus className="w-4 h-4 mr-2" />
                  New Patient
                </Link>
              </Button>
            </div>
            
            <div className="space-y-3">
              {todaysPatients.map((patient, index) => (
                <div key={index} className="flex items-center justify-between p-3 rounded-lg bg-muted/30 hover:bg-muted/50 transition-colors">
                  <div>
                    <p className="font-medium text-foreground">{patient.name}</p>
                    <p className="text-sm text-muted-foreground">{patient.condition}</p>
                  </div>
                  <div className="text-right">
                    <p className="text-sm font-medium text-foreground">{patient.time}</p>
                    <Badge 
                      variant={patient.status === 'Completed' ? 'default' : patient.status === 'In Progress' ? 'secondary' : 'outline'}
                      className="text-xs"
                    >
                      {patient.status}
                    </Badge>
                  </div>
                </div>
              ))}
            </div>
          </Card>

          {/* Alerts & Notifications */}
          <Card className="p-6 shadow-card">
            <h3 className="text-lg font-semibold text-foreground mb-4">Alerts & Updates</h3>
            <div className="space-y-3">
              {recentAlerts.map((alert, index) => (
                <div key={index} className="flex items-start gap-3 p-3 rounded-lg bg-muted/30">
                  <AlertTriangle className={`w-4 h-4 mt-0.5 ${alert.type === 'warning' ? 'text-destructive' : 'text-primary'}`} />
                  <p className="text-sm text-foreground">{alert.message}</p>
                </div>
              ))}
            </div>
            
            <Button variant="outline" size="sm" className="w-full mt-4">
              View All Notifications
            </Button>
          </Card>
        </div>

        {/* Quick Actions */}
        <Card className="p-6 shadow-card">
          <h3 className="text-lg font-semibold text-foreground mb-4">Quick Actions</h3>
          <div className="grid md:grid-cols-4 gap-4">
            <Button asChild variant="healing" className="justify-start">
              <Link to="/patient-profile">
                <Users className="w-4 h-4 mr-2" />
                New Patient
              </Link>
            </Button>
            <Button asChild variant="wisdom" className="justify-start">
              <Link to="/food-selection">
                <Utensils className="w-4 h-4 mr-2" />
                Create Diet Chart
              </Link>
            </Button>
            <Button asChild variant="outline" className="justify-start">
              <Link to="/reports">
                <FileText className="w-4 h-4 mr-2" />
                Generate Report
              </Link>
            </Button>
            <Button asChild variant="outline" className="justify-start">
              <Link to="/education">
                <Activity className="w-4 h-4 mr-2" />
                Education Hub
              </Link>
            </Button>
          </div>
        </Card>
      </div>
    </div>
  );
};

export default Dashboard;