export type Json = string | number | boolean | null | { [key: string]: Json | undefined } | Json[];

export interface Database {
  public: {
    Tables: {
      activities: {
        Row: {
          description: string;
          id: string;
          name: string;
          order_index: number;
          reps: string;
          requestchange: boolean;
          sessionid: string;
          time: number;
          videourl: string;
          warmup: boolean;
        };
        Insert: {
          description: string;
          id: string;
          name: string;
          order_index: number;
          reps: string;
          requestchange: boolean;
          sessionid: string;
          time: number;
          videourl: string;
          warmup: boolean;
        };
        Update: {
          description?: string;
          id?: string;
          name?: string;
          order_index?: number;
          reps?: string;
          requestchange?: boolean;
          sessionid?: string;
          time?: number;
          videourl?: string;
          warmup?: boolean;
        };
        Relationships: [
          {
            foreignKeyName: "activities_sessionid_fkey";
            columns: ["sessionid"];
            referencedRelation: "sessions";
            referencedColumns: ["id"];
          }
        ];
      };
      plans: {
        Row: {
          id: string;
          name: string;
          ownerid: string;
          trainerid: string | null;
        };
        Insert: {
          id: string;
          name: string;
          ownerid: string;
          trainerid?: string | null;
        };
        Update: {
          id?: string;
          name?: string;
          ownerid?: string;
          trainerid?: string | null;
        };
        Relationships: [
          {
            foreignKeyName: "plans_ownerid_fkey";
            columns: ["ownerid"];
            referencedRelation: "users";
            referencedColumns: ["id"];
          },
          {
            foreignKeyName: "plans_trainerid_fkey";
            columns: ["trainerid"];
            referencedRelation: "users";
            referencedColumns: ["id"];
          }
        ];
      };
      sessions: {
        Row: {
          dayofweek: number;
          id: string;
          planid: string;
        };
        Insert: {
          dayofweek: number;
          id: string;
          planid: string;
        };
        Update: {
          dayofweek?: number;
          id?: string;
          planid?: string;
        };
        Relationships: [
          {
            foreignKeyName: "sessions_planid_fkey";
            columns: ["planid"];
            referencedRelation: "plans";
            referencedColumns: ["id"];
          }
        ];
      };
      stats: {
        Row: {
          id: string;
          stats: Json | null;
          userid: string;
        };
        Insert: {
          id: string;
          stats?: Json | null;
          userid: string;
        };
        Update: {
          id?: string;
          stats?: Json | null;
          userid?: string;
        };
        Relationships: [
          {
            foreignKeyName: "stats_userid_fkey";
            columns: ["userid"];
            referencedRelation: "users";
            referencedColumns: ["id"];
          }
        ];
      };
      users: {
        Row: {
          configurations: Json | null;
          hashpassword: string;
          id: string;
          name: string;
          role: string;
        };
        Insert: {
          configurations?: Json | null;
          hashpassword: string;
          id: string;
          name: string;
          role: string;
        };
        Update: {
          configurations?: Json | null;
          hashpassword?: string;
          id?: string;
          name?: string;
          role?: string;
        };
        Relationships: [];
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
