export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[];

export type Database = {
  public: {
    Tables: {
      customer: {
        Row: {
          brand_name: string | null;
          created_at: string | null;
          customer_name: string | null;
          customer_type: string | null;
          economic_code: number | null;
          has_reagent: boolean | null;
          how_introduction: string | null;
          id: number;
          name_parent_organization: string | null;
          national_id: number | null;
          number_personnel: number | null;
          organization_model: string | null;
          organization_type: string | null;
          reagent: string | null;
          registration_code: number | null;
          type_activity: string | null;
          user_id: string | null;
        };
        Insert: {
          brand_name?: string | null;
          created_at?: string | null;
          customer_name?: string | null;
          customer_type?: string | null;
          economic_code?: number | null;
          has_reagent?: boolean | null;
          how_introduction?: string | null;
          id?: number;
          name_parent_organization?: string | null;
          national_id?: number | null;
          number_personnel?: number | null;
          organization_model?: string | null;
          organization_type?: string | null;
          reagent?: string | null;
          registration_code?: number | null;
          type_activity?: string | null;
          user_id?: string | null;
        };
        Update: {
          brand_name?: string | null;
          created_at?: string | null;
          customer_name?: string | null;
          customer_type?: string | null;
          economic_code?: number | null;
          has_reagent?: boolean | null;
          how_introduction?: string | null;
          id?: number;
          name_parent_organization?: string | null;
          national_id?: number | null;
          number_personnel?: number | null;
          organization_model?: string | null;
          organization_type?: string | null;
          reagent?: string | null;
          registration_code?: number | null;
          type_activity?: string | null;
          user_id?: string | null;
        };
        Relationships: [];
      };
      customer_follow_ups: {
        Row: {
          action_date: string | null;
          contract: string | null;
          contract_type: string | null;
          created_at: string | null;
          customer_id: number | null;
          follow_up_description: string | null;
          id: number;
          interface_name: string | null;
          next_follow_up_date: string | null;
          next_follow_up_type: string | null;
          tracking_type: string | null;
          user_id: string | null;
        };
        Insert: {
          action_date?: string | null;
          contract?: string | null;
          contract_type?: string | null;
          created_at?: string | null;
          customer_id?: number | null;
          follow_up_description?: string | null;
          id?: number;
          interface_name?: string | null;
          next_follow_up_date?: string | null;
          next_follow_up_type?: string | null;
          tracking_type?: string | null;
          user_id?: string | null;
        };
        Update: {
          action_date?: string | null;
          contract?: string | null;
          contract_type?: string | null;
          created_at?: string | null;
          customer_id?: number | null;
          follow_up_description?: string | null;
          id?: number;
          interface_name?: string | null;
          next_follow_up_date?: string | null;
          next_follow_up_type?: string | null;
          tracking_type?: string | null;
          user_id?: string | null;
        };
        Relationships: [
          {
            foreignKeyName: "customer_follow_ups_customer_id_fkey";
            columns: ["customer_id"];
            isOneToOne: false;
            referencedRelation: "customer";
            referencedColumns: ["id"];
          },
        ];
      };
      customers: {
        Row: {
          brand_name: string | null;
          created_at: string | null;
          customer_name: string | null;
          customer_type: string | null;
          economic_code: number | null;
          has_reagent: boolean | null;
          how_introduction: string | null;
          id: number;
          name_parent_organization: string | null;
          national_id: number | null;
          number_personnel: number | null;
          organization_model: string | null;
          organization_type: string | null;
          reagent: string | null;
          registration_code: number | null;
          type_activity: string | null;
          user_id: string | null;
        };
        Insert: {
          brand_name?: string | null;
          created_at?: string | null;
          customer_name?: string | null;
          customer_type?: string | null;
          economic_code?: number | null;
          has_reagent?: boolean | null;
          how_introduction?: string | null;
          id?: number;
          name_parent_organization?: string | null;
          national_id?: number | null;
          number_personnel?: number | null;
          organization_model?: string | null;
          organization_type?: string | null;
          reagent?: string | null;
          registration_code?: number | null;
          type_activity?: string | null;
          user_id?: string | null;
        };
        Update: {
          brand_name?: string | null;
          created_at?: string | null;
          customer_name?: string | null;
          customer_type?: string | null;
          economic_code?: number | null;
          has_reagent?: boolean | null;
          how_introduction?: string | null;
          id?: number;
          name_parent_organization?: string | null;
          national_id?: number | null;
          number_personnel?: number | null;
          organization_model?: string | null;
          organization_type?: string | null;
          reagent?: string | null;
          registration_code?: number | null;
          type_activity?: string | null;
          user_id?: string | null;
        };
        Relationships: [];
      };
      users: {
        Row: {
          created_at: string | null;
          email: string | null;
          id: number;
          name: string | null;
          role: string | null;
          user_id: string | null;
        };
        Insert: {
          created_at?: string | null;
          email?: string | null;
          id?: number;
          name?: string | null;
          role?: string | null;
          user_id?: string | null;
        };
        Update: {
          created_at?: string | null;
          email?: string | null;
          id?: number;
          name?: string | null;
          role?: string | null;
          user_id?: string | null;
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
};

type PublicSchema = Database[Extract<keyof Database, "public">];

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
      Row: infer R;
    }
    ? R
    : never
  : PublicTableNameOrOptions extends keyof (PublicSchema["Tables"] &
        PublicSchema["Views"])
    ? (PublicSchema["Tables"] &
        PublicSchema["Views"])[PublicTableNameOrOptions] extends {
        Row: infer R;
      }
      ? R
      : never
    : never;

export type TablesInsert<
  PublicTableNameOrOptions extends
    | keyof PublicSchema["Tables"]
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? Database[PublicTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Insert: infer I;
    }
    ? I
    : never
  : PublicTableNameOrOptions extends keyof PublicSchema["Tables"]
    ? PublicSchema["Tables"][PublicTableNameOrOptions] extends {
        Insert: infer I;
      }
      ? I
      : never
    : never;

export type TablesUpdate<
  PublicTableNameOrOptions extends
    | keyof PublicSchema["Tables"]
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? Database[PublicTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Update: infer U;
    }
    ? U
    : never
  : PublicTableNameOrOptions extends keyof PublicSchema["Tables"]
    ? PublicSchema["Tables"][PublicTableNameOrOptions] extends {
        Update: infer U;
      }
      ? U
      : never
    : never;

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
    : never;

export type CompositeTypes<
  PublicCompositeTypeNameOrOptions extends
    | keyof PublicSchema["CompositeTypes"]
    | { schema: keyof Database },
  CompositeTypeName extends PublicCompositeTypeNameOrOptions extends {
    schema: keyof Database;
  }
    ? keyof Database[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"]
    : never = never,
> = PublicCompositeTypeNameOrOptions extends { schema: keyof Database }
  ? Database[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"][CompositeTypeName]
  : PublicCompositeTypeNameOrOptions extends keyof PublicSchema["CompositeTypes"]
    ? PublicSchema["CompositeTypes"][PublicCompositeTypeNameOrOptions]
    : never;

export type Customer = Database["public"]["Tables"]["customer"]["Row"];
export type CustomerInsert = Database["public"]["Tables"]["customer"]["Insert"];
export type CustomerUpdate = Database["public"]["Tables"]["customer"]["Update"];

export type CustomerFollowUpRow =
  Database["public"]["Tables"]["customer_follow_ups"]["Row"];
export type CustomerFollowUpInsert =
  Database["public"]["Tables"]["customer_follow_ups"]["Insert"];
export type CustomerFollowUpUpdate =
  Database["public"]["Tables"]["customer_follow_ups"]["Update"];
