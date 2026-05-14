import { createClient } from '@supabase/supabase-js';
import fs from 'fs';
import path from 'path';

// Carregar .env manualmente para evitar problemas de compatibilidade com Vite
const envPath = path.resolve('.env');
let env = {};
if (fs.existsSync(envPath)) {
  const envFile = fs.readFileSync(envPath, 'utf-8');
  env = envFile.split('\n').reduce((acc, line) => {
    const [key, ...val] = line.split('=');
    if (key && val.length) acc[key.trim()] = val.join('=').replace(/"/g, '').replace(/'/g, '').trim();
    return acc;
  }, {});
}

const supabaseUrl = env.VITE_SUPABASE_URL;
const supabaseKey = env.VITE_SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseKey) {
  console.error("Erro: VITE_SUPABASE_URL ou VITE_SUPABASE_ANON_KEY não encontrados no .env.");
  process.exit(1);
}

const supabase = createClient(supabaseUrl, supabaseKey);

async function testConnection() {
  console.log("==========================================");
  console.log("Iniciando teste de conexão com o Supabase...");
  console.log(`URL: ${supabaseUrl}`);
  
  try {
    const { data, error } = await supabase.from('produtos').select('*').limit(5);
    
    if (error) {
      console.error("\n❌ Erro ao conectar no Supabase ou consultar a tabela:");
      console.error(error);
    } else {
      console.log("\n✅ Supabase conectado com sucesso!");
      console.log(`Tabela 'produtos' encontrada.`);
      console.log(`Foram retornados ${data.length} registros da tabela 'produtos'.`);
      if (data.length > 0) {
        console.log("Exemplo de dados:");
        console.log(data);
      }
    }
  } catch (err) {
    console.error("\n❌ Erro fatal de conexão:");
    console.error(err);
  }
  console.log("==========================================");
}

testConnection();
