import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';

interface ReplyBoxProps {
  // Add any necessary props here, e.g., onSubmit for the reply
}

export function ReplyBox(props: ReplyBoxProps) {
  return (
    <div className="mt-10">
      <h3 className="mb-4 text-xl font-bold text-foreground/80">Join the Discussion</h3>
      <Textarea 
          placeholder="Write your reply here..."
          className="min-h-[150px] rounded-xl border-none bg-background shadow-neumorphic-inset"
      />
      <Button className="mt-4 h-12 rounded-xl bg-accent-gradient px-6 text-lg font-bold text-accent-foreground shadow-neumorphic">
          Post Reply
      </Button>
    </div>
  );
}
