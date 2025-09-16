import { useState, useEffect } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { 
  Calendar, 
  Clock, 
  Video, 
  Phone, 
  User, 
  Plus,
  FileText,
  Stethoscope,
  CheckCircle,
  AlertCircle,
  Eye
} from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface Consultation {
  id: string;
  patientId: string;
  patientName: string;
  date: string;
  time: string;
  duration: number;
  type: 'video' | 'phone' | 'in-person';
  status: 'scheduled' | 'completed' | 'cancelled' | 'in-progress';
  notes?: string;
  prescription?: string;
  followUpDate?: string;
  symptoms: string[];
  diagnosis?: string;
  treatment?: string;
}

interface ConsultationForm {
  patientId: string;
  date: string;
  time: string;
  duration: string;
  type: string;
  notes: string;
}

const Consultations = () => {
  const [consultations, setConsultations] = useState<Consultation[]>([]);
  const [filteredConsultations, setFilteredConsultations] = useState<Consultation[]>([]);
  const [filterStatus, setFilterStatus] = useState("all");
  const [filterDate, setFilterDate] = useState("");
  const [isScheduleOpen, setIsScheduleOpen] = useState(false);
  const [selectedConsultation, setSelectedConsultation] = useState<Consultation | null>(null);
  const [isDetailsOpen, setIsDetailsOpen] = useState(false);
  
  const [consultationForm, setConsultationForm] = useState<ConsultationForm>({
    patientId: "",
    date: "",
    time: "",
    duration: "30",
    type: "video",
    notes: ""
  });

  const { toast } = useToast();

  // Sample consultation data
  useEffect(() => {
    const sampleConsultations: Consultation[] = [
      {
        id: "C001",
        patientId: "P001",
        patientName: "Priya Sharma",
        date: "2024-01-22",
        time: "10:00",
        duration: 45,
        type: "video",
        status: "scheduled",
        symptoms: ["Digestive issues", "Anxiety", "Sleep problems"],
        notes: "Follow-up consultation for digestive issues"
      },
      {
        id: "C002",
        patientId: "P002",
        patientName: "Rajesh Kumar",
        date: "2024-01-20",
        time: "14:00",
        duration: 60,
        type: "in-person",
        status: "completed",
        symptoms: ["Joint pain", "Weight gain", "Fatigue"],
        diagnosis: "Kapha imbalance with Ama accumulation",
        treatment: "Panchakarma therapy recommended",
        prescription: "Triphala churna - 1 tsp twice daily\nGuggulu - 2 tablets after meals\nWarm water with honey in morning",
        followUpDate: "2024-02-03"
      },
      {
        id: "C003",
        patientId: "P003",
        patientName: "Anita Patel",
        date: "2024-01-25",
        time: "11:30",
        duration: 30,
        type: "phone",
        status: "scheduled",
        symptoms: ["Acidity", "Skin rashes", "Irritability"],
        notes: "New patient consultation for Pitta-related issues"
      },
      {
        id: "C004",
        patientId: "P001",
        patientName: "Priya Sharma",
        date: "2024-01-15",
        time: "09:00",
        duration: 60,
        type: "video",
        status: "completed",
        symptoms: ["Anxiety", "Irregular digestion", "Dry skin"],
        diagnosis: "Vata-Pitta imbalance",
        treatment: "Abhyanga with sesame oil, meditation practice",
        prescription: "Saraswatarishta - 20ml twice daily\nBrahmi ghrita - 1 tsp morning\nAshwagandha churna - 1/2 tsp with warm milk at bedtime",
        followUpDate: "2024-01-22"
      }
    ];
    
    setConsultations(sampleConsultations);
    setFilteredConsultations(sampleConsultations);
  }, []);

  // Filter consultations
  useEffect(() => {
    let filtered = consultations;

    if (filterStatus !== "all") {
      filtered = filtered.filter(consultation => consultation.status === filterStatus);
    }

    if (filterDate) {
      filtered = filtered.filter(consultation => consultation.date === filterDate);
    }

    // Sort by date and time
    filtered.sort((a, b) => {
      const dateTimeA = new Date(`${a.date}T${a.time}`);
      const dateTimeB = new Date(`${b.date}T${b.time}`);
      return dateTimeB.getTime() - dateTimeA.getTime();
    });

    setFilteredConsultations(filtered);
  }, [filterStatus, filterDate, consultations]);

  const handleScheduleConsultation = () => {
    if (!consultationForm.patientId || !consultationForm.date || !consultationForm.time) {
      toast({
        title: "Missing Information",
        description: "Please fill in all required fields",
        variant: "destructive"
      });
      return;
    }

    const newConsultation: Consultation = {
      id: "C" + String(consultations.length + 1).padStart(3, '0'),
      patientId: consultationForm.patientId,
      patientName: "New Patient", // In real app, fetch from patient data
      date: consultationForm.date,
      time: consultationForm.time,
      duration: parseInt(consultationForm.duration),
      type: consultationForm.type as 'video' | 'phone' | 'in-person',
      status: "scheduled",
      symptoms: [],
      notes: consultationForm.notes
    };

    setConsultations(prev => [...prev, newConsultation]);
    setConsultationForm({
      patientId: "", date: "", time: "", duration: "30", type: "video", notes: ""
    });
    setIsScheduleOpen(false);

    toast({
      title: "Consultation Scheduled",
      description: `Appointment scheduled for ${consultationForm.date} at ${consultationForm.time}`,
    });
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'completed': return <CheckCircle className="w-4 h-4 text-green-600" />;
      case 'scheduled': return <Clock className="w-4 h-4 text-blue-600" />;
      case 'in-progress': return <AlertCircle className="w-4 h-4 text-orange-600" />;
      case 'cancelled': return <AlertCircle className="w-4 h-4 text-red-600" />;
      default: return <Clock className="w-4 h-4 text-gray-600" />;
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'completed': return 'bg-green-100 text-green-800';
      case 'scheduled': return 'bg-blue-100 text-blue-800';
      case 'in-progress': return 'bg-orange-100 text-orange-800';
      case 'cancelled': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getTypeIcon = (type: string) => {
    switch (type) {
      case 'video': return <Video className="w-4 h-4" />;
      case 'phone': return <Phone className="w-4 h-4" />;
      case 'in-person': return <User className="w-4 h-4" />;
      default: return <User className="w-4 h-4" />;
    }
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      weekday: 'short',
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  };

  return (
    <div className="min-h-screen py-8 px-4">
      <div className="max-w-7xl mx-auto space-y-6">
        
        {/* Header */}
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-3xl font-bold text-foreground">
              परामर्श (Consultations)
            </h1>
            <p className="text-muted-foreground mt-1">
              Manage patient consultations and appointments
            </p>
          </div>
          
          <Dialog open={isScheduleOpen} onOpenChange={setIsScheduleOpen}>
            <DialogTrigger asChild>
              <Button variant="healing">
                <Plus className="w-4 h-4 mr-2" />
                Schedule Consultation
              </Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Schedule New Consultation</DialogTitle>
              </DialogHeader>
              <div className="space-y-4 py-4">
                <div className="space-y-2">
                  <Label htmlFor="patient">Patient *</Label>
                  <Select value={consultationForm.patientId} onValueChange={(value) => setConsultationForm(prev => ({ ...prev, patientId: value }))}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select patient" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="P001">Priya Sharma (P001)</SelectItem>
                      <SelectItem value="P002">Rajesh Kumar (P002)</SelectItem>
                      <SelectItem value="P003">Anita Patel (P003)</SelectItem>
                      <SelectItem value="P004">Suresh Gupta (P004)</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="date">Date *</Label>
                    <Input
                      id="date"
                      type="date"
                      value={consultationForm.date}
                      onChange={(e) => setConsultationForm(prev => ({ ...prev, date: e.target.value }))}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="time">Time *</Label>
                    <Input
                      id="time"
                      type="time"
                      value={consultationForm.time}
                      onChange={(e) => setConsultationForm(prev => ({ ...prev, time: e.target.value }))}
                    />
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label>Duration</Label>
                    <Select value={consultationForm.duration} onValueChange={(value) => setConsultationForm(prev => ({ ...prev, duration: value }))}>
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="30">30 minutes</SelectItem>
                        <SelectItem value="45">45 minutes</SelectItem>
                        <SelectItem value="60">60 minutes</SelectItem>
                        <SelectItem value="90">90 minutes</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-2">
                    <Label>Type</Label>
                    <Select value={consultationForm.type} onValueChange={(value) => setConsultationForm(prev => ({ ...prev, type: value }))}>
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="video">Video Call</SelectItem>
                        <SelectItem value="phone">Phone Call</SelectItem>
                        <SelectItem value="in-person">In-Person</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="notes">Notes</Label>
                  <Textarea
                    id="notes"
                    value={consultationForm.notes}
                    onChange={(e) => setConsultationForm(prev => ({ ...prev, notes: e.target.value }))}
                    placeholder="Any additional notes for the consultation..."
                    rows={3}
                  />
                </div>
              </div>
              <div className="flex justify-end gap-2">
                <Button variant="outline" onClick={() => setIsScheduleOpen(false)}>
                  Cancel
                </Button>
                <Button variant="healing" onClick={handleScheduleConsultation}>
                  Schedule
                </Button>
              </div>
            </DialogContent>
          </Dialog>
        </div>

        {/* Filters */}
        <Card className="p-6">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="flex gap-2">
              <Select value={filterStatus} onValueChange={setFilterStatus}>
                <SelectTrigger className="w-40">
                  <SelectValue placeholder="All Status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Status</SelectItem>
                  <SelectItem value="scheduled">Scheduled</SelectItem>
                  <SelectItem value="completed">Completed</SelectItem>
                  <SelectItem value="in-progress">In Progress</SelectItem>
                  <SelectItem value="cancelled">Cancelled</SelectItem>
                </SelectContent>
              </Select>

              <Input
                type="date"
                value={filterDate}
                onChange={(e) => setFilterDate(e.target.value)}
                className="w-40"
              />
            </div>
          </div>
        </Card>

        {/* Consultations List */}
        <div className="grid gap-4">
          {filteredConsultations.map((consultation) => (
            <Card key={consultation.id} className="p-6 hover:shadow-md transition-shadow">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 bg-gradient-healing rounded-full flex items-center justify-center">
                    <Stethoscope className="w-6 h-6 text-primary-foreground" />
                  </div>
                  
                  <div className="space-y-1">
                    <div className="flex items-center gap-2">
                      <h3 className="font-semibold text-lg">{consultation.patientName}</h3>
                      <Badge variant="outline">{consultation.id}</Badge>
                      <Badge className={getStatusColor(consultation.status)}>
                        {getStatusIcon(consultation.status)}
                        <span className="ml-1 capitalize">{consultation.status}</span>
                      </Badge>
                    </div>
                    
                    <div className="flex items-center gap-4 text-sm text-muted-foreground">
                      <span className="flex items-center gap-1">
                        <Calendar className="w-3 h-3" />
                        {formatDate(consultation.date)}
                      </span>
                      <span className="flex items-center gap-1">
                        <Clock className="w-3 h-3" />
                        {consultation.time} ({consultation.duration} min)
                      </span>
                      <span className="flex items-center gap-1">
                        {getTypeIcon(consultation.type)}
                        <span className="capitalize">{consultation.type.replace('-', ' ')}</span>
                      </span>
                    </div>
                  </div>
                </div>

                <div className="flex items-center gap-2">
                  <Button 
                    variant="outline" 
                    size="sm"
                    onClick={() => {
                      setSelectedConsultation(consultation);
                      setIsDetailsOpen(true);
                    }}
                  >
                    <Eye className="w-4 h-4 mr-1" />
                    Details
                  </Button>
                  
                  {consultation.status === 'scheduled' && (
                    <Button variant="healing" size="sm">
                      <Video className="w-4 h-4 mr-1" />
                      Start
                    </Button>
                  )}
                </div>
              </div>

              {consultation.symptoms.length > 0 && (
                <div className="mt-4 pt-4 border-t">
                  <div className="flex flex-wrap gap-1">
                    <span className="text-sm text-muted-foreground mr-2">Symptoms:</span>
                    {consultation.symptoms.map((symptom, index) => (
                      <Badge key={index} variant="secondary" className="text-xs">
                        {symptom}
                      </Badge>
                    ))}
                  </div>
                </div>
              )}
            </Card>
          ))}
        </div>

        {/* Consultation Details Dialog */}
        <Dialog open={isDetailsOpen} onOpenChange={setIsDetailsOpen}>
          <DialogContent className="max-w-4xl max-h-[80vh] overflow-y-auto">
            <DialogHeader>
              <DialogTitle>
                Consultation Details - {selectedConsultation?.patientName}
              </DialogTitle>
            </DialogHeader>
            
            {selectedConsultation && (
              <Tabs defaultValue="overview" className="space-y-4">
                <TabsList>
                  <TabsTrigger value="overview">Overview</TabsTrigger>
                  <TabsTrigger value="diagnosis">Diagnosis & Treatment</TabsTrigger>
                  <TabsTrigger value="prescription">Prescription</TabsTrigger>
                </TabsList>

                <TabsContent value="overview" className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label>Patient</Label>
                      <p className="font-medium">{selectedConsultation.patientName}</p>
                    </div>
                    <div className="space-y-2">
                      <Label>Consultation ID</Label>
                      <p className="font-medium">{selectedConsultation.id}</p>
                    </div>
                    <div className="space-y-2">
                      <Label>Date & Time</Label>
                      <p className="font-medium">
                        {formatDate(selectedConsultation.date)} at {selectedConsultation.time}
                      </p>
                    </div>
                    <div className="space-y-2">
                      <Label>Duration</Label>
                      <p className="font-medium">{selectedConsultation.duration} minutes</p>
                    </div>
                    <div className="space-y-2">
                      <Label>Type</Label>
                      <p className="font-medium capitalize">{selectedConsultation.type.replace('-', ' ')}</p>
                    </div>
                    <div className="space-y-2">
                      <Label>Status</Label>
                      <Badge className={getStatusColor(selectedConsultation.status)}>
                        {selectedConsultation.status}
                      </Badge>
                    </div>
                  </div>

                  {selectedConsultation.symptoms.length > 0 && (
                    <div className="space-y-2">
                      <Label>Symptoms</Label>
                      <div className="flex flex-wrap gap-1">
                        {selectedConsultation.symptoms.map((symptom, index) => (
                          <Badge key={index} variant="outline">
                            {symptom}
                          </Badge>
                        ))}
                      </div>
                    </div>
                  )}

                  {selectedConsultation.notes && (
                    <div className="space-y-2">
                      <Label>Notes</Label>
                      <p className="text-sm bg-muted p-3 rounded-lg">
                        {selectedConsultation.notes}
                      </p>
                    </div>
                  )}
                </TabsContent>

                <TabsContent value="diagnosis" className="space-y-4">
                  {selectedConsultation.diagnosis ? (
                    <div className="space-y-4">
                      <div className="space-y-2">
                        <Label>Diagnosis</Label>
                        <p className="bg-muted p-3 rounded-lg">
                          {selectedConsultation.diagnosis}
                        </p>
                      </div>
                      
                      {selectedConsultation.treatment && (
                        <div className="space-y-2">
                          <Label>Treatment Plan</Label>
                          <p className="bg-muted p-3 rounded-lg">
                            {selectedConsultation.treatment}
                          </p>
                        </div>
                      )}

                      {selectedConsultation.followUpDate && (
                        <div className="space-y-2">
                          <Label>Follow-up Date</Label>
                          <p className="font-medium">
                            {formatDate(selectedConsultation.followUpDate)}
                          </p>
                        </div>
                      )}
                    </div>
                  ) : (
                    <p className="text-muted-foreground text-center py-8">
                      No diagnosis information available for this consultation.
                    </p>
                  )}
                </TabsContent>

                <TabsContent value="prescription" className="space-y-4">
                  {selectedConsultation.prescription ? (
                    <div className="space-y-2">
                      <Label>Prescription Details</Label>
                      <div className="bg-muted p-4 rounded-lg">
                        <pre className="whitespace-pre-wrap text-sm">
                          {selectedConsultation.prescription}
                        </pre>
                      </div>
                    </div>
                  ) : (
                    <p className="text-muted-foreground text-center py-8">
                      No prescription available for this consultation.
                    </p>
                  )}
                </TabsContent>
              </Tabs>
            )}
          </DialogContent>
        </Dialog>

        {filteredConsultations.length === 0 && (
          <Card className="p-12 text-center">
            <Calendar className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
            <h3 className="text-lg font-semibold mb-2">No consultations found</h3>
            <p className="text-muted-foreground mb-4">
              {filterStatus !== 'all' || filterDate 
                ? "Try adjusting your filters" 
                : "Schedule your first consultation to get started"}
            </p>
            <Button variant="healing" onClick={() => setIsScheduleOpen(true)}>
              <Plus className="w-4 h-4 mr-2" />
              Schedule Consultation
            </Button>
          </Card>
        )}
      </div>
    </div>
  );
};

export default Consultations;