import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Input } from "@/components/ui/input";
import { 
  GraduationCap, 
  BookOpen, 
  Video, 
  FileText, 
  Users, 
  Award,
  Search,
  Clock,
  Star,
  Play,
  Download,
  ExternalLink,
  Leaf,
  Heart,
  Brain
} from "lucide-react";

const Education = () => {
  const courses = [
    {
      title: "Fundamentals of Ayurvedic Nutrition",
      description: "Learn the core principles of Ayurvedic dietary wisdom and constitution-based nutrition",
      duration: "4 weeks",
      level: "Beginner",
      rating: 4.8,
      students: 1240,
      image: "🌿",
      topics: ["Doshas & Constitution", "Six Tastes", "Food Combining", "Seasonal Eating"]
    },
    {
      title: "Clinical Diet Chart Creation",
      description: "Master the art of creating therapeutic diet charts for various health conditions",
      duration: "6 weeks", 
      level: "Intermediate",
      rating: 4.9,
      students: 856,
      image: "📋",
      topics: ["Therapeutic Protocols", "Case Studies", "Patient Assessment", "Monitoring"]
    },
    {
      title: "Modern Integration of Ancient Wisdom",
      description: "Bridge traditional Ayurvedic knowledge with contemporary nutritional science",
      duration: "8 weeks",
      level: "Advanced",
      rating: 4.7,
      students: 623,
      image: "🔬",
      topics: ["Research Evidence", "Clinical Trials", "Integration Methods", "Future Trends"]
    }
  ];

  const articles = [
    {
      title: "The Science Behind Ayurvedic Food Combining",
      excerpt: "Recent research validates ancient principles of food compatibility and digestive health",
      readTime: "8 min read",
      category: "Research",
      author: "Dr. Priya Sharma",
      date: "Nov 15, 2024"
    },
    {
      title: "Seasonal Nutrition: Adapting Diet Charts Through the Year",
      excerpt: "How to modify patient recommendations based on seasonal changes and dosha fluctuations",
      readTime: "12 min read",
      category: "Practice",
      author: "Dr. Raj Menon",
      date: "Nov 12, 2024"
    },
    {
      title: "Digital Ayurveda: Technology in Traditional Practice",
      excerpt: "Exploring how modern technology can enhance traditional Ayurvedic diagnosis and treatment",
      readTime: "10 min read",
      category: "Innovation",
      author: "Dr. Anjali Patel", 
      date: "Nov 10, 2024"
    }
  ];

  const webinars = [
    {
      title: "Integrative Approaches to Diabetes Management",
      speaker: "Dr. Ramesh Kumar",
      date: "December 5, 2024",
      time: "7:00 PM IST",
      attendees: 450,
      type: "Live"
    },
    {
      title: "Ayurvedic Nutrition for Mental Health",
      speaker: "Dr. Meera Joshi",
      date: "December 12, 2024", 
      time: "6:30 PM IST",
      attendees: 320,
      type: "Live"
    },
    {
      title: "Case Study: Reversing Metabolic Syndrome",
      speaker: "Dr. Suresh Nair",
      date: "Recorded",
      time: "45 min",
      attendees: 1200,
      type: "Recorded"
    }
  ];

  const guidelines = [
    {
      title: "Evidence-Based Ayurvedic Guidelines",
      description: "Clinical protocols backed by modern research",
      icon: Brain,
      color: "bg-gradient-healing"
    },
    {
      title: "Traditional Wisdom Compendium",
      description: "Classical texts and time-tested principles",
      icon: Leaf,
      color: "bg-gradient-wisdom"
    },
    {
      title: "Therapeutic Diet Protocols", 
      description: "Condition-specific dietary interventions",
      icon: Heart,
      color: "bg-gradient-earth"
    }
  ];

  return (
    <div className="min-h-screen p-4">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-12 h-12 bg-gradient-healing rounded-full flex items-center justify-center">
              <GraduationCap className="w-6 h-6 text-primary-foreground" />
            </div>
            <div>
              <h1 className="text-3xl font-bold text-foreground">
                Ayurvedic Education Layer
              </h1>
              <p className="text-muted-foreground">Evidence-based guidelines and learning hub</p>
            </div>
          </div>
          
          <div className="flex items-center gap-2 mb-4">
            <Badge variant="outline" className="bg-primary/10">
              <BookOpen className="w-3 h-3 mr-1" />
              Continuous Learning
            </Badge>
            <Badge variant="outline" className="bg-wisdom/10">
              <Award className="w-3 h-3 mr-1" />
              Certified Programs
            </Badge>
            <Badge variant="outline" className="bg-earth/10">
              <Users className="w-3 h-3 mr-1" />
              Community Driven
            </Badge>
          </div>
        </div>

        {/* Search Bar */}
        <Card className="p-4 mb-8">
          <div className="relative max-w-md">
            <Search className="w-4 h-4 absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground" />
            <Input placeholder="Search courses, articles, guidelines..." className="pl-9" />
          </div>
        </Card>

        {/* Content Tabs */}
        <Tabs defaultValue="courses" className="space-y-6">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="courses">Courses</TabsTrigger>
            <TabsTrigger value="articles">Articles</TabsTrigger>
            <TabsTrigger value="webinars">Webinars</TabsTrigger>
            <TabsTrigger value="guidelines">Guidelines</TabsTrigger>
          </TabsList>

          {/* Courses Tab */}
          <TabsContent value="courses" className="space-y-6">
            <div className="grid lg:grid-cols-3 gap-6">
              {courses.map((course, index) => (
                <Card key={index} className="p-6 shadow-card hover:shadow-healing transition-all duration-300">
                  <div className="text-center mb-4">
                    <div className="text-4xl mb-3">{course.image}</div>
                    <h3 className="text-lg font-semibold text-foreground mb-2">{course.title}</h3>
                    <p className="text-sm text-muted-foreground mb-4">{course.description}</p>
                  </div>

                  <div className="space-y-3 mb-4">
                    <div className="flex justify-between text-sm">
                      <span className="text-muted-foreground">Duration:</span>
                      <span className="font-medium">{course.duration}</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-muted-foreground">Level:</span>
                      <Badge variant="outline">{course.level}</Badge>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-muted-foreground">Rating:</span>
                      <div className="flex items-center gap-1">
                        <Star className="w-3 h-3 fill-wisdom text-wisdom" />
                        <span className="font-medium">{course.rating}</span>
                      </div>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-muted-foreground">Students:</span>
                      <span className="font-medium">{course.students.toLocaleString()}</span>
                    </div>
                  </div>

                  <div className="mb-4">
                    <p className="text-sm font-medium text-foreground mb-2">Topics covered:</p>
                    <div className="flex flex-wrap gap-1">
                      {course.topics.map((topic, topicIndex) => (
                        <Badge key={topicIndex} variant="secondary" className="text-xs">
                          {topic}
                        </Badge>
                      ))}
                    </div>
                  </div>

                  <Button variant="healing" className="w-full">
                    <Play className="w-4 h-4 mr-2" />
                    Start Course
                  </Button>
                </Card>
              ))}
            </div>
          </TabsContent>

          {/* Articles Tab */}
          <TabsContent value="articles" className="space-y-6">
            <div className="space-y-4">
              {articles.map((article, index) => (
                <Card key={index} className="p-6 shadow-card hover:shadow-healing transition-all duration-300">
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-2">
                        <Badge variant="outline" className="bg-primary/10">
                          {article.category}
                        </Badge>
                        <span className="text-sm text-muted-foreground flex items-center gap-1">
                          <Clock className="w-3 h-3" />
                          {article.readTime}
                        </span>
                      </div>
                      
                      <h3 className="text-xl font-semibold text-foreground mb-2">
                        {article.title}
                      </h3>
                      
                      <p className="text-muted-foreground mb-3">
                        {article.excerpt}
                      </p>
                      
                      <div className="flex items-center gap-4 text-sm text-muted-foreground">
                        <span>By {article.author}</span>
                        <span>•</span>
                        <span>{article.date}</span>
                      </div>
                    </div>
                    
                    <Button variant="outline" size="sm">
                      <BookOpen className="w-4 h-4 mr-2" />
                      Read
                    </Button>
                  </div>
                </Card>
              ))}
            </div>
            
            <div className="text-center">
              <Button variant="outline">Load More Articles</Button>
            </div>
          </TabsContent>

          {/* Webinars Tab */}
          <TabsContent value="webinars" className="space-y-6">
            <div className="space-y-4">
              {webinars.map((webinar, index) => (
                <Card key={index} className="p-6 shadow-card hover:shadow-healing transition-all duration-300">
                  <div className="flex items-center justify-between">
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-2">
                        <Badge 
                          variant={webinar.type === 'Live' ? 'default' : 'secondary'}
                          className={webinar.type === 'Live' ? 'bg-primary/10 text-primary' : ''}
                        >
                          {webinar.type === 'Live' ? '🔴 Live' : '📹 Recorded'}
                        </Badge>
                        <span className="text-sm text-muted-foreground flex items-center gap-1">
                          <Users className="w-3 h-3" />
                          {webinar.attendees} attendees
                        </span>
                      </div>
                      
                      <h3 className="text-xl font-semibold text-foreground mb-2">
                        {webinar.title}
                      </h3>
                      
                      <div className="flex items-center gap-4 text-sm text-muted-foreground">
                        <span>Speaker: {webinar.speaker}</span>
                        <span>•</span>
                        <span>{webinar.date}</span>
                        {webinar.time && (
                          <>
                            <span>•</span>
                            <span>{webinar.time}</span>
                          </>
                        )}
                      </div>
                    </div>
                    
                    <Button variant={webinar.type === 'Live' ? 'healing' : 'outline'}>
                      {webinar.type === 'Live' ? (
                        <>
                          <ExternalLink className="w-4 h-4 mr-2" />
                          Join Live
                        </>
                      ) : (
                        <>
                          <Play className="w-4 h-4 mr-2" />
                          Watch
                        </>
                      )}
                    </Button>
                  </div>
                </Card>
              ))}
            </div>
          </TabsContent>

          {/* Guidelines Tab */}
          <TabsContent value="guidelines" className="space-y-6">
            <div className="grid lg:grid-cols-3 gap-6 mb-8">
              {guidelines.map((guideline, index) => (
                <Card key={index} className="p-6 shadow-card hover:shadow-healing transition-all duration-300 text-center">
                  <div className={`inline-flex items-center justify-center w-16 h-16 ${guideline.color} rounded-full shadow-soft mb-4`}>
                    <guideline.icon className="w-8 h-8 text-primary-foreground" />
                  </div>
                  
                  <h3 className="text-lg font-semibold text-foreground mb-2">
                    {guideline.title}
                  </h3>
                  
                  <p className="text-muted-foreground mb-4">
                    {guideline.description}
                  </p>

                  <Button variant="outline" className="w-full">
                    <FileText className="w-4 h-4 mr-2" />
                    Access Guidelines
                  </Button>
                </Card>
              ))}
            </div>

            {/* Sample Guidelines */}
            <Card className="p-6 shadow-card">
              <h3 className="text-lg font-semibold text-foreground mb-4">
                Recent Clinical Guidelines
              </h3>
              
              <div className="space-y-3">
                {[
                  "Ayurvedic Management of Type 2 Diabetes - Updated Protocol 2024",
                  "Hypertension Control Through Dietary Modification - Evidence Review", 
                  "Digestive Health Optimization - Dosha-Specific Approaches",
                  "Cardiovascular Wellness - Integrative Ayurvedic Guidelines"
                ].map((guideline, index) => (
                  <div key={index} className="flex items-center justify-between p-3 rounded-lg bg-muted/30">
                    <span className="text-foreground">{guideline}</span>
                    <Button variant="outline" size="sm">
                      <Download className="w-4 h-4 mr-2" />
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

export default Education;