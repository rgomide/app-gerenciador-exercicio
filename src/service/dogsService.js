import { supabase } from './supabase'

export async function getAll() {
  return await supabase.from('dogs').select().order('name', { ascending: true })
}

export async function insert({ name, imageUrl }) {
  return await supabase.from('dogs').insert({ name, image_url: imageUrl }).select()
}

export async function remove(id) {
  return await supabase.from('dogs').delete().eq('id', id).select()
}
