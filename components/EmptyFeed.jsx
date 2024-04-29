import Image from "next/image";

const EmptyFeed = ({ text, align, textAlign }) => {
  return (
    <div className={`my-10 flex ${align} flex-col gap-5`}>
      <p className={`${textAlign} font-semibold text-xl`}>{text}</p>
      <Image
        src="/assets/images/noData.jpg"
        alt="logo"
        width={300}
        height={300}
        className="object-contain"
      />
    </div>
  );
};

export default EmptyFeed;
