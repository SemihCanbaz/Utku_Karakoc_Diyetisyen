export type Client = {
  id: string;
  first_name: string;
  last_name: string;
  phone: string;
  email: string;
  birth_date: string | null;
  gender: string;
  start_date: string;
  goal: string;
  target_weight: number | null;
  notes: string;
  status: "active" | "passive";
  created_at: string;
};
export type Measurement = {
  id: string;
  client_id: string;
  measurement_date: string;
  weight: number;
  waist: number | null;
  hip: number | null;
  body_fat_percentage: number | null;
  note: string;
};
export type Meal = { name: string; time: string; items: string[] };
export type DietPlan = {
  id: string;
  client_id: string;
  week_number: number;
  title: string;
  start_date: string;
  end_date: string;
  content: { meals: Meal[] };
  notes: string;
  status: "draft" | "published" | "archived";
};
export type Appointment = {
  id: string;
  client_id: string;
  appointment_date: string;
  start_time: string;
  end_time: string;
  appointment_type: string;
  status: "scheduled" | "completed" | "cancelled" | "no_show";
  note: string;
};
export type ActionResult = { error?: string; success?: string; id?: string };
