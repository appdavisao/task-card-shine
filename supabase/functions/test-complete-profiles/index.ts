
import { serve } from "https://deno.land/std@0.168.0/http/server.ts"
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2.50.1'

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
}

serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const supabase = createClient(
      Deno.env.get('SUPABASE_URL') ?? '',
      Deno.env.get('SUPABASE_SERVICE_ROLE_KEY') ?? ''
    )

    console.log('Starting complete profiles test...')

    // Buscar alunos com perfis completos
    const { data: completeProfiles, error: profilesError } = await supabase
      .from('profiles')
      .select(`
        user_id,
        display_name,
        archetype,
        user_dashboard!inner(
          key_data,
          user_id
        )
      `)
      .not('archetype', 'is', null)

    if (profilesError) {
      console.error('Error fetching profiles:', profilesError)
      throw profilesError
    }

    console.log(`Found ${completeProfiles?.length || 0} profiles to check`)

    // Filtrar apenas perfis com dados completos
    const validProfiles = completeProfiles?.filter(profile => {
      const keyData = profile.user_dashboard?.key_data || {}
      const hasCurrentWork = keyData.current_work && keyData.current_work.trim() !== ''
      const hasSegment = keyData.segment && keyData.segment.trim() !== ''
      const hasArchetype = profile.archetype && profile.archetype.trim() !== ''
      
      return hasCurrentWork && hasSegment && hasArchetype
    }) || []

    console.log(`Found ${validProfiles.length} profiles with complete data:`)
    
    const profileSummary = validProfiles.map(profile => {
      const keyData = profile.user_dashboard?.key_data || {}
      return {
        user_id: profile.user_id,
        display_name: profile.display_name,
        archetype: profile.archetype,
        current_work: keyData.current_work,
        segment: keyData.segment,
        legacy: keyData.legacy || 'N/A'
      }
    })

    console.log('Complete profiles:', JSON.stringify(profileSummary, null, 2))

    // Verificar conteúdo do Dia 1 para estes perfis
    const userIds = validProfiles.map(p => p.user_id)
    
    const { data: day1Content, error: contentError } = await supabase
      .from('user_daily_content')
      .select('user_id, day, title, content_card')
      .in('user_id', userIds)
      .eq('day', 1)

    if (contentError) {
      console.error('Error fetching day 1 content:', contentError)
      throw contentError
    }

    console.log(`Found day 1 content for ${day1Content?.length || 0} complete profiles`)

    // Verificar gerações de personalização existentes
    const { data: generations, error: genError } = await supabase
      .from('user_content_generations')
      .select('user_id, day, generation_level, is_active, created_at')
      .in('user_id', userIds)
      .eq('day', 1)
      .order('created_at', { ascending: false })

    if (genError) {
      console.error('Error fetching generations:', genError)
      throw genError
    }

    console.log(`Found ${generations?.length || 0} existing generations for complete profiles`)

    // Compilar relatório detalhado
    const detailedReport = validProfiles.map(profile => {
      const userContent = day1Content?.find(c => c.user_id === profile.user_id)
      const userGenerations = generations?.filter(g => g.user_id === profile.user_id) || []
      const activeGeneration = userGenerations.find(g => g.is_active)
      
      return {
        user_id: profile.user_id,
        display_name: profile.display_name,
        archetype: profile.archetype,
        profile_data: {
          current_work: profile.user_dashboard?.key_data?.current_work,
          segment: profile.user_dashboard?.key_data?.segment,
          legacy: profile.user_dashboard?.key_data?.legacy
        },
        day1_content: {
          has_content: !!userContent,
          title: userContent?.title,
          content_card_keys: userContent?.content_card ? Object.keys(userContent.content_card) : []
        },
        personalizations: {
          total_generations: userGenerations.length,
          active_generation: activeGeneration ? {
            level: activeGeneration.generation_level,
            created_at: activeGeneration.created_at
          } : null,
          all_levels: userGenerations.map(g => ({
            level: g.generation_level,
            is_active: g.is_active,
            created_at: g.created_at
          }))
        }
      }
    })

    console.log('Detailed report for complete profiles:', JSON.stringify(detailedReport, null, 2))

    return new Response(
      JSON.stringify({
        success: true,
        summary: {
          total_profiles_checked: completeProfiles?.length || 0,
          complete_profiles_found: validProfiles.length,
          profiles_with_day1_content: day1Content?.length || 0,
          total_personalizations: generations?.length || 0
        },
        complete_profiles: profileSummary,
        detailed_report: detailedReport,
        recommendations: {
          ready_for_personalization: detailedReport.filter(p => p.day1_content.has_content && p.personalizations.total_generations === 0),
          already_personalized: detailedReport.filter(p => p.personalizations.total_generations > 0),
          missing_content: detailedReport.filter(p => !p.day1_content.has_content)
        }
      }),
      { headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    )

  } catch (error) {
    console.error('Error in test-complete-profiles function:', error)
    return new Response(
      JSON.stringify({ 
        error: error.message,
        success: false 
      }),
      { status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    )
  }
})
