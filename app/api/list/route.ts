import { headers } from 'next/headers';
import { NextResponse } from 'next/server';

export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';

const UPSTREAM_URL = 'https://gpapi.sooplive.co.kr/api/v1/bjmatchfa/fa/list';

export async function POST(req: Request) {
  console.log('Received request to /api/teamMatch');

  const body = await req.text(); // JSON 그대로 전달

  // 브라우저 세션을 그대로 전달(로그인/권한 필요할 때)
  // const cookieStore = await cookies();
  // const cookieHeader = cookieStore
  //   .getAll()
  //   .map(c => `${c.name}=${c.value}`)
  //   .join('; ');

  const h = await headers();
  const userAgent = h.get('user-agent') ?? 'Mozilla/5.0';
  const contentType = h.get('content-type') ?? 'application/json';

  const upstreamRes = await fetch(UPSTREAM_URL, {
    method: 'POST',
    headers: {
      'User-Agent': userAgent,
      'Content-Type': contentType,
      Accept: 'application/json, text/plain, */*',
      Origin: 'https://bjmatchfa.sooplive.co.kr',
      Referer: 'https://bjmatchfa.sooplive.co.kr/',
      // Cookie: cookieHeader,
    },
    body: body.length ? body : JSON.stringify({}),
    cache: 'no-store',
  });

  const json = await upstreamRes.json();

  console.log(json);

  // 에러 디버깅에 도움이 되도록 일부 메타 포함
  if (!upstreamRes.ok) {
    return NextResponse.json(
      {
        ok: false,
        status: upstreamRes.status,
        statusText: upstreamRes.statusText,
        // bodyPreview: text.slice(0, 1000),
      },
      { status: 500 }
    );
  }

  // 정상 JSON 반환
  try {
    return NextResponse.json({ ok: true, data: json });
  } catch {
    return NextResponse.json({ ok: false, error: 'Upstream did not return JSON' }, { status: 500 });
  }
}
