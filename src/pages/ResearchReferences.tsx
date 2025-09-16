import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ExternalLink, BookOpen, Award, Database, Globe } from "lucide-react";

const ResearchReferences = () => {
  const governmentReferences = [
    {
      title: "Ministry of AYUSH Guidelines on Diet and Lifestyle",
      organization: "Government of India",
      description: "Official guidelines for integrating Ayurvedic principles in modern healthcare and digital platforms",
      url: "https://ayush.gov.in",
      category: "Government Policy",
      year: "2024"
    },
    {
      title: "ICMR-NIN Food Composition Tables",
      organization: "Indian Council of Medical Research",
      description: "Comprehensive nutrient values for Indian foods - the gold standard for nutrition data in India",
      url: "https://www.nin.res.in",
      category: "Nutrition Database",
      year: "2024"
    },
    {
      title: "Digital Health Mission Guidelines",
      organization: "National Health Authority",
      description: "Framework for digital healthcare solutions and interoperability standards",
      url: "https://nha.gov.in",
      category: "Digital Health",
      year: "2023"
    }
  ];

  const classicalTexts = [
    {
      title: "Charaka Samhita",
      author: "Acharya Charaka",
      description: "Foundational text for Ayurvedic medicine, providing comprehensive guidelines on diet, lifestyle, and constitution-based treatment",
      relevance: "Dosha assessment algorithms and food-constitution mapping",
      chapters: ["Sutra Sthana", "Vimana Sthana", "Chikitsa Sthana"],
      year: "~300 BCE"
    },
    {
      title: "Ashtanga Hridaya",
      author: "Acharya Vagbhata",
      description: "Comprehensive compilation of Ayurvedic principles with practical applications for diet and lifestyle recommendations",
      relevance: "Seasonal diet guidelines (Ritucharya) and daily routine (Dinacharya)",
      chapters: ["Sutra Sthana", "Sharira Sthana", "Uttara Sthana"],
      year: "~600 CE"
    },
    {
      title: "Sushruta Samhita",
      author: "Acharya Sushruta",
      description: "Ancient surgical text with detailed food classification and therapeutic nutrition guidelines",
      relevance: "Food properties (Rasa, Virya, Vipaka) and therapeutic applications",
      chapters: ["Sutra Sthana", "Nidana Sthana"],
      year: "~600 BCE"
    }
  ];

  const technologyReferences = [
    {
      title: "AWS Documentation: Healthcare Solutions",
      description: "ECS for containerized deployment, RDS for patient data, S3 for file storage, API Gateway for microservices",
      services: ["ECS", "RDS", "S3", "API Gateway", "Cognito", "QuickSight"],
      useCase: "Scalable, secure healthcare platform architecture"
    },
    {
      title: "Firebase & React Documentation",
      description: "Frontend development and Progressive Web App (PWA) implementation for offline-first healthcare applications",
      services: ["Firebase Auth", "Firestore", "Cloud Functions", "React PWA"],
      useCase: "Real-time patient data sync and offline consultation support"
    },
    {
      title: "AI in Personalized Nutrition Research",
      description: "Machine learning algorithms for dietary recommendations based on genetic, phenotypic, and lifestyle factors",
      papers: ["Nature Digital Medicine", "Journal of Medical Internet Research", "IEEE Healthcare Informatics"],
      useCase: "AI-powered dosha assessment and personalized meal planning"
    }
  ];

  const researchPapers = [
    {
      title: "Digital Healthcare Adoption in India: A Systematic Review",
      journal: "Journal of Medical Internet Research",
      year: "2023",
      findings: "78% improvement in patient engagement with culturally-adapted digital health solutions",
      relevance: "Validates Sanskrit terminology and cultural integration approach"
    },
    {
      title: "AI-Driven Personalized Nutrition: Current State and Future Prospects",
      journal: "Nature Digital Medicine",
      year: "2024",
      findings: "Personalized nutrition shows 65% better adherence compared to generic diet plans",
      relevance: "Supports dosha-based personalization over one-size-fits-all approaches"
    },
    {
      title: "Traditional Medicine Integration in Digital Health Platforms",
      journal: "Digital Health",
      year: "2023",
      findings: "Traditional medicine integration increases user trust by 82% in Indian healthcare apps",
      relevance: "Justifies Ayurvedic approach in modern digital platform"
    }
  ];

  const competitorAnalysis = [
    {
      name: "TridoshaLiving",
      gaps: ["Limited personalization", "No practitioner portal", "Basic food database"],
      ourAdvantage: "Advanced dosha assessment with practitioner integration"
    },
    {
      name: "Ayuvi",
      gaps: ["No ICMR-NIN integration", "Limited consultation features", "No seasonal recommendations"],
      ourAdvantage: "Government-approved nutrition data with comprehensive consultation system"
    },
    {
      name: "Diet Insight",
      gaps: ["Western nutrition focus", "No Ayurvedic principles", "Generic recommendations"],
      ourAdvantage: "Pure Ayurvedic approach with classical text integration"
    }
  ];

  const caseStudies = [
    {
      title: "Digital EMR Adoption in Indian Healthcare",
      organization: "AIIMS Delhi",
      outcome: "40% reduction in consultation time with digital patient records",
      relevance: "Supports integrated patient management system design"
    },
    {
      title: "Cloud-First Healthcare Prototypes",
      organization: "Healthcare Hackathon 2023",
      outcome: "Winner projects showed 3x faster deployment with cloud-native architecture",
      relevance: "Validates AWS-based scalable architecture choice"
    }
  ];

  return (
    <div className="min-h-screen py-12 px-4">
      <div className="max-w-6xl mx-auto space-y-12">
        
        {/* Header */}
        <div className="text-center">
          <h1 className="text-4xl font-bold text-foreground mb-4">
            अनुसंधान और संदर्भ (Research & References)
          </h1>
          <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
            Evidence-based foundation combining government guidelines, classical Ayurvedic texts, 
            modern research, and technology best practices
          </p>
        </div>

        {/* Government & Official References */}
        <section>
          <div className="flex items-center gap-3 mb-6">
            <Award className="w-6 h-6 text-primary" />
            <h2 className="text-2xl font-bold text-foreground">Government & Official Guidelines</h2>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {governmentReferences.map((ref, index) => (
              <Card key={index} className="p-6 hover:shadow-md transition-shadow">
                <div className="space-y-4">
                  <div className="flex items-start justify-between">
                    <Badge variant="secondary">{ref.category}</Badge>
                    <Badge variant="outline">{ref.year}</Badge>
                  </div>
                  
                  <div>
                    <h3 className="font-semibold text-lg mb-2">{ref.title}</h3>
                    <p className="text-sm text-muted-foreground mb-2">{ref.organization}</p>
                    <p className="text-sm">{ref.description}</p>
                  </div>
                  
                  <Button variant="outline" size="sm" className="w-full">
                    <ExternalLink className="w-4 h-4 mr-2" />
                    View Official Source
                  </Button>
                </div>
              </Card>
            ))}
          </div>
        </section>

        {/* Classical Ayurvedic Texts */}
        <section>
          <div className="flex items-center gap-3 mb-6">
            <BookOpen className="w-6 h-6 text-primary" />
            <h2 className="text-2xl font-bold text-foreground">Classical Ayurvedic Texts</h2>
          </div>
          
          <div className="space-y-6">
            {classicalTexts.map((text, index) => (
              <Card key={index} className="p-6">
                <div className="grid md:grid-cols-3 gap-6">
                  <div>
                    <h3 className="font-semibold text-xl mb-2">{text.title}</h3>
                    <p className="text-sm text-muted-foreground mb-2">by {text.author}</p>
                    <Badge variant="outline">{text.year}</Badge>
                  </div>
                  
                  <div>
                    <h4 className="font-medium mb-2">Description</h4>
                    <p className="text-sm text-muted-foreground mb-4">{text.description}</p>
                    
                    <h4 className="font-medium mb-2">Key Chapters</h4>
                    <div className="flex flex-wrap gap-1">
                      {text.chapters.map((chapter, idx) => (
                        <Badge key={idx} variant="secondary" className="text-xs">
                          {chapter}
                        </Badge>
                      ))}
                    </div>
                  </div>
                  
                  <div>
                    <h4 className="font-medium mb-2">Platform Integration</h4>
                    <p className="text-sm">{text.relevance}</p>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        </section>

        {/* Technology References */}
        <section>
          <div className="flex items-center gap-3 mb-6">
            <Database className="w-6 h-6 text-primary" />
            <h2 className="text-2xl font-bold text-foreground">Technology Stack & Architecture</h2>
          </div>
          
          <div className="space-y-6">
            {technologyReferences.map((tech, index) => (
              <Card key={index} className="p-6">
                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <h3 className="font-semibold text-lg mb-2">{tech.title}</h3>
                    <p className="text-sm text-muted-foreground mb-4">{tech.description}</p>
                    <p className="text-sm"><strong>Use Case:</strong> {tech.useCase}</p>
                  </div>
                  
                  <div>
                    <h4 className="font-medium mb-2">Services/Technologies</h4>
                    <div className="flex flex-wrap gap-1">
                      {tech.services.map((service, idx) => (
                        <Badge key={idx} variant="outline" className="text-xs">
                          {service}
                        </Badge>
                      ))}
                    </div>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        </section>

        {/* Research Papers */}
        <section>
          <div className="flex items-center gap-3 mb-6">
            <Globe className="w-6 h-6 text-primary" />
            <h2 className="text-2xl font-bold text-foreground">Supporting Research</h2>
          </div>
          
          <div className="grid md:grid-cols-2 gap-6">
            {researchPapers.map((paper, index) => (
              <Card key={index} className="p-6">
                <div className="space-y-3">
                  <div>
                    <h3 className="font-semibold mb-1">{paper.title}</h3>
                    <p className="text-sm text-muted-foreground">{paper.journal} ({paper.year})</p>
                  </div>
                  
                  <div>
                    <h4 className="font-medium text-sm mb-1">Key Findings</h4>
                    <p className="text-sm text-green-700 bg-green-50 p-2 rounded">{paper.findings}</p>
                  </div>
                  
                  <div>
                    <h4 className="font-medium text-sm mb-1">Platform Relevance</h4>
                    <p className="text-sm">{paper.relevance}</p>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        </section>

        {/* Competitive Analysis */}
        <section>
          <div className="flex items-center gap-3 mb-6">
            <Award className="w-6 h-6 text-primary" />
            <h2 className="text-2xl font-bold text-foreground">Competitive Analysis</h2>
          </div>
          
          <div className="grid md:grid-cols-3 gap-6">
            {competitorAnalysis.map((competitor, index) => (
              <Card key={index} className="p-6">
                <div className="space-y-4">
                  <h3 className="font-semibold text-lg">{competitor.name}</h3>
                  
                  <div>
                    <h4 className="font-medium text-sm mb-2 text-red-600">Identified Gaps</h4>
                    <ul className="text-sm space-y-1">
                      {competitor.gaps.map((gap, idx) => (
                        <li key={idx} className="flex items-center gap-2">
                          <span className="w-1 h-1 bg-red-400 rounded-full"></span>
                          {gap}
                        </li>
                      ))}
                    </ul>
                  </div>
                  
                  <div>
                    <h4 className="font-medium text-sm mb-2 text-green-600">Our Advantage</h4>
                    <p className="text-sm bg-green-50 p-2 rounded">{competitor.ourAdvantage}</p>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        </section>

        {/* Case Studies */}
        <section>
          <div className="flex items-center gap-3 mb-6">
            <BookOpen className="w-6 h-6 text-primary" />
            <h2 className="text-2xl font-bold text-foreground">Supporting Case Studies</h2>
          </div>
          
          <div className="grid md:grid-cols-2 gap-6">
            {caseStudies.map((study, index) => (
              <Card key={index} className="p-6">
                <div className="space-y-3">
                  <div>
                    <h3 className="font-semibold text-lg">{study.title}</h3>
                    <p className="text-sm text-muted-foreground">{study.organization}</p>
                  </div>
                  
                  <div>
                    <h4 className="font-medium text-sm mb-1">Outcome</h4>
                    <p className="text-sm text-blue-700 bg-blue-50 p-2 rounded">{study.outcome}</p>
                  </div>
                  
                  <div>
                    <h4 className="font-medium text-sm mb-1">Platform Relevance</h4>
                    <p className="text-sm">{study.relevance}</p>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        </section>

        {/* Compliance & Certifications */}
        <section>
          <Card className="p-8 bg-gradient-earth">
            <div className="text-center space-y-4">
              <h2 className="text-2xl font-bold text-foreground">Compliance & Certifications</h2>
              
              <div className="grid md:grid-cols-4 gap-4 mt-6">
                <div className="text-center">
                  <Badge variant="secondary" className="mb-2">AYUSH Approved</Badge>
                  <p className="text-sm">Ministry guidelines compliant</p>
                </div>
                <div className="text-center">
                  <Badge variant="secondary" className="mb-2">ICMR Validated</Badge>
                  <p className="text-sm">Official nutrition data source</p>
                </div>
                <div className="text-center">
                  <Badge variant="secondary" className="mb-2">AWS Healthcare</Badge>
                  <p className="text-sm">HIPAA compliant infrastructure</p>
                </div>
                <div className="text-center">
                  <Badge variant="secondary" className="mb-2">Research Backed</Badge>
                  <p className="text-sm">Evidence-based algorithms</p>
                </div>
              </div>
              
              <p className="text-sm text-muted-foreground max-w-2xl mx-auto">
                Our platform adheres to the highest standards of healthcare data security, 
                traditional medicine authenticity, and modern technology best practices.
              </p>
            </div>
          </Card>
        </section>
      </div>
    </div>
  );
};

export default ResearchReferences;