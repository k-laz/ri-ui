import React from 'react';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
// import { Button } from '@/components/ui/button';
import { ArrowRight, Filter, ListFilter, Mail } from 'lucide-react';
import { Button } from '@headlessui/react';

interface WelcomeModalProps {
  isOpen: boolean;
  onClose: () => void;
  userName?: string;
}

const WelcomeModal: React.FC<WelcomeModalProps> = ({
  isOpen,
  onClose,
  userName,
}) => {
  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle className="text-2xl">
            Welcome{userName ? `, ${userName}` : ''}! 👋
          </DialogTitle>
          <DialogDescription className="pt-4 text-base">
            Let&apos;s help you get started with our platform
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-6 py-4">
          <div className="flex items-start space-x-3">
            <Filter className="h-6 w-6 text-primary" />
            <div>
              <h3 className="font-medium">Set Your Filters</h3>
              <p className="text-sm text-gray-500">
                Customize your search preferences to find exactly what
                you&apos;re looking for
              </p>
            </div>
          </div>

          <div className="flex items-start space-x-3">
            <ListFilter className="h-6 w-6 text-primary" />
            <div>
              <h3 className="font-medium">Browse Listings</h3>
              <p className="text-sm text-gray-500">
                Explore available listings that match your criteria
              </p>
            </div>
          </div>

          <div className="flex items-start space-x-3">
            <Mail className="h-6 w-6 text-primary" />
            <div>
              <h3 className="font-medium">Stay Updated</h3>
              <p className="text-sm text-gray-500">
                Receive notifications when new matches become available
              </p>
            </div>
          </div>
        </div>

        <DialogFooter>
          <Button onClick={onClose} className="w-full">
            Get Started <ArrowRight className="ml-2 h-4 w-4" />
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default WelcomeModal;
