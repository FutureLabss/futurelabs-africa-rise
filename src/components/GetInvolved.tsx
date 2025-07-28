
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import GetInvolvedModal from '@/components/GetInvolvedModal';

const GetInvolved = () => {
  const [modalOpen, setModalOpen] = useState(false);
  const [modalType, setModalType] = useState('');
  const opportunities = [
    {
      title: "Train With Us",
      description: "Apply for our next cohort and develop in-demand digital skills with our expert mentors.",
      action: "Apply Now",
      color: "bg-primary hover:bg-primary-dark",
      type: "train"
    },
    {
      title: "Partner With Us",
      description: "Let's co-create impactful programs that drive digital transformation across Africa.",
      action: "Start Partnership",
      color: "bg-secondary hover:bg-secondary-dark",
      type: "partner"
    },
    {
      title: "Mentor With Us",
      description: "Share your expertise with rising talents and help shape the next generation of innovators.",
      action: "Become a Mentor",
      color: "bg-accent hover:bg-accent-dark",
      type: "mentor"
    },
    {
      title: "Invest in Us",
      description: "Support a scalable model of transformation that's building Africa's digital future.",
      action: "Learn More",
      color: "bg-gray-700 hover:bg-gray-800",
      type: "invest"
    }
  ];

  const handleOpenModal = (type: string) => {
    setModalType(type);
    setModalOpen(true);
  };

  return (
    <section className="py-20 bg-gray-50">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Get Involved</h2>
          <div className="w-24 h-1 bg-accent mx-auto mb-8"></div>
          <p className="max-w-2xl mx-auto text-gray-600 text-lg">
            Join our mission to accelerate Africa's digital future. There are many ways you can contribute to our growing ecosystem.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {opportunities.map((item, index) => (
            <Card key={index} className="border-0 shadow-lg overflow-hidden h-full flex flex-col">
              <CardHeader className="pb-2">
                <CardTitle className="text-xl">{item.title}</CardTitle>
              </CardHeader>
              <CardContent className="flex-grow">
                <p className="text-gray-600">{item.description}</p>
              </CardContent>
              <CardFooter>
                <Button 
                  className={`w-full ${item.color} text-white`}
                  onClick={() => handleOpenModal(item.type)}
                >
                  {item.action}
                </Button>
              </CardFooter>
            </Card>
          ))}
        </div>

        <div className="mt-16 text-center">
          <p className="text-lg text-gray-600 mb-6">
            Ready to contribute? Join our community today.
          </p>
          <Button 
            className="bg-gradient-to-r from-primary to-secondary text-white text-lg px-8 py-6 rounded-lg"
            onClick={() => handleOpenModal('community')}
          >
            Join Our Community
          </Button>
        </div>
      </div>
      <GetInvolvedModal 
        isOpen={modalOpen} 
        onClose={() => setModalOpen(false)} 
        type={modalType}
      />
    </section>
  );
};

export default GetInvolved;
