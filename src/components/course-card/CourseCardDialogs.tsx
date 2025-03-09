
import React from 'react';
import CourseActionDialog from '../dialogs/CourseActionDialog';

interface CourseCardDialogsProps {
  id: string;
  title: string;
  showShareDialog: boolean;
  showAssignDialog: boolean;
  setShowShareDialog: (show: boolean) => void;
  setShowAssignDialog: (show: boolean) => void;
}

const CourseCardDialogs: React.FC<CourseCardDialogsProps> = ({
  id,
  title,
  showShareDialog,
  showAssignDialog,
  setShowShareDialog,
  setShowAssignDialog
}) => {
  return (
    <>
      {/* Share Dialog */}
      <CourseActionDialog
        open={showShareDialog}
        onOpenChange={setShowShareDialog}
        title={`Share "${title}"`}
        courseId={id}
        courseName={title}
        actionType="share"
      />

      {/* Assign Dialog */}
      <CourseActionDialog
        open={showAssignDialog}
        onOpenChange={setShowAssignDialog}
        title={`Assign "${title}"`}
        courseId={id}
        courseName={title}
        actionType="assign"
      />
    </>
  );
};

export default CourseCardDialogs;
