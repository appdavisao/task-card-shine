
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from '@/components/ui/collapsible';
import { ChevronDown, ChevronUp, Lightbulb } from 'lucide-react';

interface ExamplesProps {
  contentCard: any;
  expandedExamples: boolean;
  onExpandExamples: (expanded: boolean) => void;
}

const WeekViewExamples = ({ contentCard, expandedExamples, onExpandExamples }: ExamplesProps) => {
  if (!contentCard.examples || Object.keys(contentCard.examples).length === 0) return null;

  return (
    <Collapsible open={expandedExamples} onOpenChange={onExpandExamples}>
      <Card className="bg-gradient-to-br from-white to-blue-50/30 border-slate-200/60 shadow-soft rounded-2xl overflow-hidden">
        <CollapsibleTrigger asChild>
          <CardHeader className="pb-4 cursor-pointer hover:bg-blue-50/50 transition-colors">
            <CardTitle className="text-slate-900 text-lg flex items-center justify-between">
              <div className="flex items-center">
                <Lightbulb className="h-5 w-5 mr-3 text-amber-600" />
                Exemplos por Nicho
              </div>
              {expandedExamples ? (
                <ChevronUp className="h-5 w-5 text-slate-500" />
              ) : (
                <ChevronDown className="h-5 w-5 text-slate-500" />
              )}
            </CardTitle>
          </CardHeader>
        </CollapsibleTrigger>
        <CollapsibleContent>
          <CardContent className="pt-0">
            <div className="examples-grid grid gap-6 md:grid-cols-2 lg:grid-cols-2">
              {Object.entries(contentCard.examples).map(([niche, types]: [string, any]) => (
                <div key={niche} className="bg-gradient-to-br from-white to-slate-50 border border-slate-200/60 rounded-2xl p-6 shadow-soft">
                  <h4 className="text-slate-800 font-bold text-sm uppercase tracking-wide mb-4 text-center bg-gradient-to-r from-blue-600 to-indigo-600 text-white rounded-xl py-3 shadow-sm">
                    {niche}
                  </h4>
                  <div className="types-list space-y-4">
                    <div className="type-item flex items-start p-4 bg-gradient-to-r from-blue-50 to-indigo-50 rounded-xl shadow-sm border border-blue-200/60">
                      <span className="bg-gradient-to-r from-blue-600 to-indigo-600 text-white w-7 h-7 rounded-full flex items-center justify-center text-xs font-bold mr-4 flex-shrink-0 mt-0.5 shadow-sm">1</span>
                      <span className="text-slate-700 text-sm leading-tight font-medium">{types.tipo_1}</span>
                    </div>
                    <div className="type-item flex items-start p-4 bg-gradient-to-r from-blue-50 to-indigo-50 rounded-xl shadow-sm border border-blue-200/60">
                      <span className="bg-gradient-to-r from-blue-600 to-indigo-600 text-white w-7 h-7 rounded-full flex items-center justify-center text-xs font-bold mr-4 flex-shrink-0 mt-0.5 shadow-sm">2</span>
                      <span className="text-slate-700 text-sm leading-tight font-medium">{types.tipo_2}</span>
                    </div>
                    <div className="type-item flex items-start p-4 bg-gradient-to-r from-blue-50 to-indigo-50 rounded-xl shadow-sm border border-blue-200/60">
                      <span className="bg-gradient-to-r from-blue-600 to-indigo-600 text-white w-7 h-7 rounded-full flex items-center justify-center text-xs font-bold mr-4 flex-shrink-0 mt-0.5 shadow-sm">3</span>
                      <span className="text-slate-700 text-sm leading-tight font-medium">{types.tipo_3}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </CollapsibleContent>
      </Card>
    </Collapsible>
  );
};

export default WeekViewExamples;
