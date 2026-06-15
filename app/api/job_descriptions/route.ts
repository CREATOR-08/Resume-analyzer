import { NextRequest, NextResponse } from "next/server";
import prisma from "@/lib/prisma";

export async function GET(req: NextRequest) {

  try {

    const role =
      req.nextUrl.searchParams.get("role");

    if (!role) {

      return NextResponse.json(
        {
          error: "Role is required"
        },
        {
          status: 400
        }
      );

    }
    const jobs = await prisma.jobDescription.findMany({

  where: {

    role: {

      startsWith: role,

      mode: "insensitive",

    },

  },

  select: {

    id: true,

    company_name: true,

    role: true,

    year: true,
    pdf_url: true,

  },

  orderBy: [

    {

      company_name: "asc",

    },

    {

      year: "desc",

    },

  ],

});

return NextResponse.json(jobs);
  }

    

  catch (error) {

    console.error(error);

    return NextResponse.json(

      {

        error:

          "Failed to fetch Job Descriptions"

      },

      {

        status: 500

      }

    );

  }

}