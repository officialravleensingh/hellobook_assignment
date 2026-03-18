import { Building2 } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';

export default function Settings() {
  return (
    <div className="p-6 max-w-3xl">
      <Card>
        <CardHeader>
          <CardTitle className="text-base flex items-center gap-2">
            <Building2 className="w-4 h-4" /> Company Profile
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="text-xs font-medium text-muted-foreground mb-1.5 block">Company Name</label>
              <Input placeholder="Enter company name" />
            </div>
            <div>
              <label className="text-xs font-medium text-muted-foreground mb-1.5 block">Industry</label>
              <Input defaultValue="Logistics & Transportation" disabled />
            </div>
            <div>
              <label className="text-xs font-medium text-muted-foreground mb-1.5 block">GST Number</label>
              <Input placeholder="e.g. 27AABCU9603R1ZX" />
            </div>
            <div>
              <label className="text-xs font-medium text-muted-foreground mb-1.5 block">PAN Number</label>
              <Input placeholder="e.g. AABCU9603R" />
            </div>
            <div className="col-span-2">
              <label className="text-xs font-medium text-muted-foreground mb-1.5 block">Registered Address</label>
              <Input placeholder="Enter registered address" />
            </div>
          </div>
          <div className="flex justify-end">
            <Button size="sm">Save Changes</Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
