export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type Database = {
  public: {
    Tables: {
      content_templates: {
        Row: {
          content_structure: Json
          created_at: string | null
          examples: Json | null
          format: string
          id: string
          intentions: string[]
          key_elements: Json | null
          platforms: string[]
          reference_link: string | null
          roteiro_number: number | null
          title: string
          updated_at: string | null
          variations: string[] | null
        }
        Insert: {
          content_structure: Json
          created_at?: string | null
          examples?: Json | null
          format: string
          id?: string
          intentions: string[]
          key_elements?: Json | null
          platforms: string[]
          reference_link?: string | null
          roteiro_number?: number | null
          title: string
          updated_at?: string | null
          variations?: string[] | null
        }
        Update: {
          content_structure?: Json
          created_at?: string | null
          examples?: Json | null
          format?: string
          id?: string
          intentions?: string[]
          key_elements?: Json | null
          platforms?: string[]
          reference_link?: string | null
          roteiro_number?: number | null
          title?: string
          updated_at?: string | null
          variations?: string[] | null
        }
        Relationships: []
      }
      profiles: {
        Row: {
          archetype: string | null
          avatar_url: string | null
          created_at: string
          display_name: string
          focus: string | null
          id: string
          student_name: string
          subtitle: string | null
          title: string | null
          updated_at: string
          user_id: string
        }
        Insert: {
          archetype?: string | null
          avatar_url?: string | null
          created_at?: string
          display_name: string
          focus?: string | null
          id?: string
          student_name: string
          subtitle?: string | null
          title?: string | null
          updated_at?: string
          user_id: string
        }
        Update: {
          archetype?: string | null
          avatar_url?: string | null
          created_at?: string
          display_name?: string
          focus?: string | null
          id?: string
          student_name?: string
          subtitle?: string | null
          title?: string | null
          updated_at?: string
          user_id?: string
        }
        Relationships: []
      }
      prompts: {
        Row: {
          category: string
          created_at: string | null
          description: string | null
          id: string
          is_active: boolean | null
          model_config: Json | null
          name: string
          output_format: Json | null
          prompt_template: string
          updated_at: string | null
          variables: Json | null
        }
        Insert: {
          category: string
          created_at?: string | null
          description?: string | null
          id?: string
          is_active?: boolean | null
          model_config?: Json | null
          name: string
          output_format?: Json | null
          prompt_template: string
          updated_at?: string | null
          variables?: Json | null
        }
        Update: {
          category?: string
          created_at?: string | null
          description?: string | null
          id?: string
          is_active?: boolean | null
          model_config?: Json | null
          name?: string
          output_format?: Json | null
          prompt_template?: string
          updated_at?: string | null
          variables?: Json | null
        }
        Relationships: []
      }
      user_activities: {
        Row: {
          completed: boolean | null
          completed_at: string | null
          created_at: string
          day: number
          description: string | null
          difficulty: string | null
          id: string
          personalized: boolean | null
          platform: string
          time: string | null
          title: string
          updated_at: string
          user_id: string
        }
        Insert: {
          completed?: boolean | null
          completed_at?: string | null
          created_at?: string
          day: number
          description?: string | null
          difficulty?: string | null
          id?: string
          personalized?: boolean | null
          platform: string
          time?: string | null
          title: string
          updated_at?: string
          user_id: string
        }
        Update: {
          completed?: boolean | null
          completed_at?: string | null
          created_at?: string
          day?: number
          description?: string | null
          difficulty?: string | null
          id?: string
          personalized?: boolean | null
          platform?: string
          time?: string | null
          title?: string
          updated_at?: string
          user_id?: string
        }
        Relationships: []
      }
      user_daily_content: {
        Row: {
          audio_suggestion: string | null
          caption_description: string | null
          content_card: Json | null
          content_type: string
          created_at: string
          cta_text: string | null
          day: number
          hashtags: string | null
          id: string
          scenes: Json | null
          slides: Json | null
          strategic_analysis: string | null
          title: string
          updated_at: string
          user_id: string
          video_structure: Json | null
        }
        Insert: {
          audio_suggestion?: string | null
          caption_description?: string | null
          content_card?: Json | null
          content_type: string
          created_at?: string
          cta_text?: string | null
          day: number
          hashtags?: string | null
          id?: string
          scenes?: Json | null
          slides?: Json | null
          strategic_analysis?: string | null
          title: string
          updated_at?: string
          user_id: string
          video_structure?: Json | null
        }
        Update: {
          audio_suggestion?: string | null
          caption_description?: string | null
          content_card?: Json | null
          content_type?: string
          created_at?: string
          cta_text?: string | null
          day?: number
          hashtags?: string | null
          id?: string
          scenes?: Json | null
          slides?: Json | null
          strategic_analysis?: string | null
          title?: string
          updated_at?: string
          user_id?: string
          video_structure?: Json | null
        }
        Relationships: []
      }
      user_dashboard: {
        Row: {
          colors: Json | null
          context_text: string | null
          created_at: string
          id: string
          instructions_text: string | null
          key_data: Json | null
          motivation_quote: string | null
          platform_strategy: Json | null
          profile_highlights: Json | null
          sample_activities: Json | null
          scores: Json | null
          strategy_text: string | null
          updated_at: string
          user_id: string
        }
        Insert: {
          colors?: Json | null
          context_text?: string | null
          created_at?: string
          id?: string
          instructions_text?: string | null
          key_data?: Json | null
          motivation_quote?: string | null
          platform_strategy?: Json | null
          profile_highlights?: Json | null
          sample_activities?: Json | null
          scores?: Json | null
          strategy_text?: string | null
          updated_at?: string
          user_id: string
        }
        Update: {
          colors?: Json | null
          context_text?: string | null
          created_at?: string
          id?: string
          instructions_text?: string | null
          key_data?: Json | null
          motivation_quote?: string | null
          platform_strategy?: Json | null
          profile_highlights?: Json | null
          sample_activities?: Json | null
          scores?: Json | null
          strategy_text?: string | null
          updated_at?: string
          user_id?: string
        }
        Relationships: []
      }
      user_tasks: {
        Row: {
          completed: boolean | null
          completed_at: string | null
          created_at: string
          day: number
          description: string | null
          difficulty: string | null
          id: string
          platform: string | null
          time: string | null
          title: string
          type: string | null
          updated_at: string
          user_id: string
        }
        Insert: {
          completed?: boolean | null
          completed_at?: string | null
          created_at?: string
          day: number
          description?: string | null
          difficulty?: string | null
          id?: string
          platform?: string | null
          time?: string | null
          title: string
          type?: string | null
          updated_at?: string
          user_id: string
        }
        Update: {
          completed?: boolean | null
          completed_at?: string | null
          created_at?: string
          day?: number
          description?: string | null
          difficulty?: string | null
          id?: string
          platform?: string | null
          time?: string | null
          title?: string
          type?: string | null
          updated_at?: string
          user_id?: string
        }
        Relationships: []
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      [_ in never]: never
    }
    Enums: {
      [_ in never]: never
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}

type DefaultSchema = Database[Extract<keyof Database, "public">]

export type Tables<
  DefaultSchemaTableNameOrOptions extends
    | keyof (DefaultSchema["Tables"] & DefaultSchema["Views"])
    | { schema: keyof Database },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof (Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
        Database[DefaultSchemaTableNameOrOptions["schema"]]["Views"])
    : never = never,
> = DefaultSchemaTableNameOrOptions extends { schema: keyof Database }
  ? (Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
      Database[DefaultSchemaTableNameOrOptions["schema"]]["Views"])[TableName] extends {
      Row: infer R
    }
    ? R
    : never
  : DefaultSchemaTableNameOrOptions extends keyof (DefaultSchema["Tables"] &
        DefaultSchema["Views"])
    ? (DefaultSchema["Tables"] &
        DefaultSchema["Views"])[DefaultSchemaTableNameOrOptions] extends {
        Row: infer R
      }
      ? R
      : never
    : never

export type TablesInsert<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof Database },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends { schema: keyof Database }
  ? Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Insert: infer I
    }
    ? I
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Insert: infer I
      }
      ? I
      : never
    : never

export type TablesUpdate<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof Database },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends { schema: keyof Database }
  ? Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Update: infer U
    }
    ? U
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Update: infer U
      }
      ? U
      : never
    : never

export type Enums<
  DefaultSchemaEnumNameOrOptions extends
    | keyof DefaultSchema["Enums"]
    | { schema: keyof Database },
  EnumName extends DefaultSchemaEnumNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"]
    : never = never,
> = DefaultSchemaEnumNameOrOptions extends { schema: keyof Database }
  ? Database[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : DefaultSchemaEnumNameOrOptions extends keyof DefaultSchema["Enums"]
    ? DefaultSchema["Enums"][DefaultSchemaEnumNameOrOptions]
    : never

export type CompositeTypes<
  PublicCompositeTypeNameOrOptions extends
    | keyof DefaultSchema["CompositeTypes"]
    | { schema: keyof Database },
  CompositeTypeName extends PublicCompositeTypeNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"]
    : never = never,
> = PublicCompositeTypeNameOrOptions extends { schema: keyof Database }
  ? Database[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"][CompositeTypeName]
  : PublicCompositeTypeNameOrOptions extends keyof DefaultSchema["CompositeTypes"]
    ? DefaultSchema["CompositeTypes"][PublicCompositeTypeNameOrOptions]
    : never

export const Constants = {
  public: {
    Enums: {},
  },
} as const
