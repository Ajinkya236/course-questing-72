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
      assessment_answers: {
        Row: {
          attempt_id: string
          created_at: string | null
          id: string
          is_correct: boolean | null
          question_id: string
          user_answer: string[] | null
        }
        Insert: {
          attempt_id: string
          created_at?: string | null
          id?: string
          is_correct?: boolean | null
          question_id: string
          user_answer?: string[] | null
        }
        Update: {
          attempt_id?: string
          created_at?: string | null
          id?: string
          is_correct?: boolean | null
          question_id?: string
          user_answer?: string[] | null
        }
        Relationships: [
          {
            foreignKeyName: "assessment_answers_attempt_id_fkey"
            columns: ["attempt_id"]
            isOneToOne: false
            referencedRelation: "assessment_attempts"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "assessment_answers_question_id_fkey"
            columns: ["question_id"]
            isOneToOne: false
            referencedRelation: "assessment_questions"
            referencedColumns: ["id"]
          },
        ]
      }
      assessment_attempts: {
        Row: {
          completed: boolean | null
          completed_at: string | null
          created_at: string | null
          id: string
          proficiency_after: number | null
          proficiency_before: number | null
          score: number | null
          skill_id: string
          user_id: string
        }
        Insert: {
          completed?: boolean | null
          completed_at?: string | null
          created_at?: string | null
          id?: string
          proficiency_after?: number | null
          proficiency_before?: number | null
          score?: number | null
          skill_id: string
          user_id: string
        }
        Update: {
          completed?: boolean | null
          completed_at?: string | null
          created_at?: string | null
          id?: string
          proficiency_after?: number | null
          proficiency_before?: number | null
          score?: number | null
          skill_id?: string
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "assessment_attempts_skill_id_fkey"
            columns: ["skill_id"]
            isOneToOne: false
            referencedRelation: "skills"
            referencedColumns: ["id"]
          },
        ]
      }
      assessment_questions: {
        Row: {
          correct_answer: string[] | null
          created_at: string | null
          difficulty: number
          explanation: string | null
          id: string
          options: Json | null
          question_text: string
          question_type: string
          skill_id: string
        }
        Insert: {
          correct_answer?: string[] | null
          created_at?: string | null
          difficulty: number
          explanation?: string | null
          id?: string
          options?: Json | null
          question_text: string
          question_type: string
          skill_id: string
        }
        Update: {
          correct_answer?: string[] | null
          created_at?: string | null
          difficulty?: number
          explanation?: string | null
          id?: string
          options?: Json | null
          question_text?: string
          question_type?: string
          skill_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "assessment_questions_skill_id_fkey"
            columns: ["skill_id"]
            isOneToOne: false
            referencedRelation: "skills"
            referencedColumns: ["id"]
          },
        ]
      }
      bookmarks: {
        Row: {
          course_id: string
          created_at: string
          id: string
          user_id: string
        }
        Insert: {
          course_id: string
          created_at?: string
          id?: string
          user_id: string
        }
        Update: {
          course_id?: string
          created_at?: string
          id?: string
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "bookmarks_course_id_fkey"
            columns: ["course_id"]
            isOneToOne: false
            referencedRelation: "courses"
            referencedColumns: ["id"]
          },
        ]
      }
      chat_messages: {
        Row: {
          content: string
          id: string
          metadata: Json | null
          notebook_id: string
          timestamp: string | null
          type: string
          user_id: string
        }
        Insert: {
          content: string
          id?: string
          metadata?: Json | null
          notebook_id: string
          timestamp?: string | null
          type: string
          user_id: string
        }
        Update: {
          content?: string
          id?: string
          metadata?: Json | null
          notebook_id?: string
          timestamp?: string | null
          type?: string
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "chat_messages_notebook_id_fkey"
            columns: ["notebook_id"]
            isOneToOne: false
            referencedRelation: "notebooks"
            referencedColumns: ["id"]
          },
        ]
      }
      course_progress: {
        Row: {
          completed_at: string | null
          course_id: string
          created_at: string
          id: string
          last_position_seconds: number | null
          progress: number | null
          updated_at: string
          user_id: string
        }
        Insert: {
          completed_at?: string | null
          course_id: string
          created_at?: string
          id?: string
          last_position_seconds?: number | null
          progress?: number | null
          updated_at?: string
          user_id: string
        }
        Update: {
          completed_at?: string | null
          course_id?: string
          created_at?: string
          id?: string
          last_position_seconds?: number | null
          progress?: number | null
          updated_at?: string
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "course_progress_course_id_fkey"
            columns: ["course_id"]
            isOneToOne: false
            referencedRelation: "courses"
            referencedColumns: ["id"]
          },
        ]
      }
      courses: {
        Row: {
          author: string | null
          created_at: string
          description: string
          domain: string | null
          duration: string | null
          id: string
          imageurl: string | null
          ishot: boolean | null
          isnew: boolean | null
          level: string | null
          skills: string[] | null
          title: string
          trainingcategory: string | null
          updated_at: string
          videourl: string | null
        }
        Insert: {
          author?: string | null
          created_at?: string
          description: string
          domain?: string | null
          duration?: string | null
          id: string
          imageurl?: string | null
          ishot?: boolean | null
          isnew?: boolean | null
          level?: string | null
          skills?: string[] | null
          title: string
          trainingcategory?: string | null
          updated_at?: string
          videourl?: string | null
        }
        Update: {
          author?: string | null
          created_at?: string
          description?: string
          domain?: string | null
          duration?: string | null
          id?: string
          imageurl?: string | null
          ishot?: boolean | null
          isnew?: boolean | null
          level?: string | null
          skills?: string[] | null
          title?: string
          trainingcategory?: string | null
          updated_at?: string
          videourl?: string | null
        }
        Relationships: []
      }
      evaluations: {
        Row: {
          activity_score: number | null
          evaluated_at: string | null
          evaluator_id: string | null
          feedback: Json
          id: string
          module_status: string | null
          submission_id: string | null
        }
        Insert: {
          activity_score?: number | null
          evaluated_at?: string | null
          evaluator_id?: string | null
          feedback?: Json
          id?: string
          module_status?: string | null
          submission_id?: string | null
        }
        Update: {
          activity_score?: number | null
          evaluated_at?: string | null
          evaluator_id?: string | null
          feedback?: Json
          id?: string
          module_status?: string | null
          submission_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "evaluations_submission_id_fkey"
            columns: ["submission_id"]
            isOneToOne: false
            referencedRelation: "ojt_submissions"
            referencedColumns: ["id"]
          },
        ]
      }
      mentors: {
        Row: {
          availability: string | null
          bio: string | null
          created_at: string
          expectations: string | null
          experience: string | null
          id: string
          image: string
          name: string
          rating: number
          reviews: number
          title: string
          topics: string[]
        }
        Insert: {
          availability?: string | null
          bio?: string | null
          created_at?: string
          expectations?: string | null
          experience?: string | null
          id?: string
          image: string
          name: string
          rating: number
          reviews: number
          title: string
          topics: string[]
        }
        Update: {
          availability?: string | null
          bio?: string | null
          created_at?: string
          expectations?: string | null
          experience?: string | null
          id?: string
          image?: string
          name?: string
          rating?: number
          reviews?: number
          title?: string
          topics?: string[]
        }
        Relationships: []
      }
      notebooks: {
        Row: {
          created_at: string | null
          id: string
          last_updated: string | null
          title: string
          user_id: string
        }
        Insert: {
          created_at?: string | null
          id?: string
          last_updated?: string | null
          title: string
          user_id: string
        }
        Update: {
          created_at?: string | null
          id?: string
          last_updated?: string | null
          title?: string
          user_id?: string
        }
        Relationships: []
      }
      ojt_activities: {
        Row: {
          activity_name: string
          course_id: string
          created_at: string | null
          id: string
          module_id: string
          questions: Json
          updated_at: string | null
        }
        Insert: {
          activity_name: string
          course_id: string
          created_at?: string | null
          id?: string
          module_id: string
          questions?: Json
          updated_at?: string | null
        }
        Update: {
          activity_name?: string
          course_id?: string
          created_at?: string | null
          id?: string
          module_id?: string
          questions?: Json
          updated_at?: string | null
        }
        Relationships: []
      }
      ojt_submissions: {
        Row: {
          activity_id: string | null
          activity_score: number | null
          employee_code: string | null
          id: string
          module_status: string | null
          status: string | null
          submissions: Json
          submitted_at: string | null
          user_id: string | null
        }
        Insert: {
          activity_id?: string | null
          activity_score?: number | null
          employee_code?: string | null
          id?: string
          module_status?: string | null
          status?: string | null
          submissions?: Json
          submitted_at?: string | null
          user_id?: string | null
        }
        Update: {
          activity_id?: string | null
          activity_score?: number | null
          employee_code?: string | null
          id?: string
          module_status?: string | null
          status?: string | null
          submissions?: Json
          submitted_at?: string | null
          user_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "ojt_submissions_activity_id_fkey"
            columns: ["activity_id"]
            isOneToOne: false
            referencedRelation: "ojt_activities"
            referencedColumns: ["id"]
          },
        ]
      }
      profiles: {
        Row: {
          avatar_url: string | null
          created_at: string
          first_name: string | null
          id: string
          last_name: string | null
          updated_at: string
        }
        Insert: {
          avatar_url?: string | null
          created_at?: string
          first_name?: string | null
          id: string
          last_name?: string | null
          updated_at?: string
        }
        Update: {
          avatar_url?: string | null
          created_at?: string
          first_name?: string | null
          id?: string
          last_name?: string | null
          updated_at?: string
        }
        Relationships: []
      }
      skills: {
        Row: {
          created_at: string
          id: string
          job_roles: string[] | null
          name: string
        }
        Insert: {
          created_at?: string
          id?: string
          job_roles?: string[] | null
          name: string
        }
        Update: {
          created_at?: string
          id?: string
          job_roles?: string[] | null
          name?: string
        }
        Relationships: []
      }
      sources: {
        Row: {
          content: string | null
          created_at: string | null
          id: string
          summary: string | null
          title: string
          type: string
          user_id: string
        }
        Insert: {
          content?: string | null
          created_at?: string | null
          id?: string
          summary?: string | null
          title: string
          type: string
          user_id: string
        }
        Update: {
          content?: string | null
          created_at?: string | null
          id?: string
          summary?: string | null
          title?: string
          type?: string
          user_id?: string
        }
        Relationships: []
      }
      user_achievements: {
        Row: {
          achieved_at: string
          id: string
          proficiency: string
          skill_id: string
          user_id: string
        }
        Insert: {
          achieved_at?: string
          id?: string
          proficiency: string
          skill_id: string
          user_id: string
        }
        Update: {
          achieved_at?: string
          id?: string
          proficiency?: string
          skill_id?: string
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "user_achievements_skill_id_fkey"
            columns: ["skill_id"]
            isOneToOne: false
            referencedRelation: "skills"
            referencedColumns: ["id"]
          },
        ]
      }
      user_preferences: {
        Row: {
          career_goal: string | null
          created_at: string | null
          domain: string | null
          id: string
          projects: string | null
          skills: Json | null
          technologies: string | null
          updated_at: string | null
          user_id: string
        }
        Insert: {
          career_goal?: string | null
          created_at?: string | null
          domain?: string | null
          id?: string
          projects?: string | null
          skills?: Json | null
          technologies?: string | null
          updated_at?: string | null
          user_id: string
        }
        Update: {
          career_goal?: string | null
          created_at?: string | null
          domain?: string | null
          id?: string
          projects?: string | null
          skills?: Json | null
          technologies?: string | null
          updated_at?: string | null
          user_id?: string
        }
        Relationships: []
      }
      user_roles: {
        Row: {
          created_at: string | null
          id: string
          role: Database["public"]["Enums"]["app_role"]
          user_id: string
        }
        Insert: {
          created_at?: string | null
          id?: string
          role: Database["public"]["Enums"]["app_role"]
          user_id: string
        }
        Update: {
          created_at?: string | null
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
      has_role: {
        Args: {
          _user_id: string
          _role: Database["public"]["Enums"]["app_role"]
        }
        Returns: boolean
      }
    }
    Enums: {
      app_role: "admin" | "evaluator" | "super_evaluator" | "user"
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
      app_role: ["admin", "evaluator", "super_evaluator", "user"],
    },
  },
} as const
