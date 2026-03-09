import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { User } from "@supabase/supabase-js";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { Card } from "@/components/ui/card";
import { LogOut, Trash2, Users, GraduationCap, RefreshCw, MousePointerClick } from "lucide-react";
import logoTicTac from "@/assets/logo-tic-tac.png";
import { format } from "date-fns";
import { ptBR } from "date-fns/locale";

interface Contact {
  id: string;
  name: string;
  email: string;
  phone: string;
  created_at: string;
  utm_source: string | null;
  utm_medium: string | null;
  utm_campaign: string | null;
  referrer: string | null;
}

interface EnrollmentInquiry {
  id: string;
  full_name: string;
  email: string | null;
  whatsapp: string;
  course_for: string;
  child_age: number | null;
  created_at: string;
  utm_source: string | null;
  utm_medium: string | null;
  utm_campaign: string | null;
  referrer: string | null;
}

interface ClickStats {
  link_type: string;
  count: number;
}

interface ClickDetail {
  id: string;
  link_type: string;
  clicked_at: string;
  page_url: string | null;
  user_agent: string | null;
}

const Admin = () => {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [contacts, setContacts] = useState<Contact[]>([]);
  const [enrollments, setEnrollments] = useState<EnrollmentInquiry[]>([]);
  const [clickStats, setClickStats] = useState<ClickStats[]>([]);
  const [clickDetails, setClickDetails] = useState<ClickDetail[]>([]);
  const [isLoadingData, setIsLoadingData] = useState(false);
  const navigate = useNavigate();
  const { toast } = useToast();

  useEffect(() => {
    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      (event, session) => {
        setUser(session?.user ?? null);
        setIsLoading(false);
        
        if (!session) {
          navigate("/admin/auth");
        }
      }
    );

    supabase.auth.getSession().then(({ data: { session } }) => {
      setUser(session?.user ?? null);
      setIsLoading(false);
      
      if (!session) {
        navigate("/admin/auth");
      }
    });

    return () => subscription.unsubscribe();
  }, [navigate]);

  useEffect(() => {
    if (user) {
      fetchData();
    }
  }, [user]);

  const fetchData = async () => {
    setIsLoadingData(true);
    try {
      const [contactsRes, enrollmentsRes, clicksRes, clickDetailsRes] = await Promise.all([
        supabase.from("contacts").select("*").order("created_at", { ascending: false }),
        supabase.from("enrollment_inquiries").select("*").order("created_at", { ascending: false }),
        supabase.from("contact_clicks").select("link_type"),
        supabase.from("contact_clicks").select("*").order("clicked_at", { ascending: false }).limit(100),
      ]);

      if (contactsRes.data) setContacts(contactsRes.data);
      if (enrollmentsRes.data) setEnrollments(enrollmentsRes.data);
      if (clickDetailsRes.data) setClickDetails(clickDetailsRes.data);
      
      // Aggregate click counts
      if (clicksRes.data) {
        const counts: Record<string, number> = {};
        clicksRes.data.forEach((click) => {
          counts[click.link_type] = (counts[click.link_type] || 0) + 1;
        });
        const stats = Object.entries(counts).map(([link_type, count]) => ({
          link_type,
          count,
        })).sort((a, b) => b.count - a.count);
        setClickStats(stats);
      }
    } catch (error) {
      toast({
        title: "Erro ao carregar dados",
        description: "Não foi possível carregar os contatos.",
        variant: "destructive",
      });
    } finally {
      setIsLoadingData(false);
    }
  };

  const handleLogout = async () => {
    await supabase.auth.signOut();
    navigate("/admin/auth");
  };

  const deleteContact = async (id: string) => {
    try {
      const { error } = await supabase.from("contacts").delete().eq("id", id);
      if (error) throw error;
      
      setContacts(contacts.filter((c) => c.id !== id));
      toast({
        title: "Contato excluído",
        description: "O contato foi removido com sucesso.",
      });
    } catch (error) {
      toast({
        title: "Erro ao excluir",
        description: "Não foi possível excluir o contato.",
        variant: "destructive",
      });
    }
  };

  const deleteEnrollment = async (id: string) => {
    try {
      const { error } = await supabase.from("enrollment_inquiries").delete().eq("id", id);
      if (error) throw error;
      
      setEnrollments(enrollments.filter((e) => e.id !== id));
      toast({
        title: "Solicitação excluída",
        description: "A solicitação foi removida com sucesso.",
      });
    } catch (error) {
      toast({
        title: "Erro ao excluir",
        description: "Não foi possível excluir a solicitação.",
        variant: "destructive",
      });
    }
  };

  const formatDate = (dateString: string) => {
    return format(new Date(dateString), "dd/MM/yyyy 'às' HH:mm", { locale: ptBR });
  };

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="bg-card border-b sticky top-0 z-10">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <img src={logoTicTac} alt="Tic Tac School" className="h-10" />
            <div>
              <h1 className="font-bold text-lg">Painel Administrativo</h1>
              <p className="text-xs text-muted-foreground">{user?.email}</p>
            </div>
          </div>
          <Button variant="outline" size="sm" onClick={handleLogout}>
            <LogOut className="h-4 w-4 mr-2" />
            Sair
          </Button>
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-4 py-8">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl font-bold">Gerenciar Contatos</h2>
          <Button variant="outline" size="sm" onClick={fetchData} disabled={isLoadingData}>
            <RefreshCw className={`h-4 w-4 mr-2 ${isLoadingData ? "animate-spin" : ""}`} />
            Atualizar
          </Button>
        </div>

        <Tabs defaultValue="clicks" className="space-y-6">
          <TabsList className="grid w-full max-w-lg grid-cols-3">
            <TabsTrigger value="clicks" className="flex items-center gap-2">
              <MousePointerClick className="h-4 w-4" />
              Cliques
            </TabsTrigger>
            <TabsTrigger value="contacts" className="flex items-center gap-2">
              <Users className="h-4 w-4" />
              Contatos ({contacts.length})
            </TabsTrigger>
            <TabsTrigger value="enrollments" className="flex items-center gap-2">
              <GraduationCap className="h-4 w-4" />
              Matrículas ({enrollments.length})
            </TabsTrigger>
          </TabsList>

          <TabsContent value="clicks">
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4 mb-6">
              {clickStats.length === 0 ? (
                <div className="col-span-full p-8 text-center text-muted-foreground bg-card rounded-lg border">
                  Nenhum clique registrado ainda.
                </div>
              ) : (
                clickStats.map((stat) => (
                  <Card key={stat.link_type} className="p-4">
                    <div className="flex flex-col">
                      <span className="text-sm text-muted-foreground capitalize">
                        {stat.link_type.replace(/_/g, ' ')}
                      </span>
                      <span className="text-3xl font-bold text-primary">{stat.count}</span>
                      <span className="text-xs text-muted-foreground">cliques</span>
                    </div>
                  </Card>
                ))
              )}
            </div>
            <div className="mb-4 p-4 bg-muted/50 rounded-lg">
              <p className="text-sm text-muted-foreground">
                <strong>Total de cliques:</strong> {clickStats.reduce((sum, s) => sum + s.count, 0)}
              </p>
            </div>

            {/* Detailed click history */}
            <h3 className="text-lg font-semibold mb-4">Histórico de Cliques (últimos 100)</h3>
            <div className="bg-card rounded-lg border">
              {clickDetails.length === 0 ? (
                <div className="p-8 text-center text-muted-foreground">
                  Nenhum clique registrado ainda.
                </div>
              ) : (
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Tipo</TableHead>
                      <TableHead>Data/Hora</TableHead>
                      <TableHead>Página</TableHead>
                      <TableHead>Dispositivo</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {clickDetails.map((click) => (
                      <TableRow key={click.id}>
                        <TableCell className="font-medium capitalize">
                          {click.link_type.replace(/_/g, ' ')}
                        </TableCell>
                        <TableCell className="text-sm text-muted-foreground">
                          {formatDate(click.clicked_at)}
                        </TableCell>
                        <TableCell className="text-sm">
                          {click.page_url || "-"}
                        </TableCell>
                        <TableCell className="text-xs text-muted-foreground max-w-[200px] truncate" title={click.user_agent || ""}>
                          {click.user_agent ? (
                            click.user_agent.includes("Mobile") ? "📱 Mobile" :
                            click.user_agent.includes("Windows") ? "💻 Windows" :
                            click.user_agent.includes("Mac") ? "🍎 Mac" :
                            click.user_agent.includes("Linux") ? "🐧 Linux" :
                            "🌐 Outro"
                          ) : "-"}
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              )}
            </div>
          </TabsContent>

          <TabsContent value="contacts">
            <div className="bg-card rounded-lg border">
              {contacts.length === 0 ? (
                <div className="p-8 text-center text-muted-foreground">
                  Nenhum contato registrado ainda.
                </div>
              ) : (
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Nome</TableHead>
                      <TableHead>Email</TableHead>
                      <TableHead>Telefone</TableHead>
                      <TableHead>Data</TableHead>
                      <TableHead className="w-[80px]">Ações</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {contacts.map((contact) => (
                      <TableRow key={contact.id}>
                        <TableCell className="font-medium">{contact.name}</TableCell>
                        <TableCell>{contact.email}</TableCell>
                        <TableCell>{contact.phone}</TableCell>
                        <TableCell className="text-sm text-muted-foreground">
                          {formatDate(contact.created_at)}
                        </TableCell>
                        <TableCell>
                          <AlertDialog>
                            <AlertDialogTrigger asChild>
                              <Button variant="ghost" size="icon" className="text-destructive hover:text-destructive">
                                <Trash2 className="h-4 w-4" />
                              </Button>
                            </AlertDialogTrigger>
                            <AlertDialogContent>
                              <AlertDialogHeader>
                                <AlertDialogTitle>Excluir contato?</AlertDialogTitle>
                                <AlertDialogDescription>
                                  Esta ação não pode ser desfeita. O contato de {contact.name} será permanentemente removido.
                                </AlertDialogDescription>
                              </AlertDialogHeader>
                              <AlertDialogFooter>
                                <AlertDialogCancel>Cancelar</AlertDialogCancel>
                                <AlertDialogAction 
                                  onClick={() => deleteContact(contact.id)}
                                  className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
                                >
                                  Excluir
                                </AlertDialogAction>
                              </AlertDialogFooter>
                            </AlertDialogContent>
                          </AlertDialog>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              )}
            </div>
          </TabsContent>

          <TabsContent value="enrollments">
            <div className="bg-card rounded-lg border">
              {enrollments.length === 0 ? (
                <div className="p-8 text-center text-muted-foreground">
                  Nenhuma solicitação de matrícula registrada ainda.
                </div>
              ) : (
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Nome</TableHead>
                      <TableHead>WhatsApp</TableHead>
                      <TableHead>Email</TableHead>
                      <TableHead>Curso</TableHead>
                      <TableHead>Idade</TableHead>
                      <TableHead>Data</TableHead>
                      <TableHead className="w-[80px]">Ações</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {enrollments.map((enrollment) => (
                      <TableRow key={enrollment.id}>
                        <TableCell className="font-medium">{enrollment.full_name}</TableCell>
                        <TableCell>{enrollment.whatsapp}</TableCell>
                        <TableCell>{enrollment.email || "-"}</TableCell>
                        <TableCell>{enrollment.course_for}</TableCell>
                        <TableCell>{enrollment.child_age ? `${enrollment.child_age} anos` : "-"}</TableCell>
                        <TableCell className="text-sm text-muted-foreground">
                          {formatDate(enrollment.created_at)}
                        </TableCell>
                        <TableCell>
                          <AlertDialog>
                            <AlertDialogTrigger asChild>
                              <Button variant="ghost" size="icon" className="text-destructive hover:text-destructive">
                                <Trash2 className="h-4 w-4" />
                              </Button>
                            </AlertDialogTrigger>
                            <AlertDialogContent>
                              <AlertDialogHeader>
                                <AlertDialogTitle>Excluir solicitação?</AlertDialogTitle>
                                <AlertDialogDescription>
                                  Esta ação não pode ser desfeita. A solicitação de {enrollment.full_name} será permanentemente removida.
                                </AlertDialogDescription>
                              </AlertDialogHeader>
                              <AlertDialogFooter>
                                <AlertDialogCancel>Cancelar</AlertDialogCancel>
                                <AlertDialogAction 
                                  onClick={() => deleteEnrollment(enrollment.id)}
                                  className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
                                >
                                  Excluir
                                </AlertDialogAction>
                              </AlertDialogFooter>
                            </AlertDialogContent>
                          </AlertDialog>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              )}
            </div>
          </TabsContent>
        </Tabs>
      </main>
    </div>
  );
};

export default Admin;
