"use client";
import { useEffect, useState } from "react";
import { Form, Field, FormSpy } from "react-final-form";
import {
  TextField,
  Button,
  MenuItem,
  Select,
  InputLabel,
  FormControl,
  Grid2,
} from "@mui/material";
import { LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { getCustomers } from "@/utils/api/customers";
import { Database } from "@/lib/supabaseTypes";

interface CustomerFormProps {
  initialValues?: Database["public"]["Tables"]["customer_follow_ups"]["Insert"];
  onSubmit: (
    values: Database["public"]["Tables"]["customer_follow_ups"]["Insert"]
  ) => Promise<void>;
  mode?: "create" | "edit";
}

export default function CustomerFollowUpsForm({
  initialValues,
  onSubmit,
  mode = "create",
}: CustomerFormProps) {
  const [formValues, setFormValues] =
    useState<Database["public"]["Tables"]["customer_follow_ups"]["Insert"]>();
  const [customers, setCustomers] = useState<
    { id: number; customer_name: string }[]
  >([]);
  const [loadingCustomers, setLoadingCustomers] = useState(true);

  useEffect(() => {
    const fetchCustomers = async () => {
      try {
        const data = await getCustomers();
        setCustomers(data);
      } catch (error) {
        console.error("Error fetching customers:", error);
      } finally {
        setLoadingCustomers(false);
      }
    };
    fetchCustomers();
  }, []);

  return (
    <Form<Database["public"]["Tables"]["customer_follow_ups"]["Insert"]>
      onSubmit={onSubmit}
      initialValues={{
        ...initialValues,
        action_date: initialValues?.action_date || new Date().toISOString(),
        next_follow_up_date:
          initialValues?.next_follow_up_date || new Date().toISOString(),
        next_follow_up_type: initialValues?.next_follow_up_type || "",
        follow_up_description: initialValues?.follow_up_description || "",
        contract: initialValues?.contract || "",
        customer_id: initialValues?.customer_id || 0,
        contract_type: initialValues?.contract_type || "",
        interface_name: initialValues?.interface_name || "",
        tracking_type: initialValues?.tracking_type || "",
      }}
      render={({ handleSubmit }) => (
        <form
          onSubmit={handleSubmit}
          className="form-container"
          suppressHydrationWarning
        >
          <FormSpy
            subscription={{ values: true }}
            onChange={({ values }) => {
              setTimeout(
                () =>
                  setFormValues(
                    values as Database["public"]["Tables"]["customer_follow_ups"]["Insert"]
                  ),
                0
              );
            }}
          />
          <Grid2
            container
            spacing={3}
            sx={{
              alignItems: "center",
              justifyContent: "center",
              display: "flex",
              backgroundColor: "#fff",
              padding: "20px",
            }}
          >
            <Grid2 size={12}>
              <Grid2 container spacing={2} sx={{ direction: "rtl" }}>
                <Grid2 size={4}>
                  <Field name="contract">
                    {({ input }) => (
                      <TextField
                        {...input}
                        fullWidth
                        label="قرارداد"
                        variant="outlined"
                      />
                    )}
                  </Field>
                </Grid2>
                <Grid2 size={4}>
                  <Field name="customer_id">
                    {({ input }) => (
                      <FormControl fullWidth>
                        <InputLabel>مشتری</InputLabel>
                        <Select {...input} disabled={loadingCustomers}>
                          {customers.map((customer) => (
                            <MenuItem key={customer.id} value={customer.id}>
                              {customer.customer_name}
                            </MenuItem>
                          ))}
                        </Select>
                      </FormControl>
                    )}
                  </Field>
                </Grid2>
                <Grid2 size={4}>
                  <Field name="contract_type">
                    {({ input }) => (
                      <FormControl fullWidth>
                        <InputLabel>نوع قرارداد</InputLabel>
                        <Select {...input}>
                          <MenuItem value="نوع 1">نوع 1</MenuItem>
                          <MenuItem value="نوع 2">نوع 2</MenuItem>
                        </Select>
                      </FormControl>
                    )}
                  </Field>
                </Grid2>
                <Grid2 size={4}>
                  <Field name="interface_name">
                    {({ input }) => (
                      <FormControl fullWidth>
                        <InputLabel>نام رابط</InputLabel>
                        <Select {...input}>
                          <MenuItem value="رابط 1">رابط 1</MenuItem>
                          <MenuItem value="رابط 2">رابط 2</MenuItem>
                        </Select>
                      </FormControl>
                    )}
                  </Field>
                </Grid2>
                <Grid2 size={4}>
                  <Field name="tracking_type">
                    {({ input }) => (
                      <FormControl fullWidth>
                        <InputLabel>نوع پیگیری</InputLabel>
                        <Select {...input}>
                          <MenuItem value="پیگیری 1">پیگیری 1</MenuItem>
                          <MenuItem value="پیگیری 2">پیگیری 2</MenuItem>
                        </Select>
                      </FormControl>
                    )}
                  </Field>
                </Grid2>
                <Grid2 size={4}>
                  <Field name="action_date">
                    {({ input }) => (
                      <LocalizationProvider dateAdapter={AdapterDateFns}>
                        <DatePicker
                          {...input}
                          value={input.value ? new Date(input.value) : null}
                          onChange={(date) =>
                            input.onChange(date?.toISOString())
                          }
                          format="yyyy/MM/dd"
                          sx={{
                            width: "100%",
                            "& .MuiInputBase-root": {
                              direction: "ltr",
                            },
                          }}
                        />
                      </LocalizationProvider>
                    )}
                  </Field>
                </Grid2>
                <Grid2 size={12}>
                  <Field name="follow_up_description">
                    {({ input }) => (
                      <TextField
                        {...input}
                        fullWidth
                        multiline
                        rows={4}
                        label="شرح پیگیری"
                        variant="outlined"
                      />
                    )}
                  </Field>
                </Grid2>
                <Grid2 size={4}>
                  <Field name="next_follow_up_type">
                    {({ input }) => (
                      <FormControl fullWidth>
                        <InputLabel>نوع پیگیری بعدی</InputLabel>
                        <Select {...input}>
                          <MenuItem value="پیگیری تلفنی">پیگیری تلفنی</MenuItem>
                          <MenuItem value="پیگیری حضوری">پیگیری حضوری</MenuItem>
                        </Select>
                      </FormControl>
                    )}
                  </Field>
                </Grid2>
                <Grid2 size={4}>
                  <Field name="next_follow_up_date">
                    {({ input }) => (
                      <LocalizationProvider dateAdapter={AdapterDateFns}>
                        <DatePicker
                          {...input}
                          value={input.value ? new Date(input.value) : null}
                          onChange={(date) =>
                            input.onChange(date?.toISOString())
                          }
                          format="yyyy/MM/dd"
                          label="تاریخ پیگیری بعدی"
                          sx={{
                            width: "100%",
                            "& .MuiInputBase-root": {
                              direction: "ltr",
                            },
                          }}
                        />
                      </LocalizationProvider>
                    )}
                  </Field>
                </Grid2>
              </Grid2>
            </Grid2>

            <Grid2 size={12} sx={{ direction: "rtl" }}>
              <Button
                type="submit"
                variant="contained"
                color="primary"
                fullWidth
                className="submit-button"
              >
                {mode === "edit" ? "ذخیره تغییرات" : "ایجاد جدید"}
              </Button>
            </Grid2>
          </Grid2>
        </form>
      )}
    />
  );
}
