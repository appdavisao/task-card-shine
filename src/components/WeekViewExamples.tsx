
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from '@/components/ui/collapsible';
import { ChevronDown, ChevronUp } from 'lucide-react';

interface ExamplesProps {
  contentCard: any;
  expandedExamples: boolean;
  onExpandExamples: (expanded: boolean) => void;
}

const WeekViewExamples = ({ contentCard, expandedExamples, onExpandExamples }: ExamplesProps) => {
  if (!contentCard.examples || Object.keys(contentCard.examples).length === 0) return null;

  return (
    <Collapsible open={expandedExamples} onOpenChange={onExpandExamples}>
      <Card className="bg-white border-slate-200/60 shadow-sm rounded-xl overflow-hidden">
        <CollapsibleTrigger asChild>
          <CardHeader className="pb-4 cursor-pointer hover:bg-slate-50/50 transition-colors">
            <CardTitle className="text-slate-900 text-lg flex items-center justify-between">
              <div className="flex items-center">
                <span className="text-lg mr-3">💡</span>
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
                <div key={niche} className="bg-gradient-to-br from-slate-50 to-zinc-50 border border-slate-200 rounded-xl p-5 shadow-sm">
                  <h4 className="text-slate-800 font-semibold text-sm uppercase tracking-wide mb-4 text-center bg-white rounded-lg py-2 border border-slate-200 shadow-sm">
                    {niche}
                  </h4>
                  <div className="types-list space-y-3">
                    <div className="type-item flex items-start p-3 bg-white rounded-lg shadow-sm border border-slate-200/60">
                      <span className="bg-gradient-to-r from-slate-700 to-slate-800 text-white w-6 h-6 rounded-full flex items-center justify-center text-xs font-semibold mr-3 flex-shrink-0 mt-0.5 shadow-sm">1</span>
                      <span className="text-slate-700 text-sm leading-tight">{types.tipo_1}</span>
                    </div>
                    <div className="type-item flex items-start p-3 bg-white rounded-lg shadow-sm border border-slate-200/60">
                      <span className="bg-gradient-to-r from-slate-700 to-slate-800 text-white w-6 h-6 rounded-full flex items-center justify-center text-xs font-semibold mr-3 flex-shrink-0 mt-0.5 shadow-sm">2</span>
                      <span className="text-slate-700 text-sm leading-tight">{types.tipo_2}</span>
                    </div>
                    <div className="type-item flex items-start p-3 bg-white rounded-lg shadow-sm border border-slate-200/60">
                      <span className="bg-gradient-to-r from-slate-700 to-slate-800 text-white w-6 h-6 rounded-full flex items-center justify-center text-xs font-semibold mr-3 flex-shrink-0 mt-0.5 shadow-sm">3</span>
                      <span className="text-slate-700 text-sm leading-tight">{types.tipo_3}</span>
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
