'use client';

import * as React from 'react';

import { Button } from '@/components/ui/button';


import { Plus } from 'lucide-react';
import { BoardContainer, ListContainer } from '@/components/ui/container';
import { Label } from '../../config/label.type';
import { LabelForm } from './label-form';
import LabelBadge from './label-badge';
import LabelActions from './label-actions';

interface LabelItemProps {
  label?: Label;
}

export default function LabelItem({ label }: LabelItemProps) {
  const [isOpen, setIsOpen] = React.useState(false);

  const open = () => setIsOpen(true);
  const close = () => setIsOpen(false);

  if (isOpen) {
    return (
      <BoardContainer className="p-4">
        <LabelForm onSubmit={()=> {}} label={label} />
      </BoardContainer>
    );
  }

  if (!label) {
    return (
      <Button
        variant="ghost"
        className="justify-start group hover:bg-transparent text-muted-foreground hover:text-foreground px-0"
        onClick={open}
      >
        <div className="group-hover:bg-primary bg-transparent rounded-full p-1 mr-2">
          <Plus className="h-3 w-3 text-primary group-hover:text-white" />
        </div>
        <span>Add label</span>
      </Button>
    );
  }

  return (
    <ListContainer>
      <div className="flex-between">
        <LabelBadge label={label} noBorder onRemove={()=> } />
        <div className="opacity-0 group-hover:opacity-100">
          <LabelActions label={label} setOpen={open} />
        </div>
      </div>
    </ListContainer>
  );
}
