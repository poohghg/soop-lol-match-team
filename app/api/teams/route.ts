import fs from 'fs/promises';
import { NextResponse } from 'next/server';
import path from 'path';

const CACHE_PATH = path.join(process.cwd(), 'data', 'soop__team_list_cache.json');
const CACHE_TTL = 3 * 60 * 1000;
// const CACHE_TTL = Infinity;

// 헬퍼: 파일 존재 확인 및 데이터 로드
async function getCachedData() {
  try {
    const data = await fs.readFile(CACHE_PATH, 'utf-8');
    const json = JSON.parse(data);
    return json;
    // const stats = await fs.stat(CACHE_PATH);
    // const now = Date.now();
    // if (now - stats.mtimeMs < CACHE_TTL) {
    //   const data = await fs.readFile(CACHE_PATH, 'utf-8');
    //   const json = JSON.parse(data);
    //
    //   if (json && 0 < json.length) {
    //     return json;
    //   }
    //
    //   return null;
    // }
  } catch (e) {
    return null;
  }
  return null;
}

async function fetchAllData() {
  const allTeamMemberList: any[] = [];
  const perPage = 100;
  let currentPage = 1;
  let totalCount;

  // 헬퍼: 모든 페이지 데이터 긁어오기
  const url = 'https://gpapi.sooplive.co.kr/api/v1/bjmatchfa/team/list';

  while (true) {
    const res = await fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Origin: 'https://bjmatchfa.sooplive.co.kr',
        Referer: 'https://bjmatchfa.sooplive.co.kr/',
      },
      body: JSON.stringify({
        filter: '',
        orderType: 'point_desc',
        pageNo: 1,
        perPageNo: 50,
        seasonIdx: 22,
      }),
    });

    const json = await res.json();

    if (!totalCount) {
      totalCount = json.data.totalCount;
    }

    const teamMemberList = json.data?.teamMemberList || [];
    allTeamMemberList.push(...teamMemberList);

    if (allTeamMemberList.length < perPage) {
      break;
    }

    currentPage++;
  }

  // 파일로 저장 (data 폴더가 미리 생성되어 있어야 함)
  await fs.mkdir(path.dirname(CACHE_PATH), { recursive: true });
  await fs.writeFile(
    CACHE_PATH,
    JSON.stringify({
      teamMemberList: allTeamMemberList,
      totalCount,
    })
  );

  return {
    teamMemberList: allTeamMemberList,
    totalCount,
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
