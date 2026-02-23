import nodemailer from "nodemailer";

export const runtime = "nodejs"; // ✅ nodemailer는 node 런타임 필요

function escapeHtml(s: string) {
  return s
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#039;");
}

export async function POST(req: Request) {
  try {
    const body = await req.json();

    const name = String(body?.name ?? "").trim();
    const dt = String(body?.dt ?? "").trim();
    const people = String(body?.people ?? "").trim();
    const question = String(body?.question ?? "").trim();

    // ✅ 기본 검증
    if (!question || question.length < 2) {
      return Response.json({ ok: false, message: "문의 내용을 입력해 주세요." }, { status: 400 });
    }
    if (question.length > 2000) {
      return Response.json({ ok: false, message: "문의 내용이 너무 깁니다." }, { status: 400 });
    }

    const GMAIL_USER = process.env.GMAIL_USER;
    const GMAIL_APP_PASSWORD = process.env.GMAIL_APP_PASSWORD;
    const CONTACT_TO = process.env.CONTACT_TO;

    if (!GMAIL_USER || !GMAIL_APP_PASSWORD || !CONTACT_TO) {
      return Response.json(
        { ok: false, message: "서버 메일 환경변수가 설정되지 않았습니다." },
        { status: 500 }
      );
    }

    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: GMAIL_USER,
        pass: GMAIL_APP_PASSWORD.replaceAll(" ", ""),
      },
    });

    const subject = `[조선한그릇 문의] ${name ? name : "익명"} / ${people ? people : "인원 미기재"}`;

    const text = [
      "조선한그릇 문의",
      "",
      `이름: ${name || "-"}`,
      `방문 날짜/시간: ${dt || "-"}`,
      `인원: ${people || "-"}`,
      "",
      "문의 내용:",
      question || "-",
    ].join("\n");

    const html = `
      <div style="font-family:system-ui,-apple-system,Segoe UI,Roboto,sans-serif; line-height:1.55">
        <h2 style="margin:0 0 12px">조선한그릇 문의</h2>
        <div style="padding:12px 14px; border:1px solid #e5e7eb; border-radius:12px; background:#fafafa">
          <div><b>이름</b>: ${escapeHtml(name || "-")}</div>
          <div><b>방문 날짜/시간</b>: ${escapeHtml(dt || "-")}</div>
          <div><b>인원</b>: ${escapeHtml(people || "-")}</div>
        </div>
        <h3 style="margin:18px 0 10px">문의 내용</h3>
        <div style="white-space:pre-wrap; padding:12px 14px; border:1px solid #e5e7eb; border-radius:12px">
          ${escapeHtml(question || "-")}
        </div>
      </div>
    `;

    await transporter.sendMail({
      from: `"조선한그릇 사이트" <${GMAIL_USER}>`,
      to: CONTACT_TO,
      replyTo: GMAIL_USER, // 필요 시 변경
      subject,
      text,
      html,
    });

    return Response.json({ ok: true });
  } catch (e: any) {
    return Response.json(
      { ok: false, message: "메일 전송에 실패했습니다.", detail: String(e?.message ?? e) },
      { status: 500 }
    );
  }
}