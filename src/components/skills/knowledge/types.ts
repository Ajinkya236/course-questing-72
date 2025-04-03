
export type SourceType = 'link' | 'text' | 'file';

export interface Source {
  id: string;
  type: SourceType;
  content: string;
  description?: string;
  name?: string; // Adding optional name property
}

export interface KnowledgeSourcesProps {
  sources: string[];
  setSources: React.Dispatch<React.SetStateAction<string[]>>;
  onSubmit: () => void;
}
