import { NextResponse } from "next/server";
import { db } from "@/lib/db";
import { getServerSession } from "next-auth/next";
import { authOptions } from "@/lib/auth";

export async function PATCH(
  req: Request,
  { params }: { params: { userId: string } }
) {
  try {
    const { userId } = params;
    
    // Verificar se o usuário está autenticado e é administrador
    const session = await getServerSession(authOptions);
    
    if (!session?.user || !(session.user as any).isAdmin) {
      return NextResponse.json(
        { message: "Acesso não autorizado" },
        { status: 403 }
      );
    }

    const body = await req.json();
    const { isActive } = body;

    if (typeof isActive !== "boolean") {
      return NextResponse.json(
        { message: "O status deve ser um valor booleano" },
        { status: 400 }
      );
    }

    // Atualizar o status do usuário
    const updatedUser = await db.user.update({
      where: {
        id: userId,
      },
      data: {
        isActive,
      },
      select: {
        id: true,
        name: true,
        email: true,
        isActive: true,
      },
    });

    return NextResponse.json({ 
      message: `Usuário ${isActive ? "ativado" : "desativado"} com sucesso`,
      user: updatedUser 
    });
  } catch (error) {
    console.error("Erro ao atualizar status do usuário:", error);
    return NextResponse.json(
      { message: "Ocorreu um erro ao atualizar o status do usuário." },
      { status: 500 }
    );
  }
}
