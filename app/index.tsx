import { Button } from '@/components/Button';
import {
  Modal,
  ModalButtonClose,
  ModalButtonOpen,
  ModalContent,
} from '@/components/Modal';
import { FormField, FormFieldLabel } from '@/components/FormField';
import { TextFieldInput } from '@/components/TextFieldInput';
import { Typography } from '@/components/Typography';
import {
  add,
  compareAsc,
  compareDesc,
  lastDayOfMonth,
  set,
  sub,
} from 'date-fns';
import { useState } from 'react';
import { Controller, useForm } from 'react-hook-form';
import { Keyboard, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { drizzle } from 'drizzle-orm/expo-sqlite';
import { works } from '@/database/schema';
import { useSQLiteContext } from 'expo-sqlite';
import { useQuery, useQueryClient } from '@tanstack/react-query';

function formatDate(date: Date) {
  return date.toLocaleDateString('default', {
    day: 'numeric',
    month: 'short',
    year: 'numeric',
  });
}

const DAYS_IN_WEEK = 7;
const CALENDAR_GAP = 8;

function Calendar({
  value,
  minDate,
  maxDate,
  onChange,
}: {
  value?: Date;
  minDate?: Date;
  maxDate?: Date;
  onChange: (value: Date) => void;
}) {
  const [month, setMonth] = useState(lastDayOfMonth(value || new Date()));
  const lastMonth = lastDayOfMonth(sub(month, { months: 1 }));
  const lastMonthDay = lastMonth.getDay() === 6 ? -1 : lastMonth.getDay();

  return (
    <View style={{ gap: 20 }}>
      <View style={{ justifyContent: 'space-between', flexDirection: 'row' }}>
        <Button
          onPress={() => setMonth(lastDayOfMonth(sub(month, { months: 1 })))}
        >
          {'<'}
        </Button>
        <View style={{ alignItems: 'center' }}>
          <Typography>
            {month.toLocaleDateString('default', { month: 'long' })}
          </Typography>
          <Typography>
            {month.toLocaleDateString('default', { year: 'numeric' })}
          </Typography>
        </View>
        <Button
          onPress={() => setMonth(lastDayOfMonth(add(month, { months: 1 })))}
        >
          {'>'}
        </Button>
      </View>
      <View style={{ gap: CALENDAR_GAP }}>
        {Array.from({ length: 6 }, (_, weekIndex) => (
          <View
            key={weekIndex}
            style={{ flexDirection: 'row', gap: CALENDAR_GAP }}
          >
            {Array.from({ length: DAYS_IN_WEEK }, (_, dayIndex) => {
              const index = dayIndex + weekIndex * DAYS_IN_WEEK;

              const day = index - lastMonthDay;
              const isPreviousMonth = index <= lastMonthDay;
              const isNextMonth = day > month.getDate();

              const monthDay = set(new Date(month), { date: day });

              return (
                <ModalButtonClose
                  key={dayIndex}
                  style={[
                    { flex: 1, paddingHorizontal: 0 },
                    monthDay.toDateString() === value?.toDateString() && {
                      backgroundColor: 'purple',
                    },
                  ]}
                  disabled={
                    isPreviousMonth ||
                    isNextMonth ||
                    (minDate &&
                      compareAsc(monthDay, minDate.toDateString()) < 0) ||
                    (maxDate &&
                      compareDesc(monthDay, maxDate.toDateString()) < 0)
                  }
                  onPress={() => onChange(monthDay)}
                >
                  {isPreviousMonth
                    ? lastMonth.getDate() - lastMonthDay + index
                    : isNextMonth
                      ? day - month.getDate()
                      : day}
                </ModalButtonClose>
              );
            })}
          </View>
        ))}
      </View>
    </View>
  );
}

function transformTitle(title: string) {
  return title.trim().replace(/\s\s+/g, ' ');
}

const workSchema = z.object({
  title: z.string().transform(transformTitle),
  endDate: z.date().optional(),
  startDate: z.date(),
});

const worksQueryKey = ['works'];

function CreateWorkForm(props: { startDate: Date }) {
  console.log(CreateWorkForm.name);

  const queryClient = useQueryClient();
  const database = drizzle(useSQLiteContext());
  const { handleSubmit, control, watch } = useForm<z.infer<typeof workSchema>>({
    defaultValues: { ...props, endDate: undefined, title: '' },
    resolver: zodResolver(workSchema),
  });

  const { title, startDate, endDate } = watch();

  return (
    <View style={{ gap: 16 }}>
      <FormField>
        <FormFieldLabel>Title</FormFieldLabel>
        <Controller
          control={control}
          name="title"
          render={({ field: { onChange, onBlur, value } }) => (
            <TextFieldInput
              placeholder="Add a title to your work"
              onChangeText={onChange}
              onBlur={onBlur}
              value={value}
              autoFocus
            />
          )}
        />
      </FormField>
      <FormField>
        <FormFieldLabel>Start date</FormFieldLabel>
        <Modal>
          <ModalButtonOpen onPress={Keyboard.dismiss}>
            {formatDate(startDate)}
          </ModalButtonOpen>
          <ModalContent>
            <Controller
              control={control}
              name="startDate"
              render={({ field: { onChange, value } }) => (
                <Calendar value={value} onChange={onChange} maxDate={endDate} />
              )}
            />
          </ModalContent>
        </Modal>
      </FormField>
      <FormField>
        <Typography>End date</Typography>
        <Modal>
          <ModalButtonOpen onPress={Keyboard.dismiss}>
            {endDate ? formatDate(endDate) : 'Endless'}
          </ModalButtonOpen>
          <ModalContent>
            <Controller
              control={control}
              name="endDate"
              render={({ field: { onChange, value } }) => (
                <View style={{ gap: 16 }}>
                  <Calendar
                    value={value}
                    onChange={onChange}
                    minDate={startDate}
                  />
                  <ModalButtonClose onPress={() => onChange(undefined)}>
                    <Typography>Endless</Typography>
                  </ModalButtonClose>
                </View>
              )}
            />
          </ModalContent>
        </Modal>
      </FormField>
      <View style={{ flexDirection: 'row', gap: 16, marginTop: 8 }}>
        <ModalButtonClose>Cancel</ModalButtonClose>
        <ModalButtonClose
          disabled={transformTitle(title) === ''}
          onPress={handleSubmit(async (data) => {
            await database.insert(works).values(data);
            queryClient.invalidateQueries({ queryKey: worksQueryKey });
          })}
          style={{ flex: 1 }}
        >
          Create
        </ModalButtonClose>
      </View>
    </View>
  );
}

function Test() {
  console.log(Test.name);

  const queryClient = useQueryClient();
  const database = drizzle(useSQLiteContext());
  const worksQuery = useQuery({
    queryFn: () => database.select().from(works),
    queryKey: worksQueryKey,
  });

  return (
    <View style={{ gap: 16 }}>
      <View style={{ flexDirection: 'row', gap: 16 }}>
        <Button
          style={{ flex: 1 }}
          onPress={async () => {
            await database.delete(works);
            queryClient.setQueryData(worksQueryKey, []);
          }}
        >
          Clean
        </Button>
        <Button style={{ flex: 1 }} onPress={() => worksQuery.refetch()}>
          Refresh
        </Button>
      </View>
      <Typography>{JSON.stringify(worksQuery.data)}</Typography>
    </View>
  );
}

export default function Index() {
  console.log(Index.name);

  const [selectedDate, setSelectedDate] = useState(new Date());

  return (
    <SafeAreaView style={{ paddingHorizontal: 16, gap: 16 }}>
      <View
        style={{
          justifyContent: 'center',
          paddingVertical: 8,
          flexDirection: 'row',
          alignItems: 'center',
          gap: 16,
        }}
      >
        <Typography style={{ marginRight: 'auto' }}>
          {formatDate(selectedDate)}
        </Typography>
        <Modal>
          <ModalButtonOpen>Calendar</ModalButtonOpen>
          <ModalContent style={{ gap: 20 }}>
            <Calendar value={selectedDate} onChange={setSelectedDate} />
            <ModalButtonClose>Close</ModalButtonClose>
          </ModalContent>
        </Modal>
        <Modal>
          <ModalButtonOpen>Create</ModalButtonOpen>
          <ModalContent>
            <CreateWorkForm startDate={selectedDate} />
          </ModalContent>
        </Modal>
      </View>
      <Test />
    </SafeAreaView>
  );
}
