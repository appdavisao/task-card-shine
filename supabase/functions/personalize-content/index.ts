import { serve } from "https://deno.land/std@0.168.0/http/server.ts"
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2.50.1'

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
}

serve(async (req) => {
  // Handle CORS preflight requests
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const supabase = createClient(
      Deno.env.get('SUPABASE_URL') ?? '',
      Deno.env.get('SUPABASE_SERVICE_ROLE_KEY') ?? ''
    )

    const { day, generation_level = 1 } = await req.json()
    
    // Get user from auth header
    const authHeader = req.headers.get('Authorization')!
    const token = authHeader.replace('Bearer ', '')
    const { data: { user } } = await supabase.auth.getUser(token)
    
    if (!user) {
      throw new Error('User not authenticated')
    }

    console.log(`Personalizing content for user ${user.id}, day ${day}, level ${generation_level}`)

    // Fetch user profile and dashboard data
    const [profileResult, dashboardResult, originalContentResult] = await Promise.all([
      supabase.from('profiles').select('*').eq('user_id', user.id).single(),
      supabase.from('user_dashboard').select('*').eq('user_id', user.id).single(),
      supabase.from('user_daily_content').select('*').eq('user_id', user.id).eq('day', day).single()
    ])

    const profile = profileResult.data
    const dashboard = dashboardResult.data
    const originalContent = originalContentResult.data

    if (!profile || !originalContent) {
      throw new Error('Required user data not found')
    }

    console.log('User profile:', profile)
    console.log('Dashboard data:', dashboard)

    // Generate personalized content based on user data
    const personalizedContent = await generatePersonalizedContent(
      originalContent,
      profile,
      dashboard,
      generation_level
    )

    // Store the new generation
    const { data: newGeneration, error: insertError } = await supabase
      .from('user_content_generations')
      .insert({
        user_id: user.id,
        day: day,
        generation_level: generation_level,
        content_card: personalizedContent.content_card,
        strategic_analysis: personalizedContent.strategic_analysis,
        is_active: true
      })
      .select()
      .single()

    if (insertError) {
      console.error('Error storing generation:', insertError)
      throw insertError
    }

    // Deactivate previous generations for this day
    await supabase
      .from('user_content_generations')
      .update({ is_active: false })
      .eq('user_id', user.id)
      .eq('day', day)
      .neq('id', newGeneration.id)

    console.log('Generated personalized content successfully')

    return new Response(
      JSON.stringify({
        success: true,
        generation: newGeneration,
        content_card: personalizedContent.content_card,
        strategic_analysis: personalizedContent.strategic_analysis
      }),
      { headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    )

  } catch (error) {
    console.error('Error in personalize-content function:', error)
    return new Response(
      JSON.stringify({ error: error.message }),
      { status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    )
  }
})

async function generatePersonalizedContent(originalContent: any, profile: any, dashboard: any, generationLevel: number) {
  const archetype = profile.archetype || 'entrepreneur'
  const keyData = dashboard?.key_data || {}
  const currentWork = keyData.current_work || profile.title || 'profissional'
  const legacy = keyData.legacy || 'impactar pessoas'
  const segment = keyData.segment || 'negócios'

  // Get base content card
  let contentCard = { ...originalContent.content_card }

  // Only personalize video structure (not strategic analysis)
  if (generationLevel >= 2) {
    // Enhanced personalization - Video Structure
    contentCard.video_structure = personalizeVideoStructure(contentCard.video_structure, profile, keyData, generationLevel)
  }

  if (generationLevel >= 3) {
    // Advanced personalization - Examples
    contentCard.examples = personalizeExamples(contentCard.examples, archetype, currentWork, segment)
  }

  // Generate strategic analysis for storage but don't apply it to the content card
  const strategicAnalysis = generateStrategicAnalysis(archetype, currentWork, segment, generationLevel)

  return {
    content_card: contentCard,
    strategic_analysis: strategicAnalysis
  }
}

function generateStrategicAnalysis(archetype: string, currentWork: string, segment: string, level: number): string {
  const baseAnalyses = {
    entrepreneur: [
      `Análise personalizada para ${currentWork}: Este formato é ideal para demonstrar vulnerabilidade autêntica e construir conexão com sua audiência empresarial.`,
      `Como ${currentWork} em ${segment}, este roteiro permite que você compartilhe lições valiosas extraídas de experiências reais do seu negócio, aumentando sua credibilidade.`,
      `Para empreendedor(a) como você, este formato humaniza sua marca pessoal e demonstra que sucessos e fracassos fazem parte da jornada empresarial.`
    ],
    coach: [
      `Análise personalizada para coach: Este formato permite demonstrar vulnerabilidade e crescimento pessoal, elementos essenciais para construir confiança com clientes.`,
      `Como profissional de desenvolvimento, usar este roteiro mostra que você também passa por desafios e cresce através deles.`,
      `Este formato é poderoso para coaches pois demonstra que a transformação é um processo contínuo, mesmo para quem ensina outros.`
    ],
    specialist: [
      `Análise personalizada para especialista: Este formato humaniza sua expertise e mostra que mesmo experts cometem erros e aprendem.`,
      `Como especialista em ${segment}, compartilhar vulnerabilidades aumenta sua autoridade ao mostrar humildade e capacidade de crescimento.`,
      `Este roteiro permite que você ensine através de experiências práticas, não apenas teoria.`
    ]
  }

  const analyses = baseAnalyses[archetype as keyof typeof baseAnalyses] || baseAnalyses.entrepreneur
  return analyses[Math.min(level - 1, analyses.length - 1)]
}

function personalizeVideoStructure(originalStructure: any, profile: any, keyData: any, level: number) {
  if (!originalStructure) return originalStructure

  const currentWork = keyData.current_work || profile.title || 'minha área'
  const personalizedStructure = { ...originalStructure }

  if (level >= 2) {
    // Personalize hook
    if (personalizedStructure.hook) {
      personalizedStructure.hook = personalizedStructure.hook.replace(
        '[ação]',
        getPersonalizedAction(keyData.segment || 'negócios')
      ).replace(
        '[situação ruim]',
        getPersonalizedSituation(profile.archetype || 'entrepreneur')
      )
    }

    // Personalize application section with cleaned work activities
    if (personalizedStructure.aplicacao) {
      const cleanedActivities = extractWorkActivities(currentWork)
      personalizedStructure.aplicacao = personalizedStructure.aplicacao.replace(
        /Se você atua em [^:]+:/,
        `Se você atua em ${cleanedActivities}:`
      )
    }
  }

  return personalizedStructure
}

function extractWorkActivities(currentWork: string): string {
  // Remove titles, company names, and clean up to extract core activities
  let cleaned = currentWork
    // Remove common titles and prefixes
    .replace(/^(CEO|Diretor|Gerente|Coordenador|Especialista|Consultor)\s+/gi, '')
    // Remove company names (anything with "GWL" or similar patterns)
    .replace(/\b[A-Z]{2,}\s+\w+/g, '')
    // Clean up extra spaces and separators
    .replace(/\s*,\s*/g, ', ')
    .replace(/\s+/g, ' ')
    .trim()

  // If the cleaned version is too short or empty, provide a fallback
  if (cleaned.length < 10) {
    return 'sua área de atuação'
  }

  return cleaned
}

function personalizeExamples(originalExamples: any, archetype: string, currentWork: string, segment: string) {
  if (!originalExamples) return originalExamples

  const personalizedExamples = { ...originalExamples }

  // Add personalized examples based on user's context
  const contextKey = getContextKey(segment)
  if (!personalizedExamples[contextKey]) {
    personalizedExamples[contextKey] = generateContextualExamples(archetype, currentWork, segment)
  }

  return personalizedExamples
}

function getPersonalizedAction(segment: string): string {
  const actions = {
    'eventos': 'cancelar um evento importante',
    'educação': 'reprovar um aluno injustamente',
    'saúde': 'diagnosticar incorretamente',
    'tecnologia': 'derrubar o sistema',
    'vendas': 'perder uma venda importante',
    'default': 'tomar uma decisão custosa'
  }
  return actions[segment.toLowerCase() as keyof typeof actions] || actions.default
}

function getPersonalizedSituation(archetype: string): string {
  const situations = {
    entrepreneur: 'que quase quebrou minha empresa',
    coach: 'que afetou meus clientes',
    specialist: 'que comprometeu minha reputação',
    default: 'que mudou tudo'
  }
  return situations[archetype as keyof typeof situations] || situations.default
}

function getContextKey(segment: string): string {
  const mapping = {
    'eventos': 'eventos',
    'educação': 'educacao',
    'saúde': 'saude',
    'tecnologia': 'tecnologia',
    'vendas': 'vendas',
    'turismo': 'turismo'
  }
  return mapping[segment.toLowerCase() as keyof typeof mapping] || 'empreendedorismo'
}

function generateContextualExamples(archetype: string, currentWork: string, segment: string) {
  return {
    tipo_1: `Acabei de perder um cliente importante por não entregar o que prometi em ${currentWork}`,
    tipo_2: `Acabei de cometer um erro que afetou toda minha equipe de ${segment}`,
    tipo_3: `Acabei de perceber que estava fazendo ${currentWork} da forma errada`,
    tipo_4: `Acabei de tomar uma decisão que quase encerrou meu trabalho em ${segment}`
  }
}
