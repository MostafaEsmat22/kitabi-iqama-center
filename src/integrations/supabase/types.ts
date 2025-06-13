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
      assignment_submissions: {
        Row: {
          assignment_id: string | null
          attachments: string[] | null
          feedback: string | null
          graded_at: string | null
          graded_by: string | null
          id: string
          score: number | null
          student_id: string | null
          submission_text: string | null
          submitted_at: string | null
        }
        Insert: {
          assignment_id?: string | null
          attachments?: string[] | null
          feedback?: string | null
          graded_at?: string | null
          graded_by?: string | null
          id?: string
          score?: number | null
          student_id?: string | null
          submission_text?: string | null
          submitted_at?: string | null
        }
        Update: {
          assignment_id?: string | null
          attachments?: string[] | null
          feedback?: string | null
          graded_at?: string | null
          graded_by?: string | null
          id?: string
          score?: number | null
          student_id?: string | null
          submission_text?: string | null
          submitted_at?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "assignment_submissions_assignment_id_fkey"
            columns: ["assignment_id"]
            isOneToOne: false
            referencedRelation: "assignments"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "assignment_submissions_graded_by_fkey"
            columns: ["graded_by"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "assignment_submissions_student_id_fkey"
            columns: ["student_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      assignments: {
        Row: {
          attachments: string[] | null
          course_id: string | null
          created_at: string | null
          description: string | null
          due_date: string
          id: string
          instructions: string | null
          max_score: number | null
          title: string
        }
        Insert: {
          attachments?: string[] | null
          course_id?: string | null
          created_at?: string | null
          description?: string | null
          due_date: string
          id?: string
          instructions?: string | null
          max_score?: number | null
          title: string
        }
        Update: {
          attachments?: string[] | null
          course_id?: string | null
          created_at?: string | null
          description?: string | null
          due_date?: string
          id?: string
          instructions?: string | null
          max_score?: number | null
          title?: string
        }
        Relationships: [
          {
            foreignKeyName: "assignments_course_id_fkey"
            columns: ["course_id"]
            isOneToOne: false
            referencedRelation: "courses"
            referencedColumns: ["id"]
          },
        ]
      }
      attendance: {
        Row: {
          attended_at: string | null
          id: string
          notes: string | null
          session_id: string | null
          status: Database["public"]["Enums"]["attendance_status"] | null
          student_id: string | null
        }
        Insert: {
          attended_at?: string | null
          id?: string
          notes?: string | null
          session_id?: string | null
          status?: Database["public"]["Enums"]["attendance_status"] | null
          student_id?: string | null
        }
        Update: {
          attended_at?: string | null
          id?: string
          notes?: string | null
          session_id?: string | null
          status?: Database["public"]["Enums"]["attendance_status"] | null
          student_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "attendance_session_id_fkey"
            columns: ["session_id"]
            isOneToOne: false
            referencedRelation: "sessions"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "attendance_student_id_fkey"
            columns: ["student_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      certificates: {
        Row: {
          certificate_number: string
          certificate_url: string | null
          course_id: string | null
          created_at: string | null
          grade: number | null
          id: string
          issued_date: string | null
          student_id: string | null
        }
        Insert: {
          certificate_number: string
          certificate_url?: string | null
          course_id?: string | null
          created_at?: string | null
          grade?: number | null
          id?: string
          issued_date?: string | null
          student_id?: string | null
        }
        Update: {
          certificate_number?: string
          certificate_url?: string | null
          course_id?: string | null
          created_at?: string | null
          grade?: number | null
          id?: string
          issued_date?: string | null
          student_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "certificates_course_id_fkey"
            columns: ["course_id"]
            isOneToOne: false
            referencedRelation: "courses"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "certificates_student_id_fkey"
            columns: ["student_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      courses: {
        Row: {
          created_at: string | null
          description: string | null
          duration_weeks: number
          end_date: string
          id: string
          instructor_id: string | null
          max_students: number | null
          price: number | null
          requirements: string[] | null
          start_date: string
          status: Database["public"]["Enums"]["course_status"] | null
          syllabus: string | null
          title: string
          updated_at: string | null
        }
        Insert: {
          created_at?: string | null
          description?: string | null
          duration_weeks: number
          end_date: string
          id?: string
          instructor_id?: string | null
          max_students?: number | null
          price?: number | null
          requirements?: string[] | null
          start_date: string
          status?: Database["public"]["Enums"]["course_status"] | null
          syllabus?: string | null
          title: string
          updated_at?: string | null
        }
        Update: {
          created_at?: string | null
          description?: string | null
          duration_weeks?: number
          end_date?: string
          id?: string
          instructor_id?: string | null
          max_students?: number | null
          price?: number | null
          requirements?: string[] | null
          start_date?: string
          status?: Database["public"]["Enums"]["course_status"] | null
          syllabus?: string | null
          title?: string
          updated_at?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "courses_instructor_id_fkey"
            columns: ["instructor_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      enrollments: {
        Row: {
          completion_date: string | null
          course_id: string | null
          enrollment_date: string | null
          grade: number | null
          id: string
          notes: string | null
          status: Database["public"]["Enums"]["enrollment_status"] | null
          student_id: string | null
        }
        Insert: {
          completion_date?: string | null
          course_id?: string | null
          enrollment_date?: string | null
          grade?: number | null
          id?: string
          notes?: string | null
          status?: Database["public"]["Enums"]["enrollment_status"] | null
          student_id?: string | null
        }
        Update: {
          completion_date?: string | null
          course_id?: string | null
          enrollment_date?: string | null
          grade?: number | null
          id?: string
          notes?: string | null
          status?: Database["public"]["Enums"]["enrollment_status"] | null
          student_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "enrollments_course_id_fkey"
            columns: ["course_id"]
            isOneToOne: false
            referencedRelation: "courses"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "enrollments_student_id_fkey"
            columns: ["student_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      messages: {
        Row: {
          attachments: string[] | null
          content: string
          created_at: string | null
          id: string
          is_read: boolean | null
          parent_message_id: string | null
          receiver_id: string | null
          sender_id: string | null
          subject: string
        }
        Insert: {
          attachments?: string[] | null
          content: string
          created_at?: string | null
          id?: string
          is_read?: boolean | null
          parent_message_id?: string | null
          receiver_id?: string | null
          sender_id?: string | null
          subject: string
        }
        Update: {
          attachments?: string[] | null
          content?: string
          created_at?: string | null
          id?: string
          is_read?: boolean | null
          parent_message_id?: string | null
          receiver_id?: string | null
          sender_id?: string | null
          subject?: string
        }
        Relationships: [
          {
            foreignKeyName: "messages_parent_message_id_fkey"
            columns: ["parent_message_id"]
            isOneToOne: false
            referencedRelation: "messages"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "messages_receiver_id_fkey"
            columns: ["receiver_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "messages_sender_id_fkey"
            columns: ["sender_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      notifications: {
        Row: {
          content: string
          created_at: string | null
          id: string
          is_read: boolean | null
          metadata: Json | null
          title: string
          type: string
          user_id: string | null
        }
        Insert: {
          content: string
          created_at?: string | null
          id?: string
          is_read?: boolean | null
          metadata?: Json | null
          title: string
          type: string
          user_id?: string | null
        }
        Update: {
          content?: string
          created_at?: string | null
          id?: string
          is_read?: boolean | null
          metadata?: Json | null
          title?: string
          type?: string
          user_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "notifications_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      profiles: {
        Row: {
          address: string | null
          avatar_url: string | null
          created_at: string | null
          date_of_birth: string | null
          full_name: string
          id: string
          phone: string | null
          role: Database["public"]["Enums"]["user_role"]
          updated_at: string | null
        }
        Insert: {
          address?: string | null
          avatar_url?: string | null
          created_at?: string | null
          date_of_birth?: string | null
          full_name: string
          id: string
          phone?: string | null
          role?: Database["public"]["Enums"]["user_role"]
          updated_at?: string | null
        }
        Update: {
          address?: string | null
          avatar_url?: string | null
          created_at?: string | null
          date_of_birth?: string | null
          full_name?: string
          id?: string
          phone?: string | null
          role?: Database["public"]["Enums"]["user_role"]
          updated_at?: string | null
        }
        Relationships: []
      }
      sessions: {
        Row: {
          course_id: string | null
          created_at: string | null
          description: string | null
          duration_minutes: number | null
          id: string
          materials: string[] | null
          meeting_link: string | null
          recording_link: string | null
          session_date: string
          title: string
        }
        Insert: {
          course_id?: string | null
          created_at?: string | null
          description?: string | null
          duration_minutes?: number | null
          id?: string
          materials?: string[] | null
          meeting_link?: string | null
          recording_link?: string | null
          session_date: string
          title: string
        }
        Update: {
          course_id?: string | null
          created_at?: string | null
          description?: string | null
          duration_minutes?: number | null
          id?: string
          materials?: string[] | null
          meeting_link?: string | null
          recording_link?: string | null
          session_date?: string
          title?: string
        }
        Relationships: [
          {
            foreignKeyName: "sessions_course_id_fkey"
            columns: ["course_id"]
            isOneToOne: false
            referencedRelation: "courses"
            referencedColumns: ["id"]
          },
        ]
      }
      transactions: {
        Row: {
          amount: number
          completed_at: string | null
          course_id: string | null
          created_at: string | null
          description: string | null
          id: string
          payment_method: string | null
          status: Database["public"]["Enums"]["transaction_status"] | null
          transaction_reference: string | null
          type: Database["public"]["Enums"]["transaction_type"]
          user_id: string | null
        }
        Insert: {
          amount: number
          completed_at?: string | null
          course_id?: string | null
          created_at?: string | null
          description?: string | null
          id?: string
          payment_method?: string | null
          status?: Database["public"]["Enums"]["transaction_status"] | null
          transaction_reference?: string | null
          type: Database["public"]["Enums"]["transaction_type"]
          user_id?: string | null
        }
        Update: {
          amount?: number
          completed_at?: string | null
          course_id?: string | null
          created_at?: string | null
          description?: string | null
          id?: string
          payment_method?: string | null
          status?: Database["public"]["Enums"]["transaction_status"] | null
          transaction_reference?: string | null
          type?: Database["public"]["Enums"]["transaction_type"]
          user_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "transactions_course_id_fkey"
            columns: ["course_id"]
            isOneToOne: false
            referencedRelation: "courses"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "transactions_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
        ]
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      get_course_details_with_stats: {
        Args: { course_uuid: string; user_uuid: string }
        Returns: Json
      }
      get_student_course_progress: {
        Args: { course_uuid: string; student_uuid: string }
        Returns: Json
      }
      get_student_stats: {
        Args: { student_uuid: string }
        Returns: Json
      }
      has_role: {
        Args: {
          _user_id: string
          _role: Database["public"]["Enums"]["user_role"]
        }
        Returns: boolean
      }
    }
    Enums: {
      attendance_status: "present" | "absent" | "late"
      course_status: "active" | "completed" | "cancelled"
      enrollment_status: "pending" | "approved" | "rejected" | "completed"
      transaction_status: "pending" | "completed" | "failed"
      transaction_type: "payment" | "refund" | "scholarship"
      user_role: "admin" | "teacher" | "student"
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
    Enums: {
      attendance_status: ["present", "absent", "late"],
      course_status: ["active", "completed", "cancelled"],
      enrollment_status: ["pending", "approved", "rejected", "completed"],
      transaction_status: ["pending", "completed", "failed"],
      transaction_type: ["payment", "refund", "scholarship"],
      user_role: ["admin", "teacher", "student"],
    },
  },
} as const
