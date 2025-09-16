import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { ChefHat, Sparkles, Loader2 } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { analyzeRecipe } from "@/lib/gemini";

const RecipeAnalyzer = () => {
  const [recipeText, setRecipeText] = useState("");
  const [analysis, setAnalysis] = useState<any>(null);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const { toast } = useToast();

  const handleAnalyze = async () => {
    if (!recipeText.trim()) {
      toast({
        title: "Empty Recipe",
        description: "Please enter a recipe to analyze",
        variant: "destructive"
      });
      return;
    }

    setIsAnalyzing(true);
    try {
      const result = await analyzeRecipe(recipeText);
      setAnalysis(result);
      toast({
        title: "Recipe Analyzed",
        description: "Ayurvedic analysis complete",
      });
    } catch (error) {
      toast({
        title: "Analysis Failed",
        description: "Please try again",
        variant: "destructive"
      });
    } finally {
      setIsAnalyzing(false);
    }
  };

  return (
    <div className="min-h-screen py-12 px-4">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-healing rounded-full shadow-healing mb-6">
            <ChefHat className="w-8 h-8 text-primary-foreground" />
          </div>
          <h1 className="text-4xl font-bold text-foreground mb-4">
            Recipe Analyzer
          </h1>
          <p className="text-lg text-muted-foreground">
            AI-powered Ayurvedic analysis of your recipes
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-8">
          <Card className="p-6">
            <h2 className="text-xl font-semibold mb-4">Enter Recipe</h2>
            <Textarea
              placeholder="Enter your recipe ingredients and instructions..."
              value={recipeText}
              onChange={(e) => setRecipeText(e.target.value)}
              rows={10}
              className="mb-4"
            />
            <Button 
              onClick={handleAnalyze}
              disabled={isAnalyzing}
              variant="healing"
              className="w-full"
            >
              {isAnalyzing ? (
                <Loader2 className="w-4 h-4 mr-2 animate-spin" />
              ) : (
                <Sparkles className="w-4 h-4 mr-2" />
              )}
              {isAnalyzing ? "Analyzing..." : "🤖 Analyze Recipe"}
            </Button>
          </Card>

          {analysis && (
            <Card className="p-6">
              <h2 className="text-xl font-semibold mb-4">Ayurvedic Analysis</h2>
              
              <div className="space-y-4">
                <div>
                  <h3 className="font-medium mb-2">Ingredients</h3>
                  <div className="flex flex-wrap gap-1">
                    {analysis.ingredients?.map((ingredient: string, index: number) => (
                      <Badge key={index} variant="outline" className="text-xs">
                        {ingredient}
                      </Badge>
                    ))}
                  </div>
                </div>

                <div>
                  <h3 className="font-medium mb-2">Dosha Effects</h3>
                  <div className="space-y-1 text-sm">
                    <div>🌬️ Vata: {analysis.dosha_effects?.vata}</div>
                    <div>🔥 Pitta: {analysis.dosha_effects?.pitta}</div>
                    <div>🌍 Kapha: {analysis.dosha_effects?.kapha}</div>
                  </div>
                </div>

                <div>
                  <h3 className="font-medium mb-2">Taste & Properties</h3>
                  <Badge className="mb-2">{analysis.taste}</Badge>
                  <div className="flex flex-wrap gap-1">
                    {analysis.properties?.map((prop: string, index: number) => (
                      <Badge key={index} variant="secondary" className="text-xs">
                        {prop}
                      </Badge>
                    ))}
                  </div>
                </div>

                <div>
                  <h3 className="font-medium mb-2">Recommendations</h3>
                  <p className="text-sm text-muted-foreground">
                    {analysis.recommendations}
                  </p>
                </div>
              </div>
            </Card>
          )}
        </div>
      </div>
    </div>
  );
};

export default RecipeAnalyzer;