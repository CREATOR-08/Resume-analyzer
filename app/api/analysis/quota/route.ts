import prisma from "@/lib/prisma";
import { getCurrentUser } from "@/lib/session";

import { NextRequest, NextResponse } from "next/server";
import { ratelimit } from "@/lib/ratelimit";
import { sendReportEmail } from "@/lib/sendReportEmail";
export const runtime = "nodejs";
import { asArray, asRecord, asString, escapeHtml, StringRecord,firstNumber } from "../helper_functions/data_definition";
import { buildAnalysisHtml } from "../helper_functions/buildAnalysisHtml";
import { createAnalysisPdf } from "../helper_functions/createAnalysisPdf";
import { uploadPdfToSupabase } from "../helper_functions/uploadPdfToSupabase";
export async function POST(req: NextRequest) {
  const currentUser = await getCurrentUser();
  const userIdentifier = currentUser ? `user:${currentUser.id}` : "anonymous";

  if (!currentUser) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const user = await prisma.user.findUnique({
    where: { id: currentUser.id },
    select: {
      id: true,
      name: true,
      email: true,
      analysis_count: true,
      user_type: true,
    },
  });

  if (!user) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  if (user.user_type === "basic" && user.analysis_count >= 2) {
    return NextResponse.json(
      {
        error: "Free limit reached. Upgrade to premium.",
      },
      {
        status: 403,
      }
    );
  }

  const { success } = await ratelimit.limit(userIdentifier);

  if (!success) {
    return NextResponse.json({ error: "Too many requests" }, { status: 429 });
  }

  try {
    const body = await req.json();
    const report = asRecord(body.report);
    const role = asString(body.role);
    const resumeFileName = asString(body.resumeFileName) || "resume";
    const categoryScores = asRecord(report.category_scores);
    const score = firstNumber(
      report.overall_score,
      report.overallScore,
      report.score,
      categoryScores.overall,
      categoryScores.Overall
    );
    const safeFileName = resumeFileName.replace(/[^a-z0-9._-]/gi, "-").toLowerCase();
    const pdfPath = `${user.id}/${Date.now()}-${safeFileName}.pdf`;
    const html = buildAnalysisHtml({
      report,
      role,
      resumeFileName,
      score,
      userName: user.name || user.email,
    });
    const pdf = await createAnalysisPdf(html);
    const pdfUrl = await uploadPdfToSupabase(pdf, pdfPath);
    try {
      await sendReportEmail({
        email: user.email,
        name: user.name || undefined,
        pdfUrl,
      });
    } catch (err) {
      console.error("Email failed:", err);
    }
    const analysis = await prisma.analysis.create({
      data: {
        pdfUrl,
        score,
        userId: user.id,
      },
    });

    await prisma.user.update({
      where: { id: user.id },
      data: {
        analysis_count: {
          increment: 1,
        },
      },
    });

    return NextResponse.json({
      message: "Analysis PDF saved",
      analysisId: analysis.id,
      pdfUrl,
      score,
    });
  } catch (error) {
    console.error("Save analysis PDF error:", error);
    return NextResponse.json(
      {
        error: error instanceof Error ? error.message : "Failed to save analysis PDF",
      },
      { status: 500 }
    );
  }
}
