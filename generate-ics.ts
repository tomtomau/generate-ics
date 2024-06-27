import fs from 'fs';
import moment from 'moment';

// Function to create an event string for a given week
function createEvent(week: number, date: moment.Moment): string {
    const start = date.format('YYYYMMDD');
    const end = date.add(1, 'day').format('YYYYMMDD');
    return `
BEGIN:VEVENT
SUMMARY:Week ${week}
DTSTART;VALUE=DATE:${start}
DTEND;VALUE=DATE:${end}
END:VEVENT`;
}

// Initialize the start date
const startDate = moment('2024-06-09');
const startWeek = 12;
const endWeek = 40;

// Create events for Week 12, Week 13, and Week 14
const weeks = Array.from({ length: endWeek - startWeek + 1 }, (_, index) => startWeek + index);
let icsContent = `BEGIN:VCALENDAR
VERSION:2.0
CALSCALE:GREGORIAN`;

weeks.forEach((week, index) => {
    const eventDate = startDate.clone().add(index, 'weeks');
    icsContent += createEvent(week, eventDate);
});

icsContent += `\nEND:VCALENDAR`;

// Write the ICS content to a file
fs.writeFileSync('events.ics', icsContent.trim());

console.log('ICS file generated successfully.');
