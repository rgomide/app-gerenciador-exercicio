import { supabase } from './supabase'

export async function insertTreino(id_usuario, nome) {
  const { data, error } = await supabase.from('treino').insert({ id_usuario, nome })
}

export async function updateTreino(id, nome) {
  const { data, error } = await supabase.from('treino').update({ nome: nome }).eq('id', id)
}

export async function deleteTreino(id) {
  const { error } = await supabase.from('treino').delete().eq('id', id)
}

export async function getTreinoById(id) {
  return await supabase.from('treino').select().eq('id', id)
}

export async function selectTreinosByUsuario(id_usuario) {
  return await supabase.from('treino').select().eq('id_usuario', id_usuario)
}
