import { Control, FieldPath, FieldValues } from 'react-hook-form';
import { FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { productCategories } from '@/lib/product-form-schema';

interface ProductFormFieldProps<TFieldValues extends FieldValues = FieldValues> {
  control: Control<TFieldValues>;
  name: FieldPath<TFieldValues>;
  label: string;
  placeholder?: string;
  type?: 'text' | 'number' | 'textarea' | 'select';
}

export function ProductFormField<TFieldValues extends FieldValues = FieldValues>({
  control,
  name,
  label,
  placeholder,
  type = 'text',
}: ProductFormFieldProps<TFieldValues>) {
  return (
    <FormField
      control={control}
      name={name}
      render={({ field }) => (
        <FormItem>
          <FormLabel>{label}</FormLabel>
          <FormControl>
            {type === 'textarea' ? (
              <Textarea
                placeholder={placeholder}
                className="rounded-xl border-none bg-background shadow-neumorphic-inset focus:ring-2 focus:ring-ring"
                {...field}
              />
            ) : type === 'select' ? (
              <Select onValueChange={field.onChange} defaultValue={field.value as string}>
                <SelectTrigger className="rounded-xl border-none bg-background shadow-neumorphic-inset focus:ring-2 focus:ring-ring">
                  <SelectValue placeholder={placeholder} />
                </SelectTrigger>
                <SelectContent>
                  {productCategories.map(cat => (
                    <SelectItem key={cat} value={cat}>{cat}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            ) : (
              <Input
                type={type}
                placeholder={placeholder}
                {...field}
                className="rounded-xl border-none bg-background shadow-neumorphic-inset focus:ring-2 focus:ring-ring"
              />
            )}
          </FormControl>
          <FormMessage />
        </FormItem>
      )}
    />
  );
}
