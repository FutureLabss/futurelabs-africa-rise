export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type Database = {
  // Allows to automatically instantiate createClient with right options
  // instead of createClient<Database, { PostgrestVersion: 'XX' }>(URL, KEY)
  __InternalSupabase: {
    PostgrestVersion: "14.5"
  }
  public: {
    Tables: {
      events: {
        Row: {
          capacity: number | null
          created_at: string
          created_by: string | null
          description: string | null
          end_time: string | null
          featured: boolean
          id: string
          image_url: string | null
          location_details: string | null
          location_type: Database["public"]["Enums"]["location_type"]
          slug: string
          start_time: string
          title: string
          updated_at: string
        }
        Insert: {
          capacity?: number | null
          created_at?: string
          created_by?: string | null
          description?: string | null
          end_time?: string | null
          featured?: boolean
          id?: string
          image_url?: string | null
          location_details?: string | null
          location_type?: Database["public"]["Enums"]["location_type"]
          slug: string
          start_time: string
          title: string
          updated_at?: string
        }
        Update: {
          capacity?: number | null
          created_at?: string
          created_by?: string | null
          description?: string | null
          end_time?: string | null
          featured?: boolean
          id?: string
          image_url?: string | null
          location_details?: string | null
          location_type?: Database["public"]["Enums"]["location_type"]
          slug?: string
          start_time?: string
          title?: string
          updated_at?: string
        }
        Relationships: []
      }
      hackathon_submissions: {
        Row: {
          created_at: string
          demo_url: string | null
          description: string
          github_url: string | null
          id: string
          tagline: string
          tech_stack: string[]
          title: string
        }
        Insert: {
          created_at?: string
          demo_url?: string | null
          description: string
          github_url?: string | null
          id?: string
          tagline: string
          tech_stack?: string[]
          title: string
        }
        Update: {
          created_at?: string
          demo_url?: string | null
          description?: string
          github_url?: string | null
          id?: string
          tagline?: string
          tech_stack?: string[]
          title?: string
        }
        Relationships: []
      }
      profiles: {
        Row: {
          avatar_url: string | null
          created_at: string
          full_name: string | null
          id: string
          updated_at: string
          user_id: string
        }
        Insert: {
          avatar_url?: string | null
          created_at?: string
          full_name?: string | null
          id?: string
          updated_at?: string
          user_id: string
        }
        Update: {
          avatar_url?: string | null
          created_at?: string
          full_name?: string | null
          id?: string
          updated_at?: string
          user_id?: string
        }
        Relationships: []
      }
      registrations: {
        Row: {
          check_in_token: string
          created_at: string
          email: string
          event_id: string
          full_name: string
          id: string
          phone: string | null
          status: Database["public"]["Enums"]["registration_status"]
          updated_at: string
        }
        Insert: {
          check_in_token?: string
          created_at?: string
          email: string
          event_id: string
          full_name: string
          id?: string
          phone?: string | null
          status?: Database["public"]["Enums"]["registration_status"]
          updated_at?: string
        }
        Update: {
          check_in_token?: string
          created_at?: string
          email?: string
          event_id?: string
          full_name?: string
          id?: string
          phone?: string | null
          status?: Database["public"]["Enums"]["registration_status"]
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "registrations_event_id_fkey"
            columns: ["event_id"]
            isOneToOne: false
            referencedRelation: "events"
            referencedColumns: ["id"]
          },
        ]
      }
      tutor_applications: {
        Row: {
          availability: string
          certifications: string[]
          certifications_other: string | null
          consent: boolean
          created_at: string
          current_employer: string
          current_job_title: string
          cyber_years: number
          degree_field: string
          email: string
          full_name: string
          id: string
          linkedin_url: string | null
          location: string
          notable_work: string | null
          phone: string
          portfolio_url: string | null
          preferred_format: string
          rate_expectations: string | null
          reference_contact: string
          reference_name: string
          resume_url: string
          specializations: string[]
          specializations_other: string | null
          status: Database["public"]["Enums"]["tutor_application_status"]
          teaching_levels: string[]
          teaching_motivation: string
          teaching_years: number
          updated_at: string
        }
        Insert: {
          availability: string
          certifications?: string[]
          certifications_other?: string | null
          consent?: boolean
          created_at?: string
          current_employer: string
          current_job_title: string
          cyber_years: number
          degree_field: string
          email: string
          full_name: string
          id?: string
          linkedin_url?: string | null
          location: string
          notable_work?: string | null
          phone: string
          portfolio_url?: string | null
          preferred_format: string
          rate_expectations?: string | null
          reference_contact: string
          reference_name: string
          resume_url: string
          specializations?: string[]
          specializations_other?: string | null
          status?: Database["public"]["Enums"]["tutor_application_status"]
          teaching_levels?: string[]
          teaching_motivation: string
          teaching_years: number
          updated_at?: string
        }
        Update: {
          availability?: string
          certifications?: string[]
          certifications_other?: string | null
          consent?: boolean
          created_at?: string
          current_employer?: string
          current_job_title?: string
          cyber_years?: number
          degree_field?: string
          email?: string
          full_name?: string
          id?: string
          linkedin_url?: string | null
          location?: string
          notable_work?: string | null
          phone?: string
          portfolio_url?: string | null
          preferred_format?: string
          rate_expectations?: string | null
          reference_contact?: string
          reference_name?: string
          resume_url?: string
          specializations?: string[]
          specializations_other?: string | null
          status?: Database["public"]["Enums"]["tutor_application_status"]
          teaching_levels?: string[]
          teaching_motivation?: string
          teaching_years?: number
          updated_at?: string
        }
        Relationships: []
      }
      tutor_requests: {
        Row: {
          additional_notes: string | null
          budget_range: string | null
          consent: boolean
          contact_email: string
          contact_name: string
          contact_phone: string
          contact_role: string
          created_at: string
          current_certifications: string | null
          has_it_team: boolean
          id: string
          it_team_expertise: string | null
          it_team_size: number | null
          num_learners: number | null
          organisation_description: string
          organisation_name: string
          organisation_size: number | null
          organisation_type: string
          organisation_website: string | null
          past_incidents: boolean
          past_incidents_desc: string | null
          preferred_date: string | null
          referral_source: string
          security_maturity: string
          security_tools: string[]
          security_tools_other: string | null
          skill_level: string
          status: Database["public"]["Enums"]["tutor_request_status"]
          training_format: string
          training_location: string | null
          training_reason: string
          training_topics: string[]
          training_topics_other: string | null
          updated_at: string
        }
        Insert: {
          additional_notes?: string | null
          budget_range?: string | null
          consent?: boolean
          contact_email: string
          contact_name: string
          contact_phone: string
          contact_role: string
          created_at?: string
          current_certifications?: string | null
          has_it_team?: boolean
          id?: string
          it_team_expertise?: string | null
          it_team_size?: number | null
          num_learners?: number | null
          organisation_description: string
          organisation_name: string
          organisation_size?: number | null
          organisation_type: string
          organisation_website?: string | null
          past_incidents?: boolean
          past_incidents_desc?: string | null
          preferred_date?: string | null
          referral_source: string
          security_maturity: string
          security_tools?: string[]
          security_tools_other?: string | null
          skill_level: string
          status?: Database["public"]["Enums"]["tutor_request_status"]
          training_format: string
          training_location?: string | null
          training_reason: string
          training_topics?: string[]
          training_topics_other?: string | null
          updated_at?: string
        }
        Update: {
          additional_notes?: string | null
          budget_range?: string | null
          consent?: boolean
          contact_email?: string
          contact_name?: string
          contact_phone?: string
          contact_role?: string
          created_at?: string
          current_certifications?: string | null
          has_it_team?: boolean
          id?: string
          it_team_expertise?: string | null
          it_team_size?: number | null
          num_learners?: number | null
          organisation_description?: string
          organisation_name?: string
          organisation_size?: number | null
          organisation_type?: string
          organisation_website?: string | null
          past_incidents?: boolean
          past_incidents_desc?: string | null
          preferred_date?: string | null
          referral_source?: string
          security_maturity?: string
          security_tools?: string[]
          security_tools_other?: string | null
          skill_level?: string
          status?: Database["public"]["Enums"]["tutor_request_status"]
          training_format?: string
          training_location?: string | null
          training_reason?: string
          training_topics?: string[]
          training_topics_other?: string | null
          updated_at?: string
        }
        Relationships: []
      }
      user_roles: {
        Row: {
          created_at: string
          id: string
          role: Database["public"]["Enums"]["app_role"]
          user_id: string
        }
        Insert: {
          created_at?: string
          id?: string
          role: Database["public"]["Enums"]["app_role"]
          user_id: string
        }
        Update: {
          created_at?: string
          id?: string
          role?: Database["public"]["Enums"]["app_role"]
          user_id?: string
        }
        Relationships: []
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      get_event_attendee_avatars: {
        Args: { p_event_id: string }
        Returns: {
          email_hash: string
          initials: string
        }[]
      }
      get_registration_counts: {
        Args: { event_ids: string[] }
        Returns: {
          count: number
          event_id: string
        }[]
      }
      has_role: {
        Args: {
          _role: Database["public"]["Enums"]["app_role"]
          _user_id: string
        }
        Returns: boolean
      }
      is_admin: { Args: never; Returns: boolean }
    }
    Enums: {
      app_role: "admin" | "user"
      location_type: "in-person" | "virtual" | "hybrid"
      registration_status: "registered" | "cancelled" | "attended"
      tutor_application_status: "new" | "reviewing" | "accepted" | "rejected"
      tutor_request_status: "new" | "contacted" | "closed"
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}

type DatabaseWithoutInternals = Omit<Database, "__InternalSupabase">

type DefaultSchema = DatabaseWithoutInternals[Extract<keyof Database, "public">]

export type Tables<
  DefaultSchemaTableNameOrOptions extends
    | keyof (DefaultSchema["Tables"] & DefaultSchema["Views"])
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends (DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
        DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])
    : never) = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
      DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])[TableName] extends {
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
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends (DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never) = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
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
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends (DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never) = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
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
    | { schema: keyof DatabaseWithoutInternals },
  EnumName extends (DefaultSchemaEnumNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"]
    : never) = never,
> = DefaultSchemaEnumNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : DefaultSchemaEnumNameOrOptions extends keyof DefaultSchema["Enums"]
    ? DefaultSchema["Enums"][DefaultSchemaEnumNameOrOptions]
    : never

export type CompositeTypes<
  PublicCompositeTypeNameOrOptions extends
    | keyof DefaultSchema["CompositeTypes"]
    | { schema: keyof DatabaseWithoutInternals },
  CompositeTypeName extends (PublicCompositeTypeNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"]
    : never) = never,
> = PublicCompositeTypeNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"][CompositeTypeName]
  : PublicCompositeTypeNameOrOptions extends keyof DefaultSchema["CompositeTypes"]
    ? DefaultSchema["CompositeTypes"][PublicCompositeTypeNameOrOptions]
    : never

export const Constants = {
  public: {
    Enums: {
      app_role: ["admin", "user"],
      location_type: ["in-person", "virtual", "hybrid"],
      registration_status: ["registered", "cancelled", "attended"],
      tutor_application_status: ["new", "reviewing", "accepted", "rejected"],
      tutor_request_status: ["new", "contacted", "closed"],
    },
  },
} as const
