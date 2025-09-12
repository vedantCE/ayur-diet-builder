import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { Trash2, Plus, UtensilsCrossed, Coffee, Sun, Moon } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useToast } from "@/hooks/use-toast";

interface FoodItem {
  id: string;
  name: string;
  category: string;
  properties: string[];
  taste: string;
}

interface SelectedFood extends FoodItem {
  mealTime: string;
}

const FoodSelection = () => {
  const [selectedFood, setSelectedFood] = useState<string>("");
  const [selectedMealTime, setSelectedMealTime] = useState<string>("");
  const [dietPlan, setDietPlan] = useState<SelectedFood[]>([]);
  const [patientProfile, setPatientProfile] = useState<any>(null);

  const navigate = useNavigate();
  const { toast } = useToast();

  const foodItems: FoodItem[] = [
    { id: "1", name: "Basmati Rice", category: "Grains", properties: ["Cooling", "Easy to digest"], taste: "Sweet" },
    { id: "2", name: "Moong Dal", category: "Legumes", properties: ["Light", "Easy to digest"], taste: "Sweet" },
    { id: "3", name: "Ghee", category: "Fats", properties: ["Nourishing", "Cooling"], taste: "Sweet" },
    { id: "4", name: "Fresh Ginger", category: "Spices", properties: ["Warming", "Digestive"], taste: "Pungent" },
    { id: "5", name: "Turmeric", category: "Spices", properties: ["Healing", "Anti-inflammatory"], taste: "Bitter" },
    { id: "6", name: "Spinach", category: "Vegetables", properties: ["Nutritious", "Cooling"], taste: "Astringent" },
    { id: "7", name: "Carrots", category: "Vegetables", properties: ["Sweet", "Grounding"], taste: "Sweet" },
    { id: "8", name: "Sweet Mango", category: "Fruits", properties: ["Cooling", "Nourishing"], taste: "Sweet" },
    { id: "9", name: "Pomegranate", category: "Fruits", properties: ["Cooling", "Astringent"], taste: "Sweet-Sour" },
    { id: "10", name: "Almonds", category: "Nuts", properties: ["Nourishing", "Heavy"], taste: "Sweet" },
    { id: "11", name: "Cumin Seeds", category: "Spices", properties: ["Digestive", "Cooling"], taste: "Pungent" },
    { id: "12", name: "Coriander", category: "Spices", properties: ["Cooling", "Digestive"], taste: "Sweet-Bitter" },
  ];

  const mealTimes = [
    { id: "breakfast", name: "Breakfast", icon: Coffee },
    { id: "lunch", name: "Lunch", icon: Sun },
    { id: "dinner", name: "Dinner", icon: Moon },
    { id: "snacks", name: "Snacks", icon: UtensilsCrossed },
  ];

  useEffect(() => {
    const profile = localStorage.getItem("patientProfile");
    if (profile) {
      setPatientProfile(JSON.parse(profile));
    } else {
      toast({
        title: "No Patient Profile Found",
        description: "Please create a patient profile first.",
        variant: "destructive"
      });
      navigate("/patient-profile");
    }
  }, [navigate, toast]);

  const addToDietPlan = () => {
    if (!selectedFood || !selectedMealTime) {
      toast({
        title: "Missing Selection",
        description: "Please select both a food item and meal time.",
        variant: "destructive"
      });
      return;
    }

    const foodItem = foodItems.find(item => item.id === selectedFood);
    if (!foodItem) return;

    const newItem: SelectedFood = {
      ...foodItem,
      mealTime: selectedMealTime
    };

    setDietPlan(prev => [...prev, newItem]);
    setSelectedFood("");
    setSelectedMealTime("");
    
    toast({
      title: "Food Added",
      description: `${foodItem.name} added to ${mealTimes.find(m => m.id === selectedMealTime)?.name}`,
    });
  };

  const removeFromDietPlan = (index: number) => {
    setDietPlan(prev => prev.filter((_, i) => i !== index));
    toast({
      title: "Food Removed",
      description: "Item removed from diet plan",
    });
  };

  const generateDietChart = () => {
    if (dietPlan.length === 0) {
      toast({
        title: "Empty Diet Plan",
        description: "Please add at least one food item to generate a diet chart.",
        variant: "destructive"
      });
      return;
    }

    localStorage.setItem("dietPlan", JSON.stringify(dietPlan));
    toast({
      title: "Diet Chart Generated",
      description: "Redirecting to your personalized diet chart...",
    });
    
    setTimeout(() => {
      navigate("/diet-chart");
    }, 1000);
  };

  const getMealIcon = (mealTime: string) => {
    const meal = mealTimes.find(m => m.id === mealTime);
    return meal ? meal.icon : UtensilsCrossed;
  };

  const groupedDietPlan = mealTimes.reduce((acc, meal) => {
    acc[meal.id] = dietPlan.filter(item => item.mealTime === meal.id);
    return acc;
  }, {} as Record<string, SelectedFood[]>);

  return (
    <div className="min-h-screen py-12 px-4">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-12">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-healing rounded-full shadow-healing mb-6">
            <UtensilsCrossed className="w-8 h-8 text-primary-foreground" />
          </div>
          <h1 className="text-4xl font-bold text-foreground mb-4">
            Food Selection
          </h1>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Build a personalized diet plan by selecting appropriate foods for each meal time
          </p>
          {patientProfile && (
            <p className="text-sm text-muted-foreground mt-2">
              Creating diet plan for: <span className="font-medium text-foreground">{patientProfile.name}</span>
            </p>
          )}
        </div>

        <div className="grid lg:grid-cols-2 gap-8">
          {/* Food Selection Panel */}
          <Card className="p-6 shadow-card bg-card h-fit">
            <h2 className="text-xl font-semibold text-foreground mb-6 flex items-center gap-2">
              <Plus className="w-5 h-5 text-primary" />
              Add Foods to Diet Plan
            </h2>
            
            <div className="space-y-4">
              <div className="space-y-2">
                <label className="text-sm font-medium text-foreground">Select Food Item</label>
                <Select value={selectedFood} onValueChange={setSelectedFood}>
                  <SelectTrigger className="bg-background border-border">
                    <SelectValue placeholder="Choose a food item" />
                  </SelectTrigger>
                  <SelectContent className="max-h-60">
                    {foodItems.map((food) => (
                      <SelectItem key={food.id} value={food.id}>
                        <div className="flex items-center justify-between w-full">
                          <span>{food.name}</span>
                          <Badge variant="secondary" className="ml-2 text-xs">
                            {food.category}
                          </Badge>
                        </div>
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium text-foreground">Select Meal Time</label>
                <Select value={selectedMealTime} onValueChange={setSelectedMealTime}>
                  <SelectTrigger className="bg-background border-border">
                    <SelectValue placeholder="Choose meal time" />
                  </SelectTrigger>
                  <SelectContent>
                    {mealTimes.map((meal) => (
                      <SelectItem key={meal.id} value={meal.id}>
                        <div className="flex items-center gap-2">
                          <meal.icon className="w-4 h-4" />
                          {meal.name}
                        </div>
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              {selectedFood && (
                <Card className="p-4 bg-muted border-border">
                  {(() => {
                    const food = foodItems.find(item => item.id === selectedFood);
                    return food ? (
                      <div className="space-y-2">
                        <h4 className="font-medium text-foreground">{food.name}</h4>
                        <div className="flex flex-wrap gap-1">
                          {food.properties.map((prop, index) => (
                            <Badge key={index} variant="outline" className="text-xs">
                              {prop}
                            </Badge>
                          ))}
                          <Badge className="text-xs bg-wisdom text-accent-foreground">
                            {food.taste}
                          </Badge>
                        </div>
                      </div>
                    ) : null;
                  })()}
                </Card>
              )}

              <Button 
                onClick={addToDietPlan}
                variant="healing" 
                className="w-full"
                disabled={!selectedFood || !selectedMealTime}
              >
                <Plus className="w-4 h-4 mr-2" />
                Add to Diet Plan
              </Button>
            </div>
          </Card>

          {/* Diet Plan Display */}
          <Card className="p-6 shadow-card bg-card">
            <h2 className="text-xl font-semibold text-foreground mb-6">
              Current Diet Plan ({dietPlan.length} items)
            </h2>
            
            <div className="space-y-6">
              {mealTimes.map((meal) => {
                const mealItems = groupedDietPlan[meal.id];
                const Icon = meal.icon;
                
                return (
                  <div key={meal.id} className="space-y-3">
                    <h3 className="font-medium text-foreground flex items-center gap-2">
                      <Icon className="w-4 h-4 text-primary" />
                      {meal.name}
                    </h3>
                    
                    {mealItems.length > 0 ? (
                      <div className="space-y-2">
                        {mealItems.map((item, index) => (
                          <div
                            key={`${item.id}-${index}`}
                            className="flex items-center justify-between p-3 bg-muted rounded-lg border border-border"
                          >
                            <div className="flex-1">
                              <span className="font-medium text-foreground">{item.name}</span>
                              <div className="flex flex-wrap gap-1 mt-1">
                                <Badge variant="outline" className="text-xs">
                                  {item.category}
                                </Badge>
                                <Badge className="text-xs bg-wisdom text-accent-foreground">
                                  {item.taste}
                                </Badge>
                              </div>
                            </div>
                            <Button
                              variant="ghost"
                              size="sm"
                              onClick={() => removeFromDietPlan(dietPlan.findIndex(d => d === item))}
                              className="text-destructive hover:text-destructive"
                            >
                              <Trash2 className="w-4 h-4" />
                            </Button>
                          </div>
                        ))}
                      </div>
                    ) : (
                      <p className="text-sm text-muted-foreground italic">
                        No foods selected for {meal.name.toLowerCase()}
                      </p>
                    )}
                  </div>
                );
              })}
            </div>

            <div className="flex gap-4 mt-8">
              <Button
                variant="outline"
                onClick={() => navigate("/patient-profile")}
                className="flex-1"
              >
                Back to Profile
              </Button>
              <Button
                variant="healing"
                onClick={generateDietChart}
                className="flex-1"
                disabled={dietPlan.length === 0}
              >
                Generate Diet Chart
              </Button>
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default FoodSelection;