import { NextResponse } from "next/server";
import { execSync } from "child_process";
import fs from "fs";
import path from "path";

export const dynamic = "force-dynamic";

export async function GET() {
  try {
    const diff = execSync("git diff HEAD~1", { encoding: "utf-8" });
    fs.writeFileSync(path.join(process.cwd(), "git-diff.txt"), diff);
    return NextResponse.json({ success: true, message: "Diff written to git-diff.txt." });
  } catch (error: any) {
    return NextResponse.json({ success: false, error: error.message });
  }
}
