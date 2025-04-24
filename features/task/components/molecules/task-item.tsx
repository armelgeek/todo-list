'use client';

import * as React from 'react';

import { BoardContainer, ListContainer } from '@/components/ui/container';
import { Button } from '@/components/ui/button';
import { Icons } from '@/components/ui/icons';
import { Task } from '../../config/task.type';
import { List } from '@/features/list/config/list.type';
import { Label } from '@/features/label/config/label.type';
import { useTaskStore } from '@/shared/store/modal-store';
import { TaskForm } from './task-form';
import { Plus } from 'lucide-react';
import TaskActions from './task-actions';
import LabelBadge from '@/features/label/components/molecules/label-badge';
import { cn } from '@/shared/lib/utils';
import SubtaskList from '@/features/subtask/components/molecules/subtask-list';



interface TaskItemProps {
  task?: Task;
  lists: List[];
  labels: Label[];
  type?: 'list' | 'board';
  date?: string;
}

function TaskItem({ task, lists, type = 'list', labels, date }: TaskItemProps) {
  const [isOpen, setIsOpen] = React.useState(false);
  const [openSubtasks, setOpenSubtasks] = React.useState(false);
  const { setTask } = useTaskStore();

  const open = () => setIsOpen(true);
  const close = () => setIsOpen(false);

  const TaskContainer = type === 'list' ? ListContainer : BoardContainer;

  const onSelectTask = (task: Task) => {
    setTask(task);
  };

  if (isOpen) {
    return (
      <BoardContainer>
        <TaskForm
          task={task}
          close={close}
          small
          initialValues={{ dueDate: date }}
        />
      </BoardContainer>
    );
  }

  if (!task) {
    return (
      <Button
        variant="ghost"
        className="justify-start group hover:bg-transparent text-muted-foreground hover:text-foreground px-0"
        onClick={open}
      >
        <div className="group-hover:bg-primary bg-transparent rounded-full p-1 mr-2">
          <Plus className="h-3 w-3 text-primary group-hover:text-white" />
        </div>
        <span>Add task</span>
      </Button>
    );
  }

  return (
    <TaskContainer className="pb-2 pt-3 px-3 group group/task">
      <div className="flex-gap items-start">
        <div className="pt-1">
          {/**<StatusCheckbox task={task} />**/}
        </div>
        <div className="w-full">
          <div className="flex-between w-full">
            <span
              role="button"
              tabIndex={-1}
              className="font-semibold text-sm"
              onClick={() => onSelectTask(task)}
            >
              {task.name}
            </span>
            {/* Task Actions Dropdown */}
            <div className="opacity-0 group-hover:opacity-100">
              <TaskActions
                task={task}
                labels={labels}
                lists={lists}
                setOpen={open}
                openSubtasks={() => setOpenSubtasks(!openSubtasks)}
              />
            </div>
          </div>
          {task.description && (
            <p
              role="presentation"
              aria-hidden
              tabIndex={-1}
              className="text-muted-foreground text-xs"
              onClick={open}
            >
              {task?.description}
            </p>
          )}
          <div className="flex-gap items-center flex-wrap w-full">
          
            {/**<DatePicker
              variant={{ type: 'item', task }}
              defaultValue={task.dueDate}
            />**/}
            {task?.labels && (
              <div className="flex-gap items-center flex-wrap max-w-full">
                {task.labels.map((label) => (
                  <LabelBadge key={label.id} label={label} badgeId={task.id} onRemove={()=> {}} />
                ))}
              </div>
            )}

            {task.subtasks && task.subtasks.length > 0 && (
              <Button
                variant="picker"
                size="icon"
                className={cn('w-fit px-1')}
                onClick={() => setOpenSubtasks(!openSubtasks)}
              >
                <Icons.Subtask className="h-3 w-3 mr-1" />
                <span className="text-xs">
                  {task.subtasks.filter((subtask) => subtask.isComplete).length}
                  /{task.subtasks.length}
                </span>
              </Button>
            )}
          </div>
        </div>
      </div>
      {(type !== 'list' || openSubtasks) && (
        <SubtaskList
          task={task}
          subtasks={task.subtasks}
          showSubtaskList={openSubtasks}
        />
      )}
    </TaskContainer>
  );
}

export default TaskItem;
