import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Zap, Droplets, Wheat, Apple } from "lucide-react";

interface NutrientData {
  calories: number;
  protein: number;
  carbs: number;
  fat: number;
  fiber: number;
  vitamins: { name: string; amount: number; unit: string }[];
  minerals: { name: string; amount: number; unit: string }[];
}

interface NutrientAnalysisProps {
  foodItems: any[];
  patientProfile?: any;
}

const NutrientAnalysis = ({ foodItems, patientProfile }: NutrientAnalysisProps) => {
  // Mock nutrient database - in real app, this would come from API
  const nutrientDatabase: Record<string, NutrientData> = {
    "Basmati Rice": {
      calories: 130,
      protein: 2.7,
      carbs: 28,
      fat: 0.3,
      fiber: 0.4,
      vitamins: [
        { name: "B1", amount: 0.07, unit: "mg" },
        { name: "B3", amount: 1.6, unit: "mg" }
      ],
      minerals: [
        { name: "Iron", amount: 0.8, unit: "mg" },
        { name: "Magnesium", amount: 25, unit: "mg" }
      ]
    },
    "Moong Dal": {
      calories: 347,
      protein: 24,
      carbs: 59,
      fat: 1.2,
      fiber: 16,
      vitamins: [
        { name: "Folate", amount: 625, unit: "mcg" },
        { name: "B6", amount: 0.38, unit: "mg" }
      ],
      minerals: [
        { name: "Iron", amount: 6.7, unit: "mg" },
        { name: "Potassium", amount: 1246, unit: "mg" }
      ]
    },
    "Ghee": {
      calories: 900,
      protein: 0,
      carbs: 0,
      fat: 100,
      fiber: 0,
      vitamins: [
        { name: "A", amount: 840, unit: "mcg" },
        { name: "E", amount: 2.8, unit: "mg" }
      ],
      minerals: []
    },
    "Spinach": {
      calories: 23,
      protein: 2.9,
      carbs: 3.6,
      fat: 0.4,
      fiber: 2.2,
      vitamins: [
        { name: "K", amount: 483, unit: "mcg" },
        { name: "A", amount: 469, unit: "mcg" },
        { name: "C", amount: 28, unit: "mg" }
      ],
      minerals: [
        { name: "Iron", amount: 2.7, unit: "mg" },
        { name: "Calcium", amount: 99, unit: "mg" }
      ]
    }
  };

  // Calculate total nutrients
  const calculateTotalNutrients = (): NutrientData => {
    const totals: NutrientData = {
      calories: 0,
      protein: 0,
      carbs: 0,
      fat: 0,
      fiber: 0,
      vitamins: [],
      minerals: []
    };

    foodItems.forEach(item => {
      const nutrientData = nutrientDatabase[item.name];
      if (nutrientData) {
        // Assuming 100g serving size for calculation
        const servingFactor = 1;
        
        totals.calories += nutrientData.calories * servingFactor;
        totals.protein += nutrientData.protein * servingFactor;
        totals.carbs += nutrientData.carbs * servingFactor;
        totals.fat += nutrientData.fat * servingFactor;
        totals.fiber += nutrientData.fiber * servingFactor;
      }
    });

    return totals;
  };

  const totalNutrients = calculateTotalNutrients();

  // Calculate daily requirements based on patient profile
  const getDailyRequirements = () => {
    const age = parseInt(patientProfile?.age || "30");
    const gender = patientProfile?.gender || "male";
    const activityLevel = patientProfile?.exerciseLevel || "moderate";
    
    // Basic calculations - in real app, use more sophisticated formulas
    let baseCalories = gender === "male" ? 2500 : 2000;
    if (activityLevel === "high") baseCalories *= 1.2;
    if (activityLevel === "low") baseCalories *= 0.8;
    
    return {
      calories: baseCalories,
      protein: baseCalories * 0.15 / 4, // 15% of calories from protein
      carbs: baseCalories * 0.55 / 4,   // 55% of calories from carbs
      fat: baseCalories * 0.30 / 9,     // 30% of calories from fat
      fiber: age < 50 ? (gender === "male" ? 38 : 25) : (gender === "male" ? 30 : 21)
    };
  };

  const dailyRequirements = getDailyRequirements();

  const macronutrients = [
    {
      name: "Calories",
      current: Math.round(totalNutrients.calories),
      target: Math.round(dailyRequirements.calories),
      unit: "kcal",
      icon: Zap,
      color: "bg-gradient-healing"
    },
    {
      name: "Protein",
      current: Math.round(totalNutrients.protein),
      target: Math.round(dailyRequirements.protein),
      unit: "g",
      icon: Apple,
      color: "bg-gradient-wisdom"
    },
    {
      name: "Carbs",
      current: Math.round(totalNutrients.carbs),
      target: Math.round(dailyRequirements.carbs),
      unit: "g",
      icon: Wheat,
      color: "bg-gradient-earth"
    },
    {
      name: "Fat",
      current: Math.round(totalNutrients.fat),
      target: Math.round(dailyRequirements.fat),
      unit: "g",
      icon: Droplets,
      color: "bg-primary/10"
    }
  ];

  return (
    <Card className="p-6 shadow-card bg-card">
      <h3 className="text-xl font-semibold text-foreground mb-6 flex items-center gap-2">
        <Zap className="w-5 h-5 text-primary" />
        Automated Nutrient Analysis
      </h3>

      <div className="grid md:grid-cols-2 gap-6 mb-6">
        {macronutrients.map((macro, index) => {
          const percentage = Math.min((macro.current / macro.target) * 100, 100);
          const Icon = macro.icon;
          
          return (
            <div key={index} className="space-y-3">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <div className={`w-8 h-8 ${macro.color} rounded-full flex items-center justify-center`}>
                    <Icon className="w-4 h-4 text-primary-foreground" />
                  </div>
                  <span className="font-medium text-foreground">{macro.name}</span>
                </div>
                <div className="text-right">
                  <div className="font-semibold text-foreground">
                    {macro.current} / {macro.target} {macro.unit}
                  </div>
                  <div className="text-sm text-muted-foreground">
                    {Math.round(percentage)}% of daily target
                  </div>
                </div>
              </div>
              <Progress value={percentage} className="h-2" />
            </div>
          );
        })}
      </div>

      <div className="grid md:grid-cols-3 gap-4">
        <div className="text-center p-4 bg-muted/30 rounded-lg">
          <div className="text-2xl font-bold text-primary">
            {Math.round(totalNutrients.fiber)}g
          </div>
          <div className="text-sm text-muted-foreground">Fiber</div>
          <div className="text-xs text-muted-foreground">
            Target: {dailyRequirements.fiber}g
          </div>
        </div>
        
        <div className="text-center p-4 bg-muted/30 rounded-lg">
          <div className="text-2xl font-bold text-wisdom">
            {foodItems.length}
          </div>
          <div className="text-sm text-muted-foreground">Food Items</div>
          <div className="text-xs text-muted-foreground">
            Analyzed
          </div>
        </div>
        
        <div className="text-center p-4 bg-muted/30 rounded-lg">
          <div className="text-2xl font-bold text-earth">
            {Math.round((totalNutrients.calories / dailyRequirements.calories) * 100)}%
          </div>
          <div className="text-sm text-muted-foreground">Daily Goal</div>
          <div className="text-xs text-muted-foreground">
            Completion
          </div>
        </div>
      </div>

      <div className="mt-4 p-3 bg-primary/5 rounded-lg">
        <p className="text-sm text-muted-foreground">
          <strong>Ayurvedic Note:</strong> This analysis provides modern nutritional data. 
          Consider dosha-specific requirements and food combining principles for optimal results.
        </p>
      </div>
    </Card>
  );
};

export default NutrientAnalysis;