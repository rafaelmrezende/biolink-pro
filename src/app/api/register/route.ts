import { NextResponse } from "next/server";
import { hash } from "bcrypt";
import { db } from "@/lib/db";

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { name, email, password } = body;

    // Verificar se o email já está em uso
    const existingUser = await db.user.findUnique({
      where: {
        email,
      },
    });

    if (existingUser) {
      return NextResponse.json(
        { message: "Este e-mail já está em uso." },
        { status: 400 }
      );
    }

    // Hash da senha
    const hashedPassword = await hash(password, 10);

    // Criar o usuário
    const user = await db.user.create({
      data: {
        name,
        email,
        password: hashedPassword,
        isActive: true,
        isAdmin: false,
      },
    });

    // Remover a senha do objeto de retorno
    const { password: _, ...userWithoutPassword } = user;

    return NextResponse.json(
      { 
        message: "Usuário registrado com sucesso!",
        user: userWithoutPassword 
      },
      { status: 201 }
    );
  } catch (error) {
    console.error("Erro ao registrar usuário:", error);
    return NextResponse.json(
      { message: "Ocorreu um erro ao registrar o usuário." },
      { status: 500 }
    );
  }
}
