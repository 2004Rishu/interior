import React from 'react';
import { useWizard } from '../context/WizardContext';
import { GlassCard } from '../../../components/ui/GlassCard';
import { Download, ReceiptText } from 'lucide-react';
import { motion } from 'motion/react';

export const Step12CostBreakdown: React.FC = () => {
  const { liveCost, nextStep, prevStep } = useWizard();

  const formatINR = (val: number) => 
    new Intl.NumberFormat('en-IN', { style: 'currency', currency: 'INR', maximumFractionDigits: 0 }).format(val);

  return (
    <GlassCard className="p-8">
      <div className="mb-8 text-center">
        <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-green-100 text-green-600 mb-4">
          <ReceiptText size={32} />
        </div>
        <h2 className="text-3xl font-serif text-foreground">Detailed Cost Breakdown</h2>
        <p className="mt-2 text-muted-foreground">A transparent look at how your estimated budget is distributed.</p>
      </div>

      <div className="bg-white rounded-2xl border border-border overflow-hidden shadow-sm">
        <div className="p-6">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr>
                <th className="pb-4 font-semibold text-muted-foreground border-b border-border uppercase tracking-wider text-sm">Category</th>
                <th className="pb-4 font-semibold text-muted-foreground border-b border-border uppercase tracking-wider text-sm text-right">Estimated Cost (INR)</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border">
              <tr>
                <td className="py-4 text-foreground font-medium">Base Execution Cost</td>
                <td className="py-4 text-right font-medium">{formatINR(liveCost?.baseCost || 0)}</td>
              </tr>
              <tr>
                <td className="py-4 text-foreground font-medium">Materials & Finishes</td>
                <td className="py-4 text-right font-medium">{formatINR(liveCost?.materialsCost || 0)}</td>
              </tr>
              <tr>
                <td className="py-4 text-foreground font-medium">Design & Consultation Fee</td>
                <td className="py-4 text-right font-medium">{formatINR(liveCost?.designFee || 0)}</td>
              </tr>
              <tr>
                <td className="py-4 text-foreground font-medium text-sm text-muted-foreground">Taxes & Logistics (Estimated)</td>
                <td className="py-4 text-right text-sm text-muted-foreground">+ 18% GST Applicable Later</td>
              </tr>
            </tbody>
            <tfoot>
              <tr>
                <td className="pt-6 pb-2 text-lg font-serif font-bold text-foreground border-t border-border">Total Estimated Budget</td>
                <td className="pt-6 pb-2 text-2xl font-serif font-bold text-charcoal-900 text-right border-t border-border">
                  {formatINR(liveCost?.totalCost || 0)}
                </td>
              </tr>
            </tfoot>
          </table>
        </div>
        
        <div className="bg-muted/30 p-4 border-t border-border flex justify-center">
          <button className="flex items-center gap-2 text-sm font-medium text-charcoal-900 hover:text-primary transition-colors">
            <Download size={16} /> Download Preliminary PDF
          </button>
        </div>
      </div>
      
      <p className="mt-6 text-sm text-center text-muted-foreground">
        Note: This is a system-generated estimate based on standard industry rates in India. Final quotes will be provided by your matched designer.
      </p>

      <div className="mt-10 flex justify-between">
        <button
          type="button"
          onClick={prevStep}
          className="px-6 py-3 rounded-lg border border-border text-foreground hover:bg-muted transition-colors font-medium"
        >
          Back
        </button>
        <button
          type="button"
          onClick={nextStep}
          className="px-6 py-3 rounded-lg bg-primary text-white hover:bg-primary/90 transition-colors font-medium shadow-sm"
        >
          Find My Designer
        </button>
      </div>
    </GlassCard>
  );
};
