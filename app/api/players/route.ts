import fs from 'fs/promises';
import { NextResponse } from 'next/server';
import path from 'path';

const CACHE_PATH = path.join(process.cwd(), 'app/api/players/data/soop_cache.json');
const CACHE_TTL = 3 * 60 * 1000;
const USE_CACHE = true;

const getFileData = async (filePath: string) => {
  console.log('     path', path.dirname(process.cwd()));
  try {
    const data = await fs.readFile(filePath, 'utf-8');
    const json = JSON.parse(data);
    if (json && 0 < json.faList.length) {
      return json;
    }
    return null;
  } catch (e) {
    return null;
  }
};

async function getCachedData() {
  try {
    if (USE_CACHE) {
      return await getFileData(CACHE_PATH);
    } else {
      const stats = await fs.stat(CACHE_PATH);
      const now = Date.now();
      if (now - stats.mtimeMs < CACHE_TTL) {
        return await getFileData(CACHE_PATH);
      }
    }
    return null;
  } catch (e) {
    return null;
  }
}

// 헬퍼: 모든 페이지 데이터 긁어오기
async function fetchAllData() {
  const allFaList: any[] = [];
  const perPage = 500;
  let currentPage = 1;
  let positionCountMap;
  let totalCount;

  while (true) {
    const res = await fetch('https://gpapi.sooplive.co.kr/api/v1/bjmatchfa/fa/list', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Origin: 'https://bjmatchfa.sooplive.co.kr',
        Referer: 'https://bjmatchfa.sooplive.co.kr/',
      },
      body: JSON.stringify({
        filter: [],
        maxPoint: 70,
        minPoint: 0,
        orderType: 'point_desc',
        pageNo: currentPage,
        perPageNo: perPage,
        positionIdx: '',
        searchBjNick: '',
        seasonIdx: 22,
      }),
    });

    const json = await res.json();

    if (!totalCount) {
      totalCount = json.data.totalCount;
    }

    if (!positionCountMap) {
      positionCountMap = json.data.positionCountMap;
    }

    const faList = json.data?.faList || [];
    allFaList.push(...faList);

    if (faList.length < perPage) {
      break;
    }
    currentPage++;
  }

  await fs.mkdir(path.dirname(CACHE_PATH), { recursive: true });
  await fs.writeFile(
    CACHE_PATH,
    JSON.stringify({
      faList: allFaList,
      totalCount,
      positionCountMap,
    })
  );

  return {
    faList: allFaList,
    totalCount,
    positionCountMap,
  };
}

export async function GET() {
  try {
    let data = await getCachedData();
    if (!data) {
      data = await fetchAllData();
    }

    return NextResponse.json(data);
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
