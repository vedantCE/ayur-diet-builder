import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { 
  Smartphone, 
  Database, 
  Brain, 
  Cloud, 
  Calendar,
  CheckCircle,
  Clock,
  Zap
} from "lucide-react";

const IntegrationRoadmap = () => {
  const roadmapItems = [
    {
      title: "HIS/EHR Integration",
      description: "Seamless integration with Hospital Information Systems and Electronic Health Records",
      timeline: "Q2 2024",
      status: "planned",
      icon: Database,
      features: ["HL7 FHIR compliance", "Real-time data sync", "Patient record integration"]
    },
    {
      title: "AI Food Classifier",
      description: "Computer vision for automatic food recognition and nutritional analysis",
      timeline: "Q3 2024", 
      status: "development",
      icon: Brain,
      features: ["Image recognition", "Portion estimation", "Real-time analysis"]
    },
    {
      title: "Mobile Application",
      description: "Native iOS and Android apps for patients and practitioners",
      timeline: "Q4 2024",
      status: "planned",
      icon: Smartphone,
      features: ["Offline support", "Push notifications", "Meal tracking"]
    },
    {
      title: "Advanced Analytics",
      description: "Machine learning insights for population health and treatment outcomes",
      timeline: "Q1 2025",
      status: "research",
      icon: Zap,
      features: ["Predictive analytics", "Treatment optimization", "Population insights"]
    }
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'completed': return 'bg-green-100 text-green-800';
      case 'development': return 'bg-blue-100 text-blue-800';
      case 'planned': return 'bg-yellow-100 text-yellow-800';
      case 'research': return 'bg-purple-100 text-purple-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'completed': return CheckCircle;
      case 'development': return Zap;
      case 'planned': return Calendar;
      case 'research': return Clock;
      default: return Clock;
    }
  };

  return (
    <div className="min-h-screen py-12 px-4">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-12">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-healing rounded-full shadow-healing mb-6">
            <Cloud className="w-8 h-8 text-primary-foreground" />
          </div>
          <h1 className="text-4xl font-bold text-foreground mb-4">
            Integration Roadmap
          </h1>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Future enhancements and integrations planned for the Ayurvedic Diet Builder platform
          </p>
        </div>

        <div className="space-y-8">
          {roadmapItems.map((item, index) => {
            const StatusIcon = getStatusIcon(item.status);
            const ItemIcon = item.icon;
            
            return (
              <Card key={index} className="p-8 shadow-card hover:shadow-md transition-shadow">
                <div className="grid md:grid-cols-3 gap-6">
                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 bg-gradient-healing rounded-full flex items-center justify-center">
                      <ItemIcon className="w-6 h-6 text-primary-foreground" />
                    </div>
                    <div>
                      <h3 className="text-xl font-semibold text-foreground mb-2">
                        {item.title}
                      </h3>
                      <p className="text-muted-foreground text-sm">
                        {item.description}
                      </p>
                    </div>
                  </div>

                  <div className="space-y-3">
                    <div className="flex items-center gap-2">
                      <StatusIcon className="w-4 h-4" />
                      <Badge className={getStatusColor(item.status)}>
                        {item.status.charAt(0).toUpperCase() + item.status.slice(1)}
                      </Badge>
                    </div>
                    <div className="text-sm text-muted-foreground">
                      <strong>Timeline:</strong> {item.timeline}
                    </div>
                  </div>

                  <div>
                    <h4 className="font-medium mb-3">Key Features</h4>
                    <ul className="space-y-2">
                      {item.features.map((feature, idx) => (
                        <li key={idx} className="flex items-center gap-2 text-sm">
                          <div className="w-1.5 h-1.5 bg-primary rounded-full"></div>
                          {feature}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </Card>
            );
          })}
        </div>

        <Card className="p-8 mt-12 bg-gradient-earth">
          <div className="text-center">
            <h2 className="text-2xl font-bold text-foreground mb-4">
              API Integration Capabilities
            </h2>
            <p className="text-muted-foreground mb-6 max-w-2xl mx-auto">
              Our platform is designed with modern API-first architecture to support seamless integrations
            </p>
            
            <div className="grid md:grid-cols-3 gap-6 text-left">
              <div className="space-y-2">
                <h3 className="font-semibold">Healthcare Standards</h3>
                <ul className="text-sm text-muted-foreground space-y-1">
                  <li>• HL7 FHIR R4</li>
                  <li>• DICOM integration</li>
                  <li>• ICD-10 coding</li>
                </ul>
              </div>
              
              <div className="space-y-2">
                <h3 className="font-semibold">Cloud Infrastructure</h3>
                <ul className="text-sm text-muted-foreground space-y-1">
                  <li>• AWS native services</li>
                  <li>• Auto-scaling architecture</li>
                  <li>• Multi-region deployment</li>
                </ul>
              </div>
              
              <div className="space-y-2">
                <h3 className="font-semibold">Security & Compliance</h3>
                <ul className="text-sm text-muted-foreground space-y-1">
                  <li>• HIPAA compliant</li>
                  <li>• End-to-end encryption</li>
                  <li>• Audit logging</li>
                </ul>
              </div>
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
};

export default IntegrationRoadmap;