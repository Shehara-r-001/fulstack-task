import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';

import { Button } from '../ui/button';
import { DialogContent, DialogHeader, DialogTitle } from '../ui/dialog';
import { IUser } from '@/models/User.model';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '../ui/form';
import { Input } from '../ui/input';
import { useUpdatePoints } from '@/hooks/useUpdateUser';
import { useAppDispatch } from '@/redux/hooks';
import { setRank } from '@/redux/ranksSlice';
import { fetchUser } from '@/redux/actions';

const updateFormSchema = z.object({
  points: z.coerce
    .number()
    .max(100, { message: 'maximum allowed value is 100' })
    .min(0, { message: 'minimum allowed value is 0' }),
});

type UpdateFormParams = z.infer<typeof updateFormSchema>;

type UpdateFormProps = {
  user: IUser;
};

export function UpdateDialog({ user }: UpdateFormProps) {
  const form = useForm<UpdateFormParams>({
    resolver: zodResolver(updateFormSchema),
    reValidateMode: 'onSubmit',
    mode: 'all',
    defaultValues: {
      points: user.points,
    },
  });

  const { mutateAsync } = useUpdatePoints();
  const dispatch = useAppDispatch();

  const handleSubmit = async (data: UpdateFormParams) => {
    try {
      dispatch(setRank({ id: user.id, rank: user.rank }));
      const res = await mutateAsync({ userId: user.id, points: data.points });
      if (res) {
        dispatch(fetchUser(user.id));
        form.reset();
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <DialogContent>
      <DialogHeader>
        <DialogTitle>Update points of the user here..</DialogTitle>
      </DialogHeader>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(handleSubmit)}>
          <FormField
            control={form.control}
            name='points'
            render={({ field }) => (
              <FormItem>
                <FormLabel htmlFor='points'>Points</FormLabel>
                <FormControl>
                  <Input
                    name='points'
                    type='number'
                    id='points'
                    placeholder='points'
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <Button type='submit' className='mt-2'>
            Confirm
          </Button>
        </form>
      </Form>
    </DialogContent>
  );
}
