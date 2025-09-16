import { useState, useEffect } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { 
  Users, 
  Calendar, 
  FileText, 
  TrendingUp, 
  Clock, 
  Stethoscope,
  Plus,
  Bell,
  Activity
} from "lucide-react";
import { useNavigate, Link } from "react-router-dom";
import { useToast } from "@/hooks/use-toast";

const PractitionerDashboard = () => {
  const [practitioner, setPractitioner] = useState<any>(null);
  const [stats, setStats] = useState({
    totalPatients: 24,
    todayConsultations: 6,
    pendingReports: 3,
    activePatients: 18
  });

  const navigate = useNavigate();
  const { toast } = useToast();

  useEffect(() => {
    const auth = localStorage.getItem("practitionerAuth");
    if (!auth) {
      navigate("/practitioner-auth");
      return;
    }
    setPractitioner(JSON.parse(auth));
  }, [navigate]);

  const recentPatients = [
    { id: 1, name: "Priya Sharma", dosha: "Vata-Pitta", lastVisit: "2024-01-15", status: "Active" },
    { id: 2, name: "Rajesh Kumar", dosha: "Kapha", lastVisit: "2024-01-14", status: "Follow-up" },
    { id: 3, name: "Anita Patel", dosha: "Pitta", lastVisit: "2024-01-13", status: "New" },
    { id: 4, name: "Suresh Gupta", dosha: "Vata", lastVisit: "2024-01-12", status: "Active" }
  ];

  const todaySchedule = [
    { time: "09:00 AM", patient: "Meera Singh", type: "Initial Consultation", duration: "45 min" },
    { time: "10:00 AM", patient: "Amit Verma", type: "Follow-up", duration: "30 min" },
    { time: "11:30 AM", patient: "Kavita Joshi", type: "Diet Review", duration: "30 min" },
    { time: "02:00 PM", patient: "Rohit Sharma", type: "Panchakarma Consultation", duration: "60 min" }
  ];

  const quickActions = [
    { title: "Add New Patient", icon: Users, action: () => navigate("/patient-management"), color: "bg-blue-500" },
    { title: "Schedule Consultation", icon: Calendar, action: () => navigate("/consultations"), color: "bg-green-500" },
    { title: "Generate Report", icon: FileText, action: () => navigate("/reports"), color: "bg-purple-500" },
    { title: "View Analytics", icon: TrendingUp, action: () => toast({ title: "Analytics", description: "Feature coming soon!" }), color: "bg-orange-500" }
  ];

  if (!practitioner) {
    return <div>Loading...</div>;
  }

  return (
    <div className="min-h-screen py-8 px-4">
      <div className="max-w-7xl mx-auto space-y-8">
        
        {/* Header */}
        <div className="flex justify-between items-start">
          <div>
            <h1 className="text-3xl font-bold text-foreground">
              वैद्य डैशबोर्ड (Vaidya Dashboard)
            </h1>
            <p className="text-muted-foreground mt-2">
              Welcome back, Dr. {practitioner.name}
            </p>
            <div className="flex items-center gap-2 mt-2">
              <Badge variant="secondary">{practitioner.specialization}</Badge>
              <Badge variant="outline">License: {practitioner.license}</Badge>
            </div>
          </div>
          
          <div className="flex gap-2">
            <Button variant="outline" size="sm">
              <Bell className="w-4 h-4 mr-2" />
              Notifications
            </Button>
            <Button variant="healing" size="sm" onClick={() => navigate("/patient-management")}>
              <Plus className="w-4 h-4 mr-2" />
              New Patient
            </Button>
          </div>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <Card className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Total Patients</p>
                <p className="text-2xl font-bold text-foreground">{stats.totalPatients}</p>
              </div>
              <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center">
                <Users className="w-6 h-6 text-blue-600" />
              </div>
            </div>
          </Card>

          <Card className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Today's Consultations</p>
                <p className="text-2xl font-bold text-foreground">{stats.todayConsultations}</p>
              </div>
              <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center">
                <Stethoscope className="w-6 h-6 text-green-600" />
              </div>
            </div>
          </Card>

          <Card className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Pending Reports</p>
                <p className="text-2xl font-bold text-foreground">{stats.pendingReports}</p>
              </div>
              <div className="w-12 h-12 bg-orange-100 rounded-full flex items-center justify-center">
                <FileText className="w-6 h-6 text-orange-600" />
              </div>
            </div>
          </Card>

          <Card className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Active Patients</p>
                <p className="text-2xl font-bold text-foreground">{stats.activePatients}</p>
              </div>
              <div className="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center">
                <Activity className="w-6 h-6 text-purple-600" />
              </div>
            </div>
          </Card>
        </div>

        {/* Quick Actions */}
        <Card className="p-6">
          <h3 className="text-lg font-semibold mb-4">Quick Actions</h3>
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
            {quickActions.map((action, index) => (
              <Button
                key={index}
                variant="outline"
                className="h-20 flex-col gap-2"
                onClick={action.action}
              >
                <div className={`w-8 h-8 rounded-full flex items-center justify-center ${action.color}`}>
                  <action.icon className="w-4 h-4 text-white" />
                </div>
                <span className="text-sm">{action.title}</span>
              </Button>
            ))}
          </div>
        </Card>

        <div className="grid lg:grid-cols-2 gap-6">
          {/* Today's Schedule */}
          <Card className="p-6">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold">Today's Schedule</h3>
              <Button variant="outline" size="sm" onClick={() => navigate("/consultations")}>
                <Calendar className="w-4 h-4 mr-2" />
                View All
              </Button>
            </div>
            
            <div className="space-y-4">
              {todaySchedule.map((appointment, index) => (
                <div key={index} className="flex items-center gap-4 p-3 bg-muted/30 rounded-lg">
                  <div className="flex items-center gap-2 text-sm text-muted-foreground">
                    <Clock className="w-4 h-4" />
                    {appointment.time}
                  </div>
                  <div className="flex-1">
                    <p className="font-medium">{appointment.patient}</p>
                    <p className="text-sm text-muted-foreground">{appointment.type}</p>
                  </div>
                  <Badge variant="secondary">{appointment.duration}</Badge>
                </div>
              ))}
            </div>
          </Card>

          {/* Recent Patients */}
          <Card className="p-6">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold">Recent Patients</h3>
              <Button variant="outline" size="sm" onClick={() => navigate("/patient-management")}>
                <Users className="w-4 h-4 mr-2" />
                View All
              </Button>
            </div>
            
            <div className="space-y-4">
              {recentPatients.map((patient) => (
                <div key={patient.id} className="flex items-center justify-between p-3 bg-muted/30 rounded-lg">
                  <div>
                    <p className="font-medium">{patient.name}</p>
                    <p className="text-sm text-muted-foreground">
                      Dosha: {patient.dosha} • Last visit: {patient.lastVisit}
                    </p>
                  </div>
                  <Badge 
                    variant={patient.status === 'New' ? 'default' : patient.status === 'Active' ? 'secondary' : 'outline'}
                  >
                    {patient.status}
                  </Badge>
                </div>
              ))}
            </div>
          </Card>
        </div>

        {/* Research-Based Insights */}
        <Card className="p-6 bg-gradient-earth">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold">आज का आयुर्वेदिक सुझाव (Evidence-Based Insights)</h3>
            <Button asChild variant="outline" size="sm">
              <Link to="/research-references">
                View Research
              </Link>
            </Button>
          </div>
          <div className="grid md:grid-cols-3 gap-4 text-sm">
            <div className="space-y-2">
              <h4 className="font-medium">🌅 Charaka Samhita Guidelines</h4>
              <p className="text-muted-foreground">
                Classical text recommends Brahma Muhurta (4-6 AM) awakening - 78% better patient outcomes per JMIR study
              </p>
            </div>
            <div className="space-y-2">
              <h4 className="font-medium">🍽️ ICMR-NIN Validated Timing</h4>
              <p className="text-muted-foreground">
                Largest meal during Pitta time (12-2 PM) aligns with circadian metabolism research - 65% better adherence
              </p>
            </div>
            <div className="space-y-2">
              <h4 className="font-medium">🌙 AYUSH Ministry Guidelines</h4>
              <p className="text-muted-foreground">
                Early dinner prevents Kapha accumulation - supported by Ministry of AYUSH lifestyle recommendations
              </p>
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
};

export default PractitionerDashboard;