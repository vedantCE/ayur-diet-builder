import { useState, useEffect } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { 
  Users, 
  Search, 
  Filter, 
  Plus, 
  Eye, 
  Edit, 
  FileText,
  Calendar,
  Phone,
  Mail,
  Utensils
} from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useToast } from "@/hooks/use-toast";

interface Patient {
  id: string;
  name: string;
  age: number;
  gender: string;
  phone: string;
  email: string;
  dosha: string;
  status: string;
  lastVisit: string;
  nextAppointment?: string;
  healthIssues: string[];
  dietaryHabits: string;
  registeredDate: string;
}

const PatientManagement = () => {
  const [patients, setPatients] = useState<Patient[]>([]);
  const [filteredPatients, setFilteredPatients] = useState<Patient[]>([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [filterStatus, setFilterStatus] = useState("all");
  const [filterDosha, setFilterDosha] = useState("all");
  const [isAddPatientOpen, setIsAddPatientOpen] = useState(false);
  const [selectedPatient, setSelectedPatient] = useState<Patient | null>(null);
  
  const [newPatient, setNewPatient] = useState({
    name: "",
    age: "",
    gender: "",
    phone: "",
    email: "",
    dosha: "",
    dietaryHabits: "",
    healthIssues: "",
    notes: ""
  });

  const navigate = useNavigate();
  const { toast } = useToast();

  // Sample patient data
  useEffect(() => {
    const samplePatients: Patient[] = [
      {
        id: "P001",
        name: "Priya Sharma",
        age: 32,
        gender: "Female",
        phone: "+91 98765 43210",
        email: "priya.sharma@email.com",
        dosha: "Vata-Pitta",
        status: "Active",
        lastVisit: "2024-01-15",
        nextAppointment: "2024-01-22",
        healthIssues: ["Digestive Issues", "Anxiety"],
        dietaryHabits: "Vegetarian",
        registeredDate: "2023-12-01"
      },
      {
        id: "P002",
        name: "Rajesh Kumar",
        age: 45,
        gender: "Male",
        phone: "+91 87654 32109",
        email: "rajesh.kumar@email.com",
        dosha: "Kapha",
        status: "Follow-up",
        lastVisit: "2024-01-10",
        healthIssues: ["Weight Management", "Joint Pain"],
        dietaryHabits: "Non-Vegetarian",
        registeredDate: "2023-11-15"
      },
      {
        id: "P003",
        name: "Anita Patel",
        age: 28,
        gender: "Female",
        phone: "+91 76543 21098",
        email: "anita.patel@email.com",
        dosha: "Pitta",
        status: "New",
        lastVisit: "2024-01-18",
        nextAppointment: "2024-01-25",
        healthIssues: ["Acidity", "Skin Issues"],
        dietaryHabits: "Vegetarian",
        registeredDate: "2024-01-18"
      },
      {
        id: "P004",
        name: "Suresh Gupta",
        age: 38,
        gender: "Male",
        phone: "+91 65432 10987",
        email: "suresh.gupta@email.com",
        dosha: "Vata",
        status: "Inactive",
        lastVisit: "2023-12-20",
        healthIssues: ["Insomnia", "Stress"],
        dietaryHabits: "Vegetarian",
        registeredDate: "2023-10-05"
      }
    ];
    
    setPatients(samplePatients);
    setFilteredPatients(samplePatients);
  }, []);

  // Filter and search logic
  useEffect(() => {
    let filtered = patients;

    if (searchTerm) {
      filtered = filtered.filter(patient =>
        patient.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        patient.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
        patient.email.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    if (filterStatus !== "all") {
      filtered = filtered.filter(patient => patient.status.toLowerCase() === filterStatus);
    }

    if (filterDosha !== "all") {
      filtered = filtered.filter(patient => patient.dosha.toLowerCase().includes(filterDosha));
    }

    setFilteredPatients(filtered);
  }, [searchTerm, filterStatus, filterDosha, patients]);

  const handleAddPatient = () => {
    if (!newPatient.name || !newPatient.age || !newPatient.phone) {
      toast({
        title: "Missing Information",
        description: "Please fill in all required fields",
        variant: "destructive"
      });
      return;
    }

    const patient: Patient = {
      id: "P" + String(patients.length + 1).padStart(3, '0'),
      name: newPatient.name,
      age: parseInt(newPatient.age),
      gender: newPatient.gender,
      phone: newPatient.phone,
      email: newPatient.email,
      dosha: newPatient.dosha,
      status: "New",
      lastVisit: new Date().toISOString().split('T')[0],
      healthIssues: newPatient.healthIssues.split(',').map(issue => issue.trim()).filter(Boolean),
      dietaryHabits: newPatient.dietaryHabits,
      registeredDate: new Date().toISOString().split('T')[0]
    };

    setPatients(prev => [...prev, patient]);
    setNewPatient({
      name: "", age: "", gender: "", phone: "", email: "", 
      dosha: "", dietaryHabits: "", healthIssues: "", notes: ""
    });
    setIsAddPatientOpen(false);

    toast({
      title: "Patient Added",
      description: `${patient.name} has been added successfully`,
    });
  };

  const getStatusColor = (status: string) => {
    switch (status.toLowerCase()) {
      case 'active': return 'bg-green-100 text-green-800';
      case 'new': return 'bg-blue-100 text-blue-800';
      case 'follow-up': return 'bg-yellow-100 text-yellow-800';
      case 'inactive': return 'bg-gray-100 text-gray-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getDoshaColor = (dosha: string) => {
    if (dosha.includes('Vata')) return 'bg-blue-50 text-blue-700 border-blue-200';
    if (dosha.includes('Pitta')) return 'bg-red-50 text-red-700 border-red-200';
    if (dosha.includes('Kapha')) return 'bg-green-50 text-green-700 border-green-200';
    return 'bg-gray-50 text-gray-700 border-gray-200';
  };

  return (
    <div className="min-h-screen py-8 px-4">
      <div className="max-w-7xl mx-auto space-y-6">
        
        {/* Header */}
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-3xl font-bold text-foreground">
              रोगी प्रबंधन (Patient Management)
            </h1>
            <p className="text-muted-foreground mt-1">
              Manage your patient records and consultations
            </p>
          </div>
          
          <Dialog open={isAddPatientOpen} onOpenChange={setIsAddPatientOpen}>
            <DialogTrigger asChild>
              <Button variant="healing">
                <Plus className="w-4 h-4 mr-2" />
                Add New Patient
              </Button>
            </DialogTrigger>
            <DialogContent className="max-w-2xl">
              <DialogHeader>
                <DialogTitle>Add New Patient</DialogTitle>
              </DialogHeader>
              <div className="grid grid-cols-2 gap-4 py-4">
                <div className="space-y-2">
                  <Label htmlFor="name">Full Name *</Label>
                  <Input
                    id="name"
                    value={newPatient.name}
                    onChange={(e) => setNewPatient(prev => ({ ...prev, name: e.target.value }))}
                    placeholder="Patient's full name"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="age">Age *</Label>
                  <Input
                    id="age"
                    type="number"
                    value={newPatient.age}
                    onChange={(e) => setNewPatient(prev => ({ ...prev, age: e.target.value }))}
                    placeholder="Age"
                  />
                </div>
                <div className="space-y-2">
                  <Label>Gender</Label>
                  <Select value={newPatient.gender} onValueChange={(value) => setNewPatient(prev => ({ ...prev, gender: value }))}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select gender" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Male">Male</SelectItem>
                      <SelectItem value="Female">Female</SelectItem>
                      <SelectItem value="Other">Other</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="phone">Phone *</Label>
                  <Input
                    id="phone"
                    value={newPatient.phone}
                    onChange={(e) => setNewPatient(prev => ({ ...prev, phone: e.target.value }))}
                    placeholder="+91 XXXXX XXXXX"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="email">Email</Label>
                  <Input
                    id="email"
                    type="email"
                    value={newPatient.email}
                    onChange={(e) => setNewPatient(prev => ({ ...prev, email: e.target.value }))}
                    placeholder="email@example.com"
                  />
                </div>
                <div className="space-y-2">
                  <Label>Dosha Constitution</Label>
                  <Select value={newPatient.dosha} onValueChange={(value) => setNewPatient(prev => ({ ...prev, dosha: value }))}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select dosha" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Vata">Vata</SelectItem>
                      <SelectItem value="Pitta">Pitta</SelectItem>
                      <SelectItem value="Kapha">Kapha</SelectItem>
                      <SelectItem value="Vata-Pitta">Vata-Pitta</SelectItem>
                      <SelectItem value="Pitta-Kapha">Pitta-Kapha</SelectItem>
                      <SelectItem value="Vata-Kapha">Vata-Kapha</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label>Dietary Habits</Label>
                  <Select value={newPatient.dietaryHabits} onValueChange={(value) => setNewPatient(prev => ({ ...prev, dietaryHabits: value }))}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select dietary preference" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Vegetarian">Vegetarian</SelectItem>
                      <SelectItem value="Non-Vegetarian">Non-Vegetarian</SelectItem>
                      <SelectItem value="Vegan">Vegan</SelectItem>
                      <SelectItem value="Jain">Jain</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="healthIssues">Health Issues</Label>
                  <Input
                    id="healthIssues"
                    value={newPatient.healthIssues}
                    onChange={(e) => setNewPatient(prev => ({ ...prev, healthIssues: e.target.value }))}
                    placeholder="Comma separated issues"
                  />
                </div>
                <div className="col-span-2 space-y-2">
                  <Label htmlFor="notes">Additional Notes</Label>
                  <Textarea
                    id="notes"
                    value={newPatient.notes}
                    onChange={(e) => setNewPatient(prev => ({ ...prev, notes: e.target.value }))}
                    placeholder="Any additional information..."
                    rows={3}
                  />
                </div>
              </div>
              <div className="flex justify-end gap-2">
                <Button variant="outline" onClick={() => setIsAddPatientOpen(false)}>
                  Cancel
                </Button>
                <Button variant="healing" onClick={handleAddPatient}>
                  Add Patient
                </Button>
              </div>
            </DialogContent>
          </Dialog>
        </div>

        {/* Filters and Search */}
        <Card className="p-6">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="flex-1">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
                <Input
                  placeholder="Search patients by name, ID, or email..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10"
                />
              </div>
            </div>
            
            <div className="flex gap-2">
              <Select value={filterStatus} onValueChange={setFilterStatus}>
                <SelectTrigger className="w-32">
                  <SelectValue placeholder="Status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Status</SelectItem>
                  <SelectItem value="active">Active</SelectItem>
                  <SelectItem value="new">New</SelectItem>
                  <SelectItem value="follow-up">Follow-up</SelectItem>
                  <SelectItem value="inactive">Inactive</SelectItem>
                </SelectContent>
              </Select>

              <Select value={filterDosha} onValueChange={setFilterDosha}>
                <SelectTrigger className="w-32">
                  <SelectValue placeholder="Dosha" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Doshas</SelectItem>
                  <SelectItem value="vata">Vata</SelectItem>
                  <SelectItem value="pitta">Pitta</SelectItem>
                  <SelectItem value="kapha">Kapha</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </Card>

        {/* Patient List */}
        <div className="grid gap-4">
          {filteredPatients.map((patient) => (
            <Card key={patient.id} className="p-6 hover:shadow-md transition-shadow">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 bg-gradient-healing rounded-full flex items-center justify-center">
                    <Users className="w-6 h-6 text-primary-foreground" />
                  </div>
                  
                  <div className="space-y-1">
                    <div className="flex items-center gap-2">
                      <h3 className="font-semibold text-lg">{patient.name}</h3>
                      <Badge variant="outline">{patient.id}</Badge>
                      <Badge className={getStatusColor(patient.status)}>
                        {patient.status}
                      </Badge>
                    </div>
                    
                    <div className="flex items-center gap-4 text-sm text-muted-foreground">
                      <span>{patient.age} years • {patient.gender}</span>
                      <span className="flex items-center gap-1">
                        <Phone className="w-3 h-3" />
                        {patient.phone}
                      </span>
                      {patient.email && (
                        <span className="flex items-center gap-1">
                          <Mail className="w-3 h-3" />
                          {patient.email}
                        </span>
                      )}
                    </div>
                  </div>
                </div>

                <div className="flex items-center gap-4">
                  <div className="text-right space-y-1">
                    <Badge className={getDoshaColor(patient.dosha)} variant="outline">
                      {patient.dosha}
                    </Badge>
                    <p className="text-sm text-muted-foreground">
                      Last visit: {patient.lastVisit}
                    </p>
                    {patient.nextAppointment && (
                      <p className="text-sm text-green-600">
                        Next: {patient.nextAppointment}
                      </p>
                    )}
                  </div>

                  <div className="flex gap-2">
                    <Button variant="outline" size="sm" onClick={() => setSelectedPatient(patient)}>
                      <Eye className="w-4 h-4" />
                    </Button>
                    <Button variant="outline" size="sm" onClick={() => navigate(`/consultations?patient=${patient.id}`)}>
                      <Calendar className="w-4 h-4" />
                    </Button>
                    <Button variant="healing" size="sm" onClick={() => navigate(`/food-selection?patient=${patient.id}`)}>
                      <Utensils className="w-4 h-4" />
                    </Button>
                    <Button variant="outline" size="sm" onClick={() => navigate(`/diet-chart?patient=${patient.id}`)}>
                      <FileText className="w-4 h-4" />
                    </Button>
                  </div>
                </div>
              </div>

              {patient.healthIssues.length > 0 && (
                <div className="mt-4 pt-4 border-t">
                  <div className="flex flex-wrap gap-1">
                    <span className="text-sm text-muted-foreground mr-2">Health Issues:</span>
                    {patient.healthIssues.map((issue, index) => (
                      <Badge key={index} variant="secondary" className="text-xs">
                        {issue}
                      </Badge>
                    ))}
                  </div>
                </div>
              )}
            </Card>
          ))}
        </div>

        {filteredPatients.length === 0 && (
          <Card className="p-12 text-center">
            <Users className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
            <h3 className="text-lg font-semibold mb-2">No patients found</h3>
            <p className="text-muted-foreground mb-4">
              {searchTerm || filterStatus !== 'all' || filterDosha !== 'all' 
                ? "Try adjusting your search or filters" 
                : "Add your first patient to get started"}
            </p>
            <Button variant="healing" onClick={() => setIsAddPatientOpen(true)}>
              <Plus className="w-4 h-4 mr-2" />
              Add New Patient
            </Button>
          </Card>
        )}
      </div>
    </div>
  );
};

export default PatientManagement;