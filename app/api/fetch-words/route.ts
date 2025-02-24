import { NextResponse } from 'next/server';
import todayCategories from '../../categories.json';
import {Category} from '@/app/_types';

type CategoriesByDate = {
    [key: string]: Category[]; // The key is the date string (YYYY-MM-DD)
};

export async function GET() {
    const today = new Date().toISOString().split('T')[0];
    const categoriesParsed = todayCategories as CategoriesByDate;
    const categories = categoriesParsed[today] || [];

    return NextResponse.json({ date: today, categories });
}