import { supabase } from './supabase'

export async function insertTreino(id_usuario, nome) {
  const { data, error } = await supabase.from('treino').insert({ id_usuario, nome })
}
