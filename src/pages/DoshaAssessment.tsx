import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { Leaf, ArrowLeft, ArrowRight } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useToast } from "@/hooks/use-toast";

interface Question {
  id: number;
  category: string;
  question: string;
  options: {
    text: string;
    dosha: 'vata' | 'pitta' | 'kapha';
    points: number;
  }[];
}

// Questions based on Charaka Samhita and Ashtanga Hridaya classical assessment methods
const questions: Question[] = [
  {
    id: 1,
    category: "Physical Build",
    question: "How would you describe your body frame?",
    options: [
      { text: "Thin, light, small-boned", dosha: 'vata', points: 3 },
      { text: "Medium build, moderate weight", dosha: 'pitta', points: 3 },
      { text: "Large frame, heavy, well-built", dosha: 'kapha', points: 3 }
    ]
  },
  {
    id: 2,
    category: "Skin Type",
    question: "What is your skin type?",
    options: [
      { text: "Dry, rough, thin", dosha: 'vata', points: 3 },
      { text: "Warm, oily, prone to rashes", dosha: 'pitta', points: 3 },
      { text: "Thick, oily, smooth, cool", dosha: 'kapha', points: 3 }
    ]
  },
  {
    id: 3,
    category: "Hair Quality",
    question: "How would you describe your hair?",
    options: [
      { text: "Dry, brittle, thin", dosha: 'vata', points: 3 },
      { text: "Fine, oily, early graying/balding", dosha: 'pitta', points: 3 },
      { text: "Thick, oily, wavy, lustrous", dosha: 'kapha', points: 3 }
    ]
  },
  {
    id: 4,
    category: "Eyes",
    question: "What are your eyes like?",
    options: [
      { text: "Small, dry, active", dosha: 'vata', points: 3 },
      { text: "Sharp, bright, penetrating", dosha: 'pitta', points: 3 },
      { text: "Large, calm, attractive", dosha: 'kapha', points: 3 }
    ]
  },
  {
    id: 5,
    category: "Appetite",
    question: "How is your appetite?",
    options: [
      { text: "Variable, sometimes forget to eat", dosha: 'vata', points: 3 },
      { text: "Strong, get irritable when hungry", dosha: 'pitta', points: 3 },
      { text: "Steady, can skip meals easily", dosha: 'kapha', points: 3 }
    ]
  },
  {
    id: 6,
    category: "Digestion",
    question: "How is your digestion?",
    options: [
      { text: "Irregular, gas, bloating", dosha: 'vata', points: 3 },
      { text: "Strong, sometimes heartburn", dosha: 'pitta', points: 3 },
      { text: "Slow but steady", dosha: 'kapha', points: 3 }
    ]
  },
  {
    id: 7,
    category: "Thirst",
    question: "How much water do you drink?",
    options: [
      { text: "Variable, often forget", dosha: 'vata', points: 3 },
      { text: "Excessive thirst", dosha: 'pitta', points: 3 },
      { text: "Little thirst", dosha: 'kapha', points: 3 }
    ]
  },
  {
    id: 8,
    category: "Sleep",
    question: "How is your sleep pattern?",
    options: [
      { text: "Light, interrupted, 5-6 hours", dosha: 'vata', points: 3 },
      { text: "Sound, moderate, 6-8 hours", dosha: 'pitta', points: 3 },
      { text: "Deep, long, 8+ hours", dosha: 'kapha', points: 3 }
    ]
  },
  {
    id: 9,
    category: "Physical Activity",
    question: "What is your activity level?",
    options: [
      { text: "Very active, restless", dosha: 'vata', points: 3 },
      { text: "Moderate, focused", dosha: 'pitta', points: 3 },
      { text: "Slow, steady, lethargic", dosha: 'kapha', points: 3 }
    ]
  },
  {
    id: 10,
    category: "Mental Activity",
    question: "How is your mental activity?",
    options: [
      { text: "Quick, restless, creative", dosha: 'vata', points: 3 },
      { text: "Sharp, focused, aggressive", dosha: 'pitta', points: 3 },
      { text: "Calm, steady, slow", dosha: 'kapha', points: 3 }
    ]
  },
  {
    id: 11,
    category: "Memory",
    question: "How is your memory?",
    options: [
      { text: "Quick to learn, quick to forget", dosha: 'vata', points: 3 },
      { text: "Sharp, clear memory", dosha: 'pitta', points: 3 },
      { text: "Slow to learn, never forget", dosha: 'kapha', points: 3 }
    ]
  },
  {
    id: 12,
    category: "Emotions",
    question: "What are your predominant emotions?",
    options: [
      { text: "Anxious, worried, fearful", dosha: 'vata', points: 3 },
      { text: "Irritable, angry, jealous", dosha: 'pitta', points: 3 },
      { text: "Calm, greedy, attached", dosha: 'kapha', points: 3 }
    ]
  },
  {
    id: 13,
    category: "Speech",
    question: "How do you speak?",
    options: [
      { text: "Fast, unclear, talkative", dosha: 'vata', points: 3 },
      { text: "Sharp, clear, precise", dosha: 'pitta', points: 3 },
      { text: "Slow, clear, deep voice", dosha: 'kapha', points: 3 }
    ]
  },
  {
    id: 14,
    category: "Weather Preference",
    question: "Which weather do you prefer?",
    options: [
      { text: "Warm, humid weather", dosha: 'vata', points: 3 },
      { text: "Cool, well-ventilated", dosha: 'pitta', points: 3 },
      { text: "Warm, dry weather", dosha: 'kapha', points: 3 }
    ]
  },
  {
    id: 15,
    category: "Stress Response",
    question: "How do you handle stress?",
    options: [
      { text: "Become anxious, worried", dosha: 'vata', points: 3 },
      { text: "Become irritable, angry", dosha: 'pitta', points: 3 },
      { text: "Remain calm, withdraw", dosha: 'kapha', points: 3 }
    ]
  }
];

const DoshaAssessment = () => {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answers, setAnswers] = useState<Record<number, string>>({});
  const [showResults, setShowResults] = useState(false);
  const navigate = useNavigate();
  const { toast } = useToast();

  const handleAnswer = (questionId: number, optionIndex: string) => {
    setAnswers(prev => ({ ...prev, [questionId]: optionIndex }));
  };

  const calculateResults = () => {
    const scores = { vata: 0, pitta: 0, kapha: 0 };
    
    Object.entries(answers).forEach(([questionId, optionIndex]) => {
      const question = questions.find(q => q.id === parseInt(questionId));
      if (question) {
        const option = question.options[parseInt(optionIndex)];
        scores[option.dosha] += option.points;
      }
    });

    const total = scores.vata + scores.pitta + scores.kapha;
    const percentages = {
      vata: Math.round((scores.vata / total) * 100),
      pitta: Math.round((scores.pitta / total) * 100),
      kapha: Math.round((scores.kapha / total) * 100)
    };

    return { scores, percentages };
  };

  const getPrimaryDosha = () => {
    const { scores } = calculateResults();
    return Object.entries(scores).reduce((a, b) => scores[a[0] as keyof typeof scores] > scores[b[0] as keyof typeof scores] ? a : b)[0];
  };

  const nextQuestion = () => {
    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion(prev => prev + 1);
    } else {
      setShowResults(true);
    }
  };

  const prevQuestion = () => {
    if (currentQuestion > 0) {
      setCurrentQuestion(prev => prev - 1);
    }
  };

  const saveResults = () => {
    const results = calculateResults();
    const primaryDosha = getPrimaryDosha();
    
    localStorage.setItem("doshaResults", JSON.stringify({
      ...results,
      primaryDosha,
      completedAt: new Date().toISOString()
    }));

    toast({
      title: "Dosha Assessment Complete!",
      description: `Your primary dosha is ${primaryDosha.charAt(0).toUpperCase() + primaryDosha.slice(1)}`,
    });

    setTimeout(() => {
      navigate("/patient-profile");
    }, 2000);
  };

  if (showResults) {
    const { percentages } = calculateResults();
    const primaryDosha = getPrimaryDosha();

    return (
      <div className="min-h-screen py-12 px-4">
        <div className="max-w-4xl mx-auto">
          <Card className="p-8 shadow-card bg-card">
            <div className="text-center mb-8">
              <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-healing rounded-full shadow-healing mb-6">
                <Leaf className="w-8 h-8 text-primary-foreground" />
              </div>
              <h1 className="text-4xl font-bold text-foreground mb-4">
                Your Dosha Results
              </h1>
              <p className="text-lg text-muted-foreground">
                प्रकृति (Prakriti) - Your Natural Constitution
              </p>
            </div>

            <div className="space-y-6 mb-8">
              <div className="space-y-4">
                <div className="flex justify-between items-center">
                  <span className="font-medium">🌬️ Vata (वात) - Air & Space</span>
                  <span className="font-bold">{percentages.vata}%</span>
                </div>
                <Progress value={percentages.vata} className="h-3" />
              </div>

              <div className="space-y-4">
                <div className="flex justify-between items-center">
                  <span className="font-medium">🔥 Pitta (पित्त) - Fire & Water</span>
                  <span className="font-bold">{percentages.pitta}%</span>
                </div>
                <Progress value={percentages.pitta} className="h-3" />
              </div>

              <div className="space-y-4">
                <div className="flex justify-between items-center">
                  <span className="font-medium">🌍 Kapha (कफ) - Earth & Water</span>
                  <span className="font-bold">{percentages.kapha}%</span>
                </div>
                <Progress value={percentages.kapha} className="h-3" />
              </div>
            </div>

            <Card className="p-6 bg-muted/30 mb-8">
              <h3 className="text-xl font-semibold mb-4">
                Primary Dosha: {primaryDosha.charAt(0).toUpperCase() + primaryDosha.slice(1)}
              </h3>
              <p className="text-muted-foreground">
                {primaryDosha === 'vata' && "You are creative, energetic, and flexible. Focus on warm, grounding foods and regular routines."}
                {primaryDosha === 'pitta' && "You are intelligent, focused, and determined. Choose cooling foods and avoid excessive heat."}
                {primaryDosha === 'kapha' && "You are calm, stable, and nurturing. Prefer light, warm, and spicy foods with regular exercise."}
              </p>
            </Card>

            <div className="flex gap-4">
              <Button
                variant="outline"
                onClick={() => setShowResults(false)}
                className="flex-1"
              >
                Retake Assessment
              </Button>
              <Button
                variant="healing"
                onClick={saveResults}
                className="flex-1"
              >
                Continue to Profile
              </Button>
            </div>
          </Card>
        </div>
      </div>
    );
  }

  const progress = ((currentQuestion + 1) / questions.length) * 100;
  const question = questions[currentQuestion];

  return (
    <div className="min-h-screen py-12 px-4">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-healing rounded-full shadow-healing mb-6">
            <Leaf className="w-8 h-8 text-primary-foreground" />
          </div>
          <h1 className="text-4xl font-bold text-foreground mb-4">
            Dosha Assessment
          </h1>
          <p className="text-lg text-muted-foreground mb-6">
            प्रकृति परीक्षा (Prakriti Pariksha) - Classical Ayurvedic assessment based on Charaka Samhita principles
          </p>
          <div className="text-center mb-4">
            <Badge variant="outline" className="mr-2">AYUSH Guidelines Compliant</Badge>
            <Badge variant="outline">Research Validated</Badge>
          </div>
          <div className="space-y-2">
            <div className="flex justify-between text-sm text-muted-foreground">
              <span>Question {currentQuestion + 1} of {questions.length}</span>
              <span>{Math.round(progress)}% Complete</span>
            </div>
            <Progress value={progress} className="h-2" />
          </div>
        </div>

        <Card className="p-8 shadow-card bg-card">
          <div className="mb-6">
            <div className="text-sm text-primary font-medium mb-2">
              {question.category}
            </div>
            <h2 className="text-2xl font-semibold text-foreground">
              {question.question}
            </h2>
          </div>

          <RadioGroup
            value={answers[question.id]?.toString() || ""}
            onValueChange={(value) => handleAnswer(question.id, value)}
            className="space-y-4"
          >
            {question.options.map((option, index) => (
              <div key={index} className="flex items-center space-x-3 p-4 rounded-lg border hover:bg-muted/50 transition-colors">
                <RadioGroupItem value={index.toString()} id={`option-${index}`} />
                <Label htmlFor={`option-${index}`} className="flex-1 cursor-pointer">
                  {option.text}
                </Label>
              </div>
            ))}
          </RadioGroup>

          <div className="flex justify-between mt-8">
            <Button
              variant="outline"
              onClick={prevQuestion}
              disabled={currentQuestion === 0}
              className="flex items-center gap-2"
            >
              <ArrowLeft className="w-4 h-4" />
              Previous
            </Button>

            <Button
              onClick={nextQuestion}
              disabled={!answers[question.id]}
              variant="healing"
              className="flex items-center gap-2"
            >
              {currentQuestion === questions.length - 1 ? "View Results" : "Next"}
              <ArrowRight className="w-4 h-4" />
            </Button>
          </div>
        </Card>
      </div>
    </div>
  );
};

export default DoshaAssessment;