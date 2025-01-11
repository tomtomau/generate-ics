import fs from 'fs';
import moment from 'moment';

// Function to create an event string for a given month
function createEvent(month: number, date: moment.Moment): string {
    const start = date.format('YYYYMMDD');
    const end = date.add(1, 'day').format('YYYYMMDD'); // End date is the day after the event
    return `
BEGIN:VEVENT
SUMMARY:${month} months
DTSTART;VALUE=DATE:${start}
DTEND;VALUE=DATE:${end}
END:VEVENT`;
}

// Initialize configuration
const birthDate = moment('2024-12-26'); // Change this to the baby's birth date
const totalMonths = 24; // Number of months to generate events for

// Create events for each month
const months = Array.from({ length: totalMonths }, (_, index) => index + 1);
let icsContent = `BEGIN:VCALENDAR
VERSION:2.0
CALSCALE:GREGORIAN`;

months.forEach((month, index) => {
    const eventDate = birthDate.clone().add(index, 'months'); // Increment by months
    icsContent += createEvent(month, eventDate);
});

icsContent += `\nEND:VCALENDAR`;

// Write the ICS content to a file
fs.writeFileSync('baby_age_events.ics', icsContent.trim());

console.log(`ICS file for baby's age in months generated successfully.`);