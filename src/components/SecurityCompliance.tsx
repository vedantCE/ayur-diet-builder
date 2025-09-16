import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Shield, Lock, Eye, FileCheck, AlertTriangle } from "lucide-react";

const SecurityCompliance = () => {
  const complianceFeatures = [
    {
      title: "Data Encryption",
      description: "All patient data encrypted at rest and in transit",
      icon: Lock,
      status: "Active",
      color: "bg-primary/10"
    },
    {
      title: "Access Control",
      description: "Role-based access with audit logging",
      icon: Eye,
      status: "Active", 
      color: "bg-wisdom/10"
    },
    {
      title: "HIPAA Compliance",
      description: "Healthcare data privacy standards",
      icon: Shield,
      status: "Compliant",
      color: "bg-earth/10"
    },
    {
      title: "Data Backup",
      description: "Automated secure backup and recovery",
      icon: FileCheck,
      status: "Active",
      color: "bg-primary/10"
    }
  ];

  return (
    <Card className="p-6 shadow-card bg-gradient-to-r from-primary/5 to-wisdom/5 border border-primary/20">
      <div className="flex items-center gap-3 mb-4">
        <div className="w-10 h-10 bg-gradient-healing rounded-full flex items-center justify-center">
          <Shield className="w-5 h-5 text-primary-foreground" />
        </div>
        <div>
          <h3 className="text-lg font-semibold text-foreground">
            Security & Compliance
          </h3>
          <p className="text-sm text-muted-foreground">
            Healthcare data protection standards
          </p>
        </div>
      </div>

      <div className="grid md:grid-cols-2 gap-4 mb-4">
        {complianceFeatures.map((feature, index) => {
          const Icon = feature.icon;
          return (
            <div key={index} className="flex items-center gap-3 p-3 bg-background/50 rounded-lg">
              <div className={`w-8 h-8 ${feature.color} rounded-full flex items-center justify-center`}>
                <Icon className="w-4 h-4 text-primary" />
              </div>
              <div className="flex-1">
                <div className="flex items-center gap-2 mb-1">
                  <span className="font-medium text-foreground text-sm">{feature.title}</span>
                  <Badge variant="outline" className="text-xs bg-primary/10">
                    {feature.status}
                  </Badge>
                </div>
                <p className="text-xs text-muted-foreground">{feature.description}</p>
              </div>
            </div>
          );
        })}
      </div>

      <div className="flex items-start gap-2 p-3 bg-amber-50 border border-amber-200 rounded-lg">
        <AlertTriangle className="w-4 h-4 text-amber-600 mt-0.5" />
        <div className="text-xs text-amber-800">
          <strong>Demo Notice:</strong> This is a demonstration environment. 
          In production, full HIPAA compliance, data encryption, and audit logging would be implemented.
        </div>
      </div>
    </Card>
  );
};

export default SecurityCompliance;