import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { User, Heart, Utensils } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useToast } from "@/hooks/use-toast";

const PatientProfile = () => {
  const [formData, setFormData] = useState({
    name: "",
    age: "",
    gender: "",
    dietaryHabits: "",
    healthParameters: "",
    constitution: "",
    allergies: ""
  });

  const navigate = useNavigate();
  const { toast } = useToast();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.name || !formData.age || !formData.gender || !formData.dietaryHabits) {
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
            Create a comprehensive patient profile to generate personalized Ayurvedic diet recommendations
          </p>
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
                  <Label className="text-foreground font-medium">Dietary Habits *</Label>
                  <Select value={formData.dietaryHabits} onValueChange={(value) => handleInputChange("dietaryHabits", value)}>
                    <SelectTrigger className="bg-background border-border">
                      <SelectValue placeholder="Select dietary preference" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="vegetarian">Vegetarian</SelectItem>
                      <SelectItem value="non-vegetarian">Non-Vegetarian</SelectItem>
                      <SelectItem value="vegan">Vegan</SelectItem>
                      <SelectItem value="jain">Jain</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label className="text-foreground font-medium">Ayurvedic Constitution</Label>
                  <Select value={formData.constitution} onValueChange={(value) => handleInputChange("constitution", value)}>
                    <SelectTrigger className="bg-background border-border">
                      <SelectValue placeholder="Select constitution type" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="vata">Vata</SelectItem>
                      <SelectItem value="pitta">Pitta</SelectItem>
                      <SelectItem value="kapha">Kapha</SelectItem>
                      <SelectItem value="vata-pitta">Vata-Pitta</SelectItem>
                      <SelectItem value="pitta-kapha">Pitta-Kapha</SelectItem>
                      <SelectItem value="vata-kapha">Vata-Kapha</SelectItem>
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
                <h2 className="text-xl font-semibold text-foreground">Health Parameters</h2>
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
                onClick={() => navigate("/")}
                className="flex-1"
              >
                Back to Home
              </Button>
              <Button
                type="submit"
                variant="healing"
                className="flex-1"
              >
                Next: Select Foods
              </Button>
            </div>
          </form>
        </Card>
      </div>
    </div>
  );
};

export default PatientProfile;