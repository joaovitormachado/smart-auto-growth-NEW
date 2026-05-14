import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { useNavigate } from "react-router-dom";
import { useTracking } from "@/hooks/useTracking";
import { supabase } from "@/lib/supabase";
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

const formSchema = z.object({
  nome: z.string().min(2, "Nome é obrigatório"),
  loja: z.string().min(2, "Nome da loja/Instagram é obrigatório"),
  whatsapp: z.string().min(10, "WhatsApp inválido"),
  cidadeEstado: z.string().min(2, "Cidade é obrigatória"),
});

const Formulario = () => {
  const navigate = useNavigate();
  const { trackEvent, getUtmLink } = useTracking();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      nome: "",
      loja: "",
      whatsapp: "",
      cidadeEstado: "",
    },
  });

  useEffect(() => {
    trackEvent("view_form_page");
  }, []);

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    trackEvent("form_submitted", values);
    
    try {
      const { error } = await supabase.from("leads").insert([
        {
          nome: values.nome,
          nome_loja: values.loja,
          whatsapp: values.whatsapp,
          cidade_estado: values.cidadeEstado,
        }
      ]);
      if (error) console.error("Erro ao salvar no Supabase:", error);
    } catch (err) {
      console.error("Erro inesperado:", err);
    }

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
                  <FormLabel className="text-zinc-300">Nome</FormLabel>
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
                    <FormLabel className="text-zinc-300">Nome da loja / Instagram</FormLabel>
                    <FormControl>
                      <Input placeholder="Ex: Auto Motors / @automotors" className="bg-zinc-950 border-white/10 text-white" {...field} />
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
                    <FormLabel className="text-zinc-300">Cidade</FormLabel>
                    <FormControl>
                      <Input placeholder="Ex: São Paulo" className="bg-zinc-950 border-white/10 text-white" {...field} />
                    </FormControl>
                    <FormMessage className="text-red-400" />
                  </FormItem>
                )}
              />
            </div>

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
