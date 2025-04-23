'use client';

import React from 'react';

import { Badge } from '@/components/ui/badge';

import { X } from 'lucide-react';
import { Label } from '@/features/label/config/label.type';
import { cn } from '@/shared/lib/utils';

interface LabelBadgeProps {
  label: Label;
  noBorder?: boolean;
  badgeId?: string;
  onRemove: (badgeId: string) => void;
}

export function LabelColor({
  color,
  className,
}: {
  color?: string | null;
  className?: string;
}) {
  return (
    <div
      className={cn('h-2 w-2 rounded-full border', className)}
      style={{ backgroundColor: color ?? '#ffffff' }}
    />
  );
}

export default function LabelBadge({
  label,
  noBorder,
  badgeId,
  onRemove
}: LabelBadgeProps) {

  if (noBorder)
    return (
      <div className="flex-gap">
        <LabelColor color={label.color} />
        {label.name}
      </div>
    );

  return (
    <Badge key={label.id} variant="outline" className="flex-gap">
      <LabelColor color={label.color} />
      {label.name}
      {badgeId && (
        <X
          className="w-2 h-2 hover:cursor-pointer"
          onClick={() => onRemove(badgeId)}
        />
      )}
    </Badge>
  );
}
