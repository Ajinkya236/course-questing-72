
import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Download, Award, Eye } from "lucide-react";
import { toast } from "@/components/ui/use-toast";

interface CourseCertificateProps {
  certificateId: string;
  courseTitle: string;
  completionDate?: string;
  userName?: string;
  isCompleted: boolean;
}

const CourseCertificate: React.FC<CourseCertificateProps> = ({
  certificateId,
  courseTitle,
  completionDate,
  userName = "",
  isCompleted
}) => {
  const [showPreview, setShowPreview] = useState(false);
  
  const handleDownload = () => {
    // In a real app, this would generate and download the certificate
    toast({
      title: "Certificate Downloaded",
      description: "Your certificate has been downloaded successfully.",
    });
  };

  const formattedDate = completionDate || new Date().toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  });

  return (
    <>
      <Card className="hover:shadow-md transition-shadow cursor-pointer">
        <CardHeader className="pb-2">
          <CardTitle className="text-base font-heading">Course Certificate</CardTitle>
        </CardHeader>
        <CardContent className="pb-2">
          <div className="flex flex-col items-center justify-center py-4">
            <div className="bg-primary/10 p-4 rounded-full mb-3">
              <Award className="h-8 w-8 text-primary" />
            </div>
            <h3 className="text-center line-clamp-2">{courseTitle}</h3>
            {isCompleted && completionDate && (
              <p className="text-sm text-muted-foreground mt-1">
                Completed on {formattedDate}
              </p>
            )}
          </div>
        </CardContent>
        <CardFooter className="flex justify-center gap-2">
          <Dialog open={showPreview} onOpenChange={setShowPreview}>
            <DialogTrigger asChild>
              <Button variant="outline" size="sm" className="gap-1">
                <Eye className="h-4 w-4" /> Preview
              </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[800px]">
              <DialogHeader>
                <DialogTitle className="font-heading">Certificate Preview</DialogTitle>
              </DialogHeader>
              <div className="p-4 border rounded-lg bg-white">
                <div 
                  className="aspect-[1.414/1] relative border-8 border-primary/20 p-8 flex flex-col items-center justify-between bg-[url('https://images.unsplash.com/photo-1515879218367-8466d910aaa4?q=80&w=1800&auto=format&fit=crop&ixlib=rb-4.0.3')] bg-cover bg-center bg-opacity-10 overflow-hidden"
                >
                  {/* Certificate Background Pattern */}
                  <div className="absolute inset-0 bg-white/90 z-0"></div>
                  
                  {/* Certificate Content */}
                  <div className="relative z-10 w-full text-center space-y-8">
                    <div className="pt-8">
                      <div className="w-24 h-24 mx-auto mb-4 relative">
                        <div className="absolute inset-0 rounded-full bg-primary/20 animate-pulse"></div>
                        <Award className="w-20 h-20 text-primary mx-auto relative z-10" />
                      </div>
                      <h1 className="text-2xl sm:text-3xl font-heading text-gray-800 uppercase">Certificate of Completion</h1>
                    </div>
                    
                    <div className="space-y-2">
                      <p className="text-gray-600">This is to certify that</p>
                      <p className="text-2xl sm:text-3xl font-heading text-primary">
                        {isCompleted ? userName || "Your Name" : "Preview Mode"}
                      </p>
                      <p className="text-gray-600">has successfully completed the course</p>
                      <p className="text-xl sm:text-2xl font-bold text-gray-800">
                        {courseTitle}
                      </p>
                    </div>
                    
                    <div className="grid grid-cols-2 gap-8 pt-8">
                      <div className="text-center">
                        <p className="text-gray-600 text-sm">Date of Completion</p>
                        <p className="font-medium text-gray-800">{formattedDate}</p>
                      </div>
                      <div className="text-center">
                        <p className="text-gray-600 text-sm">Certificate ID</p>
                        <p className="font-medium text-gray-800">JIO-CERT-{certificateId}</p>
                      </div>
                    </div>
                  </div>
                  
                  {/* Company Logo/Signature */}
                  <div className="relative z-10 w-full flex justify-between items-end pt-8">
                    <div>
                      <img src="/placeholder.svg" alt="Company Logo" className="h-12" />
                    </div>
                    <div className="text-right">
                      <div className="h-px w-40 bg-gray-400 mb-2"></div>
                      <p className="text-sm font-medium">Course Director</p>
                    </div>
                  </div>
                </div>
              </div>
              <div className="flex justify-end gap-2 mt-4">
                {isCompleted && (
                  <Button onClick={handleDownload} className="gap-2">
                    <Download className="h-4 w-4" /> Download Certificate
                  </Button>
                )}
              </div>
            </DialogContent>
          </Dialog>
          
          {isCompleted && (
            <Button size="sm" className="gap-1" onClick={handleDownload}>
              <Download className="h-4 w-4" /> Download
            </Button>
          )}
        </CardFooter>
      </Card>
    </>
  );
};

export default CourseCertificate;
