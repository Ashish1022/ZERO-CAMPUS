"use client"

import { cn } from '@/lib/utils';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import React from 'react'
import { IconType } from 'react-icons';

import qs from 'query-string'

interface CategoryItemProps {
    label: string;
    icon: IconType;
    value?: string
}

const CategoryItem = ({ label, icon: Icon, value }: CategoryItemProps) => {

    const pathname = usePathname()
    const router = useRouter()
    const searchParams = useSearchParams();
    const currentCategoryId = searchParams.get("categoryId")
    const currentTitle = searchParams.get("title")

    const isSelected = currentCategoryId === value

    const onClick = () => {
        const url = qs.stringifyUrl({
            url: pathname,
            query: {
                title: currentTitle,
                categoryId: isSelected ? null : value,
            }
        }, { skipNull: true, skipEmptyString: true }
        )
        router.push(url)
    }

    return (
        <button className={cn('py-2 px-3 text-sm border border-slate-200 items-center hover:border-sky-700 transition rounded-full flex gap-x-1', isSelected && 'border-sky-700 bg-sky-200/20 text-sky-800')} type='button' onClick={onClick}>
            {Icon && <Icon size={20} />}
            <div className='truncate'>
                {label}
            </div>
        </button>
    )
}

export default CategoryItem