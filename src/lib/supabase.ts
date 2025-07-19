import { createClient } from '@supabase/supabase-js'

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY

if (!supabaseUrl || !supabaseAnonKey) {
  throw new Error('Missing Supabase environment variables')
}

export const supabase = createClient(supabaseUrl, supabaseAnonKey)

// Types for our database tables
export interface ConsultationRequest {
  id?: string
  name: string
  email: string
  phone?: string
  company?: string
  website?: string
  message?: string
  services: string[]
  budget?: string
  timeline?: string
  created_at?: string
  updated_at?: string
}

export interface PackageSelection {
  id?: string
  name: string
  email: string
  phone: string
  company: string
  website?: string
  social_media: {
    facebook?: string
    instagram?: string
    linkedin?: string
    youtube?: string
    tiktok?: string
  }
  address?: string
  city?: string
  selected_package: string
  additional_services: string[]
  message?: string
  budget?: string
  timeline?: string
  created_at?: string
  updated_at?: string
}

// Database functions
export const insertConsultationRequest = async (data: ConsultationRequest) => {
  const { error } = await supabase
    .from('consultation_requests')
    .insert([data])

  if (error) {
    console.error('Error inserting consultation request:', error)
    throw error
  }

  return { success: true }
}

export const insertPackageSelection = async (data: PackageSelection) => {
  const { error } = await supabase
    .from('package_selections')
    .insert([data])

  if (error) {
    console.error('Error inserting package selection:', error)
    throw error
  }

  return { success: true }
}

// Admin functions (require service role key)
export const getConsultationRequests = async () => {
  const { data, error } = await supabase
    .from('consultation_requests')
    .select('*')
    .order('created_at', { ascending: false })

  if (error) {
    console.error('Error fetching consultation requests:', error)
    throw error
  }

  return data
}

export const getPackageSelections = async () => {
  const { data, error } = await supabase
    .from('package_selections')
    .select('*')
    .order('created_at', { ascending: false })

  if (error) {
    console.error('Error fetching package selections:', error)
    throw error
  }

  return data
}