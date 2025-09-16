import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Badge } from "@/components/ui/badge";
import { User, Heart, Utensils, Info } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useToast } from "@/hooks/use-toast";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";

const PatientProfile = () => {
  const [formData, setFormData] = useState({
    name: "",
    age: "",
    gender: "",
    dietaryHabits: "",
    healthParameters: "",
    constitution: "",
    allergies: "",
    mealFrequency: "",
    bowelMovements: "",
    waterIntake: "",
    sleepPattern: "",
    exerciseLevel: "",
    stressLevel: ""
  });
  const [doshaResults, setDoshaResults] = useState<any>(null);

  const navigate = useNavigate();
  const { toast } = useToast();

  useEffect(() => {
    const savedResults = localStorage.getItem("doshaResults");
    if (savedResults) {
      setDoshaResults(JSON.parse(savedResults));
      setFormData(prev => ({ ...prev, constitution: JSON.parse(savedResults).primaryDosha }));
    }
  }, []);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.name || !formData.age || !formData.gender || !formData.dietaryHabits || !formData.mealFrequency || !formData.bowelMovements || !formData.waterIntake) {
      toast({
        title: "Missing Information",
        description: "Please fill in all required fields to continue.",
        variant: "destructive"
      });
      return;
    }

    // Store data in localStorage for demo purposes
    localStorage.setItem("patientProfile", JSON.stringify(formData));
    
    toast({
      title: "Profile Created Successfully",
      description: "Moving to food selection step...",
    });
    
    setTimeout(() => {
      navigate("/food-selection");
    }, 1000);
  };

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  return (
    <div className="min-h-screen py-12 px-4">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-12">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-healing rounded-full shadow-healing mb-6">
            <User className="w-8 h-8 text-primary-foreground" />
          </div>
          <h1 className="text-4xl font-bold text-foreground mb-4">
            Patient Profile
          </h1>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            रोगी प्रोफाइल (Rogi Profile) - Create comprehensive profile for personalized Ayurvedic recommendations
          </p>
          
          {doshaResults && (
            <Card className="p-4 bg-gradient-healing/10 border-primary/20 mt-6">
              <div className="text-center">
                <h3 className="font-semibold text-primary mb-2">Your Dosha Results</h3>
                <div className="flex justify-center gap-4">
                  <Badge variant="secondary">🌬️ Vata: {doshaResults.percentages.vata}%</Badge>
                  <Badge variant="secondary">🔥 Pitta: {doshaResults.percentages.pitta}%</Badge>
                  <Badge variant="secondary">🌍 Kapha: {doshaResults.percentages.kapha}%</Badge>
                </div>
                <p className="text-sm text-muted-foreground mt-2">
                  Primary: <strong>{doshaResults.primaryDosha.charAt(0).toUpperCase() + doshaResults.primaryDosha.slice(1)}</strong>
                </p>
              </div>
            </Card>
          )}
        </div>

        <Card className="p-8 shadow-card bg-card">
          <form onSubmit={handleSubmit} className="space-y-8">
            {/* Basic Information */}
            <div className="space-y-6">
              <div className="flex items-center gap-3 mb-4">
                <User className="w-5 h-5 text-primary" />
                <h2 className="text-xl font-semibold text-foreground">Basic Information</h2>
              </div>
              
              <div className="grid md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <Label htmlFor="name" className="text-foreground font-medium">
                    Full Name *
                  </Label>
                  <Input
                    id="name"
                    placeholder="Enter patient's full name"
                    value={formData.name}
                    onChange={(e) => handleInputChange("name", e.target.value)}
                    className="bg-background border-border"
                  />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="age" className="text-foreground font-medium">
                    Age *
                  </Label>
                  <Input
                    id="age"
                    type="number"
                    placeholder="Enter age"
                    value={formData.age}
                    onChange={(e) => handleInputChange("age", e.target.value)}
                    className="bg-background border-border"
                  />
                </div>
              </div>

              <div className="space-y-3">
                <Label className="text-foreground font-medium">Gender *</Label>
                <RadioGroup
                  value={formData.gender}
                  onValueChange={(value) => handleInputChange("gender", value)}
                  className="flex gap-6"
                >
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="male" id="male" />
                    <Label htmlFor="male">Male</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="female" id="female" />
                    <Label htmlFor="female">Female</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="other" id="other" />
                    <Label htmlFor="other">Other</Label>
                  </div>
                </RadioGroup>
              </div>
            </div>

            {/* Dietary Information */}
            <div className="space-y-6">
              <div className="flex items-center gap-3 mb-4">
                <Utensils className="w-5 h-5 text-primary" />
                <h2 className="text-xl font-semibold text-foreground">Dietary Information</h2>
              </div>
              
              <div className="grid md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <div className="flex items-center gap-2">
                    <Label className="text-foreground font-medium">आहार (Ahara) - Dietary Habits *</Label>
                    <TooltipProvider>
                      <Tooltip>
                        <TooltipTrigger>
                          <Info className="w-4 h-4 text-muted-foreground" />
                        </TooltipTrigger>
                        <TooltipContent>
                          <p>Ahara means food and nutrition in Ayurveda</p>
                        </TooltipContent>
                      </Tooltip>
                    </TooltipProvider>
                  </div>
                  <Select value={formData.dietaryHabits} onValueChange={(value) => handleInputChange("dietaryHabits", value)}>
                    <SelectTrigger className="bg-background border-border">
                      <SelectValue placeholder="Select dietary preference" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="vegetarian">शाकाहारी (Shakahari) - Vegetarian</SelectItem>
                      <SelectItem value="non-vegetarian">मांसाहारी (Mansahari) - Non-Vegetarian</SelectItem>
                      <SelectItem value="vegan">निर्वेगन (Vegan)</SelectItem>
                      <SelectItem value="jain">जैन आहार (Jain Ahara)</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <div className="flex items-center gap-2">
                    <Label className="text-foreground font-medium">प्रकृति (Prakriti) - Constitution</Label>
                    <TooltipProvider>
                      <Tooltip>
                        <TooltipTrigger>
                          <Info className="w-4 h-4 text-muted-foreground" />
                        </TooltipTrigger>
                        <TooltipContent>
                          <p>Prakriti is your natural body constitution determined at birth</p>
                        </TooltipContent>
                      </Tooltip>
                    </TooltipProvider>
                  </div>
                  <Select value={formData.constitution} onValueChange={(value) => handleInputChange("constitution", value)}>
                    <SelectTrigger className="bg-background border-border">
                      <SelectValue placeholder={doshaResults ? `Detected: ${doshaResults.primaryDosha}` : "Select constitution type"} />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="vata">🌬️ वात (Vata) - Air & Space</SelectItem>
                      <SelectItem value="pitta">🔥 पित्त (Pitta) - Fire & Water</SelectItem>
                      <SelectItem value="kapha">🌍 कफ (Kapha) - Earth & Water</SelectItem>
                      <SelectItem value="vata-pitta">Vata-Pitta Dual</SelectItem>
                      <SelectItem value="pitta-kapha">Pitta-Kapha Dual</SelectItem>
                      <SelectItem value="vata-kapha">Vata-Kapha Dual</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="allergies" className="text-foreground font-medium">
                  Food Allergies & Restrictions
                </Label>
                <Input
                  id="allergies"
                  placeholder="List any food allergies or restrictions"
                  value={formData.allergies}
                  onChange={(e) => handleInputChange("allergies", e.target.value)}
                  className="bg-background border-border"
                />
              </div>
            </div>

            {/* Health Parameters */}
            <div className="space-y-6">
              <div className="flex items-center gap-3 mb-4">
                <Heart className="w-5 h-5 text-primary" />
                <h2 className="text-xl font-semibold text-foreground">स्वास्थ्य मापदंड (Swasthya Mapadand) - Health Parameters</h2>
              </div>
              
              <div className="grid md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <Label className="text-foreground font-medium">Meal Frequency *</Label>
                  <Select value={formData.mealFrequency} onValueChange={(value) => handleInputChange("mealFrequency", value)}>
                    <SelectTrigger className="bg-background border-border">
                      <SelectValue placeholder="Select meal frequency" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="2-meals">2 meals per day</SelectItem>
                      <SelectItem value="3-meals">3 meals per day</SelectItem>
                      <SelectItem value="4-meals">4 meals per day</SelectItem>
                      <SelectItem value="5-meals">5+ meals per day</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label className="text-foreground font-medium">Bowel Movements *</Label>
                  <Select value={formData.bowelMovements} onValueChange={(value) => handleInputChange("bowelMovements", value)}>
                    <SelectTrigger className="bg-background border-border">
                      <SelectValue placeholder="Select frequency" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="irregular">Irregular</SelectItem>
                      <SelectItem value="once-daily">Once daily</SelectItem>
                      <SelectItem value="twice-daily">Twice daily</SelectItem>
                      <SelectItem value="more-than-twice">More than twice daily</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label className="text-foreground font-medium">Water Intake *</Label>
                  <Select value={formData.waterIntake} onValueChange={(value) => handleInputChange("waterIntake", value)}>
                    <SelectTrigger className="bg-background border-border">
                      <SelectValue placeholder="Select daily intake" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="less-than-1L">Less than 1L</SelectItem>
                      <SelectItem value="1-2L">1-2 Liters</SelectItem>
                      <SelectItem value="2-3L">2-3 Liters</SelectItem>
                      <SelectItem value="more-than-3L">More than 3L</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label className="text-foreground font-medium">Sleep Pattern</Label>
                  <Select value={formData.sleepPattern} onValueChange={(value) => handleInputChange("sleepPattern", value)}>
                    <SelectTrigger className="bg-background border-border">
                      <SelectValue placeholder="Select sleep pattern" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="poor">Poor (less than 6 hours)</SelectItem>
                      <SelectItem value="average">Average (6-7 hours)</SelectItem>
                      <SelectItem value="good">Good (7-8 hours)</SelectItem>
                      <SelectItem value="excellent">Excellent (8+ hours)</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label className="text-foreground font-medium">Exercise Level</Label>
                  <Select value={formData.exerciseLevel} onValueChange={(value) => handleInputChange("exerciseLevel", value)}>
                    <SelectTrigger className="bg-background border-border">
                      <SelectValue placeholder="Select activity level" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="sedentary">Sedentary</SelectItem>
                      <SelectItem value="light">Light activity</SelectItem>
                      <SelectItem value="moderate">Moderate activity</SelectItem>
                      <SelectItem value="high">High activity</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label className="text-foreground font-medium">Stress Level</Label>
                  <Select value={formData.stressLevel} onValueChange={(value) => handleInputChange("stressLevel", value)}>
                    <SelectTrigger className="bg-background border-border">
                      <SelectValue placeholder="Select stress level" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="low">Low</SelectItem>
                      <SelectItem value="moderate">Moderate</SelectItem>
                      <SelectItem value="high">High</SelectItem>
                      <SelectItem value="very-high">Very High</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="healthParameters" className="text-foreground font-medium">
                  Current Health Conditions & Medical History
                </Label>
                <Textarea
                  id="healthParameters"
                  placeholder="Describe any current health conditions, medications, or specific health goals..."
                  value={formData.healthParameters}
                  onChange={(e) => handleInputChange("healthParameters", e.target.value)}
                  rows={4}
                  className="bg-background border-border"
                />
              </div>
            </div>

            <div className="flex gap-4 pt-6">
              <Button
                type="button"
                variant="outline"
                onClick={() => navigate(doshaResults ? "/dosha-assessment" : "/")}
                className="flex-1"
              >
                {doshaResults ? "Back to Assessment" : "Back to Home"}
              </Button>
              <Button
                type="submit"
                variant="healing"
                className="flex-1"
              >
                Next: आहार चयन (Food Selection)
              </Button>
            </div>
          </form>
        </Card>
      </div>
    </div>
  );
};

export default PatientProfile;