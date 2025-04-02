
import { Concept } from './types';
import { toast } from '@/hooks/use-toast';

export const downloadConceptMapAsHTML = (conceptMap: Concept | null, skillName: string, proficiency: string) => {
  if (!conceptMap) return;
  
  // Create styles for the exported HTML
  const styles = `
    body { font-family: Arial, sans-serif; margin: 20px; }
    .concept-map { max-width: 800px; margin: 0 auto; }
    .concept-title { text-align: center; margin-bottom: 20px; }
    .concept-node { margin-bottom: 10px; padding-left: 20px; }
    .node { background-color: #f5f5f5; border: 1px solid #ddd; border-radius: 8px; padding: 10px; margin-bottom: 5px; }
    .node-title { font-weight: bold; }
    .node-description { font-size: 0.9em; color: #555; margin-top: 5px; }
    .proficiency { display: inline-block; padding: 2px 6px; border-radius: 4px; font-size: 0.75em; margin-left: 10px; }
    .beginner { background-color: #d1fae5; color: #047857; }
    .intermediate { background-color: #dbeafe; color: #1e40af; }
    .advanced { background-color: #ede9fe; color: #6d28d9; }
    .expert { background-color: #fee2e2; color: #b91c1c; }
    .children { margin-left: 20px; border-left: 2px dashed #ccc; padding-left: 10px; }
  `;
  
  // Function to recursively generate HTML for concept nodes
  const generateConceptHTML = (concept: Concept): string => {
    const proficiencyClass = (concept.proficiencyLevel || 'Intermediate').toLowerCase();
    
    let html = `
      <div class="concept-node">
        <div class="node">
          <div class="node-header">
            <span class="node-title">${concept.name}</span>
            <span class="proficiency ${proficiencyClass}">${concept.proficiencyLevel || 'Intermediate'}</span>
          </div>
          <div class="node-description">${concept.description}</div>
        </div>
    `;
    
    if (concept.children && concept.children.length > 0) {
      html += '<div class="children">';
      concept.children.forEach(child => {
        html += generateConceptHTML(child);
      });
      html += '</div>';
    }
    
    html += '</div>';
    return html;
  };
  
  // Generate the full HTML document
  const html = `
    <!DOCTYPE html>
    <html>
    <head>
      <title>${skillName} Concept Map</title>
      <style>${styles}</style>
    </head>
    <body>
      <div class="concept-map">
        <h1 class="concept-title">${skillName} Concept Map (${proficiency} Level)</h1>
        ${conceptMap ? generateConceptHTML(conceptMap) : ''}
      </div>
    </body>
    </html>
  `;
  
  // Create a Blob and download link
  const blob = new Blob([html], { type: 'text/html' });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = `${skillName.replace(/\s+/g, '_')}_Concept_Map.html`;
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  URL.revokeObjectURL(url);
  
  toast({
    title: "Concept Map Downloaded",
    description: "The concept map has been downloaded as an HTML file.",
  });
};
