"use client";

import React, { useState } from "react";
import { AccountValuation } from "@/lib/analysis/valuation";
import { StakeholderItem } from "@/lib/analysis/stakeholders";
import { ActionItem } from "@/lib/analysis/recommendations";
import { RiskItem } from "@/lib/analysis/risks";
import { UnknownItem } from "@/lib/analysis/unknowns";
import { DealsTable } from "../deals/DealsTable";
import { StakeholderGrid } from "../stakeholders/StakeholderGrid";
import { ActionList } from "../actions/ActionList";
import { RiskGrid } from "../risks/RiskGrid";
import { UnknownList } from "../unknowns/UnknownList";
import { ValuationChart } from "./ValuationChart";
import { KpiCard } from "./KpiCard";
import {
  DollarSign,
  Users,
  CheckSquare,
  AlertTriangle,
  HelpCircle,
} from "lucide-react";

interface QuestionTabsProps {
  valuation: AccountValuation;
  stakeholders: StakeholderItem[];
  actions: ActionItem[];
  risks: RiskItem[];
  unknowns: UnknownItem[];
}

export const QuestionTabs: React.FC<QuestionTabsProps> = ({
  valuation,
  stakeholders,
  actions,
  risks,
  unknowns,
}) => {
  const [activeTab, setActiveTab] = useState<number>(1);

  const tabs = [
    { id: 1, name: "1. What is the book worth?", short: "Valuation", icon: DollarSign, count: `${valuation.currency}${(valuation.confirmedValue + valuation.potentialValue) >= 1000000 ? ((valuation.confirmedValue + valuation.potentialValue)/1000000).toFixed(1) + "M" : ((valuation.confirmedValue + valuation.potentialValue)/1000).toFixed(0) + "k"}` },
    { id: 2, name: "2. Who holds the power?", short: "Power Map", icon: Users, count: `${stakeholders.length}` },
    { id: 3, name: "3. What do you do first?", short: "Next Steps", icon: CheckSquare, count: "Top 3" },
    { id: 4, name: "4. What is about to go wrong?", short: "Risk Intelligence", icon: AlertTriangle, count: `${risks.length}` },
    { id: 5, name: "5. What do you still not know?", short: "Unknowns", icon: HelpCircle, count: `${unknowns.length}` },
  ];

  return (
    <div className="space-y-6">
      {/* Five Questions Matte Navigation Bar */}
      <div className="flex items-center gap-1.5 p-1.5 rounded-xl bg-[#08080A] border border-[#1C1F26] overflow-x-auto no-scrollbar shadow-inner">
        {tabs.map((tab) => {
          const Icon = tab.icon;
          const isActive = activeTab === tab.id;
          return (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`flex items-center gap-2 px-3.5 py-2 rounded-lg text-xs font-semibold whitespace-nowrap transition-all duration-200 cursor-pointer ${
                isActive
                  ? "bg-[#14161C] text-[#FF5500] shadow-sm border border-[#FF5500]/30"
                  : "text-[#8E929E] hover:text-[#F4F4F5] hover:bg-[#0E1014]"
              }`}
            >
              <Icon className={`w-3.5 h-3.5 transition-colors ${isActive ? "text-[#FF5500]" : "text-[#585E6A]"}`} />
              <span>{tab.name}</span>
              <span className={`text-[10px] font-mono px-1.5 py-0.2 rounded transition-colors ${isActive ? "bg-[#FF5500]/15 text-[#FF5500]" : "bg-[#000000] text-[#71717A]"}`}>
                {tab.count}
              </span>
            </button>
          );
        })}
      </div>

      {/* Tab 1: Valuation */}
      {activeTab === 1 && (
        <div className="space-y-6 section-matte-enter">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-3">
            <KpiCard
              title="Confirmed Framework"
              value={`${valuation.currency}${valuation.confirmedValue.toLocaleString()}`}
              subtitle="Agreed specification in prep"
              badge="Confirmed"
              badgeColor="green"
            />
            <KpiCard
              title="Active Pipeline"
              value={`${valuation.currency}${valuation.potentialValue.toLocaleString()}`}
              subtitle="Qualified expansion & open offers"
              badge="Active"
              badgeColor="orange"
            />
            <KpiCard
              title="At-Risk Deal Value"
              value={`${valuation.currency}${valuation.atRiskValue.toLocaleString()}`}
              subtitle="Blocked on DPIA or flight records"
              badge="At Risk"
              badgeColor="red"
            />
            <KpiCard
              title="Closed / Won Deals"
              value={`${valuation.currency}${valuation.closedValue.toLocaleString()}`}
              subtitle="Realized contract wins"
              badge="Won"
              badgeColor="green"
            />
            <KpiCard
              title="Unverified Claims"
              value={`${valuation.currency}${valuation.unsupportedProjectionsValue.toLocaleString()}`}
              subtitle="Excluded from pipeline totals"
              badge="Unverified"
              badgeColor="gray"
            />
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <div className="lg:col-span-1 p-5 rounded-xl matte-card space-y-4">
              <div>
                <h3 className="text-sm font-semibold text-[#F4F4F5]">Pipeline Distribution</h3>
                <p className="text-xs text-[#8E929E]">Contractual reality vs unverified claims</p>
              </div>
              <ValuationChart
                confirmed={valuation.confirmedValue}
                active={valuation.potentialValue}
                atRisk={valuation.atRiskValue}
                closed={valuation.closedValue}
                unsupported={valuation.unsupportedProjectionsValue}
                currency={valuation.currency}
              />
            </div>

            <div className="lg:col-span-2 space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="text-sm font-semibold text-[#F4F4F5]">Deal-by-Deal Evidence Breakdown</h3>
                  <p className="text-xs text-[#8E929E]">Every financial figure is traceable to its source record</p>
                </div>
              </div>
              <DealsTable deals={valuation.deals} showAccountFilter={false} />
            </div>
          </div>
        </div>
      )}

      {/* Tab 2: Stakeholders */}
      {activeTab === 2 && (
        <div className="space-y-4 section-matte-enter">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-sm font-semibold text-[#F4F4F5]">Power & Influence Matrix</h3>
              <p className="text-xs text-[#8E929E]">
                Decision authority, budget control, and departure warnings
              </p>
            </div>
          </div>
          <StakeholderGrid stakeholders={stakeholders} showAccountFilter={false} />
        </div>
      )}

      {/* Tab 3: Actions */}
      {activeTab === 3 && (
        <div className="space-y-4 section-matte-enter">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-sm font-semibold text-[#F4F4F5]">Ranked Action Plan</h3>
              <p className="text-xs text-[#8E929E]">Top actions prioritized by business impact and urgency</p>
            </div>
          </div>
          <ActionList actions={actions} showAccountFilter={false} />
        </div>
      )}

      {/* Tab 4: Risks */}
      {activeTab === 4 && (
        <div className="space-y-4 section-matte-enter">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-sm font-semibold text-[#F4F4F5]">Risk Intelligence Matrix</h3>
              <p className="text-xs text-[#8E929E]">Approaching deadlines, unanswered tickets, and adoption hazards</p>
            </div>
          </div>
          <RiskGrid risks={risks} showAccountFilter={false} />
        </div>
      )}

      {/* Tab 5: Unknowns */}
      {activeTab === 5 && (
        <div className="space-y-4 section-matte-enter">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-sm font-semibold text-[#F4F4F5]">Critical Knowledge Gaps</h3>
              <p className="text-xs text-[#8E929E]">Unconfirmed authorities, missing files, and prescribed discovery questions</p>
            </div>
          </div>
          <UnknownList unknowns={unknowns} showAccountFilter={false} />
        </div>
      )}
    </div>
  );
};
