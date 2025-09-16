import { Info } from "lucide-react";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";

interface SanskritTooltipProps {
  sanskrit: string;
  meaning: string;
  pronunciation?: string;
  children: React.ReactNode;
}

const SanskritTooltip = ({ sanskrit, meaning, pronunciation, children }: SanskritTooltipProps) => {
  return (
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger asChild>
          <span className="inline-flex items-center gap-1 cursor-help">
            {children}
            <Info className="w-3 h-3 text-muted-foreground opacity-60 hover:opacity-100 transition-opacity" />
          </span>
        </TooltipTrigger>
        <TooltipContent className="max-w-xs">
          <div className="space-y-1">
            <p className="font-medium text-primary">{sanskrit}</p>
            <p className="text-sm">{meaning}</p>
            {pronunciation && (
              <p className="text-xs text-muted-foreground italic">
                Pronunciation: {pronunciation}
              </p>
            )}
          </div>
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
};

export default SanskritTooltip;