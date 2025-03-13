
import DomainCatalog from "@/components/homepage/DomainCatalog";
import ActionablesCard from "@/components/homepage/ActionablesCard";
import RewardsSummary from "@/components/homepage/RewardsSummary";
import SkillsSection from "@/components/homepage/SkillsSection";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import SyncMockData from "@/components/SyncMockData";

export default function Home() {
  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold">Welcome to Your Learning Hub</h1>
        <Dialog>
          <DialogTrigger asChild>
            <Button variant="outline">Sync Mock Data</Button>
          </DialogTrigger>
          <DialogContent>
            <SyncMockData />
          </DialogContent>
        </Dialog>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
        <div className="md:col-span-2">
          <ActionablesCard />
        </div>
        <div>
          <RewardsSummary />
        </div>
      </div>
      
      <SkillsSection />
      
      <div className="mt-8">
        <DomainCatalog />
      </div>
    </div>
  );
}
