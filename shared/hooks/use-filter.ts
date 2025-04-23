'use client';

import * as React from 'react';
import { usePathname } from 'next/navigation';
import { useQueryState, parseAsInteger, parseAsBoolean, parseAsString } from 'nuqs';
import { ExtendedSearchParamsOptions } from '../lib/filter';

export const useFilter = () => {
  const pathname = usePathname();
  
  const [offset, setOffset] = useQueryState('offset', parseAsInteger.withDefault(0));
  const [view, setView] = useQueryState('view', parseAsString.withDefault('list'));
  const [completed, setCompleted] = useQueryState('completed', parseAsBoolean.withDefault(false));
  const [labelId, setLabelId] = useQueryState('labelId', parseAsString.withDefault(''));

  const handlePagination = (direction: 'prev' | 'next') => {
    const newOffset = direction === 'prev' ? Math.max(0, offset - 1) : offset + 1;
    setOffset(newOffset);
  };

  const setFilter = async <T,>(name: string, value: T) => {
    switch (name) {
      case 'offset':
        await setOffset(value as number);
        break;
      case 'view':
        await setView(value as string | null);
        break;
      case 'completed':
        await setCompleted(value as boolean);
        break;
      case 'labelId':
        await setLabelId(value as string);
        break;
      default:
        console.warn(`Unknown filter name: ${name}`);
    }
  };

  const removeFilter = async (name?: string) => {
    if (!name) {
      await Promise.all([
        setOffset(0),
        setView('list' as string | null),
        setCompleted(false),
        setLabelId(null)
      ]);
    } else {
      switch (name) {
        case 'offset':
          await setOffset(0);
          break;
        case 'view':
          await setView('list' as string | null);
          break;
        case 'completed':
          await setCompleted(false);
          break;
        case 'labelId':
          await setLabelId(null);
          break;
        default:
          console.warn(`Unknown filter name: ${name}`);
      }
    }
  };

  const getQueryString = React.useCallback(() => {
    const params = new URLSearchParams();
    
    if (offset !== 0) params.set('offset', offset.toString());
    if (view !== 'list') params.set('view', view);
    if (completed) params.set('completed', completed.toString());
    if (labelId) params.set('labelId', labelId);
    
    return params.toString();
  }, [offset, view, completed, labelId]);

  return {
    offset,
    view,
    completed,
    labelId,
    pathname,

    setFilter,
    removeFilter,
    setOffset,
    setView,
    setCompleted,
    setLabelId,
    handlePagination,
    getQueryString
  };
};