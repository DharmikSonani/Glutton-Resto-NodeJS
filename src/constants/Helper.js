import { format } from "date-fns";

// Constants
export const ItemTableFieldWidth = ['10%', '40%', '15%', '10%', '25%'];
export const DetailTabs = ['Overview', 'Menu', 'Reviews', 'Photos'];

// Functions

export const convertTimeStampToDate = (timeStamp) => {
    const fireBaseTime = new Date(
        timeStamp.seconds * 1000 + timeStamp.nanoseconds / 1000000,
    );
    const date = fireBaseTime.toDateString();
    return format(new Date(date), 'yyyy-MM-dd');
}