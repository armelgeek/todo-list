'use client';

import * as React from 'react';

import { Button } from '@/components/ui/button';

import { ChevronLeft, ChevronRight } from 'lucide-react';
import { useFilter } from '@/shared/hooks/use-filter';

export default function FilterWeek() {
    const { setFilter, removeFilter } = useFilter();

    return (
        <div className="flex-gap-sm fixed top-18 right-2">
            <Button
                variant="outline"
                size="icon"
                onClick={() => setFilter('offset', 'prev')}
                className="w-8 h-8 rounded-sm"
            >
                <ChevronLeft className="w-3 h-3" />
            </Button>
            <Button
                variant="outline"
                size="icon"
                onClick={() => setFilter('offset', 'next')}
                className="w-8 h-8 rounded-sm"
            >
                <ChevronRight className="w-3 h-3" />
            </Button>
            <Button
                variant="outline"
                onClick={() => removeFilter('offset')}
                className="h-8 rounded-sm"
            >
                Today
            </Button>
        </div>
    );
}
