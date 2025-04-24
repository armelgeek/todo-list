import * as React from 'react';

import { useRouter } from 'next/navigation';
import toast from 'react-hot-toast';
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Button } from '@/components/ui/button';
import { Task } from '@/features/task/config/task.type';
import { Subtask } from '../../config/subtask.type';
import { useMounted } from '@/shared/hooks/use-mounted';
import AlertModal from '@/shared/components/molecules/modals/alert-modal';
import { MoreHorizontal, Pencil, Trash } from 'lucide-react';
import { useSubtaskMutations } from '../../hooks/use-subtask';

interface SubtaskActionsProps {
    task: Task;
    subtask: Subtask;
    setOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

export default function SubtaskActions({
    task,
    subtask,
    setOpen,
}: SubtaskActionsProps) {
    const [isOpen, setIsOpen] = React.useState<boolean>(false);
    const [isLoading, setIsLoading] = React.useState<boolean>(false);
    const { deleteSubtask } = useSubtaskMutations();
    const isMounted = useMounted();
    const router = useRouter();

    const onEdit = () => setOpen(true);

    const onDelete = async (subtaskId: string) => {
        setIsLoading(true);
        try {
            await deleteSubtask(subtaskId);

            toast.success('Deleted!');
            router.refresh();
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
                onConfirm={async () => onDelete(subtask.id)}
                loading={isLoading}
                description="Deleting the Subtask will result in the removal of all labels associated with a task."
            />
            <DropdownMenu modal>
                <DropdownMenuTrigger asChild>
                    <Button size="icon" variant="ghost" className="w-5 h-5 rounded-full">
                        <MoreHorizontal className="w-5 h-5 p-1" />
                    </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent onSelect={(e) => e.preventDefault()}>
                    <DropdownMenuItem onClick={onEdit}>
                        <Pencil className="mr-2 h-3 w-3 text-muted-foreground" />
                        Edit
                    </DropdownMenuItem>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem
                        onClick={async () => onDelete(subtask.id)}
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
