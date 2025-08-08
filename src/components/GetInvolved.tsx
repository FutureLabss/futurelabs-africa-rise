import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import GetInvolvedModal from '@/components/GetInvolvedModal';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { ChevronDown } from 'lucide-react';

const GetInvolved = () => {
  const [modalOpen, setModalOpen] = useState(false);
  const [modalType, setModalType] = useState('');
  const opportunities = [
    {
      title: "Train With Us",
      description: "Apply for our next cohort and develop in-demand digital skills with our expert mentors.",
      type: "train"
    },
    {
      title: "Partner With Us",
      description: "Let's co-create impactful programs that drive digital transformation across Africa.",
      type: "partner"
    },
    {
      title: "Mentor With Us",
      description: "Share your expertise with rising talents and help shape the next generation of innovators.",
      type: "mentor"
    },
    {
      title: "Invest in Us",
      description: "Support a scalable model of transformation that's building Africa's digital future.",
      type: "invest"
    }
  ];

  const handleOpenModal = (type: string) => {
    setModalType(type);
    setModalOpen(true);
  };

  return (
    <section className="pt-52 pb-24 bg-gray-50 mx-10">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Get Involved</h2>
          <div className="w-24 h-1 bg-accent mx-auto mb-8"></div>
          <p className="max-w-2xl mx-auto text-gray-600 text-lg">
            Join our mission to accelerate Africa's digital future. There are many ways you can contribute to our growing ecosystem.
          </p>
        </div>

        <div className="flex justify-center">
          <Card className="w-full max-w-xl border-0 shadow-lg overflow-hidden p-4">
            <CardHeader className="pb-2">
              <CardTitle className="text-xl text-center">Ways to Get Involved</CardTitle>
            </CardHeader>
            <CardContent>
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button className="w-full bg-secondary hover:bg-secondary-dark text-white flex justify-between items-center">
                    Select an Option
                    <ChevronDown className="ml-2 h-4 w-4" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent className="w-full">
                  {opportunities.map((item, index) => (
                    <DropdownMenuItem
                      key={index}
                      onClick={() => handleOpenModal(item.type)}
                      className="cursor-pointer hover:bg-secondary/10 w-60 text-center font-[600]"
                    >
                      {item.title}
                    </DropdownMenuItem>
                  ))}
                </DropdownMenuContent>
              </DropdownMenu>
              <p className="text-gray-600 mt-4 text-center">
                Select an option above to get started
              </p>
            </CardContent>
          </Card>
        </div>

        {/* JOIN THE COMMUNITY */}
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
