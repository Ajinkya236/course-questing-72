
import React from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { 
  Select, 
  SelectContent, 
  SelectItem, 
  SelectTrigger, 
  SelectValue 
} from '@/components/ui/select';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { Plus, X } from 'lucide-react';
import { toast } from '@/hooks/use-toast';
import { CriteriaItem } from './types';
import { getCriteriaTypeLabel, getOperatorLabel } from './utils';

interface CriteriaFormProps {
  criteria: CriteriaItem[];
  setCriteria: React.Dispatch<React.SetStateAction<CriteriaItem[]>>;
}

const CriteriaForm: React.FC<CriteriaFormProps> = ({ criteria, setCriteria }) => {
  const [criteriaType, setCriteriaType] = React.useState<CriteriaItem['type']>('jobRole');
  const [criteriaValue, setCriteriaValue] = React.useState('');
  const [criteriaOperator, setCriteriaOperator] = React.useState<CriteriaItem['operator']>('equals');

  const addCriteria = () => {
    if (!criteriaValue.trim()) {
      toast({
        title: "Criteria value required",
        description: "Please enter a value for the criteria.",
        variant: "destructive",
      });
      return;
    }

    const newCriteria: CriteriaItem = {
      id: crypto.randomUUID(),
      type: criteriaType,
      value: criteriaValue,
      operator: criteriaOperator,
    };

    setCriteria([...criteria, newCriteria]);
    setCriteriaValue('');
  };

  const removeCriteria = (id: string) => {
    setCriteria(criteria.filter(item => item.id !== id));
  };

  return (
    <div className="space-y-4">
      <div className="flex flex-col space-y-4">
        <div className="grid grid-cols-12 gap-3">
          <div className="col-span-3">
            <Select
              value={criteriaType}
              onValueChange={(value: CriteriaItem['type']) => setCriteriaType(value)}
            >
              <SelectTrigger>
                <SelectValue placeholder="Criteria Type" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="jobRole">Job Role</SelectItem>
                <SelectItem value="employeeId">Employee ID</SelectItem>
                <SelectItem value="joiningDate">Date of Joining</SelectItem>
                <SelectItem value="location">Location</SelectItem>
              </SelectContent>
            </Select>
          </div>
          
          <div className="col-span-3">
            <Select
              value={criteriaOperator}
              onValueChange={(value: CriteriaItem['operator']) => setCriteriaOperator(value)}
            >
              <SelectTrigger>
                <SelectValue placeholder="Operator" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="equals">Equals</SelectItem>
                <SelectItem value="contains">Contains</SelectItem>
                {criteriaType === 'joiningDate' && (
                  <>
                    <SelectItem value="before">Before</SelectItem>
                    <SelectItem value="after">After</SelectItem>
                    <SelectItem value="between">Between</SelectItem>
                  </>
                )}
              </SelectContent>
            </Select>
          </div>
          
          <div className="col-span-4">
            <Input
              placeholder="Enter value"
              value={criteriaValue}
              onChange={(e) => setCriteriaValue(e.target.value)}
              type={criteriaType === 'joiningDate' ? 'date' : 'text'}
            />
          </div>
          
          <div className="col-span-2">
            <Button 
              type="button" 
              onClick={addCriteria} 
              className="w-full"
            >
              <Plus className="h-4 w-4 mr-2" /> Add
            </Button>
          </div>
        </div>
      </div>

      {criteria.length > 0 ? (
        <div className="border rounded-md overflow-hidden">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Type</TableHead>
                <TableHead>Operator</TableHead>
                <TableHead>Value</TableHead>
                <TableHead className="w-[50px]">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {criteria.map((item) => (
                <TableRow key={item.id}>
                  <TableCell>{getCriteriaTypeLabel(item.type)}</TableCell>
                  <TableCell>{getOperatorLabel(item.operator)}</TableCell>
                  <TableCell>{item.value}</TableCell>
                  <TableCell>
                    <Button
                      type="button"
                      variant="ghost"
                      size="sm"
                      onClick={() => removeCriteria(item.id)}
                      className="text-destructive"
                    >
                      <X className="h-4 w-4" />
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      ) : (
        <div className="text-center py-6 text-muted-foreground border rounded-md">
          No criteria defined yet. Add your first criteria above.
        </div>
      )}
    </div>
  );
};

export default CriteriaForm;
