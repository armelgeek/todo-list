import * as React from 'react';
import toast from 'react-hot-toast';
import { useRouter } from 'next/navigation';

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Button } from '@/components/ui/button';
import { MoreHorizontal, Pencil, Trash } from 'lucide-react';
import { useLabelMutations } from '../../hooks/use-label';
import { Label } from '../../config/label.type';
import { useMounted } from '@/shared/hooks/use-mounted';
import AlertModal from '@/shared/components/molecules/modals/alert-modal';
interface LabelActionsProps {
  label: Label;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

export default function LabelActions({ label, setOpen }: LabelActionsProps) {
   const {deleteLabel } =  useLabelMutations();
  const [isOpen, setIsOpen] = React.useState<boolean>(false);
  const [isLoading, setIsLoading] = React.useState<boolean>(false);

  const isMounted = useMounted();
  const router = useRouter();

  const onEdit = () => setOpen(true);

  const onDelete = async (slug: string) => {
    setIsLoading(true);
    try {
        await deleteLabel(slug)
      router.refresh();
      toast.success('Label removed.');
    } catch (err) {
      console.log(err);
    } finally {
      setIsLoading(false);
    }
  };

  if (!isMounted) return null;

  return (
    <>
      <AlertModal
        isOpen={isOpen}
        onClose={() => setIsOpen(false)}
        onConfirm={async () => onDelete(label.id)}
        loading={isLoading}
        description="Deleting the label will result in the removal of all labels associated with a task."
      />
      <DropdownMenu modal>
        <DropdownMenuTrigger asChild>
          <Button size="icon" variant="ghost" className="rounded-full">
            <MoreHorizontal className="w-3 h-3" />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent onSelect={(e) => e.preventDefault()}>
          <DropdownMenuItem onClick={onEdit}>
            <Pencil className="mr-2 h-3 w-3 text-muted-foreground" />
            Edit
          </DropdownMenuItem>
          <DropdownMenuSeparator />
          <DropdownMenuItem
            onClick={async () => onDelete(label.id)}
            className="text-destructive"
            onSelect={(e) => e.preventDefault()}
          >
            <Trash className="mr-2 h-3 w-3" />
            Delete
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </>
  );
}
