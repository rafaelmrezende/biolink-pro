import { db } from "@/lib/db";
import { notFound } from "next/navigation";
import Link from "next/link";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";

interface PageProps {
  params: {
    username: string;
  };
}

export default async function UserPublicPage({ params }: PageProps) {
  const { username } = params;

  // Buscar usuário pelo ID (slug)
  const user = await db.user.findUnique({
    where: {
      id: username,
    },
    include: {
      links: {
        orderBy: {
          order: "asc",
        },
      },
      socialLinks: {
        orderBy: {
          order: "asc",
        },
      },
    },
  });

  if (!user || !user.isActive) {
    notFound();
  }

  // Mapear plataformas de redes sociais para ícones/nomes
  const socialPlatformMap: Record<string, { name: string; icon: string }> = {
    instagram: { name: "Instagram", icon: "instagram" },
    twitter: { name: "Twitter", icon: "twitter" },
    facebook: { name: "Facebook", icon: "facebook" },
    linkedin: { name: "LinkedIn", icon: "linkedin" },
    youtube: { name: "YouTube", icon: "youtube" },
  };

  // Aplicar tema escolhido pelo usuário
  const themeClasses = {
    default: "bg-white text-gray-900",
    dark: "bg-gray-900 text-white",
    gradient: "bg-gradient-to-r from-purple-500 to-pink-500 text-white",
  };

  const themeClass = themeClasses[user.theme as keyof typeof themeClasses] || themeClasses.default;

  return (
    <div className={`min-h-screen flex flex-col items-center py-10 px-4 ${themeClass}`}>
      <div className="w-full max-w-md flex flex-col items-center">
        {/* Avatar e informações do perfil */}
        <Avatar className="h-24 w-24 mb-4">
          <AvatarImage src={user.image || ""} alt={user.name || ""} />
          <AvatarFallback>{user.name?.charAt(0) || "U"}</AvatarFallback>
        </Avatar>
        
        <h1 className="text-2xl font-bold text-center mb-2">{user.name}</h1>
        
        {user.description && (
          <p className="text-center mb-8 max-w-sm">{user.description}</p>
        )}

        {/* Links personalizados */}
        <div className="w-full space-y-3 mb-8">
          {user.links.map((link) => (
            <a 
              key={link.id} 
              href={link.url} 
              target="_blank" 
              rel="noopener noreferrer"
              className="block w-full"
            >
              <Button 
                variant={user.theme === "dark" ? "outline" : "default"} 
                className="w-full py-6 text-base font-medium"
              >
                {link.title}
              </Button>
            </a>
          ))}
        </div>

        {/* Redes sociais */}
        {user.socialLinks.length > 0 && (
          <div className="flex justify-center space-x-4 mt-4">
            {user.socialLinks.map((socialLink) => {
              const platform = socialPlatformMap[socialLink.platform] || { name: socialLink.platform, icon: "link" };
              
              return (
                <a 
                  key={socialLink.id} 
                  href={socialLink.url} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="text-current hover:opacity-80 transition-opacity"
                  title={platform.name}
                >
                  <div className="w-10 h-10 flex items-center justify-center rounded-full border">
                    <span className="capitalize">{platform.icon.charAt(0)}</span>
                  </div>
                </a>
              );
            })}
          </div>
        )}

        {/* Footer */}
        <div className="mt-12 text-sm opacity-70">
          <p className="text-center">
            Criado com{" "}
            <Link href="/" className="underline">
              BioLink PRO
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
