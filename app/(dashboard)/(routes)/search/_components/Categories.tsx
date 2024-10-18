"use client"

import { Category } from '@prisma/client';
import React from 'react'
import{
    FcAssistant,
    FcBusiness,
    FcEngineering,
    FcFilmReel,
    FcMultipleDevices,
    FcMusic,
    FcOldTimeCamera,
    FcPhoneAndroid,
    FcSalesPerformance,
    FcSportsMode,
    FcWikipedia
} from "react-icons/fc"
import { IconType } from 'react-icons';
import CategoryItem from './CategoryItem';



interface CategoriesProps {
    items: Category[];
}

const IconMap: Record<Category['name'], IconType> = {
    "Music": FcMusic,
    "Engineering": FcEngineering,
    "Photography": FcOldTimeCamera,
    "Fitness": FcSportsMode,
    "Accounting": FcSalesPerformance,
    "Artificial Intelligence": FcAssistant,
    "Buisness Analytics": FcBusiness,
    "Internet Programming": FcWikipedia,
    "Android": FcPhoneAndroid,
    "Filming": FcFilmReel,

}

const Categories = ({ items }: CategoriesProps) => {
    return (
        <div className='flex items-center gap-x-2 overflow-y-auto pb-2'>
            {
                items.map((item)=>(
                    <CategoryItem
                        key={item.id}
                        label={item.name}
                        icon={IconMap[item.name]}
                        value={item.id}
                    />
                ))
            }
        </div>
    )
}

export default Categories