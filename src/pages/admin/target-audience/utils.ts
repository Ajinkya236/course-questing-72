
import { CriteriaItem } from './types';

export const getCriteriaTypeLabel = (type: CriteriaItem['type']) => {
  switch(type) {
    case 'jobRole': return 'Job Role';
    case 'employeeId': return 'Employee ID';
    case 'joiningDate': return 'Date of Joining';
    case 'location': return 'Location';
    default: return type;
  }
};

export const getOperatorLabel = (operator?: CriteriaItem['operator']) => {
  if (!operator) return '';
  switch(operator) {
    case 'equals': return 'equals';
    case 'contains': return 'contains';
    case 'before': return 'before';
    case 'after': return 'after';
    case 'between': return 'between';
    default: return operator;
  }
};
