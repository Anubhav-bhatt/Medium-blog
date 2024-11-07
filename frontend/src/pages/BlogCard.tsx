interface BlogCardProps {
  authorName: string;
  title: string;
  content: string;
  publishedDate: string;
}

export const BlogCard = ({
  authorName,
  title,
  content,
  publishedDate,
}: BlogCardProps) => {
  return (
    <div className="border-b border-slate p-4 pb-4">
      <div className="flex">
      <Avatar name={authorName} />

        <div className="font-extralight pl-2 text-sm flex justify-center flex-col">{authorName} </div>
      
      <div className="pl-2 text-sm font-thin font-slate-200 flex justify-center flex-col">
      {publishedDate}
      </div>
      </div>
      <div className="text-xl font-semibold">{title}</div>
      <div className="text-md font-thin">{content.slice(0, 100) + "..."}</div>
      <div className="text-sm font-thin pt-2 text-slate-400">{`${Math.ceil(content.length / 100)} minute(s) read`}</div>

     
    </div>
  );
};

export function Avatar({ name, size = "small" }: { name: string, size?: "small" | "big" }) {
  return (
    <div>
      <div className={`relative inline-flex items-center justify-center ${size === "small" ? "w-6 h-6" : "w-10 h-10"} overflow-hidden bg-gray-100 rounded-full dark:bg-gray-600`}>
        <span className="font-xs font-extralight  text-gray-600 dark:text-gray-300">
          {name[0]}
        </span>
      </div>
    </div>
  );
}

