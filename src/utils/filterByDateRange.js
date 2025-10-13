export function filterByDateRange(data, startDate, endDate, field = "dateTime") {
  if (!startDate && !endDate) return data;

  const start = startDate ? new Date(startDate) : new Date("1970-01-01");
  const end = endDate ? new Date(endDate) : new Date("9999-12-31");
  end.setHours(23, 59, 59, 999);

  return data.filter((item) => {
    const date = new Date(item[field]);
    return date >= start && date <= end;
  });
}
