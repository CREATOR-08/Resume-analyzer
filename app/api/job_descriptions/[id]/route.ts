import { NextResponse } from "next/server";

import prisma from "@/lib/prisma";

export async function GET(

  req: Request,

  { params }: { params: Promise<{ id: string }> }

) {

  const { id } = await params;

  try {

    const job = await prisma.jobDescription.findUnique({

      where: {

        id

      },

      select: {

        id: true,

        company_name: true,

        role: true,

        year: true,

        pdf_url: true,

        jd_text: true,

      }

    });

    if (!job) {

      return NextResponse.json(

        {

          error: "Not found"

        },

        {

          status: 404

        }

      );

    }

    return NextResponse.json(job);

  }

  catch (error) {

    return NextResponse.json(

      {

        error: "Something went wrong"

      },

      {

        status: 500

      }

    );

  }

}