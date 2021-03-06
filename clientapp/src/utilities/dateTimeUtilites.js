export const dateTime = {
    getUTCFormatString: function(dateTime){
        const locale = window.navigator.userLanguage || window.navigator.language;
        const dateTimeFormat = new Intl.DateTimeFormat(
            locale,
            {
                year: 'numeric',
                month: '2-digit',
                day: '2-digit',
                hour: '2-digit',
                minute: '2-digit',
                second: '2-digit',
                hourCycle: 'h23',
                timeZone: 'UTC'
            }
        );
       const dateTimeParts = dateTimeFormat.formatToParts(dateTime).reduce(function(acc, item){
            acc[item['type']] = item['value'];
            return acc;
        }, {});

        return `${dateTimeParts['year']}${dateTimeParts['month']}${dateTimeParts['day']}T${dateTimeParts['hour']}${dateTimeParts['minute']}${dateTimeParts['second']}Z`;
    },
    diffHours: function(dt2, dt1){
        var diff = (dt2 - dt1) / 1000;
        diff /= (60 * 60);
        return Math.abs(Math.round(diff));
    },
    translateTime(time) {
        var [h, m] = time.split(":");
        if (m.includes('AM') || m.includes('PM')) {
            return time;
        }
        return (h % 12 + 12 * (h % 12 == 0)) + ":" + m + " " + (h >= 12 ? 'PM' : 'AM');
    },
    getLocalTimeZone() {
        var tzRe = /\(([\w\s]+)\)/; // Look for "(", any words (\w) or spaces (\s), and ")"
        var d = new Date().toString();
        var tz = tzRe.exec(d)[1];
        return tz;
    },
    isDST() {
        var date = new Date();
        let jan = new Date(date.getFullYear(), 0, 1).getTimezoneOffset();
        let jul = new Date(date.getFullYear(), 6, 1).getTimezoneOffset();
        return Math.max(jan, jul) != date.getTimezoneOffset(); 
    }
};