import { createClient } from '@supabase/supabase-js'

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY

if (!supabaseUrl || !supabaseAnonKey) {
  throw new Error('Missing Supabase environment variables')
}

export const supabase = createClient(supabaseUrl, supabaseAnonKey)

// Types for our database tables
export interface ConsultationRequest {
  id?: number
  name: string
  email: string
  phone?: string
  company?: string
  website?: string
  message?: string
  services?: string[]
  budget?: string
  timeline?: string
  serviceInterest?: 'digital-marketing' | 'seo' | 'social-media' | 'google-ads' | 'web-development' | 'branding' | 'other'
  status: 'new' | 'in-progress' | 'replied' | 'closed'
  created_at?: string
  updated_at?: string
}

export interface PackageSelection {
  id?: number
  name: string
  email: string
  phone: string
  company: string
  website?: string
  address?: string
  city?: string
  packageType: 'starter' | 'professional' | 'enterprise' | 'custom'
  total_amount?: number
  duration?: '1-month' | '3-months' | '6-months' | '12-months' | 'ongoing'
  start_date?: string
  special_requests?: string
  billing_address_street?: string
  billing_address_city?: string
  billing_address_postal_code?: string
  billing_address_country?: string
  vat_number?: string
  status: 'pending' | 'confirmed' | 'in-progress' | 'completed' | 'cancelled'
  paymentStatus?: 'pending' | 'paid' | 'partial' | 'refunded'
  internal_notes?: string
  source?: string
  message?: string
  budget?: string
  timeline?: string
  created_at?: string
  updated_at?: string
}

// Database functions
export const insertConsultationRequest = async (data: ConsultationRequest) => {
  // Map frontend data to actual Payload schema columns only
  const payloadData = {
    name: data.name,
    email: data.email,
    phone: data.phone,
    company: data.company,
    website: data.website,
    message: data.message,
    serviceInterest: data.serviceInterest || 'other',
    budget: data.budget,
    status: 'new' as const
  }

  const { error } = await supabase
    .from('consultation_requests')
    .insert([payloadData])

  if (error) {
    console.error('Error inserting consultation request:', error)
    throw error
  }

  return { success: true }
}

export const insertPackageSelection = async (data: PackageSelection) => {
  // Map frontend data to Payload schema
  const payloadData = {
    customer_name: data.name,
    email: data.email,
    phone: data.phone,
    company: data.company,
    packageType: data.packageType,
    total_amount: getPackagePrice(data.packageType),
    duration: '1-month' as const,
    special_requests: data.message,
    billing_address_street: data.address,
    billing_address_city: data.city,
    status: 'pending' as const,
    paymentStatus: 'pending' as const,
    source: 'website'
  }

  const { error } = await supabase
    .from('package_orders')
    .insert([payloadData])

  if (error) {
    console.error('Error inserting package order:', error)
    throw error
  }

  return { success: true }
}

// Helper function to get package price
const getPackagePrice = (packageType: string): number => {
  switch (packageType) {
    case 'starter': return 699
    case 'professional': return 1299
    case 'enterprise': return 2299
    default: return 0
  }
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

export const getPackageOrders = async () => {
  const { data, error } = await supabase
    .from('package_orders')
    .select('*')
    .order('created_at', { ascending: false })

  if (error) {
    console.error('Error fetching package orders:', error)
    throw error
  }

  return data
}
