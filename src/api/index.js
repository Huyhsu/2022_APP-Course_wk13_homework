import axios from "axios";

export const getUbikeInfo = async () => {
  const { data } = await axios.get(
    "https://tcgbusfs.blob.core.windows.net/dotapp/youbike/v2/youbike_immediate.json?fbclid=IwAR11TQDHq7I5dWL_K-PvM40UAQeKEGxrA33ZBymDCx1mn-w0qa6K7hGwlP8"
  );
  let myData = data.filter((item) => item.sarea == "大安區");
  return myData;
};
