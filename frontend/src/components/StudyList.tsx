import React from 'react';
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from './ui/card';
import { Button } from './ui/button';

interface Study {
  protocolSection: {
    identificationModule: {
      nctId: string;
      briefTitle: string;
      officialTitle: string;
    };
  };
  hasResults: boolean;
}

interface StudyListProps {
  studies: Study[];
}

const StudyList: React.FC<StudyListProps> = ({ studies }) => {
  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-semibold mb-4">Relevant Clinical Trials</h2>
      {studies.map((study, index) => (
        <Card key={index}>
          <CardHeader>
            <CardTitle>{study.protocolSection.identificationModule.briefTitle}</CardTitle>
            <CardDescription>
              NCT ID: {study.protocolSection.identificationModule.nctId}
            </CardDescription>
          </CardHeader>
          <CardContent>
            <p>
              <strong>Official Title:</strong> {study.protocolSection.identificationModule.officialTitle}
            </p>
            <p>
              <strong>Has Results:</strong> {study.hasResults ? 'Yes' : 'No'}
            </p>
          </CardContent>
          <CardFooter>
          <Button className="mt-4 w-full" asChild>
              <a
                href={`https://clinicaltrials.gov/ct2/show/${study.protocolSection.identificationModule.nctId}`}
                target="_blank"
                rel="noreferrer"
              >
                View Study
              </a>
            </Button>
          </CardFooter>
        </Card>
      ))}
    </div>
  );
};

export default StudyList;
