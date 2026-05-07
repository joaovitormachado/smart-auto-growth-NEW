import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { useNavigate } from "react-router-dom";
import { useTracking } from "@/hooks/useTracking";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

const formSchema = z.object({
  nome: z.string().min(2, "Nome é obrigatório"),
  loja: z.string().min(2, "Nome da loja é obrigatório"),
  cidadeEstado: z.string().min(2, "Cidade/Estado é obrigatório"),
  qtdCarros: z.string().min(1, "Selecione a quantidade de carros"),
  qtdVendedores: z.string().min(1, "Selecione a quantidade de vendedores"),
  whatsapp: z.string().min(10, "WhatsApp inválido"),
  instagram: z.string().min(2, "Instagram é obrigatório"),
  investeTrafego: z.string().min(1, "Selecione uma opção"),
  faturamento: z.string().optional(),
});

const Formulario = () => {
  const navigate = useNavigate();
  const { trackEvent, getUtmLink } = useTracking();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      nome: "",
      loja: "",
      cidadeEstado: "",
      qtdCarros: "",
      qtdVendedores: "",
      whatsapp: "",
      instagram: "",
      investeTrafego: "",
      faturamento: "",
    },
  });

  useEffect(() => {
    trackEvent("view_form_page");
  }, []);

  const onSubmit = (values: z.infer<typeof formSchema>) => {
    trackEvent("form_submitted", values);
    // Redireciona para VSL preservando as UTMs
    navigate(getUtmLink("/vsl"));
  };

  const handleFormStart = () => {
    if (!form.formState.isDirty) {
      trackEvent("form_started");
    }
  };

  return (
    <main className="min-h-screen bg-zinc-950 py-12 px-5 sm:px-8 text-white flex items-center justify-center">
      <div className="max-w-2xl w-full bg-zinc-900 border border-white/10 rounded-2xl p-6 sm:p-10 shadow-premium">
        <div className="text-center mb-8">
          <h1 className="font-display text-3xl font-black text-white sm:text-4xl mb-3">
            Aplicação para Consultoria
          </h1>
          <p className="text-zinc-400">
            Preencha os dados abaixo para descobrirmos se podemos ajudar sua loja a vender mais.
          </p>
        </div>

        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6" onChange={handleFormStart}>
            <FormField
              control={form.control}
              name="nome"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-zinc-300">Seu Nome</FormLabel>
                  <FormControl>
                    <Input placeholder="Ex: João da Silva" className="bg-zinc-950 border-white/10 text-white" {...field} />
                  </FormControl>
                  <FormMessage className="text-red-400" />
                </FormItem>
              )}
            />

            <div className="grid sm:grid-cols-2 gap-6">
              <FormField
                control={form.control}
                name="loja"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-zinc-300">Nome da Loja</FormLabel>
                    <FormControl>
                      <Input placeholder="Ex: Auto Motors" className="bg-zinc-950 border-white/10 text-white" {...field} />
                    </FormControl>
                    <FormMessage className="text-red-400" />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="cidadeEstado"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-zinc-300">Cidade/Estado</FormLabel>
                    <FormControl>
                      <Input placeholder="Ex: São Paulo / SP" className="bg-zinc-950 border-white/10 text-white" {...field} />
                    </FormControl>
                    <FormMessage className="text-red-400" />
                  </FormItem>
                )}
              />
            </div>

            <div className="grid sm:grid-cols-2 gap-6">
              <FormField
                control={form.control}
                name="qtdCarros"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-zinc-300">Média de carros vendidos/mês</FormLabel>
                    <Select onValueChange={field.onChange} defaultValue={field.value}>
                      <FormControl>
                        <SelectTrigger className="bg-zinc-950 border-white/10 text-white">
                          <SelectValue placeholder="Selecione..." />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent className="bg-zinc-900 border-white/10 text-white">
                        <SelectItem value="menos_de_10">Menos de 10</SelectItem>
                        <SelectItem value="11_a_30">11 a 30</SelectItem>
                        <SelectItem value="31_a_60">31 a 60</SelectItem>
                        <SelectItem value="mais_de_60">Mais de 60</SelectItem>
                      </SelectContent>
                    </Select>
                    <FormMessage className="text-red-400" />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="qtdVendedores"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-zinc-300">Quantidade de vendedores</FormLabel>
                    <Select onValueChange={field.onChange} defaultValue={field.value}>
                      <FormControl>
                        <SelectTrigger className="bg-zinc-950 border-white/10 text-white">
                          <SelectValue placeholder="Selecione..." />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent className="bg-zinc-900 border-white/10 text-white">
                        <SelectItem value="1_a_2">1 a 2</SelectItem>
                        <SelectItem value="3_a_5">3 a 5</SelectItem>
                        <SelectItem value="6_a_10">6 a 10</SelectItem>
                        <SelectItem value="mais_de_10">Mais de 10</SelectItem>
                      </SelectContent>
                    </Select>
                    <FormMessage className="text-red-400" />
                  </FormItem>
                )}
              />
            </div>

            <div className="grid sm:grid-cols-2 gap-6">
              <FormField
                control={form.control}
                name="whatsapp"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-zinc-300">WhatsApp</FormLabel>
                    <FormControl>
                      <Input placeholder="(11) 90000-0000" type="tel" className="bg-zinc-950 border-white/10 text-white" {...field} />
                    </FormControl>
                    <FormMessage className="text-red-400" />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="instagram"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-zinc-300">Instagram da Loja</FormLabel>
                    <FormControl>
                      <Input placeholder="@sualoja" className="bg-zinc-950 border-white/10 text-white" {...field} />
                    </FormControl>
                    <FormMessage className="text-red-400" />
                  </FormItem>
                )}
              />
            </div>

            <FormField
              control={form.control}
              name="investeTrafego"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-zinc-300">Investe em tráfego atualmente?</FormLabel>
                  <Select onValueChange={field.onChange} defaultValue={field.value}>
                    <FormControl>
                      <SelectTrigger className="bg-zinc-950 border-white/10 text-white">
                        <SelectValue placeholder="Selecione..." />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent className="bg-zinc-900 border-white/10 text-white">
                      <SelectItem value="sim_agencia">Sim, com agência/gestor</SelectItem>
                      <SelectItem value="sim_conta_propria">Sim, faço por conta própria</SelectItem>
                      <SelectItem value="nao">Não invisto atualmente</SelectItem>
                    </SelectContent>
                  </Select>
                  <FormMessage className="text-red-400" />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="faturamento"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-zinc-300">Faturamento médio mensal (Opcional)</FormLabel>
                  <FormControl>
                    <Input placeholder="Ex: R$ 300.000,00" className="bg-zinc-950 border-white/10 text-white" {...field} />
                  </FormControl>
                  <FormMessage className="text-red-400" />
                </FormItem>
              )}
            />

            <Button type="submit" variant="cta" className="w-full h-14 text-lg font-bold shadow-cta">
              Enviar Aplicação
            </Button>
          </form>
        </Form>
      </div>
    </main>
  );
};

export default Formulario;
