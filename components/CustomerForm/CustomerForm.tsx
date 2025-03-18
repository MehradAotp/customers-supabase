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
  Radio,
  RadioGroup,
  FormControlLabel,
  Box,
  Typography,
} from "@mui/material";

export interface FormValues {
  customer_type: string;
  national_id: number;
  how_introduction: string;
  customer_name: string;
  brand_name: string;
  has_reagent: string;
  organization_model: string;
  economic_code: number;
  number_personnel: number;
  registration_code: number;
  name_parent_organization: string;
  organization_type: string;
  type_activity: string;
  reagent: string;
}

interface CustomerFormProps {
  initialValues?: FormValues;
  onSubmit: (values: FormValues) => Promise<void>;
  mode?: "create" | "edit";
}

export default function CustomerForm({
  initialValues,
  onSubmit,
  mode = "create",
}: CustomerFormProps) {
  const [hasReagent, setHasReagent] = useState(
    initialValues?.has_reagent === "true"
  );
  const [formValues, setFormValues] = useState<FormValues>();

  useEffect(() => {
    if (formValues?.has_reagent !== undefined) {
      setHasReagent(formValues.has_reagent === "true");
    }
  }, [formValues?.has_reagent]);

  return (
    <Form<FormValues>
      onSubmit={onSubmit}
      initialValues={{
        ...initialValues,
        customer_type: initialValues?.customer_type || "حقیقی",
        has_reagent: initialValues?.has_reagent || "false",
        organization_model: initialValues?.organization_model || "مدل 1",
        how_introduction: initialValues?.how_introduction || "آشنایی 1",
        name_parent_organization:
          initialValues?.name_parent_organization || "سازمان 1",
        organization_type: initialValues?.organization_type || "خصوصی",
        type_activity: initialValues?.type_activity || "بازرگانی",
        national_id: initialValues?.national_id || 0,
        customer_name: initialValues?.customer_name || "",
        brand_name: initialValues?.brand_name || "",
        economic_code: initialValues?.economic_code || 0,
        number_personnel: initialValues?.number_personnel || 0,
        registration_code: initialValues?.registration_code || 0,
        reagent: initialValues?.reagent || "",
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
              setTimeout(() => setFormValues(values as FormValues), 0);
            }}
          />
          <Grid2
            container
            spacing={3}
            sx={{
              alignItems: "center",
              justifyContent: "center",
              display: "flex",

              backgroundColor: "#F5F5F5",
            }}
          >
            <Grid2 size={12}>
              <Grid2 container spacing={2}>
                <Grid2 size={3}>
                  <Field
                    name="how_introduction"
                    render={({ input }) => (
                      <FormControl fullWidth required sx={{ direction: "rtl" }}>
                        <InputLabel>نحوه آشنایی</InputLabel>
                        <Select
                          {...input}
                          suppressHydrationWarning
                          label="نحوه آشنایی"
                          variant="filled"
                        >
                          <MenuItem value="آشنایی 1" sx={{ direction: "rtl" }}>
                            آشنایی 1
                          </MenuItem>
                          <MenuItem value="آشنایی 2" sx={{ direction: "rtl" }}>
                            آشنایی 2
                          </MenuItem>
                        </Select>
                      </FormControl>
                    )}
                  />
                </Grid2>
                <Grid2 size={3}>
                  <Field
                    name="national_id"
                    render={({ input }) => (
                      <TextField
                        {...input}
                        suppressHydrationWarning
                        label="شناسه ملی"
                        variant="filled"
                        fullWidth
                        type="number"
                        required
                        sx={{ backgroundColor: "#fff", direction: "rtl" }}
                      />
                    )}
                  />
                </Grid2>
                <Grid2 size={6}>
                  <Box
                    sx={{
                      display: "flex",
                      flexDirection: "row-reverse",
                      justifyContent: "center",
                      alignItems: "center",
                    }}
                  >
                    <Typography
                      sx={{
                        color: (theme) => theme.palette.common.black,
                        width: "100px",
                      }}
                    >
                      نوع مشتری
                    </Typography>
                    <Field name="customer_type" type="radio">
                      {({ input }) => (
                        <RadioGroup
                          row
                          {...input}
                          suppressHydrationWarning
                          sx={{
                            display: "flex",
                            width: "100%",

                            justifyContent: "space-between",
                          }}
                        >
                          <FormControlLabel
                            value="حقیقی"
                            control={<Radio />}
                            label="حقیقی"
                          />
                          <FormControlLabel
                            value="حقوقی"
                            control={<Radio />}
                            label="حقوقی"
                          />
                        </RadioGroup>
                      )}
                    </Field>
                  </Box>
                </Grid2>
              </Grid2>
            </Grid2>

            <Grid2 size={12}>
              <Grid2 container spacing={2}>
                <Grid2 size={4}>
                  <Field
                    name="customer_name"
                    render={({ input }) => (
                      <TextField
                        {...input}
                        suppressHydrationWarning
                        label="نام مشتری"
                        variant="filled"
                        fullWidth
                        required
                        sx={{ backgroundColor: "#fff", direction: "rtl" }}
                      />
                    )}
                  />
                </Grid2>
                <Grid2 size={4}>
                  <Field
                    name="reagent"
                    render={({ input }) => (
                      <TextField
                        {...input}
                        label="معرف"
                        variant="filled"
                        fullWidth
                        required
                        disabled={!hasReagent}
                        sx={{
                          backgroundColor: "#fff",
                          direction: "rtl",
                          "& .MuiInputBase-root": {
                            backgroundColor: hasReagent
                              ? "#F0F0F0"
                              : "lightgray",
                          },
                        }}
                      />
                    )}
                  />
                </Grid2>
                <Grid2 size={4}>
                  <Field
                    name="has_reagent"
                    render={({ input }) => (
                      <FormControl fullWidth required sx={{ direction: "rtl" }}>
                        <InputLabel>معرف دارد؟</InputLabel>
                        <Select
                          {...input}
                          suppressHydrationWarning
                          label="معرف دارد؟"
                          variant="filled"
                        >
                          <MenuItem value="true" sx={{ direction: "rtl" }}>
                            بله
                          </MenuItem>
                          <MenuItem value="false" sx={{ direction: "rtl" }}>
                            خیر
                          </MenuItem>
                        </Select>
                      </FormControl>
                    )}
                  />
                </Grid2>
              </Grid2>
            </Grid2>

            <Grid2 size={12}>
              <Grid2 container spacing={2}>
                <Grid2 size={4}>
                  <Field
                    name="brand_name"
                    render={({ input }) => (
                      <TextField
                        {...input}
                        suppressHydrationWarning
                        label="نام تجاری"
                        variant="filled"
                        fullWidth
                        required
                        sx={{ backgroundColor: "#fff", direction: "rtl" }}
                      />
                    )}
                  />
                </Grid2>

                <Grid2 size={4}>
                  <Field
                    name="economic_code"
                    render={({ input }) => (
                      <TextField
                        {...input}
                        suppressHydrationWarning
                        label="کد اقتصادی"
                        variant="filled"
                        fullWidth
                        type="number"
                        required
                        sx={{ backgroundColor: "#fff", direction: "rtl" }}
                      />
                    )}
                  />
                </Grid2>
                <Grid2 size={4}>
                  <Field
                    name="type_activity"
                    render={({ input }) => (
                      <FormControl fullWidth required sx={{ direction: "rtl" }}>
                        <InputLabel>نوع فعالیت</InputLabel>
                        <Select
                          {...input}
                          suppressHydrationWarning
                          label="نوع فعالیت"
                          variant="filled"
                        >
                          <MenuItem value="بازرگانی">بازرگانی</MenuItem>
                          <MenuItem value="خدمات">خدمات</MenuItem>
                        </Select>
                      </FormControl>
                    )}
                  />
                </Grid2>
              </Grid2>
            </Grid2>

            <Grid2 size={12}>
              <Grid2 container spacing={2}>
                <Grid2 size={4}>
                  <Field
                    name="number_personnel"
                    render={({ input }) => (
                      <TextField
                        {...input}
                        suppressHydrationWarning
                        label="تعداد پرسنل"
                        variant="filled"
                        fullWidth
                        type="number"
                        required
                        sx={{ backgroundColor: "#fff", direction: "rtl" }}
                      />
                    )}
                  />
                </Grid2>
                <Grid2 size={4}>
                  <Field
                    name="registration_code"
                    render={({ input }) => (
                      <TextField
                        {...input}
                        suppressHydrationWarning
                        label="کد ثبتی"
                        variant="filled"
                        fullWidth
                        type="number"
                        required
                        sx={{ backgroundColor: "#fff", direction: "rtl" }}
                      />
                    )}
                  />
                </Grid2>
                <Grid2 size={4}>
                  <Field
                    name="name_parent_organization"
                    render={({ input }) => (
                      <FormControl fullWidth required sx={{ direction: "rtl" }}>
                        <InputLabel>نام سازمان مادر</InputLabel>
                        <Select
                          {...input}
                          suppressHydrationWarning
                          label="نام سازمان مادر"
                          variant="filled"
                        >
                          <MenuItem value="سازمان 1">سازمان 1</MenuItem>
                          <MenuItem value="سازمان 2">سازمان 2</MenuItem>
                        </Select>
                      </FormControl>
                    )}
                  />
                </Grid2>
              </Grid2>
            </Grid2>

            <Grid2 size={12}>
              <Grid2 container spacing={2}>
                <Grid2 size={4}>
                  <Field
                    name="organization_type"
                    render={({ input }) => (
                      <FormControl fullWidth required sx={{ direction: "rtl" }}>
                        <InputLabel>نوع سازمان</InputLabel>
                        <Select
                          {...input}
                          suppressHydrationWarning
                          label="نوع سازمان"
                          variant="filled"
                        >
                          <MenuItem value="خصوصی">خصوصی</MenuItem>
                          <MenuItem value="عمومی">عمومی</MenuItem>
                        </Select>
                      </FormControl>
                    )}
                  />
                </Grid2>

                <Grid2 size={7}>
                  <Box
                    sx={{
                      display: "flex",
                      flexDirection: "row-reverse",
                      justifyContent: "center",
                      alignItems: "center",
                    }}
                  >
                    <Typography
                      sx={{
                        color: (theme) => theme.palette.common.black,
                        width: "100px",
                      }}
                    >
                      مدل سازمان
                    </Typography>
                    <Field name="organization_model" type="radio">
                      {({ input }) => (
                        <RadioGroup
                          row
                          {...input}
                          suppressHydrationWarning
                          sx={{
                            display: "flex",
                            width: "100%",

                            justifyContent: "space-between",
                          }}
                        >
                          <FormControlLabel
                            value="مدل 1"
                            control={<Radio />}
                            label="مدل 1"
                          />
                          <FormControlLabel
                            value="مدل 2"
                            control={<Radio />}
                            label="مدل 2"
                          />
                          <FormControlLabel
                            value="مدل 3"
                            control={<Radio />}
                            label="مدل 3"
                          />
                        </RadioGroup>
                      )}
                    </Field>
                  </Box>
                </Grid2>
              </Grid2>
            </Grid2>

            <Grid2 size={12} sx={{ direction: "rtl" }}>
              <Button
                type="submit"
                variant="contained"
                color="primary"
                fullWidth
                sx={{
                  backgroundColor: "#1976D2",
                  padding: "12px",
                  borderRadius: "8px",
                  fontSize: "16px",
                }}
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
