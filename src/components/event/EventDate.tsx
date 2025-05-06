import { format } from "date-fns";

interface EventDateProps {
  key: string;
  id: string;
  date: Date;
  index: number;
  length: number;
}

export const EventDate = ({ id, date, index, length }: EventDateProps) => {
  return (
    <div
      key={`label-${id}`}
      className="absolute text-xs text-gray-600 transform -translate-x-1/2 mt-4 text-center"
      style={{
        left: `${(index / (length - 1)) * 100}%`,
        minWidth: "60px",
      }}
    >
      {format(date, "MMM yyyy")}
    </div>
  );
};
