import { Button } from '@/components/Button';
import { Modal, ModalChange, ModalContent } from '@/components/Modal';
import { Typography } from '@/components/Typography';
import { add, lastDayOfMonth, set, sub } from 'date-fns';
import { useState } from 'react';
import { View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

const DAYS_IN_WEEK = 7;
const CALENDAR_GAP = 8;

function Calendar({
  value,
  onChange,
}: {
  value: Date;
  onChange: (value: Date) => void;
}) {
  const [month, setMonth] = useState(lastDayOfMonth(value));
  const lastMonth = lastDayOfMonth(sub(month, { months: 1 }));
  const lastMonthDay = lastMonth.getDay() === 6 ? -1 : lastMonth.getDay();

  return (
    <View style={{ gap: 20 }}>
      <View style={{ justifyContent: 'space-between', flexDirection: 'row' }}>
        <Button
          onPress={() => setMonth(lastDayOfMonth(sub(month, { months: 1 })))}
        >
          <Typography>{'<'}</Typography>
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
          <Typography>{'>'}</Typography>
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
                <Button
                  key={dayIndex}
                  style={[
                    { flex: 1, paddingHorizontal: 0 },
                    (isPreviousMonth || isNextMonth) && { opacity: 0.3 },
                    monthDay.toDateString() === value.toDateString() && {
                      backgroundColor: 'purple',
                    },
                  ]}
                  disabled={isPreviousMonth || isNextMonth}
                  onPress={() => onChange(monthDay)}
                >
                  <Typography>
                    {isPreviousMonth
                      ? lastMonth.getDate() - lastMonthDay + index
                      : isNextMonth
                        ? day - month.getDate()
                        : day}
                  </Typography>
                </Button>
              );
            })}
          </View>
        ))}
      </View>
    </View>
  );
}

export default function Index() {
  const [selectedDate, setSelectedDate] = useState(new Date());

  return (
    <SafeAreaView
      style={{
        justifyContent: 'center',
        paddingHorizontal: 16,
        paddingVertical: 8,
        flexDirection: 'row',
        alignItems: 'center',
        gap: 16,
      }}
    >
      <Typography style={{ marginRight: 'auto' }}>
        {selectedDate.toLocaleDateString('default', {
          day: 'numeric',
          month: 'short',
          year: 'numeric',
        })}
      </Typography>
      <Modal>
        <ModalChange
          render={(setIsModalOpen) => (
            <Button onPress={() => setIsModalOpen(true)}>
              <Typography>Calendar</Typography>
            </Button>
          )}
        />
        <ModalContent style={{ gap: 20 }}>
          <ModalChange
            render={(setIsModalOpen) => (
              <Calendar
                value={selectedDate}
                onChange={(date) => {
                  setSelectedDate(date);
                  setIsModalOpen(false);
                }}
              />
            )}
          />
          <ModalChange
            render={(setIsModalOpen) => (
              <Button onPress={() => setIsModalOpen(false)}>
                <Typography>Close</Typography>
              </Button>
            )}
          />
        </ModalContent>
      </Modal>
      <Modal>
        <ModalChange
          render={(setIsModalOpen) => (
            <Button onPress={() => setIsModalOpen(true)}>
              <Typography>Create</Typography>
            </Button>
          )}
        />
        <ModalContent>
          <Typography>Create new event</Typography>
        </ModalContent>
      </Modal>
    </SafeAreaView>
  );
}
