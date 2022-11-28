const timeSlotsCalculator = (date, endDate, interval, turnsList) => {
  const intervalMinutes = interval;

  let datesAndTimes = [];
  let addInterval = true;
  let i = 0;

  do {
    //Descarta las horas ya ocupadas
    if (i < turnsList.length) {
      if (turnsList[i].startTurn.getTime() === date.getTime()) {
        date = new Date(turnsList[i].endTurn);
        addInterval = false;
        i++;
      }
    }

    //Pushea el array de horas disponibles solo ni no se han descartado horas
    if (addInterval) {
      datesAndTimes.push({
        realDate: date,
        timeSlot: date.toLocaleTimeString("en-US", {
          hour: "2-digit",
          minute: "2-digit",
        }),
      });
      date = new Date(date.setMinutes(date.getMinutes() + intervalMinutes));
    }

    addInterval = true;
  } while (date.getHours() < endDate.getHours() + 1);

  return datesAndTimes;
};

export default timeSlotsCalculator;
