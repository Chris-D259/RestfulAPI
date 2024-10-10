import prisma from "../../database/db";
import { NextResponse } from "next/server";


export const GET = async () => {
    try {
        const students = await prisma.student.findMany();
        return NextResponse.json(students);
    } catch (error) {
        return NextResponse.json({status:"failed", message: "An error occurred while fetching students" },{ status: 500 });
    }
};

export const POST = async (req: Request) => {
    const body = await req.json();
    try {
        const existingStuddent = await prisma.student.findUnique({
            where: {
                studentId: body.studentId,
            },
        });
        if (existingStuddent) {
            return NextResponse.json({status:"failed", message: "Student already exists" },{ status: 409 });
        } else{
            const student = await prisma.student.create({
                data: {
                    studentId: body.studentId,
                    studentName: body.studentName,
                    course: body.course,
                    presentDate: body.presentDate,
                },
            });
         
            return NextResponse.json({student ,message: "Student Created Successfully"}, { status: 201 });
        }
       
    } catch (error) {
       
        return NextResponse.json({status:"failed", message: "An error occurred while creating student" },{ status: 400 });
    }
}
