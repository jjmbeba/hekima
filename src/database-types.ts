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
      classes: {
        Row: {
          created_at: string
          id: number
          name: string
        }
        Insert: {
          created_at?: string
          id?: number
          name: string
        }
        Update: {
          created_at?: string
          id?: number
          name?: string
        }
        Relationships: []
      }
      events: {
        Row: {
          created_at: string
          date: string | Date
          description: string
          id: number
          location: string
          name: string
          type: Database["public"]["Enums"]["status"]
        }
        Insert: {
          created_at?: string
          date: string | Date
          description: string
          id?: number
          location: string
          name: string
          type: Database["public"]["Enums"]["status"]
        }
        Update: {
          created_at?: string
          date?: string | Date
          description?: string
          id?: number
          location?: string
          name?: string
          type?: Database["public"]["Enums"]["status"]
        }
        Relationships: []
      }
      exams: {
        Row: {
          created_at: string | Date
          date: string | Date
          examPeriod: Database["public"]["Enums"]["examPeriod"]
          examType: Database["public"]["Enums"]["examType"]
          grade: number
          id: number
          subject: string
        }
        Insert: {
          created_at?: string | Date
          date: string | Date
          examPeriod: Database["public"]["Enums"]["examPeriod"]
          examType: Database["public"]["Enums"]["examType"]
          grade: number
          id?: number
          subject: string
        }
        Update: {
          created_at?: string | Date
          date?: string | Date
          examPeriod?: Database["public"]["Enums"]["examPeriod"]
          examType?: Database["public"]["Enums"]["examType"]
          grade?: number
          id?: number
          subject?: string
        }
        Relationships: [
          {
            foreignKeyName: "exams_grade_fkey"
            columns: ["grade"]
            isOneToOne: false
            referencedRelation: "classes"
            referencedColumns: ["id"]
          },
        ]
      }
      profiles: {
        Row: {
          email: string
          first_name: string | null
          id: string
          is_admin: boolean
          last_name: string | null
          role: Database["public"]["Enums"]["role"]
        }
        Insert: {
          email: string
          first_name?: string | null
          id: string
          is_admin: boolean
          last_name?: string | null
          role: Database["public"]["Enums"]["role"]
        }
        Update: {
          email?: string
          first_name?: string | null
          id?: string
          is_admin?: boolean
          last_name?: string | null
          role?: Database["public"]["Enums"]["role"]
        }
        Relationships: [
          {
            foreignKeyName: "profiles_id_fkey"
            columns: ["id"]
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
      is_admin: {
        Args: {
          user_id: string
        }
        Returns: boolean
      }
    }
    Enums: {
      examPeriod: "first-term" | "second-term" | "third-term"
      examType: "opening-term" | "mid-term" | "end-term" | "cat-1" | "cat-2"
      role: "admin" | "teacher" | "parent"
      status: "mandatory" | "optional"
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
