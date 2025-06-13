import Image from "next/image";

const Loading = () => {
  return (
    <div className='fixed inset-0 flex items-center justify-center'>
      <Image
        src='images/icons/loader.svg'
        width={60}
        height={60}
        alt='loader'
        className='object-contain'
      />
    </div>
  );
};

export default Loading;
