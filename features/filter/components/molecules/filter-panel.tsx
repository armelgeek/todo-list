'use client';
import * as React from 'react';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Label as SwitchLabel } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';
import { Checkbox } from '@/components/ui/checkbox';
import { CircuitBoard, Menu, X } from 'lucide-react';
import { useFilter } from '@/shared/hooks/use-filter';
import { ExtendedSearchParamsOptions } from '@/shared/lib/filter';
import { cn } from '@/shared/lib/utils';
import { Label } from '@/features/label/config/label.type';
import { Separator } from '@/components/ui/separator';
import LabelBadge from '@/features/label/components/molecules/label-badge';

interface FilterPanelProps {
  labels: Label[];
  close: () => void;
}

export default function FilterPanel({ labels, close }: FilterPanelProps) {
  const { view, labelId, completed, setView, setLabelId, setCompleted, removeFilter } = useFilter();

  const FilterView = React.useMemo(() => {
    const Component = ({
      name,
      label,
      icon,
    }: {
      name: ExtendedSearchParamsOptions['view'];
      label: string;
      icon: React.ReactNode;
    }) => (
      <Button
        variant="ghost"
        onClick={() => setView(name)}
        className={cn(
          'rounded-sm bg-transparent p-0 h-16 cursor-pointer flex-center w-full flex-col text-center',
          view === name && 'bg-popover',
        )}
      >
        {icon}
        {label}
      </Button>
    );
    Component.displayName = 'FilterView';
    return Component;
  }, []);

  return (
    <div className="w-full">
      <span className="block text-sm font-bold">View</span>
      <div className="my-4 bg-input rounded-md gap-1 p-1 grid grid-cols-2">
        <FilterView
          name="list"
          label="List"
          icon={<Menu className="w-4 h-4 mb-1" />}
        />
        <FilterView
          name="board"
          label="Board"
          icon={<CircuitBoard className="w-4 h-4 mb-1" />}
        />
      </div>
      {view !== 'board' && (
        <div className="flex-gap mb-4 w-full">
          <Checkbox checked className="cursor-default" />
          <SwitchLabel htmlFor="completed-tasks">Completed tasks</SwitchLabel>
          <Switch
            id="completed-tasks"
            className="ml-auto"
            checked={!!completed}
            onCheckedChange={() => {
              setCompleted(!completed);
            }}
          />
        </div>
      )}
      <Separator />
      <span className="pt-4 block text-sm font-bold">Label</span>
      <div className="my-4 flex-gap max-w-full flex-wrap">
        {labels.map((label) => (
          <Badge
            key={label.id}
            variant="outline"
            className={cn(
              'rounded-sm bg-transparent p-2 cursor-pointer flex-gap',
              labelId === label.id && 'bg-primary/25 border-primary',
            )}
            onClick={() =>
              labelId === label.id
                ? setLabelId(null)
                : setLabelId(label.id)
            }
          >
            <LabelBadge key={label.id} label={label} onRemove={()=> {
                // TODO: add logic to remove label from task given Id
            }} noBorder />
            {labelId === label.id && (
              <X className="w-4 h-4 hover:cursor-pointer" />
            )}
          </Badge>
        ))}
      </div>
      <div className="flex-gap mt-4">
        <Button
          variant="secondary"
          className="w-full bg-primary/30 text-primary dark:bg-accent dark:text-foreground hover:bg-primary hover:text-white"
          onClick={() => removeFilter()}
        >
          Reset
        </Button>
        <Button className="w-full" onClick={close}>
          Done
        </Button>
      </div>
    </div>
  );
}