export type Json = string | number | boolean | null | { [key: string]: Json | undefined } | Json[];

export interface Database {
  public: {
    Tables: {
      activities: {
        Row: {
          description: string | null;
          id: string;
          name: string;
          order_index: number;
          reps: string | null;
          requestChange: boolean;
          sessionId: string;
          time: number | null;
          warmup: boolean | null;
        };
        Insert: {
          description?: string | null;
          id?: string;
          name: string;
          order_index: number;
          reps?: string | null;
          requestChange: boolean;
          sessionId: string;
          time?: number | null;
          warmup?: boolean | null;
        };
        Update: {
          description?: string | null;
          id?: string;
          name?: string;
          order_index?: number;
          reps?: string | null;
          requestChange?: boolean;
          sessionId?: string;
          time?: number | null;
          warmup?: boolean | null;
        };
        Relationships: [
          {
            foreignKeyName: "activities_sessionId_fkey";
            columns: ["sessionId"];
            isOneToOne: false;
            referencedRelation: "sessions";
            referencedColumns: ["id"];
          },
        ];
      };
      configurations: {
        Row: {
          configurations: Json | null;
          id: string;
          role: string;
        };
        Insert: {
          configurations?: Json | null;
          id: string;
          role: string;
        };
        Update: {
          configurations?: Json | null;
          id?: string;
          role?: string;
        };
        Relationships: [
          {
            foreignKeyName: "configurations_id_fkey";
            columns: ["id"];
            isOneToOne: true;
            referencedRelation: "users";
            referencedColumns: ["id"];
          },
        ];
      };
      plans: {
        Row: {
          id: string;
          name: string;
          ownerId: string;
          trainerId: string | null;
        };
        Insert: {
          id?: string;
          name: string;
          ownerId: string;
          trainerId?: string | null;
        };
        Update: {
          id?: string;
          name?: string;
          ownerId?: string;
          trainerId?: string | null;
        };
        Relationships: [
          {
            foreignKeyName: "plans_ownerId_fkey";
            columns: ["ownerId"];
            isOneToOne: false;
            referencedRelation: "users";
            referencedColumns: ["id"];
          },
          {
            foreignKeyName: "plans_trainerId_fkey";
            columns: ["trainerId"];
            isOneToOne: false;
            referencedRelation: "users";
            referencedColumns: ["id"];
          },
        ];
      };
      sessions: {
        Row: {
          dayOfWeek: number;
          id: string;
          planId: string;
        };
        Insert: {
          dayOfWeek: number;
          id?: string;
          planId: string;
        };
        Update: {
          dayOfWeek?: number;
          id?: string;
          planId?: string;
        };
        Relationships: [
          {
            foreignKeyName: "sessions_planId_fkey";
            columns: ["planId"];
            isOneToOne: false;
            referencedRelation: "plans";
            referencedColumns: ["id"];
          },
        ];
      };
    };
    Views: {
      [_ in never]: never;
    };
    Functions: {
      [_ in never]: never;
    };
    Enums: {
      [_ in never]: never;
    };
    CompositeTypes: {
      [_ in never]: never;
    };
  };
}

export type Tables<
  PublicTableNameOrOptions extends
    | keyof (Database["public"]["Tables"] & Database["public"]["Views"])
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof (Database[PublicTableNameOrOptions["schema"]]["Tables"] &
        Database[PublicTableNameOrOptions["schema"]]["Views"])
    : never = never,
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? (Database[PublicTableNameOrOptions["schema"]]["Tables"] &
      Database[PublicTableNameOrOptions["schema"]]["Views"])[TableName] extends {
      Row: infer R;
    }
    ? R
    : never
  : PublicTableNameOrOptions extends keyof (Database["public"]["Tables"] &
        Database["public"]["Views"])
    ? (Database["public"]["Tables"] &
        Database["public"]["Views"])[PublicTableNameOrOptions] extends {
        Row: infer R;
      }
      ? R
      : never
    : never;

export type TablesInsert<
  PublicTableNameOrOptions extends keyof Database["public"]["Tables"] | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? Database[PublicTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Insert: infer I;
    }
    ? I
    : never
  : PublicTableNameOrOptions extends keyof Database["public"]["Tables"]
    ? Database["public"]["Tables"][PublicTableNameOrOptions] extends {
        Insert: infer I;
      }
      ? I
      : never
    : never;

export type TablesUpdate<
  PublicTableNameOrOptions extends keyof Database["public"]["Tables"] | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? Database[PublicTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Update: infer U;
    }
    ? U
    : never
  : PublicTableNameOrOptions extends keyof Database["public"]["Tables"]
    ? Database["public"]["Tables"][PublicTableNameOrOptions] extends {
        Update: infer U;
      }
      ? U
      : never
    : never;

export type Enums<
  PublicEnumNameOrOptions extends keyof Database["public"]["Enums"] | { schema: keyof Database },
  EnumName extends PublicEnumNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicEnumNameOrOptions["schema"]]["Enums"]
    : never = never,
> = PublicEnumNameOrOptions extends { schema: keyof Database }
  ? Database[PublicEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : PublicEnumNameOrOptions extends keyof Database["public"]["Enums"]
    ? Database["public"]["Enums"][PublicEnumNameOrOptions]
    : never;
