import React from 'react';
import { useWizard } from '../context/WizardContext';
import { GlassCard } from '../../../components/ui/GlassCard';
import { FileText, Calendar, Building, Info } from 'lucide-react';
import { motion } from 'motion/react';

export const Step14Quotation: React.FC = () => {
  const { form, liveCost, nextStep, prevStep } = useWizard();
  
  const data = form.getValues();
  const date = new Date().toLocaleDateString('en-IN', { year: 'numeric', month: 'long', day: 'numeric' });

  const formatINR = (val: number) => 
    new Intl.NumberFormat('en-IN', { style: 'currency', currency: 'INR', maximumFractionDigits: 0 }).format(val);

  return (
    <GlassCard className="p-8">
      <div className="mb-8 text-center">
        <h2 className="text-3xl font-serif text-foreground">Official Quotation</h2>
        <p className="mt-2 text-muted-foreground">Your project proposal is ready.</p>
      </div>

      <div className="bg-white rounded-xl border border-border shadow-sm p-8 max-w-2xl mx-auto">
        {/* Header */}
        <div className="flex justify-between items-start border-b border-border pb-6 mb-6">
          <div>
            <h1 className="text-2xl font-serif text-charcoal-900 font-bold tracking-tight">Interior Me.</h1>
            <p className="text-sm text-muted-foreground mt-1">Premium Interior Design Services</p>
          </div>
          <div className="text-right">
            <h2 className="text-lg font-bold text-foreground">PROPOSAL</h2>
            <p className="text-sm text-muted-foreground">REF: IM-{Math.floor(Math.random() * 10000)}</p>
            <p className="text-sm text-muted-foreground mt-1">{date}</p>
          </div>
        </div>

        {/* Client Info */}
        <div className="flex flex-col md:flex-row justify-between mb-8 gap-4">
          <div>
            <h3 className="text-xs font-bold text-muted-foreground uppercase tracking-wider mb-2">Prepared For</h3>
            <p className="text-sm font-medium text-foreground">{data.customer?.firstName} {data.customer?.lastName}</p>
            <p className="text-sm text-muted-foreground">{data.customer?.phone}</p>
            <p className="text-sm text-muted-foreground">{data.customer?.email}</p>
          </div>
          <div>
            <h3 className="text-xs font-bold text-muted-foreground uppercase tracking-wider mb-2">Project Details</h3>
            <p className="text-sm flex items-center gap-2 text-muted-foreground"><Building size={14}/> {data.property?.propertyName || 'Residential Property'}</p>
            <p className="text-sm text-muted-foreground mt-1">City: {data.property?.city || 'Not specified'}</p>
            <p className="text-sm text-muted-foreground mt-1">Area: {data.property?.carpetArea || 0} sqft</p>
          </div>
        </div>

        {/* Cost Table */}
        <div className="mb-8">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-border text-left text-muted-foreground">
                <th className="pb-2 font-medium">Description</th>
                <th className="pb-2 font-medium text-right">Amount</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border">
              <tr>
                <td className="py-3">Base Structural & Civil Work</td>
                <td className="py-3 text-right">{formatINR(liveCost?.baseCost || 0)}</td>
              </tr>
              <tr>
                <td className="py-3">Modular Furniture & Finishes ({data.design?.materialPreference} grade)</td>
                <td className="py-3 text-right">{formatINR(liveCost?.materialsCost || 0)}</td>
              </tr>
              <tr>
                <td className="py-3">Design & Management Fee (8%)</td>
                <td className="py-3 text-right">{formatINR(liveCost?.designFee || 0)}</td>
              </tr>
            </tbody>
            <tfoot>
              <tr className="border-t-2 border-charcoal-900">
                <td className="py-4 font-bold text-lg text-foreground">Total Proposal Amount</td>
                <td className="py-4 font-bold text-xl text-charcoal-900 text-right">{formatINR(liveCost?.totalCost || 0)}</td>
              </tr>
            </tfoot>
          </table>
        </div>

        {/* Terms */}
        <div className="bg-sand-50 p-4 rounded-lg border border-border">
          <h4 className="text-xs font-bold text-foreground flex items-center gap-1 mb-2">
            <Info size={14} /> Next Steps
          </h4>
          <p className="text-xs text-muted-foreground leading-relaxed">
            This is a preliminary proposal. The final contract amount will be determined after an on-site visit and final material selection with your matched designer. Book a consultation below to proceed.
          </p>
        </div>
      </div>

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
          className="px-6 py-3 flex items-center gap-2 rounded-lg bg-primary text-white hover:bg-primary/90 transition-colors font-medium shadow-sm"
        >
          <Calendar size={18} /> Book Consultation
        </button>
      </div>
    </GlassCard>
  );
};
