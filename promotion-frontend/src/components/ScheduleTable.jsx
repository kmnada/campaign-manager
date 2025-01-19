
import React from 'react';
import dayjs from 'dayjs';

const ScheduleTable = ({ schedule }) => {
  const formatDynamicTime = (time) => {
    const [hours, minutes] = time.split(':').map(Number);
    const now = dayjs().startOf('day');
    const newDate = now.add(hours, 'hour').add(minutes, 'minute');
    return newDate.format('hh:mm a');
  };

  return (
    <table border="1" cellPadding="8" style={{ borderCollapse: 'collapse', width: '100%' }}>
      <thead>
        <tr>
          <th>Day</th>
          <th>Start Time</th>
          <th>End Time</th>
        </tr>
      </thead>
      <tbody>
        {schedule.map((entry, index) => (
          <tr key={index}>
            <td>{entry.day}</td>
            <td>{formatDynamicTime(entry.startTime)}</td>
            <td>{formatDynamicTime(entry.endTime)}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default ScheduleTable;