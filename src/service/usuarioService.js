import { supabase } from "./supabase"

export async function upsertUsuario( email, id_usuario_supabase ) {
    const { data, error } = await supabase.from('usuario').upsert({ email, id_usuario_supabase }, {onConflict: 'email'})
}

export async function getIdUsuario(email) {
    return await supabase
    .from('usuario')
    .select('id')
    .eq('email', email) 
}