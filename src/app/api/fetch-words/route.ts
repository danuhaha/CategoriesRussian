import { NextResponse } from 'next/server';

import { type GameInfo } from 'types';

import gamesInfo from 'categories.json';

export function GET() {
  const today = new Date().toISOString().split('T')[0];

  const gameDataToday = (gamesInfo as GameInfo[]).find((gameInfo) => gameInfo.date === today);

  if (gameDataToday) {
    return NextResponse.json(gameDataToday);
  }

  // case when there is no categories for today
  const gameDataNearest = (gamesInfo as GameInfo[])
    .filter((gameInfo) => new Date(gameInfo.date) < new Date()) // Only consider past dates
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())[0]; // Sort descending and pick the nearest

  if (gameDataNearest) {
    return NextResponse.json(gameDataNearest);
  }

  // case when nothing found, throw error
  return new NextResponse(null, { status: 500 });
}
