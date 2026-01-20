import { NextResponse } from "next/server";
import fs from "fs";
import path from "path";

const dataFilePath = path.join(process.cwd(), "data", "settings.json");

// Helper to ensure file exists
function ensureFile() {
  if (!fs.existsSync(dataFilePath)) {
    const initialData = {
      companies: [],
      signers: [],
      badges: [],
      validityYears: 3,
      defaultRating: "9.8",
    };
    // Ensure dir exists
    const dir = path.dirname(dataFilePath);
    if (!fs.existsSync(dir)) fs.mkdirSync(dir, { recursive: true });

    fs.writeFileSync(dataFilePath, JSON.stringify(initialData, null, 2));
  }
}

export async function GET() {
  ensureFile();
  try {
    const fileContents = fs.readFileSync(dataFilePath, "utf8");
    const data = JSON.parse(fileContents);
    return NextResponse.json(data);
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to read settings" },
      { status: 500 },
    );
  }
}

export async function POST(request: Request) {
  ensureFile();
  try {
    const body = await request.json();
    // Validate or merge as needed. For now, we overwrite or merge top-level keys.
    const fileContents = fs.readFileSync(dataFilePath, "utf8");
    const currentData = JSON.parse(fileContents);

    const newData = { ...currentData, ...body };

    fs.writeFileSync(dataFilePath, JSON.stringify(newData, null, 2));
    return NextResponse.json({ success: true, data: newData });
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to save settings" },
      { status: 500 },
    );
  }
}
