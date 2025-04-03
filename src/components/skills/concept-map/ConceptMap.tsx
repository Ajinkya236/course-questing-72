
import React, { useState, useRef, useEffect } from 'react';
import { Lightbulb, Download, ArrowLeft } from 'lucide-react';
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { useConceptMapGeneration } from './useConceptMapGeneration';
import { downloadConceptMapAsHTML } from './conceptMapExport';
import ConceptNode from './ConceptNode';
import ProficiencyLegend from './ProficiencyLegend';
import { ConceptMapProps } from './types';

const ConceptMap: React.FC<ConceptMapProps> = ({ 
  skillName, 
  skillDescription = '', 
  proficiency 
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [isFullScreen, setIsFullScreen] = useState(false);
  const conceptMapRef = useRef<HTMLDivElement>(null);
  
  const {
    isLoading,
    conceptMap,
    expandedNodes,
    generateConceptMap,
    toggleNode
  } = useConceptMapGeneration(skillName, skillDescription, proficiency);

  const handleDialogOpenChange = (open: boolean) => {
    setIsOpen(open);
    if (open && !conceptMap) {
      generateConceptMap();
    }
  };

  const handleOpenFullScreen = () => {
    setIsFullScreen(true);
    if (!conceptMap) {
      generateConceptMap();
    }
    // Open in full window
    const newWindow = window.open('', '_blank');
    if (newWindow) {
      newWindow.document.write(`
        <!DOCTYPE html>
        <html>
          <head>
            <title>${skillName} Concept Map</title>
            <meta name="viewport" content="width=device-width, initial-scale=1" />
            <style>
              body { font-family: system-ui, sans-serif; margin: 0; padding: 20px; background-color: #f9fafb; }
              h1 { font-size: 24px; margin-bottom: 20px; }
              .container { max-width: 1200px; margin: 0 auto; }
              .header { display: flex; justify-content: space-between; align-items: center; margin-bottom: 20px; }
              .back-button { display: flex; align-items: center; gap: 8px; background: #f3f4f6; border: none; padding: 8px 16px; border-radius: 4px; cursor: pointer; }
              .download-button { background: #f3f4f6; border: none; padding: 8px 16px; border-radius: 4px; cursor: pointer; }
              .concept-map { background: white; border: 1px solid #e5e7eb; border-radius: 8px; padding: 20px; }
              .loading { display: flex; flex-direction: column; align-items: center; padding: 40px; }
              .spinner { border: 4px solid #f3f4f6; border-top: 4px solid #3b82f6; border-radius: 50%; width: 30px; height: 30px; animation: spin 1s linear infinite; }
              @keyframes spin { 0% { transform: rotate(0deg); } 100% { transform: rotate(360deg); } }
            </style>
          </head>
          <body>
            <div class="container">
              <div class="header">
                <button class="back-button" onclick="window.close()">
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                    <path d="m12 19-7-7 7-7"></path>
                    <path d="M19 12H5"></path>
                  </svg>
                  Back
                </button>
                <h1>${skillName} Concept Map</h1>
                <button class="download-button" id="downloadBtn">Download Map</button>
              </div>
              <div id="content" class="concept-map">
                <div class="loading">
                  <div class="spinner"></div>
                  <p>Loading concept map...</p>
                </div>
              </div>
            </div>
            <script>
              document.getElementById('downloadBtn').addEventListener('click', function() {
                window.opener.postMessage('download-concept-map', '*');
              });
              
              window.addEventListener('message', function(event) {
                if (event.data.type === 'concept-map-data') {
                  document.getElementById('content').innerHTML = event.data.html;
                }
              });
              
              // Request the data from the parent window
              window.opener.postMessage('request-concept-map-data', '*');
            </script>
          </body>
        </html>
      `);
      
      // Set up message event listener in the parent window
      const handleMessage = (event: MessageEvent) => {
        if (event.data === 'request-concept-map-data' && conceptMap && newWindow) {
          // Convert the concept map to HTML
          let conceptMapHtml = '';
          if (conceptMapRef.current) {
            conceptMapHtml = conceptMapRef.current.innerHTML;
          }
          
          // Send the data to the new window
          newWindow.postMessage({
            type: 'concept-map-data',
            html: conceptMapHtml
          }, '*');
        } else if (event.data === 'download-concept-map') {
          downloadConceptMap();
        }
      };
      
      window.addEventListener('message', handleMessage);
      
      // Clean up the event listener when the new window is closed
      newWindow.addEventListener('beforeunload', () => {
        window.removeEventListener('message', handleMessage);
        setIsFullScreen(false);
      });
    }
  };

  const downloadConceptMap = () => {
    downloadConceptMapAsHTML(conceptMap, skillName, proficiency);
  };

  return (
    <>
      <Button
        variant="outline"
        className="h-auto py-3 flex flex-col items-center text-center"
        onClick={() => setIsOpen(true)}
      >
        <Lightbulb size={16} />
        <span>Concept Map</span>
      </Button>
      
      <Dialog open={isOpen} onOpenChange={handleDialogOpenChange}>
        <DialogContent className="sm:max-w-[800px] max-h-[80vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle className="flex justify-between items-center">
              <span>{skillName} Concept Map</span>
            </DialogTitle>
          </DialogHeader>
          
          <div className="mt-4">
            {isLoading ? (
              <div className="flex flex-col items-center justify-center p-12">
                <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary mb-4"></div>
                <p>Generating concept map...</p>
              </div>
            ) : conceptMap ? (
              <div>
                <div className="flex justify-between items-center mb-4">
                  <Button 
                    variant="outline"
                    size="sm"
                    onClick={handleOpenFullScreen}
                    className="flex items-center gap-2"
                  >
                    Open in Full Page
                  </Button>
                  
                  <Button 
                    variant="outline" 
                    size="sm" 
                    onClick={downloadConceptMap}
                    className="flex items-center gap-2"
                  >
                    <Download size={16} />
                    Download Map
                  </Button>
                </div>
                
                <div className="p-4 border rounded-md bg-card/50">
                  <ProficiencyLegend />
                  
                  <Card ref={conceptMapRef}>
                    <CardContent className="p-4 concept-map-container">
                      {conceptMap && (
                        <ConceptNode 
                          concept={conceptMap} 
                          expandedNodes={expandedNodes} 
                          toggleNode={toggleNode} 
                        />
                      )}
                    </CardContent>
                  </Card>
                </div>
              </div>
            ) : (
              <div className="flex flex-col items-center justify-center p-12">
                <p>Failed to generate concept map</p>
                <Button onClick={generateConceptMap} className="mt-4">Try Again</Button>
              </div>
            )}
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default ConceptMap;
