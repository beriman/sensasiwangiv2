
'use client';

import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from '@/components/ui/dialog';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Loader2 } from 'lucide-react';

const profileFormSchema = z.object({
  name: z.string().min(2, { message: 'Name must be at least 2 characters.' }),
  username: z.string().min(2, { message: 'Username must be at least 2 characters.' }).refine(val => val.startsWith('@'), { message: 'Username must start with @.'}),
  bio: z.string().max(160, { message: 'Bio must not be longer than 160 characters.' }).min(10, { message: 'Bio must be at least 10 characters.' }),
  twitter: z.string().url().optional().or(z.literal('')),
  instagram: z.string().url().optional().or(z.literal('')),
  website: z.string().url().optional().or(z.literal('')),
  tiktok: z.string().url().optional().or(z.literal('')),
  youtube: z.string().url().optional().or(z.literal('')),
  facebook: z.string().url().optional().or(z.literal('')),
});

export type ProfileData = {
  name: string;
  username: string;
  bio: string;
  profilePicture: string;
  socials: {
    twitter?: string;
    instagram?: string;
    website?: string;
    tiktok?: string;
    youtube?: string;
    facebook?: string;
  };
};

interface EditProfileDialogProps {
  isOpen: boolean;
  onOpenChange: (open: boolean) => void;
  profileData: ProfileData;
  onSave: (data: ProfileData) => void;
}

export function EditProfileDialog({ isOpen, onOpenChange, profileData, onSave }: EditProfileDialogProps) {
  const form = useForm<z.infer<typeof profileFormSchema>>({
    resolver: zodResolver(profileFormSchema),
    defaultValues: {
      name: profileData.name,
      username: profileData.username,
      bio: profileData.bio,
      twitter: profileData.socials.twitter || '',
      instagram: profileData.socials.instagram || '',
      website: profileData.socials.website || '',
      tiktok: profileData.socials.tiktok || '',
      youtube: profileData.socials.youtube || '',
      facebook: profileData.socials.facebook || '',
    },
  });

  const onSubmit = (values: z.infer<typeof profileFormSchema>) => {
    onSave({
      name: values.name,
      username: values.username,
      bio: values.bio,
      profilePicture: profileData.profilePicture, // Keep existing picture
      socials: {
        twitter: values.twitter,
        instagram: values.instagram,
        website: values.website,
        tiktok: values.tiktok,
        youtube: values.youtube,
        facebook: values.facebook,
      },
    });
  };

  return (
    <Dialog open={isOpen} onOpenChange={onOpenChange}>
      <DialogContent className="rounded-2xl border-none bg-background shadow-neumorphic sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle className="text-xl font-bold text-foreground/80">Edit Profile</DialogTitle>
          <DialogDescription className="text-base text-muted-foreground">
            Make changes to your profile here. Click save when you're done.
          </DialogDescription>
        </DialogHeader>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4 py-4 max-h-[70vh] overflow-y-auto pr-2">
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Name</FormLabel>
                  <FormControl>
                    <Input placeholder="Your name" {...field} className="rounded-xl border-none bg-background shadow-neumorphic-inset focus:ring-2 focus:ring-ring" />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
             <FormField
              control={form.control}
              name="username"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Username</FormLabel>
                  <FormControl>
                    <Input placeholder="@username" {...field} className="rounded-xl border-none bg-background shadow-neumorphic-inset focus:ring-2 focus:ring-ring" />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="bio"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Bio</FormLabel>
                  <FormControl>
                    <Textarea placeholder="Tell us a little bit about yourself" className="rounded-xl border-none bg-background shadow-neumorphic-inset focus:ring-2 focus:ring-ring" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="twitter"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Twitter URL</FormLabel>
                  <FormControl>
                    <Input placeholder="https://twitter.com/..." {...field} className="rounded-xl border-none bg-background shadow-neumorphic-inset focus:ring-2 focus:ring-ring" />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
             <FormField
              control={form.control}
              name="instagram"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Instagram URL</FormLabel>
                  <FormControl>
                    <Input placeholder="https://instagram.com/..." {...field} className="rounded-xl border-none bg-background shadow-neumorphic-inset focus:ring-2 focus:ring-ring" />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="tiktok"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>TikTok URL</FormLabel>
                  <FormControl>
                    <Input placeholder="https://tiktok.com/@..." {...field} className="rounded-xl border-none bg-background shadow-neumorphic-inset focus:ring-2 focus:ring-ring" />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
             <FormField
              control={form.control}
              name="youtube"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>YouTube URL</FormLabel>
                  <FormControl>
                    <Input placeholder="https://youtube.com/..." {...field} className="rounded-xl border-none bg-background shadow-neumorphic-inset focus:ring-2 focus:ring-ring" />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
             <FormField
              control={form.control}
              name="facebook"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Facebook URL</FormLabel>
                  <FormControl>
                    <Input placeholder="https://facebook.com/..." {...field} className="rounded-xl border-none bg-background shadow-neumorphic-inset focus:ring-2 focus:ring-ring" />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
             <FormField
              control={form.control}
              name="website"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Website URL</FormLabel>
                  <FormControl>
                    <Input placeholder="https://yoursite.com" {...field} className="rounded-xl border-none bg-background shadow-neumorphic-inset focus:ring-2 focus:ring-ring" />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <DialogFooter>
              <Button type="submit" disabled={form.formState.isSubmitting} className="h-12 rounded-xl bg-accent-gradient px-6 font-bold text-accent-foreground shadow-neumorphic transition-all duration-300 ease-in-out hover:shadow-lg hover:bg-accent-gradient-active">
                {form.formState.isSubmitting && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                Save changes
              </Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}
