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
      access_tokens: {
        Row: {
          access_token: string
          created_at: string | null
          expires_at: string | null
          provider: string
          type: string
          updated_at: string | null
          uuid: string
        }
        Insert: {
          access_token: string
          created_at?: string | null
          expires_at?: string | null
          provider: string
          type: string
          updated_at?: string | null
          uuid: string
        }
        Update: {
          access_token?: string
          created_at?: string | null
          expires_at?: string | null
          provider?: string
          type?: string
          updated_at?: string | null
          uuid?: string
        }
        Relationships: [
          {
            foreignKeyName: "access_tokens_uuid_fkey"
            columns: ["uuid"]
            isOneToOne: true
            referencedRelation: "users"
            referencedColumns: ["id"]
          },
        ]
      }
      ads: {
        Row: {
          ad_id: string | null
          created_at: string
          cuid: string | null
          data: Json | null
          euid: string | null
          id: string
          platform: Database["public"]["Enums"]["social_platforms"] | null
        }
        Insert: {
          ad_id?: string | null
          created_at?: string
          cuid?: string | null
          data?: Json | null
          euid?: string | null
          id?: string
          platform?: Database["public"]["Enums"]["social_platforms"] | null
        }
        Update: {
          ad_id?: string | null
          created_at?: string
          cuid?: string | null
          data?: Json | null
          euid?: string | null
          id?: string
          platform?: Database["public"]["Enums"]["social_platforms"] | null
        }
        Relationships: [
          {
            foreignKeyName: "ads_cuid_fkey"
            columns: ["cuid"]
            isOneToOne: false
            referencedRelation: "campaigns"
            referencedColumns: ["cuid"]
          },
          {
            foreignKeyName: "ads_euid_fkey"
            columns: ["euid"]
            isOneToOne: false
            referencedRelation: "entities"
            referencedColumns: ["euid"]
          },
        ]
      }
      audiences: {
        Row: {
          age: Json | null
          created_at: string
          euid: string | null
          gender: string | null
          id: string
          interests: Json | null
          lifetime_value: number | null
          location: Json | null
          method: Json | null
          name: string | null
          pain_points: Json | null
          text: string | null
        }
        Insert: {
          age?: Json | null
          created_at?: string
          euid?: string | null
          gender?: string | null
          id?: string
          interests?: Json | null
          lifetime_value?: number | null
          location?: Json | null
          method?: Json | null
          name?: string | null
          pain_points?: Json | null
          text?: string | null
        }
        Update: {
          age?: Json | null
          created_at?: string
          euid?: string | null
          gender?: string | null
          id?: string
          interests?: Json | null
          lifetime_value?: number | null
          location?: Json | null
          method?: Json | null
          name?: string | null
          pain_points?: Json | null
          text?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "entities_audience_euid_fkey"
            columns: ["euid"]
            isOneToOne: false
            referencedRelation: "entities"
            referencedColumns: ["euid"]
          },
        ]
      }
      campaigns: {
        Row: {
          created_at: string
          cuid: string
          euid: string | null
        }
        Insert: {
          created_at?: string
          cuid?: string
          euid?: string | null
        }
        Update: {
          created_at?: string
          cuid?: string
          euid?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "campaigns_euid_fkey"
            columns: ["euid"]
            isOneToOne: false
            referencedRelation: "entities"
            referencedColumns: ["euid"]
          },
        ]
      }
      currencies: {
        Row: {
          code: string
          created_at: string
          id: number
          name: string
          offset: number | null
        }
        Insert: {
          code: string
          created_at?: string
          id?: number
          name: string
          offset?: number | null
        }
        Update: {
          code?: string
          created_at?: string
          id?: number
          name?: string
          offset?: number | null
        }
        Relationships: []
      }
      entities: {
        Row: {
          addresses: Json | null
          categories: Json | null
          competitors: Json | null
          currency: number | null
          detailed_offering: string | null
          elevator_pitch: string | null
          email: string | null
          euid: string
          name: string
          phone: string | null
          service_areas: Json | null
          social_medias: Json | null
          tz: string | null
          website: string | null
        }
        Insert: {
          addresses?: Json | null
          categories?: Json | null
          competitors?: Json | null
          currency?: number | null
          detailed_offering?: string | null
          elevator_pitch?: string | null
          email?: string | null
          euid?: string
          name: string
          phone?: string | null
          service_areas?: Json | null
          social_medias?: Json | null
          tz?: string | null
          website?: string | null
        }
        Update: {
          addresses?: Json | null
          categories?: Json | null
          competitors?: Json | null
          currency?: number | null
          detailed_offering?: string | null
          elevator_pitch?: string | null
          email?: string | null
          euid?: string
          name?: string
          phone?: string | null
          service_areas?: Json | null
          social_medias?: Json | null
          tz?: string | null
          website?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "entities_currency_fkey"
            columns: ["currency"]
            isOneToOne: false
            referencedRelation: "currencies"
            referencedColumns: ["id"]
          },
        ]
      }
      entities_assets: {
        Row: {
          auid: string
          created_at: string
          euid: string
        }
        Insert: {
          auid: string
          created_at?: string
          euid: string
        }
        Update: {
          auid?: string
          created_at?: string
          euid?: string
        }
        Relationships: [
          {
            foreignKeyName: "entities_assets_auid_fkey"
            columns: ["auid"]
            isOneToOne: false
            referencedRelation: "user_assets"
            referencedColumns: ["auid"]
          },
          {
            foreignKeyName: "entities_assets_euid_fkey"
            columns: ["euid"]
            isOneToOne: false
            referencedRelation: "entities"
            referencedColumns: ["euid"]
          },
        ]
      }
      entities_offerings: {
        Row: {
          created_at: string
          description: string | null
          euid: string | null
          id: number
          images: Json | null
          name: string | null
          type: string | null
          url: string | null
        }
        Insert: {
          created_at?: string
          description?: string | null
          euid?: string | null
          id?: number
          images?: Json | null
          name?: string | null
          type?: string | null
          url?: string | null
        }
        Update: {
          created_at?: string
          description?: string | null
          euid?: string | null
          id?: number
          images?: Json | null
          name?: string | null
          type?: string | null
          url?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "entities_offerings_euid_fkey"
            columns: ["euid"]
            isOneToOne: false
            referencedRelation: "entities"
            referencedColumns: ["euid"]
          },
        ]
      }
      entities_profile: {
        Row: {
          euid: string
          permission_level: string | null
          uuid: string
        }
        Insert: {
          euid: string
          permission_level?: string | null
          uuid: string
        }
        Update: {
          euid?: string
          permission_level?: string | null
          uuid?: string
        }
        Relationships: [
          {
            foreignKeyName: "entities_profile_euid_fkey"
            columns: ["euid"]
            isOneToOne: false
            referencedRelation: "entities"
            referencedColumns: ["euid"]
          },
          {
            foreignKeyName: "entities_profile_uuid_fkey"
            columns: ["uuid"]
            isOneToOne: false
            referencedRelation: "user_profile"
            referencedColumns: ["uuid"]
          },
        ]
      }
      facebook_page_metrics: {
        Row: {
          created_at: string
          date: string
          id: string
          page_id: string
          page_likes: number | null
          page_views: number | null
        }
        Insert: {
          created_at?: string
          date: string
          id?: string
          page_id: string
          page_likes?: number | null
          page_views?: number | null
        }
        Update: {
          created_at?: string
          date?: string
          id?: string
          page_id?: string
          page_likes?: number | null
          page_views?: number | null
        }
        Relationships: []
      }
      insights: {
        Row: {
          auid: string | null
          created_at: string
          data: Json | null
          euid: string | null
          id: number
          platform: string | null
          type: string | null
        }
        Insert: {
          auid?: string | null
          created_at?: string
          data?: Json | null
          euid?: string | null
          id?: number
          platform?: string | null
          type?: string | null
        }
        Update: {
          auid?: string | null
          created_at?: string
          data?: Json | null
          euid?: string | null
          id?: number
          platform?: string | null
          type?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "insights_euid_fkey"
            columns: ["euid"]
            isOneToOne: false
            referencedRelation: "entities"
            referencedColumns: ["euid"]
          },
        ]
      }
      job_scheduler: {
        Row: {
          created_at: string
          description: string | null
          id: number
          name: string | null
          status: string | null
          type: string | null
        }
        Insert: {
          created_at?: string
          description?: string | null
          id?: number
          name?: string | null
          status?: string | null
          type?: string | null
        }
        Update: {
          created_at?: string
          description?: string | null
          id?: number
          name?: string | null
          status?: string | null
          type?: string | null
        }
        Relationships: []
      }
      timezone_facebook: {
        Row: {
          fb_tz: string
          iana_tz: string
          id: number
        }
        Insert: {
          fb_tz: string
          iana_tz: string
          id: number
        }
        Update: {
          fb_tz?: string
          iana_tz?: string
          id?: number
        }
        Relationships: []
      }
      user_assets: {
        Row: {
          asset_id: string
          auid: string
          created_at: string
          data: Json | null
          type: string
          updated_at: string
          uuid: string
        }
        Insert: {
          asset_id: string
          auid?: string
          created_at?: string
          data?: Json | null
          type: string
          updated_at?: string
          uuid: string
        }
        Update: {
          asset_id?: string
          auid?: string
          created_at?: string
          data?: Json | null
          type?: string
          updated_at?: string
          uuid?: string
        }
        Relationships: [
          {
            foreignKeyName: "user_assets_uuid_fkey"
            columns: ["uuid"]
            isOneToOne: false
            referencedRelation: "users"
            referencedColumns: ["id"]
          },
        ]
      }
      user_profile: {
        Row: {
          active_entity: string | null
          created_at: string
          onboarding_status: Database["public"]["Enums"]["onboarding_status"]
          profile_name: string | null
          uuid: string
        }
        Insert: {
          active_entity?: string | null
          created_at?: string
          onboarding_status?: Database["public"]["Enums"]["onboarding_status"]
          profile_name?: string | null
          uuid: string
        }
        Update: {
          active_entity?: string | null
          created_at?: string
          onboarding_status?: Database["public"]["Enums"]["onboarding_status"]
          profile_name?: string | null
          uuid?: string
        }
        Relationships: [
          {
            foreignKeyName: "user_profile_active_entity_fkey"
            columns: ["active_entity"]
            isOneToOne: false
            referencedRelation: "entities"
            referencedColumns: ["euid"]
          },
          {
            foreignKeyName: "user_profile_uuid_fkey"
            columns: ["uuid"]
            isOneToOne: true
            referencedRelation: "users"
            referencedColumns: ["id"]
          },
        ]
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      filter_user_assets_gpt: {
        Args: Record<PropertyKey, never>
        Returns: {
          uuid: string
          asset_id: string
          type: string
          data: Json
        }[]
      }
    }
    Enums: {
      onboarding_status: "not_started" | "started" | "completed"
      social_platforms: "facebook" | "google"
      user_status:
        | "active"
        | "suspended"
        | "payment_failed"
        | "pending_verification"
        | "inactive"
        | "paused"
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}

type PublicSchema = Database[Extract<keyof Database, "public">]

export type Tables<
  PublicTableNameOrOptions extends
    | keyof (PublicSchema["Tables"] & PublicSchema["Views"])
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof (Database[PublicTableNameOrOptions["schema"]]["Tables"] &
        Database[PublicTableNameOrOptions["schema"]]["Views"])
    : never = never,
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? (Database[PublicTableNameOrOptions["schema"]]["Tables"] &
      Database[PublicTableNameOrOptions["schema"]]["Views"])[TableName] extends {
      Row: infer R
    }
    ? R
    : never
  : PublicTableNameOrOptions extends keyof (PublicSchema["Tables"] &
        PublicSchema["Views"])
    ? (PublicSchema["Tables"] &
        PublicSchema["Views"])[PublicTableNameOrOptions] extends {
        Row: infer R
      }
      ? R
      : never
    : never

export type TablesInsert<
  PublicTableNameOrOptions extends
    | keyof PublicSchema["Tables"]
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? Database[PublicTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Insert: infer I
    }
    ? I
    : never
  : PublicTableNameOrOptions extends keyof PublicSchema["Tables"]
    ? PublicSchema["Tables"][PublicTableNameOrOptions] extends {
        Insert: infer I
      }
      ? I
      : never
    : never

export type TablesUpdate<
  PublicTableNameOrOptions extends
    | keyof PublicSchema["Tables"]
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? Database[PublicTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Update: infer U
    }
    ? U
    : never
  : PublicTableNameOrOptions extends keyof PublicSchema["Tables"]
    ? PublicSchema["Tables"][PublicTableNameOrOptions] extends {
        Update: infer U
      }
      ? U
      : never
    : never

export type Enums<
  PublicEnumNameOrOptions extends
    | keyof PublicSchema["Enums"]
    | { schema: keyof Database },
  EnumName extends PublicEnumNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicEnumNameOrOptions["schema"]]["Enums"]
    : never = never,
> = PublicEnumNameOrOptions extends { schema: keyof Database }
  ? Database[PublicEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : PublicEnumNameOrOptions extends keyof PublicSchema["Enums"]
    ? PublicSchema["Enums"][PublicEnumNameOrOptions]
    : never

