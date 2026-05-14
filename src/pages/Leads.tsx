import { useEffect, useState, useMemo } from "react";
import { supabase } from "@/lib/supabase";
import { format } from "date-fns";
import { ptBR } from "date-fns/locale";
import { 
  Search, 
  Download, 
  MessageCircle, 
  Copy, 
  ArrowUpDown,
  CarFront
} from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";

interface Lead {
  id: number;
  nome: string;
  instagram_loja: string;
  whatsapp: string;
  cidade: string;
  created_at: string;
}

const Leads = () => {
  const [leads, setLeads] = useState<Lead[]>([]);
  const [search, setSearch] = useState("");
  const [sortOrder, setSortOrder] = useState<"desc" | "asc">("desc");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchLeads();

    // Configura o Realtime do Supabase
    const channel = supabase
      .channel("custom-all-channel")
      .on(
        "postgres_changes",
        { event: "INSERT", schema: "public", table: "leads" },
        (payload) => {
          console.log("Novo lead recebido:", payload);
          setLeads((prev) => [payload.new as Lead, ...prev]);
          toast.success("Novo lead recebido!");
        }
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, []);

  const fetchLeads = async () => {
    try {
      setLoading(true);
      const { data, error } = await supabase
        .from("leads")
        .select("*")
        .order("created_at", { ascending: false });

      if (error) {
        console.error("Erro ao buscar leads:", error);
        toast.error("Erro ao carregar os leads.");
      } else {
        setLeads(data || []);
      }
    } finally {
      setLoading(false);
    }
  };

  const handleCopyWhatsapp = (whatsapp: string) => {
    navigator.clipboard.writeText(whatsapp);
    toast.success("WhatsApp copiado!");
  };

  const handleOpenWhatsapp = (whatsapp: string) => {
    // Remove caracteres não numéricos
    const number = whatsapp.replace(/\D/g, "");
    if (number) {
      window.open(`https://wa.me/55${number}`, "_blank");
    } else {
      toast.error("Número inválido");
    }
  };

  const handleExportCSV = () => {
    if (leads.length === 0) {
      toast.error("Nenhum dado para exportar.");
      return;
    }

    // Cria o cabeçalho do CSV
    const headers = ["Data", "Nome", "Loja/Instagram", "WhatsApp", "Cidade"];
    
    // Mapeia os dados
    const csvData = filteredAndSortedLeads.map(lead => [
      format(new Date(lead.created_at), "dd/MM/yyyy HH:mm"),
      lead.nome,
      lead.instagram_loja,
      lead.whatsapp,
      lead.cidade
    ]);

    // Junta cabeçalho e dados usando ponto e vírgula para Excel em PT-BR
    const csvContent = [
      headers.join(";"),
      ...csvData.map(row => row.map(item => `"${item || ""}"`).join(";"))
    ].join("\n");

    // Cria o blob e faz o download
    const blob = new Blob(["\ufeff" + csvContent], { type: "text/csv;charset=utf-8;" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.setAttribute("href", url);
    link.setAttribute("download", "leads.csv");
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    toast.success("Exportação concluída!");
  };

  const toggleSort = () => {
    setSortOrder(prev => prev === "desc" ? "asc" : "desc");
  };

  const filteredAndSortedLeads = useMemo(() => {
    let result = [...leads];

    // Filtro de busca
    if (search) {
      const lowerSearch = search.toLowerCase();
      result = result.filter(
        lead => 
          (lead.nome && lead.nome.toLowerCase().includes(lowerSearch)) || 
          (lead.instagram_loja && lead.instagram_loja.toLowerCase().includes(lowerSearch)) ||
          (lead.cidade && lead.cidade.toLowerCase().includes(lowerSearch)) ||
          (lead.whatsapp && lead.whatsapp.includes(search))
      );
    }

    // Ordenação
    result.sort((a, b) => {
      const dateA = new Date(a.created_at).getTime();
      const dateB = new Date(b.created_at).getTime();
      return sortOrder === "desc" ? dateB - dateA : dateA - dateB;
    });

    return result;
  }, [leads, search, sortOrder]);

  return (
    <main className="min-h-screen bg-zinc-950 py-10 px-4 sm:px-8 text-white font-sans">
      <div className="max-w-7xl mx-auto space-y-8">
        
        {/* Header do Dashboard */}
        <header className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 bg-zinc-900/50 p-6 rounded-2xl border border-white/5 shadow-premium">
          <div className="flex items-center gap-3">
            <div className="bg-cta p-3 rounded-xl shadow-cta">
              <CarFront className="w-6 h-6 text-black" />
            </div>
            <div>
              <h1 className="text-2xl font-black font-display tracking-tight text-white">
                CRM Leads
              </h1>
              <p className="text-sm text-zinc-400">
                Gerencie as aplicações recebidas
              </p>
            </div>
          </div>

          <div className="flex w-full md:w-auto items-center gap-3">
            <div className="relative w-full md:w-64">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-zinc-400" />
              <Input 
                placeholder="Buscar lead..." 
                className="pl-10 bg-zinc-950 border-white/10 text-white placeholder:text-zinc-500 w-full"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
              />
            </div>
            <Button 
              onClick={handleExportCSV}
              variant="outline" 
              className="bg-zinc-900 border-white/10 text-zinc-300 hover:text-white hover:bg-zinc-800"
            >
              <Download className="w-4 h-4 mr-2" />
              Exportar
            </Button>
          </div>
        </header>

        {/* Tabela */}
        <div className="bg-zinc-900 border border-white/5 rounded-2xl overflow-hidden shadow-premium">
          <div className="overflow-x-auto">
            <table className="w-full text-sm text-left">
              <thead className="text-xs text-zinc-400 uppercase bg-zinc-950/50 border-b border-white/5">
                <tr>
                  <th className="px-6 py-4 font-medium">Nome</th>
                  <th className="px-6 py-4 font-medium">Loja / Instagram</th>
                  <th className="px-6 py-4 font-medium">WhatsApp</th>
                  <th className="px-6 py-4 font-medium">Cidade</th>
                  <th className="px-6 py-4 font-medium cursor-pointer hover:text-white transition-colors group" onClick={toggleSort}>
                    <div className="flex items-center gap-2">
                      Data
                      <ArrowUpDown className="w-3 h-3 group-hover:opacity-100 opacity-50" />
                    </div>
                  </th>
                  <th className="px-6 py-4 font-medium text-right">Ações</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-white/5">
                {loading ? (
                  <tr>
                    <td colSpan={6} className="px-6 py-12 text-center text-zinc-500">
                      Carregando leads...
                    </td>
                  </tr>
                ) : filteredAndSortedLeads.length === 0 ? (
                  <tr>
                    <td colSpan={6} className="px-6 py-12 text-center text-zinc-500">
                      Nenhum lead encontrado.
                    </td>
                  </tr>
                ) : (
                  filteredAndSortedLeads.map((lead) => (
                    <tr key={lead.id} className="hover:bg-white/[0.02] transition-colors group">
                      <td className="px-6 py-4 font-medium text-white">
                        {lead.nome}
                      </td>
                      <td className="px-6 py-4 text-zinc-300">
                        {lead.instagram_loja || "-"}
                      </td>
                      <td className="px-6 py-4 text-zinc-300">
                        {lead.whatsapp}
                      </td>
                      <td className="px-6 py-4 text-zinc-300">
                        {lead.cidade}
                      </td>
                      <td className="px-6 py-4 text-zinc-400">
                        {lead.created_at ? format(new Date(lead.created_at), "dd/MM/yyyy HH:mm", { locale: ptBR }) : "-"}
                      </td>
                      <td className="px-6 py-4 text-right">
                        <div className="flex items-center justify-end gap-2 opacity-100 sm:opacity-0 sm:group-hover:opacity-100 transition-opacity">
                          <Button 
                            variant="ghost" 
                            size="icon" 
                            className="h-8 w-8 text-zinc-400 hover:text-white hover:bg-white/10"
                            onClick={() => handleCopyWhatsapp(lead.whatsapp)}
                            title="Copiar WhatsApp"
                          >
                            <Copy className="w-4 h-4" />
                          </Button>
                          <Button 
                            variant="cta" 
                            size="icon" 
                            className="h-8 w-8 shadow-none"
                            onClick={() => handleOpenWhatsapp(lead.whatsapp)}
                            title="Abrir no WhatsApp"
                          >
                            <MessageCircle className="w-4 h-4 text-black" />
                          </Button>
                        </div>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
          
          <div className="px-6 py-4 border-t border-white/5 bg-zinc-950/30 text-xs text-zinc-500 flex justify-between items-center">
            <span>Mostrando {filteredAndSortedLeads.length} leads</span>
            {search && <span className="text-cta">Filtro ativo</span>}
          </div>
        </div>

      </div>
    </main>
  );
};

export default Leads;
