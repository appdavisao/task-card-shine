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
      action_plan_uploads: {
        Row: {
          file_name: string
          file_path: string
          file_size: number | null
          file_type: string
          id: string
          question_number: number
          uploaded_at: string
          user_id: string
        }
        Insert: {
          file_name: string
          file_path: string
          file_size?: number | null
          file_type: string
          id?: string
          question_number: number
          uploaded_at?: string
          user_id: string
        }
        Update: {
          file_name?: string
          file_path?: string
          file_size?: number | null
          file_type?: string
          id?: string
          question_number?: number
          uploaded_at?: string
          user_id?: string
        }
        Relationships: []
      }
      chat_conversations: {
        Row: {
          assistant_response: string
          context: Json | null
          conversation_id: string
          created_at: string
          id: string
          user_id: string
          user_message: string
        }
        Insert: {
          assistant_response: string
          context?: Json | null
          conversation_id: string
          created_at?: string
          id?: string
          user_id: string
          user_message: string
        }
        Update: {
          assistant_response?: string
          context?: Json | null
          conversation_id?: string
          created_at?: string
          id?: string
          user_id?: string
          user_message?: string
        }
        Relationships: []
      }
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
          email: string | null
          facebook: string | null
          focus: string | null
          id: string
          instagram: string | null
          linkedin: string | null
          location: string | null
          phone: string | null
          student_name: string
          subtitle: string | null
          tiktok: string | null
          title: string | null
          updated_at: string
          user_id: string
          website: string | null
          youtube: string | null
        }
        Insert: {
          archetype?: string | null
          avatar_url?: string | null
          created_at?: string
          display_name: string
          email?: string | null
          facebook?: string | null
          focus?: string | null
          id?: string
          instagram?: string | null
          linkedin?: string | null
          location?: string | null
          phone?: string | null
          student_name: string
          subtitle?: string | null
          tiktok?: string | null
          title?: string | null
          updated_at?: string
          user_id: string
          website?: string | null
          youtube?: string | null
        }
        Update: {
          archetype?: string | null
          avatar_url?: string | null
          created_at?: string
          display_name?: string
          email?: string | null
          facebook?: string | null
          focus?: string | null
          id?: string
          instagram?: string | null
          linkedin?: string | null
          location?: string | null
          phone?: string | null
          student_name?: string
          subtitle?: string | null
          tiktok?: string | null
          title?: string | null
          updated_at?: string
          user_id?: string
          website?: string | null
          youtube?: string | null
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
      user_contacts: {
        Row: {
          created_at: string | null
          display_name: string
          email: string
          facebook: string | null
          id: string
          instagram: string | null
          linkedin: string | null
          phone: string | null
          tiktok: string | null
          twitter: string | null
          updated_at: string | null
          user_id: string
          website: string | null
          youtube: string | null
        }
        Insert: {
          created_at?: string | null
          display_name: string
          email: string
          facebook?: string | null
          id?: string
          instagram?: string | null
          linkedin?: string | null
          phone?: string | null
          tiktok?: string | null
          twitter?: string | null
          updated_at?: string | null
          user_id: string
          website?: string | null
          youtube?: string | null
        }
        Update: {
          created_at?: string | null
          display_name?: string
          email?: string
          facebook?: string | null
          id?: string
          instagram?: string | null
          linkedin?: string | null
          phone?: string | null
          tiktok?: string | null
          twitter?: string | null
          updated_at?: string | null
          user_id?: string
          website?: string | null
          youtube?: string | null
        }
        Relationships: []
      }
      user_content_generations: {
        Row: {
          content_card: Json
          created_at: string
          day: number
          generation_level: number
          id: string
          is_active: boolean | null
          strategic_analysis: string | null
          updated_at: string
          user_id: string
        }
        Insert: {
          content_card: Json
          created_at?: string
          day: number
          generation_level?: number
          id?: string
          is_active?: boolean | null
          strategic_analysis?: string | null
          updated_at?: string
          user_id: string
        }
        Update: {
          content_card?: Json
          created_at?: string
          day?: number
          generation_level?: number
          id?: string
          is_active?: boolean | null
          strategic_analysis?: string | null
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
          enhanced_content_card: Json | null
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
          enhanced_content_card?: Json | null
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
          enhanced_content_card?: Json | null
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
      user_dashboard_backup: {
        Row: {
          backup_timestamp: string | null
          id: string
          modified_by: string | null
          original_instructions_text: string | null
          original_motivation_quote: string | null
          original_profile_highlights: Json | null
          original_strategy_text: string | null
          user_id: string
        }
        Insert: {
          backup_timestamp?: string | null
          id?: string
          modified_by?: string | null
          original_instructions_text?: string | null
          original_motivation_quote?: string | null
          original_profile_highlights?: Json | null
          original_strategy_text?: string | null
          user_id: string
        }
        Update: {
          backup_timestamp?: string | null
          id?: string
          modified_by?: string | null
          original_instructions_text?: string | null
          original_motivation_quote?: string | null
          original_profile_highlights?: Json | null
          original_strategy_text?: string | null
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
      generate_enhanced_content_card: {
        Args: { template_roteiro: number; user_archetype?: string }
        Returns: Json
      }
      gtrgm_compress: {
        Args: { "": unknown }
        Returns: unknown
      }
      gtrgm_decompress: {
        Args: { "": unknown }
        Returns: unknown
      }
      gtrgm_in: {
        Args: { "": unknown }
        Returns: unknown
      }
      gtrgm_options: {
        Args: { "": unknown }
        Returns: undefined
      }
      gtrgm_out: {
        Args: { "": unknown }
        Returns: unknown
      }
      set_limit: {
        Args: { "": number }
        Returns: number
      }
      show_limit: {
        Args: Record<PropertyKey, never>
        Returns: number
      }
      show_trgm: {
        Args: { "": string }
        Returns: string[]
      }
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
