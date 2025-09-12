import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { 
  Smartphone, 
  Tablet, 
  Monitor, 
  Download, 
  QrCode,
  Apple,
  PlayCircle,
  Users,
  MessageSquare,
  Bell,
  Heart,
  Activity,
  Calendar
} from "lucide-react";

const Mobile = () => {
  const deviceFrames = [
    {
      name: "Mobile App - Patient Portal",
      type: "mobile",
      features: ["Diet Chart Access", "Progress Tracking", "Medication Reminders", "Chat Support"],
      users: "12,000+ downloads"
    },
    {
      name: "Tablet App - Practitioner Dashboard", 
      type: "tablet",
      features: ["Patient Management", "Chart Creation", "Analytics", "Consultations"],
      users: "3,500+ healthcare providers"
    },
    {
      name: "Web Portal - Admin Dashboard",
      type: "desktop", 
      features: ["System Management", "Reporting", "User Management", "Integration Settings"],
      users: "850+ healthcare facilities"
    }
  ];

  const mobileFeatures = [
    {
      icon: Heart,
      title: "Health Tracking",
      description: "Real-time monitoring of vitals and wellness metrics"
    },
    {
      icon: Calendar,
      title: "Appointment Scheduling", 
      description: "Seamless booking and consultation management"
    },
    {
      icon: MessageSquare,
      title: "Telemedicine",
      description: "Virtual consultations with Ayurvedic practitioners"
    },
    {
      icon: Bell,
      title: "Smart Notifications",
      description: "Personalized reminders for diet and medication"
    },
    {
      icon: Activity,
      title: "Progress Analytics",
      description: "Visual insights into health improvements"
    },
    {
      icon: Users,
      title: "Community Support",
      description: "Connect with others on similar wellness journeys"
    }
  ];

  return (
    <div className="min-h-screen p-4">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-foreground mb-4">
            Mobile & Tablet Support
          </h1>
          <p className="text-lg text-muted-foreground">
            React Native app ecosystem with patient portal and practitioner dashboard
          </p>
        </div>

        {/* Platform Overview */}
        <div className="grid lg:grid-cols-3 gap-6 mb-8">
          {deviceFrames.map((device, index) => (
            <Card key={index} className="p-6 shadow-card hover:shadow-healing transition-all duration-300">
              <div className="text-center mb-6">
                <div className="w-16 h-16 mx-auto mb-4 bg-gradient-healing rounded-full flex items-center justify-center">
                  {device.type === 'mobile' && <Smartphone className="w-8 h-8 text-primary-foreground" />}
                  {device.type === 'tablet' && <Tablet className="w-8 h-8 text-primary-foreground" />}
                  {device.type === 'desktop' && <Monitor className="w-8 h-8 text-primary-foreground" />}
                </div>
                
                <h3 className="text-lg font-semibold text-foreground mb-2">
                  {device.name}
                </h3>
                
                <Badge variant="outline" className="bg-primary/10 mb-4">
                  {device.users}
                </Badge>
              </div>

              <div className="space-y-2 mb-6">
                {device.features.map((feature, featureIndex) => (
                  <div key={featureIndex} className="flex items-center gap-2 text-sm">
                    <div className="w-1.5 h-1.5 bg-primary rounded-full" />
                    <span className="text-muted-foreground">{feature}</span>
                  </div>
                ))}
              </div>

              <Button variant="outline" className="w-full">
                <Monitor className="w-4 h-4 mr-2" />
                Preview {device.type === 'mobile' ? 'Mobile' : device.type === 'tablet' ? 'Tablet' : 'Web'} View
              </Button>
            </Card>
          ))}
        </div>

        {/* Mock Device Frames */}
        <Card className="p-8 mb-8 bg-gradient-to-br from-muted/20 to-background">
          <h2 className="text-2xl font-bold text-foreground mb-6 text-center">
            Device Preview Gallery
          </h2>
          
          <div className="flex justify-center items-end gap-8 mb-6">
            {/* Mobile Frame */}
            <div className="relative">
              <div className="w-64 h-96 bg-card border-4 border-border rounded-3xl shadow-healing overflow-hidden">
                <div className="h-6 bg-gradient-healing flex items-center justify-center">
                  <div className="w-12 h-1 bg-primary-foreground rounded-full" />
                </div>
                <div className="p-4 h-full bg-gradient-to-b from-background to-muted/20">
                  <div className="text-center mb-4">
                    <div className="w-8 h-8 bg-gradient-healing rounded-full mx-auto mb-2" />
                    <h4 className="text-sm font-semibold">Patient Portal</h4>
                  </div>
                  <div className="space-y-2">
                    <div className="h-3 bg-primary/20 rounded" />
                    <div className="h-3 bg-wisdom/20 rounded w-3/4" />
                    <div className="h-3 bg-earth/20 rounded w-1/2" />
                  </div>
                </div>
              </div>
              <p className="text-center text-sm text-muted-foreground mt-2">Mobile App</p>
            </div>

            {/* Tablet Frame */}
            <div className="relative">
              <div className="w-80 h-64 bg-card border-4 border-border rounded-2xl shadow-healing overflow-hidden">
                <div className="h-4 bg-gradient-wisdom" />
                <div className="p-4 h-full bg-gradient-to-b from-background to-muted/20">
                  <div className="flex items-center gap-2 mb-3">
                    <div className="w-6 h-6 bg-gradient-wisdom rounded" />
                    <h4 className="text-sm font-semibold">Practitioner Dashboard</h4>
                  </div>
                  <div className="grid grid-cols-3 gap-2">
                    <div className="h-8 bg-primary/20 rounded" />
                    <div className="h-8 bg-wisdom/20 rounded" />
                    <div className="h-8 bg-earth/20 rounded" />
                  </div>
                </div>
              </div>
              <p className="text-center text-sm text-muted-foreground mt-2">Tablet App</p>
            </div>
          </div>

          {/* App Store Links */}
          <div className="flex justify-center gap-4">
            <Button variant="outline" className="flex items-center gap-2">
              <Apple className="w-4 h-4" />
              Download on App Store
            </Button>
            <Button variant="outline" className="flex items-center gap-2">
              <PlayCircle className="w-4 h-4" />
              Get it on Google Play
            </Button>
          </div>
        </Card>

        {/* Mobile Features Grid */}
        <div className="mb-8">
          <h2 className="text-2xl font-bold text-foreground mb-6 text-center">
            Mobile Application Features
          </h2>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {mobileFeatures.map((feature, index) => (
              <Card key={index} className="p-6 shadow-card hover:shadow-healing transition-all duration-300 text-center">
                <div className="w-12 h-12 bg-gradient-healing rounded-full flex items-center justify-center mx-auto mb-4">
                  <feature.icon className="w-6 h-6 text-primary-foreground" />
                </div>
                
                <h3 className="text-lg font-semibold text-foreground mb-2">
                  {feature.title}
                </h3>
                
                <p className="text-muted-foreground text-sm">
                  {feature.description}
                </p>
              </Card>
            ))}
          </div>
        </div>

        {/* QR Code Section */}
        <Card className="p-8 text-center shadow-card">
          <div className="max-w-md mx-auto">
            <div className="w-32 h-32 bg-gradient-healing rounded-2xl flex items-center justify-center mx-auto mb-6">
              <QrCode className="w-16 h-16 text-primary-foreground" />
            </div>
            
            <h3 className="text-xl font-semibold text-foreground mb-4">
              Quick Access via QR Code
            </h3>
            
            <p className="text-muted-foreground mb-6">
              Scan this QR code with your mobile device to quickly access the patient portal 
              or practitioner dashboard
            </p>

            <div className="flex gap-4 justify-center">
              <Button variant="healing">
                <Download className="w-4 h-4 mr-2" />
                Download QR Code
              </Button>
              <Button variant="outline">
                <Smartphone className="w-4 h-4 mr-2" />
                Open Mobile View
              </Button>
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
};

export default Mobile;