
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
      <Card className="bg-white border-gray-200">
        <CollapsibleTrigger asChild>
          <CardHeader className="pb-3 cursor-pointer hover:bg-gray-50 transition-colors">
            <CardTitle className="text-gray-900 text-lg flex items-center justify-between">
              <div className="flex items-center">
                <span className="text-lg mr-2">💡</span>
                Exemplos por Nicho
              </div>
              {expandedExamples ? (
                <ChevronUp className="h-5 w-5 text-gray-500" />
              ) : (
                <ChevronDown className="h-5 w-5 text-gray-500" />
              )}
            </CardTitle>
          </CardHeader>
        </CollapsibleTrigger>
        <CollapsibleContent>
          <CardContent>
            <div className="examples-grid grid gap-4 md:grid-cols-2 lg:grid-cols-2">
              {Object.entries(contentCard.examples).map(([niche, types]: [string, any]) => (
                <div key={niche} className="example-niche-card bg-green-50 border border-green-200 rounded-lg p-4 border-l-4 border-l-green-500">
                  <h4 className="niche-title text-green-700 font-semibold text-sm uppercase tracking-wide mb-3 text-center">
                    {niche}
                  </h4>
                  <div className="types-list space-y-2">
                    <div className="type-item flex items-start p-2 bg-white rounded border-b border-green-100">
                      <span className="type-number bg-green-500 text-white w-5 h-5 rounded-full flex items-center justify-center text-xs font-semibold mr-2 flex-shrink-0 mt-0.5">1</span>
                      <span className="type-description text-green-800 text-sm leading-tight">{types.tipo_1}</span>
                    </div>
                    <div className="type-item flex items-start p-2 bg-white rounded border-b border-green-100">
                      <span className="type-number bg-green-500 text-white w-5 h-5 rounded-full flex items-center justify-center text-xs font-semibold mr-2 flex-shrink-0 mt-0.5">2</span>
                      <span className="type-description text-green-800 text-sm leading-tight">{types.tipo_2}</span>
                    </div>
                    <div className="type-item flex items-start p-2 bg-white rounded">
                      <span className="type-number bg-green-500 text-white w-5 h-5 rounded-full flex items-center justify-center text-xs font-semibold mr-2 flex-shrink-0 mt-0.5">3</span>
                      <span className="type-description text-green-800 text-sm leading-tight">{types.tipo_3}</span>
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
