// Sort data
export const sortArray = (array, key, order) => {
  let newArray = [...array];

  if (order == "ascend") {
    newArray = newArray.sort((a, b) => {
      let comparison = 0;

      if (key == "username") {
        comparison = (a.login.username > b.login.username && 1) || -1;
      } else if (key == "name") {
        comparison = (a.name.first > b.name.first && 1) || -1;
      } else {
        comparison = (a.email > b.email && 1) || -1;
      }

      return comparison;
    });
  } else {
    newArray = newArray.sort((a, b) => {
      let comparison = 0;

      if (key == "username") {
        comparison = (a.login.username < b.login.username && 1) || -1;
      } else if (key == "name") {
        comparison = (a.name.first < b.name.first && 1) || -1;
      } else {
        comparison = (a.email < b.email && 1) || -1;
      }
      return comparison;
    });
  }

  return newArray;
};

// Generate query search parameters
export const generateSearchParams = (paramsObject) => {
  const searchParams = new URLSearchParams(paramsObject);

  for (const key in paramsObject) {
    if (
      (key == "keyword" && paramsObject[key] == "") ||
      (key == "gender" && paramsObject[key] == "all") ||
      (key == "sortBy" && paramsObject[key] == null) ||
      (key == "sortOrder" && paramsObject["sortBy"] == null)
    )
      searchParams.delete(key);
  }

  return `?${searchParams.toString()}`;
};

export const convertDateTime = (datetime) => {
  const parsedDateTime = new Date(datetime);
  return `${parsedDateTime.getUTCDate()}-${parsedDateTime.getMonth()}-${parsedDateTime.getFullYear()} ${parsedDateTime.getHours()}:${parsedDateTime.getMinutes()}`;
};
