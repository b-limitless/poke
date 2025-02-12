import { Box, Grid2 } from "@mui/material";
import CustomLoadingButton from "components/Button/LoadingButton";
import { Input, InputAdornments } from "components/Input";

interface FieldSchema {
  field: string;
  label: string;
  type: "text" | "textarea" | "button" | "password";
  colSpan: number;
}

interface DynamicFormProps {
  formData: { [key: string]: any };
  setFormData: React.Dispatch<React.SetStateAction<{ [key: string]: any }>>;
  formSchema: FieldSchema[];
  handleSubmit: () => void;
  validateForm: () => boolean;
  errors: { [key: string]: string | undefined };
  saving: boolean;
}

const DynamicForm: React.FC<DynamicFormProps> = ({
  formData,
  setFormData,
  formSchema,
  handleSubmit,
  errors,
  saving,
}) => {
  return (
    <Grid2 container>
      {formSchema.map((field, index) => {
        const error = errors[field.field];

        return (
          <Grid2
            key={index}
            component="div"
            size={{ xs: 12, md: field.colSpan }}
          >
            {field.type === "text" && (
              <Input
                label={field.label}
                name={field.field}
                value={formData[field.field] || ""}
                onChange={(e: any) =>
                  setFormData({ ...formData, [field.field]: e.target.value })
                }
                fullWidth
                margin="dense"
                error={!!error}
                helperText={error}
              />
            )}

            {field.type === "password" && (
              <InputAdornments
                label={field.label}
                name={field.field}
                value={formData[field.field] || ""}
                onChange={(e: any) =>
                  setFormData({ ...formData, [field.field]: e.target.value })
                }
                fullWidth
                margin="dense"
                error={!!error}
                helperText={error}
              />
            )}

            {field.type === "button" && (
              <Grid2
                container
                justifyContent="flex-end"
                component="div"
                mt={"2rem"}
              >
                <CustomLoadingButton
                  onClick={handleSubmit}
                  loading={saving}
                  // loadingPosition="start"
                  variant="contained"
                  type="primary"
                >
                  {field.label}
                </CustomLoadingButton>
              </Grid2>
            )}
          </Grid2>
        );
      })}
    </Grid2>
  );
};

export default DynamicForm;
