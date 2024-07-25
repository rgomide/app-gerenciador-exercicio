import { supabase } from './supabase'

export async function insertRotina(id_treino, nome_rotina) {
    const { data, error } = await supabase.from('rotina').insert({ id_treino, nome_rotina})
}

export async function updateRotina(id, nome_rotina) {
    const {data, error} = await supabase.from('rotina').update({ nome_rotina: nome_rotina}).eq('id', id)
}

export async function deleteRotina(id) {
    const {error} = await supabase.from('rotina').delete().eq('id', id)
}

export async function selectRotinasByTreino(id_treino) {
    return await supabase.from('rotina').select().eq('id_treino', id_treino)
}