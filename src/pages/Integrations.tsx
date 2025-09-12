import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { 
  Building2, 
  Database, 
  Shield, 
  Zap, 
  Cloud, 
  Users, 
  Activity,
  FileText,
  Settings,
  CheckCircle,
  AlertCircle,
  ExternalLink,
  Lock,
  Globe,
  Smartphone,
  Heart
} from "lucide-react";

const Integrations = () => {
  const ehrSystems = [
    {
      name: "Epic MyChart",
      description: "Seamless integration with Epic's patient portal system",
      status: "Available",
      features: ["Patient Data Sync", "Appointment Integration", "Billing Integration"],
      compliance: ["HIPAA", "HL7 FHIR"]
    },
    {
      name: "Cerner PowerChart",
      description: "Native integration with Cerner's clinical information system",
      status: "In Development", 
      features: ["Clinical Documentation", "Order Management", "Results Integration"],
      compliance: ["HIPAA", "IHE"]
    },
    {
      name: "Allscripts",
      description: "Bi-directional data exchange with Allscripts EHR",
      status: "Planned",
      features: ["Chart Integration", "Medication Sync", "Lab Results"],
      compliance: ["HIPAA", "HL7 CDA"]
    }
  ];

  const apiEndpoints = [
    {
      endpoint: "/api/v1/patients",
      method: "GET/POST",
      description: "Patient profile management and creation",
      authentication: "OAuth 2.0 + JWT"
    },
    {
      endpoint: "/api/v1/diet-charts",
      method: "GET/POST/PUT", 
      description: "Diet chart generation and modification",
      authentication: "API Key + OAuth"
    },
    {
      endpoint: "/api/v1/reports",
      method: "GET",
      description: "Analytics and reporting data export",
      authentication: "OAuth 2.0"
    },
    {
      endpoint: "/api/v1/webhooks",
      method: "POST",
      description: "Real-time event notifications",
      authentication: "HMAC Signature"
    }
  ];

  const communityNetworks = [
    {
      name: "International Ayurveda Research Network",
      members: "2,400+ researchers",
      focus: "Clinical research and evidence validation",
      icon: Activity
    },
    {
      name: "Digital Health Ayurveda Consortium", 
      members: "850+ practitioners",
      focus: "Technology adoption and best practices",
      icon: Smartphone
    },
    {
      name: "Ayurvedic Nutrition Society",
      members: "5,600+ professionals",
      focus: "Nutritional guidelines and protocols",
      icon: Heart
    }
  ];

  const complianceStandards = [
    "HIPAA (Health Insurance Portability and Accountability Act)",
    "HL7 FHIR (Fast Healthcare Interoperability Resources)", 
    "IHE (Integrating the Healthcare Enterprise)",
    "GDPR (General Data Protection Regulation)",
    "SOC 2 Type II (Security, Availability, Processing Integrity)",
    "ISO 27001 (Information Security Management)"
  ];

  return (
    <div className="min-h-screen p-4">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-foreground mb-4">
            EHR/HIS Integration & Devices
          </h1>
          <p className="text-lg text-muted-foreground">
            Standards-ready APIs and community networks for seamless healthcare integration
          </p>
        </div>

        {/* Status Banner */}
        <Card className="p-6 mb-8 bg-gradient-to-r from-wisdom/10 to-primary/10 border border-primary/20">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 bg-gradient-healing rounded-full flex items-center justify-center">
              <AlertCircle className="w-6 h-6 text-primary-foreground" />
            </div>
            <div className="flex-1">
              <h3 className="text-lg font-semibold text-foreground mb-1">
                Integration Status Notice
              </h3>
              <p className="text-muted-foreground">
                These integrations are currently in various stages of development. Contact our team 
                for specific implementation timelines and custom integration requirements.
              </p>
            </div>
            <Badge variant="outline" className="bg-primary/10">
              <Building2 className="w-3 h-3 mr-1" />
              Enterprise Ready
            </Badge>
          </div>
        </Card>

        {/* Integration Tabs */}
        <Tabs defaultValue="ehr" className="space-y-6">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="ehr">EHR Systems</TabsTrigger>
            <TabsTrigger value="api">API Standards</TabsTrigger>
            <TabsTrigger value="community">Community</TabsTrigger>
            <TabsTrigger value="compliance">Compliance</TabsTrigger>
          </TabsList>

          {/* EHR Systems Tab */}
          <TabsContent value="ehr" className="space-y-6">
            <div className="space-y-6">
              {ehrSystems.map((ehr, index) => (
                <Card key={index} className="p-6 shadow-card hover:shadow-healing transition-all duration-300">
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex-1">
                      <div className="flex items-center gap-3 mb-2">
                        <h3 className="text-xl font-semibold text-foreground">{ehr.name}</h3>
                        <Badge 
                          variant={ehr.status === 'Available' ? 'default' : ehr.status === 'In Development' ? 'secondary' : 'outline'}
                          className={ehr.status === 'Available' ? 'bg-primary/10 text-primary' : ''}
                        >
                          {ehr.status}
                        </Badge>
                      </div>
                      <p className="text-muted-foreground mb-4">{ehr.description}</p>
                    </div>
                    
                    <div className="w-12 h-12 bg-gradient-healing rounded-full flex items-center justify-center">
                      <Database className="w-6 h-6 text-primary-foreground" />
                    </div>
                  </div>

                  <div className="grid md:grid-cols-2 gap-6">
                    <div>
                      <h4 className="font-medium text-foreground mb-2">Integration Features</h4>
                      <div className="space-y-1">
                        {ehr.features.map((feature, featureIndex) => (
                          <div key={featureIndex} className="flex items-center gap-2 text-sm">
                            <CheckCircle className="w-3 h-3 text-primary" />
                            <span className="text-muted-foreground">{feature}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                    
                    <div>
                      <h4 className="font-medium text-foreground mb-2">Compliance Standards</h4>
                      <div className="flex flex-wrap gap-1">
                        {ehr.compliance.map((standard, standardIndex) => (
                          <Badge key={standardIndex} variant="outline" className="text-xs">
                            {standard}
                          </Badge>
                        ))}
                      </div>
                    </div>
                  </div>

                  <div className="flex gap-3 mt-6">
                    <Button 
                      variant={ehr.status === 'Available' ? 'healing' : 'outline'}
                      disabled={ehr.status !== 'Available'}
                    >
                      {ehr.status === 'Available' ? 'Configure Integration' : 'Request Access'}
                    </Button>
                    <Button variant="outline">
                      <FileText className="w-4 h-4 mr-2" />
                      Documentation
                    </Button>
                  </div>
                </Card>
              ))}
            </div>
          </TabsContent>

          {/* API Standards Tab */}
          <TabsContent value="api" className="space-y-6">
            <Card className="p-6 shadow-card">
              <h2 className="text-xl font-semibold text-foreground mb-6 flex items-center gap-2">
                <Zap className="w-5 h-5 text-primary" />
                RESTful API Endpoints
              </h2>

              <div className="space-y-4">
                {apiEndpoints.map((api, index) => (
                  <div key={index} className="p-4 rounded-lg border border-border hover:bg-muted/30 transition-colors">
                    <div className="flex items-center justify-between mb-2">
                      <div className="flex items-center gap-3">
                        <Badge variant="outline" className="font-mono text-xs bg-primary/10">
                          {api.method}
                        </Badge>
                        <code className="text-sm font-mono text-foreground">{api.endpoint}</code>
                      </div>
                      <Button variant="outline" size="sm">
                        <ExternalLink className="w-3 h-3 mr-1" />
                        Test
                      </Button>
                    </div>
                    
                    <p className="text-sm text-muted-foreground mb-2">{api.description}</p>
                    
                    <div className="flex items-center gap-2">
                      <Lock className="w-3 h-3 text-primary" />
                      <span className="text-xs text-muted-foreground">{api.authentication}</span>
                    </div>
                  </div>
                ))}
              </div>

              <div className="mt-6 p-4 bg-muted/30 rounded-lg">
                <h4 className="font-medium text-foreground mb-2">API Documentation</h4>
                <p className="text-sm text-muted-foreground mb-3">
                  Comprehensive API documentation with examples, SDKs, and integration guides
                </p>
                <div className="flex gap-2">
                  <Button variant="outline" size="sm">
                    <FileText className="w-3 h-3 mr-1" />
                    API Docs
                  </Button>
                  <Button variant="outline" size="sm">
                    <Zap className="w-3 h-3 mr-1" />
                    Postman Collection
                  </Button>
                  <Button variant="outline" size="sm">
                    <Settings className="w-3 h-3 mr-1" />
                    SDK Downloads
                  </Button>
                </div>
              </div>
            </Card>

            <Card className="p-6 shadow-card">
              <h2 className="text-xl font-semibold text-foreground mb-4">
                Technical Specifications
              </h2>
              
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <h4 className="font-medium text-foreground mb-2">Protocol Support</h4>
                  <div className="space-y-1 text-sm text-muted-foreground">
                    <div>• REST API with JSON payloads</div>
                    <div>• WebSocket for real-time updates</div>
                    <div>• GraphQL for flexible queries</div>
                    <div>• FHIR R4 for healthcare data</div>
                  </div>
                </div>
                
                <div>
                  <h4 className="font-medium text-foreground mb-2">Security Features</h4>
                  <div className="space-y-1 text-sm text-muted-foreground">
                    <div>• OAuth 2.0 / OpenID Connect</div>
                    <div>• TLS 1.3 encryption in transit</div>
                    <div>• AES-256 encryption at rest</div>
                    <div>• Rate limiting & DDoS protection</div>
                  </div>
                </div>
              </div>
            </Card>
          </TabsContent>

          {/* Community Tab */}
          <TabsContent value="community" className="space-y-6">
            <div className="space-y-6">
              {communityNetworks.map((network, index) => (
                <Card key={index} className="p-6 shadow-card hover:shadow-healing transition-all duration-300">
                  <div className="flex items-center gap-4 mb-4">
                    <div className="w-12 h-12 bg-gradient-healing rounded-full flex items-center justify-center">
                      <network.icon className="w-6 h-6 text-primary-foreground" />
                    </div>
                    <div className="flex-1">
                      <h3 className="text-xl font-semibold text-foreground mb-1">
                        {network.name}
                      </h3>
                      <div className="flex items-center gap-4 text-sm text-muted-foreground">
                        <span className="flex items-center gap-1">
                          <Users className="w-3 h-3" />
                          {network.members}
                        </span>
                        <span>•</span>
                        <span>{network.focus}</span>
                      </div>
                    </div>
                    <Button variant="outline">
                      <Globe className="w-4 h-4 mr-2" />
                      Join Network
                    </Button>
                  </div>
                </Card>
              ))}
            </div>

            <Card className="p-6 shadow-card">
              <h2 className="text-xl font-semibold text-foreground mb-4">
                Community Benefits
              </h2>
              
              <div className="grid md:grid-cols-2 gap-6">
                <div className="space-y-3">
                  <h4 className="font-medium text-foreground">For Practitioners</h4>
                  <div className="space-y-2 text-sm text-muted-foreground">
                    <div>• Access to clinical research and case studies</div>
                    <div>• Best practice sharing and guidelines</div>
                    <div>• Continuing education opportunities</div>
                    <div>• Peer consultation and support</div>
                  </div>
                </div>
                
                <div className="space-y-3">
                  <h4 className="font-medium text-foreground">For Researchers</h4>
                  <div className="space-y-2 text-sm text-muted-foreground">
                    <div>• Collaborative research opportunities</div>
                    <div>• Access to anonymized clinical data</div>
                    <div>• Publication and dissemination support</div>
                    <div>• Grant funding information</div>
                  </div>
                </div>
              </div>
            </Card>
          </TabsContent>

          {/* Compliance Tab */}
          <TabsContent value="compliance" className="space-y-6">
            <Card className="p-6 shadow-card">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-12 h-12 bg-gradient-healing rounded-full flex items-center justify-center">
                  <Shield className="w-6 h-6 text-primary-foreground" />
                </div>
                <div>
                  <h2 className="text-xl font-semibold text-foreground">
                    Security & Compliance Standards
                  </h2>
                  <p className="text-muted-foreground">
                    Enterprise-grade security meeting healthcare industry requirements
                  </p>
                </div>
              </div>

              <div className="space-y-3 mb-6">
                {complianceStandards.map((standard, index) => (
                  <div key={index} className="flex items-center gap-3 p-3 rounded-lg bg-muted/30">
                    <CheckCircle className="w-4 h-4 text-primary" />
                    <span className="text-foreground">{standard}</span>
                  </div>
                ))}
              </div>

              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <h4 className="font-medium text-foreground mb-3">Data Protection</h4>
                  <div className="space-y-2 text-sm text-muted-foreground">
                    <div>• End-to-end encryption of patient data</div>
                    <div>• Role-based access controls (RBAC)</div>
                    <div>• Audit logging for all data access</div>
                    <div>• Regular security assessments</div>
                  </div>
                </div>
                
                <div>
                  <h4 className="font-medium text-foreground mb-3">Infrastructure Security</h4>
                  <div className="space-y-2 text-sm text-muted-foreground">
                    <div>• AWS/Azure secure cloud infrastructure</div>
                    <div>• Multi-factor authentication (MFA)</div>
                    <div>• Intrusion detection and prevention</div>
                    <div>• 24/7 security monitoring</div>
                  </div>
                </div>
              </div>
            </Card>

            <Card className="p-6 shadow-card">
              <h3 className="text-lg font-semibold text-foreground mb-4">
                Compliance Documentation
              </h3>
              
              <div className="space-y-3">
                {[
                  "HIPAA Business Associate Agreement (BAA)",
                  "SOC 2 Type II Compliance Report",
                  "GDPR Data Processing Agreement (DPA)", 
                  "Security Architecture Documentation",
                  "Penetration Testing Results",
                  "Risk Assessment and Mitigation Plan"
                ].map((doc, index) => (
                  <div key={index} className="flex items-center justify-between p-3 rounded-lg border border-border">
                    <span className="text-foreground">{doc}</span>
                    <Button variant="outline" size="sm">
                      <FileText className="w-3 h-3 mr-1" />
                      Download
                    </Button>
                  </div>
                ))}
              </div>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default Integrations;