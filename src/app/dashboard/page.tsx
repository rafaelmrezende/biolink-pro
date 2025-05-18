"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Separator } from "@/components/ui/separator";
import { PlusCircle, Trash2, Save } from "lucide-react";

const profileFormSchema = z.object({
  name: z.string().min(2, {
    message: "Nome deve ter pelo menos 2 caracteres.",
  }),
  description: z.string().max(160, {
    message: "Descrição deve ter no máximo 160 caracteres.",
  }),
  imageUrl: z.string().url({
    message: "Por favor, insira uma URL válida para a imagem.",
  }).optional().or(z.literal("")),
  theme: z.string({
    required_error: "Por favor, selecione um tema.",
  }),
});

const linkFormSchema = z.object({
  title: z.string().min(1, {
    message: "Título é obrigatório.",
  }),
  url: z.string().url({
    message: "Por favor, insira uma URL válida.",
  }),
});

const socialLinkFormSchema = z.object({
  platform: z.string().min(1, {
    message: "Plataforma é obrigatória.",
  }),
  url: z.string().url({
    message: "Por favor, insira uma URL válida.",
  }),
});

type ProfileFormValues = z.infer<typeof profileFormSchema>;
type LinkFormValues = z.infer<typeof linkFormSchema>;
type SocialLinkFormValues = z.infer<typeof socialLinkFormSchema>;

export default function UserDashboard() {
  const [activeTab, setActiveTab] = useState("profile");
  const [links, setLinks] = useState<LinkFormValues[]>([]);
  const [socialLinks, setSocialLinks] = useState<SocialLinkFormValues[]>([]);
  const [newLink, setNewLink] = useState<LinkFormValues>({ title: "", url: "" });
  const [newSocialLink, setNewSocialLink] = useState<SocialLinkFormValues>({ platform: "", url: "" });

  const profileForm = useForm<ProfileFormValues>({
    resolver: zodResolver(profileFormSchema),
    defaultValues: {
      name: "",
      description: "",
      imageUrl: "",
      theme: "default",
    },
  });

  const linkForm = useForm<LinkFormValues>({
    resolver: zodResolver(linkFormSchema),
    defaultValues: {
      title: "",
      url: "",
    },
  });

  const socialLinkForm = useForm<SocialLinkFormValues>({
    resolver: zodResolver(socialLinkFormSchema),
    defaultValues: {
      platform: "",
      url: "",
    },
  });

  function onProfileSubmit(data: ProfileFormValues) {
    console.log("Perfil atualizado:", data);
    // Aqui seria a chamada para a API para salvar os dados do perfil
  }

  function addLink() {
    if (newLink.title && newLink.url) {
      setLinks([...links, newLink]);
      setNewLink({ title: "", url: "" });
    }
  }

  function removeLink(index: number) {
    const updatedLinks = [...links];
    updatedLinks.splice(index, 1);
    setLinks(updatedLinks);
  }

  function addSocialLink() {
    if (newSocialLink.platform && newSocialLink.url) {
      setSocialLinks([...socialLinks, newSocialLink]);
      setNewSocialLink({ platform: "", url: "" });
    }
  }

  function removeSocialLink(index: number) {
    const updatedSocialLinks = [...socialLinks];
    updatedSocialLinks.splice(index, 1);
    setSocialLinks(updatedSocialLinks);
  }

  function saveAllLinks() {
    console.log("Links salvos:", links);
    // Aqui seria a chamada para a API para salvar os links
  }

  function saveAllSocialLinks() {
    console.log("Links sociais salvos:", socialLinks);
    // Aqui seria a chamada para a API para salvar os links sociais
  }

  return (
    <div className="container mx-auto py-10">
      <h1 className="text-3xl font-bold mb-6">Painel do Usuário</h1>
      
      <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="profile">Perfil</TabsTrigger>
          <TabsTrigger value="links">Links</TabsTrigger>
          <TabsTrigger value="social">Redes Sociais</TabsTrigger>
        </TabsList>
        
        <TabsContent value="profile">
          <Card>
            <CardHeader>
              <CardTitle>Informações do Perfil</CardTitle>
              <CardDescription>
                Atualize suas informações pessoais e personalize sua página.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Form {...profileForm}>
                <form onSubmit={profileForm.handleSubmit(onProfileSubmit)} className="space-y-6">
                  <div className="flex items-center space-x-4">
                    <Avatar className="h-24 w-24">
                      <AvatarImage src={profileForm.watch("imageUrl") || ""} />
                      <AvatarFallback>{profileForm.watch("name")?.charAt(0) || "U"}</AvatarFallback>
                    </Avatar>
                    
                    <FormField
                      control={profileForm.control}
                      name="imageUrl"
                      render={({ field }) => (
                        <FormItem className="flex-1">
                          <FormLabel>URL da Imagem de Perfil</FormLabel>
                          <FormControl>
                            <Input placeholder="https://exemplo.com/sua-imagem.jpg" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>
                  
                  <FormField
                    control={profileForm.control}
                    name="name"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Nome</FormLabel>
                        <FormControl>
                          <Input placeholder="Seu nome" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  
                  <FormField
                    control={profileForm.control}
                    name="description"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Descrição</FormLabel>
                        <FormControl>
                          <Textarea 
                            placeholder="Uma breve descrição sobre você" 
                            className="resize-none" 
                            {...field} 
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  
                  <FormField
                    control={profileForm.control}
                    name="theme"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Tema Visual</FormLabel>
                        <Select onValueChange={field.onChange} defaultValue={field.value}>
                          <FormControl>
                            <SelectTrigger>
                              <SelectValue placeholder="Selecione um tema" />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            <SelectItem value="default">Padrão</SelectItem>
                            <SelectItem value="dark">Escuro</SelectItem>
                            <SelectItem value="gradient">Gradiente</SelectItem>
                          </SelectContent>
                        </Select>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  
                  <Button type="submit">Salvar Perfil</Button>
                </form>
              </Form>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="links">
          <Card>
            <CardHeader>
              <CardTitle>Gerenciar Links</CardTitle>
              <CardDescription>
                Adicione links personalizados para sua página.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="grid grid-cols-[1fr_auto] gap-4 items-end">
                  <div>
                    <FormLabel htmlFor="new-link-title">Título</FormLabel>
                    <Input 
                      id="new-link-title"
                      value={newLink.title}
                      onChange={(e) => setNewLink({...newLink, title: e.target.value})}
                      placeholder="Meu Site"
                    />
                  </div>
                  <div className="flex-1">
                    <FormLabel htmlFor="new-link-url">URL</FormLabel>
                    <div className="flex space-x-2">
                      <Input 
                        id="new-link-url"
                        value={newLink.url}
                        onChange={(e) => setNewLink({...newLink, url: e.target.value})}
                        placeholder="https://exemplo.com"
                      />
                      <Button 
                        type="button" 
                        onClick={addLink}
                        size="icon"
                      >
                        <PlusCircle className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                </div>
                
                <Separator className="my-4" />
                
                {links.length === 0 ? (
                  <p className="text-center text-muted-foreground py-4">
                    Nenhum link adicionado ainda.
                  </p>
                ) : (
                  <div className="space-y-2">
                    {links.map((link, index) => (
                      <div key={index} className="flex items-center justify-between p-2 border rounded-md">
                        <div>
                          <p className="font-medium">{link.title}</p>
                          <p className="text-sm text-muted-foreground">{link.url}</p>
                        </div>
                        <Button 
                          variant="ghost" 
                          size="icon"
                          onClick={() => removeLink(index)}
                        >
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </CardContent>
            <CardFooter>
              <Button 
                onClick={saveAllLinks}
                disabled={links.length === 0}
                className="w-full"
              >
                <Save className="mr-2 h-4 w-4" />
                Salvar Todos os Links
              </Button>
            </CardFooter>
          </Card>
        </TabsContent>
        
        <TabsContent value="social">
          <Card>
            <CardHeader>
              <CardTitle>Redes Sociais</CardTitle>
              <CardDescription>
                Conecte suas redes sociais à sua página.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="grid grid-cols-[1fr_auto] gap-4 items-end">
                  <div>
                    <FormLabel htmlFor="new-social-platform">Plataforma</FormLabel>
                    <Select 
                      onValueChange={(value) => setNewSocialLink({...newSocialLink, platform: value})}
                      value={newSocialLink.platform}
                    >
                      <SelectTrigger id="new-social-platform">
                        <SelectValue placeholder="Selecione uma plataforma" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="instagram">Instagram</SelectItem>
                        <SelectItem value="twitter">Twitter</SelectItem>
                        <SelectItem value="facebook">Facebook</SelectItem>
                        <SelectItem value="linkedin">LinkedIn</SelectItem>
                        <SelectItem value="youtube">YouTube</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="flex-1">
                    <FormLabel htmlFor="new-social-url">URL</FormLabel>
                    <div className="flex space-x-2">
                      <Input 
                        id="new-social-url"
                        value={newSocialLink.url}
                        onChange={(e) => setNewSocialLink({...newSocialLink, url: e.target.value})}
                        placeholder="https://instagram.com/seuusuario"
                      />
                      <Button 
                        type="button" 
                        onClick={addSocialLink}
                        size="icon"
                      >
                        <PlusCircle className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                </div>
                
                <Separator className="my-4" />
                
                {socialLinks.length === 0 ? (
                  <p className="text-center text-muted-foreground py-4">
                    Nenhuma rede social adicionada ainda.
                  </p>
                ) : (
                  <div className="space-y-2">
                    {socialLinks.map((link, index) => (
                      <div key={index} className="flex items-center justify-between p-2 border rounded-md">
                        <div>
                          <p className="font-medium capitalize">{link.platform}</p>
                          <p className="text-sm text-muted-foreground">{link.url}</p>
                        </div>
                        <Button 
                          variant="ghost" 
                          size="icon"
                          onClick={() => removeSocialLink(index)}
                        >
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </CardContent>
            <CardFooter>
              <Button 
                onClick={saveAllSocialLinks}
                disabled={socialLinks.length === 0}
                className="w-full"
              >
                <Save className="mr-2 h-4 w-4" />
                Salvar Redes Sociais
              </Button>
            </CardFooter>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
