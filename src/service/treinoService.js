import { supabase } from "./supabase";

export async function insertTreino( id_usuario, nome ) {
    console.log('id: ' + id_usuario + ', nome: ' + nome)
    const { data, error } = await supabase.from('treino').insert({ id_usuario, nome})
    console.log('inseriu treino')
  }
