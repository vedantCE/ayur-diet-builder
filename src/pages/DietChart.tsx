import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Download, Coffee, Sun, Moon, UtensilsCrossed, Calendar, User, Leaf } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useToast } from "@/hooks/use-toast";

interface FoodItem {
  id: string;
  name: string;
  category: string;
  properties: string[];
  taste: string;
  mealTime: string;
}

const DietChart = () => {
  const [dietPlan, setDietPlan] = useState<FoodItem[]>([]);
  const [patientProfile, setPatientProfile] = useState<any>(null);
  const navigate = useNavigate();
  const { toast } = useToast();

  const mealTimes = [
    { id: "breakfast", name: "Breakfast", icon: Coffee, time: "7:00 - 9:00 AM", color: "bg-gradient-to-r from-orange-100 to-yellow-100" },
    { id: "lunch", name: "Lunch", icon: Sun, time: "12:00 - 2:00 PM", color: "bg-gradient-to-r from-green-100 to-emerald-100" },
    { id: "dinner", name: "Dinner", icon: Moon, time: "7:00 - 9:00 PM", color: "bg-gradient-to-r from-purple-100 to-blue-100" },
    { id: "snacks", name: "Snacks", icon: UtensilsCrossed, time: "4:00 - 6:00 PM", color: "bg-gradient-to-r from-pink-100 to-rose-100" },
  ];

  // Sample diet plan if none exists
  const sampleDietPlan: FoodItem[] = [
    { id: "1", name: "Warm Water with Lemon", category: "Beverages", properties: ["Detoxifying", "Digestive"], taste: "Sour", mealTime: "breakfast" },
    { id: "2", name: "Oatmeal with Almonds", category: "Grains", properties: ["Nourishing", "Grounding"], taste: "Sweet", mealTime: "breakfast" },
    { id: "3", name: "Fresh Seasonal Fruits", category: "Fruits", properties: ["Cooling", "Energizing"], taste: "Sweet", mealTime: "breakfast" },
    { id: "4", name: "Basmati Rice", category: "Grains", properties: ["Cooling", "Easy to digest"], taste: "Sweet", mealTime: "lunch" },
    { id: "5", name: "Moong Dal", category: "Legumes", properties: ["Light", "Easy to digest"], taste: "Sweet", mealTime: "lunch" },
    { id: "6", name: "Sautéed Vegetables", category: "Vegetables", properties: ["Nutritious", "Balancing"], taste: "Sweet", mealTime: "lunch" },
    { id: "7", name: "Herbal Tea", category: "Beverages", properties: ["Calming", "Digestive"], taste: "Bitter", mealTime: "snacks" },
    { id: "8", name: "Mixed Nuts", category: "Nuts", properties: ["Nourishing", "Grounding"], taste: "Sweet", mealTime: "snacks" },
    { id: "9", name: "Vegetable Soup", category: "Soups", properties: ["Light", "Warming"], taste: "Sweet", mealTime: "dinner" },
    { id: "10", name: "Quinoa Salad", category: "Grains", properties: ["Light", "Nutritious"], taste: "Sweet", mealTime: "dinner" },
  ];

  useEffect(() => {
    const storedDietPlan = localStorage.getItem("dietPlan");
    const storedProfile = localStorage.getItem("patientProfile");

    if (storedDietPlan) {
      setDietPlan(JSON.parse(storedDietPlan));
    } else {
      setDietPlan(sampleDietPlan);
    }

    if (storedProfile) {
      setPatientProfile(JSON.parse(storedProfile));
    } else {
      // Sample patient for demo
      setPatientProfile({
        name: "Sample Patient",
        age: "35",
        gender: "female",
        dietaryHabits: "vegetarian",
        constitution: "pitta",
        healthParameters: "General wellness and digestive health"
      });
    }
  }, []);

  const handleDownload = () => {
    toast({
      title: "Download Started",
      description: "Your diet chart is being prepared for download.",
    });
    // In a real app, this would generate and download a PDF
  };

  const handlePrint = () => {
    window.print();
    toast({
      title: "Print Dialog Opened",
      description: "Your diet chart is ready to print.",
    });
  };

  const groupedDietPlan = mealTimes.reduce((acc, meal) => {
    acc[meal.id] = dietPlan.filter(item => item.mealTime === meal.id);
    return acc;
  }, {} as Record<string, FoodItem[]>);

  const totalItems = dietPlan.length;
  const currentDate = new Date().toLocaleDateString('en-US', { 
    weekday: 'long', 
    year: 'numeric', 
    month: 'long', 
    day: 'numeric' 
  });

  return (
    <div className="min-h-screen py-12 px-4 print:py-4">
      <div className="max-w-6xl mx-auto">
        {/* Header Section */}
        <div className="text-center mb-12 print:mb-8">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-healing rounded-full shadow-healing mb-6 print:hidden">
            <Leaf className="w-8 h-8 text-primary-foreground" />
          </div>
          <h1 className="text-4xl font-bold text-foreground mb-4 print:text-2xl">
            Personalized Ayurvedic Diet Chart
          </h1>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto print:text-sm">
            A customized nutrition plan based on Ayurvedic principles and individual constitution
          </p>
        </div>

        {/* Patient Information Card */}
        <Card className="p-6 mb-8 shadow-card bg-gradient-earth print:shadow-none print:border">
          <div className="grid md:grid-cols-3 gap-6">
            <div className="space-y-2">
              <div className="flex items-center gap-2 text-foreground font-semibold">
                <User className="w-4 h-4" />
                Patient Information
              </div>
              <div className="space-y-1 text-sm">
                <p><span className="font-medium">Name:</span> {patientProfile?.name || "N/A"}</p>
                <p><span className="font-medium">Age:</span> {patientProfile?.age || "N/A"} years</p>
                <p><span className="font-medium">Gender:</span> {patientProfile?.gender || "N/A"}</p>
              </div>
            </div>
            
            <div className="space-y-2">
              <div className="flex items-center gap-2 text-foreground font-semibold">
                <UtensilsCrossed className="w-4 h-4" />
                Dietary Details
              </div>
              <div className="space-y-1 text-sm">
                <p><span className="font-medium">Preference:</span> {patientProfile?.dietaryHabits || "N/A"}</p>
                <p><span className="font-medium">Constitution:</span> {patientProfile?.constitution || "N/A"}</p>
                <p><span className="font-medium">Total Items:</span> {totalItems}</p>
              </div>
            </div>
            
            <div className="space-y-2">
              <div className="flex items-center gap-2 text-foreground font-semibold">
                <Calendar className="w-4 h-4" />
                Chart Details
              </div>
              <div className="space-y-1 text-sm">
                <p><span className="font-medium">Generated:</span> {currentDate}</p>
                <p><span className="font-medium">Plan Duration:</span> 7 days</p>
                <p><span className="font-medium">Next Review:</span> {new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toLocaleDateString()}</p>
              </div>
            </div>
          </div>
        </Card>

        {/* Diet Plan Cards */}
        <div className="grid lg:grid-cols-2 gap-6 mb-8">
          {mealTimes.map((meal) => {
            const mealItems = groupedDietPlan[meal.id];
            const Icon = meal.icon;
            
            return (
              <Card key={meal.id} className="shadow-card bg-card print:shadow-none print:border">
                <div className={`p-4 rounded-t-lg ${meal.color} print:bg-gray-50`}>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 bg-primary rounded-full flex items-center justify-center shadow-soft">
                        <Icon className="w-5 h-5 text-primary-foreground" />
                      </div>
                      <div>
                        <h3 className="text-lg font-semibold text-foreground">{meal.name}</h3>
                        <p className="text-sm text-muted-foreground">{meal.time}</p>
                      </div>
                    </div>
                    <Badge variant="secondary" className="font-medium">
                      {mealItems.length} items
                    </Badge>
                  </div>
                </div>
                
                <div className="p-6">
                  {mealItems.length > 0 ? (
                    <div className="space-y-4">
                      {mealItems.map((item, index) => (
                        <div key={`${item.id}-${index}`} className="border-l-4 border-primary pl-4 py-2">
                          <h4 className="font-medium text-foreground mb-2">{item.name}</h4>
                          <div className="flex flex-wrap gap-1 mb-2">
                            <Badge variant="outline" className="text-xs">
                              {item.category}
                            </Badge>
                            <Badge className="text-xs bg-wisdom text-accent-foreground">
                              {item.taste}
                            </Badge>
                          </div>
                          <div className="flex flex-wrap gap-1">
                            {item.properties.map((prop, propIndex) => (
                              <Badge key={propIndex} variant="secondary" className="text-xs">
                                {prop}
                              </Badge>
                            ))}
                          </div>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <p className="text-muted-foreground text-center py-8 italic">
                      No foods selected for {meal.name.toLowerCase()}
                    </p>
                  )}
                </div>
              </Card>
            );
          })}
        </div>

        {/* Ayurvedic Guidelines */}
        <Card className="p-6 mb-8 shadow-card bg-muted/30 print:shadow-none print:border">
          <h3 className="text-xl font-semibold text-foreground mb-4 flex items-center gap-2">
            <Leaf className="w-5 h-5 text-primary" />
            Ayurvedic Guidelines
          </h3>
          <div className="grid md:grid-cols-2 gap-6 text-sm">
            <div className="space-y-2">
              <h4 className="font-medium text-foreground">Eating Practices:</h4>
              <ul className="space-y-1 text-muted-foreground">
                <li>• Eat in a calm, peaceful environment</li>
                <li>• Chew food thoroughly and eat slowly</li>
                <li>• Avoid drinking cold water with meals</li>
                <li>• Eat your largest meal at lunch time</li>
              </ul>
            </div>
            <div className="space-y-2">
              <h4 className="font-medium text-foreground">Timing Guidelines:</h4>
              <ul className="space-y-1 text-muted-foreground">
                <li>• Have dinner 3 hours before bedtime</li>
                <li>• Include all six tastes in your meals</li>
                <li>• Fresh, seasonal foods are preferred</li>
                <li>• Stay hydrated with warm water</li>
              </ul>
            </div>
          </div>
        </Card>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row gap-4 print:hidden">
          <Button
            variant="outline"
            onClick={() => navigate("/food-selection")}
            className="flex-1"
          >
            Modify Diet Plan
          </Button>
          <Button
            variant="secondary"
            onClick={handlePrint}
            className="flex-1"
          >
            Print Chart
          </Button>
          <Button
            variant="healing"
            onClick={handleDownload}
            className="flex-1"
          >
            <Download className="w-4 h-4 mr-2" />
            Download PDF
          </Button>
        </div>
      </div>
    </div>
  );
};

export default DietChart;