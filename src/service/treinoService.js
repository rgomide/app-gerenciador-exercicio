import { supabase } from './supabase'

export async function insertTreino(id_usuario, nome) {
  const { data, error } = await supabase.from('treino').insert({ id_usuario, nome })
}

export async function updateTreino(id, nome) {
  const {data, error} = await supabase.from('treino').update({ nome: nome}).eq('id', id)
}

export async function deleteTreino(id) {
  const {error} = await supabase.from('treino').delete().eq('id', id)
}

export async function getIdTreinoByName(nome) {
  return await supabase.from('treino').select('id').eq('nome', nome)
}
